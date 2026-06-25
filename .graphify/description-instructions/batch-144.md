# Node Description Batch 145 of 412

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

- "archive_antigravity_comms_spec_comment_fetch_function_add_near_fetchthread": "Comment fetch function (add near `fetchThread`):" | kind=entity | source=specs/archive/ANTIGRAVITY_COMMS_SPEC.md:L201 | neighbors=[FRONTEND — JobDetailModal.tsx] | lang=en
- "archive_antigravity_comms_spec_commentbubble_sub_component_add_at_the_bottom_of_jobdetailmodal_tsx_outside_the_main_export": "`CommentBubble` sub-component (add at the bottom of JobDetailModal.tsx, outside…" | kind=entity | source=specs/archive/ANTIGRAVITY_COMMS_SPEC.md:L318 | neighbors=[FRONTEND — JobDetailModal.tsx] | lang=en
- "archive_antigravity_comms_spec_do_not_touch": "Do NOT touch" | kind=entity | source=specs/archive/ANTIGRAVITY_COMMS_SPEC.md:L27 | neighbors=[WHAT TO BUILD] | lang=pt
- "archive_antigravity_comms_spec_files_to_edit": "Files to edit" | kind=entity | source=specs/archive/ANTIGRAVITY_COMMS_SPEC.md:L22 | neighbors=[WHAT TO BUILD] | lang=en
- "archive_antigravity_comms_spec_frontend_dashboard_api_ts_types": "FRONTEND — dashboard-api.ts types" | kind=entity | source=specs/archive/ANTIGRAVITY_COMMS_SPEC.md:L162 | neighbors=[Sprint owner: Antigravity | Spec author…] | lang=en
- "archive_antigravity_comms_spec_import_addition": "Import addition:" | kind=entity | source=specs/archive/ANTIGRAVITY_COMMS_SPEC.md:L195 | neighbors=[FRONTEND — JobDetailModal.tsx] | lang=en
- "archive_antigravity_comms_spec_internal_communications_phase_1_job_card_threads": "Internal Communications Phase 1 — Job Card Threads" | kind=entity | source=specs/archive/ANTIGRAVITY_COMMS_SPEC.md:L2 | neighbors=[ANTIGRAVITY_COMMS_SPEC.md] | lang=en
- "archive_antigravity_comms_spec_internal_thread_section_in_jsx": "Internal Thread section in JSX" | kind=entity | source=specs/archive/ANTIGRAVITY_COMMS_SPEC.md:L262 | neighbors=[FRONTEND — JobDetailModal.tsx] | lang=en
- "archive_antigravity_comms_spec_new_files": "New files" | kind=entity | source=specs/archive/ANTIGRAVITY_COMMS_SPEC.md:L19 | neighbors=[WHAT TO BUILD] | lang=en
- "archive_antigravity_comms_spec_new_state_variables_add_to_the_existing_state_block_near_line_59": "New state variables (add to the existing state block near line 59):" | kind=entity | source=specs/archive/ANTIGRAVITY_COMMS_SPEC.md:L186 | neighbors=[FRONTEND — JobDetailModal.tsx] | lang=en
- "archive_antigravity_comms_spec_overview": "OVERVIEW" | kind=entity | source=specs/archive/ANTIGRAVITY_COMMS_SPEC.md:L7 | neighbors=[Sprint owner: Antigravity | Spec author…] | lang=en
- "archive_antigravity_comms_spec_post_comment_handler_add_near_handlesendreply": "Post comment handler (add near `handleSendReply`):" | kind=entity | source=specs/archive/ANTIGRAVITY_COMMS_SPEC.md:L239 | neighbors=[FRONTEND — JobDetailModal.tsx] | lang=en
- "archive_antigravity_comms_spec_sheet_schema_jobcomments_tab": "SHEET SCHEMA — `JobComments` tab" | kind=entity | source=specs/archive/ANTIGRAVITY_COMMS_SPEC.md:L34 | neighbors=[Sprint owner: Antigravity | Spec author…] | lang=en
- "archive_antigravity_comms_spec_step_1_wire_actions_in_dopost": "Step 1: Wire actions in `doPost`" | kind=entity | source=specs/archive/ANTIGRAVITY_COMMS_SPEC.md:L54 | neighbors=[BACKEND — DashboardAPI.gs] | lang=en
- "archive_antigravity_comms_spec_step_2_add_sheet_helper": "Step 2: Add sheet helper" | kind=entity | source=specs/archive/ANTIGRAVITY_COMMS_SPEC.md:L62 | neighbors=[BACKEND — DashboardAPI.gs] | lang=en
- "archive_antigravity_comms_spec_step_3_add_getjobcommentsda": "Step 3: Add `getJobCommentsDA`" | kind=entity | source=specs/archive/ANTIGRAVITY_COMMS_SPEC.md:L79 | neighbors=[BACKEND — DashboardAPI.gs] | lang=en
- "archive_antigravity_comms_spec_step_4_add_addjobcommentda": "Step 4: Add `addJobCommentDA`" | kind=entity | source=specs/archive/ANTIGRAVITY_COMMS_SPEC.md:L123 | neighbors=[BACKEND — DashboardAPI.gs] | lang=en
- "archive_antigravity_comms_spec_trigger_fetch_on_modal_open_in_the_useeffect_that_depends_on_job_fetchthread": "Trigger fetch on modal open (in the `useEffect` that depends on `[job, fetchThr…" | kind=entity | source=specs/archive/ANTIGRAVITY_COMMS_SPEC.md:L217 | neighbors=[FRONTEND — JobDetailModal.tsx] | lang=en
- "archive_antigravity_comms_spec_verification_steps": "VERIFICATION STEPS" | kind=entity | source=specs/archive/ANTIGRAVITY_COMMS_SPEC.md:L371 | neighbors=[Sprint owner: Antigravity | Spec author…] | lang=en
- "archive_antigravity_correction_brief_2a_frontend_computes_wrong_week_on_sundays": "2a — Frontend computes wrong week on Sundays" | kind=entity | source=specs/archive/ANTIGRAVITY_CORRECTION_BRIEF.md:L52 | neighbors=[BUG 2 — Schedule Page: Wrong week shown…] | lang=pt
- "archive_antigravity_correction_brief_2b_tech_rows_show_unscheduled_with_no_names": "2b — Tech rows show \"UNSCHEDULED\" with no names" | kind=entity | source=specs/archive/ANTIGRAVITY_CORRECTION_BRIEF.md:L62 | neighbors=[BUG 2 — Schedule Page: Wrong week shown…] | lang=en
- "archive_antigravity_correction_brief_2c_all_cells_show_no_jobs": "2c — All cells show \"NO JOBS\"" | kind=entity | source=specs/archive/ANTIGRAVITY_CORRECTION_BRIEF.md:L66 | neighbors=[BUG 2 — Schedule Page: Wrong week shown…] | lang=en
- "archive_antigravity_correction_brief_antigravity_correction_brief": "ANTIGRAVITY CORRECTION BRIEF" | kind=entity | source=specs/archive/ANTIGRAVITY_CORRECTION_BRIEF.md:L1 | neighbors=[ANTIGRAVITY_CORRECTION_BRIEF.md] | lang=en
- "archive_antigravity_correction_brief_bug_1_team_page_all_cards_show_blank_names_and_unscheduled": "BUG 1 — Team Page: All cards show blank names and \"UNSCHEDULED\"" | kind=entity | source=specs/archive/ANTIGRAVITY_CORRECTION_BRIEF.md:L7 | neighbors=[Every issue below is a regression from …] | lang=en
- "archive_antigravity_correction_brief_bug_3_job_modal_left_panel_shows_contact_name_only_no_email_thread": "BUG 3 — Job Modal: Left panel shows contact name only, no email thread" | kind=entity | source=specs/archive/ANTIGRAVITY_CORRECTION_BRIEF.md:L84 | neighbors=[Every issue below is a regression from …] | lang=en
- "archive_antigravity_correction_brief_bug_4_messages_page_disconnected_from_jobs_unknown_contact_for_known_senders": "BUG 4 — Messages Page: Disconnected from jobs, \"Unknown Contact\" for known send…" | kind=entity | source=specs/archive/ANTIGRAVITY_CORRECTION_BRIEF.md:L115 | neighbors=[Every issue below is a regression from …] | lang=en
- "archive_antigravity_correction_brief_bug_5_dispatcher_notes_shows_internal_sync_metadata": "BUG 5 — Dispatcher Notes shows internal sync metadata" | kind=entity | source=specs/archive/ANTIGRAVITY_CORRECTION_BRIEF.md:L141 | neighbors=[Every issue below is a regression from …] | lang=en
- "archive_antigravity_correction_brief_deployment_note": "DEPLOYMENT NOTE" | kind=entity | source=specs/archive/ANTIGRAVITY_CORRECTION_BRIEF.md:L149 | neighbors=[Every issue below is a regression from …] | lang=en
- "archive_antigravity_correction_brief_priority_critical_fix_these_before_any_new_features": "Priority: CRITICAL — fix these before any new features." | kind=entity | source=specs/archive/ANTIGRAVITY_CORRECTION_BRIEF.md:L2 | neighbors=[ANTIGRAVITY_CORRECTION_BRIEF.md] | lang=en
- "archive_antigravity_crew_scheduling_spec_add_after_that_line": "Add AFTER that line:" | kind=entity | source=specs/archive/ANTIGRAVITY_CREW_SCHEDULING_SPEC.md:L134 | neighbors=[SPEC 4 — Display: Crew Badge on Job Car…] | lang=en
- "archive_antigravity_crew_scheduling_spec_context": "Context" | kind=entity | source=specs/archive/ANTIGRAVITY_CREW_SCHEDULING_SPEC.md:L7 | neighbors=[Sprint 33 | Spec author: Claude Code | …] | lang=en
- "archive_antigravity_crew_scheduling_spec_crew_multi_tech_scheduling_backend_display_wiring": "Crew / Multi-Tech Scheduling — Backend + Display Wiring" | kind=entity | source=specs/archive/ANTIGRAVITY_CREW_SCHEDULING_SPEC.md:L2 | neighbors=[ANTIGRAVITY_CREW_SCHEDULING_SPEC.md] | lang=en
- "archive_antigravity_crew_scheduling_spec_file_tech_pwa_src_components_dashboard_schedulepagecomponents_tsx": "File: `tech-pwa/src/components/dashboard/SchedulePageComponents.tsx`" | kind=entity | source=specs/archive/ANTIGRAVITY_CREW_SCHEDULING_SPEC.md:L124 | neighbors=[SPEC 4 — Display: Crew Badge on Job Car…] | lang=en
- "archive_antigravity_crew_scheduling_spec_file_tech_pwa_src_components_dashboard_schedulingdispatch_tsx": "File: `tech-pwa/src/components/dashboard/SchedulingDispatch.tsx`" | kind=entity | source=specs/archive/ANTIGRAVITY_CREW_SCHEDULING_SPEC.md:L153 | neighbors=[SPEC 5 — Display: Confirmed State in Sc…] | lang=en
- "archive_antigravity_crew_scheduling_spec_file_techpwa_gs": "File: `TechPWA.gs`" | kind=entity | source=specs/archive/ANTIGRAVITY_CREW_SCHEDULING_SPEC.md:L94 | neighbors=[SPEC 3 — TechPWA.gs: isTechMatch] | lang=en
- "archive_antigravity_crew_scheduling_spec_find": "Find:" | kind=entity | source=specs/archive/ANTIGRAVITY_CREW_SCHEDULING_SPEC.md:L96 | neighbors=[SPEC 3 — TechPWA.gs: isTechMatch] | lang=en
- "archive_antigravity_crew_scheduling_spec_find_in_gettodayschedule": "Find in `getTodaySchedule`:" | kind=entity | source=specs/archive/ANTIGRAVITY_CREW_SCHEDULING_SPEC.md:L61 | neighbors=[SPEC 2 — DashboardAPI.gs: getTodaySched…] | lang=en
- "archive_antigravity_crew_scheduling_spec_find_in_getweekschedule": "Find in `getWeekSchedule`:" | kind=entity | source=specs/archive/ANTIGRAVITY_CREW_SCHEDULING_SPEC.md:L26 | neighbors=[SPEC 1 — DashboardAPI.gs: getWeekSchedu…] | lang=en
- "archive_antigravity_crew_scheduling_spec_find_in_the_confirmed_scheduled_display_section": "Find (in the confirmed/scheduled display section):" | kind=entity | source=specs/archive/ANTIGRAVITY_CREW_SCHEDULING_SPEC.md:L157 | neighbors=[SPEC 5 — Display: Confirmed State in Sc…] | lang=en
- "archive_antigravity_crew_scheduling_spec_find_the_address_category_display_block_it_will_look_similar_to": "Find (the address/category display block — it will look similar to):" | kind=entity | source=specs/archive/ANTIGRAVITY_CREW_SCHEDULING_SPEC.md:L128 | neighbors=[SPEC 4 — Display: Crew Badge on Job Car…] | lang=en

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\PTOW\1_APT_Central_Command\.graphify\description-instructions\batch-144.json

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
