---
theme: dracula
title: The Object Internet
titleTemplate: '%s · NANDA'
author: Ari Lerner
info: |
  A nine-minute NANDA talk about UOR, Hologram, kappa-registry,
  and computing by verifiable object identity.
aspectRatio: 16/9
canvasWidth: 1600
presenter: true
download: false
exportFilename: The-Object-Internet-NANDA
defaults:
  layout: default
layout: default
class: hero
favicon: "https://gethologram.ai/favicon.ico"
---

<div class="hero-copy">
  <h1>The Object Internet</h1>
  <div class="subtitle">Agents don't need more pages.<br>They need objects they can <b>trust</b>.</div>
</div>

<img class="hero-art" src="/assets/hero-network.svg" alt="A geometric object network surrounding a stable central identity." />

<div class="hero-tag">NANDA × UOR</div>


<!--
Hey, I'm Ari... I'm a member of the `hologram` and `uor` teams and we want to take you on a journey into a reimagined Internet.
-->

---
layout: default
class: reframe-slide
---

<div class="eyebrow">{{ String($page).padStart(2, '0') }} · The conceptual shift</div>

## The Agentic Web — A Reframe

<div class="reframe-subtitle">Today's agentic internet is <strong>file-oriented</strong>. The object internet is <strong>object-oriented</strong>.</div>

<div class="reframe-grid">
  <div class="reframe-step">
    <div class="reframe-bar"><span>1</span></div>
    <h3>Files <v-click>→ Objects</v-click></h3>
  </div>
  <div class="reframe-step">
    <div class="reframe-bar"><span>2</span></div>
    <h3>Scraped Text <v-click>→ DataFacts</v-click></h3>
  </div>
  <div class="reframe-step">
    <div class="reframe-bar"><span>3</span></div>
    <h3>URLs <v-click>→ Structural Addresses</v-click></h3>
  </div>
  <div class="reframe-step">
    <div class="reframe-bar"><span>4</span></div>
    <h3>API Calls <v-click>→ Verifiable Exchanges</v-click></h3>
  </div>
</div>

<div class="reframe-callout"><span class="reframe-icon">□</span>Don't give agents more websites to browse — give them objects they can identify, verify, route, and act on.</div>


<!--
Today the Internet hands agents files, scraped text, URLs, API responses, and semantically meaningless data.

Reimagine an Internet that turns those ideas into portable, addressable objects that carry structural & verifiable identity. With these addressed DataFacts, the question is not what page to browse, but what objects to trust.
-->

---
layout: default
class: conformance-slide
---

<div class="eyebrow">{{ String($page).padStart(2, '0') }} · From content to address</div>

## `uor-addr` is the content addressing standard

<div class="conformance-subtitle">It turns content into a stable address</div>

<div class="conformance-table">
  <div class="conformance-row">
    <div class="conformance-input">[V1] {"a":1} vs {"a":1.0}</div>
    <div class="conformance-arrow">→</div>
    <div class="conformance-result"><span class="conformance-status">[PASS]</span><span>Identical Address<br><small>(Key / type invariance)</small></span></div>
  </div>
  <div class="conformance-row">
    <div class="conformance-input">[V2] String NFC vs NFD</div>
    <div class="conformance-arrow">→</div>
    <div class="conformance-result"><span class="conformance-status">[PASS]</span><span>Identical Address<br><small>(Unicode invariance)</small></span></div>
  </div>
  <div class="conformance-row">
    <div class="conformance-input">[V3] {"a":1} vs {"a":2}</div>
    <div class="conformance-arrow">→</div>
    <div class="conformance-result"><span class="conformance-status">[PASS]</span><span>Different Address<br><small>(Tamper sensitivity)</small></span></div>
  </div>
  <div class="conformance-row">
    <div class="conformance-input">[V4] Empty structural content</div>
    <div class="conformance-arrow">→</div>
    <div class="conformance-result"><span class="conformance-status reject">[REJECT]</span><span>CanonicalizationError</span></div>
  </div>
