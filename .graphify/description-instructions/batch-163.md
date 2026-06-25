# Node Description Batch 164 of 412

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

- "archive_antigravity_time_off_frontend_spec_antigravity_spec_time_off_manager_frontend": "ANTIGRAVITY SPEC — Time Off Manager Frontend" | kind=entity | source=specs/archive/ANTIGRAVITY_TIME_OFF_FRONTEND_SPEC.md:L1 | neighbors=[ANTIGRAVITY_TIME_OFF_FRONTEND_SPEC.md] | lang=en
- "archive_antigravity_time_off_frontend_spec_calling_dashboardapi_gs_for_hr_page": "Calling DashboardAPI.gs (for `/hr` page)" | kind=entity | source=specs/archive/ANTIGRAVITY_TIME_OFF_FRONTEND_SPEC.md:L48 | neighbors=[API CALL PATTERNS — READ CAREFULLY] | lang=en
- "archive_antigravity_time_off_frontend_spec_calling_techpwa_gs_for_time_off_page": "Calling TechPWA.gs (for `/time-off` page)" | kind=entity | source=specs/archive/ANTIGRAVITY_TIME_OFF_FRONTEND_SPEC.md:L23 | neighbors=[API CALL PATTERNS — READ CAREFULLY] | lang=en
- "archive_antigravity_time_off_frontend_spec_date_april_23_2026": "Date: April 23, 2026" | kind=entity | source=specs/archive/ANTIGRAVITY_TIME_OFF_FRONTEND_SPEC.md:L3 | neighbors=[ANTIGRAVITY_TIME_OFF_FRONTEND_SPEC.md] | lang=en
- "archive_antigravity_time_off_frontend_spec_deployment": "DEPLOYMENT" | kind=entity | source=specs/archive/ANTIGRAVITY_TIME_OFF_FRONTEND_SPEC.md:L711 | neighbors=[Author: Claude Code] | lang=en
- "archive_antigravity_time_off_frontend_spec_file_1_create_tech_pwa_src_app_time_off_page_tsx": "FILE 1: CREATE `tech-pwa/src/app/time-off/page.tsx`" | kind=entity | source=specs/archive/ANTIGRAVITY_TIME_OFF_FRONTEND_SPEC.md:L89 | neighbors=[Author: Claude Code] | lang=en
- "archive_antigravity_time_off_frontend_spec_file_2_modify_tech_pwa_src_app_hr_page_tsx": "FILE 2: MODIFY `tech-pwa/src/app/hr/page.tsx`" | kind=entity | source=specs/archive/ANTIGRAVITY_TIME_OFF_FRONTEND_SPEC.md:L417 | neighbors=[Author: Claude Code] | lang=en
- "archive_antigravity_time_off_frontend_spec_file_3_modify_tech_pwa_src_components_dashboard_appsidebar_tsx": "FILE 3: MODIFY `tech-pwa/src/components/dashboard/AppSidebar.tsx`" | kind=entity | source=specs/archive/ANTIGRAVITY_TIME_OFF_FRONTEND_SPEC.md:L687 | neighbors=[Author: Claude Code] | lang=en
- "archive_antigravity_time_off_frontend_spec_overview": "OVERVIEW" | kind=entity | source=specs/archive/ANTIGRAVITY_TIME_OFF_FRONTEND_SPEC.md:L8 | neighbors=[Author: Claude Code] | lang=en
- "archive_antigravity_time_off_frontend_spec_sprint_time_off_manager_phase_2_frontend": "Sprint: Time Off Manager Phase 2 — Frontend" | kind=entity | source=specs/archive/ANTIGRAVITY_TIME_OFF_FRONTEND_SPEC.md:L2 | neighbors=[ANTIGRAVITY_TIME_OFF_FRONTEND_SPEC.md] | lang=en
- "archive_antigravity_time_off_frontend_spec_types_to_add": "TYPES TO ADD" | kind=entity | source=specs/archive/ANTIGRAVITY_TIME_OFF_FRONTEND_SPEC.md:L57 | neighbors=[Author: Claude Code] | lang=en
- "archive_antigravity_time_off_frontend_spec_verification": "VERIFICATION" | kind=entity | source=specs/archive/ANTIGRAVITY_TIME_OFF_FRONTEND_SPEC.md:L724 | neighbors=[Author: Claude Code] | lang=en
- "archive_antigravity_time_off_frontend_spec_what_not_to_change": "WHAT NOT TO CHANGE" | kind=entity | source=specs/archive/ANTIGRAVITY_TIME_OFF_FRONTEND_SPEC.md:L702 | neighbors=[Author: Claude Code] | lang=en
- "archive_antigravity_time_off_spec_accrualrules_tab": "AccrualRules tab" | kind=entity | source=specs/archive/ANTIGRAVITY_TIME_OFF_SPEC.md:L34 | neighbors=[COLUMN SCHEMAS] | lang=en
- "archive_antigravity_time_off_spec_antigravity_spec_time_off_manager_backend_integration": "ANTIGRAVITY SPEC — Time Off Manager Backend Integration" | kind=entity | source=specs/archive/ANTIGRAVITY_TIME_OFF_SPEC.md:L1 | neighbors=[ANTIGRAVITY_TIME_OFF_SPEC.md] | lang=en
- "archive_antigravity_time_off_spec_ca_legal_requirements_non_negotiable": "CA LEGAL REQUIREMENTS — NON-NEGOTIABLE" | kind=entity | source=specs/archive/ANTIGRAVITY_TIME_OFF_SPEC.md:L64 | neighbors=[Author: Claude Code] | lang=en
- "archive_antigravity_time_off_spec_context": "CONTEXT" | kind=entity | source=specs/archive/ANTIGRAVITY_TIME_OFF_SPEC.md:L8 | neighbors=[Author: Claude Code] | lang=en
- "archive_antigravity_time_off_spec_dashboardapi_gs_dashboard_api_project": "DashboardAPI.gs (dashboard-api/ project)" | kind=entity | source=specs/archive/ANTIGRAVITY_TIME_OFF_SPEC.md:L635 | neighbors=[DEPLOY COMMANDS] | lang=en
- "archive_antigravity_time_off_spec_date_april_23_2026": "Date: April 23, 2026" | kind=entity | source=specs/archive/ANTIGRAVITY_TIME_OFF_SPEC.md:L3 | neighbors=[ANTIGRAVITY_TIME_OFF_SPEC.md] | lang=en
- "archive_antigravity_time_off_spec_employees_tab": "Employees tab" | kind=entity | source=specs/archive/ANTIGRAVITY_TIME_OFF_SPEC.md:L25 | neighbors=[COLUMN SCHEMAS] | lang=en
- "archive_antigravity_time_off_spec_sprint_time_off_manager_phase_1_backend_only": "Sprint: Time Off Manager Phase 1 — Backend only" | kind=entity | source=specs/archive/ANTIGRAVITY_TIME_OFF_SPEC.md:L2 | neighbors=[ANTIGRAVITY_TIME_OFF_SPEC.md] | lang=en
- "archive_antigravity_time_off_spec_step_1_add_2_get_actions_in_doget": "Step 1 — Add 2 GET actions in `doGet()`" | kind=entity | source=specs/archive/ANTIGRAVITY_TIME_OFF_SPEC.md:L82 | neighbors=[1. `TechPWA.gs` (repo root)] | lang=en
- "archive_antigravity_time_off_spec_step_1_add_4_actions_in_dopost": "Step 1 — Add 4 actions in `doPost()`" | kind=entity | source=specs/archive/ANTIGRAVITY_TIME_OFF_SPEC.md:L386 | neighbors=[2. `dashboard-api/DashboardAPI.gs`] | lang=en
- "archive_antigravity_time_off_spec_step_2_add_2_post_actions_in_dopost": "Step 2 — Add 2 POST actions in `doPost()`" | kind=entity | source=specs/archive/ANTIGRAVITY_TIME_OFF_SPEC.md:L110 | neighbors=[1. `TechPWA.gs` (repo root)] | lang=en
- "archive_antigravity_time_off_spec_step_2_append_this_entire_block_at_the_end_of_dashboardapi_gs_after_testaccess_function": "Step 2 — Append this entire block at the end of DashboardAPI.gs (after testAcce…" | kind=entity | source=specs/archive/ANTIGRAVITY_TIME_OFF_SPEC.md:L409 | neighbors=[2. `dashboard-api/DashboardAPI.gs`] | lang=en
- "archive_antigravity_time_off_spec_step_3_append_this_entire_block_at_the_end_of_techpwa_gs_after_the_closing_of_setuppwasheets": "Step 3 — Append this entire block at the end of TechPWA.gs (after the closing `…" | kind=entity | source=specs/archive/ANTIGRAVITY_TIME_OFF_SPEC.md:L128 | neighbors=[1. `TechPWA.gs` (repo root)] | lang=en
- "archive_antigravity_time_off_spec_techpwa_gs_root_project_bound_script_no_separate_clasp_deploy_needed": "TechPWA.gs (root project — bound script, no separate clasp deploy needed)" | kind=entity | source=specs/archive/ANTIGRAVITY_TIME_OFF_SPEC.md:L624 | neighbors=[DEPLOY COMMANDS] | lang=en
- "archive_antigravity_time_off_spec_time_off_requests_tab": "Time Off Requests tab" | kind=entity | source=specs/archive/ANTIGRAVITY_TIME_OFF_SPEC.md:L44 | neighbors=[COLUMN SCHEMAS] | lang=en
- "archive_antigravity_time_off_spec_verification_steps": "VERIFICATION STEPS" | kind=entity | source=specs/archive/ANTIGRAVITY_TIME_OFF_SPEC.md:L653 | neighbors=[Author: Claude Code] | lang=en
- "archive_antigravity_time_off_spec_what_not_to_change": "WHAT NOT TO CHANGE" | kind=entity | source=specs/archive/ANTIGRAVITY_TIME_OFF_SPEC.md:L644 | neighbors=[Author: Claude Code] | lang=en
- "archive_antigravity_timecard_approval_spec": "ANTIGRAVITY_TIMECARD_APPROVAL_SPEC.md" | kind=entity | source=specs/archive/ANTIGRAVITY_TIMECARD_APPROVAL_SPEC.md:L1 | neighbors=[ANTIGRAVITY SPEC — Supervisor Timecard …] | lang=en
- "archive_antigravity_timecard_approval_spec_add_action_dispatch_entries": "Add action dispatch entries" | kind=entity | source=specs/archive/ANTIGRAVITY_TIMECARD_APPROVAL_SPEC.md:L250 | neighbors=[FEATURE 2 — DashboardAPI.gs: Three New …] | lang=en
- "archive_antigravity_timecard_approval_spec_add_approvetimecardda_function": "Add `approveTimecardDA` function" | kind=entity | source=specs/archive/ANTIGRAVITY_TIMECARD_APPROVAL_SPEC.md:L352 | neighbors=[FEATURE 2 — DashboardAPI.gs: Three New …] | lang=en
- "archive_antigravity_timecard_approval_spec_add_da_tm_column_map": "Add `DA_TM` column map" | kind=entity | source=specs/archive/ANTIGRAVITY_TIMECARD_APPROVAL_SPEC.md:L209 | neighbors=[FEATURE 2 — DashboardAPI.gs: Three New …] | lang=pt
- "archive_antigravity_timecard_approval_spec_add_disputetimecardda_function": "Add `disputeTimecardDA` function" | kind=entity | source=specs/archive/ANTIGRAVITY_TIMECARD_APPROVAL_SPEC.md:L396 | neighbors=[FEATURE 2 — DashboardAPI.gs: Three New …] | lang=en
- "archive_antigravity_timecard_approval_spec_add_ensuretimecardcolumns_utility": "Add `ensureTimecardColumns()` utility" | kind=entity | source=specs/archive/ANTIGRAVITY_TIMECARD_APPROVAL_SPEC.md:L175 | neighbors=[FEATURE 1 — TechPWA.gs: Column Map Exte…] | lang=en
- "archive_antigravity_timecard_approval_spec_add_gettimecardapprovalqueue_function": "Add `getTimecardApprovalQueue` function" | kind=entity | source=specs/archive/ANTIGRAVITY_TIMECARD_APPROVAL_SPEC.md:L262 | neighbors=[FEATURE 2 — DashboardAPI.gs: Three New …] | lang=en
- "archive_antigravity_timecard_approval_spec_add_signattestation_action_handler": "Add `signAttestation` action handler" | kind=entity | source=specs/archive/ANTIGRAVITY_TIMECARD_APPROVAL_SPEC.md:L131 | neighbors=[FEATURE 1 — TechPWA.gs: Column Map Exte…] | lang=en
- "archive_antigravity_timecard_approval_spec_approvetimecard": "`approveTimecard`" | kind=entity | source=specs/archive/ANTIGRAVITY_TIMECARD_APPROVAL_SPEC.md:L618 | neighbors=[FEATURE 4 — `tech-pwa/src/lib/dashboard…] | lang=en
- "archive_antigravity_timecard_approval_spec_architecture_decision_claude_code": "ARCHITECTURE DECISION (Claude Code)" | kind=entity | source=specs/archive/ANTIGRAVITY_TIMECARD_APPROVAL_SPEC.md:L24 | neighbors=[ANTIGRAVITY SPEC — Supervisor Timecard …] | lang=en

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\PTOW\1_APT_Central_Command\.graphify\description-instructions\batch-163.json

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
