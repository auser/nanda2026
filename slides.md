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
# transition: fade-out
presenter: true
download: false
exportFilename: The-Object-Internet-NANDA
defaults:
  layout: default
layout: default
class: hero
---
<div class="hero-copy">
  <h1>The Object Internet</h1>
  <div class="subtitle">Building the internet agents<br>can actually <b class="blue">reason</b> over.</div>
</div>

<img class="hero-art" src="/assets/hero-network.svg" alt="A geometric object network surrounding a stable central identity." />

<div class="hero-tag">NANDA × UOR</div>


<div class="page-number">01</div>
<!--
0:25
I want to propose a different foundation for the agentic web: not more pages for agents to browse, but an internet of objects they can identify, verify, route, transform, and act on. The core idea is simple: separate what an object means from where its bytes happen to live.
-->
---
<div class="eyebrow">01 · The foundational mismatch</div>

## Agents are asked to act on meaning.

<div class="subtitle">The internet mostly gives them files. Agents do not just read information—they delegate it, transform it, pay against it, train on it, and pass it to other agents.</div>

<div style="height: 25px"></div>

<img src="/assets/file-object.svg" alt="A file without identity contrasted with a verifiable object carrying identity, provenance, and permissions." style="width:100%;height:505px;object-fit:contain" />

<div class="micro" style="position:absolute;left:66px;bottom:53px">A file rarely tells an agent what object it represents, whether it is current, or who has permission to use it.</div>


<div class="page-number">02</div>
<!--
0:45
The foundational mismatch is that agents are asked to act on meaning, while the internet mostly gives them files, API payloads, URLs, and logs. A file can carry bytes, but it rarely carries the durable answers an agent needs: what object is this, is it current, where did it come from, and may this agent use it?
-->
---
<div class="eyebrow">02 · The conceptual shift</div>

## Files vs. Objects

<div class="subtitle">The shift is not cosmetic. It changes what agents can safely know and do.</div>

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


<div class="page-number">03</div>
<!--
0:40
The reframe is from a file-oriented internet to an object-oriented one. Instead of fetching and scraping, agents resolve and verify. Instead of location names, they exchange structural addresses. Instead of every app maintaining its own copies and caches, the network can recognize shared object identity.
-->
---
<div class="quicktime-layout">
  <div class="left-copy">
    <div class="eyebrow">03 · The architecture of meaning</div>
    <h2>The QuickTime<br>Analogy</h2>
    <p>The viewer renders the experience. The substrate guarantees retrieval and integrity.</p>
  </div>

  <img class="quicktime-art" src="/assets/quicktime.svg" alt="A Hologram viewer requesting addressed objects from kappa-registry." />

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


<div class="page-number">04</div>
<!--
0:55
Think about QuickTime. It understands the container, codecs, tracks, and timeline, but it does not need to know which disk block, CDN node, or cache contains the next segment. It asks the operating system for data and reconstructs the experience. Hologram generalizes that boundary. The viewer knows the root object and the protocol that explains it. Kappa-registry gets the verified object closure. Where those objects live is below the viewer.
-->
---
<div class="eyebrow">04 · From standard to substrate</div>

## The Stack That Makes It Real

<div class="subtitle">Each layer has one job. The story is credible because those jobs are not collapsed.</div>

<div class="stack">
  <div class="stack-layer" v-click>
    <div class="name">UOR Foundation</div>
    <div class="desc">Defines objects, structural addresses, provenance, profiles, and conformance.</div>
    <div class="role">[ THE STANDARDS ]</div>
  </div>
  <div class="stack-layer" v-click>
    <div class="name">Hologram</div>
    <div class="desc">The browser and viewer for the Object Internet; builds, runs, and shares Holospaces.</div>
    <div class="role">[ THE EXPERIENCE ]</div>
  </div>
  <div class="stack-layer" v-click>
    <div class="name">MVM / MVMD</div>
    <div class="desc">Isolation, signed plans, freshness, ordering, and auditable missing execution.</div>
    <div class="role">[ SAFE EXECUTION ]</div>
  </div>
  <div class="stack-layer kappa" v-click>
    <div class="name">kappa-registry</div>
    <div class="desc">The content-addressed registry substrate: persistent objects, relationships, proofs, and resolution.</div>
    <div class="role">[ THE SUBSTRATE ]</div>
  </div>
</div>

<div class="stack-status">SHIPPED: KAPPA REGISTRY SUBSTRATE · ROADMAP: CLOUD PROJECTIONS ABOVE IT</div>


