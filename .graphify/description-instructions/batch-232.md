# Node Description Batch 233 of 412

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

- "graphify_skill_powershell_5_1_vertical_scrolling_stops_working": "PowerShell 5.1: Vertical scrolling stops working" | kind=entity | source=.github/skills/graphify/SKILL.md:L633 | neighbors=[Troubleshooting]
- "graphify_skill_step_0_github_repos_and_multi_path_merge_only_if_a_url_or_several_paths": "Step 0 - GitHub repos and multi-path merge (only if a URL or several paths)" | kind=entity | source=.github/skills/graphify/SKILL.md:L59 | neighbors=[What You Must Do When Invoked]
- "graphify_skill_step_1_ensure_graphify_is_installed": "Step 1 - Ensure graphify is installed" | kind=entity | source=.github/skills/graphify/SKILL.md:L63 | neighbors=[What You Must Do When Invoked]
- "graphify_skill_step_2_5_video_and_audio_only_if_video_files_detected": "Step 2.5 - Video and audio (only if video files detected)" | kind=entity | source=.github/skills/graphify/SKILL.md:L164 | neighbors=[What You Must Do When Invoked]
- "graphify_skill_step_2_detect_files": "Step 2 - Detect files" | kind=entity | source=.github/skills/graphify/SKILL.md:L127 | neighbors=[What You Must Do When Invoked]
- "graphify_skill_step_4_build_graph_cluster_analyze_generate_outputs": "Step 4 - Build graph, cluster, analyze, generate outputs" | kind=entity | source=.github/skills/graphify/SKILL.md:L390 | neighbors=[What You Must Do When Invoked]
- "graphify_skill_step_5_label_communities": "Step 5 - Label communities" | kind=entity | source=.github/skills/graphify/SKILL.md:L442 | neighbors=[What You Must Do When Invoked]
- "graphify_skill_step_6_generate_obsidian_vault_opt_in_html": "Step 6 - Generate Obsidian vault (opt-in) + HTML" | kind=entity | source=.github/skills/graphify/SKILL.md:L482 | neighbors=[What You Must Do When Invoked]
- "graphify_skill_step_9_save_manifest_update_cost_tracker_clean_up_and_report": "Step 9 - Save manifest, update cost tracker, clean up, and report" | kind=entity | source=.github/skills/graphify/SKILL.md:L508 | neighbors=[What You Must Do When Invoked]
- "graphify_skill_steps_6b_8_wiki_neo4j_svg_graphml_mcp_benchmark_only_on_their_flags": "Steps 6b-8 - Wiki, Neo4j, SVG, GraphML, MCP, benchmark (only on their flags)" | kind=entity | source=.github/skills/graphify/SKILL.md:L502 | neighbors=[What You Must Do When Invoked]
- "graphify_skill_usage": "Usage" | kind=entity | source=.github/skills/graphify/SKILL.md:L10 | neighbors=[/graphify]
- "graphify_skill_what_graphify_is_for": "What graphify is for" | kind=entity | source=.github/skills/graphify/SKILL.md:L43 | neighbors=[/graphify]
- "graphs_graph_report": "GRAPH_REPORT.md" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L1 | neighbors=[Graph Report - 1_APT_Central_Command  (…]
- "graphs_graph_report_community_0_dal_sheets_integration": "Community 0 - \"DAL + Sheets Integration\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L4700 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1_clock_in_out_field_auth": "Community 1 - \"Clock-In/Out + Field Auth\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L4704 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_10_jobs_api_mapper": "Community 10 - \"Jobs API + Mapper\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L4740 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_100_community_100": "Community 100 - \"Community 100\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L4884 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1000_community_1000": "Community 1000 - \"Community 1000\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L8476 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1001_community_1001": "Community 1001 - \"Community 1001\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L8480 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1002_community_1002": "Community 1002 - \"Community 1002\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L8484 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1003_community_1003": "Community 1003 - \"Community 1003\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L8488 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1004_community_1004": "Community 1004 - \"Community 1004\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L8492 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1005_community_1005": "Community 1005 - \"Community 1005\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L8496 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1006_community_1006": "Community 1006 - \"Community 1006\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L8500 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1007_community_1007": "Community 1007 - \"Community 1007\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L8504 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1008_community_1008": "Community 1008 - \"Community 1008\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L8508 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1009_community_1009": "Community 1009 - \"Community 1009\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L8512 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_101_community_101": "Community 101 - \"Community 101\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L4888 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1010_community_1010": "Community 1010 - \"Community 1010\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L8516 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1011_community_1011": "Community 1011 - \"Community 1011\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L8520 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1012_community_1012": "Community 1012 - \"Community 1012\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L8524 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1013_community_1013": "Community 1013 - \"Community 1013\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L8528 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1014_community_1014": "Community 1014 - \"Community 1014\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L8532 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1015_community_1015": "Community 1015 - \"Community 1015\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L8536 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1016_community_1016": "Community 1016 - \"Community 1016\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L8540 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_102_community_102": "Community 102 - \"Community 102\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L4892 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1025_community_1025": "Community 1025 - \"Community 1025\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L8544 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1029_community_1029": "Community 1029 - \"Community 1029\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L8548 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_103_community_103": "Community 103 - \"Community 103\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L4896 | neighbors=[Communities (6571 total, 806 thin omitt…]
- "graphs_graph_report_community_1030_community_1030": "Community 1030 - \"Community 1030\"" | kind=entity | source=.planning/graphs/GRAPH_REPORT.md:L8552 | neighbors=[Communities (6571 total, 806 thin omitt…]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\PTOW\1_APT_Central_Command\.graphify\description-instructions\batch-232.json

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
