# Node Description Batch 239 of 412

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

- "graphs_graph_report_community_1461_community_1461": "Community 1461 - \"Community 1461\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L9168 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1462_community_1462": "Community 1462 - \"Community 1462\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L9172 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1463_community_1463": "Community 1463 - \"Community 1463\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L9176 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1464_community_1464": "Community 1464 - \"Community 1464\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L9180 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1465_community_1465": "Community 1465 - \"Community 1465\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L9184 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1466_community_1466": "Community 1466 - \"Community 1466\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L9188 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1467_community_1467": "Community 1467 - \"Community 1467\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L9192 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1468_community_1468": "Community 1468 - \"Community 1468\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L9196 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1469_community_1469": "Community 1469 - \"Community 1469\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L9200 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_147_community_147": "Community 147 - \"Community 147\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L5072 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1470_community_1470": "Community 1470 - \"Community 1470\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L9204 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1471_community_1471": "Community 1471 - \"Community 1471\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L9208 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1472_community_1472": "Community 1472 - \"Community 1472\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L9212 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1473_community_1473": "Community 1473 - \"Community 1473\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L9216 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1474_community_1474": "Community 1474 - \"Community 1474\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L9220 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1475_community_1475": "Community 1475 - \"Community 1475\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L9224 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1476_community_1476": "Community 1476 - \"Community 1476\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L9228 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1477_community_1477": "Community 1477 - \"Community 1477\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L9232 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1478_community_1478": "Community 1478 - \"Community 1478\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L9236 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1479_community_1479": "Community 1479 - \"Community 1479\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L9240 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_148_community_148": "Community 148 - \"Community 148\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L5076 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1480_community_1480": "Community 1480 - \"Community 1480\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L9244 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1481_community_1481": "Community 1481 - \"Community 1481\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L9248 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1482_community_1482": "Community 1482 - \"Community 1482\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L9252 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1483_community_1483": "Community 1483 - \"Community 1483\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L9256 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1484_community_1484": "Community 1484 - \"Community 1484\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L9260 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1485_community_1485": "Community 1485 - \"Community 1485\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L9264 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1486_community_1486": "Community 1486 - \"Community 1486\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L9268 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1487_community_1487": "Community 1487 - \"Community 1487\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L9272 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1488_community_1488": "Community 1488 - \"Community 1488\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L9276 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1489_community_1489": "Community 1489 - \"Community 1489\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L9280 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_149_community_149": "Community 149 - \"Community 149\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L5080 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1490_community_1490": "Community 1490 - \"Community 1490\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L9284 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1491_community_1491": "Community 1491 - \"Community 1491\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L9288 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1492_community_1492": "Community 1492 - \"Community 1492\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L9292 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1493_community_1493": "Community 1493 - \"Community 1493\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L9296 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1494_community_1494": "Community 1494 - \"Community 1494\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L9300 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1495_community_1495": "Community 1495 - \"Community 1495\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L9304 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1496_community_1496": "Community 1496 - \"Community 1496\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L9308 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1497_community_1497": "Community 1497 - \"Community 1497\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L9312 | neighbors=[Communities (6571 total, 806 thin omitt…]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\PTOW\1_APT_Central_Command\.graphify\description-instructions\batch-238.json

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
