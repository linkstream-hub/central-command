# Node Description Batch 244 of 412

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

- "graphs_graph_report_community_1641_community_1641": "Community 1641 - \"Community 1641\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L9888 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1642_community_1642": "Community 1642 - \"Community 1642\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L9892 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1643_community_1643": "Community 1643 - \"Community 1643\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L9896 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1644_community_1644": "Community 1644 - \"Community 1644\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L9900 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1645_community_1645": "Community 1645 - \"Community 1645\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L9904 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1646_community_1646": "Community 1646 - \"Community 1646\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L9908 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1647_community_1647": "Community 1647 - \"Community 1647\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L9912 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1648_community_1648": "Community 1648 - \"Community 1648\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L9916 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1649_community_1649": "Community 1649 - \"Community 1649\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L9920 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_165_community_165": "Community 165 - \"Community 165\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L5144 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1650_community_1650": "Community 1650 - \"Community 1650\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L9924 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1651_community_1651": "Community 1651 - \"Community 1651\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L9928 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1652_community_1652": "Community 1652 - \"Community 1652\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L9932 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1653_community_1653": "Community 1653 - \"Community 1653\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L9936 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1654_community_1654": "Community 1654 - \"Community 1654\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L9940 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1655_community_1655": "Community 1655 - \"Community 1655\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L9944 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1656_community_1656": "Community 1656 - \"Community 1656\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L9948 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1657_community_1657": "Community 1657 - \"Community 1657\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L9952 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1658_community_1658": "Community 1658 - \"Community 1658\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L9956 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1659_community_1659": "Community 1659 - \"Community 1659\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L9960 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_166_community_166": "Community 166 - \"Community 166\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L5148 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1660_community_1660": "Community 1660 - \"Community 1660\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L9964 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1661_community_1661": "Community 1661 - \"Community 1661\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L9968 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1662_community_1662": "Community 1662 - \"Community 1662\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L9972 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1663_community_1663": "Community 1663 - \"Community 1663\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L9976 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1664_community_1664": "Community 1664 - \"Community 1664\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L9980 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1665_community_1665": "Community 1665 - \"Community 1665\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L9984 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1666_community_1666": "Community 1666 - \"Community 1666\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L9988 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1667_community_1667": "Community 1667 - \"Community 1667\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L9992 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1668_community_1668": "Community 1668 - \"Community 1668\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L9996 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1669_community_1669": "Community 1669 - \"Community 1669\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L10000 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_167_community_167": "Community 167 - \"Community 167\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L5152 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1670_community_1670": "Community 1670 - \"Community 1670\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L10004 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1671_community_1671": "Community 1671 - \"Community 1671\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L10008 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1672_community_1672": "Community 1672 - \"Community 1672\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L10012 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1673_community_1673": "Community 1673 - \"Community 1673\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L10016 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1674_community_1674": "Community 1674 - \"Community 1674\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L10020 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1675_community_1675": "Community 1675 - \"Community 1675\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L10024 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1676_community_1676": "Community 1676 - \"Community 1676\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L10028 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1677_community_1677": "Community 1677 - \"Community 1677\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L10032 | neighbors=[Communities (6571 total, 806 thin omitt…]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\PTOW\1_APT_Central_Command\.graphify\description-instructions\batch-243.json

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