<div class="page-number">05</div>
<!--
0:50
This is the stack. UOR defines object identity and protocol vocabulary. Hologram is the viewer and experience. MVM safely executes only what is missing. Kappa-registry is the substrate that resolves and verifies the object graph. Important boundary: Kappa is the shipped registry substrate—OCI store, typed signed edges, identity and absence proofs, epoch-chained audit, encryption, and Veilid federation. S3 and etcd projections, Kaiju, the governance kernel, and the semantic manifold are roadmap, not today's public API surface.
-->
---
<div class="eyebrow">05 · Verified reuse</div>

## What Compute Becomes

<div class="formula-wrap">
  <div class="old-new">
    <div class="old"><strong>Old question:</strong> Which server should run this?</div>
    <div class="new"><strong>New question:</strong> Where does this verified object already exist—and what is missing?</div>
  </div>

  <div class="address-formula" v-click>
    <div class="block"><span class="bracket">[</span>Input<br>Address<span class="bracket">]</span></div>
    <div class="op">+</div>
    <div class="block"><span class="bracket">[</span>Function<br>Address<span class="bracket">]</span></div>
    <div class="op">+</div>
    <div class="block"><span class="bracket">[</span>Environment<br>Address<span class="bracket">]</span></div>
    <div class="op">=</div>
    <div class="block"><span class="bracket">[</span>Result<br>Address<span class="bracket">]</span></div>
  </div>

  <div class="formula-caption" v-click>Once sameness is recognized through object identity, systems stop copying, rebuilding, recomputing, and re-verifying from scratch. Compute moves by resolving closures—not copying whole machines.</div>
</div>


<div class="page-number">06</div>
<!--
0:45
This flips the first question of computing. Instead of asking which server should run the job, ask where the verified result or its dependencies already exist, and what is actually missing. Inputs, functions, and environments can all be addressed. If the result already exists, verify and reuse it. If not, compute only the missing transformation and publish another address.
-->
---
<div class="routing-layout">
  <div class="routing-copy">
    <div class="eyebrow">06 · Object routing</div>
    <h2>Solving Compute Waste via Object Routing</h2>
    <p>Object identity lets the network reuse rather than repeat.</p>
    <div class="micro" style="margin-top:42px">Strongest for repeated, cacheable, portable, verifiable work.</div>
  </div>
  <img class="routing-art" src="/assets/routing.svg" alt="A kappa router sending an agent request to a cached result address rather than an idle server farm." />
</div>


<div class="page-number">07</div>
<!--
0:45
The efficiency comes from routing by object identity. The cache key is the object itself. Data deduplicates across consumers. Execution memoizes across identical inputs and environments. Workloads move as addresses and closures. The network can route by availability, capability, locality, policy, and cost instead of blindly sending every request to another server job.
-->
---
<div class="eyebrow">07 · A concrete proof pattern</div>

## DataFacts

<div class="subtitle">Evidence is not just described. It is verified before action or payment.</div>

<div class="facts-layout">
  <div class="facts-copy">
    <div class="fact-q" v-click>
      <h3>Is it Current?</h3>
      <p>signed timestamp + append-only log</p>
    </div>
    <div class="fact-q" v-click>
      <h3>Is it Authentic?</h3>
      <p>structural content address</p>
    </div>
    <div class="fact-q" v-click>
      <h3>Is it Authorized?</h3>
      <p>capability chain + revocation checks</p>
    </div>
  </div>
  <img class="facts-art" src="/assets/datafacts.svg" alt="A DataFact object surrounded by current, authentic, and authorized proof petals." />
</div>


<div class="page-number">08</div>
<!--
0:45
DataFacts is the concrete example of a viewer protocol above the registry. The registry retrieves the fact and its evidence objects. The DataFacts protocol tells the viewer how to answer three questions: is it current, is it authentic, and is this agent authorized to use it? The important shift is that evidence is verified before an agent acts or a payment settles.
-->
---
<div class="econ-layout">
  <div class="econ-copy">
    <div class="eyebrow">08 · The economic inversion</div>
    <h2>Pay for Missing Work—Not Repeated Machines</h2>
    <div class="claim">When state is portable and verifiable by construction, compute becomes a market for transformations rather than a lease on a server.</div>
    <div class="callout">Reuse everything already known. Buy only the execution needed to produce the next verified object.</div>
  </div>
  <img class="econ-art" src="/assets/economics.svg" alt="A qualitative chart showing fixed rented machine cost compared with falling object reuse cost." />
</div>


