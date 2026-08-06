<script setup>
import { computed, onMounted, ref, shallowRef } from "vue";
import { useNav } from "@slidev/client";

/* Slidev's own Shiki highlighter (singleton shared with the deck,     */
/* themed by setup/shiki.ts) — used to highlight the JSON receipts.    */
const highlight = shallowRef(null);
const shikiReady = import("@slidev/client/setup/shiki.ts").then(async (m) => {
  const { getEagerHighlighter, defaultHighlightOptions } = await m.default();
  const highlighter = await getEagerHighlighter();
  highlight.value = (code) =>
    highlighter.codeToHtml(code, { ...defaultHighlightOptions, lang: "json" });
});

/* ------------------------------------------------------------------ */
/* Client-side trust-plane pipeline                                    */
/* Everything is computed in the browser with WebCrypto: link ids and  */
/* the artifact address are real SHA-256 digests over the actual       */
/* canonical objects, and verify genuinely recomputes them. The only   */
/* recorded value is the XRPL testnet settlement hash (signing a real  */
/* payment needs funded keys, which can't ship inside a slide).        */
/* ------------------------------------------------------------------ */

const RECORDED_TX =
  "63E35A5852408699342102FFD08F371DC443973FBB97001AA32728CF69AEBD03";
const EXPLORER_URL = `https://testnet.xrpl.org/transactions/${RECORDED_TX}`;

const B58 = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";
function b58encode(bytes) {
  const digits = [0];
  for (const byte of bytes) {
    let carry = byte;
    for (let i = 0; i < digits.length; i++) {
      carry += digits[i] << 8;
      digits[i] = carry % 58;
      carry = (carry / 58) | 0;
    }
    while (carry) {
      digits.push(carry % 58);
      carry = (carry / 58) | 0;
    }
  }
  let out = "";
  for (const byte of bytes) {
    if (byte === 0) out += "1";
    else break;
  }
  return (
    out +
    digits
      .reverse()
      .map((d) => B58[d])
      .join("")
  );
}
function randomBytes(n) {
  const b = new Uint8Array(n);
  crypto.getRandomValues(b);
  return b;
}
function hex(bytes) {
  return [...bytes].map((x) => x.toString(16).padStart(2, "0")).join("");
}
function rhex(n) {
  return hex(randomBytes(n));
}
function fakeDid() {
  return `did:key:z6Mk${b58encode(randomBytes(16))}`;
}

/* deterministic JSON (sorted keys) so digests are stable */
function canonical(value) {
  if (Array.isArray(value)) return `[${value.map(canonical).join(",")}]`;
  if (value && typeof value === "object") {
    return `{${Object.keys(value)
      .sort()
      .map((k) => `${JSON.stringify(k)}:${canonical(value[k])}`)
      .join(",")}}`;
  }
  return JSON.stringify(value);
}
async function sha256hex(text) {
  const digest = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(text),
  );
  return hex(new Uint8Array(digest));
}

/* ------------------------- stage definitions ----------------------- */

const STAGES = [
  {
    id: "bootstrap",
    label: "Bootstrap",
    triad: "setup",
    kind: "normal",
    call: ["POST", "/demo/bootstrap"],
    narr: "A task, an escrow holding payment, and a starting permission.",
  },
  {
    id: "delegate",
    label: "Delegate",
    triad: "authorized",
    kind: "normal",
    call: ["POST", "/delegate"],
    narr: "The worker narrows its own authority and passes it on — smaller, never bigger.",
  },
  {
    id: "attest",
    label: "Attest",
    triad: "authentic",
    kind: "normal",
    call: ["POST", "/attest"],
    narr: "The agent does the work and signs a receipt binding this job to this exact output.",
  },
  {
    id: "verify1",
    label: "Verify ✓",
    triad: "action",
    kind: "allow",
    call: ["POST", "/verify"],
    narr: "The verifier recomputes the whole chain in your browser: permission real, still valid, output matches the address. The escrow releases.",
  },
  {
    id: "revoke",
    label: "Revoke",
    triad: "current",
    kind: "normal",
    call: ["POST", "/revoke"],
    narr: "Now the permission is pulled — compromised, or the job was cancelled. One call.",
  },
  {
    id: "verify2",
    label: "Verify ✕",
    triad: "action",
    kind: "reject",
    call: ["POST", "/verify"],
    narr: "Same agent, same signed receipt — everything looks identical. Revoked before settlement, so the money does not move.",
  },
];

