# Node Description Batch 156 of 412

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

- "archive_antigravity_railway_deploy_spec_3a_deploy_n8n_service": "3A. Deploy n8n Service" | kind=entity | source=specs/archive/ANTIGRAVITY_RAILWAY_DEPLOY_SPEC.md:L203 | neighbors=[PART 3 — BRANDON COMPLETES IN RAILWAY D…] | lang=pt
- "archive_antigravity_railway_deploy_spec_3b_deploy_flowise_service": "3B. Deploy Flowise Service" | kind=entity | source=specs/archive/ANTIGRAVITY_RAILWAY_DEPLOY_SPEC.md:L227 | neighbors=[PART 3 — BRANDON COMPLETES IN RAILWAY D…] | lang=en
- "archive_antigravity_railway_deploy_spec_3c_add_github_secret_for_clasp_ci_cd": "3C. Add GitHub Secret for clasp CI/CD" | kind=entity | source=specs/archive/ANTIGRAVITY_RAILWAY_DEPLOY_SPEC.md:L247 | neighbors=[PART 3 — BRANDON COMPLETES IN RAILWAY D…] | lang=en
- "archive_antigravity_railway_deploy_spec_3d_update_claude_md_with_new_hosted_urls": "3D. Update CLAUDE.md with new hosted URLs" | kind=entity | source=specs/archive/ANTIGRAVITY_RAILWAY_DEPLOY_SPEC.md:L252 | neighbors=[PART 3 — BRANDON COMPLETES IN RAILWAY D…] | lang=en
- "archive_antigravity_railway_deploy_spec_post_deploy_remove_windows_startup_scripts": "POST-DEPLOY: REMOVE WINDOWS STARTUP SCRIPTS" | kind=entity | source=specs/archive/ANTIGRAVITY_RAILWAY_DEPLOY_SPEC.md:L274 | neighbors=[RAILWAY INFRASTRUCTURE DEPLOYMENT SPEC] | lang=en
- "archive_antigravity_railway_deploy_spec_verification_claude_code_checks_after_deploy": "VERIFICATION (Claude Code Checks After Deploy)" | kind=entity | source=specs/archive/ANTIGRAVITY_RAILWAY_DEPLOY_SPEC.md:L259 | neighbors=[RAILWAY INFRASTRUCTURE DEPLOYMENT SPEC] | lang=en
- "archive_antigravity_railway_deploy_spec_why_this_sprint_exists": "WHY THIS SPRINT EXISTS" | kind=entity | source=specs/archive/ANTIGRAVITY_RAILWAY_DEPLOY_SPEC.md:L8 | neighbors=[RAILWAY INFRASTRUCTURE DEPLOYMENT SPEC] | lang=en
- "archive_antigravity_rbac_schedule_fix_spec": "ANTIGRAVITY_RBAC_SCHEDULE_FIX_SPEC.md" | kind=entity | source=specs/archive/ANTIGRAVITY_RBAC_SCHEDULE_FIX_SPEC.md:L1 | neighbors=[ANTIGRAVITY SPEC — RBAC Cleanup + Sched…] | lang=en
- "archive_antigravity_rbac_schedule_fix_spec_6a_today_s_date_must_use_pacific_timezone": "6a — Today's date must use Pacific timezone" | kind=entity | source=specs/archive/ANTIGRAVITY_RBAC_SCHEDULE_FIX_SPEC.md:L210 | neighbors=[File: `tech-pwa/src/app/schedule/page.t…] | lang=pt
- "archive_antigravity_rbac_schedule_fix_spec_6b_month_pill_only_one_active_at_a_time": "6b — Month pill: only one active at a time" | kind=entity | source=specs/archive/ANTIGRAVITY_RBAC_SCHEDULE_FIX_SPEC.md:L231 | neighbors=[File: `tech-pwa/src/app/schedule/page.t…] | lang=pt
- "archive_antigravity_rbac_schedule_fix_spec_create_tech_pwa_src_lib_routepermissions_ts_new_file": "Create `tech-pwa/src/lib/routePermissions.ts` (NEW FILE)" | kind=entity | source=specs/archive/ANTIGRAVITY_RBAC_SCHEDULE_FIX_SPEC.md:L37 | neighbors=[FIX 1 — Shared ROUTE_PERMISSIONS Consta…] | lang=en
- "archive_antigravity_rbac_schedule_fix_spec_files_to_touch": "FILES TO TOUCH" | kind=entity | source=specs/archive/ANTIGRAVITY_RBAC_SCHEDULE_FIX_SPEC.md:L21 | neighbors=[ANTIGRAVITY SPEC — RBAC Cleanup + Sched…] | lang=en
- "archive_antigravity_rbac_schedule_fix_spec_fix_3_routeguard_tsx": "FIX 3 — RouteGuard.tsx" | kind=entity | source=specs/archive/ANTIGRAVITY_RBAC_SCHEDULE_FIX_SPEC.md:L121 | neighbors=[ANTIGRAVITY SPEC — RBAC Cleanup + Sched…] | lang=en
- "archive_antigravity_rbac_schedule_fix_spec_fix_4_time_off_page_redirect_to_hr": "FIX 4 — `/time-off` Page: Redirect to `/hr`" | kind=entity | source=specs/archive/ANTIGRAVITY_RBAC_SCHEDULE_FIX_SPEC.md:L163 | neighbors=[ANTIGRAVITY SPEC — RBAC Cleanup + Sched…] | lang=en
- "archive_antigravity_rbac_schedule_fix_spec_fix_5_dashboardlayout_tsx_search_button_cross_platform_fix": "FIX 5 — DashboardLayout.tsx: Search Button Cross-Platform Fix" | kind=entity | source=specs/archive/ANTIGRAVITY_RBAC_SCHEDULE_FIX_SPEC.md:L179 | neighbors=[ANTIGRAVITY SPEC — RBAC Cleanup + Sched…] | lang=en
- "archive_antigravity_rbac_schedule_fix_spec_step_1_replace_the_local_route_permissions_with_the_shared_import": "Step 1: Replace the local ROUTE_PERMISSIONS with the shared import" | kind=entity | source=specs/archive/ANTIGRAVITY_RBAC_SCHEDULE_FIX_SPEC.md:L74 | neighbors=[FIX 2 — AppSidebar.tsx] | lang=en
- "archive_antigravity_rbac_schedule_fix_spec_step_2_remove_time_off_from_nav_items": "Step 2: Remove Time Off from NAV_ITEMS" | kind=entity | source=specs/archive/ANTIGRAVITY_RBAC_SCHEDULE_FIX_SPEC.md:L82 | neighbors=[FIX 2 — AppSidebar.tsx] | lang=en
- "archive_antigravity_rbac_schedule_fix_spec_step_3_remove_the_special_case_time_off_check_in_visibleitems": "Step 3: Remove the special-case time-off check in visibleItems" | kind=entity | source=specs/archive/ANTIGRAVITY_RBAC_SCHEDULE_FIX_SPEC.md:L105 | neighbors=[FIX 2 — AppSidebar.tsx] | lang=en
- "archive_antigravity_rbac_schedule_fix_spec_verification_steps": "VERIFICATION STEPS" | kind=entity | source=specs/archive/ANTIGRAVITY_RBAC_SCHEDULE_FIX_SPEC.md:L254 | neighbors=[ANTIGRAVITY SPEC — RBAC Cleanup + Sched…] | lang=en
- "archive_antigravity_rbac_schedule_fix_spec_what_this_fixes_6_issues": "WHAT THIS FIXES (6 issues)" | kind=entity | source=specs/archive/ANTIGRAVITY_RBAC_SCHEDULE_FIX_SPEC.md:L10 | neighbors=[ANTIGRAVITY SPEC — RBAC Cleanup + Sched…] | lang=en
- "archive_antigravity_schedule_dnd_fix_spec_do_not_touch": "DO NOT TOUCH" | kind=entity | source=specs/archive/ANTIGRAVITY_SCHEDULE_DND_FIX_SPEC.md:L24 | neighbors=[Sprint 30 | Spec author: Claude Code | …] | lang=pt
- "archive_antigravity_schedule_dnd_fix_spec_files_to_touch": "FILES TO TOUCH" | kind=entity | source=specs/archive/ANTIGRAVITY_SCHEDULE_DND_FIX_SPEC.md:L19 | neighbors=[Sprint 30 | Spec author: Claude Code | …] | lang=en
- "archive_antigravity_schedule_dnd_fix_spec_fix_1_droppableschedulecell_data_passthrough": "FIX 1 — DroppableScheduleCell data passthrough" | kind=entity | source=specs/archive/ANTIGRAVITY_SCHEDULE_DND_FIX_SPEC.md:L32 | neighbors=[Sprint 30 | Spec author: Claude Code | …] | lang=en
- "archive_antigravity_schedule_dnd_fix_spec_fix_2_handledragend_null_safety_debug_log": "FIX 2 — handleDragEnd null-safety + debug log" | kind=entity | source=specs/archive/ANTIGRAVITY_SCHEDULE_DND_FIX_SPEC.md:L64 | neighbors=[Sprint 30 | Spec author: Claude Code | …] | lang=en
- "archive_antigravity_schedule_dnd_fix_spec_implementation": "Implementation" | kind=entity | source=specs/archive/ANTIGRAVITY_SCHEDULE_DND_FIX_SPEC.md:L107 | neighbors=[ADDITION — Manual "Schedule" button per…] | lang=en
- "archive_antigravity_schedule_dnd_fix_spec_manualschedulemodal_component": "ManualScheduleModal component" | kind=entity | source=specs/archive/ANTIGRAVITY_SCHEDULE_DND_FIX_SPEC.md:L139 | neighbors=[ADDITION — Manual "Schedule" button per…] | lang=en
- "archive_antigravity_schedule_dnd_fix_spec_problem_statement": "PROBLEM STATEMENT" | kind=entity | source=specs/archive/ANTIGRAVITY_SCHEDULE_DND_FIX_SPEC.md:L7 | neighbors=[Sprint 30 | Spec author: Claude Code | …] | lang=en
- "archive_antigravity_schedule_dnd_fix_spec_schedule_grid_d_d_fix_manual_schedule_button_fallback": "Schedule Grid: D&D Fix + Manual Schedule Button Fallback" | kind=entity | source=specs/archive/ANTIGRAVITY_SCHEDULE_DND_FIX_SPEC.md:L2 | neighbors=[ANTIGRAVITY_SCHEDULE_DND_FIX_SPEC.md] | lang=en
- "archive_antigravity_schedule_dnd_fix_spec_verification_steps": "VERIFICATION STEPS" | kind=entity | source=specs/archive/ANTIGRAVITY_SCHEDULE_DND_FIX_SPEC.md:L342 | neighbors=[Sprint 30 | Spec author: Claude Code | …] | lang=en
- "archive_antigravity_schedule_dnd_fix_spec_wire_manualschedulemodal_in_schedule_page_tsx": "Wire ManualScheduleModal in schedule/page.tsx" | kind=entity | source=specs/archive/ANTIGRAVITY_SCHEDULE_DND_FIX_SPEC.md:L292 | neighbors=[ADDITION — Manual "Schedule" button per…] | lang=en
- "archive_antigravity_schedule_integrity_spec": "ANTIGRAVITY_SCHEDULE_INTEGRITY_SPEC.md" | kind=entity | source=specs/archive/ANTIGRAVITY_SCHEDULE_INTEGRITY_SPEC.md:L1 | neighbors=[ANTIGRAVITY SPRINT — Schedule Integrity] | lang=en
- "archive_antigravity_schedule_integrity_spec_backend_gettechavailabilityweekda_in_dashboard_api_dashboardapi_gs": "Backend — `getTechAvailabilityWeekDA` in `dashboard-api/DashboardAPI.gs`" | kind=entity | source=specs/archive/ANTIGRAVITY_SCHEDULE_INTEGRITY_SPEC.md:L24 | neighbors=[FEATURE 1 — OUT Cells for Approved Time…] | lang=en
- "archive_antigravity_schedule_integrity_spec_deployment": "DEPLOYMENT" | kind=entity | source=specs/archive/ANTIGRAVITY_SCHEDULE_INTEGRITY_SPEC.md:L337 | neighbors=[ANTIGRAVITY SPRINT — Schedule Integrity] | lang=en
- "archive_antigravity_schedule_integrity_spec_frontend_dashboard_api_ts": "Frontend — `dashboard-api.ts`" | kind=entity | source=specs/archive/ANTIGRAVITY_SCHEDULE_INTEGRITY_SPEC.md:L106 | neighbors=[FEATURE 1 — OUT Cells for Approved Time…] | lang=en
- "archive_antigravity_schedule_integrity_spec_frontend_schedule_page_tsx": "Frontend — `schedule/page.tsx`" | kind=entity | source=specs/archive/ANTIGRAVITY_SCHEDULE_INTEGRITY_SPEC.md:L118 | neighbors=[FEATURE 1 — OUT Cells for Approved Time…] | lang=en
- "archive_antigravity_schedule_integrity_spec_frontend_schedulingdispatch_tsx": "Frontend — `SchedulingDispatch.tsx`" | kind=entity | source=specs/archive/ANTIGRAVITY_SCHEDULE_INTEGRITY_SPEC.md:L148 | neighbors=[FEATURE 1 — OUT Cells for Approved Time…] | lang=en
- "archive_antigravity_schedule_integrity_spec_in_durationselectormodal": "In `DurationSelectorModal`" | kind=entity | source=specs/archive/ANTIGRAVITY_SCHEDULE_INTEGRITY_SPEC.md:L210 | neighbors=[FEATURE 2 — Daily Capacity Warning in D…] | lang=en
- "archive_antigravity_schedule_integrity_spec_in_jobdetailmodal_tsx": "In `JobDetailModal.tsx`" | kind=entity | source=specs/archive/ANTIGRAVITY_SCHEDULE_INTEGRITY_SPEC.md:L294 | neighbors=[FEATURE 4 — Queue Refresh After Modal S…] | lang=en
- "archive_antigravity_schedule_integrity_spec_in_jobqueuetable_tsx": "In `JobQueueTable.tsx`" | kind=entity | source=specs/archive/ANTIGRAVITY_SCHEDULE_INTEGRITY_SPEC.md:L250 | neighbors=[FEATURE 3 — Mark Ready Optimistic State…] | lang=en
- "archive_antigravity_schedule_integrity_spec_in_schedulingdispatch_tsx_pass_existing_daily_load_to_durationselectormodal": "In `SchedulingDispatch.tsx`, pass existing daily load to `DurationSelectorModal`" | kind=entity | source=specs/archive/ANTIGRAVITY_SCHEDULE_INTEGRITY_SPEC.md:L191 | neighbors=[FEATURE 2 — Daily Capacity Warning in D…] | lang=en

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\PTOW\1_APT_Central_Command\.graphify\description-instructions\batch-155.json

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