</div>

<!--
The stable content-address is not just a hash; it is a conformance promise. Equivalent key order, numeric form, and Unicode representation converge on one address. With a real content change, it diverges, and invalid structure will be rejected. That gives every downstream agent the same identity to route, verify, and reuse, regardless of representation.
-->

---
layout: default
class: byte-integrity-slide
---
<div class="eyebrow">{{ String($page).padStart(2, '0') }} · Byte-level integrity</div>

## Where Byte-Level Integrity Breaks

<div class="byte-integrity-layout">
  <div class="byte-problem">
    <div class="byte-body">Agents reserialize the same content — key order, int vs. float, unicode form. Byte identity forks while the fact is unchanged.</div>
    <div class="byte-body">Provenance and quarantine flags are <strong>silently severed.</strong></div>
  </div>

  <div class="byte-cards">
    <div class="byte-card">
      <h3>Byte Checksum</h3>
      <div class="byte-code">A → e0ebb4ff…<br>B → fe0b8b53…</div>
      <div class="byte-caption">Two addresses. History forks.</div>
    </div>
    <div class="byte-card">
      <h3>Structural<br>Address</h3>
      <div class="byte-code">A → 9c038679… = B → 9c038679…</div>
      <div class="byte-caption">One address. History holds.</div>
    </div>
  </div>
</div>


<div class="page-number">{{ String($page).padStart(2, '0') }}</div>
<!--
Byte-level integrity is fragile. Two agents can serialize the same fact with a different key order, numeric representation, or Unicode form, and a raw byte checksum will treat them as different objects. That silently severs provenance. A structural address survives the representation change, so the fact keeps one identity as it moves through the network.
-->


---
title: Architecture of meaning
---

<div class="eyebrow">{{ String($page).padStart(2, '0') }} · The architecture of meaning</div>

## The viewer owns the meaning

<div class="subtitle">It asks for a verified object. The registry finds the bytes.</div>

<div class="quicktime-layout">

  <img class="quicktime-art" src="/assets/view.png" alt="A Hologram viewer requesting addressed objects from kappa-registry." />

  <div class="quicktime-notes">
    <div class="quicktime-note">
      <h3>Hologram + UOR protocol</h3>
      <p>The viewer chooses or creates the protocol above kappa-registry, identifies it with UOR-ADDR, and rebuilds the exact meaning the agent needs.</p>
    </div>
    <div class="quicktime-note kappa">
      <h3>kappa-registry / OS</h3>
      <p>Resolves, verifies, traverses, deduplicates, and retrieves the object—without exposing buckets, paths, shards, or peer locations.</p>
    </div>
  </div>
</div>


<div class="page-number">{{ String($page).padStart(2, '0') }}</div>
<!--
In the network, kappa is the mathematical resolution of where the data is. The `kappa-registry` is the mathematical storage substrate where you locate the data.
-->

---
layout: default
---
<div class="routing-layout">
  <div class="routing-copy">
    <div class="eyebrow">{{ String($page).padStart(2, '0') }} · Routing by identity</div>
    <h2>An address becomes<br>a routing decision</h2>
    <p>Resolve what is already verified. Compute only what is missing.</p>
    <div class="micro" style="margin-top:42px">Strongest for repeated, cacheable, portable, verifiable work.</div>
  </div>
  <img class="routing-art" src="/assets/routing.svg" alt="A kappa router sending an agent request to a cached result address rather than an idle server farm." />
</div>


<div class="page-number">{{ String($page).padStart(2, '0') }}</div>
<!--
Once an object has a stable address, that address becomes a routing decision. Send the request toward the verified object that already exists. If the closure is incomplete, compute only the missing piece. Identity turns routing into reuse instead of another backend server job.
-->


---
layout: default
---
<div class="eyebrow">{{ String($page).padStart(2, '0') }} · Verified reuse</div>

