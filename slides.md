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
  <div class="subtitle">Agents don't need more pages.<br>They need objects they can <b class="blue">trust</b>.</div>
</div>

<img class="hero-art" src="/assets/hero-network.svg" alt="A geometric object network surrounding a stable central identity." />

<div class="hero-tag">NANDA × UOR</div>


<div class="page-number">{{ String($page).padStart(2, '0') }}</div>
<!--
Math... but not too much...

Imagine an agent about to pay for a fact. It has a URL or a JSON payload—but can it tell what the thing is, whether it is current, and whether it is allowed to use it? That is the problem UOR and Hologram set out to solve. Agents do not need more pages. They need objects with identity they can trust.
-->
---
layout: default
---
<div class="eyebrow">{{ String($page).padStart(2, '0') }} · The foundational mismatch</div>

## Agents have to act on meaning.

<div class="subtitle">But the web hands them files. Before an agent acts, it needs to know what the thing is, whether it is current, and whether it may use it.</div>

<div style="height: 25px"></div>

<img src="/assets/file-object.svg" alt="A file without identity contrasted with a verifiable object carrying identity, provenance, and permissions." style="width:100%;height:505px;object-fit:contain" />

<div class="micro" style="position:absolute;left:66px;bottom:53px">A file rarely tells an agent what object it represents, whether it is current, or who has permission to use it.</div>


<div class="page-number">{{ String($page).padStart(2, '0') }}</div>
<!--
0:45
The mismatch is that agents do more than read. They reuse information, transform it, pay against it, and pass it to other agents. A file carries bytes, but it rarely carries the durable answers: what object is this, is it current, where did it come from, and may this agent use it? Until those answers travel with the thing, acting on meaning is guesswork. So we need to change what the network treats as its basic unit.
-->
---
layout: default
class: shift-slide
---
<div class="eyebrow">{{ String($page).padStart(2, '0') }} · The conceptual shift</div>

## The web gives agents files.<br>They need objects.

<div class="subtitle">An object carries identity, proof, and a way to resolve it.</div>

<div class="shift-grid">
  <div class="shift-head">
    <div class="dim">FILE-ORIENTED INTERNET</div><div></div><div>OBJECT-ORIENTED <span class="blue">INTERNET</span></div>
  </div>
  <div class="shift-row">
    <div class="left">Fetch / scrape</div><div class="arrow">│</div><div class="right">Resolve / <span class="gold">verify</span></div>
  </div>
  <div class="shift-row">
    <div class="left">URLs and endpoints</div><div class="arrow">│</div><div class="right">Structural <span class="blue">addresses</span></div>
  </div>
  <div class="shift-row">
    <div class="left">Copies and caches</div><div class="arrow">│</div><div class="right">Shared <span class="gold">object identity</span></div>
  </div>
</div>


<div class="page-number">{{ String($page).padStart(2, '0') }}</div>
<!--
0:40
The reframe is straightforward: move from files to objects. Fetch becomes resolve. Scrape becomes verify. A URL says where to look; a structural address says what to look for. When the network recognizes the same object everywhere, agents can share one verified thing instead of making another copy. The next question is where meaning belongs in that system.
-->
---
title: Architecture of meaning
---

<div class="quicktime-layout">
  <div class="left-copy">
    <div class="eyebrow">{{ String($page).padStart(2, '0') }} · The architecture of meaning</div>
    <h2>The viewer<br>owns meaning.</h2>
    <p>It asks for a verified object. The registry finds the bytes.</p>
  </div>

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

<div class="viewer-contract">
  <span class="mono">open(root κ, protocol κ, capability κ)</span>
  <strong>VIEWER OWNS MEANING · REGISTRY OWNS RESOLUTION</strong>
</div>


<div class="page-number">{{ String($page).padStart(2, '0') }}</div>
<!--
0:55
That question gives us the boundary shown here. For example, QuickTime understands a movie—its tracks, codecs, and timeline—but it does not manage disk blocks. It asks the operating system for the next verified bytes. Hologram plays the same role for addressed objects: the viewer owns the meaning, while kappa-registry resolves the verified object closure. Storage location stays below the boundary, so the experience can remain focused on what the object means.
-->
---
layout: default
---
<div class="eyebrow">{{ String($page).padStart(2, '0') }} · From standard to substrate</div>

