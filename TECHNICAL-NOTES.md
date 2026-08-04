# Technical and narrative boundaries

## The viewer / registry boundary

The viewer owns interpretation. It selects or creates a UOR-addressed protocol and asks for a root object, protocol object, and—where applicable—a capability object. `kappa-registry` owns resolution, verification, traversal, caching, and retrieval. It does not need to understand whether the graph represents a DataFact, video, model, application, message, or Holospace.

## QuickTime analogy

QuickTime understands the media structure but delegates physical retrieval to the operating system, filesystem, networking, and caches. Hologram generalizes this separation: it understands the object protocol while kappa-registry hides buckets, paths, shards, peers, and other placement details.

## Shipped versus roadmap

The talk frames Kappa as the shipped registry substrate: OCI storage, typed signed edges, identity and absence proofs, epoch-chained audit, encryption, and Veilid federation.

The broader cloud-replacement thesis is roadmap: S3/etcd projections, Kaiju, the governance kernel, and the semantic manifold. The main stack slide carries this distinction, and appendix slides make it explicit.

## Economic claim

The economic slide is intentionally qualitative. It does not repeat the source deck's unsupported percentage claim. The defensible thesis is that portable, verifiable state enables reuse and lets buyers pay for missing transformations rather than repeatedly reproducing entire machine environments.

## PPTX editability

The PPTX is rendered from Markdown for exact visual parity. Slides are flattened high-resolution images; edit `object-internet.md` and rerender for content changes. Speaker notes remain editable in the notes pane.
