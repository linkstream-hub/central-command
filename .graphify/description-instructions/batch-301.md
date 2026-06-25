# Node Description Batch 302 of 412

Graphify is running in assistant/skill mode (no API key). You are the host
assistant (Claude Code / Codex / Gemini CLI). Read the prompt below and write
your JSON answer to the answer file.

## Prompt

You are documenting nodes in a knowledge graph.
For each entry below, write ONE concise factual plain-language sentence
describing what it is or does. Use only the provided context.
For an entity node (any other kind — e.g. a person, place, event, object),
describe what the entity is and its role, grounded in its type, its
relations (neighbors) and the provided citations/evidence — e.g.
"Lady Carfax, a wealthy heiress who disappears en route to Lausanne.".
Ground entity descriptions in the citations/evidence when present; do not
speculate beyond the context, so a node with no supporting context may be
left out of the reply.
Write every description in English (en). Do not switch languages.
No marketing language.
Respond ONLY with a JSON object mapping each node id (as a string) to its
one-sentence description — no prose, no markdown fences.

- "graphs_graph_report_community_373_community_373": "Community 373 - \"Community 373\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L5976 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_3730_community_3730": "Community 3730 - \"Community 3730\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L18244 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_3731_community_3731": "Community 3731 - \"Community 3731\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L18248 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_3732_community_3732": "Community 3732 - \"Community 3732\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L18252 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_3733_community_3733": "Community 3733 - \"Community 3733\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L18256 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_3734_community_3734": "Community 3734 - \"Community 3734\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L18260 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_3735_community_3735": "Community 3735 - \"Community 3735\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L18264 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_3736_community_3736": "Community 3736 - \"Community 3736\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L18268 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_3737_community_3737": "Community 3737 - \"Community 3737\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L18272 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_3738_community_3738": "Community 3738 - \"Community 3738\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L18276 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_3739_community_3739": "Community 3739 - \"Community 3739\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L18280 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_374_community_374": "Community 374 - \"Community 374\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L5980 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_3740_community_3740": "Community 3740 - \"Community 3740\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L18284 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_3741_community_3741": "Community 3741 - \"Community 3741\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L18288 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_3742_community_3742": "Community 3742 - \"Community 3742\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L18292 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_3743_community_3743": "Community 3743 - \"Community 3743\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L18296 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_3744_community_3744": "Community 3744 - \"Community 3744\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L18300 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_3745_community_3745": "Community 3745 - \"Community 3745\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L18304 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_3746_community_3746": "Community 3746 - \"Community 3746\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L18308 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_3747_community_3747": "Community 3747 - \"Community 3747\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L18312 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_3748_community_3748": "Community 3748 - \"Community 3748\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L18316 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_3749_community_3749": "Community 3749 - \"Community 3749\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L18320 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_375_community_375": "Community 375 - \"Community 375\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L5984 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_3750_community_3750": "Community 3750 - \"Community 3750\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L18324 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_3751_community_3751": "Community 3751 - \"Community 3751\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L18328 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_3752_community_3752": "Community 3752 - \"Community 3752\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L18332 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_3753_community_3753": "Community 3753 - \"Community 3753\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L18336 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_3754_community_3754": "Community 3754 - \"Community 3754\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L18340 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_3755_community_3755": "Community 3755 - \"Community 3755\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L18344 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_3756_community_3756": "Community 3756 - \"Community 3756\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L18348 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_3757_community_3757": "Community 3757 - \"Community 3757\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L18352 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_3758_community_3758": "Community 3758 - \"Community 3758\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L18356 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_3759_community_3759": "Community 3759 - \"Community 3759\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L18360 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_376_community_376": "Community 376 - \"Community 376\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L5988 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_3760_community_3760": "Community 3760 - \"Community 3760\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L18364 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_3761_community_3761": "Community 3761 - \"Community 3761\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L18368 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_3762_community_3762": "Community 3762 - \"Community 3762\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L18372 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_3763_community_3763": "Community 3763 - \"Community 3763\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L18376 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_3764_community_3764": "Community 3764 - \"Community 3764\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L18380 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_3765_community_3765": "Community 3765 - \"Community 3765\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L18384 | neighbors=[Communities (6571 total, 806 thin omitt…]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\PTOW\1_APT_Central_Command\.graphify\description-instructions\batch-301.json

Keep each description factual and concise (one sentence). No markdown, no prose
outside the JSON object. It is acceptable to omit a node if context is
insufficient — but include every node you can ground confidently.

Example answer format:
```json
{
  "node_id_1": "Resolves the configured ontology profile from graphify.yaml.",
  "node_id_2": "Colonel James Barclay, an antagonist in The Crooked Man."
}
```
