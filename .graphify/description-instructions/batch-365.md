# Node Description Batch 366 of 412

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

- "specs_antigravity_s115_dispatch_flow_spec": "ANTIGRAVITY_S115_DISPATCH_FLOW_SPEC.md" | kind=entity | source=specs/ANTIGRAVITY_S115_DISPATCH_FLOW_SPEC.md:L1 | neighbors=[ANTIGRAVITY SPEC — S115 DISPATCH FLOW L…] | lang=en
- "specs_antigravity_s115_dispatch_flow_spec_constraint_contradiction_detector": "CONSTRAINT — CONTRADICTION DETECTOR" | kind=entity | source=specs/ANTIGRAVITY_S115_DISPATCH_FLOW_SPEC.md:L31 | neighbors=[ANTIGRAVITY SPEC — S115 DISPATCH FLOW L…] | lang=en
- "specs_antigravity_s115_dispatch_flow_spec_context_what_claude_code_already_did": "CONTEXT — WHAT CLAUDE CODE ALREADY DID" | kind=entity | source=specs/ANTIGRAVITY_S115_DISPATCH_FLOW_SPEC.md:L9 | neighbors=[ANTIGRAVITY SPEC — S115 DISPATCH FLOW L…] | lang=en
- "specs_antigravity_s115_dispatch_flow_spec_do_not_touch": "DO NOT TOUCH" | kind=entity | source=specs/ANTIGRAVITY_S115_DISPATCH_FLOW_SPEC.md:L275 | neighbors=[ANTIGRAVITY SPEC — S115 DISPATCH FLOW L…] | lang=pt
- "specs_antigravity_s115_dispatch_flow_spec_objective": "OBJECTIVE" | kind=entity | source=specs/ANTIGRAVITY_S115_DISPATCH_FLOW_SPEC.md:L19 | neighbors=[ANTIGRAVITY SPEC — S115 DISPATCH FLOW L…] | lang=en
- "specs_antigravity_s115_dispatch_flow_spec_part_2_operations_view_restructure": "PART 2 — OPERATIONS VIEW RESTRUCTURE" | kind=entity | source=specs/ANTIGRAVITY_S115_DISPATCH_FLOW_SPEC.md:L112 | neighbors=[ANTIGRAVITY SPEC — S115 DISPATCH FLOW L…] | lang=en
- "specs_antigravity_s115_dispatch_flow_spec_part_3_rts_schedule_grid_rework": "PART 3 — RtS SCHEDULE GRID REWORK" | kind=entity | source=specs/ANTIGRAVITY_S115_DISPATCH_FLOW_SPEC.md:L122 | neighbors=[ANTIGRAVITY SPEC — S115 DISPATCH FLOW L…] | lang=en
- "specs_antigravity_s115_dispatch_flow_spec_task_1_1_create_migration_route": "Task 1.1 — Create migration route" | kind=entity | source=specs/ANTIGRAVITY_S115_DISPATCH_FLOW_SPEC.md:L57 | neighbors=[PART 1 — STATUS NORMALIZATION (one-time…] | lang=en
- "specs_antigravity_s115_dispatch_flow_spec_task_1_2_commit_push_wait_for_vercel_deploy": "Task 1.2 — Commit, push, wait for Vercel deploy" | kind=entity | source=specs/ANTIGRAVITY_S115_DISPATCH_FLOW_SPEC.md:L95 | neighbors=[PART 1 — STATUS NORMALIZATION (one-time…] | lang=en
- "specs_antigravity_s115_dispatch_flow_spec_task_1_3_remove_the_migration_route": "Task 1.3 — Remove the migration route" | kind=entity | source=specs/ANTIGRAVITY_S115_DISPATCH_FLOW_SPEC.md:L106 | neighbors=[PART 1 — STATUS NORMALIZATION (one-time…] | lang=en
- "specs_antigravity_s115_dispatch_flow_spec_task_4_1_create_the_api_route": "Task 4.1 — Create the API route" | kind=entity | source=specs/ANTIGRAVITY_S115_DISPATCH_FLOW_SPEC.md:L138 | neighbors=[PART 4 — MY HOURS PAGE] | lang=en
- "specs_antigravity_s115_dispatch_flow_spec_task_4_2_create_the_page": "Task 4.2 — Create the page" | kind=entity | source=specs/ANTIGRAVITY_S115_DISPATCH_FLOW_SPEC.md:L179 | neighbors=[PART 4 — MY HOURS PAGE] | lang=en
- "specs_antigravity_s115_dispatch_flow_spec_task_4_3_add_nav_link": "Task 4.3 — Add nav link" | kind=entity | source=specs/ANTIGRAVITY_S115_DISPATCH_FLOW_SPEC.md:L200 | neighbors=[PART 4 — MY HOURS PAGE] | lang=en
- "specs_antigravity_s115_dispatch_flow_spec_task_5_1_src_components_clockedinbar_tsx_line_167": "Task 5.1 — `src/components/ClockedInBar.tsx` line 167" | kind=entity | source=specs/ANTIGRAVITY_S115_DISPATCH_FLOW_SPEC.md:L210 | neighbors=[PART 5 — BREAK LABEL FIX] | lang=en
- "specs_antigravity_s115_dispatch_flow_spec_task_5_2_src_lib_i18n_en_ts_line_27": "Task 5.2 — `src/lib/i18n/en.ts` line 27" | kind=entity | source=specs/ANTIGRAVITY_S115_DISPATCH_FLOW_SPEC.md:L221 | neighbors=[PART 5 — BREAK LABEL FIX] | lang=en
- "specs_antigravity_s115_dispatch_flow_spec_task_5_3_src_lib_i18n_en_ts_line_65": "Task 5.3 — `src/lib/i18n/en.ts` line 65" | kind=entity | source=specs/ANTIGRAVITY_S115_DISPATCH_FLOW_SPEC.md:L232 | neighbors=[PART 5 — BREAK LABEL FIX] | lang=en
- "specs_antigravity_s115_dispatch_flow_spec_task_n_1_test_sprint_separate_session_after_pass": "Task N-1 — Test sprint (separate session after PASS)" | kind=entity | source=specs/ANTIGRAVITY_S115_DISPATCH_FLOW_SPEC.md:L259 | neighbors=[TERMINAL TASKS] | lang=en
- "specs_antigravity_s115_dispatch_flow_spec_task_n_2_compile_diff": "Task N-2 — Compile + diff" | kind=entity | source=specs/ANTIGRAVITY_S115_DISPATCH_FLOW_SPEC.md:L247 | neighbors=[TERMINAL TASKS] | lang=en
- "specs_antigravity_s115_dispatch_flow_spec_task_n_wait_for_clear_to_merge_do_not_merge_before_it": "Task N — Wait for clear-to-merge. Do not merge before it." | kind=entity | source=specs/ANTIGRAVITY_S115_DISPATCH_FLOW_SPEC.md:L271 | neighbors=[TERMINAL TASKS] | lang=en
- "specs_fix_dashboard_stats_spec": "FIX_DASHBOARD_STATS_SPEC.md" | kind=entity | source=specs/FIX_DASHBOARD_STATS_SPEC.md:L1 | neighbors=[Fix: Dashboard Stats Semantics + Dead C…] | lang=en
- "specs_fix_dashboard_stats_spec_objective": "Objective" | kind=entity | source=specs/FIX_DASHBOARD_STATS_SPEC.md:L11 | neighbors=[Fix: Dashboard Stats Semantics + Dead C…] | lang=en
- "specs_fix_dashboard_stats_spec_out_of_scope": "Out of Scope" | kind=entity | source=specs/FIX_DASHBOARD_STATS_SPEC.md:L155 | neighbors=[Fix: Dashboard Stats Semantics + Dead C…] | lang=en
- "specs_fix_dashboard_stats_spec_task_1_branch_gate": "Task 1 — Branch gate" | kind=entity | source=specs/FIX_DASHBOARD_STATS_SPEC.md:L19 | neighbors=[Task List] | lang=en
- "specs_fix_dashboard_stats_spec_task_2_replace_dead_computestats_in_dal_mappers_ts_with_correct_computedashboardstats": "Task 2 — Replace dead `computeStats` in `dal/mappers.ts` with correct `computeD…" | kind=entity | source=specs/FIX_DASHBOARD_STATS_SPEC.md:L31 | neighbors=[Task List] | lang=en
- "specs_fix_dashboard_stats_spec_task_3_update_dal_jobs_ts_delete_getdispatchdata_update_import": "Task 3 — Update `dal/jobs.ts`: delete `getDispatchData()`, update import" | kind=entity | source=specs/FIX_DASHBOARD_STATS_SPEC.md:L55 | neighbors=[Task List] | lang=en
- "specs_fix_dashboard_stats_spec_task_4_fix_api_jobs_route_ts_inline_stats_block": "Task 4 — Fix `api/jobs/route.ts` inline stats block" | kind=entity | source=specs/FIX_DASHBOARD_STATS_SPEC.md:L67 | neighbors=[Task List] | lang=en
- "specs_fix_dashboard_stats_spec_task_5_consolidate_dashboardstats_type": "Task 5 — Consolidate `DashboardStats` type" | kind=entity | source=specs/FIX_DASHBOARD_STATS_SPEC.md:L91 | neighbors=[Task List] | lang=en
- "specs_fix_dashboard_stats_spec_task_6_typescript_diff_push_stop": "Task 6 — TypeScript + diff + push (STOP)" | kind=entity | source=specs/FIX_DASHBOARD_STATS_SPEC.md:L110 | neighbors=[Task List] | lang=en
- "specs_fix_dashboard_stats_spec_task_7_manual_smoke_test_stop": "Task 7 — Manual smoke test (STOP)" | kind=entity | source=specs/FIX_DASHBOARD_STATS_SPEC.md:L128 | neighbors=[Task List] | lang=en
- "specs_fix_dashboard_stats_spec_task_8_merge": "Task 8 — Merge" | kind=entity | source=specs/FIX_DASHBOARD_STATS_SPEC.md:L146 | neighbors=[Task List] | lang=en
- "specs_legacy_migration_blueprint": "LEGACY_MIGRATION_BLUEPRINT.md" | kind=entity | source=specs/LEGACY_MIGRATION_BLUEPRINT.md:L1 | neighbors=[Master Legacy Migration Blueprint] | lang=en
- "specs_legacy_migration_blueprint_1_executive_summary": "1. Executive Summary" | kind=entity | source=specs/LEGACY_MIGRATION_BLUEPRINT.md:L3 | neighbors=[Master Legacy Migration Blueprint] | lang=en
- "specs_legacy_migration_blueprint_2_1_core_scripts": "2.1 Core Scripts" | kind=entity | source=specs/LEGACY_MIGRATION_BLUEPRINT.md:L11 | neighbors=[2. Source of Truth: Legacy Architecture] | lang=en
- "specs_legacy_migration_blueprint_2_2_data_layer_google_sheets": "2.2 Data Layer (Google Sheets)" | kind=entity | source=specs/LEGACY_MIGRATION_BLUEPRINT.md:L23 | neighbors=[2. Source of Truth: Legacy Architecture] | lang=en
- "specs_legacy_migration_blueprint_2_3_external_integrations": "2.3 External Integrations" | kind=entity | source=specs/LEGACY_MIGRATION_BLUEPRINT.md:L29 | neighbors=[2. Source of Truth: Legacy Architecture] | lang=en
- "specs_legacy_migration_blueprint_3_target_architecture": "3. Target Architecture" | kind=entity | source=specs/LEGACY_MIGRATION_BLUEPRINT.md:L34 | neighbors=[Master Legacy Migration Blueprint] | lang=en
- "specs_legacy_migration_blueprint_4_1_techs_from_master_directory_tech_roster": "4.1 `Techs` (from Master Directory / Tech Roster)" | kind=entity | source=specs/LEGACY_MIGRATION_BLUEPRINT.md:L45 | neighbors=[4. Schema Mapping (Sheets to Postgres)] | lang=en
- "specs_legacy_migration_blueprint_4_2_properties_from_master_directory": "4.2 `Properties` (from Master Directory)" | kind=entity | source=specs/LEGACY_MIGRATION_BLUEPRINT.md:L53 | neighbors=[4. Schema Mapping (Sheets to Postgres)] | lang=en
- "specs_legacy_migration_blueprint_4_3_jobs_from_leads_dispatch_queue": "4.3 `Jobs` (from Leads / Dispatch Queue)" | kind=entity | source=specs/LEGACY_MIGRATION_BLUEPRINT.md:L60 | neighbors=[4. Schema Mapping (Sheets to Postgres)] | lang=en
- "specs_legacy_migration_blueprint_4_4_timerecords_from_time_records": "4.4 `TimeRecords` (from Time Records)" | kind=entity | source=specs/LEGACY_MIGRATION_BLUEPRINT.md:L69 | neighbors=[4. Schema Mapping (Sheets to Postgres)] | lang=en

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\PTOW\1_APT_Central_Command\.graphify\description-instructions\batch-365.json

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
