# Node Description Batch 90 of 412

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

- "12_data_integrity_audit_12_research_wave_0_gaps": "Wave 0 Gaps" | kind=entity | source=.planning/phases/12-data-integrity-audit/12-RESEARCH.md:L639 | neighbors=[Validation Architecture]
- "12_data_integrity_audit_12_validation": "12-VALIDATION.md" | kind=entity | source=.planning/phases/12-data-integrity-audit/12-VALIDATION.md:L1 | neighbors=[Validation Strategy — Phase 12: Data In…]
- "12_data_integrity_audit_12_validation_dimension_coverage": "Dimension Coverage" | kind=entity | source=.planning/phases/12-data-integrity-audit/12-VALIDATION.md:L51 | neighbors=[Validation Strategy — Phase 12: Data In…]
- "12_data_integrity_audit_12_validation_exit_code_contract": "Exit Code Contract" | kind=entity | source=.planning/phases/12-data-integrity-audit/12-VALIDATION.md:L36 | neighbors=[Validation Strategy — Phase 12: Data In…]
- "12_data_integrity_audit_12_validation_phase_requirements_test_map": "Phase Requirements → Test Map" | kind=entity | source=.planning/phases/12-data-integrity-audit/12-VALIDATION.md:L18 | neighbors=[Validation Strategy — Phase 12: Data In…]
- "12_data_integrity_audit_12_validation_sampling_rate": "Sampling Rate" | kind=entity | source=.planning/phases/12-data-integrity-audit/12-VALIDATION.md:L28 | neighbors=[Validation Strategy — Phase 12: Data In…]
- "12_data_integrity_audit_12_validation_test_framework": "Test Framework" | kind=entity | source=.planning/phases/12-data-integrity-audit/12-VALIDATION.md:L9 | neighbors=[Validation Strategy — Phase 12: Data In…]
- "12_data_integrity_audit_12_validation_wave_0_gaps_test_stubs_required_before_implementation": "Wave 0 Gaps (test stubs required before implementation)" | kind=entity | source=.planning/phases/12-data-integrity-audit/12-VALIDATION.md:L46 | neighbors=[Validation Strategy — Phase 12: Data In…]
- "13_write_path_flip_13_01_plan_stride_threat_register": "STRIDE Threat Register" | kind=entity | source=.planning/phases/13-write-path-flip/13-01-PLAN.md:L535 | neighbors=[13-01-PLAN.md]
- "13_write_path_flip_13_01_plan_trust_boundaries": "Trust Boundaries" | kind=entity | source=.planning/phases/13-write-path-flip/13-01-PLAN.md:L528 | neighbors=[13-01-PLAN.md]
- "13_write_path_flip_13_01_summary": "13-01-SUMMARY.md" | kind=entity | source=.planning/phases/13-write-path-flip/13-01-SUMMARY.md:L1 | neighbors=[13-01 — SUPERSEDED, never executed]
- "13_write_path_flip_13_01_summary_13_01_superseded_never_executed": "13-01 — SUPERSEDED, never executed" | kind=entity | source=.planning/phases/13-write-path-flip/13-01-SUMMARY.md:L8 | neighbors=[13-01-SUMMARY.md]
- "13_write_path_flip_13_02_plan": "13-02-PLAN.md" | kind=entity | source=.planning/phases/13-write-path-flip/13-02-PLAN.md:L1 | neighbors=[STRIDE Threat Register]
- "13_write_path_flip_13_02_plan_stride_threat_register": "STRIDE Threat Register" | kind=entity | source=.planning/phases/13-write-path-flip/13-02-PLAN.md:L281 | neighbors=[13-02-PLAN.md]
- "13_write_path_flip_13_02_summary": "13-02-SUMMARY.md" | kind=entity | source=.planning/phases/13-write-path-flip/13-02-SUMMARY.md:L1 | neighbors=[13-02 — SUPERSEDED, never executed]
- "13_write_path_flip_13_02_summary_13_02_superseded_never_executed": "13-02 — SUPERSEDED, never executed" | kind=entity | source=.planning/phases/13-write-path-flip/13-02-SUMMARY.md:L8 | neighbors=[13-02-SUMMARY.md]
- "13_write_path_flip_13_03_plan": "13-03-PLAN.md" | kind=entity | source=.planning/phases/13-write-path-flip/13-03-PLAN.md:L1 | neighbors=[STRIDE Threat Register]
- "13_write_path_flip_13_03_plan_stride_threat_register": "STRIDE Threat Register" | kind=entity | source=.planning/phases/13-write-path-flip/13-03-PLAN.md:L475 | neighbors=[13-03-PLAN.md]
- "13_write_path_flip_13_03_summary": "13-03-SUMMARY.md" | kind=entity | source=.planning/phases/13-write-path-flip/13-03-SUMMARY.md:L1 | neighbors=[13-03 — SUPERSEDED, never executed]
- "13_write_path_flip_13_03_summary_13_03_superseded_never_executed": "13-03 — SUPERSEDED, never executed" | kind=entity | source=.planning/phases/13-write-path-flip/13-03-SUMMARY.md:L8 | neighbors=[13-03-SUMMARY.md]
- "13_write_path_flip_13_context": "13-CONTEXT.md" | kind=entity | source=.planning/phases/13-write-path-flip/13-CONTEXT.md:L1 | neighbors=[Phase 13: Write Path Flip — Context]
- "13_write_path_flip_13_context_auth_path_to_verify": "Auth Path to Verify" | kind=entity | source=.planning/phases/13-write-path-flip/13-CONTEXT.md:L82 | neighbors=[Existing Code Insights]
- "13_write_path_flip_13_context_auth_pre_flight_task_1_blocker": "Auth Pre-flight (Task 1 — Blocker)" | kind=entity | source=.planning/phases/13-write-path-flip/13-CONTEXT.md:L26 | neighbors=[Implementation Decisions]
- "13_write_path_flip_13_context_deferred_ideas": "Deferred Ideas" | kind=entity | source=.planning/phases/13-write-path-flip/13-CONTEXT.md:L105 | neighbors=[Phase 13: Write Path Flip — Context]
- "13_write_path_flip_13_context_error_handling_hardening": "Error Handling Hardening" | kind=entity | source=.planning/phases/13-write-path-flip/13-CONTEXT.md:L30 | neighbors=[Implementation Decisions]
- "13_write_path_flip_13_context_established_patterns": "Established Patterns" | kind=entity | source=.planning/phases/13-write-path-flip/13-CONTEXT.md:L87 | neighbors=[Existing Code Insights]
- "13_write_path_flip_13_context_flip_safety_mechanism": "Flip Safety Mechanism" | kind=entity | source=.planning/phases/13-write-path-flip/13-CONTEXT.md:L18 | neighbors=[Implementation Decisions]
- "13_write_path_flip_13_context_gas_migration_scope": "GAS Migration Scope" | kind=entity | source=.planning/phases/13-write-path-flip/13-CONTEXT.md:L62 | neighbors=[Canonical References]
- "13_write_path_flip_13_context_gas_source_files": "GAS Source Files" | kind=entity | source=.planning/phases/13-write-path-flip/13-CONTEXT.md:L54 | neighbors=[Canonical References]
- "13_write_path_flip_13_context_key_functions_to_modify": "Key Functions to Modify" | kind=entity | source=.planning/phases/13-write-path-flip/13-CONTEXT.md:L77 | neighbors=[Existing Code Insights]
- "13_write_path_flip_13_context_next_js_job_routes": "Next.js Job Routes" | kind=entity | source=.planning/phases/13-write-path-flip/13-CONTEXT.md:L58 | neighbors=[Canonical References]
- "13_write_path_flip_13_context_phase_boundary": "Phase Boundary" | kind=entity | source=.planning/phases/13-write-path-flip/13-CONTEXT.md:L7 | neighbors=[Phase 13: Write Path Flip — Context]
- "13_write_path_flip_13_context_requirements": "Requirements" | kind=entity | source=.planning/phases/13-write-path-flip/13-CONTEXT.md:L65 | neighbors=[Canonical References]
- "13_write_path_flip_13_context_schema": "Schema" | kind=entity | source=.planning/phases/13-write-path-flip/13-CONTEXT.md:L69 | neighbors=[Canonical References]
- "13_write_path_flip_13_context_specific_constraints": "Specific Constraints" | kind=entity | source=.planning/phases/13-write-path-flip/13-CONTEXT.md:L95 | neighbors=[Phase 13: Write Path Flip — Context]
- "13_write_path_flip_13_context_updatejob_scope": "updateJob() Scope" | kind=entity | source=.planning/phases/13-write-path-flip/13-CONTEXT.md:L22 | neighbors=[Implementation Decisions]
- "13_write_path_flip_13_context_verification_approach": "Verification Approach" | kind=entity | source=.planning/phases/13-write-path-flip/13-CONTEXT.md:L34 | neighbors=[Implementation Decisions]
- "13_write_path_flip_13_context_what_s_explicitly_out_of_scope": "What's Explicitly Out of Scope" | kind=entity | source=.planning/phases/13-write-path-flip/13-CONTEXT.md:L38 | neighbors=[Implementation Decisions]
- "13_write_path_flip_13_context_write_path_state_gaps": "Write Path State + Gaps" | kind=entity | source=.planning/phases/13-write-path-flip/13-CONTEXT.md:L51 | neighbors=[Canonical References]
- "13_write_path_flip_13_discussion_log": "13-DISCUSSION-LOG.md" | kind=entity | source=.planning/phases/13-write-path-flip/13-DISCUSSION-LOG.md:L1 | neighbors=[Phase 13: Write Path Flip — Discussion …]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\PTOW\1_APT_Central_Command\.graphify\description-instructions\batch-089.json

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
