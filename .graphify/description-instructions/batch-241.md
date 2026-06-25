# Node Description Batch 242 of 412

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

- "graphs_graph_report_community_157_community_157": "Community 157 - \"Community 157\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L5112 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1570_community_1570": "Community 1570 - \"Community 1570\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L9604 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1571_community_1571": "Community 1571 - \"Community 1571\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L9608 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1572_community_1572": "Community 1572 - \"Community 1572\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L9612 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1573_community_1573": "Community 1573 - \"Community 1573\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L9616 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1574_community_1574": "Community 1574 - \"Community 1574\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L9620 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1575_community_1575": "Community 1575 - \"Community 1575\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L9624 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1576_community_1576": "Community 1576 - \"Community 1576\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L9628 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1577_community_1577": "Community 1577 - \"Community 1577\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L9632 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1578_community_1578": "Community 1578 - \"Community 1578\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L9636 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1579_community_1579": "Community 1579 - \"Community 1579\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L9640 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_158_community_158": "Community 158 - \"Community 158\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L5116 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1580_community_1580": "Community 1580 - \"Community 1580\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L9644 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1581_community_1581": "Community 1581 - \"Community 1581\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L9648 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1582_community_1582": "Community 1582 - \"Community 1582\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L9652 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1583_community_1583": "Community 1583 - \"Community 1583\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L9656 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1584_community_1584": "Community 1584 - \"Community 1584\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L9660 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1585_community_1585": "Community 1585 - \"Community 1585\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L9664 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1586_community_1586": "Community 1586 - \"Community 1586\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L9668 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1587_community_1587": "Community 1587 - \"Community 1587\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L9672 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1588_community_1588": "Community 1588 - \"Community 1588\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L9676 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1589_community_1589": "Community 1589 - \"Community 1589\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L9680 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_159_community_159": "Community 159 - \"Community 159\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L5120 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1590_community_1590": "Community 1590 - \"Community 1590\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L9684 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1591_community_1591": "Community 1591 - \"Community 1591\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L9688 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1592_community_1592": "Community 1592 - \"Community 1592\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L9692 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1593_community_1593": "Community 1593 - \"Community 1593\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L9696 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1594_community_1594": "Community 1594 - \"Community 1594\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L9700 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1595_community_1595": "Community 1595 - \"Community 1595\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L9704 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1596_community_1596": "Community 1596 - \"Community 1596\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L9708 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1597_community_1597": "Community 1597 - \"Community 1597\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L9712 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1598_community_1598": "Community 1598 - \"Community 1598\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L9716 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1599_community_1599": "Community 1599 - \"Community 1599\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L9720 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_16_gmail_email_client": "Community 16 - \"Gmail Email Client\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L4764 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_160_community_160": "Community 160 - \"Community 160\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L5124 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1600_community_1600": "Community 1600 - \"Community 1600\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L9724 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1601_community_1601": "Community 1601 - \"Community 1601\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L9728 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1602_community_1602": "Community 1602 - \"Community 1602\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L9732 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1603_community_1603": "Community 1603 - \"Community 1603\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L9736 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1604_community_1604": "Community 1604 - \"Community 1604\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L9740 | neighbors=[Communities (6571 total, 806 thin omitt…]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\PTOW\1_APT_Central_Command\.graphify\description-instructions\batch-241.json

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
