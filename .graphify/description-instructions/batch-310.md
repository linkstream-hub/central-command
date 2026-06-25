# Node Description Batch 311 of 412

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

- "graphs_graph_report_community_4053_community_4053": "Community 4053 - \"Community 4053\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L19536 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_4054_community_4054": "Community 4054 - \"Community 4054\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L19540 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_4055_community_4055": "Community 4055 - \"Community 4055\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L19544 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_4056_community_4056": "Community 4056 - \"Community 4056\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L19548 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_4057_community_4057": "Community 4057 - \"Community 4057\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L19552 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_4058_community_4058": "Community 4058 - \"Community 4058\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L19556 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_4059_community_4059": "Community 4059 - \"Community 4059\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L19560 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_406_community_406": "Community 406 - \"Community 406\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L6108 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_4060_community_4060": "Community 4060 - \"Community 4060\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L19564 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_4061_community_4061": "Community 4061 - \"Community 4061\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L19568 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_4062_community_4062": "Community 4062 - \"Community 4062\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L19572 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_4063_community_4063": "Community 4063 - \"Community 4063\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L19576 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_4064_community_4064": "Community 4064 - \"Community 4064\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L19580 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_4065_community_4065": "Community 4065 - \"Community 4065\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L19584 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_4066_community_4066": "Community 4066 - \"Community 4066\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L19588 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_4067_community_4067": "Community 4067 - \"Community 4067\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L19592 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_4068_community_4068": "Community 4068 - \"Community 4068\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L19596 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_4069_community_4069": "Community 4069 - \"Community 4069\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L19600 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_407_community_407": "Community 407 - \"Community 407\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L6112 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_4070_community_4070": "Community 4070 - \"Community 4070\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L19604 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_4071_community_4071": "Community 4071 - \"Community 4071\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L19608 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_4072_community_4072": "Community 4072 - \"Community 4072\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L19612 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_4073_community_4073": "Community 4073 - \"Community 4073\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L19616 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_4074_community_4074": "Community 4074 - \"Community 4074\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L19620 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_4075_community_4075": "Community 4075 - \"Community 4075\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L19624 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_4076_community_4076": "Community 4076 - \"Community 4076\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L19628 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_4077_community_4077": "Community 4077 - \"Community 4077\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L19632 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_4078_community_4078": "Community 4078 - \"Community 4078\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L19636 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_4079_community_4079": "Community 4079 - \"Community 4079\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L19640 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_408_community_408": "Community 408 - \"Community 408\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L6116 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_4080_community_4080": "Community 4080 - \"Community 4080\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L19644 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_4081_community_4081": "Community 4081 - \"Community 4081\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L19648 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_4082_community_4082": "Community 4082 - \"Community 4082\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L19652 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_4083_community_4083": "Community 4083 - \"Community 4083\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L19656 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_4084_community_4084": "Community 4084 - \"Community 4084\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L19660 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_4085_community_4085": "Community 4085 - \"Community 4085\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L19664 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_4086_community_4086": "Community 4086 - \"Community 4086\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L19668 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_4087_community_4087": "Community 4087 - \"Community 4087\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L19672 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_4088_community_4088": "Community 4088 - \"Community 4088\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L19676 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_4089_community_4089": "Community 4089 - \"Community 4089\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L19680 | neighbors=[Communities (6571 total, 806 thin omitt…]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\PTOW\1_APT_Central_Command\.graphify\description-instructions\batch-310.json

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
