# Node Description Batch 148 of 412

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

- "archive_antigravity_dispatch_excellence_spec_actionable_row_live": "Actionable Row (`/live`)" | kind=entity | source=specs/archive/ANTIGRAVITY_DISPATCH_EXCELLENCE_SPEC.md:L811 | neighbors=[Verification Steps] | lang=en
- "archive_antigravity_dispatch_excellence_spec_add_kanbanboard_import_at_the_top_of_the_file_after_the_existing_imports": "Add KanbanBoard import at the top of the file, after the existing imports:" | kind=entity | source=specs/archive/ANTIGRAVITY_DISPATCH_EXCELLENCE_SPEC.md:L192 | neighbors=[2A. Changes to `live/page.tsx`] | lang=en
- "archive_antigravity_dispatch_excellence_spec_add_mappin_and_phone_to_the_lucide_react_import": "Add `MapPin` and `Phone` to the lucide-react import:" | kind=entity | source=specs/archive/ANTIGRAVITY_DISPATCH_EXCELLENCE_SPEC.md:L724 | neighbors=[4A. Changes to `JobQueueTable.tsx`] | lang=en
- "archive_antigravity_dispatch_excellence_spec_add_radix_dropdownmenu_import_at_the_top": "Add Radix DropdownMenu import at the top:" | kind=entity | source=specs/archive/ANTIGRAVITY_DISPATCH_EXCELLENCE_SPEC.md:L560 | neighbors=[3A. Changes to `JobQueueTable.tsx`] | lang=en
- "archive_antigravity_dispatch_excellence_spec_add_search_to_the_lucide_react_import_in_schedule_page_tsx_it_may_already_be_there_verify_first_only_add_if_missing": "Add `Search` to the lucide-react import in `schedule/page.tsx` (it may already …" | kind=entity | source=specs/archive/ANTIGRAVITY_DISPATCH_EXCELLENCE_SPEC.md:L851 | neighbors=[5A. Changes to `tech-pwa/src/app/schedu…] | lang=en
- "archive_antigravity_dispatch_excellence_spec_add_sidebarsearch_state_after_existing_state_declarations": "Add `sidebarSearch` state after existing state declarations:" | kind=entity | source=specs/archive/ANTIGRAVITY_DISPATCH_EXCELLENCE_SPEC.md:L826 | neighbors=[5A. Changes to `tech-pwa/src/app/schedu…] | lang=en
- "archive_antigravity_dispatch_excellence_spec_add_state_for_manual_job_creation_modal": "Add state for manual job creation modal:" | kind=entity | source=specs/archive/ANTIGRAVITY_DISPATCH_EXCELLENCE_SPEC.md:L1175 | neighbors=[6D. Changes to `tech-pwa/src/app/schedu…] | lang=en
- "archive_antigravity_dispatch_excellence_spec_add_the_handleinlinestatuschange_function_inside_the_component_after_togglesort": "Add the `handleInlineStatusChange` function inside the component (after `toggle…" | kind=entity | source=specs/archive/ANTIGRAVITY_DISPATCH_EXCELLENCE_SPEC.md:L587 | neighbors=[3A. Changes to `JobQueueTable.tsx`] | lang=en
- "archive_antigravity_dispatch_excellence_spec_add_the_modal_render_at_the_bottom_of_the_page_jsx_before_the_closing_dashboardlayout": "Add the modal render at the bottom of the page JSX (before the closing `</Dashb…" | kind=entity | source=specs/archive/ANTIGRAVITY_DISPATCH_EXCELLENCE_SPEC.md:L1197 | neighbors=[6D. Changes to `tech-pwa/src/app/schedu…] | lang=en
- "archive_antigravity_dispatch_excellence_spec_add_the_status_transitions_map_as_a_module_level_constant_add_it_near_the_other_constants_at_the_top_after_type_map": "Add the status transitions map as a module-level constant (add it near the othe…" | kind=entity | source=specs/archive/ANTIGRAVITY_DISPATCH_EXCELLENCE_SPEC.md:L572 | neighbors=[3A. Changes to `JobQueueTable.tsx`] | lang=en
- "archive_antigravity_dispatch_excellence_spec_add_to_droppabletimeslot_function_signature": "Add to `DroppableTimeSlot` function signature:" | kind=entity | source=specs/archive/ANTIGRAVITY_DISPATCH_EXCELLENCE_SPEC.md:L1147 | neighbors=[6C. Changes to `tech-pwa/src/components…] | lang=en
- "archive_antigravity_dispatch_excellence_spec_add_to_droppabletimeslotprops_interface_after_ispast": "Add to `DroppableTimeSlotProps` interface (after `isPast`):" | kind=entity | source=specs/archive/ANTIGRAVITY_DISPATCH_EXCELLENCE_SPEC.md:L1142 | neighbors=[6C. Changes to `tech-pwa/src/components…] | lang=en
- "archive_antigravity_dispatch_excellence_spec_add_to_function_signature_destructuring_after_onjobstatuschange": "Add to function signature destructuring (after `onJobStatusChange`):" | kind=entity | source=specs/archive/ANTIGRAVITY_DISPATCH_EXCELLENCE_SPEC.md:L107 | neighbors=[1B. Changes to `JobQueueTable.tsx`] | lang=en
- "archive_antigravity_dispatch_excellence_spec_add_to_imports_line_1_9": "Add to imports (line 1–9):" | kind=entity | source=specs/archive/ANTIGRAVITY_DISPATCH_EXCELLENCE_SPEC.md:L92 | neighbors=[1B. Changes to `JobQueueTable.tsx`] | lang=en
- "archive_antigravity_dispatch_excellence_spec_add_to_jobqueuetableprops_interface_after_onjobstatuschange_line": "Add to `JobQueueTableProps` interface (after `onJobStatusChange` line):" | kind=entity | source=specs/archive/ANTIGRAVITY_DISPATCH_EXCELLENCE_SPEC.md:L102 | neighbors=[1B. Changes to `JobQueueTable.tsx`] | lang=en
- "archive_antigravity_dispatch_excellence_spec_add_viewmode_state_after_existing_state_declarations": "Add `viewMode` state after existing state declarations:" | kind=entity | source=specs/archive/ANTIGRAVITY_DISPATCH_EXCELLENCE_SPEC.md:L187 | neighbors=[2A. Changes to `live/page.tsx`] | lang=en
- "archive_antigravity_dispatch_excellence_spec_after_existing_state_declarations_after_line_30_const_statustab_setstatustab_usestate_statustab_all_add": "After existing state declarations (after line 30, `const [statusTab, setStatusT…" | kind=entity | source=specs/archive/ANTIGRAVITY_DISPATCH_EXCELLENCE_SPEC.md:L53 | neighbors=[1A. Changes to `live/page.tsx`] | lang=en
- "archive_antigravity_dispatch_excellence_spec_after_the_existing_state_declarations_showarchived_now_add": "After the existing state declarations (`showArchived`, `now`), add:" | kind=entity | source=specs/archive/ANTIGRAVITY_DISPATCH_EXCELLENCE_SPEC.md:L112 | neighbors=[1B. Changes to `JobQueueTable.tsx`] | lang=en
- "archive_antigravity_dispatch_excellence_spec_after_the_togglesort_function_add_these_two_new_effects": "After the `toggleSort` function, add these two new effects:" | kind=entity | source=specs/archive/ANTIGRAVITY_DISPATCH_EXCELLENCE_SPEC.md:L118 | neighbors=[1B. Changes to `JobQueueTable.tsx`] | lang=en
- "archive_antigravity_dispatch_excellence_spec_do_not_submit_as_complete_until": "Do NOT submit as complete until:" | kind=entity | source=specs/archive/ANTIGRAVITY_DISPATCH_EXCELLENCE_SPEC.md:L1309 | neighbors=[ANTIGRAVITY_DISPATCH_EXCELLENCE_SPEC] | lang=pt
- "archive_antigravity_dispatch_excellence_spec_files_you_must_change": "Files You Must Change" | kind=entity | source=specs/archive/ANTIGRAVITY_DISPATCH_EXCELLENCE_SPEC.md:L18 | neighbors=[ANTIGRAVITY_DISPATCH_EXCELLENCE_SPEC] | lang=en
- "archive_antigravity_dispatch_excellence_spec_files_you_must_not_change": "Files You Must NOT Change" | kind=entity | source=specs/archive/ANTIGRAVITY_DISPATCH_EXCELLENCE_SPEC.md:L26 | neighbors=[ANTIGRAVITY_DISPATCH_EXCELLENCE_SPEC] | lang=en
- "archive_antigravity_dispatch_excellence_spec_filter_the_unscheduled_jobs_list_find_where_unscheduledjobs_is_used_in_the_sidebar_map_and_replace_it_with": "Filter the unscheduled jobs list. Find where `unscheduledJobs` is used in the s…" | kind=entity | source=specs/archive/ANTIGRAVITY_DISPATCH_EXCELLENCE_SPEC.md:L853 | neighbors=[5A. Changes to `tech-pwa/src/app/schedu…] | lang=en
- "archive_antigravity_dispatch_excellence_spec_find_the_sidebar_search_placeholder_currently_a_static_input_or_no_search_at_all_in_the_sidebar_panel_locate_the_section_that_renders_draggable_job_cards_it_maps_over_jobs_filtered_by_unscheduledjobs_add_a_search_input_immediately_above_the_job_cards_list": "Find the sidebar search placeholder (currently a static input or no search at a…" | kind=entity | source=specs/archive/ANTIGRAVITY_DISPATCH_EXCELLENCE_SPEC.md:L831 | neighbors=[5A. Changes to `tech-pwa/src/app/schedu…] | lang=en
- "archive_antigravity_dispatch_excellence_spec_import_line_currently_line_3": "Import line (currently line 3):" | kind=entity | source=specs/archive/ANTIGRAVITY_DISPATCH_EXCELLENCE_SPEC.md:L44 | neighbors=[1A. Changes to `live/page.tsx`] | lang=en
- "archive_antigravity_dispatch_excellence_spec_import_manualjobcreatemodal": "Import `ManualJobCreateModal`:" | kind=entity | source=specs/archive/ANTIGRAVITY_DISPATCH_EXCELLENCE_SPEC.md:L1170 | neighbors=[6D. Changes to `tech-pwa/src/app/schedu…] | lang=en
- "archive_antigravity_dispatch_excellence_spec_in_the_address_details_column_div_the_flex_1_min_w_0_px_4_div_currently_lines_335_355_find_the_closing_div_of_the_outermost_address_div_the_current_structure_ends_with": "In the Address & Details column div (the `flex-1 min-w-0 px-4` div, currently l…" | kind=entity | source=specs/archive/ANTIGRAVITY_DISPATCH_EXCELLENCE_SPEC.md:L729 | neighbors=[4A. Changes to `JobQueueTable.tsx`] | lang=en
- "archive_antigravity_dispatch_excellence_spec_in_the_schedule_grid_render_where_droppableschedulecell_is_rendered_per_tech_per_day_pass": "In the schedule grid render (where `DroppableScheduleCell` is rendered per tech…" | kind=entity | source=specs/archive/ANTIGRAVITY_DISPATCH_EXCELLENCE_SPEC.md:L1192 | neighbors=[6D. Changes to `tech-pwa/src/app/schedu…] | lang=en
- "archive_antigravity_dispatch_excellence_spec_inline_status_change_live": "Inline Status Change (`/live`)" | kind=entity | source=specs/archive/ANTIGRAVITY_DISPATCH_EXCELLENCE_SPEC.md:L805 | neighbors=[Verification Steps] | lang=en
- "archive_antigravity_dispatch_excellence_spec_inside_the_droppabletimeslot_return_add_the_button_inside_the_existing_container_div_after_the_jobs_map": "Inside the `DroppableTimeSlot` return, add the \"+\" button inside the existing c…" | kind=entity | source=specs/archive/ANTIGRAVITY_DISPATCH_EXCELLENCE_SPEC.md:L1152 | neighbors=[6C. Changes to `tech-pwa/src/components…] | lang=en
- "archive_antigravity_dispatch_excellence_spec_job_detail_in_grid_cells_schedule": "Job Detail in Grid Cells (`/schedule`)" | kind=entity | source=specs/archive/ANTIGRAVITY_DISPATCH_EXCELLENCE_SPEC.md:L1302 | neighbors=[Additional Verification Steps (Features…] | lang=en
- "archive_antigravity_dispatch_excellence_spec_jobqueuetable_component_currently_starting_around_line_126_find_this_prop": "`<JobQueueTable>` component (currently starting around line 126). Find this pro…" | kind=entity | source=specs/archive/ANTIGRAVITY_DISPATCH_EXCELLENCE_SPEC.md:L80 | neighbors=[1A. Changes to `live/page.tsx`] | lang=en
- "archive_antigravity_dispatch_excellence_spec_kanban_view_live": "Kanban View (`/live`)" | kind=entity | source=specs/archive/ANTIGRAVITY_DISPATCH_EXCELLENCE_SPEC.md:L796 | neighbors=[Verification Steps] | lang=en
- "archive_antigravity_dispatch_excellence_spec_keyboard_navigation_live": "Keyboard Navigation (`/live`)" | kind=entity | source=specs/archive/ANTIGRAVITY_DISPATCH_EXCELLENCE_SPEC.md:L788 | neighbors=[Verification Steps] | lang=en
- "archive_antigravity_dispatch_excellence_spec_manual_job_creation_schedule": "Manual Job Creation (`/schedule`)" | kind=entity | source=specs/archive/ANTIGRAVITY_DISPATCH_EXCELLENCE_SPEC.md:L1295 | neighbors=[Additional Verification Steps (Features…] | lang=en
- "archive_antigravity_dispatch_excellence_spec_on_each_row_motion_div_element_currently_line_313_318": "On each row `<motion.div>` element (currently line 313–318):" | kind=entity | source=specs/archive/ANTIGRAVITY_DISPATCH_EXCELLENCE_SPEC.md:L155 | neighbors=[1B. Changes to `JobQueueTable.tsx`] | lang=en
- "archive_antigravity_dispatch_excellence_spec_pass_oncreatemanualjob_prop_through_droppableschedulecell_droppabletimeslot_in_droppableschedulecell_thread_the_new_prop": "Pass `onCreateManualJob` prop through `DroppableScheduleCell` → `DroppableTimeS…" | kind=entity | source=specs/archive/ANTIGRAVITY_DISPATCH_EXCELLENCE_SPEC.md:L1180 | neighbors=[6D. Changes to `tech-pwa/src/app/schedu…] | lang=en
- "archive_antigravity_dispatch_excellence_spec_replace_the_existing_loading_table_conditional_render_currently_lines_119_138": "Replace the existing loading/table conditional render (currently lines 119–138):" | kind=entity | source=specs/archive/ANTIGRAVITY_DISPATCH_EXCELLENCE_SPEC.md:L226 | neighbors=[2A. Changes to `live/page.tsx`] | lang=en
- "archive_antigravity_dispatch_excellence_spec_replace_the_status_column_div_currently_lines_363_392": "Replace the status column div (currently lines 363–392):" | kind=entity | source=specs/archive/ANTIGRAVITY_DISPATCH_EXCELLENCE_SPEC.md:L616 | neighbors=[3A. Changes to `JobQueueTable.tsx`] | lang=en
- "archive_antigravity_dispatch_excellence_spec_schedule_sidebar_search_schedule": "Schedule Sidebar Search (`/schedule`)" | kind=entity | source=specs/archive/ANTIGRAVITY_DISPATCH_EXCELLENCE_SPEC.md:L1289 | neighbors=[Additional Verification Steps (Features…] | lang=en

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\PTOW\1_APT_Central_Command\.graphify\description-instructions\batch-147.json

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
