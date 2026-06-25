# Node Description Batch 254 of 412

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

- "graphs_graph_report_community_2000_community_2000": "Community 2000 - \"Community 2000\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L11324 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_2001_community_2001": "Community 2001 - \"Community 2001\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L11328 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_2002_community_2002": "Community 2002 - \"Community 2002\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L11332 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_2003_community_2003": "Community 2003 - \"Community 2003\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L11336 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_2004_community_2004": "Community 2004 - \"Community 2004\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L11340 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_2005_community_2005": "Community 2005 - \"Community 2005\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L11344 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_2006_community_2006": "Community 2006 - \"Community 2006\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L11348 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_2007_community_2007": "Community 2007 - \"Community 2007\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L11352 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_2008_community_2008": "Community 2008 - \"Community 2008\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L11356 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_2009_community_2009": "Community 2009 - \"Community 2009\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L11360 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_201_community_201": "Community 201 - \"Community 201\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L5288 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_2010_community_2010": "Community 2010 - \"Community 2010\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L11364 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_2011_community_2011": "Community 2011 - \"Community 2011\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L11368 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_2012_community_2012": "Community 2012 - \"Community 2012\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L11372 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_2013_community_2013": "Community 2013 - \"Community 2013\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L11376 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_2014_community_2014": "Community 2014 - \"Community 2014\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L11380 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_2015_community_2015": "Community 2015 - \"Community 2015\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L11384 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_2016_community_2016": "Community 2016 - \"Community 2016\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L11388 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_2017_community_2017": "Community 2017 - \"Community 2017\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L11392 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_2018_community_2018": "Community 2018 - \"Community 2018\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L11396 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_2019_community_2019": "Community 2019 - \"Community 2019\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L11400 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_202_community_202": "Community 202 - \"Community 202\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L5292 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_2020_community_2020": "Community 2020 - \"Community 2020\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L11404 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_2021_community_2021": "Community 2021 - \"Community 2021\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L11408 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_2022_community_2022": "Community 2022 - \"Community 2022\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L11412 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_2023_community_2023": "Community 2023 - \"Community 2023\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L11416 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_2024_community_2024": "Community 2024 - \"Community 2024\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L11420 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_2025_community_2025": "Community 2025 - \"Community 2025\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L11424 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_2026_community_2026": "Community 2026 - \"Community 2026\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L11428 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_2027_community_2027": "Community 2027 - \"Community 2027\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L11432 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_2028_community_2028": "Community 2028 - \"Community 2028\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L11436 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_2029_community_2029": "Community 2029 - \"Community 2029\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L11440 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_203_community_203": "Community 203 - \"Community 203\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L5296 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_2030_community_2030": "Community 2030 - \"Community 2030\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L11444 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_2031_community_2031": "Community 2031 - \"Community 2031\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L11448 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_2032_community_2032": "Community 2032 - \"Community 2032\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L11452 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_2033_community_2033": "Community 2033 - \"Community 2033\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L11456 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_2034_community_2034": "Community 2034 - \"Community 2034\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L11460 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_2035_community_2035": "Community 2035 - \"Community 2035\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L11464 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_2036_community_2036": "Community 2036 - \"Community 2036\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L11468 | neighbors=[Communities (6571 total, 806 thin omitt…]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\PTOW\1_APT_Central_Command\.graphify\description-instructions\batch-253.json

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
