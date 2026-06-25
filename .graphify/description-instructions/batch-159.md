# Node Description Batch 160 of 412

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

- "archive_antigravity_spec_architect_correction_spec_what_changed_vs_shipped_code": "What Changed vs. Shipped Code" | kind=entity | source=specs/archive/ANTIGRAVITY_SPEC_ARCHITECT_CORRECTION_SPEC.md:L234 | neighbors=[Sprint 31.1 | Spec author: Claude Code …] | lang=en
- "archive_antigravity_spec_architect_correction_spec_what_must_not_change": "What Must NOT Change" | kind=entity | source=specs/archive/ANTIGRAVITY_SPEC_ARCHITECT_CORRECTION_SPEC.md:L247 | neighbors=[Sprint 31.1 | Spec author: Claude Code …] | lang=en
- "archive_antigravity_sprint32_schedule_spec_also_add_a_header_row_spacer_to_droppableschedulecell_so_the_slot_grid_aligns_with_the_tech_lane_header": "Also: add a header row spacer to `DroppableScheduleCell` so the slot grid align…" | kind=entity | source=specs/archive/ANTIGRAVITY_SPRINT32_SCHEDULE_SPEC.md:L146 | neighbors=[SPEC 2 — Visible Time Slot Grid] | lang=en
- "archive_antigravity_sprint32_schedule_spec_also_in_droppableschedulecell_find_and_replace": "Also in `DroppableScheduleCell`, find and REPLACE:" | kind=entity | source=specs/archive/ANTIGRAVITY_SPRINT32_SCHEDULE_SPEC.md:L132 | neighbors=[SPEC 2 — Visible Time Slot Grid] | lang=en
- "archive_antigravity_sprint32_schedule_spec_context": "Context" | kind=entity | source=specs/archive/ANTIGRAVITY_SPRINT32_SCHEDULE_SPEC.md:L168 | neighbors=[SPEC 3 — Inline Estimate Editing on Sid…] | lang=en
- "archive_antigravity_sprint32_schedule_spec_file_tech_pwa_src_app_schedule_page_tsx": "File: `tech-pwa/src/app/schedule/page.tsx`" | kind=entity | source=specs/archive/ANTIGRAVITY_SPRINT32_SCHEDULE_SPEC.md:L265 | neighbors=[Step 2 — Wire `onEstimateChange` in sch…] | lang=en
- "archive_antigravity_sprint32_schedule_spec_find_the_closing_section_of_the_draggablejobcard_return_jsx_locate_where_address_category_is_shown_and_find_the_est_hours_display_it_will_look_something_like": "Find the closing section of the DraggableJobCard return JSX — locate where addr…" | kind=entity | source=specs/archive/ANTIGRAVITY_SPRINT32_SCHEDULE_SPEC.md:L209 | neighbors=[Step 1 — Update `DraggableJobCard` inte…] | lang=en
- "archive_antigravity_sprint32_schedule_spec_inside_draggablejobcard_add_state_after_the_usedraggable_hook": "Inside `DraggableJobCard`, add state (after the useDraggable hook):" | kind=entity | source=specs/archive/ANTIGRAVITY_SPRINT32_SCHEDULE_SPEC.md:L202 | neighbors=[Step 1 — Update `DraggableJobCard` inte…] | lang=en
- "archive_antigravity_sprint32_schedule_spec_overview": "Overview" | kind=entity | source=specs/archive/ANTIGRAVITY_SPRINT32_SCHEDULE_SPEC.md:L7 | neighbors=[Sprint 32 | Spec author: Claude Code | …] | lang=en
- "archive_antigravity_sprint32_schedule_spec_replace_with": "Replace with:" | kind=entity | source=specs/archive/ANTIGRAVITY_SPRINT32_SCHEDULE_SPEC.md:L66 | neighbors=[SPEC 1 — Compact Tech Lane Header] | lang=en
- "archive_antigravity_sprint32_schedule_spec_schedule_grid_overhaul_inline_estimate_editing": "Schedule Grid Overhaul + Inline Estimate Editing" | kind=entity | source=specs/archive/ANTIGRAVITY_SPRINT32_SCHEDULE_SPEC.md:L2 | neighbors=[ANTIGRAVITY_SPRINT32_SCHEDULE_SPEC.md] | lang=en
- "archive_antigravity_sprint32_schedule_spec_typescript_check": "TypeScript Check" | kind=entity | source=specs/archive/ANTIGRAVITY_SPRINT32_SCHEDULE_SPEC.md:L298 | neighbors=[Sprint 32 | Spec author: Claude Code | …] | lang=en
- "archive_antigravity_sprint32_schedule_spec_verification": "Verification" | kind=entity | source=specs/archive/ANTIGRAVITY_SPRINT32_SCHEDULE_SPEC.md:L304 | neighbors=[Sprint 32 | Spec author: Claude Code | …] | lang=en
- "archive_antigravity_sprint32_schedule_spec_what_must_not_change": "What Must NOT Change" | kind=entity | source=specs/archive/ANTIGRAVITY_SPRINT32_SCHEDULE_SPEC.md:L289 | neighbors=[Sprint 32 | Spec author: Claude Code | …] | lang=en
- "archive_antigravity_sprint32_schedule_spec_what_to_find_and_delete": "What to find and DELETE:" | kind=entity | source=specs/archive/ANTIGRAVITY_SPRINT32_SCHEDULE_SPEC.md:L24 | neighbors=[SPEC 1 — Compact Tech Lane Header] | lang=en
- "archive_antigravity_sprint32_schedule_spec_what_to_find_and_replace_in_droppabletimeslot": "What to find and REPLACE in `DroppableTimeSlot`:" | kind=entity | source=specs/archive/ANTIGRAVITY_SPRINT32_SCHEDULE_SPEC.md:L112 | neighbors=[SPEC 2 — Visible Time Slot Grid] | lang=en
- "archive_antigravity_tech_assignment_fix_spec": "ANTIGRAVITY_TECH_ASSIGNMENT_FIX_SPEC.md" | kind=entity | source=specs/archive/ANTIGRAVITY_TECH_ASSIGNMENT_FIX_SPEC.md:L1 | neighbors=[ANTIGRAVITY SPEC — Tech Assignment Fix] | lang=en
- "archive_antigravity_tech_assignment_fix_spec_1_techpwa_gs_istechmatch_currently_at_line_621": "1. `TechPWA.gs` — `isTechMatch` (currently at line 621)" | kind=entity | source=specs/archive/ANTIGRAVITY_TECH_ASSIGNMENT_FIX_SPEC.md:L40 | neighbors=[Exact Changes] | lang=en
- "archive_antigravity_tech_assignment_fix_spec_2_techpwa_gs_gettechjobs_call_site_currently_at_line_310": "2. `TechPWA.gs` — `getTechJobs` call site (currently at line 310)" | kind=entity | source=specs/archive/ANTIGRAVITY_TECH_ASSIGNMENT_FIX_SPEC.md:L73 | neighbors=[Exact Changes] | lang=en
- "archive_antigravity_tech_assignment_fix_spec_3_dashboard_api_dashboardapi_gs_gettechrowbyname_currently_at_line_2291": "3. `dashboard-api/DashboardAPI.gs` — `getTechRowByName` (currently at line 2291)" | kind=entity | source=specs/archive/ANTIGRAVITY_TECH_ASSIGNMENT_FIX_SPEC.md:L89 | neighbors=[Exact Changes] | lang=en
- "archive_antigravity_tech_assignment_fix_spec_context": "Context" | kind=entity | source=specs/archive/ANTIGRAVITY_TECH_ASSIGNMENT_FIX_SPEC.md:L8 | neighbors=[ANTIGRAVITY SPEC — Tech Assignment Fix] | lang=en
- "archive_antigravity_tech_assignment_fix_spec_dashboardapi_gs_separate_project": "DashboardAPI.gs (separate project)" | kind=entity | source=specs/archive/ANTIGRAVITY_TECH_ASSIGNMENT_FIX_SPEC.md:L142 | neighbors=[Deploy Steps] | lang=en
- "archive_antigravity_tech_assignment_fix_spec_files_to_change": "Files to Change" | kind=entity | source=specs/archive/ANTIGRAVITY_TECH_ASSIGNMENT_FIX_SPEC.md:L28 | neighbors=[ANTIGRAVITY SPEC — Tech Assignment Fix] | lang=en
- "archive_antigravity_tech_assignment_fix_spec_techpwa_gs_root_project_also_pushes_code_js": "TechPWA.gs (root project — also pushes Code.js)" | kind=entity | source=specs/archive/ANTIGRAVITY_TECH_ASSIGNMENT_FIX_SPEC.md:L135 | neighbors=[Deploy Steps] | lang=en
- "archive_antigravity_tech_assignment_fix_spec_verification_steps": "Verification Steps" | kind=entity | source=specs/archive/ANTIGRAVITY_TECH_ASSIGNMENT_FIX_SPEC.md:L151 | neighbors=[ANTIGRAVITY SPEC — Tech Assignment Fix] | lang=en
- "archive_antigravity_tech_assignment_fix_spec_what_must_not_be_changed": "What Must NOT Be Changed" | kind=entity | source=specs/archive/ANTIGRAVITY_TECH_ASSIGNMENT_FIX_SPEC.md:L162 | neighbors=[ANTIGRAVITY SPEC — Tech Assignment Fix] | lang=en
- "archive_antigravity_tech_assignment_fix_spec_what_to_keep_unchanged": "What to Keep Unchanged" | kind=entity | source=specs/archive/ANTIGRAVITY_TECH_ASSIGNMENT_FIX_SPEC.md:L124 | neighbors=[ANTIGRAVITY SPEC — Tech Assignment Fix] | lang=en
- "archive_antigravity_tech_date_modals_1a_add_techprofilemodal": "1a — Add TechProfileModal" | kind=entity | source=specs/archive/ANTIGRAVITY_TECH_DATE_MODALS.md:L195 | neighbors=[PART 1 — SchedulePageComponents.tsx] | lang=pt
- "archive_antigravity_tech_date_modals_1b_add_datedetailmodal": "1b — Add DateDetailModal" | kind=entity | source=specs/archive/ANTIGRAVITY_TECH_DATE_MODALS.md:L365 | neighbors=[PART 1 — SchedulePageComponents.tsx] | lang=en
- "archive_antigravity_tech_date_modals_1c_add_onclick_to_techlaneheader": "1c — Add onClick to TechLaneHeader" | kind=entity | source=specs/archive/ANTIGRAVITY_TECH_DATE_MODALS.md:L486 | neighbors=[PART 1 — SchedulePageComponents.tsx] | lang=en
- "archive_antigravity_tech_date_modals_2a_add_state_for_modals": "2a — Add state for modals" | kind=entity | source=specs/archive/ANTIGRAVITY_TECH_DATE_MODALS.md:L536 | neighbors=[PART 2 — schedule/page.tsx] | lang=en
- "archive_antigravity_tech_date_modals_2b_import_the_new_modals": "2b — Import the new modals" | kind=entity | source=specs/archive/ANTIGRAVITY_TECH_DATE_MODALS.md:L547 | neighbors=[PART 2 — schedule/page.tsx] | lang=en
- "archive_antigravity_tech_date_modals_2c_wire_techlaneheader_onclick": "2c — Wire TechLaneHeader onClick" | kind=entity | source=specs/archive/ANTIGRAVITY_TECH_DATE_MODALS.md:L571 | neighbors=[PART 2 — schedule/page.tsx] | lang=en
- "archive_antigravity_tech_date_modals_2d_wire_date_column_headers_to_datedetailmodal": "2d — Wire date column headers to DateDetailModal" | kind=entity | source=specs/archive/ANTIGRAVITY_TECH_DATE_MODALS.md:L592 | neighbors=[PART 2 — schedule/page.tsx] | lang=en
- "archive_antigravity_tech_date_modals_2e_add_modals_to_jsx_before_the_closing_dashboardlayout": "2e — Add modals to JSX (before the closing `</DashboardLayout>`)" | kind=entity | source=specs/archive/ANTIGRAVITY_TECH_DATE_MODALS.md:L616 | neighbors=[PART 2 — schedule/page.tsx] | lang=en
- "archive_antigravity_tech_date_modals_2f_css_variable_fix_on_chevron_nav_container_visibility_fix": "2f — CSS variable fix on chevron nav container (visibility fix)" | kind=entity | source=specs/archive/ANTIGRAVITY_TECH_DATE_MODALS.md:L639 | neighbors=[PART 2 — schedule/page.tsx] | lang=en
- "archive_antigravity_tech_date_modals_3a_add_selecteddate_state_and_jobdetailmodal": "3a — Add selectedDate state and JobDetailModal" | kind=entity | source=specs/archive/ANTIGRAVITY_TECH_DATE_MODALS.md:L651 | neighbors=[PART 3 — weekly-schedule/page.tsx] | lang=en
- "archive_antigravity_tech_date_modals_3b_add_imports": "3b — Add imports" | kind=entity | source=specs/archive/ANTIGRAVITY_TECH_DATE_MODALS.md:L661 | neighbors=[PART 3 — weekly-schedule/page.tsx] | lang=en
- "archive_antigravity_tech_date_modals_3c_wire_day_column_headers_to_datedetailmodal": "3c — Wire day column headers to DateDetailModal" | kind=entity | source=specs/archive/ANTIGRAVITY_TECH_DATE_MODALS.md:L672 | neighbors=[PART 3 — weekly-schedule/page.tsx] | lang=en
- "archive_antigravity_tech_date_modals_3d_wire_job_cards_to_jobdetailmodal": "3d — Wire job cards to JobDetailModal" | kind=entity | source=specs/archive/ANTIGRAVITY_TECH_DATE_MODALS.md:L702 | neighbors=[PART 3 — weekly-schedule/page.tsx] | lang=en

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\PTOW\1_APT_Central_Command\.graphify\description-instructions\batch-159.json

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
