# Node Description Batch 235 of 412

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

- "graphs_graph_report_community_1123_community_1123": "Community 1123 - \"Community 1123\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L8676 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1124_community_1124": "Community 1124 - \"Community 1124\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L8680 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1125_community_1125": "Community 1125 - \"Community 1125\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L8684 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1126_community_1126": "Community 1126 - \"Community 1126\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L8688 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1127_community_1127": "Community 1127 - \"Community 1127\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L8692 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1128_community_1128": "Community 1128 - \"Community 1128\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L8696 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1129_community_1129": "Community 1129 - \"Community 1129\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L8700 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_113_community_113": "Community 113 - \"Community 113\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L4936 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1130_community_1130": "Community 1130 - \"Community 1130\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L8704 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1131_community_1131": "Community 1131 - \"Community 1131\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L8708 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1132_community_1132": "Community 1132 - \"Community 1132\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L8712 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1133_community_1133": "Community 1133 - \"Community 1133\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L8716 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1134_community_1134": "Community 1134 - \"Community 1134\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L8720 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1135_community_1135": "Community 1135 - \"Community 1135\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L8724 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1136_community_1136": "Community 1136 - \"Community 1136\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L8728 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_114_community_114": "Community 114 - \"Community 114\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L4940 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1148_community_1148": "Community 1148 - \"Community 1148\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L8732 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1149_community_1149": "Community 1149 - \"Community 1149\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L8736 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_115_community_115": "Community 115 - \"Community 115\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L4944 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1150_community_1150": "Community 1150 - \"Community 1150\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L8740 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1152_community_1152": "Community 1152 - \"Community 1152\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L8744 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_116_community_116": "Community 116 - \"Community 116\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L4948 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_117_community_117": "Community 117 - \"Community 117\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L4952 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_118_community_118": "Community 118 - \"Community 118\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L4956 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_119_community_119": "Community 119 - \"Community 119\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L4960 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_12_typescript_config": "Community 12 - \"TypeScript Config\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L4748 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_120_community_120": "Community 120 - \"Community 120\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L4964 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_121_community_121": "Community 121 - \"Community 121\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L4968 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_122_community_122": "Community 122 - \"Community 122\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L4972 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1226_community_1226": "Community 1226 - \"Community 1226\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L8748 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1227_community_1227": "Community 1227 - \"Community 1227\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L8752 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1228_community_1228": "Community 1228 - \"Community 1228\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L8756 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1229_community_1229": "Community 1229 - \"Community 1229\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L8760 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_123_community_123": "Community 123 - \"Community 123\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L4976 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1230_community_1230": "Community 1230 - \"Community 1230\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L8764 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1231_community_1231": "Community 1231 - \"Community 1231\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L8768 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1232_community_1232": "Community 1232 - \"Community 1232\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L8772 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1233_community_1233": "Community 1233 - \"Community 1233\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L8776 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1234_community_1234": "Community 1234 - \"Community 1234\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L8780 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1235_community_1235": "Community 1235 - \"Community 1235\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L8784 | neighbors=[Communities (6571 total, 806 thin omitt…]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\PTOW\1_APT_Central_Command\.graphify\description-instructions\batch-234.json

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
