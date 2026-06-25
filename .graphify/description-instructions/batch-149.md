# Node Description Batch 150 of 412

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

- "archive_antigravity_google_auth_spec_new_file_1_tech_pwa_src_lib_permissions_ts": "NEW FILE 1 — `tech-pwa/src/lib/permissions.ts`" | kind=entity | source=specs/archive/ANTIGRAVITY_GOOGLE_AUTH_SPEC.md:L123 | neighbors=[ANTIGRAVITY SPEC — Google OAuth + Modul…] | lang=en
- "archive_antigravity_google_auth_spec_new_file_2_tech_pwa_src_lib_auth_options_ts": "NEW FILE 2 — `tech-pwa/src/lib/auth-options.ts`" | kind=entity | source=specs/archive/ANTIGRAVITY_GOOGLE_AUTH_SPEC.md:L170 | neighbors=[ANTIGRAVITY SPEC — Google OAuth + Modul…] | lang=en
- "archive_antigravity_google_auth_spec_new_file_3_tech_pwa_src_app_api_auth_nextauth_route_ts": "NEW FILE 3 — `tech-pwa/src/app/api/auth/[...nextauth]/route.ts`" | kind=entity | source=specs/archive/ANTIGRAVITY_GOOGLE_AUTH_SPEC.md:L232 | neighbors=[ANTIGRAVITY SPEC — Google OAuth + Modul…] | lang=en
- "archive_antigravity_google_auth_spec_new_file_4_tech_pwa_src_types_next_auth_d_ts": "NEW FILE 4 — `tech-pwa/src/types/next-auth.d.ts`" | kind=entity | source=specs/archive/ANTIGRAVITY_GOOGLE_AUTH_SPEC.md:L244 | neighbors=[ANTIGRAVITY SPEC — Google OAuth + Modul…] | lang=en
- "archive_antigravity_google_auth_spec_relationship_to_antigravity_rbac_schedule_fix_spec_md": "Relationship to ANTIGRAVITY_RBAC_SCHEDULE_FIX_SPEC.md" | kind=entity | source=specs/archive/ANTIGRAVITY_GOOGLE_AUTH_SPEC.md:L22 | neighbors=[CONTEXT] | lang=en
- "archive_antigravity_google_auth_spec_sequencing_note_for_ag": "SEQUENCING NOTE FOR AG" | kind=entity | source=specs/archive/ANTIGRAVITY_GOOGLE_AUTH_SPEC.md:L745 | neighbors=[ANTIGRAVITY SPEC — Google OAuth + Modul…] | lang=en
- "archive_antigravity_google_auth_spec_staff_roster_final_permission_matrix": "STAFF ROSTER — FINAL PERMISSION MATRIX" | kind=entity | source=specs/archive/ANTIGRAVITY_GOOGLE_AUTH_SPEC.md:L32 | neighbors=[ANTIGRAVITY SPEC — Google OAuth + Modul…] | lang=en
- "archive_antigravity_google_auth_spec_step_1_add_getstaffpermissions_to_the_publicactions_array": "Step 1: Add `getStaffPermissions` to the `publicActions` array" | kind=entity | source=specs/archive/ANTIGRAVITY_GOOGLE_AUTH_SPEC.md:L579 | neighbors=[MODIFIED FILE — `dashboard-api/Dashboar…] | lang=en
- "archive_antigravity_google_auth_spec_step_1_google_cloud_console": "Step 1 — Google Cloud Console" | kind=entity | source=specs/archive/ANTIGRAVITY_GOOGLE_AUTH_SPEC.md:L88 | neighbors=[BRANDON'S SETUP STEPS (before AG builds)] | lang=en
- "archive_antigravity_google_auth_spec_step_1_replace_imports_at_top": "Step 1: Replace imports at top" | kind=entity | source=specs/archive/ANTIGRAVITY_GOOGLE_AUTH_SPEC.md:L521 | neighbors=[MODIFIED FILE — `tech-pwa/src/component…] | lang=en
- "archive_antigravity_google_auth_spec_step_2_add_the_da_sr_column_index_constant": "Step 2: Add the `DA_SR` column index constant" | kind=entity | source=specs/archive/ANTIGRAVITY_GOOGLE_AUTH_SPEC.md:L590 | neighbors=[MODIFIED FILE — `dashboard-api/Dashboar…] | lang=en
- "archive_antigravity_google_auth_spec_step_2_remove_the_local_route_permissions_constant_entirely_lines_that_define_it": "Step 2: Remove the local `ROUTE_PERMISSIONS` constant entirely (lines that defi…" | kind=entity | source=specs/archive/ANTIGRAVITY_GOOGLE_AUTH_SPEC.md:L529 | neighbors=[MODIFIED FILE — `tech-pwa/src/component…] | lang=en
- "archive_antigravity_google_auth_spec_step_2_vercel_environment_variables": "Step 2 — Vercel Environment Variables" | kind=entity | source=specs/archive/ANTIGRAVITY_GOOGLE_AUTH_SPEC.md:L101 | neighbors=[BRANDON'S SETUP STEPS (before AG builds)] | lang=en
- "archive_antigravity_google_auth_spec_step_3_add_the_getstaffpermissionsda_function": "Step 3: Add the `getStaffPermissionsDA` function" | kind=entity | source=specs/archive/ANTIGRAVITY_GOOGLE_AUTH_SPEC.md:L607 | neighbors=[MODIFIED FILE — `dashboard-api/Dashboar…] | lang=en
- "archive_antigravity_google_auth_spec_step_3_replace_the_nav_items_array_with_exactly_this": "Step 3: Replace the `NAV_ITEMS` array with exactly this" | kind=entity | source=specs/archive/ANTIGRAVITY_GOOGLE_AUTH_SPEC.md:L531 | neighbors=[MODIFIED FILE — `tech-pwa/src/component…] | lang=en
- "archive_antigravity_google_auth_spec_step_3_staff_roster_tab": "Step 3 — Staff Roster Tab" | kind=entity | source=specs/archive/ANTIGRAVITY_GOOGLE_AUTH_SPEC.md:L110 | neighbors=[BRANDON'S SETUP STEPS (before AG builds)] | lang=en
- "archive_antigravity_google_auth_spec_step_4_replace_the_visibleitems_computation_and_session_reads": "Step 4: Replace the `visibleItems` computation and session reads" | kind=entity | source=specs/archive/ANTIGRAVITY_GOOGLE_AUTH_SPEC.md:L550 | neighbors=[MODIFIED FILE — `tech-pwa/src/component…] | lang=en
- "archive_antigravity_google_auth_spec_step_4_wire_getstaffpermissions_in_dopost": "Step 4: Wire `getStaffPermissions` in `doPost`" | kind=entity | source=specs/archive/ANTIGRAVITY_GOOGLE_AUTH_SPEC.md:L648 | neighbors=[MODIFIED FILE — `dashboard-api/Dashboar…] | lang=en
- "archive_antigravity_google_auth_spec_step_5_replace_the_user_display_in_the_sidebar_footer": "Step 5: Replace the user display in the sidebar footer" | kind=entity | source=specs/archive/ANTIGRAVITY_GOOGLE_AUTH_SPEC.md:L565 | neighbors=[MODIFIED FILE — `tech-pwa/src/component…] | lang=en
- "archive_antigravity_google_auth_spec_verification_steps": "VERIFICATION STEPS" | kind=entity | source=specs/archive/ANTIGRAVITY_GOOGLE_AUTH_SPEC.md:L708 | neighbors=[ANTIGRAVITY SPEC — Google OAuth + Modul…] | lang=en
- "archive_antigravity_google_auth_spec_what_exists_now": "What exists now" | kind=entity | source=specs/archive/ANTIGRAVITY_GOOGLE_AUTH_SPEC.md:L12 | neighbors=[CONTEXT] | lang=en
- "archive_antigravity_google_auth_spec_what_this_spec_builds": "What this spec builds" | kind=entity | source=specs/archive/ANTIGRAVITY_GOOGLE_AUTH_SPEC.md:L19 | neighbors=[CONTEXT] | lang=en
- "archive_antigravity_google_auth_spec_wrap_existing_app_with_session_provider": "WRAP EXISTING APP WITH SESSION PROVIDER" | kind=entity | source=specs/archive/ANTIGRAVITY_GOOGLE_AUTH_SPEC.md:L669 | neighbors=[ANTIGRAVITY SPEC — Google OAuth + Modul…] | lang=en
- "archive_antigravity_hr_permissions_and_deploy_2a_code_js_lead_parsing_v73_rmname_fallback_fix": "2a. Code.js — Lead Parsing v73 (rmName fallback fix)" | kind=entity | source=specs/archive/ANTIGRAVITY_HR_PERMISSIONS_AND_DEPLOY.md:L36 | neighbors=[TASK 2 — Deploy pending backend fixes (…] | lang=pt
- "archive_antigravity_hr_permissions_and_deploy_2b_dashboardapi_gs_v14_active_tech_filter_fix": "2b. DashboardAPI.gs — v14 (Active tech filter fix)" | kind=entity | source=specs/archive/ANTIGRAVITY_HR_PERMISSIONS_AND_DEPLOY.md:L44 | neighbors=[TASK 2 — Deploy pending backend fixes (…] | lang=en
- "archive_antigravity_hr_permissions_and_deploy_antigravity_sprint_hr_permissions_pending_deploys": "ANTIGRAVITY SPRINT — HR PERMISSIONS + PENDING DEPLOYS" | kind=entity | source=specs/archive/ANTIGRAVITY_HR_PERMISSIONS_AND_DEPLOY.md:L1 | neighbors=[ANTIGRAVITY_HR_PERMISSIONS_AND_DEPLOY.md] | lang=en
- "archive_antigravity_hr_permissions_and_deploy_commit_message_after_all_three_tasks": "COMMIT MESSAGE (after all three tasks):" | kind=entity | source=specs/archive/ANTIGRAVITY_HR_PERMISSIONS_AND_DEPLOY.md:L64 | neighbors=[Date: April 23, 2026] | lang=en
- "archive_antigravity_hr_permissions_and_deploy_file_tech_pwa_src_components_dashboard_appsidebar_tsx": "File: `tech-pwa/src/components/dashboard/AppSidebar.tsx`" | kind=entity | source=specs/archive/ANTIGRAVITY_HR_PERMISSIONS_AND_DEPLOY.md:L9 | neighbors=[TASK 1 — HR role gets Compliance + Bill…] | lang=en
- "archive_antigravity_hr_permissions_and_deploy_owner_claude_code_executor_antigravity": "Owner: Claude Code | Executor: Antigravity" | kind=entity | source=specs/archive/ANTIGRAVITY_HR_PERMISSIONS_AND_DEPLOY.md:L2 | neighbors=[ANTIGRAVITY_HR_PERMISSIONS_AND_DEPLOY.md] | lang=en
- "archive_antigravity_hr_permissions_and_deploy_task_3_implement_live_feed_action_item_spec": "TASK 3 — Implement Live Feed action item spec" | kind=entity | source=specs/archive/ANTIGRAVITY_HR_PERMISSIONS_AND_DEPLOY.md:L57 | neighbors=[Date: April 23, 2026] | lang=en
- "archive_antigravity_i18n_spec": "ANTIGRAVITY_I18N_SPEC.md" | kind=entity | source=specs/archive/ANTIGRAVITY_I18N_SPEC.md:L1 | neighbors=[ANTIGRAVITY_I18N_SPEC] | lang=en
- "archive_antigravity_i18n_spec_1a_new_file_src_lib_i18n_en_ts": "1A. New file: `src/lib/i18n/en.ts`" | kind=entity | source=specs/archive/ANTIGRAVITY_I18N_SPEC.md:L50 | neighbors=[Step 1 — i18n Infrastructure] | lang=en
- "archive_antigravity_i18n_spec_1b_new_file_src_lib_i18n_es_ts": "1B. New file: `src/lib/i18n/es.ts`" | kind=entity | source=specs/archive/ANTIGRAVITY_I18N_SPEC.md:L192 | neighbors=[Step 1 — i18n Infrastructure] | lang=es
- "archive_antigravity_i18n_spec_1c_new_file_src_lib_i18n_index_ts": "1C. New file: `src/lib/i18n/index.ts`" | kind=entity | source=specs/archive/ANTIGRAVITY_I18N_SPEC.md:L317 | neighbors=[Step 1 — i18n Infrastructure] | lang=en
- "archive_antigravity_i18n_spec_2a_changes_to_src_app_layout_tsx": "2A. Changes to `src/app/layout.tsx`" | kind=entity | source=specs/archive/ANTIGRAVITY_I18N_SPEC.md:L373 | neighbors=[Step 2 — Wrap Root Layout] | lang=en
- "archive_antigravity_i18n_spec_3a_changes_to_src_app_jobs_page_tsx": "3A. Changes to `src/app/jobs/page.tsx`" | kind=entity | source=specs/archive/ANTIGRAVITY_I18N_SPEC.md:L395 | neighbors=[Step 3 — Language Toggle Component] | lang=en
- "archive_antigravity_i18n_spec_day_of_week_labels_calendar_page": "Day-of-week labels (calendar page)" | kind=entity | source=specs/archive/ANTIGRAVITY_I18N_SPEC.md:L471 | neighbors=[Step 4 — Replace Strings in Each Page] | lang=en
- "archive_antigravity_i18n_spec_do_not_submit_as_complete_until": "Do NOT submit as complete until:" | kind=entity | source=specs/archive/ANTIGRAVITY_I18N_SPEC.md:L553 | neighbors=[ANTIGRAVITY_I18N_SPEC] | lang=pt
- "archive_antigravity_i18n_spec_do_not_translate": "Do NOT translate:" | kind=entity | source=specs/archive/ANTIGRAVITY_I18N_SPEC.md:L434 | neighbors=[Step 4 — Replace Strings in Each Page] | lang=pt
- "archive_antigravity_i18n_spec_files_you_must_change": "Files You Must Change" | kind=entity | source=specs/archive/ANTIGRAVITY_I18N_SPEC.md:L23 | neighbors=[ANTIGRAVITY_I18N_SPEC] | lang=en

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\PTOW\1_APT_Central_Command\.graphify\description-instructions\batch-149.json

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
