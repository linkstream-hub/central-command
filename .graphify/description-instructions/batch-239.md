# Node Description Batch 240 of 412

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

- "graphs_graph_report_community_1498_community_1498": "Community 1498 - \"Community 1498\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L9316 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1499_community_1499": "Community 1499 - \"Community 1499\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L9320 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_15_e2e_test_infrastructure": "Community 15 - \"E2E Test Infrastructure\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L4760 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_150_community_150": "Community 150 - \"Community 150\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L5084 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1500_community_1500": "Community 1500 - \"Community 1500\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L9324 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1501_community_1501": "Community 1501 - \"Community 1501\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L9328 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1502_community_1502": "Community 1502 - \"Community 1502\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L9332 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1503_community_1503": "Community 1503 - \"Community 1503\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L9336 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1504_community_1504": "Community 1504 - \"Community 1504\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L9340 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1505_community_1505": "Community 1505 - \"Community 1505\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L9344 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1506_community_1506": "Community 1506 - \"Community 1506\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L9348 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1507_community_1507": "Community 1507 - \"Community 1507\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L9352 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1508_community_1508": "Community 1508 - \"Community 1508\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L9356 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1509_community_1509": "Community 1509 - \"Community 1509\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L9360 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_151_community_151": "Community 151 - \"Community 151\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L5088 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1510_community_1510": "Community 1510 - \"Community 1510\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L9364 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1511_community_1511": "Community 1511 - \"Community 1511\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L9368 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1512_community_1512": "Community 1512 - \"Community 1512\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L9372 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1513_community_1513": "Community 1513 - \"Community 1513\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L9376 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1514_community_1514": "Community 1514 - \"Community 1514\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L9380 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1515_community_1515": "Community 1515 - \"Community 1515\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L9384 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1516_community_1516": "Community 1516 - \"Community 1516\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L9388 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1517_community_1517": "Community 1517 - \"Community 1517\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L9392 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1518_community_1518": "Community 1518 - \"Community 1518\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L9396 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1519_community_1519": "Community 1519 - \"Community 1519\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L9400 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_152_community_152": "Community 152 - \"Community 152\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L5092 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1520_community_1520": "Community 1520 - \"Community 1520\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L9404 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1521_community_1521": "Community 1521 - \"Community 1521\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L9408 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1522_community_1522": "Community 1522 - \"Community 1522\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L9412 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1523_community_1523": "Community 1523 - \"Community 1523\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L9416 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1524_community_1524": "Community 1524 - \"Community 1524\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L9420 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1525_community_1525": "Community 1525 - \"Community 1525\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L9424 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1526_community_1526": "Community 1526 - \"Community 1526\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L9428 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1527_community_1527": "Community 1527 - \"Community 1527\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L9432 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1528_community_1528": "Community 1528 - \"Community 1528\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L9436 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1529_community_1529": "Community 1529 - \"Community 1529\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L9440 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_153_community_153": "Community 153 - \"Community 153\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L5096 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1530_community_1530": "Community 1530 - \"Community 1530\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L9444 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1531_community_1531": "Community 1531 - \"Community 1531\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L9448 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1532_community_1532": "Community 1532 - \"Community 1532\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L9452 | neighbors=[Communities (6571 total, 806 thin omitt…]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\PTOW\1_APT_Central_Command\.graphify\description-instructions\batch-239.json

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
