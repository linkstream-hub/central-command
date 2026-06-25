# Node Description Batch 180 of 412

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
LANGUAGE: each entry has a `lang=` marker giving the language of its source.
Write that entry's description in EXACTLY that language. Do not translate to
a single common language — match each node's source language individually.
No marketing language.
Respond ONLY with a JSON object mapping each node id (as a string) to its
one-sentence description — no prose, no markdown fences.

- "claude_agents_gsd_planner_md_agents_gsd_planner_quality_degradation_curve": "Quality Degradation Curve" | kind=entity | source=.claude/agents/gsd-planner.md:L142 | neighbors=[command: "npx eslint --fix $FILE 2>/dev…] | lang=en
- "claude_agents_gsd_planner_md_agents_gsd_planner_red_green_refactor_cycle": "Red-Green-Refactor Cycle" | kind=entity | source=.claude/agents/gsd-planner.md:L740 | neighbors=[command: "npx eslint --fix $FILE 2>/dev…] | lang=en
- "claude_agents_gsd_planner_md_agents_gsd_planner_ship_fast": "Ship Fast" | kind=entity | source=.claude/agents/gsd-planner.md:L153 | neighbors=[command: "npx eslint --fix $FILE 2>/dev…] | lang=en
- "claude_agents_gsd_planner_md_agents_gsd_planner_solo_developer_claude_workflow": "Solo Developer + Claude Workflow" | kind=entity | source=.claude/agents/gsd-planner.md:L127 | neighbors=[command: "npx eslint --fix $FILE 2>/dev…] | lang=en
- "claude_agents_gsd_planner_md_agents_gsd_planner_specificity": "Specificity" | kind=entity | source=.claude/agents/gsd-planner.md:L269 | neighbors=[command: "npx eslint --fix $FILE 2>/dev…] | lang=en
- "claude_agents_gsd_planner_md_agents_gsd_planner_split_signals": "Split Signals" | kind=entity | source=.claude/agents/gsd-planner.md:L398 | neighbors=[command: "npx eslint --fix $FILE 2>/dev…] | lang=en
- "claude_agents_gsd_planner_md_agents_gsd_planner_standard_mode": "Standard Mode" | kind=entity | source=.claude/agents/gsd-planner.md:L1171 | neighbors=[command: "npx eslint --fix $FILE 2>/dev…] | lang=en
- "claude_agents_gsd_planner_md_agents_gsd_planner_task_anatomy": "Task Anatomy" | kind=entity | source=.claude/agents/gsd-planner.md:L194 | neighbors=[command: "npx eslint --fix $FILE 2>/dev…] | lang=en
- "claude_agents_gsd_planner_md_agents_gsd_planner_task_sizing": "Task Sizing" | kind=entity | source=.claude/agents/gsd-planner.md:L239 | neighbors=[command: "npx eslint --fix $FILE 2>/dev…] | lang=en
- "claude_agents_gsd_planner_md_agents_gsd_planner_task_types": "Task Types" | kind=entity | source=.claude/agents/gsd-planner.md:L228 | neighbors=[command: "npx eslint --fix $FILE 2>/dev…] | lang=en
- "claude_agents_gsd_planner_md_agents_gsd_planner_tdd_detection": "TDD Detection" | kind=entity | source=.claude/agents/gsd-planner.md:L273 | neighbors=[command: "npx eslint --fix $FILE 2>/dev…] | lang=en
- "claude_agents_gsd_planner_md_agents_gsd_planner_tdd_plan_structure": "TDD Plan Structure" | kind=entity | source=.claude/agents/gsd-planner.md:L712 | neighbors=[command: "npx eslint --fix $FILE 2>/dev…] | lang=en
- "claude_agents_gsd_planner_md_agents_gsd_planner_the_planner_does_not_decide_what_is_too_hard": "The Planner Does Not Decide What Is Too Hard" | kind=entity | source=.claude/agents/gsd-planner.md:L111 | neighbors=[command: "npx eslint --fix $FILE 2>/dev…] | lang=en
- "claude_agents_gsd_planner_md_agents_gsd_planner_the_process": "The Process" | kind=entity | source=.claude/agents/gsd-planner.md:L561 | neighbors=[command: "npx eslint --fix $FILE 2>/dev…] | lang=en
- "claude_agents_gsd_planner_md_agents_gsd_planner_user_setup_detection": "User Setup Detection" | kind=entity | source=.claude/agents/gsd-planner.md:L340 | neighbors=[command: "npx eslint --fix $FILE 2>/dev…] | lang=en
- "claude_agents_gsd_planner_md_agents_gsd_planner_user_setup_frontmatter": "User Setup Frontmatter" | kind=entity | source=.claude/agents/gsd-planner.md:L534 | neighbors=[command: "npx eslint --fix $FILE 2>/dev…] | lang=en
- "claude_agents_gsd_planner_md_agents_gsd_planner_writing_guidelines": "Writing Guidelines" | kind=entity | source=.claude/agents/gsd-planner.md:L697 | neighbors=[command: "npx eslint --fix $FILE 2>/dev…] | lang=en
- "claude_agents_gsd_project_researcher_md_agents_gsd_project_researcher_architecture_md": "ARCHITECTURE.md" | kind=entity | source=.claude/agents/gsd-project-researcher.md:L306 | neighbors=[command: "npx eslint --fix $FILE 2>/dev…] | lang=en
- "claude_agents_gsd_project_researcher_md_agents_gsd_project_researcher_comparison_md_comparison_mode_only": "COMPARISON.md (comparison mode only)" | kind=entity | source=.claude/agents/gsd-project-researcher.md:L398 | neighbors=[command: "npx eslint --fix $FILE 2>/dev…] | lang=en
- "claude_agents_gsd_project_researcher_md_agents_gsd_project_researcher_feasibility_md_feasibility_mode_only": "FEASIBILITY.md (feasibility mode only)" | kind=entity | source=.claude/agents/gsd-project-researcher.md:L439 | neighbors=[command: "npx eslint --fix $FILE 2>/dev…] | lang=en
- "claude_agents_gsd_project_researcher_md_agents_gsd_project_researcher_features_md": "FEATURES.md" | kind=entity | source=.claude/agents/gsd-project-researcher.md:L254 | neighbors=[command: "npx eslint --fix $FILE 2>/dev…] | lang=en
- "claude_agents_gsd_project_researcher_md_agents_gsd_project_researcher_pitfalls_md": "PITFALLS.md" | kind=entity | source=.claude/agents/gsd-project-researcher.md:L356 | neighbors=[command: "npx eslint --fix $FILE 2>/dev…] | lang=en
- "claude_agents_gsd_project_researcher_md_agents_gsd_project_researcher_research_blocked": "Research Blocked" | kind=entity | source=.claude/agents/gsd-project-researcher.md:L570 | neighbors=[command: "npx eslint --fix $FILE 2>/dev…] | lang=en
- "claude_agents_gsd_project_researcher_md_agents_gsd_project_researcher_research_complete": "Research Complete" | kind=entity | source=.claude/agents/gsd-project-researcher.md:L529 | neighbors=[command: "npx eslint --fix $FILE 2>/dev…] | lang=en
- "claude_agents_gsd_project_researcher_md_agents_gsd_project_researcher_stack_md": "STACK.md" | kind=entity | source=.claude/agents/gsd-project-researcher.md:L203 | neighbors=[command: "npx eslint --fix $FILE 2>/dev…] | lang=en
- "claude_agents_gsd_project_researcher_md_agents_gsd_project_researcher_step_1_receive_research_scope": "Step 1: Receive Research Scope" | kind=entity | source=.claude/agents/gsd-project-researcher.md:L476 | neighbors=[command: "npx eslint --fix $FILE 2>/dev…] | lang=en
- "claude_agents_gsd_project_researcher_md_agents_gsd_project_researcher_step_2_identify_research_domains": "Step 2: Identify Research Domains" | kind=entity | source=.claude/agents/gsd-project-researcher.md:L480 | neighbors=[command: "npx eslint --fix $FILE 2>/dev…] | lang=en
- "claude_agents_gsd_project_researcher_md_agents_gsd_project_researcher_step_3_execute_research": "Step 3: Execute Research" | kind=entity | source=.claude/agents/gsd-project-researcher.md:L487 | neighbors=[command: "npx eslint --fix $FILE 2>/dev…] | lang=en
- "claude_agents_gsd_project_researcher_md_agents_gsd_project_researcher_step_4_quality_check": "Step 4: Quality Check" | kind=entity | source=.claude/agents/gsd-project-researcher.md:L491 | neighbors=[command: "npx eslint --fix $FILE 2>/dev…] | lang=en
- "claude_agents_gsd_project_researcher_md_agents_gsd_project_researcher_step_5_write_output_files": "Step 5: Write Output Files" | kind=entity | source=.claude/agents/gsd-project-researcher.md:L495 | neighbors=[command: "npx eslint --fix $FILE 2>/dev…] | lang=en
- "claude_agents_gsd_project_researcher_md_agents_gsd_project_researcher_step_6_return_structured_result": "Step 6: Return Structured Result" | kind=entity | source=.claude/agents/gsd-project-researcher.md:L521 | neighbors=[command: "npx eslint --fix $FILE 2>/dev…] | lang=en
- "claude_agents_gsd_project_researcher_md_agents_gsd_project_researcher_step_a_build_a_research_plan_input_file": "Step A — Build a research-plan input file" | kind=entity | source=.claude/agents/gsd-project-researcher.md:L60 | neighbors=[Research Plan via Code Seam] | lang=pt
- "claude_agents_gsd_project_researcher_md_agents_gsd_project_researcher_step_b_obtain_the_fetch_plan": "Step B — Obtain the fetch plan" | kind=entity | source=.claude/agents/gsd-project-researcher.md:L77 | neighbors=[Research Plan via Code Seam] | lang=en
- "claude_agents_gsd_project_researcher_md_agents_gsd_project_researcher_step_c_execute_the_indicated_fetch": "Step C — Execute the indicated fetch" | kind=entity | source=.claude/agents/gsd-project-researcher.md:L89 | neighbors=[Research Plan via Code Seam] | lang=en
- "claude_agents_gsd_project_researcher_md_agents_gsd_project_researcher_step_d_cache_each_digest": "Step D — Cache each digest" | kind=entity | source=.claude/agents/gsd-project-researcher.md:L110 | neighbors=[Research Plan via Code Seam] | lang=en
- "claude_agents_gsd_project_researcher_md_agents_gsd_project_researcher_summary_md": "SUMMARY.md" | kind=entity | source=.claude/agents/gsd-project-researcher.md:L151 | neighbors=[command: "npx eslint --fix $FILE 2>/dev…] | lang=en
- "claude_agents_gsd_research_synthesizer_md_agents_gsd_research_synthesizer_step_1_read_research_files": "Step 1: Read Research Files" | kind=entity | source=.claude/agents/gsd-research-synthesizer.md:L52 | neighbors=[command: "npx eslint --fix $FILE 2>/dev…] | lang=en
- "claude_agents_gsd_research_synthesizer_md_agents_gsd_research_synthesizer_step_2_synthesize_executive_summary": "Step 2: Synthesize Executive Summary" | kind=entity | source=.claude/agents/gsd-research-synthesizer.md:L71 | neighbors=[command: "npx eslint --fix $FILE 2>/dev…] | lang=en
- "claude_agents_gsd_research_synthesizer_md_agents_gsd_research_synthesizer_step_3_extract_key_findings": "Step 3: Extract Key Findings" | kind=entity | source=.claude/agents/gsd-research-synthesizer.md:L80 | neighbors=[command: "npx eslint --fix $FILE 2>/dev…] | lang=en
- "claude_agents_gsd_research_synthesizer_md_agents_gsd_research_synthesizer_step_4_derive_roadmap_implications": "Step 4: Derive Roadmap Implications" | kind=entity | source=.claude/agents/gsd-research-synthesizer.md:L100 | neighbors=[command: "npx eslint --fix $FILE 2>/dev…] | lang=en

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\PTOW\1_APT_Central_Command\.graphify\description-instructions\batch-179.json

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
