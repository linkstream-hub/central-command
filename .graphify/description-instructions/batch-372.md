# Node Description Batch 373 of 412

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

- "specs_schedule_view_spec_dropdown_structure_top_to_bottom": "Dropdown structure (top to bottom):" | kind=entity | source=specs/SCHEDULE_VIEW_SPEC.md:L81 | neighbors=[CHANGE 3 — Tech picker redesign in `Sch…]
- "specs_schedule_view_spec_objective": "OBJECTIVE" | kind=entity | source=specs/SCHEDULE_VIEW_SPEC.md:L16 | neighbors=[SPEC — SCHEDULE VIEW RESTRUCTURE (Sched…]
- "specs_schedule_view_spec_success_criteria": "SUCCESS CRITERIA" | kind=entity | source=specs/SCHEDULE_VIEW_SPEC.md:L228 | neighbors=[SPEC — SCHEDULE VIEW RESTRUCTURE (Sched…]
- "specs_schedule_view_spec_suggested_techs_api_call": "Suggested Techs API call:" | kind=entity | source=specs/SCHEDULE_VIEW_SPEC.md:L107 | neighbors=[CHANGE 3 — Tech picker redesign in `Sch…]
- "specs_schedule_view_spec_task_list_execute_in_order": "TASK LIST — EXECUTE IN ORDER" | kind=entity | source=specs/SCHEDULE_VIEW_SPEC.md:L195 | neighbors=[SPEC — SCHEDULE VIEW RESTRUCTURE (Sched…]
- "specs_send_tenant_contact": "send-tenant-contact.md" | kind=entity | source=.planning/specs/send-tenant-contact.md:L1 | neighbors=[Spec: sendTenantContact() — PTE Coordin…]
- "specs_send_tenant_contact_deployment": "Deployment" | kind=entity | source=.planning/specs/send-tenant-contact.md:L154 | neighbors=[Spec: sendTenantContact() — PTE Coordin…]
- "specs_send_tenant_contact_edge_cases": "Edge Cases" | kind=entity | source=.planning/specs/send-tenant-contact.md:L138 | neighbors=[Spec: sendTenantContact() — PTE Coordin…]
- "specs_send_tenant_contact_files_modified": "Files Modified" | kind=entity | source=.planning/specs/send-tenant-contact.md:L21 | neighbors=[Spec: sendTenantContact() — PTE Coordin…]
- "specs_send_tenant_contact_problem": "Problem" | kind=entity | source=.planning/specs/send-tenant-contact.md:L12 | neighbors=[Spec: sendTenantContact() — PTE Coordin…]
- "specs_send_tenant_contact_ptow_gate_check_claude_code_pre_action_review": "PTOW Gate Check (Claude Code pre-action review)" | kind=entity | source=.planning/specs/send-tenant-contact.md:L146 | neighbors=[Spec: sendTenantContact() — PTE Coordin…]
- "specs_send_tenant_contact_solution": "Solution" | kind=entity | source=.planning/specs/send-tenant-contact.md:L17 | neighbors=[Spec: sendTenantContact() — PTE Coordin…]
- "specs_send_tenant_contact_task_1_branch_verify": "Task 1: Branch verify" | kind=entity | source=.planning/specs/send-tenant-contact.md:L28 | neighbors=[Implementation Tasks]
- "specs_send_tenant_contact_task_2_add_tenant_contact_enabled_constant": "Task 2: Add TENANT_CONTACT_ENABLED constant" | kind=entity | source=.planning/specs/send-tenant-contact.md:L32 | neighbors=[Implementation Tasks]
- "specs_send_tenant_contact_task_3_add_sendtenantcontact_function": "Task 3: Add sendTenantContact() function" | kind=entity | source=.planning/specs/send-tenant-contact.md:L40 | neighbors=[Implementation Tasks]
- "specs_send_tenant_contact_task_4_wire_in_routelead": "Task 4: Wire in routeLead()" | kind=entity | source=.planning/specs/send-tenant-contact.md:L69 | neighbors=[Implementation Tasks]
- "specs_send_tenant_contact_task_5_add_testsendtenantcontact_manual_test_function": "Task 5: Add testSendTenantContact() manual test function" | kind=entity | source=.planning/specs/send-tenant-contact.md:L81 | neighbors=[Implementation Tasks]
- "specs_send_tenant_contact_task_6_verify_no_regressions": "Task 6: Verify no regressions" | kind=entity | source=.planning/specs/send-tenant-contact.md:L101 | neighbors=[Implementation Tasks]
- "specs_send_tenant_contact_task_7_final_diff_artifact_commit": "Task 7 (final): Diff artifact + commit" | kind=entity | source=.planning/specs/send-tenant-contact.md:L113 | neighbors=[Implementation Tasks]
- "specs_send_tenant_contact_task_8_separate_session_test_sprint": "Task 8 (separate session): Test sprint" | kind=entity | source=.planning/specs/send-tenant-contact.md:L124 | neighbors=[Implementation Tasks]
- "specs_send_tenant_contact_task_9_merge": "Task 9: Merge" | kind=entity | source=.planning/specs/send-tenant-contact.md:L133 | neighbors=[Implementation Tasks]
- "specs_spec_p1_3_token_hash_verify_context": "CONTEXT" | kind=entity | source=specs/SPEC_P1_3_TOKEN_HASH_VERIFY.md:L7 | neighbors=[Owner: AG | Reviewer: Claude Code | Bra…]
- "specs_spec_p1_3_token_hash_verify_merge_gate": "MERGE GATE" | kind=entity | source=specs/SPEC_P1_3_TOKEN_HASH_VERIFY.md:L110 | neighbors=[Owner: AG | Reviewer: Claude Code | Bra…]
- "specs_spec_p1_3_token_hash_verify_one_sprint_audit_no_code_changes_expected_close_the_professional_baseline_gap": "One-sprint audit. No code changes expected. Close the PROFESSIONAL_BASELINE gap." | kind=entity | source=specs/SPEC_P1_3_TOKEN_HASH_VERIFY.md:L2 | neighbors=[SPEC_P1_3_TOKEN_HASH_VERIFY.md]
- "specs_spec_p1_3_token_hash_verify_spec_p1_3_session_token_hash_verification_close": "SPEC: P1-3 — Session Token Hash Verification & Close" | kind=entity | source=specs/SPEC_P1_3_TOKEN_HASH_VERIFY.md:L1 | neighbors=[SPEC_P1_3_TOKEN_HASH_VERIFY.md]
- "specs_spec_p1_3_token_hash_verify_task_1_verify_sheet_state_no_plain_uuids_in_col_m": "Task 1 — Verify sheet state: no plain UUIDs in col M" | kind=entity | source=specs/SPEC_P1_3_TOKEN_HASH_VERIFY.md:L22 | neighbors=[TASKS]
- "specs_spec_p1_3_token_hash_verify_task_2_verify_hashtoken_algorithm_matches_sha_256": "Task 2 — Verify hashToken algorithm matches SHA-256" | kind=entity | source=specs/SPEC_P1_3_TOKEN_HASH_VERIFY.md:L39 | neighbors=[TASKS]
- "specs_spec_p1_3_token_hash_verify_task_3_update_professional_baseline_md": "Task 3 — Update PROFESSIONAL_BASELINE.md" | kind=entity | source=specs/SPEC_P1_3_TOKEN_HASH_VERIFY.md:L60 | neighbors=[TASKS]
- "specs_spec_p1_3_token_hash_verify_task_4_update_architecture_md_open_security_gaps": "Task 4 — Update ARCHITECTURE.md open security gaps" | kind=entity | source=specs/SPEC_P1_3_TOKEN_HASH_VERIFY.md:L73 | neighbors=[TASKS]
- "specs_spec_p1_3_token_hash_verify_task_5_tsc_diff": "Task 5 — tsc + diff" | kind=entity | source=specs/SPEC_P1_3_TOKEN_HASH_VERIFY.md:L84 | neighbors=[TASKS]
- "specs_spec_p1_3_token_hash_verify_task_6_separate_session_test_sprint": "Task 6 (separate session) — Test sprint" | kind=entity | source=specs/SPEC_P1_3_TOKEN_HASH_VERIFY.md:L100 | neighbors=[TASKS]
- "specs_spec_p1_3_token_hash_verify_task_7_merge_after_claude_code_issues_clear_to_merge": "Task 7 — Merge after Claude Code issues \"Clear to merge\"" | kind=entity | source=specs/SPEC_P1_3_TOKEN_HASH_VERIFY.md:L104 | neighbors=[TASKS]
- "specs_spec_p1_4_paga_unit_tests_closes_the_highest_ca_legal_exposure_gap_every_pay_period_without_verified_math_accrues_liability": "Closes the highest CA legal exposure gap. Every pay period without verified mat…" | kind=entity | source=specs/SPEC_P1_4_PAGA_UNIT_TESTS.md:L2 | neighbors=[SPEC_P1_4_PAGA_UNIT_TESTS.md]
- "specs_spec_p1_4_paga_unit_tests_merge_gate": "MERGE GATE" | kind=entity | source=specs/SPEC_P1_4_PAGA_UNIT_TESTS.md:L343 | neighbors=[Owner: AG | Reviewer: Claude Code | Bra…]
- "specs_spec_p1_4_paga_unit_tests_spec_p1_4_paga_unit_tests_vitest": "SPEC: P1-4 — PAGA Unit Tests (Vitest)" | kind=entity | source=specs/SPEC_P1_4_PAGA_UNIT_TESTS.md:L1 | neighbors=[SPEC_P1_4_PAGA_UNIT_TESTS.md]
- "specs_spec_p1_4_paga_unit_tests_task_1_install_vitest": "Task 1 — Install Vitest" | kind=entity | source=specs/SPEC_P1_4_PAGA_UNIT_TESTS.md:L33 | neighbors=[TASKS]
- "specs_spec_p1_4_paga_unit_tests_task_2_fix_the_second_meal_break_bug_in_compliance_ts": "Task 2 — Fix the second meal break bug in `compliance.ts`" | kind=entity | source=specs/SPEC_P1_4_PAGA_UNIT_TESTS.md:L67 | neighbors=[TASKS]
- "specs_spec_p1_4_paga_unit_tests_task_3_write_tech_pwa_src_lib_tests_compliance_test_ts": "Task 3 — Write `tech-pwa/src/lib/__tests__/compliance.test.ts`" | kind=entity | source=specs/SPEC_P1_4_PAGA_UNIT_TESTS.md:L100 | neighbors=[TASKS]
- "specs_spec_p1_4_paga_unit_tests_task_4_run_the_unit_tests": "Task 4 — Run the unit tests" | kind=entity | source=specs/SPEC_P1_4_PAGA_UNIT_TESTS.md:L267 | neighbors=[TASKS]
- "specs_spec_p1_4_paga_unit_tests_task_5_run_coverage": "Task 5 — Run coverage" | kind=entity | source=specs/SPEC_P1_4_PAGA_UNIT_TESTS.md:L284 | neighbors=[TASKS]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\PTOW\1_APT_Central_Command\.graphify\description-instructions\batch-372.json

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
