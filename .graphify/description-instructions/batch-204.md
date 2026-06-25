# Node Description Batch 205 of 412

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

- "docs_runbook_step_5_check_github_actions": "Step 5 — Check GitHub Actions" | kind=entity | source=docs/RUNBOOK.md:L104 | neighbors=[SCENARIO 2 — Dashboard goes blank or re…] | lang=en
- "docs_runbook_step_5_emergency_tech_can_t_clock_in_before_shift": "Step 5 — Emergency: tech can't clock in before shift" | kind=entity | source=docs/RUNBOOK.md:L175 | neighbors=[SCENARIO 5 — Tech PWA returns 500 / tec…] | lang=en
- "docs_runbook_what_to_do_when_something_breaks_written_for_brandon_as_sole_responder": "What to do when something breaks. Written for Brandon as sole responder." | kind=entity | source=docs/RUNBOOK.md:L2 | neighbors=[RUNBOOK.md] | lang=en
- "docs_runbook_who_has_access_to_what": "WHO HAS ACCESS TO WHAT" | kind=entity | source=docs/RUNBOOK.md:L237 | neighbors=[Last updated: 2026-05-19] | lang=en
- "docs_session_guide_1_open_claude_code_from_the_right_directory": "1. Open Claude Code from the right directory" | kind=entity | source=docs/SESSION_GUIDE.md:L8 | neighbors=[STARTING A SESSION] | lang=en
- "docs_session_guide_2_orient_claude_immediately": "2. Orient Claude immediately" | kind=entity | source=docs/SESSION_GUIDE.md:L15 | neighbors=[STARTING A SESSION] | lang=en
- "docs_session_guide_3_confirm_claude_is_oriented": "3. Confirm Claude is oriented" | kind=entity | source=docs/SESSION_GUIDE.md:L24 | neighbors=[STARTING A SESSION] | lang=en
- "docs_session_guide_apt_central_command_session_guide": "APT CENTRAL COMMAND — SESSION GUIDE" | kind=entity | source=docs/SESSION_GUIDE.md:L1 | neighbors=[SESSION_GUIDE.md] | lang=en
- "docs_session_guide_before_any_clasp_push": "Before any clasp push" | kind=entity | source=docs/SESSION_GUIDE.md:L42 | neighbors=[DURING A SESSION] | lang=en
- "docs_session_guide_check_live_version": "Check live version" | kind=entity | source=docs/SESSION_GUIDE.md:L116 | neighbors=[KEY COMMANDS REFERENCE] | lang=en
- "docs_session_guide_critical_functions_never_run_without_intent": "Critical functions — never run without intent" | kind=entity | source=docs/SESSION_GUIDE.md:L49 | neighbors=[DURING A SESSION] | lang=en
- "docs_session_guide_deploy": "Deploy" | kind=entity | source=docs/SESSION_GUIDE.md:L98 | neighbors=[KEY COMMANDS REFERENCE] | lang=en
- "docs_session_guide_git": "Git" | kind=entity | source=docs/SESSION_GUIDE.md:L107 | neighbors=[KEY COMMANDS REFERENCE] | lang=en
- "docs_session_guide_if_a_job_is_accidentally_archived": "If a job is accidentally archived" | kind=entity | source=docs/SESSION_GUIDE.md:L145 | neighbors=[IF SOMETHING GOES WRONG] | lang=en
- "docs_session_guide_if_a_trigger_breaks": "If a trigger breaks" | kind=entity | source=docs/SESSION_GUIDE.md:L135 | neighbors=[IF SOMETHING GOES WRONG] | lang=pt
- "docs_session_guide_if_gemini_parsing_stops_working": "If Gemini parsing stops working" | kind=entity | source=docs/SESSION_GUIDE.md:L149 | neighbors=[IF SOMETHING GOES WRONG] | lang=en
- "docs_session_guide_if_the_dashboard_goes_blank_errors": "If the dashboard goes blank / errors" | kind=entity | source=docs/SESSION_GUIDE.md:L140 | neighbors=[IF SOMETHING GOES WRONG] | lang=en
- "docs_session_guide_keep_claude_on_track": "Keep Claude on track" | kind=entity | source=docs/SESSION_GUIDE.md:L37 | neighbors=[DURING A SESSION] | lang=en
- "docs_session_guide_step_1_deploy_to_production_if_code_changed": "Step 1 — Deploy to production (if code changed)" | kind=entity | source=docs/SESSION_GUIDE.md:L61 | neighbors=[ENDING A SESSION] | lang=en
- "docs_session_guide_step_2_update_claude_md": "Step 2 — Update CLAUDE.md" | kind=entity | source=docs/SESSION_GUIDE.md:L68 | neighbors=[ENDING A SESSION] | lang=en
- "docs_session_guide_step_3_commit_and_push_to_github": "Step 3 — Commit and push to GitHub" | kind=entity | source=docs/SESSION_GUIDE.md:L80 | neighbors=[ENDING A SESSION] | lang=en
- "docs_session_guide_step_4_confirm_with_claude": "Step 4 — Confirm with Claude" | kind=entity | source=docs/SESSION_GUIDE.md:L87 | neighbors=[ENDING A SESSION] | lang=en
- "docs_session_guide_what_claude_reads_automatically": "WHAT CLAUDE READS AUTOMATICALLY" | kind=entity | source=docs/SESSION_GUIDE.md:L121 | neighbors=[How to start and end every Claude Code …] | lang=en
- "docs_shadow_writes_1_employees_techs_tech_roster": "1. `employees` (Techs / Tech Roster)" | kind=entity | source=docs/SHADOW_WRITES.md:L14 | neighbors=[Active Shadow-Write Paths] | lang=en
- "docs_shadow_writes_2_time_records_clock_in_out_events": "2. `time_records` (Clock In/Out Events)" | kind=entity | source=docs/SHADOW_WRITES.md:L29 | neighbors=[Active Shadow-Write Paths] | lang=en
- "docs_shadow_writes_3_jobs_dispatch_queue_work_orders": "3. `jobs` (Dispatch Queue / Work Orders)" | kind=entity | source=docs/SHADOW_WRITES.md:L44 | neighbors=[Active Shadow-Write Paths] | lang=en
- "docs_shadow_writes_4_job_comments_dispatch_comments": "4. `job_comments` (Dispatch Comments)" | kind=entity | source=docs/SHADOW_WRITES.md:L58 | neighbors=[Active Shadow-Write Paths] | lang=en
- "docs_shadow_writes_5_comms_messages_inbound_email_replies": "5. `comms_messages` — Inbound Email Replies" | kind=entity | source=docs/SHADOW_WRITES.md:L71 | neighbors=[Active Shadow-Write Paths] | lang=en
- "docs_shadow_writes_6_comms_messages_outbound_gmail_sync_cron": "6. `comms_messages` — Outbound (Gmail Sync Cron)" | kind=entity | source=docs/SHADOW_WRITES.md:L84 | neighbors=[Active Shadow-Write Paths] | lang=en
- "docs_shadow_writes_7_compliance_alerts_side_effect_of_time_record_sync": "7. `compliance_alerts` (Side-Effect of Time Record Sync)" | kind=entity | source=docs/SHADOW_WRITES.md:L95 | neighbors=[Active Shadow-Write Paths] | lang=en
- "docs_shadow_writes_cutover_readiness_by_table": "Cutover Readiness by Table" | kind=entity | source=docs/SHADOW_WRITES.md:L131 | neighbors=[Updated: 2026-06-01 | Phase 14 Cut-Over…] | lang=en
- "docs_shadow_writes_duplicate_write_path_risks_requires_resolution_before_cutover": "Duplicate Write Path Risks (Requires Resolution Before Cutover)" | kind=entity | source=docs/SHADOW_WRITES.md:L121 | neighbors=[Updated: 2026-06-01 | Phase 14 Cut-Over…] | lang=en
- "docs_shadow_writes_generated_2026_05_31_foundation_milestone_phase_11": "Generated: 2026-05-31 | Foundation Milestone Phase 11" | kind=entity | source=docs/SHADOW_WRITES.md:L2 | neighbors=[SHADOW_WRITES.md] | lang=en
- "docs_shadow_writes_shadow_writes_inventory": "Shadow-Writes Inventory" | kind=entity | source=docs/SHADOW_WRITES.md:L1 | neighbors=[SHADOW_WRITES.md] | lang=en
- "docs_shadow_writes_write_paths_not_yet_shadow_writing_to_neon": "Write Paths NOT Yet Shadow-Writing to Neon" | kind=entity | source=docs/SHADOW_WRITES.md:L107 | neighbors=[Updated: 2026-06-01 | Phase 14 Cut-Over…] | lang=en
- "docs_sheets_schema_derived_from_code_js_and_dashboardapi_gs_ground_truth_for_all_sheet_operations": "Derived from Code.js and DashboardAPI.gs — ground truth for all sheet operation…" | kind=entity | source=docs/SHEETS_SCHEMA.md:L2 | neighbors=[SHEETS_SCHEMA.md] | lang=en
- "docs_sheets_schema_google_sheets_schema_reference": "Google Sheets Schema Reference" | kind=entity | source=docs/SHEETS_SCHEMA.md:L1 | neighbors=[SHEETS_SCHEMA.md] | lang=en
- "docs_sheets_schema_migration_target": "Migration Target" | kind=entity | source=docs/SHEETS_SCHEMA.md:L289 | neighbors=[Role-based terminology used throughout …] | lang=en
- "docs_sheets_schema_tab_compliancealerts": "Tab: `ComplianceAlerts`" | kind=entity | source=docs/SHEETS_SCHEMA.md:L223 | neighbors=[Spreadsheet: APT Lead Intake Master] | lang=en
- "docs_sheets_schema_tab_dispatch_queue": "Tab: `Dispatch Queue`" | kind=entity | source=docs/SHEETS_SCHEMA.md:L39 | neighbors=[Spreadsheet: APT Lead Intake Master] | lang=en

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\PTOW\1_APT_Central_Command\.graphify\description-instructions\batch-204.json

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