## Compute starts with<br>what already exists

<div class="formula-wrap">
  <div class="old-new">
    <div class="old"><strong>Old question:</strong> Which server should run this?</div>
    <div class="new"><strong>New question:</strong> What has already been verified—and what is missing?</div>
  </div>

  <div class="address-formula">
    <div class="block"><span class="bracket">[</span>Input Address<span class="bracket">]</span></div>
    <div class="op">+</div>
    <div class="block"><span class="bracket">[</span>Function Address<span class="bracket">]</span></div>
    <div class="op">+</div>
    <div class="block"><span class="bracket">[</span>Environment Address<span class="bracket">]</span></div>
    <div class="op">=</div>
    <div class="block"><span class="bracket">[</span>Result Address<span class="bracket">]</span></div>
  </div>

  <div class="formula-caption">Once <i>sameness</i> is recognized through object identity, systems stop copying, rebuilding, recomputing, and re-verifying from scratch. Compute moves by resolving closures—not copying whole machines.</div>
</div>

<div class="math-proof-label">THE REUSE TEST</div>

$$
\operatorname{address}(x)=\operatorname{address}(y)
\;\Longrightarrow\;
\operatorname{resolve}(x)=\operatorname{resolve}(y)
$$


<div class="page-number">{{ String($page).padStart(2, '0') }}</div>
<!--
Once routing can find an existing object, compute should resolve what is already verified and fill only the gap. Inputs, functions, environments, and results can all be addressed. Now ask what proof an agent needs before it acts on the result.
-->



---
layout: default
class: close-slide
---
<h2>Agents do not need more websites to browse. <br />They need objects they can: <br />identify, verify, route, transform, and act on</h2>

<div class="transform-content">
<div class="transform-list">
  <div class="transform-line"><div class="from">Files</div><div class="arrow">→</div><div class="to">Objects</div></div>
  <div class="transform-line"><div class="from">Endpoints</div><div class="arrow">→</div><div class="to">Proof</div></div>
  <div class="transform-line"><div class="from">Cloud jobs</div><div class="arrow">→</div><div class="to">Verified reuse</div></div>
</div>

<div class="stack">
  <img src="/assets/stack.svg" alt="">
</div>
</div>

<div class="page-number">{{ String($page).padStart(2, '0') }}</div>
<!--
That is the shift: files become objects, locations become addresses, endpoints become proof, and cloud jobs become verified reuse. UOR defines identity; Kappa resolves it; Hologram makes it meaningful; the MVM fills what is missing. Give agents objects they can trust.
-->



---
layout: default
class: evidence-framework-slide
---
<div class="eyebrow">{{ String($page).padStart(2, '0') }} · UOR x NANDA: Datafacts</div>

## The action status

<div class="evidence-framework-subtitle">Data Facts asks one defining question: Is the agent’s data ready for decision-making?</div>

<div class="evidence-framework">
  <div class="evidence-callout evidence-callout-current">
    <strong>Current</strong>
    <span>Is the data fresh enough for decision-making?</span>
  </div>

  <div class="evidence-callout evidence-callout-authentic">
    <strong>Authentic</strong>
    <span>Is the identity and integrity of the source intact?</span>
  </div>

  <div class="evidence-callout evidence-callout-authorized">
    <strong>Authorized</strong>
    <span>Does this specific agent have permission to access it?</span>
  </div>

  <div class="evidence-venn">
    <img class="evidence-venn-image" src="/assets/shared-framework-venn.svg" alt="Three overlapping circles for current, authentic, and authorized data, with their shared center highlighted as ready." />
  </div>
</div>

<div class="page-number">{{ String($page).padStart(2, '0') }}</div>
<!--
What does the agent need to make a decision? The agent needs to decide what is current as a signed timestamp anchored in an append-only log, authenticity means the structure itself resolves to the same address, and authorization is a capability chain that can be checked and revoked.

