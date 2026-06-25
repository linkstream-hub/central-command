# Node Description Batch 368 of 412

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

- "specs_p2_3_meal_premium_calc_spec_root_cause": "ROOT CAUSE" | kind=entity | source=specs/P2-3-MEAL-PREMIUM-CALC-SPEC.md:L23 | neighbors=[SPEC: P2-3 — Meal Premium Calculation]
- "specs_p2_3_meal_premium_calc_spec_task_1_branch_setup_stop_if_any_check_fails": "Task 1 — Branch setup (STOP if any check fails)" | kind=entity | source=specs/P2-3-MEAL-PREMIUM-CALC-SPEC.md:L61 | neighbors=[TASK LIST]
- "specs_p2_3_meal_premium_calc_spec_task_10_n_merge": "Task 10 (N) — Merge" | kind=entity | source=specs/P2-3-MEAL-PREMIUM-CALC-SPEC.md:L356 | neighbors=[TASK LIST]
- "specs_p2_3_meal_premium_calc_spec_task_2_resolved_by_claude_code_no_ag_action_needed": "Task 2 — ✅ RESOLVED BY CLAUDE CODE (no AG action needed)" | kind=entity | source=specs/P2-3-MEAL-PREMIUM-CALC-SPEC.md:L77 | neighbors=[TASK LIST]
- "specs_p2_3_meal_premium_calc_spec_task_3_techpwa_gs_add_hourlyrate_to_firecompliancewebhook": "Task 3 — TechPWA.gs: add `hourlyRate` to `fireComplianceWebhook()`" | kind=entity | source=specs/P2-3-MEAL-PREMIUM-CALC-SPEC.md:L92 | neighbors=[TASK LIST]
- "specs_p2_3_meal_premium_calc_spec_task_4_techpwa_gs_add_hourlyrate_to_handleclockout_inline_webhook_payload": "Task 4 — TechPWA.gs: add `hourlyRate` to `handleClockOut()` inline webhook payl…" | kind=entity | source=specs/P2-3-MEAL-PREMIUM-CALC-SPEC.md:L149 | neighbors=[TASK LIST]
- "specs_p2_3_meal_premium_calc_spec_task_5_n8n_ui_write_calculate_shift_state_function_node_code": "Task 5 — n8n UI: write `Calculate Shift State` function node code" | kind=entity | source=specs/P2-3-MEAL-PREMIUM-CALC-SPEC.md:L181 | neighbors=[TASK LIST]
- "specs_p2_3_meal_premium_calc_spec_task_6_n8n_ui_fix_any_violations_if_node_condition": "Task 6 — n8n UI: fix `Any Violations?` IF node condition" | kind=entity | source=specs/P2-3-MEAL-PREMIUM-CALC-SPEC.md:L255 | neighbors=[TASK LIST]
- "specs_p2_3_meal_premium_calc_spec_task_7_export_updated_n8n_workflow": "Task 7 — Export updated n8n workflow" | kind=entity | source=specs/P2-3-MEAL-PREMIUM-CALC-SPEC.md:L274 | neighbors=[TASK LIST]
- "specs_p2_3_meal_premium_calc_spec_task_8_n_2_tsc_push_diff_artifact_report_to_claude_code": "Task 8 (N-2) — tsc, push, diff artifact, report to Claude Code" | kind=entity | source=specs/P2-3-MEAL-PREMIUM-CALC-SPEC.md:L285 | neighbors=[TASK LIST]
- "specs_p2_3_meal_premium_calc_spec_task_9_n_1_test_sprint_separate_session": "Task 9 (N-1) — Test sprint (SEPARATE SESSION)" | kind=entity | source=specs/P2-3-MEAL-PREMIUM-CALC-SPEC.md:L303 | neighbors=[TASK LIST]
- "specs_phase17_job_state_machine_spec": "PHASE17_JOB_STATE_MACHINE_SPEC.md" | kind=entity | source=specs/PHASE17_JOB_STATE_MACHINE_SPEC.md:L1 | neighbors=[Phase 17: Job State Machine Seam]
- "specs_phase17_job_state_machine_spec_objective": "Objective" | kind=entity | source=specs/PHASE17_JOB_STATE_MACHINE_SPEC.md:L10 | neighbors=[Phase 17: Job State Machine Seam]
- "specs_phase17_job_state_machine_spec_out_of_scope": "Out of Scope" | kind=entity | source=specs/PHASE17_JOB_STATE_MACHINE_SPEC.md:L240 | neighbors=[Phase 17: Job State Machine Seam]
- "specs_phase17_job_state_machine_spec_reference": "Reference" | kind=entity | source=specs/PHASE17_JOB_STATE_MACHINE_SPEC.md:L16 | neighbors=[Phase 17: Job State Machine Seam]
- "specs_phase17_job_state_machine_spec_task_1_branch_gate": "Task 1 — Branch gate" | kind=entity | source=specs/PHASE17_JOB_STATE_MACHINE_SPEC.md:L32 | neighbors=[Task List]
- "specs_phase17_job_state_machine_spec_task_10_typescript_diff_push_stop": "Task 10 — TypeScript + diff + push (STOP)" | kind=entity | source=specs/PHASE17_JOB_STATE_MACHINE_SPEC.md:L190 | neighbors=[Task List]
- "specs_phase17_job_state_machine_spec_task_11_test_sprint_stop": "Task 11 — Test sprint (STOP)" | kind=entity | source=specs/PHASE17_JOB_STATE_MACHINE_SPEC.md:L208 | neighbors=[Task List]
- "specs_phase17_job_state_machine_spec_task_12_merge": "Task 12 — Merge" | kind=entity | source=specs/PHASE17_JOB_STATE_MACHINE_SPEC.md:L231 | neighbors=[Task List]
- "specs_phase17_job_state_machine_spec_task_2_read_open_fsm_reference": "Task 2 — Read open-fsm reference" | kind=entity | source=specs/PHASE17_JOB_STATE_MACHINE_SPEC.md:L47 | neighbors=[Task List]
- "specs_phase17_job_state_machine_spec_task_3_create_transitionerror_and_jobtransitionevent_types": "Task 3 — Create `TransitionError` and `JobTransitionEvent` types" | kind=entity | source=specs/PHASE17_JOB_STATE_MACHINE_SPEC.md:L53 | neighbors=[Task List]
- "specs_phase17_job_state_machine_spec_task_4_add_dal_updatejobstatus_and_delete_dead_updatejob": "Task 4 — Add `DAL.updateJobStatus()` and delete dead `updateJob()`" | kind=entity | source=specs/PHASE17_JOB_STATE_MACHINE_SPEC.md:L77 | neighbors=[Task List]
- "specs_phase17_job_state_machine_spec_task_5_create_jobstateservice": "Task 5 — Create `JobStateService`" | kind=entity | source=specs/PHASE17_JOB_STATE_MACHINE_SPEC.md:L104 | neighbors=[Task List]
- "specs_phase17_job_state_machine_spec_task_6_update_patch_api_jobs_jobid": "Task 6 — Update `PATCH /api/jobs/[jobId]`" | kind=entity | source=specs/PHASE17_JOB_STATE_MACHINE_SPEC.md:L129 | neighbors=[Task List]
- "specs_phase17_job_state_machine_spec_task_7_update_post_api_field_clock_in": "Task 7 — Update `POST /api/field/clock-in`" | kind=entity | source=specs/PHASE17_JOB_STATE_MACHINE_SPEC.md:L140 | neighbors=[Task List]
- "specs_phase17_job_state_machine_spec_task_8_update_post_api_field_job_complete": "Task 8 — Update `POST /api/field/job/complete`" | kind=entity | source=specs/PHASE17_JOB_STATE_MACHINE_SPEC.md:L155 | neighbors=[Task List]
- "specs_phase17_job_state_machine_spec_task_9_expand_job_transitions_test_ts": "Task 9 — Expand `job-transitions.test.ts`" | kind=entity | source=specs/PHASE17_JOB_STATE_MACHINE_SPEC.md:L168 | neighbors=[Task List]
- "specs_phase18_event_publishing_seam_spec": "PHASE18_EVENT_PUBLISHING_SEAM_SPEC.md" | kind=entity | source=specs/PHASE18_EVENT_PUBLISHING_SEAM_SPEC.md:L1 | neighbors=[Phase 18: Event Publishing Seam]
- "specs_phase18_event_publishing_seam_spec_objective": "Objective" | kind=entity | source=specs/PHASE18_EVENT_PUBLISHING_SEAM_SPEC.md:L23 | neighbors=[Phase 18: Event Publishing Seam]
- "specs_phase18_event_publishing_seam_spec_out_of_scope": "Out of Scope" | kind=entity | source=specs/PHASE18_EVENT_PUBLISHING_SEAM_SPEC.md:L313 | neighbors=[Phase 18: Event Publishing Seam]
- "specs_phase18_event_publishing_seam_spec_prerequisites_verify_before_starting": "Prerequisites — Verify Before Starting" | kind=entity | source=specs/PHASE18_EVENT_PUBLISHING_SEAM_SPEC.md:L10 | neighbors=[Phase 18: Event Publishing Seam]
- "specs_phase18_event_publishing_seam_spec_reference": "Reference" | kind=entity | source=specs/PHASE18_EVENT_PUBLISHING_SEAM_SPEC.md:L29 | neighbors=[Phase 18: Event Publishing Seam]
- "specs_phase18_event_publishing_seam_spec_task_1_branch_gate": "Task 1 — Branch gate" | kind=entity | source=specs/PHASE18_EVENT_PUBLISHING_SEAM_SPEC.md:L44 | neighbors=[Task List]
- "specs_phase18_event_publishing_seam_spec_task_10_wire_eventbus_into_jobstateservice_callers": "Task 10 — Wire EventBus into JobStateService callers" | kind=entity | source=specs/PHASE18_EVENT_PUBLISHING_SEAM_SPEC.md:L230 | neighbors=[Task List]
- "specs_phase18_event_publishing_seam_spec_task_11_typescript_diff_push_stop": "Task 11 — TypeScript + diff + push (STOP)" | kind=entity | source=specs/PHASE18_EVENT_PUBLISHING_SEAM_SPEC.md:L246 | neighbors=[Task List]
- "specs_phase18_event_publishing_seam_spec_task_12_test_sprint_stop": "Task 12 — Test sprint (STOP)" | kind=entity | source=specs/PHASE18_EVENT_PUBLISHING_SEAM_SPEC.md:L264 | neighbors=[Task List]
- "specs_phase18_event_publishing_seam_spec_task_13_cleanup_remove_dead_env_vars_lib_email_ts_deprecation": "Task 13 — Cleanup: remove dead env vars + `lib/email.ts` deprecation" | kind=entity | source=specs/PHASE18_EVENT_PUBLISHING_SEAM_SPEC.md:L293 | neighbors=[Task List]
- "specs_phase18_event_publishing_seam_spec_task_14_merge": "Task 14 — Merge" | kind=entity | source=specs/PHASE18_EVENT_PUBLISHING_SEAM_SPEC.md:L304 | neighbors=[Task List]
- "specs_phase18_event_publishing_seam_spec_task_2_drizzle_migration_workflow_events_table": "Task 2 — Drizzle migration: `workflow_events` table" | kind=entity | source=specs/PHASE18_EVENT_PUBLISHING_SEAM_SPEC.md:L64 | neighbors=[Task List]
- "specs_phase18_event_publishing_seam_spec_task_3_create_workorderevent_types": "Task 3 — Create `WorkOrderEvent` types" | kind=entity | source=specs/PHASE18_EVENT_PUBLISHING_SEAM_SPEC.md:L92 | neighbors=[Task List]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\PTOW\1_APT_Central_Command\.graphify\description-instructions\batch-367.json

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
