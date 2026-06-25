# Node Description Batch 168 of 412

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

- "archive_spec_p2b_job_transition_tests_merge_gate": "MERGE GATE" | kind=entity | source=specs/archive/SPEC_P2B_JOB_TRANSITION_TESTS.md:L344 | neighbors=[Owner: AG | Reviewer: Claude Code | Bra…]
- "archive_spec_p2b_job_transition_tests_spec_p2b_job_transition_unit_tests": "SPEC: P2B — Job Transition Unit Tests" | kind=entity | source=specs/archive/SPEC_P2B_JOB_TRANSITION_TESTS.md:L1 | neighbors=[SPEC_P2B_JOB_TRANSITION_TESTS.md]
- "archive_spec_p2b_job_transition_tests_task_1_create_tech_pwa_src_lib_job_transitions_ts": "Task 1 — Create `tech-pwa/src/lib/job-transitions.ts`" | kind=entity | source=specs/archive/SPEC_P2B_JOB_TRANSITION_TESTS.md:L23 | neighbors=[TASKS]
- "archive_spec_p2b_job_transition_tests_task_2_wire_job_transitions_ts_into_route_ts": "Task 2 — Wire `job-transitions.ts` into `route.ts`" | kind=entity | source=specs/archive/SPEC_P2B_JOB_TRANSITION_TESTS.md:L78 | neighbors=[TASKS]
- "archive_spec_p2b_job_transition_tests_task_3_write_tech_pwa_src_lib_tests_job_transitions_test_ts": "Task 3 — Write `tech-pwa/src/lib/__tests__/job-transitions.test.ts`" | kind=entity | source=specs/archive/SPEC_P2B_JOB_TRANSITION_TESTS.md:L124 | neighbors=[TASKS]
- "archive_spec_p2b_job_transition_tests_task_4_run_the_unit_tests": "Task 4 — Run the unit tests" | kind=entity | source=specs/archive/SPEC_P2B_JOB_TRANSITION_TESTS.md:L251 | neighbors=[TASKS]
- "archive_spec_p2b_job_transition_tests_task_5_run_coverage": "Task 5 — Run coverage" | kind=entity | source=specs/archive/SPEC_P2B_JOB_TRANSITION_TESTS.md:L267 | neighbors=[TASKS]
- "archive_spec_p2b_job_transition_tests_task_6_update_professional_baseline_md": "Task 6 — Update `PROFESSIONAL_BASELINE.md`" | kind=entity | source=specs/archive/SPEC_P2B_JOB_TRANSITION_TESTS.md:L291 | neighbors=[TASKS]
- "archive_spec_p2b_job_transition_tests_task_7_tsc_diff": "Task 7 — tsc + diff" | kind=entity | source=specs/archive/SPEC_P2B_JOB_TRANSITION_TESTS.md:L305 | neighbors=[TASKS]
- "archive_spec_p2b_job_transition_tests_task_8_separate_session_test_sprint": "Task 8 (separate session) — Test sprint" | kind=entity | source=specs/archive/SPEC_P2B_JOB_TRANSITION_TESTS.md:L326 | neighbors=[TASKS]
- "archive_spec_p2b_job_transition_tests_task_9_merge_after_clear_to_merge": "Task 9 — Merge after \"Clear to merge\"" | kind=entity | source=specs/archive/SPEC_P2B_JOB_TRANSITION_TESTS.md:L338 | neighbors=[TASKS]
- "archive_spec_p3_dashboardapi_migration_auth_pattern_apply_to_every_new_route": "AUTH PATTERN — apply to every new route" | kind=entity | source=specs/archive/SPEC_P3_DASHBOARDAPI_MIGRATION.md:L44 | neighbors=[Owner: AG | Reviewer: Claude Code | Bra…]
- "archive_spec_p3_dashboardapi_migration_goal": "GOAL" | kind=entity | source=specs/archive/SPEC_P3_DASHBOARDAPI_MIGRATION.md:L7 | neighbors=[Owner: AG | Reviewer: Claude Code | Bra…]
- "archive_spec_p3_dashboardapi_migration_merge_gate_claude_code_checklist": "MERGE GATE (Claude Code checklist)" | kind=entity | source=specs/archive/SPEC_P3_DASHBOARDAPI_MIGRATION.md:L980 | neighbors=[Owner: AG | Reviewer: Claude Code | Bra…]
- "archive_spec_p3_dashboardapi_migration_migrates_read_heavy_gas_actions_to_next_js_routes_backed_by_neon": "Migrates read-heavy GAS actions to Next.js routes backed by Neon." | kind=entity | source=specs/archive/SPEC_P3_DASHBOARDAPI_MIGRATION.md:L2 | neighbors=[SPEC_P3_DASHBOARDAPI_MIGRATION.md]
- "archive_spec_p3_dashboardapi_migration_shared_helper_extract_before_writing_new_routes": "SHARED HELPER — extract before writing new routes" | kind=entity | source=specs/archive/SPEC_P3_DASHBOARDAPI_MIGRATION.md:L57 | neighbors=[Owner: AG | Reviewer: Claude Code | Bra…]
- "archive_spec_p3_dashboardapi_migration_spec_phase_3_dashboardapi_migration_to_next_js_neon": "SPEC: Phase 3 — DashboardAPI Migration to Next.js + Neon" | kind=entity | source=specs/archive/SPEC_P3_DASHBOARDAPI_MIGRATION.md:L1 | neighbors=[SPEC_P3_DASHBOARDAPI_MIGRATION.md]
- "archive_spec_p3_dashboardapi_migration_task_1_extract_mapneonjobtojob_into_src_lib_job_mapper_ts": "Task 1 — Extract `mapNeonJobToJob` into `src/lib/job-mapper.ts`" | kind=entity | source=specs/archive/SPEC_P3_DASHBOARDAPI_MIGRATION.md:L108 | neighbors=[TASKS]
- "archive_spec_p3_dashboardapi_migration_task_10_wire_field_routes_in_migrated_actions": "Task 10 — Wire field routes in MIGRATED_ACTIONS" | kind=entity | source=specs/archive/SPEC_P3_DASHBOARDAPI_MIGRATION.md:L568 | neighbors=[TASKS]
- "archive_spec_p3_dashboardapi_migration_task_11_create_get_api_jobs_history": "Task 11 — Create `GET /api/jobs/history`" | kind=entity | source=specs/archive/SPEC_P3_DASHBOARDAPI_MIGRATION.md:L585 | neighbors=[TASKS]
- "archive_spec_p3_dashboardapi_migration_task_12_add_getjobhistory_special_case_in_dashboard_api_ts": "Task 12 — Add `getJobHistory` special case in dashboard-api.ts" | kind=entity | source=specs/archive/SPEC_P3_DASHBOARDAPI_MIGRATION.md:L642 | neighbors=[TASKS]
- "archive_spec_p3_dashboardapi_migration_task_13_create_get_api_notifications": "Task 13 — Create `GET /api/notifications`" | kind=entity | source=specs/archive/SPEC_P3_DASHBOARDAPI_MIGRATION.md:L658 | neighbors=[TASKS]
- "archive_spec_p3_dashboardapi_migration_task_14_wire_getnotifications_in_migrated_actions": "Task 14 — Wire `getNotifications` in MIGRATED_ACTIONS" | kind=entity | source=specs/archive/SPEC_P3_DASHBOARDAPI_MIGRATION.md:L737 | neighbors=[TASKS]
- "archive_spec_p3_dashboardapi_migration_task_15_add_api_key_auth_to_get_api_jobs": "Task 15 — Add API key auth to `GET /api/jobs`" | kind=entity | source=specs/archive/SPEC_P3_DASHBOARDAPI_MIGRATION.md:L754 | neighbors=[TASKS]
- "archive_spec_p3_dashboardapi_migration_task_16_add_api_key_auth_to_get_api_techs": "Task 16 — Add API key auth to `GET /api/techs`" | kind=entity | source=specs/archive/SPEC_P3_DASHBOARDAPI_MIGRATION.md:L772 | neighbors=[TASKS]
- "archive_spec_p3_dashboardapi_migration_task_17_unblock_e2e_fixme_tests": "Task 17 — Unblock E2E fixme tests" | kind=entity | source=specs/archive/SPEC_P3_DASHBOARDAPI_MIGRATION.md:L790 | neighbors=[TASKS]
- "archive_spec_p3_dashboardapi_migration_task_18_update_architecture_md": "Task 18 — Update ARCHITECTURE.md" | kind=entity | source=specs/archive/SPEC_P3_DASHBOARDAPI_MIGRATION.md:L820 | neighbors=[TASKS]
- "archive_spec_p3_dashboardapi_migration_task_19_cf_worker_config_update_brandon_deploys": "Task 19 — CF Worker config update (Brandon deploys)" | kind=entity | source=specs/archive/SPEC_P3_DASHBOARDAPI_MIGRATION.md:L857 | neighbors=[TASKS]
- "archive_spec_p3_dashboardapi_migration_task_2_wire_getdispatchdata_to_existing_api_jobs_get": "Task 2 — Wire `getDispatchData` to existing `/api/jobs` GET" | kind=entity | source=specs/archive/SPEC_P3_DASHBOARDAPI_MIGRATION.md:L128 | neighbors=[TASKS]
- "archive_spec_p3_dashboardapi_migration_task_20_verify_tsc_zero_errors_contradiction_check": "Task 20 — Verify tsc zero errors + contradiction check" | kind=entity | source=specs/archive/SPEC_P3_DASHBOARDAPI_MIGRATION.md:L878 | neighbors=[TASKS]
- "archive_spec_p3_dashboardapi_migration_task_21_generate_diff": "Task 21 — Generate diff" | kind=entity | source=specs/archive/SPEC_P3_DASHBOARDAPI_MIGRATION.md:L891 | neighbors=[TASKS]
- "archive_spec_p3_dashboardapi_migration_task_22_separate_session_test_sprint": "Task 22 (separate session) — Test sprint" | kind=entity | source=specs/archive/SPEC_P3_DASHBOARDAPI_MIGRATION.md:L923 | neighbors=[TASKS]
- "archive_spec_p3_dashboardapi_migration_task_23_merge_after_clear_to_merge": "Task 23 — Merge after \"Clear to merge\"" | kind=entity | source=specs/archive/SPEC_P3_DASHBOARDAPI_MIGRATION.md:L974 | neighbors=[TASKS]
- "archive_spec_p3_dashboardapi_migration_task_3_add_get_api_jobs_jobid_and_wire_getjobbyid": "Task 3 — Add `GET /api/jobs/[jobId]` and wire `getJobById`" | kind=entity | source=specs/archive/SPEC_P3_DASHBOARDAPI_MIGRATION.md:L152 | neighbors=[TASKS]
- "archive_spec_p3_dashboardapi_migration_task_4_create_get_api_schedule_today": "Task 4 — Create `GET /api/schedule/today`" | kind=entity | source=specs/archive/SPEC_P3_DASHBOARDAPI_MIGRATION.md:L197 | neighbors=[TASKS]
- "archive_spec_p3_dashboardapi_migration_task_5_add_gettodayschedule_to_migrated_actions": "Task 5 — Add `getTodaySchedule` to MIGRATED_ACTIONS" | kind=entity | source=specs/archive/SPEC_P3_DASHBOARDAPI_MIGRATION.md:L257 | neighbors=[TASKS]
- "archive_spec_p3_dashboardapi_migration_task_6_create_get_api_schedule_week": "Task 6 — Create `GET /api/schedule/week`" | kind=entity | source=specs/archive/SPEC_P3_DASHBOARDAPI_MIGRATION.md:L272 | neighbors=[TASKS]
- "archive_spec_p3_dashboardapi_migration_task_7_add_getweekschedule_special_case_to_dashboard_api_ts": "Task 7 — Add `getWeekSchedule` special case to dashboard-api.ts" | kind=entity | source=specs/archive/SPEC_P3_DASHBOARDAPI_MIGRATION.md:L381 | neighbors=[TASKS]
- "archive_spec_p3_dashboardapi_migration_task_8_create_get_api_field_live": "Task 8 — Create `GET /api/field/live`" | kind=entity | source=specs/archive/SPEC_P3_DASHBOARDAPI_MIGRATION.md:L400 | neighbors=[TASKS]
- "archive_spec_p3_dashboardapi_migration_task_9_create_get_api_field_compliance": "Task 9 — Create `GET /api/field/compliance`" | kind=entity | source=specs/archive/SPEC_P3_DASHBOARDAPI_MIGRATION.md:L503 | neighbors=[TASKS]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\PTOW\1_APT_Central_Command\.graphify\description-instructions\batch-167.json

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