This is the minimum proof surface for an agent economy: not a claim that sounds trustworthy, but a fact that can be verified at every step.
-->


---
layout: default
class: datafact-triad-slide
---
<div class="eyebrow">{{ String($page).padStart(2, '0') }} · UOR-DataFacts</div>

## The Triad: From Evidence to Binding

<div class="datafact-triad-intro">Data Facts asks whether evidence is ready to use. UOR-NANDA makes each answer verifiable and executable.</div>

<div class="datafact-triad-table">
  <div class="datafact-triad-header">
    <div>Data Facts asks</div>
    <div>UOR-NANDA provides</div>
  </div>

  <div class="datafact-triad-row">
    <div class="datafact-triad-question"><span class="datafact-triad-index">01</span><strong>Is the data current?</strong></div>
    <div class="datafact-triad-answer"><span>Signed timestamp + append-only log</span><span class="datafact-triad-symbol">◌</span></div>
  </div>

  <div class="datafact-triad-row">
    <div class="datafact-triad-question"><span class="datafact-triad-index">02</span><strong>Is the data authentic?</strong></div>
    <div class="datafact-triad-answer"><span>Structural content address</span><span class="datafact-triad-symbol">#</span></div>
  </div>

  <div class="datafact-triad-row">
    <div class="datafact-triad-question"><span class="datafact-triad-index">03</span><strong>Is the data authorized?</strong></div>
    <div class="datafact-triad-answer"><span>Capability chain + revocation checks</span><span class="datafact-triad-symbol">↗</span></div>
  </div>
</div>

<div class="datafact-triad-callout"><strong>Evidence becomes binding.</strong> The original field stays intact; the proof travels with the object.</div>


<div class="page-number">{{ String($page).padStart(2, '0') }}</div>
<!--
This is the triad in one view. Data Facts asks whether the object is current, authentic, and authorized. UOR-NANDA answers each question with a mechanism: a signed timestamp anchored to an append-only log, a structural content address, and a capability chain with revocation checks. The point is not to add metadata around the fact; it is to make the evidence travel with the object so an agent can bind action to something verifiable.
-->

---
layout: default
class: loop-slide
---
<div class="eyebrow">{{ String($page).padStart(2, '0') }} · UOR-NANDA operating loop</div>

## UOR-NANDA Closes the Loop

<div class="loop-steps">
  <div class="loop-step">
    <div class="loop-circle">
      <svg viewBox="0 0 64 64" aria-hidden="true">
        <path d="M17 20h23l9 10-9 10H17a4 4 0 0 1-4-4V24a4 4 0 0 1 4-4z" />
        <path d="M25 27l8 8M33 27l-8 8" />
      </svg>
    </div>
    <div class="loop-label">Delegate</div>
  </div>

  <div class="loop-step">
    <div class="loop-circle">
      <svg viewBox="0 0 64 64" aria-hidden="true">
        <path d="M15 15h34v28H15zM22 23h20M22 30h12M22 37h8" />
        <circle cx="42" cy="42" r="8" />
        <path d="M38 49l-2 8 6-4 6 4-2-8" />
      </svg>
    </div>
    <div class="loop-label">Attest</div>
  </div>

  <div class="loop-step">
    <div class="loop-circle">
      <svg viewBox="0 0 64 64" aria-hidden="true">
        <path d="M32 8l20 9v14c0 13-8 22-20 28C20 53 12 44 12 31V17l20-9z" />
        <path d="M22 32l7 7 14-15" />
      </svg>
    </div>
    <div class="loop-label">Verify</div>
  </div>

  <div class="loop-step">
    <div class="loop-circle">
      <svg viewBox="0 0 64 64" aria-hidden="true">
        <path d="M32 11l10 6v11l-10 6-10-6V17l10-6zM18 33l10 6v11l-10 6-10-6V39l10-6zM46 33l10 6v11l-10 6-10-6V39l10-6z" />
        <path d="M32 34v5M22 28l10 6 10-6M18 55V44M46 55V44" />
      </svg>
    </div>
    <div class="loop-label">Settle</div>
  </div>

  <div class="loop-step">
    <div class="loop-circle">
      <svg viewBox="0 0 64 64" aria-hidden="true">
        <circle cx="32" cy="32" r="21" />
        <path d="M18 18l28 28" />
      </svg>
    </div>
    <div class="loop-label">Revoke</div>
  </div>
