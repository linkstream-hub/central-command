# Node Description Batch 59 of 412

Graphify is running in assistant/skill mode (no API key). You are the host
assistant (Claude Code / Codex / Gemini CLI). Read the prompt below and write
your JSON answer to the answer file.

## Prompt

You are documenting nodes in a knowledge graph.
For each entry below, write ONE concise factual plain-language sentence
describing what it is or does. Use only the provided context.
For a code symbol (kind=code-symbol — a function, class, or constant),
describe what the function/symbol does based on its name, source location
and neighbors — e.g. "Resolves the configured ontology profile from graphify.yaml.".
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

- "api_reference_field_auth": "Field Auth" | kind=entity | source=docs/api/reference.md:L169 | neighbors=[Domain Details, POST `/api/field/auth/change-pin`, POST `/api/field/auth/login`] | lang=en
- "api_reference_field_internal": "Field — Internal" | kind=entity | source=docs/api/reference.md:L437 | neighbors=[Domain Details, GET `/api/field/compliance`, GET `/api/field/live`] | lang=en
- "api_reference_gas_proxy": "GAS Proxy" | kind=entity | source=docs/api/reference.md:L930 | neighbors=[Domain Details, POST `/api/gas`, POST `/api/gas/validate-token`] | lang=en
- "api_reference_job_comments": "Job Comments" | kind=entity | source=docs/api/reference.md:L766 | neighbors=[Domain Details, GET `/api/job-comments/[jobId]`, POST `/api/job-comments/[jobId]`] | lang=en
- "api_reference_push_notifications": "Push Notifications" | kind=entity | source=docs/api/reference.md:L838 | neighbors=[Domain Details, POST `/api/push/send`, POST `/api/push/subscribe`] | lang=en
- "api_reference_schedule": "Schedule" | kind=entity | source=docs/api/reference.md:L632 | neighbors=[Domain Details, GET `/api/schedule/today`, POST `/api/schedule/lock-and-send`] | lang=en
- "api_reference_utility": "Utility" | kind=entity | source=docs/api/reference.md:L1020 | neighbors=[Domain Details, GET `/api/health`, GET `/api/weather`] | lang=en
- "api_routes_gate": "API Routes Gate" | kind=entity | source=tech-pwa/src/app/api/CLAUDE.md | neighbors=[ADR-001 (Dual Auth Architecture), Auth Split Gate, RULES.md §DUAL AUTH] | lang=en
- "app_providers": "Providers.tsx" | kind=code-symbol | source=tech-pwa/src/app/Providers.tsx:L1 | neighbors=[layout.tsx, Providers(), 01bf641 Initial commit — clean history] | lang=en
- "aptmaintenanceinc_com_prompts_cursor_design_brief": "Design brief" | kind=entity | source=design-extract-output/aptmaintenanceinc-com-prompts/cursor.md:L1 | neighbors=[cursor.md, Sections, Tokens] | lang=en
- "archive_antigravity_activity_feed_spec_task_refocus_activityfeed_to_action_items_only": "TASK — Refocus ActivityFeed to action items only" | kind=entity | source=specs/archive/ANTIGRAVITY_ACTIVITY_FEED_SPEC.md:L17 | neighbors=[File: tech-pwa/src/components/dashboard…, What was added:, What was removed and why:] | lang=en
- "archive_antigravity_auth_serverside_passcodes": "ANTIGRAVITY_AUTH_SERVERSIDE_PASSCODES.md" | kind=entity | source=specs/archive/ANTIGRAVITY_AUTH_SERVERSIDE_PASSCODES.md:L1 | neighbors=[ANTIGRAVITY SPRINT — SERVER-SIDE PASSCO…, Date: April 23, 2026, Owner: Claude Code | Executor: Antigrav…] | lang=en
- "archive_antigravity_backend_security_brief_change_3_error_alerting_at_entry_points": "CHANGE 3 — Error Alerting at Entry Points" | kind=entity | source=specs/archive/ANTIGRAVITY_BACKEND_SECURITY_BRIEF.md:L109 | neighbors=[ANTIGRAVITY BACKEND SECURITY BRIEF, Pattern to apply, Why] | lang=en
- "archive_antigravity_billing_team_sprint": "ANTIGRAVITY_BILLING_TEAM_SPRINT.md" | kind=entity | source=specs/archive/ANTIGRAVITY_BILLING_TEAM_SPRINT.md:L1 | neighbors=[ANTIGRAVITY SPRINT — BILLING PAGE + TEA…, Date: April 23, 2026, Owner: Claude Code | Executor: Antigrav…] | lang=en
- "archive_antigravity_billing_team_sprint_task_1_rename_jobs_billing_in_sidebar_create_billing_route": "TASK 1 — Rename \"Jobs\" → \"Billing\" in Sidebar + Create /billing Route" | kind=entity | source=specs/archive/ANTIGRAVITY_BILLING_TEAM_SPRINT.md:L13 | neighbors=[Date: April 23, 2026, 1a. AppSidebar.tsx — `tech-pwa/src/comp…, 1b. Create `tech-pwa/src/app/billing/pa…] | lang=en
- "archive_antigravity_billing_team_sprint_task_2_fix_team_page_weekly_job_counts_per_tech": "TASK 2 — Fix Team Page: Weekly Job Counts Per Tech" | kind=entity | source=specs/archive/ANTIGRAVITY_BILLING_TEAM_SPRINT.md:L101 | neighbors=[Date: April 23, 2026, Exact changes to `team/page.tsx`:, File: `tech-pwa/src/app/team/page.tsx`] | lang=it
- "archive_antigravity_break_compliance_spec_part_f_cc2_0_compliance_badge_on_tech_availability_cards": "Part F: CC2.0 — Compliance Badge on Tech Availability Cards" | kind=entity | source=specs/archive/ANTIGRAVITY_BREAK_COMPLIANCE_SPEC.md:L450 | neighbors=[FEATURE 2 — CA Break Compliance Foundat…, `tech-pwa/src/app/live/page.tsx`, `tech-pwa/src/components/dashboard/Tech…] | lang=en
- "archive_antigravity_calendar_spec_backend_dashboardapi_gs": "BACKEND — DashboardAPI.gs" | kind=entity | source=specs/archive/ANTIGRAVITY_CALENDAR_SPEC.md:L38 | neighbors=[Step 1: Wire the action in `doPost`, Step 2: Add `getCalendarDataDA` function, Sprint owner: Antigravity | Spec author…] | lang=en
- "archive_antigravity_calendar_spec_sidebar_route_guard": "SIDEBAR & ROUTE GUARD" | kind=entity | source=specs/archive/ANTIGRAVITY_CALENDAR_SPEC.md:L197 | neighbors=[AppSidebar.tsx, RouteGuard.tsx, Sprint owner: Antigravity | Spec author…] | lang=en
- "archive_antigravity_correction_brief": "ANTIGRAVITY_CORRECTION_BRIEF.md" | kind=entity | source=specs/archive/ANTIGRAVITY_CORRECTION_BRIEF.md:L1 | neighbors=[ANTIGRAVITY CORRECTION BRIEF, Every issue below is a regression from …, Priority: CRITICAL — fix these before a…] | lang=en
- "archive_antigravity_crew_scheduling_spec_replace_with": "Replace with:" | kind=entity | source=specs/archive/ANTIGRAVITY_CREW_SCHEDULING_SPEC.md:L37 | neighbors=[SPEC 1 — DashboardAPI.gs: getWeekSchedu…, SPEC 2 — DashboardAPI.gs: getTodaySched…, SPEC 3 — TechPWA.gs: isTechMatch] | lang=en
- "archive_antigravity_crew_scheduling_spec_spec_5_display_confirmed_state_in_schedulingdispatch": "SPEC 5 — Display: Confirmed State in SchedulingDispatch" | kind=entity | source=specs/archive/ANTIGRAVITY_CREW_SCHEDULING_SPEC.md:L151 | neighbors=[File: `tech-pwa/src/components/dashboar…, Find (in the confirmed/scheduled displa…, Sprint 33 | Spec author: Claude Code | …] | lang=en
- "archive_antigravity_dashboard_redesign_prompt": "ANTIGRAVITY_DASHBOARD_REDESIGN_PROMPT.md" | kind=entity | source=specs/archive/ANTIGRAVITY_DASHBOARD_REDESIGN_PROMPT.md:L1 | neighbors=[Antigravity Build Brief — Central Comma…, APT CENTRAL COMMAND — FULL PLATFORM RED…, Last updated: April 18, 2026] | lang=en
- "archive_antigravity_dashboard_redesign_prompt_app_structure": "APP STRUCTURE" | kind=entity | source=specs/archive/ANTIGRAVITY_DASHBOARD_REDESIGN_PROMPT.md:L151 | neighbors=[Global Elements (always present), Persistent Sidebar (left, 56px collapse…, Last updated: April 18, 2026] | lang=en
- "archive_antigravity_dispatch_excellence_spec_4a_changes_to_jobqueuetable_tsx": "4A. Changes to `JobQueueTable.tsx`" | kind=entity | source=specs/archive/ANTIGRAVITY_DISPATCH_EXCELLENCE_SPEC.md:L722 | neighbors=[Add `MapPin` and `Phone` to the lucide-…, In the Address & Details column div (th…, Feature 4 — Actionable Row Enhancements] | lang=en
- "archive_antigravity_dispatch_excellence_spec_feature_1_keyboard_navigation": "Feature 1 — Keyboard Navigation" | kind=entity | source=specs/archive/ANTIGRAVITY_DISPATCH_EXCELLENCE_SPEC.md:L40 | neighbors=[ANTIGRAVITY_DISPATCH_EXCELLENCE_SPEC, 1A. Changes to `live/page.tsx`, 1B. Changes to `JobQueueTable.tsx`] | lang=en
- "archive_antigravity_dispatch_excellence_spec_feature_2_kanban_view": "Feature 2 — Kanban View" | kind=entity | source=specs/archive/ANTIGRAVITY_DISPATCH_EXCELLENCE_SPEC.md:L183 | neighbors=[ANTIGRAVITY_DISPATCH_EXCELLENCE_SPEC, 2A. Changes to `live/page.tsx`, 2B. New file: `tech-pwa/src/components/…] | lang=en
- "archive_antigravity_dispatch_polish_spec_feature_3_mark_ready_quick_action_on_new_queue_rows": "FEATURE 3 — \"Mark Ready\" Quick Action on New Queue Rows" | kind=entity | source=specs/archive/ANTIGRAVITY_DISPATCH_POLISH_SPEC.md:L92 | neighbors=[ANTIGRAVITY SPRINT — Dispatch Polish, What it does, Where to add it] | lang=en
- "archive_antigravity_dispatch_polish_spec_what_it_does": "What it does" | kind=entity | source=specs/archive/ANTIGRAVITY_DISPATCH_POLISH_SPEC.md:L11 | neighbors=[FEATURE 1 — Job Staleness Badges on Que…, FEATURE 2 — Trainee Solo-Assignment War…, FEATURE 3 — "Mark Ready" Quick Action o…] | lang=en
- "archive_antigravity_feedback_spec_deployment": "DEPLOYMENT" | kind=entity | source=specs/archive/ANTIGRAVITY_FEEDBACK_SPEC.md:L330 | neighbors=[ANTIGRAVITY SPRINT — Dispatcher Feedbac…, DashboardAPI.gs — deploy via dashboard-…, Tech PWA — Vercel auto-deploys on push …] | lang=en
- "archive_antigravity_hr_permissions_and_deploy": "ANTIGRAVITY_HR_PERMISSIONS_AND_DEPLOY.md" | kind=entity | source=specs/archive/ANTIGRAVITY_HR_PERMISSIONS_AND_DEPLOY.md:L1 | neighbors=[ANTIGRAVITY SPRINT — HR PERMISSIONS + P…, Date: April 23, 2026, Owner: Claude Code | Executor: Antigrav…] | lang=en
- "archive_antigravity_hr_permissions_and_deploy_task_1_hr_role_gets_compliance_billing_access": "TASK 1 — HR role gets Compliance + Billing access" | kind=entity | source=specs/archive/ANTIGRAVITY_HR_PERMISSIONS_AND_DEPLOY.md:L7 | neighbors=[Date: April 23, 2026, File: `tech-pwa/src/components/dashboar…, Verification:] | lang=en
- "archive_antigravity_kill_sync_spec_deployment": "DEPLOYMENT" | kind=entity | source=specs/archive/ANTIGRAVITY_KILL_SYNC_SPEC.md:L82 | neighbors=[ANTIGRAVITY SPRINT — Kill the Schedulin…, DashboardAPI.gs — deploy via dashboard-…, ScheduleMiner.js — deploy via root clas…] | lang=en
- "archive_antigravity_logo_spec_change_1_login_page": "CHANGE 1 — Login Page" | kind=entity | source=specs/archive/ANTIGRAVITY_LOGO_SPEC.md:L17 | neighbors=[File: `tech-pwa/src/app/login/page.tsx`, Find and REPLACE:, Sprint 32.2 | Spec author: Claude Code …] | lang=en
- "archive_antigravity_nav_rbac_sprint": "ANTIGRAVITY_NAV_RBAC_SPRINT.md" | kind=entity | source=specs/archive/ANTIGRAVITY_NAV_RBAC_SPRINT.md:L1 | neighbors=[ANTIGRAVITY SPRINT — Navigation Restruc…, Priority: HIGH — Management-facing stru…, Read every section before writing code.…] | lang=en
- "archive_antigravity_notifications_spec_backend_dashboardapi_gs": "BACKEND — DashboardAPI.gs" | kind=entity | source=specs/archive/ANTIGRAVITY_NOTIFICATIONS_SPEC.md:L31 | neighbors=[Step 1: Wire action in `doPost`, Step 2: Add `getNotificationsDA`, Sprint owner: Antigravity | Spec author…] | lang=en
- "archive_antigravity_project_overview_apt_central_command_capabilities_roadmap": "APT Central Command: Capabilities & Roadmap" | kind=entity | source=specs/archive/ANTIGRAVITY_PROJECT_OVERVIEW.md:L1 | neighbors=[ANTIGRAVITY_PROJECT_OVERVIEW.md, 1. Current Capabilities (The Foundation), 2. Technical Roadmap (The Future)] | lang=en
- "archive_antigravity_queue_tab_spec": "ANTIGRAVITY_QUEUE_TAB_SPEC.md" | kind=entity | source=specs/archive/ANTIGRAVITY_QUEUE_TAB_SPEC.md:L1 | neighbors=[QUEUE TAB STRUCTURE — IMPLEMENTATION SP…, Read every line. Do not freelance., Replaces the current two-layer filter s…] | lang=en
- "archive_antigravity_queue_tab_spec_file_1_src_app_live_page_tsx": "FILE 1: `src/app/live/page.tsx`" | kind=entity | source=specs/archive/ANTIGRAVITY_QUEUE_TAB_SPEC.md:L39 | neighbors=[CHANGE — line 127:, DELETE these exactly:, Read every line. Do not freelance.] | lang=en
- "archive_antigravity_rbac_schedule_fix_spec_file_tech_pwa_src_app_schedule_page_tsx": "File: `tech-pwa/src/app/schedule/page.tsx`" | kind=entity | source=specs/archive/ANTIGRAVITY_RBAC_SCHEDULE_FIX_SPEC.md:L208 | neighbors=[6a — Today's date must use Pacific time…, 6b — Month pill: only one active at a t…, FIX 6 — Schedule Page: Date Window + Mo…] | lang=en

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\PTOW\1_APT_Central_Command\.graphify\description-instructions\batch-058.json

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
