# Node Description Batch 282 of 412

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

- "graphs_graph_report_community_3009_community_3009": "Community 3009 - \"Community 3009\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L15360 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_301_community_301": "Community 301 - \"Community 301\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L5688 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_3010_community_3010": "Community 3010 - \"Community 3010\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L15364 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_3011_community_3011": "Community 3011 - \"Community 3011\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L15368 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_3012_community_3012": "Community 3012 - \"Community 3012\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L15372 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_3013_community_3013": "Community 3013 - \"Community 3013\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L15376 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_3014_community_3014": "Community 3014 - \"Community 3014\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L15380 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_3015_community_3015": "Community 3015 - \"Community 3015\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L15384 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_3016_community_3016": "Community 3016 - \"Community 3016\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L15388 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_3017_community_3017": "Community 3017 - \"Community 3017\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L15392 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_3018_community_3018": "Community 3018 - \"Community 3018\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L15396 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_3019_community_3019": "Community 3019 - \"Community 3019\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L15400 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_302_community_302": "Community 302 - \"Community 302\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L5692 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_3020_community_3020": "Community 3020 - \"Community 3020\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L15404 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_3021_community_3021": "Community 3021 - \"Community 3021\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L15408 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_3022_community_3022": "Community 3022 - \"Community 3022\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L15412 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_3023_community_3023": "Community 3023 - \"Community 3023\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L15416 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_3024_community_3024": "Community 3024 - \"Community 3024\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L15420 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_3025_community_3025": "Community 3025 - \"Community 3025\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L15424 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_3026_community_3026": "Community 3026 - \"Community 3026\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L15428 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_3027_community_3027": "Community 3027 - \"Community 3027\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L15432 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_3028_community_3028": "Community 3028 - \"Community 3028\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L15436 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_3029_community_3029": "Community 3029 - \"Community 3029\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L15440 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_303_community_303": "Community 303 - \"Community 303\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L5696 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_3030_community_3030": "Community 3030 - \"Community 3030\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L15444 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_3031_community_3031": "Community 3031 - \"Community 3031\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L15448 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_3032_community_3032": "Community 3032 - \"Community 3032\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L15452 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_3033_community_3033": "Community 3033 - \"Community 3033\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L15456 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_3034_community_3034": "Community 3034 - \"Community 3034\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L15460 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_3035_community_3035": "Community 3035 - \"Community 3035\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L15464 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_3036_community_3036": "Community 3036 - \"Community 3036\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L15468 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_3037_community_3037": "Community 3037 - \"Community 3037\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L15472 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_3038_community_3038": "Community 3038 - \"Community 3038\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L15476 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_3039_community_3039": "Community 3039 - \"Community 3039\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L15480 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_304_community_304": "Community 304 - \"Community 304\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L5700 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_3040_community_3040": "Community 3040 - \"Community 3040\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L15484 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_3041_community_3041": "Community 3041 - \"Community 3041\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L15488 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_3042_community_3042": "Community 3042 - \"Community 3042\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L15492 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_3043_community_3043": "Community 3043 - \"Community 3043\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L15496 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_3044_community_3044": "Community 3044 - \"Community 3044\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L15500 | neighbors=[Communities (6571 total, 806 thin omitt…]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\PTOW\1_APT_Central_Command\.graphify\description-instructions\batch-281.json

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