</div>

<div class="loop-caption">Sever implements the triad live — blind-run tested by OpenClaw agents. Current = signed timestamp + log. Authentic = structural address. Authorized = capability chain + revocation checks.</div>

<div class="page-number">{{ String($page).padStart(2, '0') }}</div>
<!--
The agent delegates work, receives attestation, verifies the 3 guarantees, settles against the verified object, with the capability to revoke trust when the boundary changes.

The loop closes because identity, evidence, permission, and settlement all point back to the same object.
-->
---
layout: default
class: sever-demo-slide
---

<div class="eyebrow">{{ String($page).padStart(2, '0') }} · Live demo · Sever trust plane</div>

## The accountability loop, running live

<SeverDemo />

<div class="page-number">{{ String($page).padStart(2, '0') }}</div>
<!--
For example, Maria applies for heating assistance. An AI agent needs to read her income to check eligibility — but only for this check, and only for a limited window.
It reads her income, makes the decision, and the benefit pays out — settled on a public ledger, anyone can verify it.
Now her authorization is pulled. Same agent, same signed decision, everything looks identical…
However the permission was revoked before settlement, so nothing pays. This is the story, running.
-->

---
layout: default
class: unlocks-slide
---
<div class="unlocks-layout">

  <div class="unlocks-copy">
    <div class="eyebrow">{{ String($page).padStart(2, '0') }} · The agentic payoff</div>
    <h2>What the Object Internet<br>Unlocks</h2>

  <div class="unlock-list">
    <div class="unlock-item">
      <h3>Memory</h3>
      <div>An object with identity, provenance, freshness, permissions — not “remembered some text”</div>
    </div>
    <div class="unlock-item">
      <h3>Tool Use</h3>
      <div>Acted on a verified object under a capability — not “called an API”</div>
    </div>
    <div class="unlock-item">
      <h3>Multi-Agent Comms</h3>
      <div>Signed, verifiable messages and codebooks — not “exchanged messages”</div>
    </div>
    <div class="unlock-item">
      <h3>Compute</h3>
      <div>Resolve the closure, compute only what’s missing — not “run it again somewhere”</div>
    </div>
  </div>
  </div>

  <div class="unlocks-visual">
    <img src="/assets/synthesis.png" alt="A network of addressed data, AI, apps, and compute objects above the kappa-registry substrate." />
  </div>
</div>


<div class="page-number">{{ String($page).padStart(2, '0') }}</div>
<!--
This is what the object network unlocks. Memory becomes an object with identity and provenance, not a guess from remembered text. Tool use becomes an action on a verified object under a capability. Messages become signed, verifiable exchanges. Compute becomes closure resolution that operates only the missing work. The value is not more infrastructure; it is a network where agents can reason over the same objects.
-->

