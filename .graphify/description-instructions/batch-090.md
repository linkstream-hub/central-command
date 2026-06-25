# Node Description Batch 91 of 412

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

- "13_write_path_flip_13_discussion_log_areas_identified": "Areas Identified" | kind=entity | source=.planning/phases/13-write-path-flip/13-DISCUSSION-LOG.md:L8 | neighbors=[Phase 13: Write Path Flip — Discussion …]
- "13_write_path_flip_13_discussion_log_auth_pre_flight_required_blocker_task_1": "Auth Pre-flight → Required Blocker (Task 1)" | kind=entity | source=.planning/phases/13-write-path-flip/13-DISCUSSION-LOG.md:L38 | neighbors=[Decisions Made (Claude Discretion — WWP…]
- "13_write_path_flip_13_discussion_log_deferred_ideas": "Deferred Ideas" | kind=entity | source=.planning/phases/13-write-path-flip/13-DISCUSSION-LOG.md:L56 | neighbors=[Phase 13: Write Path Flip — Discussion …]
- "13_write_path_flip_13_discussion_log_error_handling_harden_in_phase_13": "Error Handling → Harden in Phase 13" | kind=entity | source=.planning/phases/13-write-path-flip/13-DISCUSSION-LOG.md:L48 | neighbors=[Decisions Made (Claude Discretion — WWP…]
- "13_write_path_flip_13_discussion_log_flip_safety_mechanism_script_property_toggle": "Flip Safety Mechanism → Script Property Toggle" | kind=entity | source=.planning/phases/13-write-path-flip/13-DISCUSSION-LOG.md:L18 | neighbors=[Decisions Made (Claude Discretion — WWP…]
- "13_write_path_flip_13_discussion_log_updatejob_scope_in_scope": "updateJob() Scope → In Scope" | kind=entity | source=.planning/phases/13-write-path-flip/13-DISCUSSION-LOG.md:L28 | neighbors=[Decisions Made (Claude Discretion — WWP…]
- "14_archive_docs_14_01_plan": "14-01-PLAN.md" | kind=entity | source=.planning/phases/14-archive-docs/14-01-PLAN.md:L1 | neighbors=[Phase 14: Archive + Docs (v1.1 Neon Cut…]
- "14_archive_docs_14_01_plan_goals": "Goals" | kind=entity | source=.planning/phases/14-archive-docs/14-01-PLAN.md:L3 | neighbors=[Phase 14: Archive + Docs (v1.1 Neon Cut…]
- "14_archive_docs_14_01_plan_verification": "Verification" | kind=entity | source=.planning/phases/14-archive-docs/14-01-PLAN.md:L16 | neighbors=[Phase 14: Archive + Docs (v1.1 Neon Cut…]
- "14_archive_docs_14_01_plan_wave_1_sheet_protection_documentation": "Wave 1: Sheet Protection & Documentation" | kind=entity | source=.planning/phases/14-archive-docs/14-01-PLAN.md:L10 | neighbors=[Tasks]
- "14_archive_docs_14_01_summary": "14-01-SUMMARY.md" | kind=entity | source=.planning/phases/14-archive-docs/14-01-SUMMARY.md:L1 | neighbors=[14-01 — SUPERSEDED, never executed]
- "14_archive_docs_14_01_summary_14_01_superseded_never_executed": "14-01 — SUPERSEDED, never executed" | kind=entity | source=.planning/phases/14-archive-docs/14-01-SUMMARY.md:L8 | neighbors=[14-01-SUMMARY.md]
- "15_gas_migration_phase_a_dead_code_cleanup_15_01_plan_stride_threat_register": "STRIDE Threat Register" | kind=entity | source=.planning/phases/15-gas-migration-phase-a-dead-code-cleanup/15-01-PLAN.md:L127 | neighbors=[15-01-PLAN.md]
- "15_gas_migration_phase_a_dead_code_cleanup_15_01_plan_trust_boundaries": "Trust Boundaries" | kind=entity | source=.planning/phases/15-gas-migration-phase-a-dead-code-cleanup/15-01-PLAN.md:L121 | neighbors=[15-01-PLAN.md]
- "15_gas_migration_phase_a_dead_code_cleanup_15_02_plan_rollback_if_a_live_caller_was_missed": "Rollback if a live caller was missed" | kind=entity | source=.planning/phases/15-gas-migration-phase-a-dead-code-cleanup/15-02-PLAN.md:L160 | neighbors=[15-02-PLAN.md]
- "15_gas_migration_phase_a_dead_code_cleanup_15_02_plan_stride_threat_register": "STRIDE Threat Register" | kind=entity | source=.planning/phases/15-gas-migration-phase-a-dead-code-cleanup/15-02-PLAN.md:L151 | neighbors=[15-02-PLAN.md]
- "15_gas_migration_phase_a_dead_code_cleanup_15_02_plan_trust_boundaries": "Trust Boundaries" | kind=entity | source=.planning/phases/15-gas-migration-phase-a-dead-code-cleanup/15-02-PLAN.md:L145 | neighbors=[15-02-PLAN.md]
- "15_gas_migration_phase_a_dead_code_cleanup_15_03_plan_rollback_if_a_live_caller_was_missed": "Rollback if a live caller was missed" | kind=entity | source=.planning/phases/15-gas-migration-phase-a-dead-code-cleanup/15-03-PLAN.md:L158 | neighbors=[15-03-PLAN.md]
- "15_gas_migration_phase_a_dead_code_cleanup_15_03_plan_stride_threat_register": "STRIDE Threat Register" | kind=entity | source=.planning/phases/15-gas-migration-phase-a-dead-code-cleanup/15-03-PLAN.md:L148 | neighbors=[15-03-PLAN.md]
- "15_gas_migration_phase_a_dead_code_cleanup_15_03_plan_trust_boundaries": "Trust Boundaries" | kind=entity | source=.planning/phases/15-gas-migration-phase-a-dead-code-cleanup/15-03-PLAN.md:L141 | neighbors=[15-03-PLAN.md]
- "15_gas_migration_phase_a_dead_code_cleanup_15_04_plan_stride_threat_register": "STRIDE Threat Register" | kind=entity | source=.planning/phases/15-gas-migration-phase-a-dead-code-cleanup/15-04-PLAN.md:L131 | neighbors=[15-04-PLAN.md]
- "15_gas_migration_phase_a_dead_code_cleanup_15_04_plan_trust_boundaries": "Trust Boundaries" | kind=entity | source=.planning/phases/15-gas-migration-phase-a-dead-code-cleanup/15-04-PLAN.md:L125 | neighbors=[15-04-PLAN.md]
- "15_gas_migration_phase_a_dead_code_cleanup_15_context": "15-CONTEXT.md" | kind=entity | source=.planning/phases/15-gas-migration-phase-a-dead-code-cleanup/15-CONTEXT.md:L1 | neighbors=[Phase 15: GAS Migration — Phase A: Dead…]
- "15_gas_migration_phase_a_dead_code_cleanup_15_context_canonical_references": "Canonical References" | kind=entity | source=.planning/phases/15-gas-migration-phase-a-dead-code-cleanup/15-CONTEXT.md:L35 | neighbors=[Phase 15: GAS Migration — Phase A: Dead…]
- "15_gas_migration_phase_a_dead_code_cleanup_15_context_dashboardapi_gs_entry_points": "DashboardAPI.gs entry points" | kind=entity | source=.planning/phases/15-gas-migration-phase-a-dead-code-cleanup/15-CONTEXT.md:L82 | neighbors=[Deferred]
- "15_gas_migration_phase_a_dead_code_cleanup_15_context_delete_candidates_from_gas_migration_scope_md": "Delete Candidates (from GAS_MIGRATION_SCOPE.md)" | kind=entity | source=.planning/phases/15-gas-migration-phase-a-dead-code-cleanup/15-CONTEXT.md:L46 | neighbors=[Existing Code Insights]
- "15_gas_migration_phase_a_dead_code_cleanup_15_context_deploy": "Deploy" | kind=entity | source=.planning/phases/15-gas-migration-phase-a-dead-code-cleanup/15-CONTEXT.md:L24 | neighbors=[Implementation Decisions]
- "15_gas_migration_phase_a_dead_code_cleanup_15_context_integration_points": "Integration Points" | kind=entity | source=.planning/phases/15-gas-migration-phase-a-dead-code-cleanup/15-CONTEXT.md:L57 | neighbors=[Existing Code Insights]
- "15_gas_migration_phase_a_dead_code_cleanup_15_context_phase_boundary": "Phase Boundary" | kind=entity | source=.planning/phases/15-gas-migration-phase-a-dead-code-cleanup/15-CONTEXT.md:L8 | neighbors=[Phase 15: GAS Migration — Phase A: Dead…]
- "15_gas_migration_phase_a_dead_code_cleanup_15_context_scope": "Scope" | kind=entity | source=.planning/phases/15-gas-migration-phase-a-dead-code-cleanup/15-CONTEXT.md:L19 | neighbors=[Implementation Decisions]
- "15_gas_migration_phase_a_dead_code_cleanup_15_context_specific_requirements": "Specific Requirements" | kind=entity | source=.planning/phases/15-gas-migration-phase-a-dead-code-cleanup/15-CONTEXT.md:L63 | neighbors=[Phase 15: GAS Migration — Phase A: Dead…]
- "15_gas_migration_phase_a_dead_code_cleanup_15_context_suggesttechs_js_full_removal": "SuggestTechs.js full removal" | kind=entity | source=.planning/phases/15-gas-migration-phase-a-dead-code-cleanup/15-CONTEXT.md:L79 | neighbors=[Deferred]
- "15_gas_migration_phase_a_dead_code_cleanup_15_context_tenant_contact_ptegranted_no": "Tenant Contact (pteGranted=No)" | kind=entity | source=.planning/phases/15-gas-migration-phase-a-dead-code-cleanup/15-CONTEXT.md:L75 | neighbors=[Deferred]
- "15_gas_migration_phase_a_dead_code_cleanup_15_context_verification": "Verification" | kind=entity | source=.planning/phases/15-gas-migration-phase-a-dead-code-cleanup/15-CONTEXT.md:L28 | neighbors=[Implementation Decisions]
- "15_gas_migration_phase_a_dead_code_cleanup_15_discussion_log": "15-DISCUSSION-LOG.md" | kind=entity | source=.planning/phases/15-gas-migration-phase-a-dead-code-cleanup/15-DISCUSSION-LOG.md:L1 | neighbors=[Phase 15: Tenant Contact — pteGranted=N…]
- "15_gas_migration_phase_a_dead_code_cleanup_15_discussion_log_claude_s_discretion": "Claude's Discretion" | kind=entity | source=.planning/phases/15-gas-migration-phase-a-dead-code-cleanup/15-DISCUSSION-LOG.md:L51 | neighbors=[Phase 15: Tenant Contact — pteGranted=N…]
- "15_gas_migration_phase_a_dead_code_cleanup_15_discussion_log_deferred_ideas": "Deferred Ideas" | kind=entity | source=.planning/phases/15-gas-migration-phase-a-dead-code-cleanup/15-DISCUSSION-LOG.md:L59 | neighbors=[Phase 15: Tenant Contact — pteGranted=N…]
- "15_gas_migration_phase_a_dead_code_cleanup_15_discussion_log_email_body_content": "Email Body Content" | kind=entity | source=.planning/phases/15-gas-migration-phase-a-dead-code-cleanup/15-DISCUSSION-LOG.md:L12 | neighbors=[Phase 15: Tenant Contact — pteGranted=N…]
- "15_gas_migration_phase_a_dead_code_cleanup_15_discussion_log_enable_guard": "Enable Guard" | kind=entity | source=.planning/phases/15-gas-migration-phase-a-dead-code-cleanup/15-DISCUSSION-LOG.md:L38 | neighbors=[Phase 15: Tenant Contact — pteGranted=N…]
- "15_gas_migration_phase_a_dead_code_cleanup_15_discussion_log_internal_notification": "Internal Notification" | kind=entity | source=.planning/phases/15-gas-migration-phase-a-dead-code-cleanup/15-DISCUSSION-LOG.md:L25 | neighbors=[Phase 15: Tenant Contact — pteGranted=N…]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\PTOW\1_APT_Central_Command\.graphify\description-instructions\batch-090.json

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
