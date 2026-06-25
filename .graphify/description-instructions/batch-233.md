# Node Description Batch 234 of 412

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

- "graphs_graph_report_community_1031_community_1031": "Community 1031 - \"Community 1031\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L8556 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_104_community_104": "Community 104 - \"Community 104\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L4900 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_105_community_105": "Community 105 - \"Community 105\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L4904 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1050_community_1050": "Community 1050 - \"Community 1050\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L8560 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1051_community_1051": "Community 1051 - \"Community 1051\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L8564 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1052_community_1052": "Community 1052 - \"Community 1052\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L8568 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1053_community_1053": "Community 1053 - \"Community 1053\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L8572 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1054_community_1054": "Community 1054 - \"Community 1054\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L8576 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1055_community_1055": "Community 1055 - \"Community 1055\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L8580 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1056_community_1056": "Community 1056 - \"Community 1056\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L8584 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1057_community_1057": "Community 1057 - \"Community 1057\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L8588 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1058_community_1058": "Community 1058 - \"Community 1058\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L8592 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1059_community_1059": "Community 1059 - \"Community 1059\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L8596 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_106_community_106": "Community 106 - \"Community 106\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L4908 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1060_community_1060": "Community 1060 - \"Community 1060\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L8600 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1061_community_1061": "Community 1061 - \"Community 1061\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L8604 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1062_community_1062": "Community 1062 - \"Community 1062\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L8608 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1063_community_1063": "Community 1063 - \"Community 1063\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L8612 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1064_community_1064": "Community 1064 - \"Community 1064\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L8616 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1065_community_1065": "Community 1065 - \"Community 1065\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L8620 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1066_community_1066": "Community 1066 - \"Community 1066\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L8624 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1067_community_1067": "Community 1067 - \"Community 1067\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L8628 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1069_community_1069": "Community 1069 - \"Community 1069\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L8632 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_107_community_107": "Community 107 - \"Community 107\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L4912 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1070_community_1070": "Community 1070 - \"Community 1070\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L8636 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1071_community_1071": "Community 1071 - \"Community 1071\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L8640 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1072_community_1072": "Community 1072 - \"Community 1072\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L8644 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_108_community_108": "Community 108 - \"Community 108\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L4916 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1084_community_1084": "Community 1084 - \"Community 1084\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L8648 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1085_community_1085": "Community 1085 - \"Community 1085\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L8652 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1087_community_1087": "Community 1087 - \"Community 1087\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L8656 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1088_community_1088": "Community 1088 - \"Community 1088\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L8660 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_109_community_109": "Community 109 - \"Community 109\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L4920 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1090_community_1090": "Community 1090 - \"Community 1090\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L8664 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_11_dev_dependencies": "Community 11 - \"Dev Dependencies\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L4744 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_110_community_110": "Community 110 - \"Community 110\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L4924 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_111_community_111": "Community 111 - \"Community 111\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L4928 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_112_community_112": "Community 112 - \"Community 112\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L4932 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1121_community_1121": "Community 1121 - \"Community 1121\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L8668 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1122_community_1122": "Community 1122 - \"Community 1122\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L8672 | neighbors=[Communities (6571 total, 806 thin omitt…]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\PTOW\1_APT_Central_Command\.graphify\description-instructions\batch-233.json

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
