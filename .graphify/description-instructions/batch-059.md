# Node Description Batch 60 of 412

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
Write every description in English (en). Do not switch languages.
No marketing language.
Respond ONLY with a JSON object mapping each node id (as a string) to its
one-sentence description — no prose, no markdown fences.

- "archive_antigravity_schedule_team_sprint": "ANTIGRAVITY_SCHEDULE_TEAM_SPRINT.md" | kind=entity | source=specs/archive/ANTIGRAVITY_SCHEDULE_TEAM_SPRINT.md:L1 | neighbors=[ANTIGRAVITY SPRINT — Schedule & Team Pa…, Priority: HIGH — These are management-f…, Read this entire document before writin…]
- "archive_antigravity_session50_spec_file_inventory_corrected_paths": "FILE INVENTORY — CORRECTED PATHS" | kind=entity | source=specs/archive/ANTIGRAVITY_SESSION50_SPEC.md:L36 | neighbors=[Files NOT to Touch, Files to Touch, Status: APPROVED FOR AG IMPLEMENTATION]
- "archive_antigravity_session50_spec_fix_2_trainee_warning_in_jobdetailmodal": "FIX 2 — TRAINEE WARNING IN JobDetailModal" | kind=entity | source=specs/archive/ANTIGRAVITY_SESSION50_SPEC.md:L130 | neighbors=[Context, Implementation, Status: APPROVED FOR AG IMPLEMENTATION]
- "archive_antigravity_session50_spec_ui_redesign_clockedinbar_tsx": "UI REDESIGN — ClockedInBar.tsx" | kind=entity | source=specs/archive/ANTIGRAVITY_SESSION50_SPEC.md:L389 | neighbors=[Status: APPROVED FOR AG IMPLEMENTATION, Context, Implementation]
- "archive_antigravity_session50_spec_ui_redesign_jobdetailmodal_tsx_section_glassmorphism": "UI REDESIGN — JobDetailModal.tsx Section Glassmorphism" | kind=entity | source=specs/archive/ANTIGRAVITY_SESSION50_SPEC.md:L258 | neighbors=[Status: APPROVED FOR AG IMPLEMENTATION, Context, Implementation]
- "archive_antigravity_session50_spec_ui_redesign_schedulingdispatch_tsx_minor": "UI REDESIGN — SchedulingDispatch.tsx (Minor)" | kind=entity | source=specs/archive/ANTIGRAVITY_SESSION50_SPEC.md:L453 | neighbors=[Status: APPROVED FOR AG IMPLEMENTATION, Context, Implementation]
- "archive_antigravity_session50_spec_ui_redesign_tech_job_detail_job_jobid_page_tsx": "UI REDESIGN — Tech Job Detail (job/[jobId]/page.tsx)" | kind=entity | source=specs/archive/ANTIGRAVITY_SESSION50_SPEC.md:L328 | neighbors=[Status: APPROVED FOR AG IMPLEMENTATION, Context, Implementation]
- "archive_antigravity_session50_spec_ui_redesign_tech_job_list_jobs_page_tsx": "UI REDESIGN — Tech Job List (jobs/page.tsx)" | kind=entity | source=specs/archive/ANTIGRAVITY_SESSION50_SPEC.md:L293 | neighbors=[Status: APPROVED FOR AG IMPLEMENTATION, Context, Implementation]
- "archive_antigravity_sprint32_schedule_spec_file_tech_pwa_src_components_dashboard_schedulepagecomponents_tsx": "File: `tech-pwa/src/components/dashboard/SchedulePageComponents.tsx`" | kind=entity | source=specs/archive/ANTIGRAVITY_SPRINT32_SCHEDULE_SPEC.md:L22 | neighbors=[SPEC 1 — Compact Tech Lane Header, SPEC 2 — Visible Time Slot Grid, Step 1 — Update `DraggableJobCard` inte…]
- "archive_antigravity_tech_assignment_fix_spec_deploy_steps": "Deploy Steps" | kind=entity | source=specs/archive/ANTIGRAVITY_TECH_ASSIGNMENT_FIX_SPEC.md:L133 | neighbors=[ANTIGRAVITY SPEC — Tech Assignment Fix, DashboardAPI.gs (separate project), TechPWA.gs (root project — also pushes …]
- "archive_antigravity_tech_date_modals": "ANTIGRAVITY_TECH_DATE_MODALS.md" | kind=entity | source=specs/archive/ANTIGRAVITY_TECH_DATE_MODALS.md:L1 | neighbors=[ANTIGRAVITY SPRINT — TECH PROFILE MODAL…, Date: April 23, 2026, Owner: Claude Code | Executor: Antigrav…]
- "archive_antigravity_tech_date_modals_mandatory_pre_work_a_backend_fix_in_dashboardapi_gs": "MANDATORY PRE-WORK A — Backend fix in DashboardAPI.gs" | kind=entity | source=specs/archive/ANTIGRAVITY_TECH_DATE_MODALS.md:L17 | neighbors=[Date: April 23, 2026, Deploy after this change:, File: `dashboard-api/DashboardAPI.gs`]
- "archive_antigravity_tech_date_modals_mandatory_pre_work_b_fix_techstatus_interface_maptech_in_dashboard_api_ts": "MANDATORY PRE-WORK B — Fix TechStatus interface + mapTech() in dashboard-api.ts" | kind=entity | source=specs/archive/ANTIGRAVITY_TECH_DATE_MODALS.md:L81 | neighbors=[Date: April 23, 2026, Fix mapTech() return block (lines ~95–1…, Fix the TechStatus interface (lines ~19…]
- "archive_antigravity_time_off_frontend_spec_api_call_patterns_read_carefully": "API CALL PATTERNS — READ CAREFULLY" | kind=entity | source=specs/archive/ANTIGRAVITY_TIME_OFF_FRONTEND_SPEC.md:L21 | neighbors=[Calling DashboardAPI.gs (for `/hr` page), Calling TechPWA.gs (for `/time-off` pag…, Author: Claude Code]
- "archive_antigravity_time_off_spec_2_dashboard_api_dashboardapi_gs": "2. `dashboard-api/DashboardAPI.gs`" | kind=entity | source=specs/archive/ANTIGRAVITY_TIME_OFF_SPEC.md:L384 | neighbors=[Step 1 — Add 4 actions in `doPost()`, Step 2 — Append this entire block at th…, FILES TO MODIFY]
- "archive_antigravity_time_off_spec_deploy_commands": "DEPLOY COMMANDS" | kind=entity | source=specs/archive/ANTIGRAVITY_TIME_OFF_SPEC.md:L620 | neighbors=[Author: Claude Code, DashboardAPI.gs (dashboard-api/ project), TechPWA.gs (root project — bound script…]
- "archive_antigravity_time_off_spec_files_to_modify": "FILES TO MODIFY" | kind=entity | source=specs/archive/ANTIGRAVITY_TIME_OFF_SPEC.md:L78 | neighbors=[Author: Claude Code, 1. `TechPWA.gs` (repo root), 2. `dashboard-api/DashboardAPI.gs`]
- "archive_antigravity_ui_polish_spec_fix_1_remove_three_dot_button_jobqueuetable_tsx": "Fix 1 — Remove three-dot button (`JobQueueTable.tsx`)" | kind=entity | source=specs/archive/ANTIGRAVITY_UI_POLISH_SPEC.md:L35 | neighbors=[ANTIGRAVITY_UI_POLISH_SPEC, A. Remove `MoreHorizontal` from the imp…, B. Remove the dead button from the row …]
- "archive_antigravity_ui_polish_spec_fix_2_fix_column_alignment_jobqueuetable_tsx": "Fix 2 — Fix column alignment (`JobQueueTable.tsx`)" | kind=entity | source=specs/archive/ANTIGRAVITY_UI_POLISH_SPEC.md:L62 | neighbors=[ANTIGRAVITY_UI_POLISH_SPEC, A. Fix the header last-column spacer wi…, B. Fix Status column padding mismatch]
- "archive_antigravity_ui_polish_spec_fix_3_calendar_chip_readability_calendar_page_tsx": "Fix 3 — Calendar chip readability (`calendar/page.tsx`)" | kind=entity | source=specs/archive/ANTIGRAVITY_UI_POLISH_SPEC.md:L94 | neighbors=[ANTIGRAVITY_UI_POLISH_SPEC, A. Fix tech name display — removes trai…, B. Increase chip font size for readabil…]
- "archive_antigravity_weekly_schedule_nav_step_b5_dim_past_date_columns_and_disable_dropping": "Step B5 — Dim past date columns and disable dropping" | kind=entity | source=specs/archive/ANTIGRAVITY_WEEKLY_SCHEDULE_NAV.md:L257 | neighbors=[PART B — schedule/page.tsx (DnD Ready t…, Add `isPast` prop to DroppableScheduleC…, In schedule/page.tsx, compute isPast fo…]
- "archive_antigravity_wo_card_redesign_spec_part_3_schedulepagecomponents_tsx_datedetailmodal": "PART 3 — SchedulePageComponents.tsx — DateDetailModal" | kind=entity | source=specs/archive/ANTIGRAVITY_WO_CARD_REDESIGN_SPEC.md:L853 | neighbors=[ANTIGRAVITY_WO_CARD_REDESIGN_SPEC.md, Exact changes to `DateDetailModal` func…, Problem]
- "archive_playground_context": "PLAYGROUND_CONTEXT.md" | kind=entity | source=specs/archive/PLAYGROUND_CONTEXT.md:L1 | neighbors=[APT CENTRAL COMMAND — CHATPLAYGROUND CO…, Last updated: Session 49 (May 6, 2026), Paste this entire document as your syst…]
- "archive_spec_p2b_job_transition_tests": "SPEC_P2B_JOB_TRANSITION_TESTS.md" | kind=entity | source=specs/archive/SPEC_P2B_JOB_TRANSITION_TESTS.md:L1 | neighbors=[Closes P2-7. Extracts inline status log…, Owner: AG | Reviewer: Claude Code | Bra…, SPEC: P2B — Job Transition Unit Tests]
- "archive_spec_p3_dashboardapi_migration": "SPEC_P3_DASHBOARDAPI_MIGRATION.md" | kind=entity | source=specs/archive/SPEC_P3_DASHBOARDAPI_MIGRATION.md:L1 | neighbors=[Migrates read-heavy GAS actions to Next…, Owner: AG | Reviewer: Claude Code | Bra…, SPEC: Phase 3 — DashboardAPI Migration …]
- "archive_test_report_2026_05_01_resolution_of_previous_failures": "Resolution of Previous Failures" | kind=entity | source=specs/archive/TEST_REPORT_2026-05-01.md:L11 | neighbors=[CC2.0 Battle Test Report — 2026-05-01 (…, 11.3 — URGENT job sorted first, 4.5 — Suggest Techs]
- "artifacts_15_02_summary_phase_15_02_summary": "Phase 15-02 Summary" | kind=entity | source=artifacts/15-02-SUMMARY.md:L1 | neighbors=[15-02-SUMMARY.md, Actions Performed, Evidence]
- "artifacts_phase2_verification_results_phase_2_core_loop_verification_results": "Phase 2: Core Loop Verification Results" | kind=entity | source=artifacts/phase2-verification-results.md:L1 | neighbors=[phase2-verification-results.md, bootstrapJobsToNeon() Output, Gap Inventory]
- "auth_block_1_auth_login_1_1_root_redirects_to_login_mobile_error_context": "error-context.md" | kind=entity | source=tech-pwa/test-results/auth-Block-1-—-Auth-Login-1-1-root-redirects-to-login-mobile/error-context.md:L1 | neighbors=[Error details, Instructions, Test info]
- "auth_block_1_auth_login_6924a_ed_route_redirects_to_login_mobile_error_context": "error-context.md" | kind=entity | source=tech-pwa/test-results/auth-Block-1-—-Auth-Login--6924a-ed-route-redirects-to-login-mobile/error-context.md:L1 | neighbors=[Error details, Instructions, Test info]
- "auth_block_1_auth_login_aff9d_n_session_and_lands_on_live_mobile_error_context": "error-context.md" | kind=entity | source=tech-pwa/test-results/auth-Block-1-—-Auth-Login--aff9d-n-session-and-lands-on-live-mobile/error-context.md:L1 | neighbors=[Error details, Instructions, Test info]
- "auth_block_1_auth_login_bab25_ith_invalid_pin_shows_error_mobile_error_context": "error-context.md" | kind=entity | source=tech-pwa/test-results/auth-Block-1-—-Auth-Login--bab25-ith-invalid-PIN-shows-error-mobile/error-context.md:L1 | neighbors=[Error details, Instructions, Test info]
- "auth_block_1_auth_login_bb41b_alid_badge_pin_reaches_jobs_mobile_error_context": "error-context.md" | kind=entity | source=tech-pwa/test-results/auth-Block-1-—-Auth-Login--bb41b-alid-badge-PIN-reaches-jobs-mobile/error-context.md:L1 | neighbors=[Error details, Instructions, Test info]
- "auth_block_1_auth_login_d9389_exists_on_dispatch_hostname_mobile_error_context": "error-context.md" | kind=entity | source=tech-pwa/test-results/auth-Block-1-—-Auth-Login--d9389-exists-on-dispatch-hostname-mobile/error-context.md:L1 | neighbors=[Error details, Instructions, Test info]
- "auth_split_gate": "Auth Split Gate" | kind=entity | source=tech-pwa/src/lib/CLAUDE.md | neighbors=[API Routes Gate, ADR-001 (Dual Auth Architecture), RULES.md §AUTH HOOK RULE]
- "billing_page": "page.tsx" | kind=code-symbol | source=tech-pwa/src/app/billing/page.tsx:L1 | neighbors=[BillingPage(), DashboardLayout.tsx, 01bf641 Initial commit — clean history]
- "caveman_compress_readme_before_after": "Before / After" | kind=entity | source=.github/skills/caveman-compress/README.md:L45 | neighbors=[README.md, <img src="../../docs/assets/dancing-roc…, 📄 Original (706 tokens)]
- "change_pin_route_post": "POST()" | kind=code-symbol | source=tech-pwa/src/app/api/field/auth/change-pin/route.ts:L15 | neighbors=[route.ts, hashPin(), verifyFieldSession()]
- "claude_agents_gsd_assumptions_analyzer_md_agents_gsd_assumptions_analyzer": "gsd-assumptions-analyzer.md" | kind=entity | source=.claude/agents/gsd-assumptions-analyzer.md:L1 | neighbors=[full_maturity, minimal_decisive, standard]
- "claude_agents_gsd_intel_updater_md_agents_gsd_intel_updater_upstream_input": "Upstream Input" | kind=entity | source=.claude/agents/gsd-intel-updater.md:L46 | neighbors=[GSD Intel Updater, Config Gate, From `/gsd-map-codebase --query` Command]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\PTOW\1_APT_Central_Command\.graphify\description-instructions\batch-059.json

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