## Four layers.<br>One boundary.

<div class="subtitle">Standards define identity. The viewer creates meaning. The substrate resolves objects. Execution fills the gaps.</div>

<div class="stack">
<img src="./assets/stack.png" alt="">
</div>
<!-- <div class="stack">
  <div class="stack-layer">
    <div class="name">UOR Foundation</div>
    <div class="desc">Defines objects, structural addresses, provenance, profiles, and conformance.</div>
    <div class="role">[ THE STANDARDS ]</div>
  </div>
  <div class="stack-layer">
    <div class="name">Hologram</div>
    <div class="desc">The browser and viewer for the Object Internet; builds, runs, and shares Holospaces.</div>
    <div class="role">[ THE EXPERIENCE ]</div>
  </div>
  <div class="stack-layer">
    <div class="name">MVM / MVMD</div>
    <div class="desc">Isolation, signed plans, freshness, ordering, and auditable missing execution.</div>
    <div class="role">[ SAFE EXECUTION ]</div>
  </div>
  <div class="stack-layer kappa">
    <div class="name">kappa-registry</div>
    <div class="desc">The content-addressed registry substrate: persistent objects, relationships, proofs, and resolution.</div>
    <div class="role">[ THE SUBSTRATE ]</div>
  </div>
</div> -->

<div class="stack-status">Powered by uor-foundation and mvm</div>


<div class="page-number">{{ String($page).padStart(2, '0') }}</div>
<!--
0:50
Four layers make that boundary real. UOR defines identity and the vocabulary for objects. Hologram turns addressed objects into an experience. Kappa-registry resolves and verifies the graph. MVM runs only the work that is genuinely missing. Each layer has one job: meaning above, resolution below, and execution only where needed. With that separation in place, compute can ask a better first question.
-->
---
layout: default
---
<div class="eyebrow">{{ String($page).padStart(2, '0') }} · Verified reuse</div>

## Compute starts with<br>what already exists.

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

  <div class="formula-caption">Once sameness is recognized through object identity, systems stop copying, rebuilding, recomputing, and re-verifying from scratch. Compute moves by resolving closures—not copying whole machines.</div>
</div>

<div class="math-proof-label mt-10">THE REUSE TEST</div>

$$
\operatorname{address}(x)=\operatorname{address}(y)
\;\Longrightarrow\;
\operatorname{resolve}(x)=\operatorname{resolve}(y)
$$


<div class="page-number">{{ String($page).padStart(2, '0') }}</div>
<!--
0:45
Instead of asking which server should run a job, ask what has already been verified. If the inputs, function, environment, or result already exist, resolve and reuse them. If one piece is missing, compute only that piece and publish its new address. In other words, compute becomes finding what is already true, then filling the gap. For that reuse to work, content needs a stable name.
-->
---
layout: default
class: math-slide
---

<div class="eyebrow">{{ String($page).padStart(2, '0') }} · From content to address</div>

## Give content a stable name.

<div class="math-subtitle">Canonical content → digest → κ-label. No location required.</div>

<div class="math-label">1 · CONTENT → κ-LABEL</div>

$$
\begin{aligned}
 d &= \operatorname{SHA256}(\operatorname{canon}(x)) \in (\mathrm{UInt8})^{32} \\
\operatorname{address}(x)=\kappa(d)
       &= \underbrace{\texttt{"sha256:"}}_{7\ \text{ASCII bytes}}
       \,\Vert\, \bigg\Vert_{k=0}^{31}
       \underbrace{\left[
       \operatorname{hexLower}(d_k \mathbin{>>>} 4)\,\Vert\,
       \operatorname{hexLower}(d_k \mathbin{\&\&\&} \texttt{0x0F})
       \right]}_{2\ \text{ASCII bytes per digest byte}} \\
|\operatorname{address}(x)| &= 7 + 2\cdot 32 = 71
\end{aligned}
$$