---
layout: default
class: ofp-slide
---
<div class="ofp-layout">
  <div class="ofp-copy">
    <div class="eyebrow">{{ String($page).padStart(2, '0') }} · UOR-NANDA operating framework</div>

  <h2>Operating Framework Placement</h2>

  <div class="ofp-subtitle">Standardizing the external ecosystem profiles for immediate interoperability and governance.</div>

  <div class="ofp-list" aria-label="Operating framework hierarchy">
    <div class="ofp-spine"></div>

  <div class="ofp-item ofp-foundation">
    <span class="ofp-index">01</span><strong>UOR Foundation</strong>
  </div>

  <div class="ofp-item ofp-standards">
    <span class="ofp-index">02</span><strong>UOR Standards</strong>
  </div>

  <div class="ofp-item ofp-profile">
    <span class="ofp-index">03</span><strong>UOR-NANDA Profile</strong>
    <span class="ofp-detail">Interop across AgentFacts, Index, and A2A</span>
  </div>

  <div class="ofp-item ofp-datafacts">
    <span class="ofp-index">04</span><strong>UOR-DATAFACTS Profile</strong>
    <span class="ofp-detail">Identity, freshness, executable authorization</span>
  </div>

  <div class="ofp-item ofp-gateway">
    <span class="ofp-index">05</span><strong>UOR-DATA-GATEWAY</strong>
    <span class="ofp-detail">Executable Maria scenario policy engine</span>
  </div>
</div>
</div>

  <div class="ofp-callout"><strong>The placement matters.</strong> UOR provides the substrate, profiles make it interoperable, and the gateway makes governance executable.</div>
</div>

<div class="page-number">{{ String($page).padStart(2, '0') }}</div>

<!--
Overlaying NANDA's stack with serialization to see what we can unlock.

This is where UOR and NANDA converge. UOR Foundation is the substrate, UOR Standards define the common rules, and the UOR-NANDA profile makes those rules interoperable across AgentFacts, Index, and A2A communication. UOR-DATAFACTS carries identity, freshness, and executable authorization. The data gateway is where that profile becomes a policy engine that can govern a real scenario. Thank you.
-->

---
layout: default
class: thank-you-slide
---

<div class="thank-you-copy">
  <h1>Thank you</h1>
  <div class="subtitle">Ari Lerner and the <a href="https://gethologram.ai" id="href">Hologram</a> and <a href="https://uor.foundation">UOR</a> teams</div>

```typescript {none|1|2-5|6|7|all}
import { kappa } from "@uor-foundation/uor-addr";

const label = kappa.jsonAddress(
  new TextEncoder().encode('{"msg":"Thank you"}')
);
console.log(label);
// sha256:8839aafda444d2c36d1b3f27d84ef287f6261975b1b6ddc9972054854b6920c1
```

<div class="images">
    <div><img src="/assets/uor.svg" /></div>
    <div><img src="/assets/nanda-logo.jpeg" /></div>
  </div>

</div>

<img class="team-photo" src="/assets/team.jpeg" alt="The Hologram team gathered together outdoors." />

<div class="page-number">{{ String($page).padStart(2, '0') }}</div>

---
layout: center
class: appendix-divider
---

# Addendum

<div class="page-number">{{ String($page).padStart(2, '0') }}</div>

---
layout: default
---
<div class="eyebrow">A1 · Why today's stack is brittle</div>

## The Brittle Agent Stack

<div class="subtitle">The agent economy's problems are fundamentally object problems. Today's infrastructure papers over the gaps with fragile hacks.</div>

<img class="brittle-art" src="/assets/brittle.svg" alt="Recall, access, execution, and settlement leaking memory, access, verification, and compute guarantees." />

<div class="page-number">{{ String($page).padStart(2, '0') }}</div>
---
layout: default
---
<div class="eyebrow">A2 · The architectural shift</div>

## Files vs. Objects

<div class="subtitle">What brittle agent stacks are currently trying to fake—made real when data is an object.</div>

<div class="arch-table">
  <div class="head">Domain</div><div class="head">The Hack</div><div class="head">The Reality</div>
  <div class="domain">Memory</div><div class="hack">Guessing from remembered scraped text.</div><div class="reality">Provenance: objects with identity, freshness, and permissions.</div>
  <div class="domain">Tools</div><div class="hack">Calling an endpoint with a static key.</div><div class="reality">Capabilities: acting on a verified object under a capability chain.</div>
  <div class="domain">Data</div><div class="hack">App-owned data siloed in databases.</div><div class="reality">Portable DataFacts: evidence verified before action.</div>
  <div class="domain">Compute</div><div class="hack">Running the same work again somewhere.</div><div class="reality">Resolve the closure; compute only what is missing; audit what ran.</div>
