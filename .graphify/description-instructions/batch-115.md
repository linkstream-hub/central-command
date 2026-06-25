# Node Description Batch 116 of 412

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

- "agents_gsd_plan_checker_agent_check_8b_feedback_latency_assessment": "Check 8b — Feedback Latency Assessment" | kind=entity | source=.github/agents/gsd-plan-checker.agent.md:L463 | neighbors=[Dimension 8: Nyquist Compliance]
- "agents_gsd_plan_checker_agent_check_8c_sampling_continuity": "Check 8c — Sampling Continuity" | kind=entity | source=.github/agents/gsd-plan-checker.agent.md:L470 | neighbors=[Dimension 8: Nyquist Compliance]
- "agents_gsd_plan_checker_agent_check_8d_wave_0_completeness": "Check 8d — Wave 0 Completeness" | kind=entity | source=.github/agents/gsd-plan-checker.agent.md:L474 | neighbors=[Dimension 8: Nyquist Compliance]
- "agents_gsd_plan_checker_agent_check_8e_validation_md_existence_gate": "Check 8e — VALIDATION.md Existence (Gate)" | kind=entity | source=.github/agents/gsd-plan-checker.agent.md:L443 | neighbors=[Dimension 8: Nyquist Compliance]
- "agents_gsd_plan_checker_agent_dimension_1_requirement_coverage": "Dimension 1: Requirement Coverage" | kind=entity | source=.github/agents/gsd-plan-checker.agent.md:L112 | neighbors=[gsd-plan-checker.agent.md]
- "agents_gsd_plan_checker_agent_dimension_10_copilot_instructions_md_compliance": "Dimension 10: copilot-instructions.md Compliance" | kind=entity | source=.github/agents/gsd-plan-checker.agent.md:L516 | neighbors=[gsd-plan-checker.agent.md]
- "agents_gsd_plan_checker_agent_dimension_11_research_resolution_1602": "Dimension 11: Research Resolution (#1602)" | kind=entity | source=.github/agents/gsd-plan-checker.agent.md:L560 | neighbors=[gsd-plan-checker.agent.md]
- "agents_gsd_plan_checker_agent_dimension_12_pattern_compliance_1861": "Dimension 12: Pattern Compliance (#1861)" | kind=entity | source=.github/agents/gsd-plan-checker.agent.md:L599 | neighbors=[gsd-plan-checker.agent.md]
- "agents_gsd_plan_checker_agent_dimension_2_task_completeness": "Dimension 2: Task Completeness" | kind=entity | source=.github/agents/gsd-plan-checker.agent.md:L140 | neighbors=[gsd-plan-checker.agent.md]
- "agents_gsd_plan_checker_agent_dimension_3_dependency_correctness": "Dimension 3: Dependency Correctness" | kind=entity | source=.github/agents/gsd-plan-checker.agent.md:L173 | neighbors=[gsd-plan-checker.agent.md]
- "agents_gsd_plan_checker_agent_dimension_4_key_links_planned": "Dimension 4: Key Links Planned" | kind=entity | source=.github/agents/gsd-plan-checker.agent.md:L203 | neighbors=[gsd-plan-checker.agent.md]
- "agents_gsd_plan_checker_agent_dimension_5_scope_sanity": "Dimension 5: Scope Sanity" | kind=entity | source=.github/agents/gsd-plan-checker.agent.md:L237 | neighbors=[gsd-plan-checker.agent.md]
- "agents_gsd_plan_checker_agent_dimension_6_verification_derivation": "Dimension 6: Verification Derivation" | kind=entity | source=.github/agents/gsd-plan-checker.agent.md:L272 | neighbors=[gsd-plan-checker.agent.md]
- "agents_gsd_plan_checker_agent_dimension_7_context_compliance_if_context_md_exists": "Dimension 7: Context Compliance (if CONTEXT.md exists)" | kind=entity | source=.github/agents/gsd-plan-checker.agent.md:L301 | neighbors=[gsd-plan-checker.agent.md]
- "agents_gsd_plan_checker_agent_dimension_7b_scope_reduction_detection": "Dimension 7b: Scope Reduction Detection" | kind=entity | source=.github/agents/gsd-plan-checker.agent.md:L346 | neighbors=[gsd-plan-checker.agent.md]
- "agents_gsd_plan_checker_agent_dimension_7c_architectural_tier_compliance": "Dimension 7c: Architectural Tier Compliance" | kind=entity | source=.github/agents/gsd-plan-checker.agent.md:L391 | neighbors=[gsd-plan-checker.agent.md]
- "agents_gsd_plan_checker_agent_dimension_8_output": "Dimension 8 Output" | kind=entity | source=.github/agents/gsd-plan-checker.agent.md:L481 | neighbors=[Dimension 8: Nyquist Compliance]
- "agents_gsd_plan_checker_agent_dimension_9_cross_plan_data_contracts": "Dimension 9: Cross-Plan Data Contracts" | kind=entity | source=.github/agents/gsd-plan-checker.agent.md:L497 | neighbors=[gsd-plan-checker.agent.md]
- "agents_gsd_plan_checker_agent_issue_format": "Issue Format" | kind=entity | source=.github/agents/gsd-plan-checker.agent.md:L843 | neighbors=[gsd-plan-checker.agent.md]
- "agents_gsd_plan_checker_agent_issues_found": "ISSUES FOUND" | kind=entity | source=.github/agents/gsd-plan-checker.agent.md:L904 | neighbors=[gsd-plan-checker.agent.md]
- "agents_gsd_plan_checker_agent_scope_exceeded_most_common_miss": "Scope Exceeded (most common miss)" | kind=entity | source=.github/agents/gsd-plan-checker.agent.md:L804 | neighbors=[gsd-plan-checker.agent.md]
- "agents_gsd_plan_checker_agent_severity_levels": "Severity Levels" | kind=entity | source=.github/agents/gsd-plan-checker.agent.md:L855 | neighbors=[gsd-plan-checker.agent.md]
- "agents_gsd_plan_checker_agent_step_1_load_context": "Step 1: Load Context" | kind=entity | source=.github/agents/gsd-plan-checker.agent.md:L646 | neighbors=[gsd-plan-checker.agent.md]
- "agents_gsd_plan_checker_agent_step_10_determine_overall_status": "Step 10: Determine Overall Status" | kind=entity | source=.github/agents/gsd-plan-checker.agent.md:L792 | neighbors=[gsd-plan-checker.agent.md]
- "agents_gsd_plan_checker_agent_step_2_load_all_plans": "Step 2: Load All Plans" | kind=entity | source=.github/agents/gsd-plan-checker.agent.md:L668 | neighbors=[gsd-plan-checker.agent.md]
- "agents_gsd_plan_checker_agent_step_3_parse_must_haves": "Step 3: Parse must_haves" | kind=entity | source=.github/agents/gsd-plan-checker.agent.md:L688 | neighbors=[gsd-plan-checker.agent.md]
- "agents_gsd_plan_checker_agent_step_4_check_requirement_coverage": "Step 4: Check Requirement Coverage" | kind=entity | source=.github/agents/gsd-plan-checker.agent.md:L717 | neighbors=[gsd-plan-checker.agent.md]
- "agents_gsd_plan_checker_agent_step_5_validate_task_structure": "Step 5: Validate Task Structure" | kind=entity | source=.github/agents/gsd-plan-checker.agent.md:L733 | neighbors=[gsd-plan-checker.agent.md]
- "agents_gsd_plan_checker_agent_step_6_verify_dependency_graph": "Step 6: Verify Dependency Graph" | kind=entity | source=.github/agents/gsd-plan-checker.agent.md:L755 | neighbors=[gsd-plan-checker.agent.md]
- "agents_gsd_plan_checker_agent_step_7_check_key_links": "Step 7: Check Key Links" | kind=entity | source=.github/agents/gsd-plan-checker.agent.md:L765 | neighbors=[gsd-plan-checker.agent.md]
- "agents_gsd_plan_checker_agent_step_8_assess_scope": "Step 8: Assess Scope" | kind=entity | source=.github/agents/gsd-plan-checker.agent.md:L775 | neighbors=[gsd-plan-checker.agent.md]
- "agents_gsd_plan_checker_agent_step_9_verify_must_haves_derivation": "Step 9: Verify must_haves Derivation" | kind=entity | source=.github/agents/gsd-plan-checker.agent.md:L784 | neighbors=[gsd-plan-checker.agent.md]
- "agents_gsd_plan_checker_agent_verification_passed": "VERIFICATION PASSED" | kind=entity | source=.github/agents/gsd-plan-checker.agent.md:L878 | neighbors=[gsd-plan-checker.agent.md]
- "agents_gsd_plan_checker_dimension_10_claude_md_compliance": "Dimension 10: CLAUDE.md Compliance" | kind=entity | source=.claude/agents/gsd-plan-checker.md:L516 | neighbors=[gsd-plan-checker.md]
- "agents_gsd_plan_checker_dimension_10_clinerules_compliance": "Dimension 10: .clinerules Compliance" | kind=entity | source=agents/gsd-plan-checker.md:L514 | neighbors=[gsd-plan-checker.md]
- "agents_gsd_plan_checker_md_agents_gsd_plan_checker_check_8a_automated_verify_presence": "Check 8a — Automated Verify Presence" | kind=entity | source=agents/gsd-plan-checker.md:L454 | neighbors=[Dimension 8: Nyquist Compliance]
- "agents_gsd_plan_checker_md_agents_gsd_plan_checker_check_8b_feedback_latency_assessment": "Check 8b — Feedback Latency Assessment" | kind=entity | source=agents/gsd-plan-checker.md:L461 | neighbors=[Dimension 8: Nyquist Compliance]
- "agents_gsd_plan_checker_md_agents_gsd_plan_checker_check_8c_sampling_continuity": "Check 8c — Sampling Continuity" | kind=entity | source=agents/gsd-plan-checker.md:L468 | neighbors=[Dimension 8: Nyquist Compliance]
- "agents_gsd_plan_checker_md_agents_gsd_plan_checker_check_8d_wave_0_completeness": "Check 8d — Wave 0 Completeness" | kind=entity | source=agents/gsd-plan-checker.md:L472 | neighbors=[Dimension 8: Nyquist Compliance]
- "agents_gsd_plan_checker_md_agents_gsd_plan_checker_check_8e_validation_md_existence_gate": "Check 8e — VALIDATION.md Existence (Gate)" | kind=entity | source=agents/gsd-plan-checker.md:L441 | neighbors=[Dimension 8: Nyquist Compliance]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\PTOW\1_APT_Central_Command\.graphify\description-instructions\batch-115.json

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