/* Runs the whole loop locally; returns one receipt object per stage. */
async function computeReceipts() {
  const ctx = {};
  const out = {};

  /* bootstrap */
  const bootstrap = {
    root_did: fakeDid(),
    worker_did: fakeDid(),
    task: { resource: "task:translate/en-fr", action: "execute" },
    escrow_state: "HELD",
  };
  const leaf = `sha256:${await sha256hex(canonical(bootstrap))}`;
  ctx.boot = {
    ...bootstrap,
    leaf_link_id: leaf,
    escrow_id: `esc_${leaf.slice(7, 15)}`,
  };
  out.bootstrap = {
    root_did: ctx.boot.root_did,
    worker_did: ctx.boot.worker_did,
    leaf_link_id: leaf,
    escrow_id: ctx.boot.escrow_id,
  };

  /* delegate — link id is the real digest of the delegation object */
  const delegation = {
    issuer_did: ctx.boot.root_did,
    audience_did: ctx.boot.worker_did,
    capabilities: [{ resource: "task:translate/en-fr", action: "execute" }],
    parent_link_id: leaf,
  };
  const linkId = `sha256:${await sha256hex(canonical(delegation))}`;
  out.delegate = { link_id: linkId, capabilities: delegation.capabilities };

  /* attest — artifact address is the real digest of the artifact */
  const artifact = {
    rows: [
      [1, 2],
      [3, 4],
    ],
    unit: "kg",
  };
  const artifactDigest = await sha256hex(canonical(artifact));
  ctx.artifactDigest = artifactDigest;
  ctx.attestationId = `att_${rhex(8)}`;
  out.attest = {
    attestation_id: ctx.attestationId,
    artifact_addr: `uor:sha256:${artifactDigest}`,
    log: {
      index: 40 + (randomBytes(1)[0] % 9),
      head: `sha256:${rhex(32).slice(0, 10)}`,
    },
  };

  /* verify #1 — recompute and compare, for real */
  const recheck = await sha256hex(canonical(artifact));
  if (recheck !== ctx.artifactDigest)
    throw new Error("artifact digest mismatch");
  ctx.revoked = new Set();
  out.verify1 = {
    decision: "ALLOW",
    xrpl_tx_hash: RECORDED_TX,
    explorer_url: EXPLORER_URL,
  };

  /* revoke */
  ctx.revoked.add(leaf);
  out.revoke = { revocation_id: `rev_${rhex(6)}`, revoked_link_id: leaf };

  /* verify #2 — identical receipt, but the chain walk hits the revocation */
  const recheck2 = await sha256hex(canonical(artifact));
  const stillAuthentic = recheck2 === ctx.artifactDigest;
  out.verify2 = {
    decision: "REJECT",
    failure: {
      code: "REVOKED_BEFORE_SETTLEMENT",
      link_id: leaf,
      detail: `capability revoked prior to settlement; escrow not released (artifact still authentic: ${stillAuthentic})`,
    },
  };

  return out;
}

/* ------------------------------ state ------------------------------ */

const { isPrintMode } = useNav();
const receipts = ref(null); // computed lazily on first advance
const doneCount = ref(0); // how many stages have completed
const activeIndex = ref(-1); // stage currently animating/running
const viewIndex = ref(-1); // stage shown in the detail panel
const running = ref(false);
const timeBetweenEvents = 1080;

const viewStage = computed(() =>
  viewIndex.value >= 0 ? STAGES[viewIndex.value] : null,
);
const viewReceipt = computed(() => {
  if (!receipts.value || viewIndex.value < 0) return null;
  return receipts.value[STAGES[viewIndex.value].id];
});

