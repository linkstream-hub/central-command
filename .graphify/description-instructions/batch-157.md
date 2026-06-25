# Node Description Batch 158 of 412

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

- "archive_antigravity_scope_expansion_spec_no_backend_changes": "NO BACKEND CHANGES" | kind=entity | source=specs/archive/ANTIGRAVITY_SCOPE_EXPANSION_SPEC.md:L20 | neighbors=[ANTIGRAVITY SPRINT — Job Scope Expansio…] | lang=en
- "archive_antigravity_scope_expansion_spec_part_1_new_state": "PART 1 — New State" | kind=entity | source=specs/archive/ANTIGRAVITY_SCOPE_EXPANSION_SPEC.md:L28 | neighbors=[ANTIGRAVITY SPRINT — Job Scope Expansio…] | lang=en
- "archive_antigravity_scope_expansion_spec_part_2_save_handler": "PART 2 — Save Handler" | kind=entity | source=specs/archive/ANTIGRAVITY_SCOPE_EXPANSION_SPEC.md:L50 | neighbors=[ANTIGRAVITY SPRINT — Job Scope Expansio…] | lang=en
- "archive_antigravity_scope_expansion_spec_part_3_jsx_inside_the_execution_phase": "PART 3 — JSX inside the EXECUTION phase" | kind=entity | source=specs/archive/ANTIGRAVITY_SCOPE_EXPANSION_SPEC.md:L126 | neighbors=[ANTIGRAVITY SPRINT — Job Scope Expansio…] | lang=en
- "archive_antigravity_scope_expansion_spec_verification_checklist": "VERIFICATION CHECKLIST" | kind=entity | source=specs/archive/ANTIGRAVITY_SCOPE_EXPANSION_SPEC.md:L326 | neighbors=[ANTIGRAVITY SPRINT — Job Scope Expansio…] | lang=en
- "archive_antigravity_scope_expansion_spec_what_this_sprint_builds": "WHAT THIS SPRINT BUILDS" | kind=entity | source=specs/archive/ANTIGRAVITY_SCOPE_EXPANSION_SPEC.md:L8 | neighbors=[ANTIGRAVITY SPRINT — Job Scope Expansio…] | lang=en
- "archive_antigravity_scope_expansion_spec_what_to_keep_unchanged": "WHAT TO KEEP UNCHANGED" | kind=entity | source=specs/archive/ANTIGRAVITY_SCOPE_EXPANSION_SPEC.md:L314 | neighbors=[ANTIGRAVITY SPRINT — Job Scope Expansio…] | lang=en
- "archive_antigravity_security_sprint_spec": "ANTIGRAVITY_SECURITY_SPRINT_SPEC.md" | kind=entity | source=specs/archive/ANTIGRAVITY_SECURITY_SPRINT_SPEC.md:L1 | neighbors=[ANTIGRAVITY_SECURITY_SPRINT_SPEC] | lang=en
- "archive_antigravity_security_sprint_spec_do_not_submit_as_complete_until": "Do NOT submit as complete until:" | kind=entity | source=specs/archive/ANTIGRAVITY_SECURITY_SPRINT_SPEC.md:L321 | neighbors=[ANTIGRAVITY_SECURITY_SPRINT_SPEC] | lang=pt
- "archive_antigravity_security_sprint_spec_files_you_must_change": "Files You Must Change" | kind=entity | source=specs/archive/ANTIGRAVITY_SECURITY_SPRINT_SPEC.md:L17 | neighbors=[ANTIGRAVITY_SECURITY_SPRINT_SPEC] | lang=en
- "archive_antigravity_security_sprint_spec_files_you_must_not_change": "Files You Must NOT Change" | kind=entity | source=specs/archive/ANTIGRAVITY_SECURITY_SPRINT_SPEC.md:L31 | neighbors=[ANTIGRAVITY_SECURITY_SPRINT_SPEC] | lang=en
- "archive_antigravity_security_sprint_spec_fix_1_install_sentry": "Fix 1 — Install Sentry" | kind=entity | source=specs/archive/ANTIGRAVITY_SECURITY_SPRINT_SPEC.md:L42 | neighbors=[ANTIGRAVITY_SECURITY_SPRINT_SPEC] | lang=en
- "archive_antigravity_security_sprint_spec_fix_2_tech_pwa_sentry_client_config_ts_new_file": "Fix 2 — `tech-pwa/sentry.client.config.ts` (new file)" | kind=entity | source=specs/archive/ANTIGRAVITY_SECURITY_SPRINT_SPEC.md:L53 | neighbors=[ANTIGRAVITY_SECURITY_SPRINT_SPEC] | lang=en
- "archive_antigravity_security_sprint_spec_fix_3_tech_pwa_sentry_server_config_ts_new_file": "Fix 3 — `tech-pwa/sentry.server.config.ts` (new file)" | kind=entity | source=specs/archive/ANTIGRAVITY_SECURITY_SPRINT_SPEC.md:L68 | neighbors=[ANTIGRAVITY_SECURITY_SPRINT_SPEC] | lang=en
- "archive_antigravity_security_sprint_spec_fix_4_tech_pwa_sentry_edge_config_ts_new_file": "Fix 4 — `tech-pwa/sentry.edge.config.ts` (new file)" | kind=entity | source=specs/archive/ANTIGRAVITY_SECURITY_SPRINT_SPEC.md:L83 | neighbors=[ANTIGRAVITY_SECURITY_SPRINT_SPEC] | lang=en
- "archive_antigravity_security_sprint_spec_fix_5_tech_pwa_next_config_ts": "Fix 5 — `tech-pwa/next.config.ts`" | kind=entity | source=specs/archive/ANTIGRAVITY_SECURITY_SPRINT_SPEC.md:L98 | neighbors=[ANTIGRAVITY_SECURITY_SPRINT_SPEC] | lang=en
- "archive_antigravity_security_sprint_spec_fix_6_tech_pwa_src_app_global_error_tsx_new_file": "Fix 6 — `tech-pwa/src/app/global-error.tsx` (new file)" | kind=entity | source=specs/archive/ANTIGRAVITY_SECURITY_SPRINT_SPEC.md:L179 | neighbors=[ANTIGRAVITY_SECURITY_SPRINT_SPEC] | lang=en
- "archive_antigravity_security_sprint_spec_fix_7_github_workflows_auto_spec_yml_new_file": "Fix 7 — `.github/workflows/auto-spec.yml` (new file)" | kind=entity | source=specs/archive/ANTIGRAVITY_SECURITY_SPRINT_SPEC.md:L219 | neighbors=[ANTIGRAVITY_SECURITY_SPRINT_SPEC] | lang=en
- "archive_antigravity_security_sprint_spec_verification_steps": "Verification Steps" | kind=entity | source=specs/archive/ANTIGRAVITY_SECURITY_SPRINT_SPEC.md:L307 | neighbors=[ANTIGRAVITY_SECURITY_SPRINT_SPEC] | lang=en
- "archive_antigravity_security_sprint_spec_what_brandon_must_do_before_this_goes_live": "What Brandon Must Do Before This Goes Live" | kind=entity | source=specs/archive/ANTIGRAVITY_SECURITY_SPRINT_SPEC.md:L288 | neighbors=[ANTIGRAVITY_SECURITY_SPRINT_SPEC] | lang=en
- "archive_antigravity_security_sprint_spec_what_this_builds": "What This Builds" | kind=entity | source=specs/archive/ANTIGRAVITY_SECURITY_SPRINT_SPEC.md:L7 | neighbors=[ANTIGRAVITY_SECURITY_SPRINT_SPEC] | lang=en
- "archive_antigravity_session46_consolidated_spec": "ANTIGRAVITY_SESSION46_CONSOLIDATED_SPEC.md" | kind=entity | source=specs/archive/ANTIGRAVITY_SESSION46_CONSOLIDATED_SPEC.md:L1 | neighbors=[ANTIGRAVITY SESSION 46 — CONSOLIDATED S…] | lang=en
- "archive_antigravity_session46_consolidated_spec_2a_jobqueuetable_tsx_row_card_glassmorphism": "2a. `JobQueueTable.tsx` — Row Card Glassmorphism" | kind=entity | source=specs/archive/ANTIGRAVITY_SESSION46_CONSOLIDATED_SPEC.md:L279 | neighbors=[PART 2 — DISPATCH DASHBOARD UI REDESIGN] | lang=pt
- "archive_antigravity_session46_consolidated_spec_2b_appsidebar_tsx_active_state_polish": "2b. `AppSidebar.tsx` — Active State Polish" | kind=entity | source=specs/archive/ANTIGRAVITY_SESSION46_CONSOLIDATED_SPEC.md:L328 | neighbors=[PART 2 — DISPATCH DASHBOARD UI REDESIGN] | lang=en
- "archive_antigravity_session46_consolidated_spec_2c_schedulepagecomponents_tsx_draggablejobcard_polish": "2c. `SchedulePageComponents.tsx` — DraggableJobCard Polish" | kind=entity | source=specs/archive/ANTIGRAVITY_SESSION46_CONSOLIDATED_SPEC.md:L349 | neighbors=[PART 2 — DISPATCH DASHBOARD UI REDESIGN] | lang=en
- "archive_antigravity_session46_consolidated_spec_3a_techpwa_gs_new_backend_actions": "3a. `TechPWA.gs` — New Backend Actions" | kind=entity | source=specs/archive/ANTIGRAVITY_SESSION46_CONSOLIDATED_SPEC.md:L385 | neighbors=[PART 3 — TECH PWA WORKFLOW FIX + UI RED…] | lang=pt
- "archive_antigravity_session46_consolidated_spec_3b_tech_pwa_src_lib_tech_session_ts_new_file": "3b. `tech-pwa/src/lib/tech-session.ts` — NEW FILE" | kind=entity | source=specs/archive/ANTIGRAVITY_SESSION46_CONSOLIDATED_SPEC.md:L479 | neighbors=[PART 3 — TECH PWA WORKFLOW FIX + UI RED…] | lang=en
- "archive_antigravity_session46_consolidated_spec_3c_tech_pwa_src_app_api_mock_exec_route_ts_add_mock_handlers": "3c. `tech-pwa/src/app/api/mock/exec/route.ts` — Add Mock Handlers" | kind=entity | source=specs/archive/ANTIGRAVITY_SESSION46_CONSOLIDATED_SPEC.md:L525 | neighbors=[PART 3 — TECH PWA WORKFLOW FIX + UI RED…] | lang=en
- "archive_antigravity_session46_consolidated_spec_3d_tech_pwa_src_components_clockedinbar_tsx_new_file": "3d. `tech-pwa/src/components/ClockedInBar.tsx` — NEW FILE" | kind=entity | source=specs/archive/ANTIGRAVITY_SESSION46_CONSOLIDATED_SPEC.md:L553 | neighbors=[PART 3 — TECH PWA WORKFLOW FIX + UI RED…] | lang=en
- "archive_antigravity_session46_consolidated_spec_3e_tech_pwa_src_app_layout_tsx_inject_clockedinbar_on_tech_routes": "3e. `tech-pwa/src/app/layout.tsx` — Inject ClockedInBar on Tech Routes" | kind=entity | source=specs/archive/ANTIGRAVITY_SESSION46_CONSOLIDATED_SPEC.md:L734 | neighbors=[PART 3 — TECH PWA WORKFLOW FIX + UI RED…] | lang=en
- "archive_antigravity_session46_consolidated_spec_3f_tech_pwa_src_app_jobs_page_tsx_shift_status_banner_start_shift_cta": "3f. `tech-pwa/src/app/jobs/page.tsx` — Shift Status Banner + Start Shift CTA" | kind=entity | source=specs/archive/ANTIGRAVITY_SESSION46_CONSOLIDATED_SPEC.md:L750 | neighbors=[PART 3 — TECH PWA WORKFLOW FIX + UI RED…] | lang=en
- "archive_antigravity_session46_consolidated_spec_3g_tech_pwa_src_app_job_jobid_page_tsx_shift_aware_flow": "3g. `tech-pwa/src/app/job/[jobId]/page.tsx` — Shift-Aware Flow" | kind=entity | source=specs/archive/ANTIGRAVITY_SESSION46_CONSOLIDATED_SPEC.md:L871 | neighbors=[PART 3 — TECH PWA WORKFLOW FIX + UI RED…] | lang=en
- "archive_antigravity_session46_consolidated_spec_antigravity_test_sprint_read_this_first": "🤖 ANTIGRAVITY TEST SPRINT — READ THIS FIRST" | kind=entity | source=specs/archive/ANTIGRAVITY_SESSION46_CONSOLIDATED_SPEC.md:L987 | neighbors=[VERIFICATION CHECKLIST] | lang=en
- "archive_antigravity_session46_consolidated_spec_antigravity_your_mandate": "🤖 ANTIGRAVITY: YOUR MANDATE" | kind=entity | source=specs/archive/ANTIGRAVITY_SESSION46_CONSOLIDATED_SPEC.md:L5 | neighbors=[ANTIGRAVITY SESSION 46 — CONSOLIDATED S…] | lang=en
- "archive_antigravity_session46_consolidated_spec_architecture_change_clock_in_once_per_shift": "Architecture Change: Clock In Once Per Shift" | kind=entity | source=specs/archive/ANTIGRAVITY_SESSION46_CONSOLIDATED_SPEC.md:L371 | neighbors=[PART 3 — TECH PWA WORKFLOW FIX + UI RED…] | lang=en
- "archive_antigravity_session46_consolidated_spec_bug_1_duplicate_contact_info_on_right_panel": "Bug 1: Duplicate Contact Info on Right Panel" | kind=entity | source=specs/archive/ANTIGRAVITY_SESSION46_CONSOLIDATED_SPEC.md:L71 | neighbors=[PART 1 — WO CARD BUG FIXES] | lang=en
- "archive_antigravity_session46_consolidated_spec_bug_2_thread_isolation_tenant_tab_shows_rm_thread": "Bug 2: Thread Isolation — Tenant Tab Shows RM Thread" | kind=entity | source=specs/archive/ANTIGRAVITY_SESSION46_CONSOLIDATED_SPEC.md:L110 | neighbors=[PART 1 — WO CARD BUG FIXES] | lang=en
- "archive_antigravity_session46_consolidated_spec_bug_3_ai_draft_and_send_route_to_wrong_thread": "Bug 3: AI Draft and Send Route to Wrong Thread" | kind=entity | source=specs/archive/ANTIGRAVITY_SESSION46_CONSOLIDATED_SPEC.md:L166 | neighbors=[PART 1 — WO CARD BUG FIXES] | lang=en
- "archive_antigravity_session46_consolidated_spec_bug_4_mark_pte_granted_button_does_nothing": "Bug 4: Mark PTE Granted Button Does Nothing" | kind=entity | source=specs/archive/ANTIGRAVITY_SESSION46_CONSOLIDATED_SPEC.md:L218 | neighbors=[PART 1 — WO CARD BUG FIXES] | lang=en
- "archive_antigravity_session46_consolidated_spec_critical_file_path_corrections_from_pg_draft": "⚠️ CRITICAL: FILE PATH CORRECTIONS FROM PG DRAFT" | kind=entity | source=specs/archive/ANTIGRAVITY_SESSION46_CONSOLIDATED_SPEC.md:L23 | neighbors=[ANTIGRAVITY SESSION 46 — CONSOLIDATED S…] | lang=en

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\PTOW\1_APT_Central_Command\.graphify\description-instructions\batch-157.json

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
