# Node Description Batch 87 of 412

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

- "10_gas_migration_scope_10_research_validation_architecture": "Validation Architecture" | kind=entity | source=.planning/phases/10-gas-migration-scope/10-RESEARCH.md:L539 | neighbors=[Phase 10: GAS Migration Scope — Research]
- "10_gas_migration_scope_10_validation": "10-VALIDATION.md" | kind=entity | source=.planning/phases/10-gas-migration-scope/10-VALIDATION.md:L1 | neighbors=[Phase 10 — Validation Strategy]
- "10_gas_migration_scope_10_validation_manual_only_verifications": "Manual-Only Verifications" | kind=entity | source=.planning/phases/10-gas-migration-scope/10-VALIDATION.md:L57 | neighbors=[Phase 10 — Validation Strategy]
- "10_gas_migration_scope_10_validation_per_task_verification_map": "Per-Task Verification Map" | kind=entity | source=.planning/phases/10-gas-migration-scope/10-VALIDATION.md:L37 | neighbors=[Phase 10 — Validation Strategy]
- "10_gas_migration_scope_10_validation_sampling_rate": "Sampling Rate" | kind=entity | source=.planning/phases/10-gas-migration-scope/10-VALIDATION.md:L28 | neighbors=[Phase 10 — Validation Strategy]
- "10_gas_migration_scope_10_validation_test_infrastructure": "Test Infrastructure" | kind=entity | source=.planning/phases/10-gas-migration-scope/10-VALIDATION.md:L16 | neighbors=[Phase 10 — Validation Strategy]
- "10_gas_migration_scope_10_validation_validation_sign_off": "Validation Sign-Off" | kind=entity | source=.planning/phases/10-gas-migration-scope/10-VALIDATION.md:L67 | neighbors=[Phase 10 — Validation Strategy]
- "10_gas_migration_scope_10_validation_wave_0_requirements": "Wave 0 Requirements" | kind=entity | source=.planning/phases/10-gas-migration-scope/10-VALIDATION.md:L49 | neighbors=[Phase 10 — Validation Strategy]
- "12_data_integrity_audit_12_01_plan_stride_threat_register": "STRIDE Threat Register" | kind=entity | source=.planning/phases/12-data-integrity-audit/12-01-PLAN.md:L288 | neighbors=[12-01-PLAN.md]
- "12_data_integrity_audit_12_01_plan_trust_boundaries": "Trust Boundaries" | kind=entity | source=.planning/phases/12-data-integrity-audit/12-01-PLAN.md:L281 | neighbors=[12-01-PLAN.md]
- "12_data_integrity_audit_12_01_summary": "12-01-SUMMARY.md" | kind=entity | source=.planning/phases/12-data-integrity-audit/12-01-SUMMARY.md:L1 | neighbors=[Plan 01 Summary — Wave 1: Prerequisites…]
- "12_data_integrity_audit_12_01_summary_auth_approach_change": "Auth approach change" | kind=entity | source=.planning/phases/12-data-integrity-audit/12-01-SUMMARY.md:L16 | neighbors=[Plan 01 Summary — Wave 1: Prerequisites…]
- "12_data_integrity_audit_12_01_summary_deferred_to_brandon": "Deferred to Brandon" | kind=entity | source=.planning/phases/12-data-integrity-audit/12-01-SUMMARY.md:L31 | neighbors=[Plan 01 Summary — Wave 1: Prerequisites…]
- "12_data_integrity_audit_12_01_summary_verification": "Verification" | kind=entity | source=.planning/phases/12-data-integrity-audit/12-01-SUMMARY.md:L26 | neighbors=[Plan 01 Summary — Wave 1: Prerequisites…]
- "12_data_integrity_audit_12_01_summary_what_was_built": "What was built" | kind=entity | source=.planning/phases/12-data-integrity-audit/12-01-SUMMARY.md:L10 | neighbors=[Plan 01 Summary — Wave 1: Prerequisites…]
- "12_data_integrity_audit_12_02_plan_stride_threat_register": "STRIDE Threat Register" | kind=entity | source=.planning/phases/12-data-integrity-audit/12-02-PLAN.md:L253 | neighbors=[12-02-PLAN.md]
- "12_data_integrity_audit_12_02_plan_trust_boundaries": "Trust Boundaries" | kind=entity | source=.planning/phases/12-data-integrity-audit/12-02-PLAN.md:L246 | neighbors=[12-02-PLAN.md]
- "12_data_integrity_audit_12_02_summary": "12-02-SUMMARY.md" | kind=entity | source=.planning/phases/12-data-integrity-audit/12-02-SUMMARY.md:L1 | neighbors=[Phase 12 — Plan 02 Summary: Neon Audit …]
- "12_data_integrity_audit_12_02_summary_1_python_m_py_compile_tools_orchestrator_neon_audit_py": "1. `python -m py_compile tools/orchestrator/neon_audit.py`" | kind=entity | source=.planning/phases/12-data-integrity-audit/12-02-SUMMARY.md:L27 | neighbors=[Verification Results]
- "12_data_integrity_audit_12_02_summary_2_python_tools_orchestrator_neon_audit_py_help": "2. `python tools/orchestrator/neon_audit.py --help`" | kind=entity | source=.planning/phases/12-data-integrity-audit/12-02-SUMMARY.md:L32 | neighbors=[Verification Results]
- "12_data_integrity_audit_12_02_summary_3_structural_assertion_check": "3. Structural assertion check" | kind=entity | source=.planning/phases/12-data-integrity-audit/12-02-SUMMARY.md:L53 | neighbors=[Verification Results]
- "12_data_integrity_audit_12_02_summary_auth_approach": "Auth Approach" | kind=entity | source=.planning/phases/12-data-integrity-audit/12-02-SUMMARY.md:L58 | neighbors=[Phase 12 — Plan 02 Summary: Neon Audit …]
- "12_data_integrity_audit_12_02_summary_deviations_from_plan_docs": "Deviations from Plan Docs" | kind=entity | source=.planning/phases/12-data-integrity-audit/12-02-SUMMARY.md:L67 | neighbors=[Phase 12 — Plan 02 Summary: Neon Audit …]
- "12_data_integrity_audit_12_02_summary_next_step": "Next Step" | kind=entity | source=.planning/phases/12-data-integrity-audit/12-02-SUMMARY.md:L72 | neighbors=[Phase 12 — Plan 02 Summary: Neon Audit …]
- "12_data_integrity_audit_12_02_summary_what_was_built": "What Was Built" | kind=entity | source=.planning/phases/12-data-integrity-audit/12-02-SUMMARY.md:L3 | neighbors=[Phase 12 — Plan 02 Summary: Neon Audit …]
- "12_data_integrity_audit_12_03_plan_stride_threat_register": "STRIDE Threat Register" | kind=entity | source=.planning/phases/12-data-integrity-audit/12-03-PLAN.md:L394 | neighbors=[12-03-PLAN.md]
- "12_data_integrity_audit_12_03_plan_trust_boundaries": "Trust Boundaries" | kind=entity | source=.planning/phases/12-data-integrity-audit/12-03-PLAN.md:L387 | neighbors=[12-03-PLAN.md]
- "12_data_integrity_audit_12_03_summary": "12-03-SUMMARY.md" | kind=entity | source=.planning/phases/12-data-integrity-audit/12-03-SUMMARY.md:L1 | neighbors=[Phase 12 — Wave 3 Summary: neon_audit.p…]
- "12_data_integrity_audit_12_03_summary_commits": "Commits" | kind=entity | source=.planning/phases/12-data-integrity-audit/12-03-SUMMARY.md:L33 | neighbors=[Phase 12 — Wave 3 Summary: neon_audit.p…]
- "12_data_integrity_audit_12_03_summary_deviations": "Deviations" | kind=entity | source=.planning/phases/12-data-integrity-audit/12-03-SUMMARY.md:L29 | neighbors=[Phase 12 — Wave 3 Summary: neon_audit.p…]
- "12_data_integrity_audit_12_03_summary_neon_audit_py_stubs_implemented": "neon_audit.py — Stubs Implemented" | kind=entity | source=.planning/phases/12-data-integrity-audit/12-03-SUMMARY.md:L7 | neighbors=[What Was Built]
- "12_data_integrity_audit_12_03_summary_pytest_summary": "Pytest Summary" | kind=entity | source=.planning/phases/12-data-integrity-audit/12-03-SUMMARY.md:L21 | neighbors=[Phase 12 — Wave 3 Summary: neon_audit.p…]
- "12_data_integrity_audit_12_03_summary_tests_test_neon_audit_py_9_tests_implemented": "tests/test_neon_audit.py — 9 Tests Implemented" | kind=entity | source=.planning/phases/12-data-integrity-audit/12-03-SUMMARY.md:L17 | neighbors=[What Was Built]
- "12_data_integrity_audit_12_04_summary": "12-04-SUMMARY.md" | kind=entity | source=.planning/phases/12-data-integrity-audit/12-04-SUMMARY.md:L1 | neighbors=[Phase 12 — Plan 04 Summary: Cut Sheets …]
- "12_data_integrity_audit_12_04_summary_blast_radius_audit_beyond_plan_scope": "Blast Radius Audit (beyond plan scope)" | kind=entity | source=.planning/phases/12-data-integrity-audit/12-04-SUMMARY.md:L25 | neighbors=[Phase 12 — Plan 04 Summary: Cut Sheets …]
- "12_data_integrity_audit_12_04_summary_commit": "Commit" | kind=entity | source=.planning/phases/12-data-integrity-audit/12-04-SUMMARY.md:L38 | neighbors=[Phase 12 — Plan 04 Summary: Cut Sheets …]
- "12_data_integrity_audit_12_04_summary_deviations_from_plan": "Deviations from Plan" | kind=entity | source=.planning/phases/12-data-integrity-audit/12-04-SUMMARY.md:L31 | neighbors=[Phase 12 — Plan 04 Summary: Cut Sheets …]
- "12_data_integrity_audit_12_04_summary_jobs_ts_changes": "jobs.ts Changes" | kind=entity | source=.planning/phases/12-data-integrity-audit/12-04-SUMMARY.md:L7 | neighbors=[What Was Built]
- "12_data_integrity_audit_12_04_summary_sheets_client_ts_tombstone": "sheets-client.ts Tombstone" | kind=entity | source=.planning/phases/12-data-integrity-audit/12-04-SUMMARY.md:L19 | neighbors=[What Was Built]
- "12_data_integrity_audit_12_04_summary_techs_ts_changes": "techs.ts Changes" | kind=entity | source=.planning/phases/12-data-integrity-audit/12-04-SUMMARY.md:L14 | neighbors=[What Was Built]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\PTOW\1_APT_Central_Command\.graphify\description-instructions\batch-086.json

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
