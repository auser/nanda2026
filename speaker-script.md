# The Object Internet — timed speaker script

**Main talk:** slides 1–17. Slides after that are appendix.

**Planned duration:** 8:40.

## 1. The Object Internet — 0:20

Imagine an agent about to pay for a fact. It has a URL or a JSON payload, but can it tell what the thing is, whether it is current, and whether it is allowed to use it? This talk is about giving agents objects they can trust.

## 2. The Agentic Web — A Reframe — 0:35

The reframe is the whole premise. Today’s agentic internet hands agents files, scraped text, URLs, and API responses. The object internet turns those into addressed objects, DataFacts, structural identity, and verifiable exchanges. From here, the question is not what page to browse, but what object to trust.

## 3. Without UOR vs. With UOR — 0:35

Here is the contract we are trying to build. Without UOR, re-encoding forks identity, freshness is a client-side promise, authorization is only described, and nothing settles on evidence. With UOR, identity survives representation changes, proof travels with the object, and action becomes reproducible. The rest of the talk shows how.

## 4. The viewer owns meaning — 0:40

That question gives us the boundary shown here. QuickTime understands a movie—tracks, codecs, and timeline—but does not manage disk blocks. Hologram plays the same role for addressed objects: the viewer owns meaning, while kappa-registry resolves the verified closure underneath it.

## 5. Four layers, one boundary — 0:35

Four layers make that boundary real. UOR defines identity. Hologram creates the experience. Kappa-registry resolves and verifies the graph. MVM runs only the work that is genuinely missing. With meaning above resolution, compute can ask a better first question.

## 6. The conformance seed — 0:25

The stable name is not just a hash; it is a conformance promise. Equivalent key order, numeric form, and Unicode representation must converge on one address. A real change must diverge, and invalid structure must be rejected. That gives every downstream agent the same identity to route, verify, and reuse.

## 7. Make it, find it, get the same object back — 0:30

Here is the round trip. Two JSON objects arrive in different field orders, but canonicalization gives them the same bytes, digest, and address. The network can now reuse the object without mistaking a new representation for a new thing.

## 8. Route by identity — 0:35

Once an object has a stable address, that address becomes a routing decision. Send the request toward the verified object that already exists. If the closure is incomplete, compute only the missing piece. Identity turns routing into reuse instead of another blind server job.

## 9. Compute starts with what already exists — 0:35

Once routing can find an existing object, compute should resolve what is already verified and fill only the gap. Inputs, functions, environments, and results can all be addressed. That is the reuse test; next we ask what proof an agent needs before it acts on the result.

## 10. The Shared Framework — 0:30

Now the object carries the evidence an agent needs before it acts: current, authentic, and authorized. Current is a signed timestamp anchored to an append-only log. Authentic is structural resolution to the same address. Authorized is a capability chain that can be checked and revoked. This is the minimum proof surface for an agent economy.

## 11. Where byte-level integrity breaks — 0:30

There is one trap: raw byte identity is fragile. Key order, numeric representation, or Unicode form can change the checksum even when the fact has not changed. That severs provenance and quarantine history. Structural identity keeps one address across those representation changes.

## 12. The triad: from evidence to binding — 0:40

This is the triad in one view. Data Facts asks whether the object is current, authentic, and authorized. UOR-NANDA answers each question with a mechanism: a signed timestamp anchored to an append-only log, a structural content address, and a capability chain with revocation checks. The point is not to add metadata around the fact; it is to make the evidence travel with the object so an agent can bind action to something verifiable.

## 13. How UOR-NANDA closes the loop — 0:40

The proof is not a static label; it is an operating loop. An agent delegates work, receives an attestation, verifies the three guarantees, settles against the verified object, and can revoke the capability when the trust boundary changes. Identity, evidence, permission, and settlement all point back to the same object.

## 14. What the Object Internet unlocks — 0:45

This is the payoff. Memory becomes an object with identity and provenance, not a guess from remembered text. Tool use becomes an action on a verified object under a capability. Messages become signed, verifiable exchanges. Compute becomes closure resolution plus only the missing work. Agents can reason over the same objects instead of reconstructing meaning from scratch.

## 15. The public thesis — 0:30

The thesis is not “give agents a better browser.” Give them objects with durable identity, evidence, permission, and a way to resolve them. That lets an agent identify, verify, route, transform, and act with confidence.

## 16. Build the internet agents can reason over — 0:25

Here is the whole stack in one sentence: files become objects, locations become addresses, endpoints become proof, and cloud jobs become verified reuse. UOR defines identity; Kappa resolves it; Hologram makes it meaningful; MVM fills what is missing. Give agents objects they can trust.

## 17. Thank you — 0:05

Thank you.
