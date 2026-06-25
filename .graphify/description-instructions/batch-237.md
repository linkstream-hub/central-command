# Node Description Batch 238 of 412

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

- "graphs_graph_report_community_1425_community_1425": "Community 1425 - \"Community 1425\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L9024 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1426_community_1426": "Community 1426 - \"Community 1426\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L9028 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1427_community_1427": "Community 1427 - \"Community 1427\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L9032 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1428_community_1428": "Community 1428 - \"Community 1428\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L9036 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1429_community_1429": "Community 1429 - \"Community 1429\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L9040 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_143_community_143": "Community 143 - \"Community 143\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L5056 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1430_community_1430": "Community 1430 - \"Community 1430\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L9044 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1431_community_1431": "Community 1431 - \"Community 1431\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L9048 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1432_community_1432": "Community 1432 - \"Community 1432\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L9052 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1433_community_1433": "Community 1433 - \"Community 1433\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L9056 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1434_community_1434": "Community 1434 - \"Community 1434\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L9060 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1435_community_1435": "Community 1435 - \"Community 1435\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L9064 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1436_community_1436": "Community 1436 - \"Community 1436\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L9068 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1437_community_1437": "Community 1437 - \"Community 1437\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L9072 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1438_community_1438": "Community 1438 - \"Community 1438\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L9076 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1439_community_1439": "Community 1439 - \"Community 1439\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L9080 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_144_community_144": "Community 144 - \"Community 144\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L5060 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1440_community_1440": "Community 1440 - \"Community 1440\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L9084 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1441_community_1441": "Community 1441 - \"Community 1441\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L9088 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1442_community_1442": "Community 1442 - \"Community 1442\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L9092 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1443_community_1443": "Community 1443 - \"Community 1443\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L9096 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1444_community_1444": "Community 1444 - \"Community 1444\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L9100 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1445_community_1445": "Community 1445 - \"Community 1445\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L9104 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1446_community_1446": "Community 1446 - \"Community 1446\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L9108 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1447_community_1447": "Community 1447 - \"Community 1447\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L9112 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1448_community_1448": "Community 1448 - \"Community 1448\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L9116 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1449_community_1449": "Community 1449 - \"Community 1449\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L9120 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_145_community_145": "Community 145 - \"Community 145\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L5064 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1450_community_1450": "Community 1450 - \"Community 1450\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L9124 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1451_community_1451": "Community 1451 - \"Community 1451\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L9128 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1452_community_1452": "Community 1452 - \"Community 1452\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L9132 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1453_community_1453": "Community 1453 - \"Community 1453\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L9136 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1454_community_1454": "Community 1454 - \"Community 1454\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L9140 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1455_community_1455": "Community 1455 - \"Community 1455\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L9144 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1456_community_1456": "Community 1456 - \"Community 1456\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L9148 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1457_community_1457": "Community 1457 - \"Community 1457\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L9152 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1458_community_1458": "Community 1458 - \"Community 1458\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L9156 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1459_community_1459": "Community 1459 - \"Community 1459\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L9160 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_146_community_146": "Community 146 - \"Community 146\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L5068 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1460_community_1460": "Community 1460 - \"Community 1460\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L9164 | neighbors=[Communities (6571 total, 806 thin omitt…]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\PTOW\1_APT_Central_Command\.graphify\description-instructions\batch-237.json

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
