# Node Description Batch 370 of 412

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

- "specs_phase3_p3_3_spec_definition_of_done": "DEFINITION OF DONE" | kind=entity | source=specs/PHASE3_P3_3_SPEC.md:L470 | neighbors=[Written: 2026-05-26 (Session 101)]
- "specs_phase3_p3_3_spec_depends_on_p3_2_merged_pr_828": "Depends on: P3-2 merged (✅ PR #828)" | kind=entity | source=specs/PHASE3_P3_3_SPEC.md:L3 | neighbors=[PHASE3_P3_3_SPEC.md]
- "specs_phase3_p3_3_spec_files_to_create_modify": "FILES TO CREATE/MODIFY" | kind=entity | source=specs/PHASE3_P3_3_SPEC.md:L47 | neighbors=[Written: 2026-05-26 (Session 101)]
- "specs_phase3_p3_3_spec_goal": "GOAL" | kind=entity | source=specs/PHASE3_P3_3_SPEC.md:L8 | neighbors=[Written: 2026-05-26 (Session 101)]
- "specs_phase3_p3_3_spec_p3_3_dispatch_queue_master_directory_migration_spec": "P3-3: DISPATCH QUEUE + MASTER DIRECTORY MIGRATION SPEC" | kind=entity | source=specs/PHASE3_P3_3_SPEC.md:L1 | neighbors=[PHASE3_P3_3_SPEC.md]
- "specs_phase3_p3_3_spec_pre_flight_ag_completes_before_creating_the_branch": "PRE-FLIGHT (AG completes before creating the branch)" | kind=entity | source=specs/PHASE3_P3_3_SPEC.md:L17 | neighbors=[Written: 2026-05-26 (Session 101)]
- "specs_phase3_p3_3_spec_shared_utility_normalizeaddresskey": "SHARED UTILITY — normalizeAddressKey" | kind=entity | source=specs/PHASE3_P3_3_SPEC.md:L63 | neighbors=[Written: 2026-05-26 (Session 101)]
- "specs_phase3_p3_3_spec_task_1_branch_verify": "Task 1 — Branch verify" | kind=entity | source=specs/PHASE3_P3_3_SPEC.md:L92 | neighbors=[NUMBERED TASK LIST]
- "specs_phase3_p3_3_spec_task_10_run_migrate_new_contacts_ts": "Task 10 — Run migrate-new-contacts.ts" | kind=entity | source=specs/PHASE3_P3_3_SPEC.md:L373 | neighbors=[NUMBERED TASK LIST]
- "specs_phase3_p3_3_spec_task_11_spot_check_queries_paste_all_four_results": "Task 11 — Spot-check queries (paste all four results)" | kind=entity | source=specs/PHASE3_P3_3_SPEC.md:L386 | neighbors=[NUMBERED TASK LIST]
- "specs_phase3_p3_3_spec_task_12_tsc_zero_errors_terminal_n_2": "Task 12 — tsc zero errors (terminal N-2)" | kind=entity | source=specs/PHASE3_P3_3_SPEC.md:L419 | neighbors=[NUMBERED TASK LIST]
- "specs_phase3_p3_3_spec_task_13_test_sprint_terminal_n_1_separate_session": "Task 13 — Test sprint (terminal N-1, separate session)" | kind=entity | source=specs/PHASE3_P3_3_SPEC.md:L441 | neighbors=[NUMBERED TASK LIST]
- "specs_phase3_p3_3_spec_task_14_merge_terminal_n": "Task 14 — Merge (terminal N)" | kind=entity | source=specs/PHASE3_P3_3_SPEC.md:L464 | neighbors=[NUMBERED TASK LIST]
- "specs_phase3_p3_3_spec_task_2_protect_the_data_directory": "Task 2 — Protect the data directory" | kind=entity | source=specs/PHASE3_P3_3_SPEC.md:L113 | neighbors=[NUMBERED TASK LIST]
- "specs_phase3_p3_3_spec_task_3_install_csv_parse": "Task 3 — Install csv-parse" | kind=entity | source=specs/PHASE3_P3_3_SPEC.md:L127 | neighbors=[NUMBERED TASK LIST]
- "specs_phase3_p3_3_spec_task_4_confirm_csv_files_exist_brandon_must_export_first": "Task 4 — Confirm CSV files exist (Brandon must export first)" | kind=entity | source=specs/PHASE3_P3_3_SPEC.md:L137 | neighbors=[NUMBERED TASK LIST]
- "specs_phase3_p3_3_spec_task_5_write_tech_pwa_scripts_migrate_master_directory_ts": "Task 5 — Write `tech-pwa/scripts/migrate-master-directory.ts`" | kind=entity | source=specs/PHASE3_P3_3_SPEC.md:L149 | neighbors=[NUMBERED TASK LIST]
- "specs_phase3_p3_3_spec_task_6_run_migrate_master_directory_ts": "Task 6 — Run migrate-master-directory.ts" | kind=entity | source=specs/PHASE3_P3_3_SPEC.md:L200 | neighbors=[NUMBERED TASK LIST]
- "specs_phase3_p3_3_spec_task_7_write_tech_pwa_scripts_migrate_dispatch_queue_ts": "Task 7 — Write `tech-pwa/scripts/migrate-dispatch-queue.ts`" | kind=entity | source=specs/PHASE3_P3_3_SPEC.md:L217 | neighbors=[NUMBERED TASK LIST]
- "specs_phase3_p3_3_spec_task_8_run_migrate_dispatch_queue_ts": "Task 8 — Run migrate-dispatch-queue.ts" | kind=entity | source=specs/PHASE3_P3_3_SPEC.md:L311 | neighbors=[NUMBERED TASK LIST]
- "specs_phase3_p3_3_spec_task_9_write_tech_pwa_scripts_migrate_new_contacts_ts": "Task 9 — Write `tech-pwa/scripts/migrate-new-contacts.ts`" | kind=entity | source=specs/PHASE3_P3_3_SPEC.md:L331 | neighbors=[NUMBERED TASK LIST]
- "specs_phase3_p3_4_spec_branch_feat_p3_4_field_api_nextjs": "Branch: feat/p3-4-field-api-nextjs" | kind=entity | source=specs/PHASE3_P3_4_SPEC.md:L2 | neighbors=[PHASE3_P3_4_SPEC.md]
- "specs_phase3_p3_4_spec_critical_context_read_before_writing_anything": "CRITICAL CONTEXT — READ BEFORE WRITING ANYTHING" | kind=entity | source=specs/PHASE3_P3_4_SPEC.md:L16 | neighbors=[Written: 2026-05-26 (Session 101)]
- "specs_phase3_p3_4_spec_definition_of_done": "DEFINITION OF DONE" | kind=entity | source=specs/PHASE3_P3_4_SPEC.md:L690 | neighbors=[Written: 2026-05-26 (Session 101)]
- "specs_phase3_p3_4_spec_depends_on_p3_3_merged_pr_837": "Depends on: P3-3 merged (✅ PR #837)" | kind=entity | source=specs/PHASE3_P3_4_SPEC.md:L3 | neighbors=[PHASE3_P3_4_SPEC.md]
- "specs_phase3_p3_4_spec_env_var_required": "ENV VAR REQUIRED" | kind=entity | source=specs/PHASE3_P3_4_SPEC.md:L39 | neighbors=[Written: 2026-05-26 (Session 101)]
- "specs_phase3_p3_4_spec_fieldauth_helper_required_shape": "FIELDAUTH HELPER — REQUIRED SHAPE" | kind=entity | source=specs/PHASE3_P3_4_SPEC.md:L84 | neighbors=[Written: 2026-05-26 (Session 101)]
- "specs_phase3_p3_4_spec_files_to_create_modify": "FILES TO CREATE / MODIFY" | kind=entity | source=specs/PHASE3_P3_4_SPEC.md:L47 | neighbors=[Written: 2026-05-26 (Session 101)]
- "specs_phase3_p3_4_spec_flags_to_claude_code_stop_and_report": "FLAGS TO CLAUDE CODE — STOP AND REPORT" | kind=entity | source=specs/PHASE3_P3_4_SPEC.md:L679 | neighbors=[Written: 2026-05-26 (Session 101)]
- "specs_phase3_p3_4_spec_frontend_update_rules": "Frontend update rules:" | kind=entity | source=specs/PHASE3_P3_4_SPEC.md:L400 | neighbors=[FRONTEND UPDATE PROTOCOL]
- "specs_phase3_p3_4_spec_get_api_field_jobs": "GET /api/field/jobs" | kind=entity | source=specs/PHASE3_P3_4_SPEC.md:L171 | neighbors=[ROUTE SPECIFICATIONS]
- "specs_phase3_p3_4_spec_goal": "GOAL" | kind=entity | source=specs/PHASE3_P3_4_SPEC.md:L8 | neighbors=[Written: 2026-05-26 (Session 101)]
- "specs_phase3_p3_4_spec_p3_4_techpwa_gs_next_js_api_routes_spec": "P3-4: TECHPWA.GS → NEXT.JS API ROUTES SPEC" | kind=entity | source=specs/PHASE3_P3_4_SPEC.md:L1 | neighbors=[PHASE3_P3_4_SPEC.md]
- "specs_phase3_p3_4_spec_post_api_field_attestation_sign": "POST /api/field/attestation/sign" | kind=entity | source=specs/PHASE3_P3_4_SPEC.md:L341 | neighbors=[ROUTE SPECIFICATIONS]
- "specs_phase3_p3_4_spec_post_api_field_auth_login": "POST /api/field/auth/login" | kind=entity | source=specs/PHASE3_P3_4_SPEC.md:L139 | neighbors=[ROUTE SPECIFICATIONS]
- "specs_phase3_p3_4_spec_post_api_field_break_end": "POST /api/field/break/end" | kind=entity | source=specs/PHASE3_P3_4_SPEC.md:L304 | neighbors=[ROUTE SPECIFICATIONS]
- "specs_phase3_p3_4_spec_post_api_field_break_start": "POST /api/field/break/start" | kind=entity | source=specs/PHASE3_P3_4_SPEC.md:L286 | neighbors=[ROUTE SPECIFICATIONS]
- "specs_phase3_p3_4_spec_post_api_field_clock_in": "POST /api/field/clock-in" | kind=entity | source=specs/PHASE3_P3_4_SPEC.md:L247 | neighbors=[ROUTE SPECIFICATIONS]
- "specs_phase3_p3_4_spec_post_api_field_clock_out": "POST /api/field/clock-out" | kind=entity | source=specs/PHASE3_P3_4_SPEC.md:L266 | neighbors=[ROUTE SPECIFICATIONS]
- "specs_phase3_p3_4_spec_post_api_field_job_complete": "POST /api/field/job/complete" | kind=entity | source=specs/PHASE3_P3_4_SPEC.md:L323 | neighbors=[ROUTE SPECIFICATIONS]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\PTOW\1_APT_Central_Command\.graphify\description-instructions\batch-369.json

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