</div>

<div class="page-number">{{ String($page).padStart(2, '0') }}</div>
---
layout: default
---
<div class="eyebrow">A3 · Scope boundary</div>

## Kappa: Shipped Substrate vs. Roadmap Thesis

<div class="status-layout">
  <div class="status-column shipped">
    <span class="badge">Shipped substrate</span>
    <h3>kappa-registry</h3>
    <ul>
      <li>OCI registry and content-addressed object store</li>
      <li>Typed, signed edges and graph traversal</li>
      <li>Identity and absence proofs</li>
      <li>Epoch-chained audit</li>
      <li>Encryption and Veilid federation</li>
    </ul>
  </div>
  <div class="status-column roadmap-col">
    <span class="badge gold-badge">Roadmap thesis</span>
    <h3>Cloud projections above Kappa</h3>
    <ul>
      <li>S3-compatible projection</li>
      <li>etcd-compatible projection</li>
      <li>Kaiju</li>
      <li>Governance kernel</li>
      <li>Semantic manifold</li>
    </ul>
  </div>
</div>

<div class="status-note">Claim today: the object registry substrate exists. Thesis: familiar cloud surfaces can become projections over it.</div>

<div class="page-number">{{ String($page).padStart(2, '0') }}</div>
---
layout: default
---
<div class="eyebrow">A4 · Roadmap, not today's API surface</div>

## The Substrate Thesis: Collapsing the Cloud Stack

<div class="subtitle">S3, OCI, consensus, and identity become projections over one verifiable object substrate—not separate sources of truth.</div>

<img class="cloud-art" src="/assets/cloud-roadmap.svg" alt="A legacy cloud stack projected onto kappa-registry through OCI, S3, and etcd interfaces." />

<div class="micro" style="position:absolute;left:66px;bottom:48px">ROADMAP: S3/etcd projections, Kaiju, governance kernel, semantic manifold.</div>

<div class="page-number">{{ String($page).padStart(2, '0') }}</div>

---
layout: default
class: comparison-slide
---
<div class="eyebrow">{{ String($page).padStart(2, '0') }} · The foundational mismatch</div>

## Without UOR vs. With UOR

<div class="comparison-table">
  <div class="comparison-cell comparison-head">Dimension</div>
  <div class="comparison-cell comparison-head">Without UOR</div>
  <div class="comparison-cell comparison-head">With UOR</div>

  <div class="comparison-cell comparison-dimension">Identity</div>
  <div class="comparison-cell">Metadata and external services carried with content</div>
  <div class="comparison-cell">One structural address with identity</div>

  <div class="comparison-cell comparison-dimension">Integrity</div>
  <div class="comparison-cell">Mismatch or refreshed data is a dead end</div>
  <div class="comparison-cell">/hasher/diff verifies content structure</div>

  <div class="comparison-cell comparison-dimension">Freshness</div>
  <div class="comparison-cell">TTL taken on faith</div>
  <div class="comparison-cell">Signed, ledger-anchored attestation</div>

  <div class="comparison-cell comparison-dimension">Auth</div>
  <div class="comparison-cell">Described, not enforced</div>
  <div class="comparison-cell">Capability chains + revocation, executed at request time</div>

  <div class="comparison-cell comparison-dimension">Action</div>
  <div class="comparison-cell">Nothing settled on evidence</div>
  <div class="comparison-cell">VTEAI settlement, reproducible</div>
</div>

<div class="comparison-caption"><strong>Data Facts</strong> says what evidence exists. <strong>UOR</strong> makes it bind — and the action accountable.</div>

<div class="page-number">{{ String($page).padStart(2, '0') }}</div>

<!--
For example, a use-case with uor-nanda is medical file verification workflow.

