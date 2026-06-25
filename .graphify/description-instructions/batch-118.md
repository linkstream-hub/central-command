# Node Description Batch 119 of 412

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

- "agents_gsd_planner_md_agents_gsd_planner_context_budget_rules": "Context Budget Rules" | kind=entity | source=agents/gsd-planner.md:L378 | neighbors=[gsd-planner.md]
- "agents_gsd_planner_md_agents_gsd_planner_context_section_rules": "Context Section Rules" | kind=entity | source=agents/gsd-planner.md:L520 | neighbors=[gsd-planner.md]
- "agents_gsd_planner_md_agents_gsd_planner_critical_never_simplify_user_decisions_split_instead": "CRITICAL: Never Simplify User Decisions — Split Instead" | kind=entity | source=agents/gsd-planner.md:L70 | neighbors=[gsd-planner.md]
- "agents_gsd_planner_md_agents_gsd_planner_critical_user_decision_fidelity": "CRITICAL: User Decision Fidelity" | kind=entity | source=agents/gsd-planner.md:L45 | neighbors=[gsd-planner.md]
- "agents_gsd_planner_md_agents_gsd_planner_file_ownership_for_parallel_execution": "File Ownership for Parallel Execution" | kind=entity | source=agents/gsd-planner.md:L360 | neighbors=[gsd-planner.md]
- "agents_gsd_planner_md_agents_gsd_planner_frontmatter_fields": "Frontmatter Fields" | kind=entity | source=agents/gsd-planner.md:L499 | neighbors=[gsd-planner.md]
- "agents_gsd_planner_md_agents_gsd_planner_gap_closure_mode": "Gap Closure Mode" | kind=entity | source=agents/gsd-planner.md:L1185 | neighbors=[gsd-planner.md]
- "agents_gsd_planner_md_agents_gsd_planner_gap_closure_plans_created": "Gap Closure Plans Created" | kind=entity | source=agents/gsd-planner.md:L1123 | neighbors=[gsd-planner.md]
- "agents_gsd_planner_md_agents_gsd_planner_goal_backward_methodology": "Goal-Backward Methodology" | kind=entity | source=agents/gsd-planner.md:L548 | neighbors=[gsd-planner.md]
- "agents_gsd_planner_md_agents_gsd_planner_granularity_calibration": "Granularity Calibration" | kind=entity | source=agents/gsd-planner.md:L401 | neighbors=[gsd-planner.md]
- "agents_gsd_planner_md_agents_gsd_planner_interface_context_for_executors": "Interface Context for Executors" | kind=entity | source=agents/gsd-planner.md:L516 | neighbors=[gsd-planner.md]
- "agents_gsd_planner_md_agents_gsd_planner_interface_first_task_ordering": "Interface-First Task Ordering" | kind=entity | source=agents/gsd-planner.md:L251 | neighbors=[gsd-planner.md]
- "agents_gsd_planner_md_agents_gsd_planner_mandatory_discovery_protocol": "Mandatory Discovery Protocol" | kind=entity | source=agents/gsd-planner.md:L155 | neighbors=[gsd-planner.md]
- "agents_gsd_planner_md_agents_gsd_planner_multi_source_coverage_audit_mandatory_in_every_plan_set": "Multi-Source Coverage Audit (MANDATORY in every plan set)" | kind=entity | source=agents/gsd-planner.md:L91 | neighbors=[gsd-planner.md]
- "agents_gsd_planner_md_agents_gsd_planner_must_haves_output_format": "Must-Haves Output Format" | kind=entity | source=agents/gsd-planner.md:L608 | neighbors=[gsd-planner.md]
- "agents_gsd_planner_md_agents_gsd_planner_mvp_mode_detection": "MVP Mode Detection" | kind=entity | source=agents/gsd-planner.md:L303 | neighbors=[gsd-planner.md]
- "agents_gsd_planner_md_agents_gsd_planner_plan_md_structure": "PLAN.md Structure" | kind=entity | source=agents/gsd-planner.md:L417 | neighbors=[gsd-planner.md]
- "agents_gsd_planner_md_agents_gsd_planner_planning_complete": "Planning Complete" | kind=entity | source=agents/gsd-planner.md:L1094 | neighbors=[gsd-planner.md]
- "agents_gsd_planner_md_agents_gsd_planner_plans_are_prompts": "Plans Are Prompts" | kind=entity | source=agents/gsd-planner.md:L126 | neighbors=[gsd-planner.md]
- "agents_gsd_planner_md_agents_gsd_planner_quality_degradation_curve": "Quality Degradation Curve" | kind=entity | source=agents/gsd-planner.md:L134 | neighbors=[gsd-planner.md]
- "agents_gsd_planner_md_agents_gsd_planner_red_green_refactor_cycle": "Red-Green-Refactor Cycle" | kind=entity | source=agents/gsd-planner.md:L732 | neighbors=[gsd-planner.md]
- "agents_gsd_planner_md_agents_gsd_planner_ship_fast": "Ship Fast" | kind=entity | source=agents/gsd-planner.md:L145 | neighbors=[gsd-planner.md]
- "agents_gsd_planner_md_agents_gsd_planner_solo_developer_claude_workflow": "Solo Developer + Claude Workflow" | kind=entity | source=agents/gsd-planner.md:L119 | neighbors=[gsd-planner.md]
- "agents_gsd_planner_md_agents_gsd_planner_specificity": "Specificity" | kind=entity | source=agents/gsd-planner.md:L261 | neighbors=[gsd-planner.md]
- "agents_gsd_planner_md_agents_gsd_planner_split_signals": "Split Signals" | kind=entity | source=agents/gsd-planner.md:L390 | neighbors=[gsd-planner.md]
- "agents_gsd_planner_md_agents_gsd_planner_standard_mode": "Standard Mode" | kind=entity | source=agents/gsd-planner.md:L1163 | neighbors=[gsd-planner.md]
- "agents_gsd_planner_md_agents_gsd_planner_task_anatomy": "Task Anatomy" | kind=entity | source=agents/gsd-planner.md:L186 | neighbors=[gsd-planner.md]
- "agents_gsd_planner_md_agents_gsd_planner_task_sizing": "Task Sizing" | kind=entity | source=agents/gsd-planner.md:L231 | neighbors=[gsd-planner.md]
- "agents_gsd_planner_md_agents_gsd_planner_task_types": "Task Types" | kind=entity | source=agents/gsd-planner.md:L220 | neighbors=[gsd-planner.md]
- "agents_gsd_planner_md_agents_gsd_planner_tdd_detection": "TDD Detection" | kind=entity | source=agents/gsd-planner.md:L265 | neighbors=[gsd-planner.md]
- "agents_gsd_planner_md_agents_gsd_planner_tdd_plan_structure": "TDD Plan Structure" | kind=entity | source=agents/gsd-planner.md:L704 | neighbors=[gsd-planner.md]
- "agents_gsd_planner_md_agents_gsd_planner_the_planner_does_not_decide_what_is_too_hard": "The Planner Does Not Decide What Is Too Hard" | kind=entity | source=agents/gsd-planner.md:L103 | neighbors=[gsd-planner.md]
- "agents_gsd_planner_md_agents_gsd_planner_the_process": "The Process" | kind=entity | source=agents/gsd-planner.md:L553 | neighbors=[gsd-planner.md]
- "agents_gsd_planner_md_agents_gsd_planner_user_setup_detection": "User Setup Detection" | kind=entity | source=agents/gsd-planner.md:L332 | neighbors=[gsd-planner.md]
- "agents_gsd_planner_md_agents_gsd_planner_user_setup_frontmatter": "User Setup Frontmatter" | kind=entity | source=agents/gsd-planner.md:L526 | neighbors=[gsd-planner.md]
- "agents_gsd_planner_md_agents_gsd_planner_writing_guidelines": "Writing Guidelines" | kind=entity | source=agents/gsd-planner.md:L689 | neighbors=[gsd-planner.md]
- "agents_gsd_planner_posttooluse": "PostToolUse:" | kind=entity | source=.claude/agents/gsd-planner.md:L7 | neighbors=[gsd-planner.md]
- "agents_gsd_planner_type_command": "- type: command" | kind=entity | source=.claude/agents/gsd-planner.md:L10 | neighbors=[gsd-planner.md]
- "agents_gsd_project_researcher_agent_architecture_md": "ARCHITECTURE.md" | kind=entity | source=.github/agents/gsd-project-researcher.agent.md:L300 | neighbors=[gsd-project-researcher.agent.md]
- "agents_gsd_project_researcher_agent_comparison_md_comparison_mode_only": "COMPARISON.md (comparison mode only)" | kind=entity | source=.github/agents/gsd-project-researcher.agent.md:L392 | neighbors=[gsd-project-researcher.agent.md]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\PTOW\1_APT_Central_Command\.graphify\description-instructions\batch-118.json

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
