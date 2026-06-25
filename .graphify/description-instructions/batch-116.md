# Node Description Batch 117 of 412

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

- "agents_gsd_plan_checker_md_agents_gsd_plan_checker_dimension_1_requirement_coverage": "Dimension 1: Requirement Coverage" | kind=entity | source=agents/gsd-plan-checker.md:L110 | neighbors=[gsd-plan-checker.md]
- "agents_gsd_plan_checker_md_agents_gsd_plan_checker_dimension_11_research_resolution_1602": "Dimension 11: Research Resolution (#1602)" | kind=entity | source=agents/gsd-plan-checker.md:L558 | neighbors=[gsd-plan-checker.md]
- "agents_gsd_plan_checker_md_agents_gsd_plan_checker_dimension_12_pattern_compliance_1861": "Dimension 12: Pattern Compliance (#1861)" | kind=entity | source=agents/gsd-plan-checker.md:L597 | neighbors=[gsd-plan-checker.md]
- "agents_gsd_plan_checker_md_agents_gsd_plan_checker_dimension_2_task_completeness": "Dimension 2: Task Completeness" | kind=entity | source=agents/gsd-plan-checker.md:L138 | neighbors=[gsd-plan-checker.md]
- "agents_gsd_plan_checker_md_agents_gsd_plan_checker_dimension_3_dependency_correctness": "Dimension 3: Dependency Correctness" | kind=entity | source=agents/gsd-plan-checker.md:L171 | neighbors=[gsd-plan-checker.md]
- "agents_gsd_plan_checker_md_agents_gsd_plan_checker_dimension_4_key_links_planned": "Dimension 4: Key Links Planned" | kind=entity | source=agents/gsd-plan-checker.md:L201 | neighbors=[gsd-plan-checker.md]
- "agents_gsd_plan_checker_md_agents_gsd_plan_checker_dimension_5_scope_sanity": "Dimension 5: Scope Sanity" | kind=entity | source=agents/gsd-plan-checker.md:L235 | neighbors=[gsd-plan-checker.md]
- "agents_gsd_plan_checker_md_agents_gsd_plan_checker_dimension_6_verification_derivation": "Dimension 6: Verification Derivation" | kind=entity | source=agents/gsd-plan-checker.md:L270 | neighbors=[gsd-plan-checker.md]
- "agents_gsd_plan_checker_md_agents_gsd_plan_checker_dimension_7_context_compliance_if_context_md_exists": "Dimension 7: Context Compliance (if CONTEXT.md exists)" | kind=entity | source=agents/gsd-plan-checker.md:L299 | neighbors=[gsd-plan-checker.md]
- "agents_gsd_plan_checker_md_agents_gsd_plan_checker_dimension_7b_scope_reduction_detection": "Dimension 7b: Scope Reduction Detection" | kind=entity | source=agents/gsd-plan-checker.md:L344 | neighbors=[gsd-plan-checker.md]
- "agents_gsd_plan_checker_md_agents_gsd_plan_checker_dimension_7c_architectural_tier_compliance": "Dimension 7c: Architectural Tier Compliance" | kind=entity | source=agents/gsd-plan-checker.md:L389 | neighbors=[gsd-plan-checker.md]
- "agents_gsd_plan_checker_md_agents_gsd_plan_checker_dimension_8_output": "Dimension 8 Output" | kind=entity | source=agents/gsd-plan-checker.md:L479 | neighbors=[Dimension 8: Nyquist Compliance]
- "agents_gsd_plan_checker_md_agents_gsd_plan_checker_dimension_9_cross_plan_data_contracts": "Dimension 9: Cross-Plan Data Contracts" | kind=entity | source=agents/gsd-plan-checker.md:L495 | neighbors=[gsd-plan-checker.md]
- "agents_gsd_plan_checker_md_agents_gsd_plan_checker_issue_format": "Issue Format" | kind=entity | source=agents/gsd-plan-checker.md:L841 | neighbors=[gsd-plan-checker.md]
- "agents_gsd_plan_checker_md_agents_gsd_plan_checker_issues_found": "ISSUES FOUND" | kind=entity | source=agents/gsd-plan-checker.md:L902 | neighbors=[gsd-plan-checker.md]
- "agents_gsd_plan_checker_md_agents_gsd_plan_checker_scope_exceeded_most_common_miss": "Scope Exceeded (most common miss)" | kind=entity | source=agents/gsd-plan-checker.md:L802 | neighbors=[gsd-plan-checker.md]
- "agents_gsd_plan_checker_md_agents_gsd_plan_checker_severity_levels": "Severity Levels" | kind=entity | source=agents/gsd-plan-checker.md:L853 | neighbors=[gsd-plan-checker.md]
- "agents_gsd_plan_checker_md_agents_gsd_plan_checker_step_1_load_context": "Step 1: Load Context" | kind=entity | source=agents/gsd-plan-checker.md:L644 | neighbors=[gsd-plan-checker.md]
- "agents_gsd_plan_checker_md_agents_gsd_plan_checker_step_10_determine_overall_status": "Step 10: Determine Overall Status" | kind=entity | source=agents/gsd-plan-checker.md:L790 | neighbors=[gsd-plan-checker.md]
- "agents_gsd_plan_checker_md_agents_gsd_plan_checker_step_2_load_all_plans": "Step 2: Load All Plans" | kind=entity | source=agents/gsd-plan-checker.md:L666 | neighbors=[gsd-plan-checker.md]
- "agents_gsd_plan_checker_md_agents_gsd_plan_checker_step_3_parse_must_haves": "Step 3: Parse must_haves" | kind=entity | source=agents/gsd-plan-checker.md:L686 | neighbors=[gsd-plan-checker.md]
- "agents_gsd_plan_checker_md_agents_gsd_plan_checker_step_4_check_requirement_coverage": "Step 4: Check Requirement Coverage" | kind=entity | source=agents/gsd-plan-checker.md:L715 | neighbors=[gsd-plan-checker.md]
- "agents_gsd_plan_checker_md_agents_gsd_plan_checker_step_5_validate_task_structure": "Step 5: Validate Task Structure" | kind=entity | source=agents/gsd-plan-checker.md:L731 | neighbors=[gsd-plan-checker.md]
- "agents_gsd_plan_checker_md_agents_gsd_plan_checker_step_6_verify_dependency_graph": "Step 6: Verify Dependency Graph" | kind=entity | source=agents/gsd-plan-checker.md:L753 | neighbors=[gsd-plan-checker.md]
- "agents_gsd_plan_checker_md_agents_gsd_plan_checker_step_7_check_key_links": "Step 7: Check Key Links" | kind=entity | source=agents/gsd-plan-checker.md:L763 | neighbors=[gsd-plan-checker.md]
- "agents_gsd_plan_checker_md_agents_gsd_plan_checker_step_8_assess_scope": "Step 8: Assess Scope" | kind=entity | source=agents/gsd-plan-checker.md:L773 | neighbors=[gsd-plan-checker.md]
- "agents_gsd_plan_checker_md_agents_gsd_plan_checker_step_9_verify_must_haves_derivation": "Step 9: Verify must_haves Derivation" | kind=entity | source=agents/gsd-plan-checker.md:L782 | neighbors=[gsd-plan-checker.md]
- "agents_gsd_plan_checker_md_agents_gsd_plan_checker_verification_passed": "VERIFICATION PASSED" | kind=entity | source=agents/gsd-plan-checker.md:L876 | neighbors=[gsd-plan-checker.md]
- "agents_gsd_planner_agent_anti_patterns_and_extended_examples": "Anti-Patterns and Extended Examples" | kind=entity | source=.github/agents/gsd-planner.agent.md:L697 | neighbors=[gsd-planner.agent.md]
- "agents_gsd_planner_agent_authentication_gates": "Authentication Gates" | kind=entity | source=.github/agents/gsd-planner.agent.md:L687 | neighbors=[gsd-planner.agent.md]
- "agents_gsd_planner_agent_building_the_dependency_graph": "Building the Dependency Graph" | kind=entity | source=.github/agents/gsd-planner.agent.md:L351 | neighbors=[gsd-planner.agent.md]
- "agents_gsd_planner_agent_checkpoint_reached_revision_complete": "Checkpoint Reached / Revision Complete" | kind=entity | source=.github/agents/gsd-planner.agent.md:L1144 | neighbors=[gsd-planner.agent.md]
- "agents_gsd_planner_agent_checkpoint_types": "Checkpoint Types" | kind=entity | source=.github/agents/gsd-planner.agent.md:L643 | neighbors=[gsd-planner.agent.md]
- "agents_gsd_planner_agent_chunked_mode_returns": "Chunked Mode Returns" | kind=entity | source=.github/agents/gsd-planner.agent.md:L1148 | neighbors=[gsd-planner.agent.md]
- "agents_gsd_planner_agent_context_budget_for_tdd": "Context Budget for TDD" | kind=entity | source=.github/agents/gsd-planner.agent.md:L744 | neighbors=[gsd-planner.agent.md]
- "agents_gsd_planner_agent_context_budget_rules": "Context Budget Rules" | kind=entity | source=.github/agents/gsd-planner.agent.md:L380 | neighbors=[gsd-planner.agent.md]
- "agents_gsd_planner_agent_context_section_rules": "Context Section Rules" | kind=entity | source=.github/agents/gsd-planner.agent.md:L522 | neighbors=[gsd-planner.agent.md]
- "agents_gsd_planner_agent_critical_never_simplify_user_decisions_split_instead": "CRITICAL: Never Simplify User Decisions — Split Instead" | kind=entity | source=.github/agents/gsd-planner.agent.md:L72 | neighbors=[gsd-planner.agent.md]
- "agents_gsd_planner_agent_critical_user_decision_fidelity": "CRITICAL: User Decision Fidelity" | kind=entity | source=.github/agents/gsd-planner.agent.md:L47 | neighbors=[gsd-planner.agent.md]
- "agents_gsd_planner_agent_file_ownership_for_parallel_execution": "File Ownership for Parallel Execution" | kind=entity | source=.github/agents/gsd-planner.agent.md:L362 | neighbors=[gsd-planner.agent.md]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\PTOW\1_APT_Central_Command\.graphify\description-instructions\batch-116.json

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
