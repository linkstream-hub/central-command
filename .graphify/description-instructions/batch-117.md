# Node Description Batch 118 of 412

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

- "agents_gsd_planner_agent_frontmatter_fields": "Frontmatter Fields" | kind=entity | source=.github/agents/gsd-planner.agent.md:L501 | neighbors=[gsd-planner.agent.md]
- "agents_gsd_planner_agent_gap_closure_mode": "Gap Closure Mode" | kind=entity | source=.github/agents/gsd-planner.agent.md:L1187 | neighbors=[gsd-planner.agent.md]
- "agents_gsd_planner_agent_gap_closure_plans_created": "Gap Closure Plans Created" | kind=entity | source=.github/agents/gsd-planner.agent.md:L1125 | neighbors=[gsd-planner.agent.md]
- "agents_gsd_planner_agent_goal_backward_methodology": "Goal-Backward Methodology" | kind=entity | source=.github/agents/gsd-planner.agent.md:L550 | neighbors=[gsd-planner.agent.md]
- "agents_gsd_planner_agent_granularity_calibration": "Granularity Calibration" | kind=entity | source=.github/agents/gsd-planner.agent.md:L403 | neighbors=[gsd-planner.agent.md]
- "agents_gsd_planner_agent_interface_context_for_executors": "Interface Context for Executors" | kind=entity | source=.github/agents/gsd-planner.agent.md:L518 | neighbors=[gsd-planner.agent.md]
- "agents_gsd_planner_agent_interface_first_task_ordering": "Interface-First Task Ordering" | kind=entity | source=.github/agents/gsd-planner.agent.md:L253 | neighbors=[gsd-planner.agent.md]
- "agents_gsd_planner_agent_mandatory_discovery_protocol": "Mandatory Discovery Protocol" | kind=entity | source=.github/agents/gsd-planner.agent.md:L157 | neighbors=[gsd-planner.agent.md]
- "agents_gsd_planner_agent_multi_source_coverage_audit_mandatory_in_every_plan_set": "Multi-Source Coverage Audit (MANDATORY in every plan set)" | kind=entity | source=.github/agents/gsd-planner.agent.md:L93 | neighbors=[gsd-planner.agent.md]
- "agents_gsd_planner_agent_must_haves_output_format": "Must-Haves Output Format" | kind=entity | source=.github/agents/gsd-planner.agent.md:L610 | neighbors=[gsd-planner.agent.md]
- "agents_gsd_planner_agent_mvp_mode_detection": "MVP Mode Detection" | kind=entity | source=.github/agents/gsd-planner.agent.md:L305 | neighbors=[gsd-planner.agent.md]
- "agents_gsd_planner_agent_plan_md_structure": "PLAN.md Structure" | kind=entity | source=.github/agents/gsd-planner.agent.md:L419 | neighbors=[gsd-planner.agent.md]
- "agents_gsd_planner_agent_planning_complete": "Planning Complete" | kind=entity | source=.github/agents/gsd-planner.agent.md:L1096 | neighbors=[gsd-planner.agent.md]
- "agents_gsd_planner_agent_plans_are_prompts": "Plans Are Prompts" | kind=entity | source=.github/agents/gsd-planner.agent.md:L128 | neighbors=[gsd-planner.agent.md]
- "agents_gsd_planner_agent_quality_degradation_curve": "Quality Degradation Curve" | kind=entity | source=.github/agents/gsd-planner.agent.md:L136 | neighbors=[gsd-planner.agent.md]
- "agents_gsd_planner_agent_red_green_refactor_cycle": "Red-Green-Refactor Cycle" | kind=entity | source=.github/agents/gsd-planner.agent.md:L734 | neighbors=[gsd-planner.agent.md]
- "agents_gsd_planner_agent_ship_fast": "Ship Fast" | kind=entity | source=.github/agents/gsd-planner.agent.md:L147 | neighbors=[gsd-planner.agent.md]
- "agents_gsd_planner_agent_solo_developer_the_agent_workflow": "Solo Developer + the agent Workflow" | kind=entity | source=.github/agents/gsd-planner.agent.md:L121 | neighbors=[gsd-planner.agent.md]
- "agents_gsd_planner_agent_specificity": "Specificity" | kind=entity | source=.github/agents/gsd-planner.agent.md:L263 | neighbors=[gsd-planner.agent.md]
- "agents_gsd_planner_agent_split_signals": "Split Signals" | kind=entity | source=.github/agents/gsd-planner.agent.md:L392 | neighbors=[gsd-planner.agent.md]
- "agents_gsd_planner_agent_standard_mode": "Standard Mode" | kind=entity | source=.github/agents/gsd-planner.agent.md:L1165 | neighbors=[gsd-planner.agent.md]
- "agents_gsd_planner_agent_task_anatomy": "Task Anatomy" | kind=entity | source=.github/agents/gsd-planner.agent.md:L188 | neighbors=[gsd-planner.agent.md]
- "agents_gsd_planner_agent_task_sizing": "Task Sizing" | kind=entity | source=.github/agents/gsd-planner.agent.md:L233 | neighbors=[gsd-planner.agent.md]
- "agents_gsd_planner_agent_task_types": "Task Types" | kind=entity | source=.github/agents/gsd-planner.agent.md:L222 | neighbors=[gsd-planner.agent.md]
- "agents_gsd_planner_agent_tdd_detection": "TDD Detection" | kind=entity | source=.github/agents/gsd-planner.agent.md:L267 | neighbors=[gsd-planner.agent.md]
- "agents_gsd_planner_agent_tdd_plan_structure": "TDD Plan Structure" | kind=entity | source=.github/agents/gsd-planner.agent.md:L706 | neighbors=[gsd-planner.agent.md]
- "agents_gsd_planner_agent_the_planner_does_not_decide_what_is_too_hard": "The Planner Does Not Decide What Is Too Hard" | kind=entity | source=.github/agents/gsd-planner.agent.md:L105 | neighbors=[gsd-planner.agent.md]
- "agents_gsd_planner_agent_the_process": "The Process" | kind=entity | source=.github/agents/gsd-planner.agent.md:L555 | neighbors=[gsd-planner.agent.md]
- "agents_gsd_planner_agent_user_setup_detection": "User Setup Detection" | kind=entity | source=.github/agents/gsd-planner.agent.md:L334 | neighbors=[gsd-planner.agent.md]
- "agents_gsd_planner_agent_user_setup_frontmatter": "User Setup Frontmatter" | kind=entity | source=.github/agents/gsd-planner.agent.md:L528 | neighbors=[gsd-planner.agent.md]
- "agents_gsd_planner_agent_writing_guidelines": "Writing Guidelines" | kind=entity | source=.github/agents/gsd-planner.agent.md:L691 | neighbors=[gsd-planner.agent.md]
- "agents_gsd_planner_hooks": "hooks:" | kind=entity | source=.claude/agents/gsd-planner.md:L6 | neighbors=[gsd-planner.md]
- "agents_gsd_planner_matcher_write_edit": "- matcher: \"Write|Edit\"" | kind=entity | source=.claude/agents/gsd-planner.md:L8 | neighbors=[gsd-planner.md]
- "agents_gsd_planner_md_agents_gsd_planner_anti_patterns_and_extended_examples": "Anti-Patterns and Extended Examples" | kind=entity | source=agents/gsd-planner.md:L695 | neighbors=[gsd-planner.md]
- "agents_gsd_planner_md_agents_gsd_planner_authentication_gates": "Authentication Gates" | kind=entity | source=agents/gsd-planner.md:L685 | neighbors=[gsd-planner.md]
- "agents_gsd_planner_md_agents_gsd_planner_building_the_dependency_graph": "Building the Dependency Graph" | kind=entity | source=agents/gsd-planner.md:L349 | neighbors=[gsd-planner.md]
- "agents_gsd_planner_md_agents_gsd_planner_checkpoint_reached_revision_complete": "Checkpoint Reached / Revision Complete" | kind=entity | source=agents/gsd-planner.md:L1142 | neighbors=[gsd-planner.md]
- "agents_gsd_planner_md_agents_gsd_planner_checkpoint_types": "Checkpoint Types" | kind=entity | source=agents/gsd-planner.md:L641 | neighbors=[gsd-planner.md]
- "agents_gsd_planner_md_agents_gsd_planner_chunked_mode_returns": "Chunked Mode Returns" | kind=entity | source=agents/gsd-planner.md:L1146 | neighbors=[gsd-planner.md]
- "agents_gsd_planner_md_agents_gsd_planner_context_budget_for_tdd": "Context Budget for TDD" | kind=entity | source=agents/gsd-planner.md:L742 | neighbors=[gsd-planner.md]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\PTOW\1_APT_Central_Command\.graphify\description-instructions\batch-117.json

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