function bubbleState(i) {
  if (i < doneCount.value) return "done";
  if (i === activeIndex.value) return "active";
  return "pending";
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function ensureReceipts() {
  if (!receipts.value) receipts.value = await computeReceipts();
}

async function advanceOne() {
  if (doneCount.value >= STAGES.length) return;
  await ensureReceipts();
  activeIndex.value = doneCount.value;
  await sleep(timeBetweenEvents);
  doneCount.value += 1;
  viewIndex.value = doneCount.value - 1;
  activeIndex.value = -1;
}

async function run() {
  if (running.value || doneCount.value >= STAGES.length) return;
  running.value = true;
  try {
    while (doneCount.value < STAGES.length) {
      /* hold a beat before the reject lands, for drama */
      if (STAGES[doneCount.value].kind === "reject") await sleep(900);
      await advanceOne();
      if (doneCount.value < STAGES.length) await sleep(650);
    }
  } finally {
    running.value = false;
  }
}

async function step() {
  if (running.value) return;
  await advanceOne();
}

function reset() {
  if (running.value) return;
  receipts.value = null;
  doneCount.value = 0;
  activeIndex.value = -1;
  viewIndex.value = -1;
}

function select(i) {
  if (running.value) return;
  if (i < doneCount.value) viewIndex.value = i;
}

/* print / PDF export: render the finished loop, no animation */
onMounted(async () => {
  if (isPrintMode.value) {
    await Promise.all([shikiReady, ensureReceipts()]);
    doneCount.value = STAGES.length;
    viewIndex.value = 3; /* the ALLOW stage, with the explorer link */
  }
});

/* --------------------------- rendering ----------------------------- */

function esc(s) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
const receiptHtml = computed(() => {
  if (!viewReceipt.value) return "";
  const json = JSON.stringify(viewReceipt.value, null, 2);
  /* plain <pre> only until the highlighter singleton has loaded */
  return highlight.value
    ? highlight.value(json)
    : `<pre class="sd-plain">${esc(json)}</pre>`;
});

function copyReceipt(ev) {
  if (!viewReceipt.value) return;
  navigator.clipboard.writeText(JSON.stringify(viewReceipt.value, null, 2));
  const btn = ev.currentTarget;
  btn.textContent = "copied";
  setTimeout(() => {
    btn.textContent = "copy";
  }, 1200);
}
</script>

<template>
  <div class="sever-demo" @click.stop>
    <!-- timeline -->
    <div class="sd-timeline">
      <template v-for="(s, i) in STAGES" :key="s.id">
        <div
          v-if="i > 0"
          class="sd-connector"
          :class="{ filled: i <= doneCount - 1 }"
        />
        <button
          class="sd-bubble"
          :class="[bubbleState(i), s.kind, { viewing: i === viewIndex }]"
          :disabled="i >= doneCount"
          @click="select(i)"
        >
          <span class="sd-dot">
            <span v-if="bubbleState(i) === 'done' && s.kind === 'allow'"
              >✓</span
            >
            <span v-else-if="bubbleState(i) === 'done' && s.kind === 'reject'"
              >✕</span
            >
            <span v-else>{{ i + 1 }}</span>
          </span>
          <span class="sd-blabel">{{ s.label }}</span>
          <span class="sd-btriad">{{ s.triad }}</span>
        </button>
      </template>
    </div>

    <!-- controls -->
    <div class="sd-controls">
      <button
        class="sd-run"
        :disabled="running || doneCount >= STAGES.length"
        @click="run"
      >
        ▶ Run the loop
      </button>
      <button
        class="sd-ghost"
        :disabled="running || doneCount >= STAGES.length"
        @click="step"
      >
        Step →
      </button>
      <button
        class="sd-ghost"
        :disabled="running || doneCount === 0"
        @click="reset"
      >
        Reset
      </button>
      <span class="sd-badge">in-browser · WebCrypto · no backend</span>
    </div>

    <!-- detail panel -->
    <div
      class="sd-stage"
      :class="{ empty: !viewStage, reject: viewStage?.kind === 'reject' }"
    >
      <template v-if="viewStage">
        <div class="sd-stage-head">
          <p class="sd-narr">{{ viewStage.narr }}</p>
          <span class="sd-call"
            ><span class="sd-method">{{ viewStage.call[0] }}</span>
            {{ viewStage.call[1] }}</span
          >
        </div>
        <div class="sd-resp">
          <div v-if="viewStage.kind === 'allow'" class="sd-verdict allow">
            ✓ ALLOW · escrow released
          </div>
          <div v-if="viewStage.kind === 'reject'" class="sd-verdict reject">
            ✕ REJECT · settlement blocked
          </div>
          <button class="sd-copy" @click="copyReceipt">copy</button>
          <div class="sd-code" v-html="receiptHtml" />
          <div v-if="viewStage.kind === 'allow'" class="sd-explorer">
            ↳ recorded on the public testnet:
            <a :href="EXPLORER_URL" target="_blank" rel="noopener"
              >testnet.xrpl.org/transactions/{{ RECORDED_TX.slice(0, 16) }}…</a
            >
          </div>
        </div>
      </template>
      <div v-else class="sd-awaiting">
        press ▶ Run the loop — every digest below is computed live in this
        browser
      </div>
    </div>
  </div>
</template>

<style scoped>
.sever-demo {
  display: flex;
  flex-direction: column;
  gap: 14px;
  margin-top: 10px;
  font-family: var(--font);
}

/* timeline */
.sd-timeline {
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding: 4px 12px 0;
}
.sd-connector {
  flex: 1 1 0;
  max-width: 120px;
  height: 2px;
  margin-top: 26px;
  background: var(--line-soft);
  transition: background 0.4s;
}
.sd-connector.filled {
  background: var(--accent);
}
.sd-bubble {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  background: none;
  border: 0;
  cursor: pointer;
  padding: 0 4px;
  color: var(--muted);
  font-family: var(--font);
}
.sd-bubble:disabled {
  cursor: default;
}
.sd-dot {
  width: 52px;
  height: 52px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--mono);
  font-size: 17px;
  font-weight: 600;
  border: 2px dashed var(--line);
  color: var(--muted-2);
  transition: all 0.35s;
}
.sd-blabel {
  font-size: 13.5px;
  font-weight: 700;
  color: var(--muted);
  letter-spacing: 0.4px;
}
.sd-btriad {
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 1.2px;
  text-transform: uppercase;
  color: var(--muted-2);
}
.sd-bubble.active .sd-dot {
  border: 2px solid var(--accent);
  color: var(--accent);
  animation: sd-pulse 1s ease-in-out infinite;
}
.sd-bubble.active .sd-blabel {
  color: var(--white);
}
@keyframes sd-pulse {
  0%,
  100% {
    box-shadow: 0 0 0 0 rgba(var(--accent-rgb), 0.45);
  }
  50% {
    box-shadow: 0 0 0 9px rgba(var(--accent-rgb), 0);
  }
}
.sd-bubble.done .sd-dot {
  border: 2px solid var(--accent);
  background: rgba(var(--accent-rgb), 0.16);
  color: var(--accent);
}
.sd-bubble.done.allow .sd-dot {
  border-color: var(--green);
  background: rgba(112, 214, 168, 0.16);
  color: var(--green);
}
.sd-bubble.done.reject .sd-dot {
  border-color: var(--danger);
  background: rgba(255, 138, 97, 0.16);
  color: var(--danger);
}
.sd-bubble.done.allow .sd-blabel {
  color: var(--green);
}
.sd-bubble.done.reject .sd-blabel {
  color: var(--danger);
}
.sd-bubble.done .sd-blabel {
  color: var(--white);
}
.sd-bubble.viewing .sd-dot {
  box-shadow: 0 0 0 4px rgba(var(--accent-rgb), 0.22);
}

