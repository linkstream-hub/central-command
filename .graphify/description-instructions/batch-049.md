# Node Description Batch 50 of 412

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

- "archive_antigravity_hr_permissions_and_deploy_task_2_deploy_pending_backend_fixes_clasp": "TASK 2 — Deploy pending backend fixes (clasp)" | kind=entity | source=specs/archive/ANTIGRAVITY_HR_PERMISSIONS_AND_DEPLOY.md:L31 | neighbors=[Date: April 23, 2026, 2a. Code.js — Lead Parsing v73 (rmName …, 2b. DashboardAPI.gs — v14 (Active tech …, Verification:] | lang=en
- "archive_antigravity_i18n_spec_step_1_i18n_infrastructure": "Step 1 — i18n Infrastructure" | kind=entity | source=specs/archive/ANTIGRAVITY_I18N_SPEC.md:L48 | neighbors=[ANTIGRAVITY_I18N_SPEC, 1A. New file: `src/lib/i18n/en.ts`, 1B. New file: `src/lib/i18n/es.ts`, 1C. New file: `src/lib/i18n/index.ts`] | lang=en
- "archive_antigravity_logo_spec_change_2_sidebar_expanded_state": "CHANGE 2 — Sidebar (Expanded State)" | kind=entity | source=specs/archive/ANTIGRAVITY_LOGO_SPEC.md:L41 | neighbors=[File: `tech-pwa/src/components/dashboar…, Find and REPLACE the collapsed logo blo…, Find and REPLACE the expanded logo bloc…, Sprint 32.2 | Spec author: Claude Code …] | lang=en
- "archive_antigravity_modal_spec_left_panel_email_thread_40_width": "LEFT PANEL — EMAIL THREAD (40% width)" | kind=entity | source=specs/archive/ANTIGRAVITY_MODAL_SPEC.md:L64 | neighbors=[Reply composer (pinned to bottom of lef…, Sub-header, Thread body (scrollable, newest message…, this is complete and correct.] | lang=en
- "archive_antigravity_modal_visibility_spec": "ANTIGRAVITY_MODAL_VISIBILITY_SPEC.md" | kind=entity | source=specs/archive/ANTIGRAVITY_MODAL_VISIBILITY_SPEC.md:L1 | neighbors=[ANTIGRAVITY SPRINT — MODAL STAKEHOLDER …, Date: April 23, 2026, File: tech-pwa/src/components/dashboard…, Owner: Claude Code | Executor: Antigrav…] | lang=en
- "archive_antigravity_nav_rbac_sprint_part_5_hr_page_mvp": "PART 5 — HR PAGE (MVP)" | kind=entity | source=specs/archive/ANTIGRAVITY_NAV_RBAC_SPRINT.md:L290 | neighbors=[Layout, New File: `src/app/hr/page.tsx`, Style, Read every section before writing code.…] | lang=en
- "archive_antigravity_notifications_spec_what_to_build": "WHAT TO BUILD" | kind=entity | source=specs/archive/ANTIGRAVITY_NOTIFICATIONS_SPEC.md:L15 | neighbors=[Sprint owner: Antigravity | Spec author…, Do NOT touch, Files to edit, New files] | lang=en
- "archive_antigravity_pwa_ui_prompt_design_system": "Design System" | kind=entity | source=specs/archive/ANTIGRAVITY_PWA_UI_PROMPT.md:L32 | neighbors=[Color Tokens (add to `tailwind.config.t…, Elevation, Typography, Paste this entire file into Antigravity…] | lang=en
- "archive_antigravity_rbac_schedule_fix_spec_fix_2_appsidebar_tsx": "FIX 2 — AppSidebar.tsx" | kind=entity | source=specs/archive/ANTIGRAVITY_RBAC_SCHEDULE_FIX_SPEC.md:L72 | neighbors=[ANTIGRAVITY SPEC — RBAC Cleanup + Sched…, Step 1: Replace the local ROUTE_PERMISS…, Step 2: Remove Time Off from NAV_ITEMS, Step 3: Remove the special-case time-of…] | lang=en
- "archive_antigravity_schedule_dnd_fix_spec_addition_manual_schedule_button_per_grid_cell": "ADDITION — Manual \"Schedule\" button per grid cell" | kind=entity | source=specs/archive/ANTIGRAVITY_SCHEDULE_DND_FIX_SPEC.md:L99 | neighbors=[Implementation, ManualScheduleModal component, Wire ManualScheduleModal in schedule/pa…, Sprint 30 | Spec author: Claude Code | …] | lang=it
- "archive_antigravity_schedule_integrity_spec_feature_3_mark_ready_optimistic_state_update": "FEATURE 3 — Mark Ready Optimistic State Update" | kind=entity | source=specs/archive/ANTIGRAVITY_SCHEDULE_INTEGRITY_SPEC.md:L245 | neighbors=[ANTIGRAVITY SPRINT — Schedule Integrity, In `JobQueueTable.tsx`, In `live/page.tsx`, The gap] | lang=en
- "archive_antigravity_schedule_integrity_spec_feature_4_queue_refresh_after_modal_save": "FEATURE 4 — Queue Refresh After Modal Save" | kind=entity | source=specs/archive/ANTIGRAVITY_SCHEDULE_INTEGRITY_SPEC.md:L289 | neighbors=[ANTIGRAVITY SPRINT — Schedule Integrity, In `JobDetailModal.tsx`, In `live/page.tsx`, The gap] | lang=en
- "archive_antigravity_scheduling_spec": "ANTIGRAVITY_SCHEDULING_SPEC.md" | kind=entity | source=specs/archive/ANTIGRAVITY_SCHEDULING_SPEC.md:L1 | neighbors=[dispatch should never wonder what to do…, Replaces the current Dispatch section i…, SCHEDULING WORKFLOW SPEC — Job Detail M…, This is the core dispatcher workflow. E…] | lang=en
- "archive_antigravity_scope_expansion_spec_part_4_fix_remaining_alert_and_confirm_calls": "PART 4 — Fix remaining `alert()` and `confirm()` calls" | kind=entity | source=specs/archive/ANTIGRAVITY_SCOPE_EXPANSION_SPEC.md:L245 | neighbors=[ANTIGRAVITY SPRINT — Job Scope Expansio…, 4a — `handleSave` failure (line ~211):, 4b — `handleArchive` confirm + failure …, 4c — DocGen `confirm()` and `alert()` c…] | lang=en
- "archive_antigravity_session46_consolidated_spec_part_2_dispatch_dashboard_ui_redesign": "PART 2 — DISPATCH DASHBOARD UI REDESIGN" | kind=entity | source=specs/archive/ANTIGRAVITY_SESSION46_CONSOLIDATED_SPEC.md:L277 | neighbors=[ANTIGRAVITY SESSION 46 — CONSOLIDATED S…, 2a. `JobQueueTable.tsx` — Row Card Glas…, 2b. `AppSidebar.tsx` — Active State Pol…, 2c. `SchedulePageComponents.tsx` — Drag…] | lang=en
- "archive_antigravity_session50_spec_ui_redesign_jobqueuetable_tsx_priority_left_border": "UI REDESIGN — JobQueueTable.tsx (Priority Left Border)" | kind=entity | source=specs/archive/ANTIGRAVITY_SESSION50_SPEC.md:L213 | neighbors=[Status: APPROVED FOR AG IMPLEMENTATION, Context, Implementation, Result] | lang=en
- "archive_antigravity_sprint32_schedule_spec_spec_1_compact_tech_lane_header": "SPEC 1 — Compact Tech Lane Header" | kind=entity | source=specs/archive/ANTIGRAVITY_SPRINT32_SCHEDULE_SPEC.md:L20 | neighbors=[File: `tech-pwa/src/components/dashboar…, Replace with:, What to find and DELETE:, Sprint 32 | Spec author: Claude Code | …] | lang=en
- "archive_antigravity_sprint32_schedule_spec_spec_3_inline_estimate_editing_on_sidebar_job_cards": "SPEC 3 — Inline Estimate Editing on Sidebar Job Cards" | kind=entity | source=specs/archive/ANTIGRAVITY_SPRINT32_SCHEDULE_SPEC.md:L166 | neighbors=[Context, Step 1 — Update `DraggableJobCard` inte…, Step 2 — Wire `onEstimateChange` in sch…, Sprint 32 | Spec author: Claude Code | …] | lang=en
- "archive_antigravity_sprint32_schedule_spec_step_1_update_draggablejobcard_interface_and_component": "Step 1 — Update `DraggableJobCard` interface and component" | kind=entity | source=specs/archive/ANTIGRAVITY_SPRINT32_SCHEDULE_SPEC.md:L179 | neighbors=[SPEC 3 — Inline Estimate Editing on Sid…, File: `tech-pwa/src/components/dashboar…, Find the closing section of the Draggab…, Inside `DraggableJobCard`, add state (a…] | lang=en
- "archive_antigravity_tech_assignment_fix_spec_exact_changes": "Exact Changes" | kind=entity | source=specs/archive/ANTIGRAVITY_TECH_ASSIGNMENT_FIX_SPEC.md:L38 | neighbors=[ANTIGRAVITY SPEC — Tech Assignment Fix, 1. `TechPWA.gs` — `isTechMatch` (curren…, 2. `TechPWA.gs` — `getTechJobs` call si…, 3. `dashboard-api/DashboardAPI.gs` — `g…] | lang=en
- "archive_antigravity_tech_date_modals_part_1_schedulepagecomponents_tsx": "PART 1 — SchedulePageComponents.tsx" | kind=entity | source=specs/archive/ANTIGRAVITY_TECH_DATE_MODALS.md:L193 | neighbors=[Date: April 23, 2026, 1a — Add TechProfileModal, 1b — Add DateDetailModal, 1c — Add onClick to TechLaneHeader] | lang=en
- "archive_antigravity_tenant_scheduling_spec_send_scheduling_link_button_in_job_detail_modal": "\"SEND SCHEDULING LINK\" BUTTON IN JOB DETAIL MODAL" | kind=entity | source=specs/archive/ANTIGRAVITY_TENANT_SCHEDULING_SPEC.md:L642 | neighbors=[Handler:, JSX (add in the dispatcher actions sect…, State:, Sprint 30 | Spec author: Claude Code | …] | lang=en
- "archive_antigravity_test_fixes_spec_replace_with": "Replace with:" | kind=entity | source=specs/archive/ANTIGRAVITY_TEST_FIXES_SPEC.md:L28 | neighbors=[Fix 1 — "Ready to Schedule" tab missing…, Fix 2 — URGENT jobs not sorted first in…, Fix 3 — Attestation modal stale closure…, Fix 6 — Sidebar navigation labels are w…] | lang=en
- "archive_antigravity_test_mode_spec_test_block_3_the_critical_path_scheduling_a_work_order": "TEST BLOCK 3 — THE CRITICAL PATH: Scheduling a Work Order" | kind=entity | source=specs/archive/ANTIGRAVITY_TEST_MODE_SPEC.md:L708 | neighbors=[PART 2 — BATTLE TEST PROTOCOL, 3.1 SchedulingDispatch Component (from …, 3.2 DnD Schedule Grid (`/schedule`), 3.3 Schedule View Consistency] | lang=en
- "archive_antigravity_time_off_frontend_spec": "ANTIGRAVITY_TIME_OFF_FRONTEND_SPEC.md" | kind=entity | source=specs/archive/ANTIGRAVITY_TIME_OFF_FRONTEND_SPEC.md:L1 | neighbors=[ANTIGRAVITY SPEC — Time Off Manager Fro…, Author: Claude Code, Date: April 23, 2026, Sprint: Time Off Manager Phase 2 — Fron…] | lang=en
- "archive_antigravity_time_off_spec": "ANTIGRAVITY_TIME_OFF_SPEC.md" | kind=entity | source=specs/archive/ANTIGRAVITY_TIME_OFF_SPEC.md:L1 | neighbors=[ANTIGRAVITY SPEC — Time Off Manager Bac…, Author: Claude Code, Date: April 23, 2026, Sprint: Time Off Manager Phase 1 — Back…] | lang=en
- "archive_antigravity_time_off_spec_1_techpwa_gs_repo_root": "1. `TechPWA.gs` (repo root)" | kind=entity | source=specs/archive/ANTIGRAVITY_TIME_OFF_SPEC.md:L80 | neighbors=[Step 1 — Add 2 GET actions in `doGet()`, Step 2 — Add 2 POST actions in `doPost(…, Step 3 — Append this entire block at th…, FILES TO MODIFY] | lang=en
- "archive_antigravity_time_off_spec_column_schemas": "COLUMN SCHEMAS" | kind=entity | source=specs/archive/ANTIGRAVITY_TIME_OFF_SPEC.md:L23 | neighbors=[Author: Claude Code, AccrualRules tab, Employees tab, Time Off Requests tab] | lang=en
- "archive_antigravity_weekly_schedule_nav_part_a_weekly_schedule_page_tsx_read_only_view": "PART A — weekly-schedule/page.tsx (read-only view)" | kind=entity | source=specs/archive/ANTIGRAVITY_WEEKLY_SCHEDULE_NAV.md:L19 | neighbors=[ANTIGRAVITY_WEEKLY_SCHEDULE_NAV.md, Step A1 — Update getWeekDates to accept…, Step A2 — Add weekOffset state, update …, Step A3 — Replace header with navigatio…] | lang=pt
- "archive_antigravity_wo_card_redesign_spec_part_1_commandpalette_tsx": "PART 1 — CommandPalette.tsx" | kind=entity | source=specs/archive/ANTIGRAVITY_WO_CARD_REDESIGN_SPEC.md:L23 | neighbors=[ANTIGRAVITY_WO_CARD_REDESIGN_SPEC.md, Exact changes to `CommandPalette.tsx`, Problem, Solution] | lang=en
- "archive_claw_army_phase1_spec": "CLAW_ARMY_PHASE1_SPEC.md" | kind=entity | source=specs/archive/CLAW_ARMY_PHASE1_SPEC.md:L1 | neighbors=[Authored: April 26, 2026, CLAW ARMY — PHASE 1 SPEC, Zero infrastructure cost. No Railway. N…, GitHub Actions Quality Gate Fleet] | lang=en
- "archive_spec_p1_6_staging_environment": "SPEC_P1_6_STAGING_ENVIRONMENT.md" | kind=entity | source=specs/archive/SPEC_P1_6_STAGING_ENVIRONMENT.md:L1 | neighbors=[Branch: feat/p1-6-staging-env, Eliminates the "production is the test …, Owner: AG (setup) + Brandon (Neon/Verce…, SPEC: P1-6 — Staging Environment (Neon …] | lang=en
- "archive_spec_p2b_job_transition_tests_owner_ag_reviewer_claude_code_branch_feat_p2b_job_transition_tests": "Owner: AG | Reviewer: Claude Code | Branch: feat/p2b-job-transition-tests" | kind=entity | source=specs/archive/SPEC_P2B_JOB_TRANSITION_TESTS.md:L3 | neighbors=[SPEC_P2B_JOB_TRANSITION_TESTS.md, CONTEXT, MERGE GATE, TASKS] | lang=en
- "archive_sprint_6a_inbound_reply_sprint_6a_code_js_inbound_reply_detection": "Sprint 6A — Code.js Inbound Reply Detection" | kind=entity | source=specs/archive/SPRINT_6A_INBOUND_REPLY.md:L1 | neighbors=[SPRINT_6A_INBOUND_REPLY.md, Flags to Claude Code (REQUIRED — raise …, Numbered Task List, What Claude Code reviews next session] | lang=pt
- "archive_test_report_2026_04_30_3_detailed_pass_results": "3. Detailed Pass Results" | kind=entity | source=specs/archive/TEST_REPORT_2026-04-30.md:L36 | neighbors=[Pass 1: Dispatch Dashboard, Pass 2: Tech PWA Flows, Pass 3: Edge Cases & Error Handling, PTOW Ecosystem Test Report — 2026-04-30] | lang=en
- "archive_test_report_2026_05_01_cc2_0_battle_test_report_2026_05_01_revised": "CC2.0 Battle Test Report — 2026-05-01 (REVISED)" | kind=entity | source=specs/archive/TEST_REPORT_2026-05-01.md:L1 | neighbors=[TEST_REPORT_2026-05-01.md, Detailed Results, Resolution of Previous Failures, Summary] | lang=en
- "artifacts_15_caller_graph_wave_2_deletion_candidates": "Wave 2 Deletion Candidates" | kind=entity | source=artifacts/15_caller_graph.md:L17 | neighbors=[Phase 15-01 Caller Graph & Dead Code An…, Code.js, DashboardAPI.gs, SuggestTechs.js] | lang=en
- "caveman_commit_skill": "SKILL.md" | kind=entity | source=.github/skills/caveman-commit/SKILL.md:L1 | neighbors=[Auto-Clarity, Boundaries, Examples, Rules] | lang=en
- "caveman_review_skill": "SKILL.md" | kind=entity | source=.github/skills/caveman-review/SKILL.md:L1 | neighbors=[Auto-Clarity, Boundaries, Examples, Rules] | lang=en
- "claude_agent_skills": "Agent skills" | kind=entity | source=CLAUDE.md:L179 | neighbors=[Domain docs, Issue tracker, Triage labels, Ops reference. Non-narrative. Load refs…] | lang=en

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\PTOW\1_APT_Central_Command\.graphify\description-instructions\batch-049.json

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
