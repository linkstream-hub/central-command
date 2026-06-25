# Node Description Batch 245 of 412

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

- "graphs_graph_report_community_1678_community_1678": "Community 1678 - \"Community 1678\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L10036 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1679_community_1679": "Community 1679 - \"Community 1679\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L10040 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_168_community_168": "Community 168 - \"Community 168\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L5156 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1680_community_1680": "Community 1680 - \"Community 1680\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L10044 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1681_community_1681": "Community 1681 - \"Community 1681\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L10048 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1682_community_1682": "Community 1682 - \"Community 1682\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L10052 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1683_community_1683": "Community 1683 - \"Community 1683\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L10056 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1684_community_1684": "Community 1684 - \"Community 1684\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L10060 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1685_community_1685": "Community 1685 - \"Community 1685\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L10064 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1686_community_1686": "Community 1686 - \"Community 1686\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L10068 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1687_community_1687": "Community 1687 - \"Community 1687\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L10072 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1688_community_1688": "Community 1688 - \"Community 1688\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L10076 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1689_community_1689": "Community 1689 - \"Community 1689\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L10080 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_169_community_169": "Community 169 - \"Community 169\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L5160 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1690_community_1690": "Community 1690 - \"Community 1690\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L10084 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1691_community_1691": "Community 1691 - \"Community 1691\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L10088 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1692_community_1692": "Community 1692 - \"Community 1692\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L10092 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1693_community_1693": "Community 1693 - \"Community 1693\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L10096 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1694_community_1694": "Community 1694 - \"Community 1694\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L10100 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1695_community_1695": "Community 1695 - \"Community 1695\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L10104 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1696_community_1696": "Community 1696 - \"Community 1696\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L10108 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1697_community_1697": "Community 1697 - \"Community 1697\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L10112 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1698_community_1698": "Community 1698 - \"Community 1698\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L10116 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1699_community_1699": "Community 1699 - \"Community 1699\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L10120 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_17_admin_api_routes": "Community 17 - \"Admin API Routes\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L4768 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_170_community_170": "Community 170 - \"Community 170\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L5164 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1700_community_1700": "Community 1700 - \"Community 1700\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L10124 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1701_community_1701": "Community 1701 - \"Community 1701\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L10128 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1702_community_1702": "Community 1702 - \"Community 1702\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L10132 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1703_community_1703": "Community 1703 - \"Community 1703\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L10136 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1704_community_1704": "Community 1704 - \"Community 1704\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L10140 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1705_community_1705": "Community 1705 - \"Community 1705\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L10144 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1706_community_1706": "Community 1706 - \"Community 1706\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L10148 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1707_community_1707": "Community 1707 - \"Community 1707\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L10152 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1708_community_1708": "Community 1708 - \"Community 1708\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L10156 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1709_community_1709": "Community 1709 - \"Community 1709\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L10160 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_171_community_171": "Community 171 - \"Community 171\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L5168 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1710_community_1710": "Community 1710 - \"Community 1710\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L10164 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1711_community_1711": "Community 1711 - \"Community 1711\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L10168 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1712_community_1712": "Community 1712 - \"Community 1712\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L10172 | neighbors=[Communities (6571 total, 806 thin omitt…]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\PTOW\1_APT_Central_Command\.graphify\description-instructions\batch-244.json

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
