# Node Description Batch 329 of 412

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
Write every description in Portuguese (pt). Do not switch languages.
No marketing language.
Respond ONLY with a JSON object mapping each node id (as a string) to its
one-sentence description — no prose, no markdown fences.

- "graphs_graph_report_community_986_community_986": "Community 986 - \"Community 986\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L8420 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_987_community_987": "Community 987 - \"Community 987\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L8424 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_988_community_988": "Community 988 - \"Community 988\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L8428 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_989_community_989": "Community 989 - \"Community 989\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L8432 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_990_community_990": "Community 990 - \"Community 990\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L8436 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_991_community_991": "Community 991 - \"Community 991\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L8440 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_992_community_992": "Community 992 - \"Community 992\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L8444 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_993_community_993": "Community 993 - \"Community 993\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L8448 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_994_community_994": "Community 994 - \"Community 994\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L8452 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_995_community_995": "Community 995 - \"Community 995\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L8456 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_996_community_996": "Community 996 - \"Community 996\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L8460 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_997_community_997": "Community 997 - \"Community 997\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L8464 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_998_community_998": "Community 998 - \"Community 998\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L8468 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_999_community_999": "Community 999 - \"Community 999\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L8472 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_hubs_navigation": "Community Hubs (Navigation)" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L17 | neighbors=[Graph Report - 1_APT_Central_Command  (…]
- "graphs_graph_report_corpus_check": "Corpus Check" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L3 | neighbors=[Graph Report - 1_APT_Central_Command  (…]
- "graphs_graph_report_god_nodes_most_connected_your_core_abstractions": "God Nodes (most connected - your core abstractions)" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L4666 | neighbors=[Graph Report - 1_APT_Central_Command  (…]
- "graphs_graph_report_graph_freshness": "Graph Freshness" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L12 | neighbors=[Graph Report - 1_APT_Central_Command  (…]
- "graphs_graph_report_hyperedges_group_relationships": "Hyperedges (group relationships)" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L4693 | neighbors=[Graph Report - 1_APT_Central_Command  (…]
- "graphs_graph_report_import_cycles": "Import Cycles" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L4690 | neighbors=[Graph Report - 1_APT_Central_Command  (…]
- "graphs_graph_report_knowledge_gaps": "Knowledge Gaps" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L20064 | neighbors=[Graph Report - 1_APT_Central_Command  (…]
- "graphs_graph_report_suggested_questions": "Suggested Questions" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L20069 | neighbors=[Graph Report - 1_APT_Central_Command  (…]
- "graphs_graph_report_summary": "Summary" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L7 | neighbors=[Graph Report - 1_APT_Central_Command  (…]
- "graphs_graph_report_surprising_connections_you_probably_didn_t_know_these": "Surprising Connections (you probably didn't know these)" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L4678 | neighbors=[Graph Report - 1_APT_Central_Command  (…]
- "gsd_graphify_anti_patterns": "Anti-Patterns" | kind=entity | source=.claude/commands/gsd/graphify.md:L198 | neighbors=[graphify.md]
- "gsd_graphify_mvp_mode_node_rendering": "MVP-Mode Node Rendering" | kind=entity | source=.claude/commands/gsd/graphify.md:L185 | neighbors=[graphify.md]
- "gsd_graphify_skill_anti_patterns": "Anti-Patterns" | kind=entity | source=.github/skills/gsd-graphify/SKILL.md:L196 | neighbors=[SKILL.md]
- "gsd_graphify_skill_mvp_mode_node_rendering": "MVP-Mode Node Rendering" | kind=entity | source=.github/skills/gsd-graphify/SKILL.md:L183 | neighbors=[SKILL.md]
- "gsd_graphify_skill_step_0_banner": "Step 0 -- Banner" | kind=entity | source=.github/skills/gsd-graphify/SKILL.md:L13 | neighbors=[SKILL.md]
- "gsd_graphify_skill_step_1_config_gate": "Step 1 -- Config Gate" | kind=entity | source=.github/skills/gsd-graphify/SKILL.md:L23 | neighbors=[SKILL.md]
- "gsd_graphify_skill_step_2a_query": "Step 2a -- Query" | kind=entity | source=.github/skills/gsd-graphify/SKILL.md:L75 | neighbors=[Step 2 -- Parse Argument]
- "gsd_graphify_skill_step_2b_status": "Step 2b -- Status" | kind=entity | source=.github/skills/gsd-graphify/SKILL.md:L92 | neighbors=[Step 2 -- Parse Argument]
- "gsd_graphify_skill_step_2c_diff": "Step 2c -- Diff" | kind=entity | source=.github/skills/gsd-graphify/SKILL.md:L117 | neighbors=[Step 2 -- Parse Argument]
- "gsd_graphify_skill_step_3_build_inline": "Step 3 -- Build (Inline)" | kind=entity | source=.github/skills/gsd-graphify/SKILL.md:L136 | neighbors=[SKILL.md]
- "gsd_graphify_step_0_banner": "Step 0 -- Banner" | kind=entity | source=.claude/commands/gsd/graphify.md:L15 | neighbors=[graphify.md]
- "gsd_graphify_step_1_config_gate": "Step 1 -- Config Gate" | kind=entity | source=.claude/commands/gsd/graphify.md:L25 | neighbors=[graphify.md]
- "gsd_graphify_step_2a_query": "Step 2a -- Query" | kind=entity | source=.claude/commands/gsd/graphify.md:L77 | neighbors=[Step 2 -- Parse Argument]
- "gsd_graphify_step_2b_status": "Step 2b -- Status" | kind=entity | source=.claude/commands/gsd/graphify.md:L94 | neighbors=[Step 2 -- Parse Argument]
- "gsd_graphify_step_2c_diff": "Step 2c -- Diff" | kind=entity | source=.claude/commands/gsd/graphify.md:L119 | neighbors=[Step 2 -- Parse Argument]
- "gsd_graphify_step_3_build_inline": "Step 3 -- Build (Inline)" | kind=entity | source=.claude/commands/gsd/graphify.md:L138 | neighbors=[graphify.md]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\PTOW\1_APT_Central_Command\.graphify\description-instructions\batch-328.json

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