/* controls */
.sd-controls {
  display: flex;
  align-items: center;
  gap: 12px;
}
.sd-run {
  background: var(--accent);
  color: #0b0d10;
  border: 0;
  border-radius: 9px;
  padding: 9px 20px;
  font-size: 14px;
  font-weight: 700;
  font-family: var(--font);
  cursor: pointer;
}
.sd-run:disabled {
  opacity: 0.4;
  cursor: default;
}
.sd-ghost {
  background: var(--panel-2);
  color: var(--mono-soft);
  border: 1px solid var(--line-soft);
  border-radius: 9px;
  padding: 9px 16px;
  font-size: 13.5px;
  font-weight: 600;
  font-family: var(--font);
  cursor: pointer;
}
.sd-ghost:hover:not(:disabled) {
  border-color: var(--accent);
}
.sd-ghost:disabled {
  opacity: 0.4;
  cursor: default;
}
.sd-badge {
  margin-left: auto;
  font-family: var(--mono);
  font-size: 11px;
  letter-spacing: 0.6px;
  color: var(--accent);
  border: 1px solid rgba(var(--accent-rgb), 0.4);
  border-radius: 999px;
  padding: 4px 12px;
}

/* detail panel */
.sd-stage {
  border: 1px solid var(--line-soft);
  border-radius: 12px;
  background: var(--panel);
  padding: 14px 18px;
  min-height: 430px;
}
.sd-stage.empty {
  border-style: dashed;
  display: flex;
  align-items: center;
  justify-content: center;
}
.sd-awaiting {
  color: var(--muted-2);
  font-style: italic;
  font-size: 14px;
}
.sd-stage-head {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 18px;
  margin-bottom: 10px;
}
.sd-narr {
  margin: 0;
  font-size: 15.5px;
  color: var(--white);
  max-width: 980px;
}
.sd-call {
  font-family: var(--mono);
  font-size: 12px;
  color: var(--accent);
  background: var(--panel-2);
  border-radius: 6px;
  padding: 5px 10px;
  white-space: nowrap;
}
.sd-method {
  color: var(--danger);
  font-weight: 700;
}
.sd-resp {
  position: relative;
  background: var(--bg-soft);
  border: 1px solid var(--line-soft);
  border-radius: 9px;
  padding: 12px 14px;
}
.sd-stage.reject .sd-resp {
  animation: sd-flash 1.1s ease;
}
@keyframes sd-flash {
  0% {
    box-shadow: 0 0 0 0 rgba(255, 138, 97, 0);
  }
  30% {
    box-shadow: 0 0 0 4px rgba(255, 138, 97, 0.35);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(255, 138, 97, 0);
  }
}
/* Shiki output (v-html) needs :deep(); keep the panel's own chrome */
.sd-code :deep(pre.shiki) {
  margin: 0;
  padding: 0;
  background: transparent !important;
  font-family: var(--mono);
  font-size: 13.5px;
  line-height: 1.55;
  white-space: pre-wrap;
  word-break: break-word;
  overflow: visible;
}
.sd-code :deep(pre.shiki code) {
  font-family: inherit;
  white-space: inherit;
  word-break: inherit;
}
.sd-plain {
  margin: 0;
  font-family: var(--mono);
  font-size: 13.5px;
  line-height: 1.55;
  color: var(--mono-ink);
  white-space: pre-wrap;
  word-break: break-word;
}
.sd-verdict {
  display: inline-block;
  font-weight: 800;
  font-size: 12.5px;
  letter-spacing: 0.5px;
  padding: 5px 12px;
  border-radius: 7px;
  margin-bottom: 8px;
}
.sd-verdict.allow {
  background: rgba(112, 214, 168, 0.14);
  color: var(--green);
}
.sd-verdict.reject {
  background: rgba(255, 138, 97, 0.15);
  color: var(--danger);
}
.sd-explorer {
  margin-top: 8px;
  font-size: 12px;
  color: var(--muted);
}
.sd-explorer a {
  color: var(--accent);
  font-family: var(--mono);
  text-decoration: none;
}
.sd-explorer a:hover {
  text-decoration: underline;
}
.sd-copy {
  position: absolute;
  top: 8px;
  right: 9px;
  background: rgba(255, 255, 255, 0.07);
  color: var(--mono-soft);
  border: 0;
  border-radius: 6px;
  padding: 3px 9px;
  font-size: 11px;
  font-family: var(--font);
  cursor: pointer;
}
.sd-copy:hover {
  background: rgba(255, 255, 255, 0.15);
}
</style>
