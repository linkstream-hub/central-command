# Node Description Batch 157 of 412

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

- "archive_antigravity_schedule_integrity_spec_verification": "VERIFICATION" | kind=entity | source=specs/archive/ANTIGRAVITY_SCHEDULE_INTEGRITY_SPEC.md:L349 | neighbors=[ANTIGRAVITY SPRINT — Schedule Integrity] | lang=en
- "archive_antigravity_schedule_integrity_spec_what_to_keep_unchanged": "WHAT TO KEEP UNCHANGED" | kind=entity | source=specs/archive/ANTIGRAVITY_SCHEDULE_INTEGRITY_SPEC.md:L326 | neighbors=[ANTIGRAVITY SPRINT — Schedule Integrity] | lang=en
- "archive_antigravity_schedule_integrity_spec_where_the_data_is": "Where the data is" | kind=entity | source=specs/archive/ANTIGRAVITY_SCHEDULE_INTEGRITY_SPEC.md:L188 | neighbors=[FEATURE 2 — Daily Capacity Warning in D…] | lang=en
- "archive_antigravity_schedule_team_sprint_1a_day_headers_show_actual_dates": "1A — Day Headers: Show Actual Dates" | kind=entity | source=specs/archive/ANTIGRAVITY_SCHEDULE_TEAM_SPRINT.md:L30 | neighbors=[PART 1 — SCHEDULE PAGE REDESIGN] | lang=pt
- "archive_antigravity_schedule_team_sprint_1b_time_slots_vertical_time_axis": "1B — Time Slots: Vertical Time Axis" | kind=entity | source=specs/archive/ANTIGRAVITY_SCHEDULE_TEAM_SPRINT.md:L55 | neighbors=[PART 1 — SCHEDULE PAGE REDESIGN] | lang=en
- "archive_antigravity_schedule_team_sprint_1c_drag_to_slot_lock_in_specific_time": "1C — Drag-to-Slot: Lock In Specific Time" | kind=entity | source=specs/archive/ANTIGRAVITY_SCHEDULE_TEAM_SPRINT.md:L118 | neighbors=[PART 1 — SCHEDULE PAGE REDESIGN] | lang=en
- "archive_antigravity_schedule_team_sprint_1d_tech_hours_show_real_scheduled_hours": "1D — Tech Hours: Show Real Scheduled Hours" | kind=entity | source=specs/archive/ANTIGRAVITY_SCHEDULE_TEAM_SPRINT.md:L136 | neighbors=[PART 1 — SCHEDULE PAGE REDESIGN] | lang=en
- "archive_antigravity_schedule_team_sprint_1e_what_to_keep_unchanged": "1E — What to Keep Unchanged" | kind=entity | source=specs/archive/ANTIGRAVITY_SCHEDULE_TEAM_SPRINT.md:L197 | neighbors=[PART 1 — SCHEDULE PAGE REDESIGN] | lang=en
- "archive_antigravity_schedule_team_sprint_1f_verification_schedule": "1F — Verification (Schedule)" | kind=entity | source=specs/archive/ANTIGRAVITY_SCHEDULE_TEAM_SPRINT.md:L209 | neighbors=[PART 1 — SCHEDULE PAGE REDESIGN] | lang=en
- "archive_antigravity_schedule_team_sprint_2a_tech_card_show_week_job_count": "2A — Tech Card: Show Week Job Count" | kind=entity | source=specs/archive/ANTIGRAVITY_SCHEDULE_TEAM_SPRINT.md:L227 | neighbors=[PART 2 — TEAM PAGE ENHANCEMENTS] | lang=pt
- "archive_antigravity_schedule_team_sprint_2b_tech_detail_panel_show_full_weekly_schedule": "2B — Tech Detail Panel: Show Full Weekly Schedule" | kind=entity | source=specs/archive/ANTIGRAVITY_SCHEDULE_TEAM_SPRINT.md:L245 | neighbors=[PART 2 — TEAM PAGE ENHANCEMENTS] | lang=en
- "archive_antigravity_schedule_team_sprint_2c_what_to_keep_unchanged": "2C — What to Keep Unchanged" | kind=entity | source=specs/archive/ANTIGRAVITY_SCHEDULE_TEAM_SPRINT.md:L338 | neighbors=[PART 2 — TEAM PAGE ENHANCEMENTS] | lang=en
- "archive_antigravity_schedule_team_sprint_2d_verification_team": "2D — Verification (Team)" | kind=entity | source=specs/archive/ANTIGRAVITY_SCHEDULE_TEAM_SPRINT.md:L349 | neighbors=[PART 2 — TEAM PAGE ENHANCEMENTS] | lang=en
- "archive_antigravity_schedule_team_sprint_antigravity_sprint_schedule_team_page_overhaul": "ANTIGRAVITY SPRINT — Schedule & Team Page Overhaul" | kind=entity | source=specs/archive/ANTIGRAVITY_SCHEDULE_TEAM_SPRINT.md:L1 | neighbors=[ANTIGRAVITY_SCHEDULE_TEAM_SPRINT.md] | lang=en
- "archive_antigravity_schedule_team_sprint_context": "CONTEXT" | kind=entity | source=specs/archive/ANTIGRAVITY_SCHEDULE_TEAM_SPRINT.md:L7 | neighbors=[Read this entire document before writin…] | lang=en
- "archive_antigravity_schedule_team_sprint_deployment": "DEPLOYMENT" | kind=entity | source=specs/archive/ANTIGRAVITY_SCHEDULE_TEAM_SPRINT.md:L387 | neighbors=[Read this entire document before writin…] | lang=en
- "archive_antigravity_schedule_team_sprint_file_src_app_live_page_tsx_and_src_components_dashboard_summarycards_tsx": "File: `src/app/live/page.tsx` and `src/components/dashboard/SummaryCards.tsx`" | kind=entity | source=specs/archive/ANTIGRAVITY_SCHEDULE_TEAM_SPRINT.md:L361 | neighbors=[PART 3 — COORDINATION SCREEN (Cosmetic …] | lang=en
- "archive_antigravity_schedule_team_sprint_file_src_app_schedule_page_tsx": "File: `src/app/schedule/page.tsx`" | kind=entity | source=specs/archive/ANTIGRAVITY_SCHEDULE_TEAM_SPRINT.md:L25 | neighbors=[PART 1 — SCHEDULE PAGE REDESIGN] | lang=en
- "archive_antigravity_schedule_team_sprint_file_src_app_team_page_tsx": "File: `src/app/team/page.tsx`" | kind=entity | source=specs/archive/ANTIGRAVITY_SCHEDULE_TEAM_SPRINT.md:L223 | neighbors=[PART 2 — TEAM PAGE ENHANCEMENTS] | lang=en
- "archive_antigravity_schedule_team_sprint_file_src_components_dashboard_schedulepagecomponents_tsx": "File: `src/components/dashboard/SchedulePageComponents.tsx`" | kind=entity | source=specs/archive/ANTIGRAVITY_SCHEDULE_TEAM_SPRINT.md:L26 | neighbors=[PART 1 — SCHEDULE PAGE REDESIGN] | lang=en
- "archive_antigravity_schedule_team_sprint_priority_high_these_are_management_facing_views_that_need_to_look_expert_grade": "Priority: HIGH — These are management-facing views that need to look expert-gra…" | kind=entity | source=specs/archive/ANTIGRAVITY_SCHEDULE_TEAM_SPRINT.md:L2 | neighbors=[ANTIGRAVITY_SCHEDULE_TEAM_SPRINT.md] | lang=en
- "archive_antigravity_schedule_team_sprint_what_not_to_do": "WHAT NOT TO DO" | kind=entity | source=specs/archive/ANTIGRAVITY_SCHEDULE_TEAM_SPRINT.md:L406 | neighbors=[Read this entire document before writin…] | lang=en
- "archive_antigravity_scheduling_spec_data_requirements_from_backend_claude_code_handles_these": "DATA REQUIREMENTS FROM BACKEND (Claude Code handles these)" | kind=entity | source=specs/archive/ANTIGRAVITY_SCHEDULING_SPEC.md:L227 | neighbors=[dispatch should never wonder what to do…] | lang=en
- "archive_antigravity_scheduling_spec_live_table_status_filter_update": "LIVE TABLE — STATUS FILTER UPDATE" | kind=entity | source=specs/archive/ANTIGRAVITY_SCHEDULING_SPEC.md:L262 | neighbors=[dispatch should never wonder what to do…] | lang=en
- "archive_antigravity_scheduling_spec_principles": "PRINCIPLES" | kind=entity | source=specs/archive/ANTIGRAVITY_SCHEDULING_SPEC.md:L8 | neighbors=[dispatch should never wonder what to do…] | lang=en
- "archive_antigravity_scheduling_spec_replaces_the_current_dispatch_section_in_jobdetailmodal_tsx": "Replaces the current Dispatch section in JobDetailModal.tsx" | kind=entity | source=specs/archive/ANTIGRAVITY_SCHEDULING_SPEC.md:L2 | neighbors=[ANTIGRAVITY_SCHEDULING_SPEC.md] | lang=en
- "archive_antigravity_scheduling_spec_scheduling_workflow_spec_job_detail_modal": "SCHEDULING WORKFLOW SPEC — Job Detail Modal" | kind=entity | source=specs/archive/ANTIGRAVITY_SCHEDULING_SPEC.md:L1 | neighbors=[ANTIGRAVITY_SCHEDULING_SPEC.md] | lang=en
- "archive_antigravity_scheduling_spec_state_in_progress_complete": "STATE: In Progress / Complete" | kind=entity | source=specs/archive/ANTIGRAVITY_SCHEDULING_SPEC.md:L210 | neighbors=[DISPATCH SECTION — FULL REDESIGN] | lang=en
- "archive_antigravity_scheduling_spec_state_new": "STATE: New" | kind=entity | source=specs/archive/ANTIGRAVITY_SCHEDULING_SPEC.md:L54 | neighbors=[DISPATCH SECTION — FULL REDESIGN] | lang=en
- "archive_antigravity_scheduling_spec_state_pte_required": "STATE: PTE Required" | kind=entity | source=specs/archive/ANTIGRAVITY_SCHEDULING_SPEC.md:L170 | neighbors=[DISPATCH SECTION — FULL REDESIGN] | lang=en
- "archive_antigravity_scheduling_spec_state_ready_to_schedule": "STATE: Ready to Schedule" | kind=entity | source=specs/archive/ANTIGRAVITY_SCHEDULING_SPEC.md:L79 | neighbors=[DISPATCH SECTION — FULL REDESIGN] | lang=en
- "archive_antigravity_scheduling_spec_state_scheduled": "STATE: Scheduled" | kind=entity | source=specs/archive/ANTIGRAVITY_SCHEDULING_SPEC.md:L190 | neighbors=[DISPATCH SECTION — FULL REDESIGN] | lang=en
- "archive_antigravity_scheduling_spec_status_set_replace_all_existing_statuses": "STATUS SET (replace all existing statuses)" | kind=entity | source=specs/archive/ANTIGRAVITY_SCHEDULING_SPEC.md:L18 | neighbors=[dispatch should never wonder what to do…] | lang=en
- "archive_antigravity_scheduling_spec_this_is_the_core_dispatcher_workflow_every_interaction_must_feel_inevitable": "This is the core dispatcher workflow. Every interaction must feel inevitable —" | kind=entity | source=specs/archive/ANTIGRAVITY_SCHEDULING_SPEC.md:L3 | neighbors=[ANTIGRAVITY_SCHEDULING_SPEC.md] | lang=en
- "archive_antigravity_scheduling_spec_wc_code_auto_classification_backend_claude_code": "WC CODE AUTO-CLASSIFICATION (backend — Claude Code)" | kind=entity | source=specs/archive/ANTIGRAVITY_SCHEDULING_SPEC.md:L248 | neighbors=[dispatch should never wonder what to do…] | lang=en
- "archive_antigravity_scheduling_spec_what_to_remove_from_current_modal": "WHAT TO REMOVE FROM CURRENT MODAL" | kind=entity | source=specs/archive/ANTIGRAVITY_SCHEDULING_SPEC.md:L217 | neighbors=[dispatch should never wonder what to do…] | lang=en
- "archive_antigravity_scope_expansion_spec": "ANTIGRAVITY_SCOPE_EXPANSION_SPEC.md" | kind=entity | source=specs/archive/ANTIGRAVITY_SCOPE_EXPANSION_SPEC.md:L1 | neighbors=[ANTIGRAVITY SPRINT — Job Scope Expansio…] | lang=en
- "archive_antigravity_scope_expansion_spec_4a_handlesave_failure_line_211": "4a — `handleSave` failure (line ~211):" | kind=entity | source=specs/archive/ANTIGRAVITY_SCOPE_EXPANSION_SPEC.md:L250 | neighbors=[PART 4 — Fix remaining `alert()` and `c…] | lang=pt
- "archive_antigravity_scope_expansion_spec_4b_handlearchive_confirm_failure_lines_216_220": "4b — `handleArchive` confirm + failure (lines ~216–220):" | kind=entity | source=specs/archive/ANTIGRAVITY_SCOPE_EXPANSION_SPEC.md:L258 | neighbors=[PART 4 — Fix remaining `alert()` and `c…] | lang=en
- "archive_antigravity_scope_expansion_spec_4c_docgen_confirm_and_alert_calls_lines_255_261": "4c — DocGen `confirm()` and `alert()` calls (lines ~255–261):" | kind=entity | source=specs/archive/ANTIGRAVITY_SCOPE_EXPANSION_SPEC.md:L305 | neighbors=[PART 4 — Fix remaining `alert()` and `c…] | lang=en

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\PTOW\1_APT_Central_Command\.graphify\description-instructions\batch-156.json

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
