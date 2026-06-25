# Node Description Batch 369 of 412

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

- "specs_phase18_event_publishing_seam_spec_task_4_create_eventbus": "Task 4 — Create `EventBus`" | kind=entity | source=specs/PHASE18_EVENT_PUBLISHING_SEAM_SPEC.md:L111 | neighbors=[Task List]
- "specs_phase18_event_publishing_seam_spec_task_5_wire_n8n_unified_webhook_workflow": "Task 5 — Wire n8n unified webhook workflow" | kind=entity | source=specs/PHASE18_EVENT_PUBLISHING_SEAM_SPEC.md:L130 | neighbors=[Task List]
- "specs_phase18_event_publishing_seam_spec_task_6_wire_n8n_outbox_poller_workflow": "Task 6 — Wire n8n outbox poller workflow" | kind=entity | source=specs/PHASE18_EVENT_PUBLISHING_SEAM_SPEC.md:L151 | neighbors=[Task List]
- "specs_phase18_event_publishing_seam_spec_task_7_replace_fetch_in_attestation_sign": "Task 7 — Replace `fetch()` in attestation/sign" | kind=entity | source=specs/PHASE18_EVENT_PUBLISHING_SEAM_SPEC.md:L170 | neighbors=[Task List]
- "specs_phase18_event_publishing_seam_spec_task_8_replace_fetch_in_lock_and_send": "Task 8 — Replace `fetch()` in lock-and-send" | kind=entity | source=specs/PHASE18_EVENT_PUBLISHING_SEAM_SPEC.md:L189 | neighbors=[Task List]
- "specs_phase18_event_publishing_seam_spec_task_9_replace_email_calls_in_patch_jobs_id": "Task 9 — Replace email calls in PATCH /jobs/:id" | kind=entity | source=specs/PHASE18_EVENT_PUBLISHING_SEAM_SPEC.md:L208 | neighbors=[Task List]
- "specs_phase3_p3_1_spec_branch_feat_p3_1_schema_foundation": "Branch: feat/p3-1-schema-foundation" | kind=entity | source=specs/PHASE3_P3_1_SPEC.md:L2 | neighbors=[PHASE3_P3_1_SPEC.md]
- "specs_phase3_p3_1_spec_branch_setup": "BRANCH SETUP" | kind=entity | source=specs/PHASE3_P3_1_SPEC.md:L19 | neighbors=[Last updated: 2026-05-21 (Session 97)]
- "specs_phase3_p3_1_spec_context": "CONTEXT" | kind=entity | source=specs/PHASE3_P3_1_SPEC.md:L9 | neighbors=[Last updated: 2026-05-21 (Session 97)]
- "specs_phase3_p3_1_spec_contradiction_detector_run_before_first_commit": "CONTRADICTION DETECTOR — RUN BEFORE FIRST COMMIT" | kind=entity | source=specs/PHASE3_P3_1_SPEC.md:L413 | neighbors=[Last updated: 2026-05-21 (Session 97)]
- "specs_phase3_p3_1_spec_deliverable_all_28_tables_defined_in_drizzle_and_applied_to_dev_neon_branch": "Deliverable: All 28 tables defined in Drizzle and applied to dev Neon branch." | kind=entity | source=specs/PHASE3_P3_1_SPEC.md:L3 | neighbors=[PHASE3_P3_1_SPEC.md]
- "specs_phase3_p3_1_spec_flags_to_claude_code_before_writing_code": "FLAGS TO CLAUDE CODE BEFORE WRITING CODE" | kind=entity | source=specs/PHASE3_P3_1_SPEC.md:L427 | neighbors=[Last updated: 2026-05-21 (Session 97)]
- "specs_phase3_p3_1_spec_no_data_migration_no_route_changes_schema_only": "No data migration. No route changes. Schema only." | kind=entity | source=specs/PHASE3_P3_1_SPEC.md:L4 | neighbors=[PHASE3_P3_1_SPEC.md]
- "specs_phase3_p3_1_spec_phase_3_sprint_1_schema_foundation": "PHASE 3 SPRINT 1 — SCHEMA FOUNDATION" | kind=entity | source=specs/PHASE3_P3_1_SPEC.md:L1 | neighbors=[PHASE3_P3_1_SPEC.md]
- "specs_phase3_p3_1_spec_scope_only_these_files": "SCOPE — ONLY THESE FILES" | kind=entity | source=specs/PHASE3_P3_1_SPEC.md:L29 | neighbors=[Last updated: 2026-05-21 (Session 97)]
- "specs_phase3_p3_1_spec_task_1_read_the_current_schema_and_migration_files": "Task 1 — Read the current schema and migration files" | kind=entity | source=specs/PHASE3_P3_1_SPEC.md:L51 | neighbors=[TASK LIST]
- "specs_phase3_p3_1_spec_task_10_merge": "Task 10 — Merge" | kind=entity | source=specs/PHASE3_P3_1_SPEC.md:L407 | neighbors=[TASK LIST]
- "specs_phase3_p3_1_spec_task_2_5_update_typescript_files_techs_employees": "Task 2.5 — Update TypeScript files (techs → employees)" | kind=entity | source=specs/PHASE3_P3_1_SPEC.md:L158 | neighbors=[TASK LIST]
- "specs_phase3_p3_1_spec_task_2_rewrite_tech_pwa_src_lib_schema_ts": "Task 2 — Rewrite `tech-pwa/src/lib/schema.ts`" | kind=entity | source=specs/PHASE3_P3_1_SPEC.md:L59 | neighbors=[TASK LIST]
- "specs_phase3_p3_1_spec_task_3_generate_migration": "Task 3 — Generate migration" | kind=entity | source=specs/PHASE3_P3_1_SPEC.md:L205 | neighbors=[TASK LIST]
- "specs_phase3_p3_1_spec_task_4_review_generated_migration_files": "Task 4 — Review generated migration files" | kind=entity | source=specs/PHASE3_P3_1_SPEC.md:L219 | neighbors=[TASK LIST]
- "specs_phase3_p3_1_spec_task_5_apply_migration_to_dev_neon_branch": "Task 5 — Apply migration to dev Neon branch" | kind=entity | source=specs/PHASE3_P3_1_SPEC.md:L244 | neighbors=[TASK LIST]
- "specs_phase3_p3_1_spec_task_6_seed_orgs_table": "Task 6 — Seed `orgs` table" | kind=entity | source=specs/PHASE3_P3_1_SPEC.md:L258 | neighbors=[TASK LIST]
- "specs_phase3_p3_1_spec_task_7_verify_table_count_in_neon": "Task 7 — Verify table count in Neon" | kind=entity | source=specs/PHASE3_P3_1_SPEC.md:L302 | neighbors=[TASK LIST]
- "specs_phase3_p3_1_spec_task_8_typescript_check_push_diff": "Task 8 — TypeScript check + push diff" | kind=entity | source=specs/PHASE3_P3_1_SPEC.md:L344 | neighbors=[TASK LIST]
- "specs_phase3_p3_1_spec_task_9_test_sprint_separate_session": "Task 9 — Test sprint (separate session)" | kind=entity | source=specs/PHASE3_P3_1_SPEC.md:L366 | neighbors=[TASK LIST]
- "specs_phase3_p3_2_spec_branch_feat_p3_2_time_records_migration": "Branch: feat/p3-2-time-records-migration" | kind=entity | source=specs/PHASE3_P3_2_SPEC.md:L2 | neighbors=[PHASE3_P3_2_SPEC.md]
- "specs_phase3_p3_2_spec_branch_setup_task_0_do_this_first_paste_output_before_proceeding": "BRANCH SETUP (Task 0 — do this first, paste output before proceeding)" | kind=entity | source=specs/PHASE3_P3_2_SPEC.md:L26 | neighbors=[Last updated: 2026-05-26 (Session 99)]
- "specs_phase3_p3_2_spec_depends_on_p3_1_merged_pr_818": "Depends on: P3-1 merged (PR #818)" | kind=entity | source=specs/PHASE3_P3_2_SPEC.md:L3 | neighbors=[PHASE3_P3_2_SPEC.md]
- "specs_phase3_p3_2_spec_files_to_create_or_modify": "FILES TO CREATE OR MODIFY" | kind=entity | source=specs/PHASE3_P3_2_SPEC.md:L38 | neighbors=[Last updated: 2026-05-26 (Session 99)]
- "specs_phase3_p3_2_spec_goal": "GOAL" | kind=entity | source=specs/PHASE3_P3_2_SPEC.md:L8 | neighbors=[Last updated: 2026-05-26 (Session 99)]
- "specs_phase3_p3_2_spec_p3_2_time_records_migration_spec": "P3-2: TIME RECORDS MIGRATION SPEC" | kind=entity | source=specs/PHASE3_P3_2_SPEC.md:L1 | neighbors=[PHASE3_P3_2_SPEC.md]
- "specs_phase3_p3_2_spec_task_1_read_current_state": "TASK 1 — Read current state" | kind=entity | source=specs/PHASE3_P3_2_SPEC.md:L51 | neighbors=[Last updated: 2026-05-26 (Session 99)]
- "specs_phase3_p3_2_spec_task_2_write_migrate_time_records_ts": "TASK 2 — Write migrate-time-records.ts" | kind=entity | source=specs/PHASE3_P3_2_SPEC.md:L78 | neighbors=[Last updated: 2026-05-26 (Session 99)]
- "specs_phase3_p3_2_spec_task_3_write_verify_p3_2_ts_and_run_it": "TASK 3 — Write verify-p3-2.ts and run it" | kind=entity | source=specs/PHASE3_P3_2_SPEC.md:L256 | neighbors=[Last updated: 2026-05-26 (Session 99)]
- "specs_phase3_p3_2_spec_task_4_tsc_push_diff_artifact": "TASK 4 — tsc, push diff, artifact" | kind=entity | source=specs/PHASE3_P3_2_SPEC.md:L302 | neighbors=[Last updated: 2026-05-26 (Session 99)]
- "specs_phase3_p3_2_spec_task_5_test_sprint_separate_from_task_4": "TASK 5 — Test sprint (separate from Task 4)" | kind=entity | source=specs/PHASE3_P3_2_SPEC.md:L320 | neighbors=[Last updated: 2026-05-26 (Session 99)]
- "specs_phase3_p3_2_spec_task_6_merge_only_after_clear_to_merge_from_claude_code": "TASK 6 — Merge (only after \"Clear to merge\" from Claude Code)" | kind=entity | source=specs/PHASE3_P3_2_SPEC.md:L342 | neighbors=[Last updated: 2026-05-26 (Session 99)]
- "specs_phase3_p3_3_spec_branch_feat_p3_3_dispatch_migration": "Branch: feat/p3-3-dispatch-migration" | kind=entity | source=specs/PHASE3_P3_3_SPEC.md:L2 | neighbors=[PHASE3_P3_3_SPEC.md]
- "specs_phase3_p3_3_spec_data_sources_brandon_exports_before_ag_starts_task_4": "DATA SOURCES (Brandon exports before AG starts Task 4)" | kind=entity | source=specs/PHASE3_P3_3_SPEC.md:L31 | neighbors=[Written: 2026-05-26 (Session 101)]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\PTOW\1_APT_Central_Command\.graphify\description-instructions\batch-368.json

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
