# Node Description Batch 153 of 412

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

- "archive_antigravity_modal_visibility_spec_location_the_button_element_for_each_stakeholder_tab_line_349_353": "Location: the `button` element for each stakeholder tab (~line 349–353)" | kind=entity | source=specs/archive/ANTIGRAVITY_MODAL_VISIBILITY_SPEC.md:L55 | neighbors=[TASK 2 — Add clear active-tab indicator] | lang=en
- "archive_antigravity_modal_visibility_spec_owner_claude_code_executor_antigravity": "Owner: Claude Code | Executor: Antigravity" | kind=entity | source=specs/archive/ANTIGRAVITY_MODAL_VISIBILITY_SPEC.md:L2 | neighbors=[ANTIGRAVITY_MODAL_VISIBILITY_SPEC.md] | lang=en
- "archive_antigravity_modal_visibility_spec_problem": "PROBLEM" | kind=entity | source=specs/archive/ANTIGRAVITY_MODAL_VISIBILITY_SPEC.md:L8 | neighbors=[File: tech-pwa/src/components/dashboard…] | lang=en
- "archive_antigravity_modal_visibility_spec_task_3_light_mode_audit_for_the_entire_modal": "TASK 3 — Light mode audit for the entire modal" | kind=entity | source=specs/archive/ANTIGRAVITY_MODAL_VISIBILITY_SPEC.md:L82 | neighbors=[File: tech-pwa/src/components/dashboard…] | lang=en
- "archive_antigravity_modal_visibility_spec_task_4_reduce_unassigned_visual_noise": "TASK 4 — Reduce \"UNASSIGNED\" visual noise" | kind=entity | source=specs/archive/ANTIGRAVITY_MODAL_VISIBILITY_SPEC.md:L102 | neighbors=[File: tech-pwa/src/components/dashboard…] | lang=en
- "archive_antigravity_modal_visibility_spec_verification": "VERIFICATION" | kind=entity | source=specs/archive/ANTIGRAVITY_MODAL_VISIBILITY_SPEC.md:L128 | neighbors=[File: tech-pwa/src/components/dashboard…] | lang=en
- "archive_antigravity_nav_rbac_sprint_2a_role_definitions": "2A — Role Definitions" | kind=entity | source=specs/archive/ANTIGRAVITY_NAV_RBAC_SPRINT.md:L60 | neighbors=[PART 2 — ROLE-BASED ACCESS CONTROL (RBA…] | lang=pt
- "archive_antigravity_nav_rbac_sprint_2b_role_passcodes": "2B — Role Passcodes" | kind=entity | source=specs/archive/ANTIGRAVITY_NAV_RBAC_SPRINT.md:L74 | neighbors=[PART 2 — ROLE-BASED ACCESS CONTROL (RBA…] | lang=en
- "archive_antigravity_nav_rbac_sprint_2c_auth_storage": "2C — Auth Storage" | kind=entity | source=specs/archive/ANTIGRAVITY_NAV_RBAC_SPRINT.md:L94 | neighbors=[PART 2 — ROLE-BASED ACCESS CONTROL (RBA…] | lang=en
- "archive_antigravity_nav_rbac_sprint_2d_getsession_in_src_lib_auth_ts": "2D — `getSession()` in `src/lib/auth.ts`" | kind=entity | source=specs/archive/ANTIGRAVITY_NAV_RBAC_SPRINT.md:L104 | neighbors=[PART 2 — ROLE-BASED ACCESS CONTROL (RBA…] | lang=en
- "archive_antigravity_nav_rbac_sprint_2e_role_aware_sidebar": "2E — Role-Aware Sidebar" | kind=entity | source=specs/archive/ANTIGRAVITY_NAV_RBAC_SPRINT.md:L121 | neighbors=[PART 2 — ROLE-BASED ACCESS CONTROL (RBA…] | lang=en
- "archive_antigravity_nav_rbac_sprint_2f_route_guard": "2F — Route Guard" | kind=entity | source=specs/archive/ANTIGRAVITY_NAV_RBAC_SPRINT.md:L147 | neighbors=[PART 2 — ROLE-BASED ACCESS CONTROL (RBA…] | lang=en
- "archive_antigravity_nav_rbac_sprint_2g_login_page_update": "2G — Login Page Update" | kind=entity | source=specs/archive/ANTIGRAVITY_NAV_RBAC_SPRINT.md:L180 | neighbors=[PART 2 — ROLE-BASED ACCESS CONTROL (RBA…] | lang=en
- "archive_antigravity_nav_rbac_sprint_antigravity_sprint_navigation_restructure_rbac_full_schedule_view_hr_page": "ANTIGRAVITY SPRINT — Navigation Restructure, RBAC, Full Schedule View, HR Page" | kind=entity | source=specs/archive/ANTIGRAVITY_NAV_RBAC_SPRINT.md:L1 | neighbors=[ANTIGRAVITY_NAV_RBAC_SPRINT.md] | lang=en
- "archive_antigravity_nav_rbac_sprint_data_source": "Data Source" | kind=entity | source=specs/archive/ANTIGRAVITY_NAV_RBAC_SPRINT.md:L219 | neighbors=[PART 3 — FULL WEEKLY SCHEDULE VIEW] | lang=en
- "archive_antigravity_nav_rbac_sprint_deployment": "DEPLOYMENT" | kind=entity | source=specs/archive/ANTIGRAVITY_NAV_RBAC_SPRINT.md:L373 | neighbors=[Read every section before writing code.…] | lang=en
- "archive_antigravity_nav_rbac_sprint_file_src_app_schedule_page_tsx": "File: `src/app/schedule/page.tsx`" | kind=entity | source=specs/archive/ANTIGRAVITY_NAV_RBAC_SPRINT.md:L333 | neighbors=[PART 6 — SCHEDULE PAGE HEADER UPDATE] | lang=en
- "archive_antigravity_nav_rbac_sprint_file_src_components_dashboard_appsidebar_tsx": "File: `src/components/dashboard/AppSidebar.tsx`" | kind=entity | source=specs/archive/ANTIGRAVITY_NAV_RBAC_SPRINT.md:L21 | neighbors=[PART 1 — SIDEBAR NAVIGATION RESTRUCTURE] | lang=en
- "archive_antigravity_nav_rbac_sprint_file_src_components_dashboard_schedulepagecomponents_tsx": "File: `src/components/dashboard/SchedulePageComponents.tsx`" | kind=entity | source=specs/archive/ANTIGRAVITY_NAV_RBAC_SPRINT.md:L257 | neighbors=[PART 4 — DURATION ENFORCEMENT (0-HOUR P…] | lang=en
- "archive_antigravity_nav_rbac_sprint_job_card_simplified_read_only": "Job Card (simplified, read-only)" | kind=entity | source=specs/archive/ANTIGRAVITY_NAV_RBAC_SPRINT.md:L238 | neighbors=[PART 3 — FULL WEEKLY SCHEDULE VIEW] | lang=en
- "archive_antigravity_nav_rbac_sprint_metrics_bar_at_top": "Metrics Bar at Top" | kind=entity | source=specs/archive/ANTIGRAVITY_NAV_RBAC_SPRINT.md:L229 | neighbors=[PART 3 — FULL WEEKLY SCHEDULE VIEW] | lang=en
- "archive_antigravity_nav_rbac_sprint_new_file_src_app_hr_page_tsx": "New File: `src/app/hr/page.tsx`" | kind=entity | source=specs/archive/ANTIGRAVITY_NAV_RBAC_SPRINT.md:L292 | neighbors=[PART 5 — HR PAGE (MVP)] | lang=en
- "archive_antigravity_nav_rbac_sprint_new_file_src_app_weekly_schedule_page_tsx": "New File: `src/app/weekly-schedule/page.tsx`" | kind=entity | source=specs/archive/ANTIGRAVITY_NAV_RBAC_SPRINT.md:L191 | neighbors=[PART 3 — FULL WEEKLY SCHEDULE VIEW] | lang=en
- "archive_antigravity_nav_rbac_sprint_overview": "Overview" | kind=entity | source=specs/archive/ANTIGRAVITY_NAV_RBAC_SPRINT.md:L54 | neighbors=[PART 2 — ROLE-BASED ACCESS CONTROL (RBA…] | lang=en
- "archive_antigravity_nav_rbac_sprint_priority_high_management_facing_structural_changes": "Priority: HIGH — Management-facing structural changes." | kind=entity | source=specs/archive/ANTIGRAVITY_NAV_RBAC_SPRINT.md:L2 | neighbors=[ANTIGRAVITY_NAV_RBAC_SPRINT.md] | lang=en
- "archive_antigravity_nav_rbac_sprint_style": "Style" | kind=entity | source=specs/archive/ANTIGRAVITY_NAV_RBAC_SPRINT.md:L323 | neighbors=[PART 5 — HR PAGE (MVP)] | lang=en
- "archive_antigravity_nav_rbac_sprint_what_claude_code_already_fixed_this_session": "WHAT CLAUDE CODE ALREADY FIXED THIS SESSION" | kind=entity | source=specs/archive/ANTIGRAVITY_NAV_RBAC_SPRINT.md:L7 | neighbors=[Read every section before writing code.…] | lang=en
- "archive_antigravity_nav_rbac_sprint_what_not_to_touch": "WHAT NOT TO TOUCH" | kind=entity | source=specs/archive/ANTIGRAVITY_NAV_RBAC_SPRINT.md:L387 | neighbors=[Read every section before writing code.…] | lang=en
- "archive_antigravity_notifications_spec_do_not_touch": "Do NOT touch" | kind=entity | source=specs/archive/ANTIGRAVITY_NOTIFICATIONS_SPEC.md:L25 | neighbors=[WHAT TO BUILD] | lang=pt
- "archive_antigravity_notifications_spec_fetch_function_add_inside_dashboardlayout": "Fetch function (add inside `DashboardLayout`):" | kind=entity | source=specs/archive/ANTIGRAVITY_NOTIFICATIONS_SPEC.md:L241 | neighbors=[FRONTEND — DashboardLayout.tsx] | lang=en
- "archive_antigravity_notifications_spec_files_to_edit": "Files to edit" | kind=entity | source=specs/archive/ANTIGRAVITY_NOTIFICATIONS_SPEC.md:L20 | neighbors=[WHAT TO BUILD] | lang=en
- "archive_antigravity_notifications_spec_frontend_dashboard_api_ts_types": "FRONTEND — dashboard-api.ts types" | kind=entity | source=specs/archive/ANTIGRAVITY_NOTIFICATIONS_SPEC.md:L197 | neighbors=[Sprint owner: Antigravity | Spec author…] | lang=en
- "archive_antigravity_notifications_spec_import_additions": "Import additions:" | kind=entity | source=specs/archive/ANTIGRAVITY_NOTIFICATIONS_SPEC.md:L232 | neighbors=[FRONTEND — DashboardLayout.tsx] | lang=en
- "archive_antigravity_notifications_spec_new_files": "New files" | kind=entity | source=specs/archive/ANTIGRAVITY_NOTIFICATIONS_SPEC.md:L17 | neighbors=[WHAT TO BUILD] | lang=en
- "archive_antigravity_notifications_spec_new_state_add_inside_dashboardlayout": "New state (add inside `DashboardLayout`):" | kind=entity | source=specs/archive/ANTIGRAVITY_NOTIFICATIONS_SPEC.md:L223 | neighbors=[FRONTEND — DashboardLayout.tsx] | lang=en
- "archive_antigravity_notifications_spec_notification_panel_add_directly_inside_dashboardlayout_return_as_a_sibling_to_main_wrapping_the_whole_layout_in_a_relative_div": "Notification panel (add directly inside `DashboardLayout` return, as a sibling …" | kind=entity | source=specs/archive/ANTIGRAVITY_NOTIFICATIONS_SPEC.md:L293 | neighbors=[FRONTEND — DashboardLayout.tsx] | lang=en
- "archive_antigravity_notifications_spec_notificationitem_sub_component_add_below_dashboardlayout_in_the_same_file": "`NotificationItem` sub-component (add below `DashboardLayout` in the same file):" | kind=entity | source=specs/archive/ANTIGRAVITY_NOTIFICATIONS_SPEC.md:L373 | neighbors=[FRONTEND — DashboardLayout.tsx] | lang=en
- "archive_antigravity_notifications_spec_notifications_center_phase_1_bell_icon_panel_getnotifications_action": "Notifications Center Phase 1 — Bell icon panel + getNotifications action" | kind=entity | source=specs/archive/ANTIGRAVITY_NOTIFICATIONS_SPEC.md:L2 | neighbors=[ANTIGRAVITY_NOTIFICATIONS_SPEC.md] | lang=en
- "archive_antigravity_notifications_spec_overview": "OVERVIEW" | kind=entity | source=specs/archive/ANTIGRAVITY_NOTIFICATIONS_SPEC.md:L7 | neighbors=[Sprint owner: Antigravity | Spec author…] | lang=en
- "archive_antigravity_notifications_spec_replace_the_existing_bell_button_lines_60_65_in_the_current_file": "Replace the existing bell button (lines 60-65 in the current file):" | kind=entity | source=specs/archive/ANTIGRAVITY_NOTIFICATIONS_SPEC.md:L265 | neighbors=[FRONTEND — DashboardLayout.tsx] | lang=en

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\PTOW\1_APT_Central_Command\.graphify\description-instructions\batch-152.json

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
