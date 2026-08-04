# The Object Internet — timed speaker script

**Main talk:** slides 1–12. Slides after that are appendix.

**Planned duration:** 8:30.

## 1. The Object Internet — 0:25

I want to propose a different foundation for the agentic web: not more pages for agents to browse, but an internet of objects they can identify, verify, route, transform, and act on. The core idea is simple: separate what an object means from where its bytes happen to live.

## 2. Agents are asked to act on meaning. — 0:45

The foundational mismatch is that agents are asked to act on meaning, while the internet mostly gives them files, API payloads, URLs, and logs. A file can carry bytes, but it rarely carries the durable answers an agent needs: what object is this, is it current, where did it come from, and may this agent use it?

## 3. Files vs. Objects — 0:40

The reframe is from a file-oriented internet to an object-oriented one. Instead of fetching and scraping, agents resolve and verify. Instead of location names, they exchange structural addresses. Instead of every app maintaining its own copies and caches, the network can recognize shared object identity.

## 4. The QuickTime Analogy — 0:55

Think about QuickTime. It understands the container, codecs, tracks, and timeline, but it does not need to know which disk block, CDN node, or cache contains the next segment. It asks the operating system for data and reconstructs the experience. Hologram generalizes that boundary. The viewer knows the root object and the protocol that explains it. Kappa-registry gets the verified object closure. Where those objects live is below the viewer.

## 5. The Stack That Makes It Real — 0:50

This is the stack. UOR defines object identity and protocol vocabulary. Hologram is the viewer and experience. MVM safely executes only what is missing. Kappa-registry is the substrate that resolves and verifies the object graph. Important boundary: Kappa is the shipped registry substrate—OCI store, typed signed edges, identity and absence proofs, epoch-chained audit, encryption, and Veilid federation. S3 and etcd projections, Kaiju, the governance kernel, and the semantic manifold are roadmap, not today's public API surface.

## 6. What Compute Becomes — 0:45

This flips the first question of computing. Instead of asking which server should run the job, ask where the verified result or its dependencies already exist, and what is actually missing. Inputs, functions, and environments can all be addressed. If the result already exists, verify and reuse it. If not, compute only the missing transformation and publish another address.

## 7. Solving Compute Waste via Object Routing — 0:45

The efficiency comes from routing by object identity. The cache key is the object itself. Data deduplicates across consumers. Execution memoizes across identical inputs and environments. Workloads move as addresses and closures. The network can route by availability, capability, locality, policy, and cost instead of blindly sending every request to another server job.

## 8. DataFacts — 0:45

DataFacts is the concrete example of a viewer protocol above the registry. The registry retrieves the fact and its evidence objects. The DataFacts protocol tells the viewer how to answer three questions: is it current, is it authentic, and is this agent authorized to use it? The important shift is that evidence is verified before an agent acts or a payment settles.

## 9. Pay for Missing Work—Not Repeated Machines — 0:40

The economic consequence is qualitative but important. When state and results are portable objects, buyers do not need to rent the same machine shape for every workload. They can reuse the verified closure they already have and pay for only the missing transformation. That turns compute into a market for object execution rather than reserved machine time.

## 10. Synthesis: The Agentic Network Stack — 0:55

This is the NandaTown version. NANDA resolves the actors and interaction context. UOR and Kappa resolve what those actors exchange: DataFacts, messages, models, codebooks, applications, and compute closures. Hologram materializes those object graphs into experiences. MVM produces missing results safely. The network is no longer pages linked by URLs; it is objects linked by meaning, proof, and permission.

## 11. The Public Thesis — 0:35

The public thesis is not that agents need a better browser for the existing web. They need objects with durable identity, evidence, permissions, and a resolution layer. That is what lets them safely identify, verify, route, transform, and act.

## 12. Build the internet agents can actually reason over. — 0:30

That is the whole story: files become objects, endpoints become proof, and cloud jobs become verified reuse. UOR defines identity. Kappa resolves objects. Hologram makes them usable. MVM safely produces what is missing. Thank you.
