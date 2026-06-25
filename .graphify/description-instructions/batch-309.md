# Node Description Batch 310 of 412

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

- "graphs_graph_report_community_4017_community_4017": "Community 4017 - \"Community 4017\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L19392 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_4018_community_4018": "Community 4018 - \"Community 4018\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L19396 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_4019_community_4019": "Community 4019 - \"Community 4019\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L19400 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_402_community_402": "Community 402 - \"Community 402\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L6092 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_4020_community_4020": "Community 4020 - \"Community 4020\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L19404 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_4021_community_4021": "Community 4021 - \"Community 4021\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L19408 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_4022_community_4022": "Community 4022 - \"Community 4022\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L19412 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_4023_community_4023": "Community 4023 - \"Community 4023\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L19416 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_4024_community_4024": "Community 4024 - \"Community 4024\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L19420 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_4025_community_4025": "Community 4025 - \"Community 4025\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L19424 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_4026_community_4026": "Community 4026 - \"Community 4026\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L19428 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_4027_community_4027": "Community 4027 - \"Community 4027\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L19432 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_4028_community_4028": "Community 4028 - \"Community 4028\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L19436 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_4029_community_4029": "Community 4029 - \"Community 4029\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L19440 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_403_community_403": "Community 403 - \"Community 403\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L6096 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_4030_community_4030": "Community 4030 - \"Community 4030\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L19444 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_4031_community_4031": "Community 4031 - \"Community 4031\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L19448 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_4032_community_4032": "Community 4032 - \"Community 4032\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L19452 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_4033_community_4033": "Community 4033 - \"Community 4033\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L19456 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_4034_community_4034": "Community 4034 - \"Community 4034\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L19460 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_4035_community_4035": "Community 4035 - \"Community 4035\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L19464 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_4036_community_4036": "Community 4036 - \"Community 4036\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L19468 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_4037_community_4037": "Community 4037 - \"Community 4037\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L19472 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_4038_community_4038": "Community 4038 - \"Community 4038\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L19476 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_4039_community_4039": "Community 4039 - \"Community 4039\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L19480 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_404_community_404": "Community 404 - \"Community 404\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L6100 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_4040_community_4040": "Community 4040 - \"Community 4040\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L19484 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_4041_community_4041": "Community 4041 - \"Community 4041\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L19488 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_4042_community_4042": "Community 4042 - \"Community 4042\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L19492 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_4043_community_4043": "Community 4043 - \"Community 4043\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L19496 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_4044_community_4044": "Community 4044 - \"Community 4044\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L19500 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_4045_community_4045": "Community 4045 - \"Community 4045\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L19504 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_4046_community_4046": "Community 4046 - \"Community 4046\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L19508 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_4047_community_4047": "Community 4047 - \"Community 4047\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L19512 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_4048_community_4048": "Community 4048 - \"Community 4048\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L19516 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_4049_community_4049": "Community 4049 - \"Community 4049\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L19520 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_405_community_405": "Community 405 - \"Community 405\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L6104 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_4050_community_4050": "Community 4050 - \"Community 4050\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L19524 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_4051_community_4051": "Community 4051 - \"Community 4051\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L19528 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_4052_community_4052": "Community 4052 - \"Community 4052\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L19532 | neighbors=[Communities (6571 total, 806 thin omitt…]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\PTOW\1_APT_Central_Command\.graphify\description-instructions\batch-309.json

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
