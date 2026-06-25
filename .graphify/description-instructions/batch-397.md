# Node Description Batch 398 of 412

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

- "workflows_plan_phase_12_5_plan_bounce_optional_external_refinement": "12.5. Plan Bounce (Optional External Refinement)" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/plan-phase.md:L1369 | neighbors=[plan-phase.md] | lang=en
- "workflows_plan_phase_12_revision_loop_max_3_iterations": "12. Revision Loop (Max 3 Iterations)" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/plan-phase.md:L1294 | neighbors=[plan-phase.md] | lang=en
- "workflows_plan_phase_13_requirements_coverage_gate": "13. Requirements Coverage Gate" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/plan-phase.md:L1440 | neighbors=[plan-phase.md] | lang=en
- "workflows_plan_phase_13a_decision_coverage_gate": "13a. Decision Coverage Gate" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/plan-phase.md:L1491 | neighbors=[plan-phase.md] | lang=pt
- "workflows_plan_phase_13b_record_planning_completion_in_state_md": "13b. Record Planning Completion in STATE.md" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/plan-phase.md:L1557 | neighbors=[plan-phase.md] | lang=en
- "workflows_plan_phase_13c_annotate_roadmap_with_wave_dependencies_and_cross_cutting_constraints": "13c. Annotate ROADMAP with Wave Dependencies and Cross-cutting Constraints" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/plan-phase.md:L1567 | neighbors=[plan-phase.md] | lang=en
- "workflows_plan_phase_13d_commit_plans_if_commit_docs_is_true": "13d. Commit Plans if commit_docs is true" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/plan-phase.md:L1581 | neighbors=[plan-phase.md] | lang=en
- "workflows_plan_phase_13e_post_planning_gap_analysis": "13e. Post-Planning Gap Analysis" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/plan-phase.md:L1591 | neighbors=[plan-phase.md] | lang=en
- "workflows_plan_phase_14_present_final_status": "14. Present Final Status" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/plan-phase.md:L1638 | neighbors=[plan-phase.md] | lang=en
- "workflows_plan_phase_15_auto_advance_check": "15. Auto-Advance Check" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/plan-phase.md:L1642 | neighbors=[plan-phase.md] | lang=en
- "workflows_plan_phase_2_5_validate_reviews_prerequisite": "2.5. Validate `--reviews` Prerequisite" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/plan-phase.md:L175 | neighbors=[plan-phase.md] | lang=en
- "workflows_plan_phase_2_parse_and_normalize_arguments": "2. Parse and Normalize Arguments" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/plan-phase.md:L99 | neighbors=[plan-phase.md] | lang=en
- "workflows_plan_phase_3_5_handle_prd_express_path": "3.5. Handle PRD Express Path" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/plan-phase.md:L206 | neighbors=[plan-phase.md] | lang=en
- "workflows_plan_phase_3_6_handle_adr_ingest_express_path": "3.6. Handle ADR Ingest Express Path" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/plan-phase.md:L310 | neighbors=[plan-phase.md] | lang=en
- "workflows_plan_phase_3_validate_phase": "3. Validate Phase" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/plan-phase.md:L193 | neighbors=[plan-phase.md] | lang=en
- "workflows_plan_phase_4_5_check_ai_spec": "4.5. Check AI-SPEC" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/plan-phase.md:L375 | neighbors=[plan-phase.md] | lang=en
- "workflows_plan_phase_4_load_context_md": "4. Load CONTEXT.md" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/plan-phase.md:L325 | neighbors=[plan-phase.md] | lang=en
- "workflows_plan_phase_5_0_research_only_modifiers_view_research_prompt": "5.0. Research-Only Modifiers (`--view`, `--research`, prompt)" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/plan-phase.md:L419 | neighbors=[5. Handle Research] | lang=en
- "workflows_plan_phase_5_1_standard_research_decision": "5.1. Standard Research Decision" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/plan-phase.md:L436 | neighbors=[5. Handle Research] | lang=en
- "workflows_plan_phase_5_5_create_validation_strategy": "5.5. Create Validation Strategy" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/plan-phase.md:L554 | neighbors=[plan-phase.md] | lang=en
- "workflows_plan_phase_5_55_security_threat_model_gate": "5.55. Security Threat Model Gate" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/plan-phase.md:L584 | neighbors=[plan-phase.md] | lang=en
- "workflows_plan_phase_5_6_ui_design_contract_gate": "5.6. UI Design Contract Gate" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/plan-phase.md:L610 | neighbors=[plan-phase.md] | lang=en
- "workflows_plan_phase_5_7_schema_push_detection_gate": "5.7. Schema Push Detection Gate" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/plan-phase.md:L677 | neighbors=[plan-phase.md] | lang=en
- "workflows_plan_phase_6_check_existing_plans": "6. Check Existing Plans" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/plan-phase.md:L739 | neighbors=[plan-phase.md] | lang=en
- "workflows_plan_phase_7_5_verify_nyquist_artifacts": "7.5. Verify Nyquist Artifacts" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/plan-phase.md:L770 | neighbors=[plan-phase.md] | lang=en
- "workflows_plan_phase_7_8_spawn_gsd_pattern_mapper_agent_optional": "7.8. Spawn gsd-pattern-mapper Agent (Optional)" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/plan-phase.md:L793 | neighbors=[plan-phase.md] | lang=en
- "workflows_plan_phase_7_use_context_paths_from_init": "7. Use Context Paths from INIT" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/plan-phase.md:L749 | neighbors=[plan-phase.md] | lang=en
- "workflows_plan_phase_8_5_1_outline_phase_outline_only_mode_2_min": "8.5.1 Outline Phase (outline-only mode, ~2 min)" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/plan-phase.md:L1003 | neighbors=[8.5. Chunked Planning Mode] | lang=en
- "workflows_plan_phase_8_5_2_per_plan_tasks_single_plan_mode_3_5_min_each": "8.5.2 Per-Plan Tasks (single-plan mode, ~3-5 min each)" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/plan-phase.md:L1048 | neighbors=[8.5. Chunked Planning Mode] | lang=en
- "workflows_plan_phase_8_spawn_gsd_planner_agent": "8. Spawn gsd-planner Agent" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/plan-phase.md:L854 | neighbors=[plan-phase.md] | lang=en
- "workflows_plan_phase_9_handle_planner_return": "9. Handle Planner Return" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/plan-phase.md:L1098 | neighbors=[plan-phase.md] | lang=en
- "workflows_plan_phase_9a_filesystem_fallback_planner": "9a. Filesystem Fallback (Planner)" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/plan-phase.md:L1107 | neighbors=[plan-phase.md] | lang=pt
- "workflows_plan_phase_9b_handle_phase_split_recommendation": "9b. Handle Phase Split Recommendation" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/plan-phase.md:L1135 | neighbors=[plan-phase.md] | lang=en
- "workflows_plan_phase_9c_handle_source_audit_gaps": "9c. Handle Source Audit Gaps" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/plan-phase.md:L1167 | neighbors=[plan-phase.md] | lang=en
- "workflows_plan_phase_handle_researcher_return": "Handle Researcher Return" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/plan-phase.md:L531 | neighbors=[5. Handle Research] | lang=en
- "workflows_plan_phase_next_up_project_code_project_title": "▶ Next Up — [${PROJECT_CODE}] ${PROJECT_TITLE}" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/plan-phase.md:L1727 | neighbors=[plan-phase.md] | lang=en
- "workflows_plan_phase_research_only_early_exit_research_phase": "Research-Only Early Exit (`--research-phase`)" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/plan-phase.md:L536 | neighbors=[5. Handle Research] | lang=en
- "workflows_plan_phase_spawn_gsd_phase_researcher": "Spawn gsd-phase-researcher" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/plan-phase.md:L485 | neighbors=[5. Handle Research] | lang=en
- "workflows_plan_review_convergence_1_5_config_gate_feature_disabled_by_default": "1.5. Config Gate (feature disabled by default)" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/plan-review-convergence.md:L43 | neighbors=[plan-review-convergence.md] | lang=en
- "workflows_plan_review_convergence_1_parse_and_normalize_arguments": "1. Parse and Normalize Arguments" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/plan-review-convergence.md:L18 | neighbors=[plan-review-convergence.md] | lang=en

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\PTOW\1_APT_Central_Command\.graphify\description-instructions\batch-397.json

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
