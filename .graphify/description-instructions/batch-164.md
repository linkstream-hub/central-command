# Node Description Batch 165 of 412

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

- "archive_antigravity_timecard_approval_spec_attestationbadge_component_inline_no_new_file": "`AttestationBadge` component (inline, no new file):" | kind=entity | source=specs/archive/ANTIGRAVITY_TIMECARD_APPROVAL_SPEC.md:L813 | neighbors=[Timecards table] | lang=en
- "archive_antigravity_timecard_approval_spec_brandon_actions_after_deploy": "BRANDON ACTIONS (after deploy)" | kind=entity | source=specs/archive/ANTIGRAVITY_TIMECARD_APPROVAL_SPEC.md:L980 | neighbors=[ANTIGRAVITY SPEC — Supervisor Timecard …] | lang=en
- "archive_antigravity_timecard_approval_spec_data_load": "Data load" | kind=entity | source=specs/archive/ANTIGRAVITY_TIMECARD_APPROVAL_SPEC.md:L707 | neighbors=[FEATURE 5 — CC2.0 `/hr` Page: Timecards…] | lang=en
- "archive_antigravity_timecard_approval_spec_dispute_modal": "Dispute modal" | kind=entity | source=specs/archive/ANTIGRAVITY_TIMECARD_APPROVAL_SPEC.md:L887 | neighbors=[FEATURE 5 — CC2.0 `/hr` Page: Timecards…] | lang=en
- "archive_antigravity_timecard_approval_spec_disputetimecard": "`disputeTimecard`" | kind=entity | source=specs/archive/ANTIGRAVITY_TIMECARD_APPROVAL_SPEC.md:L630 | neighbors=[FEATURE 4 — `tech-pwa/src/lib/dashboard…] | lang=en
- "archive_antigravity_timecard_approval_spec_extend_tm_col_currently_ends_at_entity_id_23": "Extend `TM_COL` (currently ends at `ENTITY_ID: 23`)" | kind=entity | source=specs/archive/ANTIGRAVITY_TIMECARD_APPROVAL_SPEC.md:L70 | neighbors=[FEATURE 1 — TechPWA.gs: Column Map Exte…] | lang=en
- "archive_antigravity_timecard_approval_spec_file_tech_pwa_src_app_job_jobid_page_tsx": "File: `tech-pwa/src/app/job/[jobId]/page.tsx`" | kind=entity | source=specs/archive/ANTIGRAVITY_TIMECARD_APPROVAL_SPEC.md:L474 | neighbors=[FEATURE 3 — Tech PWA: Post-ClockOut Att…] | lang=en
- "archive_antigravity_timecard_approval_spec_files_to_touch": "FILES TO TOUCH" | kind=entity | source=specs/archive/ANTIGRAVITY_TIMECARD_APPROVAL_SPEC.md:L57 | neighbors=[ANTIGRAVITY SPEC — Supervisor Timecard …] | lang=en
- "archive_antigravity_timecard_approval_spec_formattime_helper_inline": "`formatTime` helper (inline):" | kind=entity | source=specs/archive/ANTIGRAVITY_TIMECARD_APPROVAL_SPEC.md:L836 | neighbors=[Timecards table] | lang=en
- "archive_antigravity_timecard_approval_spec_gettimecardapprovalqueue": "`getTimecardApprovalQueue`" | kind=entity | source=specs/archive/ANTIGRAVITY_TIMECARD_APPROVAL_SPEC.md:L608 | neighbors=[FEATURE 4 — `tech-pwa/src/lib/dashboard…] | lang=en
- "archive_antigravity_timecard_approval_spec_handleapprove_action": "`handleApprove` action:" | kind=entity | source=specs/archive/ANTIGRAVITY_TIMECARD_APPROVAL_SPEC.md:L845 | neighbors=[Timecards table] | lang=en
- "archive_antigravity_timecard_approval_spec_handledispute_from_dispute_modal_submit": "`handleDispute` (from dispute modal submit):" | kind=entity | source=specs/archive/ANTIGRAVITY_TIMECARD_APPROVAL_SPEC.md:L864 | neighbors=[Timecards table] | lang=en
- "archive_antigravity_timecard_approval_spec_new_time_records_columns_exact_schema": "NEW TIME RECORDS COLUMNS — EXACT SCHEMA" | kind=entity | source=specs/archive/ANTIGRAVITY_TIMECARD_APPROVAL_SPEC.md:L37 | neighbors=[ANTIGRAVITY SPEC — Supervisor Timecard …] | lang=en
- "archive_antigravity_timecard_approval_spec_new_type_timecardrecord": "New type: `TimecardRecord`" | kind=entity | source=specs/archive/ANTIGRAVITY_TIMECARD_APPROVAL_SPEC.md:L558 | neighbors=[FEATURE 4 — `tech-pwa/src/lib/dashboard…] | lang=en
- "archive_antigravity_timecard_approval_spec_overview": "Overview" | kind=entity | source=specs/archive/ANTIGRAVITY_TIMECARD_APPROVAL_SPEC.md:L647 | neighbors=[FEATURE 5 — CC2.0 `/hr` Page: Timecards…] | lang=en
- "archive_antigravity_timecard_approval_spec_role_gate": "Role gate" | kind=entity | source=specs/archive/ANTIGRAVITY_TIMECARD_APPROVAL_SPEC.md:L651 | neighbors=[FEATURE 5 — CC2.0 `/hr` Page: Timecards…] | lang=en
- "archive_antigravity_timecard_approval_spec_signattestation_calls_techpwa_gs_not_dashboardapi_gs": "`signAttestation` — calls **TechPWA.gs** (not DashboardAPI.gs)" | kind=entity | source=specs/archive/ANTIGRAVITY_TIMECARD_APPROVAL_SPEC.md:L594 | neighbors=[FEATURE 4 — `tech-pwa/src/lib/dashboard…] | lang=en
- "archive_antigravity_timecard_approval_spec_skeleton_loader_for_timecards_tab": "Skeleton loader for Timecards tab" | kind=entity | source=specs/archive/ANTIGRAVITY_TIMECARD_APPROVAL_SPEC.md:L932 | neighbors=[FEATURE 5 — CC2.0 `/hr` Page: Timecards…] | lang=en
- "archive_antigravity_timecard_approval_spec_state_for_timecards_tab": "State for Timecards tab" | kind=entity | source=specs/archive/ANTIGRAVITY_TIMECARD_APPROVAL_SPEC.md:L678 | neighbors=[FEATURE 5 — CC2.0 `/hr` Page: Timecards…] | lang=en
- "archive_antigravity_timecard_approval_spec_supervisor_identity_guard": "Supervisor identity guard" | kind=entity | source=specs/archive/ANTIGRAVITY_TIMECARD_APPROVAL_SPEC.md:L733 | neighbors=[FEATURE 5 — CC2.0 `/hr` Page: Timecards…] | lang=en
- "archive_antigravity_timecard_approval_spec_supervisorstatusbadge_component_inline_no_new_file": "`SupervisorStatusBadge` component (inline, no new file):" | kind=entity | source=specs/archive/ANTIGRAVITY_TIMECARD_APPROVAL_SPEC.md:L823 | neighbors=[Timecards table] | lang=en
- "archive_antigravity_timecard_approval_spec_tab_addition": "Tab addition" | kind=entity | source=specs/archive/ANTIGRAVITY_TIMECARD_APPROVAL_SPEC.md:L656 | neighbors=[FEATURE 5 — CC2.0 `/hr` Page: Timecards…] | lang=en
- "archive_antigravity_timecard_approval_spec_update_getnotificationsda_add_timecard_pending": "Update `getNotificationsDA` — add TIMECARD_PENDING" | kind=entity | source=specs/archive/ANTIGRAVITY_TIMECARD_APPROVAL_SPEC.md:L438 | neighbors=[FEATURE 2 — DashboardAPI.gs: Three New …] | lang=en
- "archive_antigravity_timecard_approval_spec_update_handleclockin_write_initial_values_for_new_columns": "Update `handleClockIn` — write initial values for new columns" | kind=entity | source=specs/archive/ANTIGRAVITY_TIMECARD_APPROVAL_SPEC.md:L112 | neighbors=[FEATURE 1 — TechPWA.gs: Column Map Exte…] | lang=en
- "archive_antigravity_timecard_approval_spec_verification_steps": "VERIFICATION STEPS" | kind=entity | source=specs/archive/ANTIGRAVITY_TIMECARD_APPROVAL_SPEC.md:L944 | neighbors=[ANTIGRAVITY SPEC — Supervisor Timecard …] | lang=en
- "archive_antigravity_timecard_approval_spec_what_this_builds": "WHAT THIS BUILDS" | kind=entity | source=specs/archive/ANTIGRAVITY_TIMECARD_APPROVAL_SPEC.md:L12 | neighbors=[ANTIGRAVITY SPEC — Supervisor Timecard …] | lang=en
- "archive_antigravity_ui_polish_spec": "ANTIGRAVITY_UI_POLISH_SPEC.md" | kind=entity | source=specs/archive/ANTIGRAVITY_UI_POLISH_SPEC.md:L1 | neighbors=[ANTIGRAVITY_UI_POLISH_SPEC] | lang=en
- "archive_antigravity_ui_polish_spec_a_fix_tech_name_display_removes_trailing_comma_from_last_first_format_names": "A. Fix tech name display — removes trailing comma from \"Last, First\" format nam…" | kind=entity | source=specs/archive/ANTIGRAVITY_UI_POLISH_SPEC.md:L96 | neighbors=[Fix 3 — Calendar chip readability (`cal…] | lang=en
- "archive_antigravity_ui_polish_spec_a_fix_the_header_last_column_spacer_width": "A. Fix the header last-column spacer width" | kind=entity | source=specs/archive/ANTIGRAVITY_UI_POLISH_SPEC.md:L64 | neighbors=[Fix 2 — Fix column alignment (`JobQueue…] | lang=en
- "archive_antigravity_ui_polish_spec_a_remove_morehorizontal_from_the_import": "A. Remove `MoreHorizontal` from the import" | kind=entity | source=specs/archive/ANTIGRAVITY_UI_POLISH_SPEC.md:L37 | neighbors=[Fix 1 — Remove three-dot button (`JobQu…] | lang=en
- "archive_antigravity_ui_polish_spec_b_fix_status_column_padding_mismatch": "B. Fix Status column padding mismatch" | kind=entity | source=specs/archive/ANTIGRAVITY_UI_POLISH_SPEC.md:L78 | neighbors=[Fix 2 — Fix column alignment (`JobQueue…] | lang=en
- "archive_antigravity_ui_polish_spec_b_increase_chip_font_size_for_readability": "B. Increase chip font size for readability" | kind=entity | source=specs/archive/ANTIGRAVITY_UI_POLISH_SPEC.md:L108 | neighbors=[Fix 3 — Calendar chip readability (`cal…] | lang=en
- "archive_antigravity_ui_polish_spec_b_remove_the_dead_button_from_the_row_actions_div": "B. Remove the dead button from the row actions div" | kind=entity | source=specs/archive/ANTIGRAVITY_UI_POLISH_SPEC.md:L49 | neighbors=[Fix 1 — Remove three-dot button (`JobQu…] | lang=en
- "archive_antigravity_ui_polish_spec_do_not_submit_as_complete_until": "Do NOT submit as complete until:" | kind=entity | source=specs/archive/ANTIGRAVITY_UI_POLISH_SPEC.md:L142 | neighbors=[ANTIGRAVITY_UI_POLISH_SPEC] | lang=pt
- "archive_antigravity_ui_polish_spec_files_you_must_change": "Files You Must Change" | kind=entity | source=specs/archive/ANTIGRAVITY_UI_POLISH_SPEC.md:L17 | neighbors=[ANTIGRAVITY_UI_POLISH_SPEC] | lang=en
- "archive_antigravity_ui_polish_spec_files_you_must_not_change": "Files You Must NOT Change" | kind=entity | source=specs/archive/ANTIGRAVITY_UI_POLISH_SPEC.md:L26 | neighbors=[ANTIGRAVITY_UI_POLISH_SPEC] | lang=en
- "archive_antigravity_ui_polish_spec_verification_steps": "Verification Steps" | kind=entity | source=specs/archive/ANTIGRAVITY_UI_POLISH_SPEC.md:L132 | neighbors=[ANTIGRAVITY_UI_POLISH_SPEC] | lang=en
- "archive_antigravity_ui_polish_spec_what_this_changes": "What This Changes" | kind=entity | source=specs/archive/ANTIGRAVITY_UI_POLISH_SPEC.md:L7 | neighbors=[ANTIGRAVITY_UI_POLISH_SPEC] | lang=en
- "archive_antigravity_weekly_schedule_nav_add_ispast_prop_to_droppableschedulecell": "Add `isPast` prop to DroppableScheduleCell:" | kind=entity | source=specs/archive/ANTIGRAVITY_WEEKLY_SCHEDULE_NAV.md:L262 | neighbors=[Step B5 — Dim past date columns and dis…] | lang=en
- "archive_antigravity_weekly_schedule_nav_antigravity_sprint_week_navigation_schedule_weekly_schedule": "ANTIGRAVITY SPRINT — WEEK NAVIGATION (Schedule + Weekly Schedule)" | kind=entity | source=specs/archive/ANTIGRAVITY_WEEKLY_SCHEDULE_NAV.md:L1 | neighbors=[ANTIGRAVITY_WEEKLY_SCHEDULE_NAV.md] | lang=en

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\PTOW\1_APT_Central_Command\.graphify\description-instructions\batch-164.json

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
