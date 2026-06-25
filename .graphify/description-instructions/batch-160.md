# Node Description Batch 161 of 412

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

- "archive_antigravity_tech_date_modals_3e_build_a_synthetic_techmap_for_datedetailmodal": "3e — Build a synthetic techMap for DateDetailModal" | kind=entity | source=specs/archive/ANTIGRAVITY_TECH_DATE_MODALS.md:L723 | neighbors=[PART 3 — weekly-schedule/page.tsx] | lang=en
- "archive_antigravity_tech_date_modals_3f_add_modals_to_jsx": "3f — Add modals to JSX" | kind=entity | source=specs/archive/ANTIGRAVITY_TECH_DATE_MODALS.md:L752 | neighbors=[PART 3 — weekly-schedule/page.tsx] | lang=en
- "archive_antigravity_tech_date_modals_antigravity_sprint_tech_profile_modal_date_detail_modal": "ANTIGRAVITY SPRINT — TECH PROFILE MODAL + DATE DETAIL MODAL" | kind=entity | source=specs/archive/ANTIGRAVITY_TECH_DATE_MODALS.md:L1 | neighbors=[ANTIGRAVITY_TECH_DATE_MODALS.md] | lang=en
- "archive_antigravity_tech_date_modals_commit_message": "COMMIT MESSAGE" | kind=entity | source=specs/archive/ANTIGRAVITY_TECH_DATE_MODALS.md:L796 | neighbors=[Date: April 23, 2026] | lang=en
- "archive_antigravity_tech_date_modals_deploy_after_this_change": "Deploy after this change:" | kind=entity | source=specs/archive/ANTIGRAVITY_TECH_DATE_MODALS.md:L72 | neighbors=[MANDATORY PRE-WORK A — Backend fix in D…] | lang=en
- "archive_antigravity_tech_date_modals_do_not_touch": "DO NOT TOUCH" | kind=entity | source=specs/archive/ANTIGRAVITY_TECH_DATE_MODALS.md:L787 | neighbors=[Date: April 23, 2026] | lang=pt
- "archive_antigravity_tech_date_modals_employee_id_display": "Employee ID display" | kind=entity | source=specs/archive/ANTIGRAVITY_TECH_DATE_MODALS.md:L185 | neighbors=[REFERENCE DATA — Decode maps for TechPr…] | lang=en
- "archive_antigravity_tech_date_modals_file_dashboard_api_dashboardapi_gs": "File: `dashboard-api/DashboardAPI.gs`" | kind=entity | source=specs/archive/ANTIGRAVITY_TECH_DATE_MODALS.md:L23 | neighbors=[MANDATORY PRE-WORK A — Backend fix in D…] | lang=en
- "archive_antigravity_tech_date_modals_fix_maptech_return_block_lines_95_104": "Fix mapTech() return block (lines ~95–104):" | kind=entity | source=specs/archive/ANTIGRAVITY_TECH_DATE_MODALS.md:L126 | neighbors=[MANDATORY PRE-WORK B — Fix TechStatus i…] | lang=en
- "archive_antigravity_tech_date_modals_fix_the_techstatus_interface_lines_19_32": "Fix the TechStatus interface (lines ~19–32):" | kind=entity | source=specs/archive/ANTIGRAVITY_TECH_DATE_MODALS.md:L90 | neighbors=[MANDATORY PRE-WORK B — Fix TechStatus i…] | lang=en
- "archive_antigravity_tech_date_modals_implement_this_alongside_antigravity_weekly_schedule_nav_md": "IMPLEMENT THIS ALONGSIDE `ANTIGRAVITY_WEEKLY_SCHEDULE_NAV.md`" | kind=entity | source=specs/archive/ANTIGRAVITY_TECH_DATE_MODALS.md:L7 | neighbors=[Date: April 23, 2026] | lang=en
- "archive_antigravity_tech_date_modals_owner_claude_code_executor_antigravity": "Owner: Claude Code | Executor: Antigravity" | kind=entity | source=specs/archive/ANTIGRAVITY_TECH_DATE_MODALS.md:L2 | neighbors=[ANTIGRAVITY_TECH_DATE_MODALS.md] | lang=en
- "archive_antigravity_tech_date_modals_rank_decode_rank_field_display_label": "Rank decode (rank field → display label)" | kind=entity | source=specs/archive/ANTIGRAVITY_TECH_DATE_MODALS.md:L162 | neighbors=[REFERENCE DATA — Decode maps for TechPr…] | lang=en
- "archive_antigravity_tech_date_modals_skill_rating_interpretation_lower_better": "Skill rating interpretation (lower = better)" | kind=entity | source=specs/archive/ANTIGRAVITY_TECH_DATE_MODALS.md:L177 | neighbors=[REFERENCE DATA — Decode maps for TechPr…] | lang=en
- "archive_antigravity_tech_date_modals_skills_no_decode_needed": "Skills — NO decode needed" | kind=entity | source=specs/archive/ANTIGRAVITY_TECH_DATE_MODALS.md:L173 | neighbors=[REFERENCE DATA — Decode maps for TechPr…] | lang=en
- "archive_antigravity_tech_date_modals_trainee_rule_display_warning_in_techprofilemodal": "Trainee rule (display warning in TechProfileModal)" | kind=entity | source=specs/archive/ANTIGRAVITY_TECH_DATE_MODALS.md:L188 | neighbors=[REFERENCE DATA — Decode maps for TechPr…] | lang=en
- "archive_antigravity_tech_date_modals_verification": "VERIFICATION" | kind=entity | source=specs/archive/ANTIGRAVITY_TECH_DATE_MODALS.md:L774 | neighbors=[Date: April 23, 2026] | lang=en
- "archive_antigravity_tech_pwa_sprint": "ANTIGRAVITY_TECH_PWA_SPRINT.md" | kind=entity | source=specs/archive/ANTIGRAVITY_TECH_PWA_SPRINT.md:L1 | neighbors=[ANTIGRAVITY SPRINT — Tech PWA Field Int…] | lang=en
- "archive_antigravity_tech_pwa_sprint_api_reference_do_not_change_call_signatures": "API REFERENCE (do not change call signatures)" | kind=entity | source=specs/archive/ANTIGRAVITY_TECH_PWA_SPRINT.md:L738 | neighbors=[ANTIGRAVITY SPRINT — Tech PWA Field Int…] | lang=pt
- "archive_antigravity_tech_pwa_sprint_design_tokens_to_add_to_globals_css": "DESIGN TOKENS TO ADD TO `globals.css`" | kind=entity | source=specs/archive/ANTIGRAVITY_TECH_PWA_SPRINT.md:L32 | neighbors=[ANTIGRAVITY SPRINT — Tech PWA Field Int…] | lang=en
- "archive_antigravity_tech_pwa_sprint_file_src_app_job_jobid_page_tsx_ui_rebuild": "FILE: `src/app/job/[jobId]/page.tsx` — UI REBUILD" | kind=entity | source=specs/archive/ANTIGRAVITY_TECH_PWA_SPRINT.md:L474 | neighbors=[ANTIGRAVITY SPRINT — Tech PWA Field Int…] | lang=en
- "archive_antigravity_tech_pwa_sprint_file_src_app_jobs_page_tsx_full_replacement": "FILE: `src/app/jobs/page.tsx` — FULL REPLACEMENT" | kind=entity | source=specs/archive/ANTIGRAVITY_TECH_PWA_SPRINT.md:L276 | neighbors=[ANTIGRAVITY SPRINT — Tech PWA Field Int…] | lang=en
- "archive_antigravity_tech_pwa_sprint_file_src_app_layout_tsx_update_add_providers": "FILE: `src/app/layout.tsx` — UPDATE (add providers)" | kind=entity | source=specs/archive/ANTIGRAVITY_TECH_PWA_SPRINT.md:L251 | neighbors=[ANTIGRAVITY SPRINT — Tech PWA Field Int…] | lang=en
- "archive_antigravity_tech_pwa_sprint_file_src_app_login_page_tsx_ui_polish_only": "FILE: `src/app/login/page.tsx` — UI POLISH ONLY" | kind=entity | source=specs/archive/ANTIGRAVITY_TECH_PWA_SPRINT.md:L706 | neighbors=[ANTIGRAVITY SPRINT — Tech PWA Field Int…] | lang=en
- "archive_antigravity_tech_pwa_sprint_file_src_components_installprompt_tsx_new": "FILE: `src/components/InstallPrompt.tsx` (NEW)" | kind=entity | source=specs/archive/ANTIGRAVITY_TECH_PWA_SPRINT.md:L178 | neighbors=[ANTIGRAVITY SPRINT — Tech PWA Field Int…] | lang=en
- "archive_antigravity_tech_pwa_sprint_file_src_components_skeleton_tsx_new": "FILE: `src/components/Skeleton.tsx` (NEW)" | kind=entity | source=specs/archive/ANTIGRAVITY_TECH_PWA_SPRINT.md:L149 | neighbors=[ANTIGRAVITY SPRINT — Tech PWA Field Int…] | lang=en
- "archive_antigravity_tech_pwa_sprint_file_src_components_toast_tsx_new": "FILE: `src/components/Toast.tsx` (NEW)" | kind=entity | source=specs/archive/ANTIGRAVITY_TECH_PWA_SPRINT.md:L169 | neighbors=[ANTIGRAVITY SPRINT — Tech PWA Field Int…] | lang=en
- "archive_antigravity_tech_pwa_sprint_file_src_context_toastcontext_tsx_new": "FILE: `src/context/ToastContext.tsx` (NEW)" | kind=entity | source=specs/archive/ANTIGRAVITY_TECH_PWA_SPRINT.md:L92 | neighbors=[ANTIGRAVITY SPRINT — Tech PWA Field Int…] | lang=en
- "archive_antigravity_tech_pwa_sprint_files_to_create": "FILES TO CREATE" | kind=entity | source=specs/archive/ANTIGRAVITY_TECH_PWA_SPRINT.md:L78 | neighbors=[ANTIGRAVITY SPRINT — Tech PWA Field Int…] | lang=en
- "archive_antigravity_tech_pwa_sprint_jobs_is_broken_for_field_techs": "`/jobs` is broken for field techs" | kind=entity | source=specs/archive/ANTIGRAVITY_TECH_PWA_SPRINT.md:L10 | neighbors=[CRITICAL BUG TO FIX FIRST] | lang=en
- "archive_antigravity_tech_pwa_sprint_tech_stack_notes": "TECH STACK NOTES" | kind=entity | source=specs/archive/ANTIGRAVITY_TECH_PWA_SPRINT.md:L20 | neighbors=[ANTIGRAVITY SPRINT — Tech PWA Field Int…] | lang=en
- "archive_antigravity_tech_pwa_sprint_verification_checklist": "VERIFICATION CHECKLIST" | kind=entity | source=specs/archive/ANTIGRAVITY_TECH_PWA_SPRINT.md:L759 | neighbors=[ANTIGRAVITY SPRINT — Tech PWA Field Int…] | lang=en
- "archive_antigravity_tech_pwa_sprint_what_to_keep_unchanged": "WHAT TO KEEP UNCHANGED" | kind=entity | source=specs/archive/ANTIGRAVITY_TECH_PWA_SPRINT.md:L722 | neighbors=[ANTIGRAVITY SPRINT — Tech PWA Field Int…] | lang=en
- "archive_antigravity_tenant_scheduling_spec_business_rules": "BUSINESS RULES" | kind=entity | source=specs/archive/ANTIGRAVITY_TENANT_SCHEDULING_SPEC.md:L19 | neighbors=[Sprint 30 | Spec author: Claude Code | …] | lang=en
- "archive_antigravity_tenant_scheduling_spec_da_dq_column_map_update_in_dashboard_api_dashboardapi_gs": "DA_DQ column map update in `dashboard-api/DashboardAPI.gs`" | kind=entity | source=specs/archive/ANTIGRAVITY_TENANT_SCHEDULING_SPEC.md:L43 | neighbors=[SCHEMA CHANGES] | lang=en
- "archive_antigravity_tenant_scheduling_spec_dispatch_queue_tenant_sched_badge": "DISPATCH QUEUE — \"TENANT SCHED\" BADGE" | kind=entity | source=specs/archive/ANTIGRAVITY_TENANT_SCHEDULING_SPEC.md:L625 | neighbors=[Sprint 30 | Spec author: Claude Code | …] | lang=en
- "archive_antigravity_tenant_scheduling_spec_dispatch_queue_two_new_columns": "Dispatch Queue — two new columns" | kind=entity | source=specs/archive/ANTIGRAVITY_TENANT_SCHEDULING_SPEC.md:L33 | neighbors=[SCHEMA CHANGES] | lang=en
- "archive_antigravity_tenant_scheduling_spec_generateschedulelinkda_params": "`generateScheduleLinkDA(params)`" | kind=entity | source=specs/archive/ANTIGRAVITY_TENANT_SCHEDULING_SPEC.md:L288 | neighbors=[NEW DASHBOARD API ENDPOINTS — `dashboar…] | lang=en
- "archive_antigravity_tenant_scheduling_spec_getavailableslotsda_params": "`getAvailableSlotsDA(params)`" | kind=entity | source=specs/archive/ANTIGRAVITY_TENANT_SCHEDULING_SPEC.md:L101 | neighbors=[NEW DASHBOARD API ENDPOINTS — `dashboar…] | lang=en
- "archive_antigravity_tenant_scheduling_spec_handler": "Handler:" | kind=entity | source=specs/archive/ANTIGRAVITY_TENANT_SCHEDULING_SPEC.md:L654 | neighbors=["SEND SCHEDULING LINK" BUTTON IN JOB DE…] | lang=en

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\PTOW\1_APT_Central_Command\.graphify\description-instructions\batch-160.json

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
