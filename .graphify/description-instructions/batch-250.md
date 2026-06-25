# Node Description Batch 251 of 412

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

- "graphs_graph_report_community_1894_community_1894": "Community 1894 - \"Community 1894\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L10900 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1895_community_1895": "Community 1895 - \"Community 1895\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L10904 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1896_community_1896": "Community 1896 - \"Community 1896\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L10908 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1897_community_1897": "Community 1897 - \"Community 1897\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L10912 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1898_community_1898": "Community 1898 - \"Community 1898\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L10916 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1899_community_1899": "Community 1899 - \"Community 1899\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L10920 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_19_app_layout_providers": "Community 19 - \"App Layout + Providers\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L4776 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_190_community_190": "Community 190 - \"Community 190\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L5244 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1900_community_1900": "Community 1900 - \"Community 1900\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L10924 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1901_community_1901": "Community 1901 - \"Community 1901\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L10928 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1902_community_1902": "Community 1902 - \"Community 1902\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L10932 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1903_community_1903": "Community 1903 - \"Community 1903\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L10936 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1904_community_1904": "Community 1904 - \"Community 1904\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L10940 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1905_community_1905": "Community 1905 - \"Community 1905\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L10944 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1906_community_1906": "Community 1906 - \"Community 1906\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L10948 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1907_community_1907": "Community 1907 - \"Community 1907\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L10952 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1908_community_1908": "Community 1908 - \"Community 1908\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L10956 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1909_community_1909": "Community 1909 - \"Community 1909\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L10960 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_191_community_191": "Community 191 - \"Community 191\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L5248 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1910_community_1910": "Community 1910 - \"Community 1910\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L10964 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1911_community_1911": "Community 1911 - \"Community 1911\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L10968 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1912_community_1912": "Community 1912 - \"Community 1912\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L10972 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1913_community_1913": "Community 1913 - \"Community 1913\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L10976 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1914_community_1914": "Community 1914 - \"Community 1914\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L10980 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1915_community_1915": "Community 1915 - \"Community 1915\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L10984 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1916_community_1916": "Community 1916 - \"Community 1916\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L10988 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1917_community_1917": "Community 1917 - \"Community 1917\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L10992 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1918_community_1918": "Community 1918 - \"Community 1918\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L10996 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1919_community_1919": "Community 1919 - \"Community 1919\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L11000 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_192_community_192": "Community 192 - \"Community 192\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L5252 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1920_community_1920": "Community 1920 - \"Community 1920\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L11004 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1921_community_1921": "Community 1921 - \"Community 1921\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L11008 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1922_community_1922": "Community 1922 - \"Community 1922\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L11012 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1923_community_1923": "Community 1923 - \"Community 1923\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L11016 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1924_community_1924": "Community 1924 - \"Community 1924\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L11020 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1925_community_1925": "Community 1925 - \"Community 1925\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L11024 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1926_community_1926": "Community 1926 - \"Community 1926\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L11028 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1927_community_1927": "Community 1927 - \"Community 1927\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L11032 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1928_community_1928": "Community 1928 - \"Community 1928\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L11036 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1929_community_1929": "Community 1929 - \"Community 1929\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L11040 | neighbors=[Communities (6571 total, 806 thin omitt…]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\PTOW\1_APT_Central_Command\.graphify\description-instructions\batch-250.json

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