Without UOR, re-encoding forks identity, freshness is a client-side promise, authorization is only described, and nothing settles on evidence. With UOR, identity survives representation changes, proof travels with the object, and action becomes reproducible. The rest of the talk shows how.
-->

---
layout: default
---
<div class="eyebrow">{{ String($page).padStart(2, '0') }} · From standard to substrate</div>

## Four layers.<br>One boundary.

<div class="subtitle">Standards define identity. The viewer creates meaning. The substrate resolves objects. Execution fills the gaps.</div>

<div class="stack">
  <img src="/assets/stack.svg" alt="">
</div>

<div class="stack-status">Powered by uor-foundation and mvm</div>


<div class="page-number">{{ String($page).padStart(2, '0') }}</div>
<!--
0:35
Four layers make that boundary real. UOR defines identity. Hologram creates the experience. Kappa-registry resolves and verifies the graph. MVM runs only the work that is genuinely missing. With meaning above resolution, compute can ask a better first question.
-->


---
layout: default
---
<div class="eyebrow">{{ String($page).padStart(2, '0') }} · One object, one address</div>

## Make it. Find it.<br>Get the same object back.

<div class="math-subtitle">Same message, different JSON order, same stable address.</div>

<div class="object-address-example object-roundtrip-example">
  <div class="address-example-label">WORKED EXAMPLE · same content, different order</div>
  <div class="object-address-flow">
    <div class="object-flow-stage">
      <div class="object-flow-label">1 · OBJECT₁</div>
      <pre class="object-json">{ "message": "hello",
  "recipient": "nanda" }</pre>
    </div>
    <span class="object-flow-arrow">→</span>
    <div class="object-flow-stage object-flow-address-stage">
      <div class="object-flow-label">2 · κ ADDRESS</div>
      <div class="object-address-formula">κ(SHA-256(canonical bytes))</div>
      <code class="object-flow-code"><span class="object-flow-digest">d = 0af83a6812d4341cee174dcb0c2aa1e877f6ff99666613209bddd45f6abcc77d</span></code>
      <code class="object-flow-address">sha256:0af83a6812d4341cee174dcb0c2aa1e877f6ff99666613209bddd45f6abcc77d</code>
    </div>
    <span class="object-flow-arrow">→</span>
    <div class="object-flow-stage">
      <div class="object-flow-label">3 · LOOKUP RESULT = OBJECT₂</div>
      <div class="object-lookup-formula">object₂ = lookup(κ(d))</div>
      <pre class="object-json">{ "recipient": "nanda",
  "message": "hello" }</pre>
      <div class="object-equivalence-note">same fields · different order</div>
    </div>
  </div>

  <div class="address-lookup">
    <div class="object-flow-label">ROUND TRIP</div>
    <div class="address-lookup-equation">
      <code>canonicalize(object₁) = canonicalize(object₂)</code>
      <span>therefore</span>
      <code>address(object₂) = κ(d)</code>
    </div>
  </div>
</div>

<div class="math-proof-label object-roundtrip-proof-label">WHY THE ADDRESS SURVIVES</div>

$$
\begin{aligned}
object_2 &= \operatorname{reorder}(object_1)
\Rightarrow \operatorname{canon}(object_2)=\operatorname{canon}(object_1) \\
&\Rightarrow \operatorname{SHA256}(\operatorname{canon}(object_2))=d
\Rightarrow \operatorname{address}(object_2)=\kappa(d)
\end{aligned}
$$

<div class="math-conclusion object-roundtrip-conclusion"><strong>The point:</strong> the content is the addressable object; lookup retrieves it without changing its identity.</div>

<div class="page-number">{{ String($page).padStart(2, '0') }}</div>
<!--
0:30
Here is the round trip. Two JSON objects arrive in different field orders, but canonicalization gives them the same bytes, digest, and address. The network can now reuse the object without mistaking a new representation for a new thing.
-->
