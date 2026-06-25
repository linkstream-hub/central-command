# Node Description Batch 262 of 412

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

- "graphs_graph_report_community_229_community_229": "Community 229 - \"Community 229\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L5400 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_2290_community_2290": "Community 2290 - \"Community 2290\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L12484 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_2291_community_2291": "Community 2291 - \"Community 2291\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L12488 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_2292_community_2292": "Community 2292 - \"Community 2292\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L12492 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_2293_community_2293": "Community 2293 - \"Community 2293\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L12496 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_2294_community_2294": "Community 2294 - \"Community 2294\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L12500 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_2295_community_2295": "Community 2295 - \"Community 2295\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L12504 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_2296_community_2296": "Community 2296 - \"Community 2296\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L12508 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_2297_community_2297": "Community 2297 - \"Community 2297\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L12512 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_2298_community_2298": "Community 2298 - \"Community 2298\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L12516 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_2299_community_2299": "Community 2299 - \"Community 2299\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L12520 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_23_time_records_ca_compliance": "Community 23 - \"Time Records + CA Compliance\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L4792 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_230_community_230": "Community 230 - \"Community 230\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L5404 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_2300_community_2300": "Community 2300 - \"Community 2300\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L12524 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_2301_community_2301": "Community 2301 - \"Community 2301\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L12528 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_2302_community_2302": "Community 2302 - \"Community 2302\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L12532 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_2303_community_2303": "Community 2303 - \"Community 2303\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L12536 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_2304_community_2304": "Community 2304 - \"Community 2304\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L12540 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_2305_community_2305": "Community 2305 - \"Community 2305\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L12544 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_2306_community_2306": "Community 2306 - \"Community 2306\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L12548 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_2307_community_2307": "Community 2307 - \"Community 2307\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L12552 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_2308_community_2308": "Community 2308 - \"Community 2308\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L12556 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_2309_community_2309": "Community 2309 - \"Community 2309\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L12560 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_231_community_231": "Community 231 - \"Community 231\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L5408 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_2310_community_2310": "Community 2310 - \"Community 2310\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L12564 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_2311_community_2311": "Community 2311 - \"Community 2311\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L12568 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_2312_community_2312": "Community 2312 - \"Community 2312\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L12572 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_2313_community_2313": "Community 2313 - \"Community 2313\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L12576 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_2314_community_2314": "Community 2314 - \"Community 2314\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L12580 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_2315_community_2315": "Community 2315 - \"Community 2315\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L12584 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_2316_community_2316": "Community 2316 - \"Community 2316\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L12588 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_2317_community_2317": "Community 2317 - \"Community 2317\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L12592 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_2318_community_2318": "Community 2318 - \"Community 2318\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L12596 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_2319_community_2319": "Community 2319 - \"Community 2319\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L12600 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_232_community_232": "Community 232 - \"Community 232\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L5412 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_2320_community_2320": "Community 2320 - \"Community 2320\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L12604 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_2321_community_2321": "Community 2321 - \"Community 2321\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L12608 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_2322_community_2322": "Community 2322 - \"Community 2322\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L12612 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_2323_community_2323": "Community 2323 - \"Community 2323\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L12616 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_2324_community_2324": "Community 2324 - \"Community 2324\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L12620 | neighbors=[Communities (6571 total, 806 thin omitt…]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\PTOW\1_APT_Central_Command\.graphify\description-instructions\batch-261.json

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
