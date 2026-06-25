# Node Description Batch 179 of 412

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

- "claude_agents_gsd_plan_checker_md_agents_gsd_plan_checker_issues_found": "ISSUES FOUND" | kind=entity | source=.claude/agents/gsd-plan-checker.md:L904 | neighbors=[gsd-plan-checker.md]
- "claude_agents_gsd_plan_checker_md_agents_gsd_plan_checker_scope_exceeded_most_common_miss": "Scope Exceeded (most common miss)" | kind=entity | source=.claude/agents/gsd-plan-checker.md:L804 | neighbors=[gsd-plan-checker.md]
- "claude_agents_gsd_plan_checker_md_agents_gsd_plan_checker_severity_levels": "Severity Levels" | kind=entity | source=.claude/agents/gsd-plan-checker.md:L855 | neighbors=[gsd-plan-checker.md]
- "claude_agents_gsd_plan_checker_md_agents_gsd_plan_checker_step_1_load_context": "Step 1: Load Context" | kind=entity | source=.claude/agents/gsd-plan-checker.md:L646 | neighbors=[gsd-plan-checker.md]
- "claude_agents_gsd_plan_checker_md_agents_gsd_plan_checker_step_10_determine_overall_status": "Step 10: Determine Overall Status" | kind=entity | source=.claude/agents/gsd-plan-checker.md:L792 | neighbors=[gsd-plan-checker.md]
- "claude_agents_gsd_plan_checker_md_agents_gsd_plan_checker_step_2_load_all_plans": "Step 2: Load All Plans" | kind=entity | source=.claude/agents/gsd-plan-checker.md:L668 | neighbors=[gsd-plan-checker.md]
- "claude_agents_gsd_plan_checker_md_agents_gsd_plan_checker_step_3_parse_must_haves": "Step 3: Parse must_haves" | kind=entity | source=.claude/agents/gsd-plan-checker.md:L688 | neighbors=[gsd-plan-checker.md]
- "claude_agents_gsd_plan_checker_md_agents_gsd_plan_checker_step_4_check_requirement_coverage": "Step 4: Check Requirement Coverage" | kind=entity | source=.claude/agents/gsd-plan-checker.md:L717 | neighbors=[gsd-plan-checker.md]
- "claude_agents_gsd_plan_checker_md_agents_gsd_plan_checker_step_5_validate_task_structure": "Step 5: Validate Task Structure" | kind=entity | source=.claude/agents/gsd-plan-checker.md:L733 | neighbors=[gsd-plan-checker.md]
- "claude_agents_gsd_plan_checker_md_agents_gsd_plan_checker_step_6_verify_dependency_graph": "Step 6: Verify Dependency Graph" | kind=entity | source=.claude/agents/gsd-plan-checker.md:L755 | neighbors=[gsd-plan-checker.md]
- "claude_agents_gsd_plan_checker_md_agents_gsd_plan_checker_step_7_check_key_links": "Step 7: Check Key Links" | kind=entity | source=.claude/agents/gsd-plan-checker.md:L765 | neighbors=[gsd-plan-checker.md]
- "claude_agents_gsd_plan_checker_md_agents_gsd_plan_checker_step_8_assess_scope": "Step 8: Assess Scope" | kind=entity | source=.claude/agents/gsd-plan-checker.md:L775 | neighbors=[gsd-plan-checker.md]
- "claude_agents_gsd_plan_checker_md_agents_gsd_plan_checker_step_9_verify_must_haves_derivation": "Step 9: Verify must_haves Derivation" | kind=entity | source=.claude/agents/gsd-plan-checker.md:L784 | neighbors=[gsd-plan-checker.md]
- "claude_agents_gsd_plan_checker_md_agents_gsd_plan_checker_verification_passed": "VERIFICATION PASSED" | kind=entity | source=.claude/agents/gsd-plan-checker.md:L878 | neighbors=[gsd-plan-checker.md]
- "claude_agents_gsd_planner_md_agents_gsd_planner_anti_patterns_and_extended_examples": "Anti-Patterns and Extended Examples" | kind=entity | source=.claude/agents/gsd-planner.md:L703 | neighbors=[command: "npx eslint --fix $FILE 2>/dev…]
- "claude_agents_gsd_planner_md_agents_gsd_planner_authentication_gates": "Authentication Gates" | kind=entity | source=.claude/agents/gsd-planner.md:L693 | neighbors=[command: "npx eslint --fix $FILE 2>/dev…]
- "claude_agents_gsd_planner_md_agents_gsd_planner_building_the_dependency_graph": "Building the Dependency Graph" | kind=entity | source=.claude/agents/gsd-planner.md:L357 | neighbors=[command: "npx eslint --fix $FILE 2>/dev…]
- "claude_agents_gsd_planner_md_agents_gsd_planner_checkpoint_reached_revision_complete": "Checkpoint Reached / Revision Complete" | kind=entity | source=.claude/agents/gsd-planner.md:L1150 | neighbors=[command: "npx eslint --fix $FILE 2>/dev…]
- "claude_agents_gsd_planner_md_agents_gsd_planner_checkpoint_types": "Checkpoint Types" | kind=entity | source=.claude/agents/gsd-planner.md:L649 | neighbors=[command: "npx eslint --fix $FILE 2>/dev…]
- "claude_agents_gsd_planner_md_agents_gsd_planner_chunked_mode_returns": "Chunked Mode Returns" | kind=entity | source=.claude/agents/gsd-planner.md:L1154 | neighbors=[command: "npx eslint --fix $FILE 2>/dev…]
- "claude_agents_gsd_planner_md_agents_gsd_planner_context_budget_for_tdd": "Context Budget for TDD" | kind=entity | source=.claude/agents/gsd-planner.md:L750 | neighbors=[command: "npx eslint --fix $FILE 2>/dev…]
- "claude_agents_gsd_planner_md_agents_gsd_planner_context_budget_rules": "Context Budget Rules" | kind=entity | source=.claude/agents/gsd-planner.md:L386 | neighbors=[command: "npx eslint --fix $FILE 2>/dev…]
- "claude_agents_gsd_planner_md_agents_gsd_planner_context_section_rules": "Context Section Rules" | kind=entity | source=.claude/agents/gsd-planner.md:L528 | neighbors=[command: "npx eslint --fix $FILE 2>/dev…]
- "claude_agents_gsd_planner_md_agents_gsd_planner_critical_never_simplify_user_decisions_split_instead": "CRITICAL: Never Simplify User Decisions — Split Instead" | kind=entity | source=.claude/agents/gsd-planner.md:L78 | neighbors=[command: "npx eslint --fix $FILE 2>/dev…]
- "claude_agents_gsd_planner_md_agents_gsd_planner_critical_user_decision_fidelity": "CRITICAL: User Decision Fidelity" | kind=entity | source=.claude/agents/gsd-planner.md:L53 | neighbors=[command: "npx eslint --fix $FILE 2>/dev…]
- "claude_agents_gsd_planner_md_agents_gsd_planner_file_ownership_for_parallel_execution": "File Ownership for Parallel Execution" | kind=entity | source=.claude/agents/gsd-planner.md:L368 | neighbors=[command: "npx eslint --fix $FILE 2>/dev…]
- "claude_agents_gsd_planner_md_agents_gsd_planner_frontmatter_fields": "Frontmatter Fields" | kind=entity | source=.claude/agents/gsd-planner.md:L507 | neighbors=[command: "npx eslint --fix $FILE 2>/dev…]
- "claude_agents_gsd_planner_md_agents_gsd_planner_gap_closure_mode": "Gap Closure Mode" | kind=entity | source=.claude/agents/gsd-planner.md:L1193 | neighbors=[command: "npx eslint --fix $FILE 2>/dev…]
- "claude_agents_gsd_planner_md_agents_gsd_planner_gap_closure_plans_created": "Gap Closure Plans Created" | kind=entity | source=.claude/agents/gsd-planner.md:L1131 | neighbors=[command: "npx eslint --fix $FILE 2>/dev…]
- "claude_agents_gsd_planner_md_agents_gsd_planner_goal_backward_methodology": "Goal-Backward Methodology" | kind=entity | source=.claude/agents/gsd-planner.md:L556 | neighbors=[command: "npx eslint --fix $FILE 2>/dev…]
- "claude_agents_gsd_planner_md_agents_gsd_planner_granularity_calibration": "Granularity Calibration" | kind=entity | source=.claude/agents/gsd-planner.md:L409 | neighbors=[command: "npx eslint --fix $FILE 2>/dev…]
- "claude_agents_gsd_planner_md_agents_gsd_planner_interface_context_for_executors": "Interface Context for Executors" | kind=entity | source=.claude/agents/gsd-planner.md:L524 | neighbors=[command: "npx eslint --fix $FILE 2>/dev…]
- "claude_agents_gsd_planner_md_agents_gsd_planner_interface_first_task_ordering": "Interface-First Task Ordering" | kind=entity | source=.claude/agents/gsd-planner.md:L259 | neighbors=[command: "npx eslint --fix $FILE 2>/dev…]
- "claude_agents_gsd_planner_md_agents_gsd_planner_mandatory_discovery_protocol": "Mandatory Discovery Protocol" | kind=entity | source=.claude/agents/gsd-planner.md:L163 | neighbors=[command: "npx eslint --fix $FILE 2>/dev…]
- "claude_agents_gsd_planner_md_agents_gsd_planner_multi_source_coverage_audit_mandatory_in_every_plan_set": "Multi-Source Coverage Audit (MANDATORY in every plan set)" | kind=entity | source=.claude/agents/gsd-planner.md:L99 | neighbors=[command: "npx eslint --fix $FILE 2>/dev…]
- "claude_agents_gsd_planner_md_agents_gsd_planner_must_haves_output_format": "Must-Haves Output Format" | kind=entity | source=.claude/agents/gsd-planner.md:L616 | neighbors=[command: "npx eslint --fix $FILE 2>/dev…]
- "claude_agents_gsd_planner_md_agents_gsd_planner_mvp_mode_detection": "MVP Mode Detection" | kind=entity | source=.claude/agents/gsd-planner.md:L311 | neighbors=[command: "npx eslint --fix $FILE 2>/dev…]
- "claude_agents_gsd_planner_md_agents_gsd_planner_plan_md_structure": "PLAN.md Structure" | kind=entity | source=.claude/agents/gsd-planner.md:L425 | neighbors=[command: "npx eslint --fix $FILE 2>/dev…]
- "claude_agents_gsd_planner_md_agents_gsd_planner_planning_complete": "Planning Complete" | kind=entity | source=.claude/agents/gsd-planner.md:L1102 | neighbors=[command: "npx eslint --fix $FILE 2>/dev…]
- "claude_agents_gsd_planner_md_agents_gsd_planner_plans_are_prompts": "Plans Are Prompts" | kind=entity | source=.claude/agents/gsd-planner.md:L134 | neighbors=[command: "npx eslint --fix $FILE 2>/dev…]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\PTOW\1_APT_Central_Command\.graphify\description-instructions\batch-178.json

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