<div class="page-number">09</div>
<!--
0:40
The economic consequence is qualitative but important. When state and results are portable objects, buyers do not need to rent the same machine shape for every workload. They can reuse the verified closure they already have and pay for only the missing transformation. That turns compute into a market for object execution rather than reserved machine time.
-->
---
layout: default
class: synthesis
---
<div class="synthesis-title-strip">
  <h2>Synthesis: The Agentic Network Stack</h2>
  <div class="subtitle">Not pages linked by URLs. Objects linked by meaning, proof, and permission.</div>
</div>

<img class="synthesis-art" src="/assets/synthesis.svg" alt="Data, AI, apps, and compute exchanging addressed objects above the kappa-registry substrate in NandaTown." />


<div class="page-number">10</div>
<!--
0:55
This is the NandaTown version. NANDA resolves the actors and interaction context. UOR and Kappa resolve what those actors exchange: DataFacts, messages, models, codebooks, applications, and compute closures. Hologram materializes those object graphs into experiences. MVM produces missing results safely. The network is no longer pages linked by URLs; it is objects linked by meaning, proof, and permission.
-->
---
layout: default
class: quote-slide
---
<div class="public-kicker">The Public Thesis</div>

<div class="public-quote">“The agentic web will not be unlocked by giving agents more websites to browse.” It will be unlocked by giving them objects they can <span class="identify">identify</span>, <span class="verify">verify</span>, <span class="route">route</span>, <span class="transform">transform</span>, <span class="act">act on</span>.”</div>


<div class="page-number">11</div>
<!--
0:35
The public thesis is not that agents need a better browser for the existing web. They need objects with durable identity, evidence, permissions, and a resolution layer. That is what lets them safely identify, verify, route, transform, and act.
-->
---
layout: default
class: close-slide
---
<h1>Build the internet agents<br>can actually reason over.</h1>

<div class="transform-list">
  <div class="transform-line" v-click><div class="from">Files</div><div class="arrow">→</div><div class="to">Objects</div></div>
  <div class="transform-line" v-click><div class="from">Endpoints</div><div class="arrow">→</div><div class="to">Proof</div></div>
  <div class="transform-line" v-click><div class="from">Cloud jobs</div><div class="arrow">→</div><div class="to">Verified reuse</div></div>
</div>

<div class="stack-cards">
  <div class="stack-card"><h3><span class="gold">[</span> UOR <span class="gold">]</span></h3><p>The standards and object identity</p></div>
  <div class="stack-card"><h3><span class="gold">[</span> Hologram <span class="gold">]</span></h3><p>The viewer and experience</p></div>
  <div class="stack-card"><h3><span class="gold">[</span> MVM <span class="gold">]</span></h3><p>The safe missing execution</p></div>
  <div class="stack-card"><h3><span class="gold">[</span> Kappa <span class="gold">]</span></h3><p>The registry substrate</p></div>
</div>


<div class="page-number">12</div>
<!--
0:30
That is the whole story: files become objects, endpoints become proof, and cloud jobs become verified reuse. UOR defines identity. Kappa resolves objects. Hologram makes them usable. MVM safely produces what is missing. Thank you.
-->
---
layout: center
class: appendix-divider
---
# Addendum
---
<div class="eyebrow">A1 · Why today's stack is brittle</div>

## The Brittle Agent Stack

<div class="subtitle">The agent economy's problems are fundamentally object problems. Today's infrastructure papers over the gaps with fragile hacks.</div>

<img class="brittle-art" src="/assets/brittle.svg" alt="Recall, access, execution, and settlement leaking memory, access, verification, and compute guarantees." />

<div class="page-number">A1</div>
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

<div class="page-number">A2</div>
---
<div class="eyebrow">A3 · Scope boundary</div>

## Kappa: Shipped Substrate vs. Roadmap Thesis

<div class="status-layout">
  <div class="status-column shipped" v-click>
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
  <div class="status-column roadmap-col" v-click>
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

<div class="page-number">A3</div>
---
<div class="eyebrow">A4 · Roadmap, not today's API surface</div>

## The Substrate Thesis: Collapsing the Cloud Stack

<div class="subtitle">S3, OCI, consensus, and identity become projections over one verifiable object substrate—not separate sources of truth.</div>

<img class="cloud-art" src="/assets/cloud-roadmap.svg" alt="A legacy cloud stack projected onto kappa-registry through OCI, S3, and etcd interfaces." />

<div class="micro" style="position:absolute;left:66px;bottom:48px">ROADMAP: S3/etcd projections, Kaiju, governance kernel, semantic manifold.</div>

<div class="page-number">A4</div>