<div class="math-note"><span class="mono">d : Fin 32 → UInt8</span> becomes <span class="mono">κ(d) : Fin 71 → UInt8</span>. Width is part of the type.</div>

<div class="math-note">Each digest byte contributes two ASCII bytes: high nibble first, low nibble second. Every byte is accounted for, in order.</div>

<div class="math-proof-label mt5">WHY THE LABEL IS UNIQUE</div>

$$
\begin{aligned}
\kappa(d_1)=\kappa(d_2)
&\Rightarrow \forall k,\ \operatorname{encodeByte}(d_1[k])=\operatorname{encodeByte}(d_2[k]) \\
&\Rightarrow \forall k,\ d_1[k]=d_2[k]\ \Rightarrow\ d_1=d_2
\end{aligned}
$$

<div class="math-conclusion"><span class="gold">Identity is preserved:</span> <span class="math-inline">κ(d₁) = κ(d₂) ⇔ d₁ = d₂</span> — same digest, same label; different digest, different label.</div>

<div class="page-number">{{ String($page).padStart(2, '0') }}</div>
<!--
0:20
That stable name is the κ-label. Canonical bytes produce a 32-byte digest; κ turns those bytes into a fixed-width `sha256:` address. Every digest byte becomes an injective pair of hex digits, so equal labels imply equal content identity. It names the object itself, not the place where the object happens to live. Let's look at the concrete round trip.

Source: UOR-Foundation/uor-addr/uor-addr-lean/UorAddr/AddressShape.lean and KappaDerivation.lean.
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

<div class="math-conclusion object-roundtrip-conclusion"><span class="gold">The point:</span> the content is the addressable object; lookup retrieves it without changing its identity.</div>

<div class="page-number">{{ String($page).padStart(2, '0') }}</div>
<!--
0:35
Here is the round trip. We start with a message, canonicalize it, hash it, and assign the κ-address in the middle. Canonicalization removes the representational difference, so both forms receive the same address. That is the payoff: the network can reuse the object without mistaking a new representation for a new thing.
-->
---
layout: default
---
<div class="routing-layout">
  <div class="routing-copy">
    <div class="eyebrow">{{ String($page).padStart(2, '0') }} · Routing by identity</div>
    <h2>An address becomes<br>a routing decision.</h2>
    <p>Resolve what is already verified. Compute only what is missing.</p>
    <div class="micro" style="margin-top:42px">Strongest for repeated, cacheable, portable, verifiable work.</div>
  </div>
  <img class="routing-art" src="/assets/routing.svg" alt="A kappa router sending an agent request to a cached result address rather than an idle server farm." />
</div>


<div class="page-number">{{ String($page).padStart(2, '0') }}</div>
<!--
0:45
Once an object has a stable address, the address becomes a routing decision. Send the request toward the verified object that already exists. If the closure is incomplete, compute only the missing piece. The network routes toward availability instead of sending every request back to an arbitrary server. But finding an object is only useful if an agent can decide whether to trust it.
-->
---
layout: default
---
<div class="eyebrow">{{ String($page).padStart(2, '0') }} · Proof in practice</div>

## Verify before you act.

<div class="subtitle">A DataFact answers three questions before an agent pays, uses, or delegates it.</div>

<div class="facts-layout">
  <div class="facts-copy">
    <div class="fact-q">
      <h3>Is it Current?</h3>
      <p>signed timestamp + append-only log</p>
    </div>
    <div class="fact-q">
      <h3>Is it Authentic?</h3>
      <p>structural content address</p>
    </div>
    <div class="fact-q">
      <h3>Is it Authorized?</h3>
      <p>capability chain + revocation checks</p>
    </div>
  </div>
  <img class="facts-art" src="/assets/confirm.png" alt="A DataFact object surrounded by current, authentic, and authorized proof petals." />
</div>


<div class="page-number">{{ String($page).padStart(2, '0') }}</div>
<!--
0:45
That is where proof enters. A DataFact is not just a claim; it comes with evidence the viewer can check. Before an agent acts or a payment settles, it asks three questions: is this current, is it authentic, and is this agent authorized to use it? The registry supplies the objects; the protocol explains how to verify them. Once identity and proof travel together, the economics can change too.
-->

