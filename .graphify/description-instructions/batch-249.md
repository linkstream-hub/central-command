# Node Description Batch 250 of 412

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

- "graphs_graph_report_community_1858_community_1858": "Community 1858 - \"Community 1858\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L10756 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1859_community_1859": "Community 1859 - \"Community 1859\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L10760 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_186_community_186": "Community 186 - \"Community 186\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L5228 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1860_community_1860": "Community 1860 - \"Community 1860\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L10764 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1861_community_1861": "Community 1861 - \"Community 1861\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L10768 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1862_community_1862": "Community 1862 - \"Community 1862\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L10772 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1863_community_1863": "Community 1863 - \"Community 1863\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L10776 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1864_community_1864": "Community 1864 - \"Community 1864\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L10780 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1865_community_1865": "Community 1865 - \"Community 1865\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L10784 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1866_community_1866": "Community 1866 - \"Community 1866\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L10788 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1867_community_1867": "Community 1867 - \"Community 1867\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L10792 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1868_community_1868": "Community 1868 - \"Community 1868\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L10796 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1869_community_1869": "Community 1869 - \"Community 1869\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L10800 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_187_community_187": "Community 187 - \"Community 187\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L5232 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1870_community_1870": "Community 1870 - \"Community 1870\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L10804 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1871_community_1871": "Community 1871 - \"Community 1871\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L10808 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1872_community_1872": "Community 1872 - \"Community 1872\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L10812 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1873_community_1873": "Community 1873 - \"Community 1873\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L10816 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1874_community_1874": "Community 1874 - \"Community 1874\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L10820 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1875_community_1875": "Community 1875 - \"Community 1875\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L10824 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1876_community_1876": "Community 1876 - \"Community 1876\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L10828 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1877_community_1877": "Community 1877 - \"Community 1877\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L10832 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1878_community_1878": "Community 1878 - \"Community 1878\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L10836 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1879_community_1879": "Community 1879 - \"Community 1879\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L10840 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_188_community_188": "Community 188 - \"Community 188\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L5236 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1880_community_1880": "Community 1880 - \"Community 1880\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L10844 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1881_community_1881": "Community 1881 - \"Community 1881\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L10848 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1882_community_1882": "Community 1882 - \"Community 1882\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L10852 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1883_community_1883": "Community 1883 - \"Community 1883\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L10856 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1884_community_1884": "Community 1884 - \"Community 1884\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L10860 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1885_community_1885": "Community 1885 - \"Community 1885\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L10864 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1886_community_1886": "Community 1886 - \"Community 1886\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L10868 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1887_community_1887": "Community 1887 - \"Community 1887\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L10872 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1888_community_1888": "Community 1888 - \"Community 1888\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L10876 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1889_community_1889": "Community 1889 - \"Community 1889\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L10880 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_189_community_189": "Community 189 - \"Community 189\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L5240 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1890_community_1890": "Community 1890 - \"Community 1890\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L10884 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1891_community_1891": "Community 1891 - \"Community 1891\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L10888 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1892_community_1892": "Community 1892 - \"Community 1892\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L10892 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1893_community_1893": "Community 1893 - \"Community 1893\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L10896 | neighbors=[Communities (6571 total, 806 thin omitt…]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\PTOW\1_APT_Central_Command\.graphify\description-instructions\batch-249.json

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