---
layout: default
---
<div class="econ-layout">
  <div class="econ-copy">
    <div class="eyebrow">{{ String($page).padStart(2, '0') }} · The economic inversion</div>
    <h2>Reuse What Exists. Pay for What’s New.</h2>
    <div class="claim">When state is portable and verifiable, compute becomes a market for transformations—not a lease on a server.</div>
    <div class="callout">Reuse what is already verified. Pay only for the transformation that is missing.</div>
  </div>
  <img class="econ-art" src="/assets/economics.png" alt="A qualitative chart showing fixed rented machine cost compared with falling object reuse cost." />
</div>


<div class="page-number">{{ String($page).padStart(2, '0') }}</div>
<!--
0:40
The economic consequence is simple: reuse what is already verified and pay only for the transformation that is missing. Compute becomes a market for what changes—not a lease on the same machine, repeated for every consumer. Now we can put the full picture back into the NANDA context.
-->
---
layout: default
class: synthesis
---
<div class="synthesis-title-strip">
  <h2>The agentic web is an object network.</h2>
  <div class="subtitle">Actors, facts, models, apps, and compute closures share one identity layer.</div>
</div>

<img class="synthesis-art" src="/assets/synthesis.png" alt="Data, AI, apps, and compute exchanging addressed objects above the kappa-registry substrate in NandaTown." />


<div class="page-number">{{ String($page).padStart(2, '0') }}</div>
<!--
0:55
In NandaTown, these pieces fit together. NANDA gives us the actors and context. UOR and Kappa give those actors durable objects to exchange—facts, messages, models, applications, and compute closures. Hologram makes the graph usable; MVM produces what is missing safely. The web stops being pages linked by URLs and becomes objects linked by meaning, proof, and permission. That is the thesis in one sentence.
-->
---
layout: default
class: quote-slide
---
<div class="public-kicker">The Public Thesis</div>

<div class="public-quote">“Agents do not need more websites to browse. They need objects they can <span class="identify">identify</span>, <span class="verify">verify</span>, <span class="route">route</span>, <span class="transform">transform</span>, and <span class="act">act on</span>.”</div>


<div class="page-number">{{ String($page).padStart(2, '0') }}</div>
<!--
0:35
The thesis is not “give agents a better browser.” Give them objects with durable identity, evidence, permission, and a way to resolve them. That combination lets an agent identify, verify, route, transform, and finally act with confidence.
-->
---
layout: default
class: close-slide
---
<h1>Give agents objects<br>they can trust.</h1>

<div class="transform-list">
  <div class="transform-line"><div class="from">Files</div><div class="arrow">→</div><div class="to">Objects</div></div>
  <div class="transform-line"><div class="from">Endpoints</div><div class="arrow">→</div><div class="to">Proof</div></div>
  <div class="transform-line"><div class="from">Cloud jobs</div><div class="arrow">→</div><div class="to">Verified reuse</div></div>
</div>

<div class="stack-cards">
  <div class="stack-card"><h3><span class="gold">[</span> UOR <span class="gold">]</span></h3><p>The standards and object identity</p></div>
  <div class="stack-card"><h3><span class="gold">[</span> Hologram <span class="gold">]</span></h3><p>The viewer and experience</p></div>
  <div class="stack-card"><h3><span class="gold">[</span> MVM <span class="gold">]</span></h3><p>The safe missing execution</p></div>
  <div class="stack-card"><h3><span class="gold">[</span> Kappa <span class="gold">]</span></h3><p>The registry substrate</p></div>
</div>


<div class="page-number">{{ String($page).padStart(2, '0') }}</div>
<!--
0:30
Here is the shift: files become objects, locations become addresses, endpoints become proof, and cloud jobs become verified reuse. UOR defines identity; Kappa resolves it; Hologram makes it meaningful; the MVM fills what is missing. Give agents objects they can trust. Thank you.
-->

---
layout: default
class: thank-you-slide
---

<div class="thank-you-copy">
  <h1>Thank you</h1>
  <div class="subtitle">Ari Lerner and the <a href="https://gethologram.ai" id="href">Hologram</a> team</div>
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
