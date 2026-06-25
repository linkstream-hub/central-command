# Node Description Batch 143 of 412

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

- "archive_antigravity_battletest_rerun_spec_c_7_trainee_rule_original_spec_block_12": "C.7 — Trainee Rule (original spec Block 12)" | kind=entity | source=specs/archive/ANTIGRAVITY_BATTLETEST_RERUN_SPEC.md:L180 | neighbors=[PART C — SKIPPED SPEC BLOCKS] | lang=en
- "archive_antigravity_battletest_rerun_spec_c_8_tech_pwa_change_pin_original_spec_block_18": "C.8 — Tech PWA: Change PIN (original spec Block 18)" | kind=entity | source=specs/archive/ANTIGRAVITY_BATTLETEST_RERUN_SPEC.md:L188 | neighbors=[PART C — SKIPPED SPEC BLOCKS] | lang=en
- "archive_antigravity_battletest_rerun_spec_c_9_tech_pwa_time_off_original_spec_block_19": "C.9 — Tech PWA: Time Off (original spec Block 19)" | kind=entity | source=specs/archive/ANTIGRAVITY_BATTLETEST_RERUN_SPEC.md:L198 | neighbors=[PART C — SKIPPED SPEC BLOCKS] | lang=en
- "archive_antigravity_battletest_rerun_spec_context_why_this_re_run_exists": "CONTEXT — WHY THIS RE-RUN EXISTS" | kind=entity | source=specs/archive/ANTIGRAVITY_BATTLETEST_RERUN_SPEC.md:L9 | neighbors=[(3) Cover the spec blocks that were ent…] | lang=en
- "archive_antigravity_battletest_rerun_spec_mandatory_pre_flight": "MANDATORY PRE-FLIGHT" | kind=entity | source=specs/archive/ANTIGRAVITY_BATTLETEST_RERUN_SPEC.md:L23 | neighbors=[(3) Cover the spec blocks that were ent…] | lang=en
- "archive_antigravity_battletest_rerun_spec_mode_test_sprint_only_find_bugs_log_them_fix_nothing": "Mode: TEST SPRINT ONLY — find bugs, log them, fix NOTHING" | kind=entity | source=specs/archive/ANTIGRAVITY_BATTLETEST_RERUN_SPEC.md:L3 | neighbors=[ANTIGRAVITY_BATTLETEST_RERUN_SPEC.md] | lang=en
- "archive_antigravity_battletest_rerun_spec_objective_1_verify_the_tab_bar_bug_fix_2_re_run_the_items_ag_got_wrong_due_to_nav_errors": "Objective: (1) Verify the tab bar bug fix, (2) Re-run the items AG got wrong du…" | kind=entity | source=specs/archive/ANTIGRAVITY_BATTLETEST_RERUN_SPEC.md:L4 | neighbors=[ANTIGRAVITY_BATTLETEST_RERUN_SPEC.md] | lang=en
- "archive_antigravity_battletest_rerun_spec_output_format": "OUTPUT FORMAT" | kind=entity | source=specs/archive/ANTIGRAVITY_BATTLETEST_RERUN_SPEC.md:L218 | neighbors=[(3) Cover the spec blocks that were ent…] | lang=en
- "archive_antigravity_battletest_rerun_spec_part_a_verify_the_bug_fix_block_2_re_run": "PART A — VERIFY THE BUG FIX (Block 2 re-run)" | kind=entity | source=specs/archive/ANTIGRAVITY_BATTLETEST_RERUN_SPEC.md:L31 | neighbors=[(3) Cover the spec blocks that were ent…] | lang=en
- "archive_antigravity_battletest_rerun_spec_session_49_test_sprint_only": "Session 49 — Test Sprint Only" | kind=entity | source=specs/archive/ANTIGRAVITY_BATTLETEST_RERUN_SPEC.md:L2 | neighbors=[ANTIGRAVITY_BATTLETEST_RERUN_SPEC.md] | lang=en
- "archive_antigravity_billing_team_sprint_1a_appsidebar_tsx_tech_pwa_src_components_dashboard_appsidebar_tsx": "1a. AppSidebar.tsx — `tech-pwa/src/components/dashboard/AppSidebar.tsx`" | kind=entity | source=specs/archive/ANTIGRAVITY_BILLING_TEAM_SPRINT.md:L15 | neighbors=[TASK 1 — Rename "Jobs" → "Billing" in S…] | lang=pt
- "archive_antigravity_billing_team_sprint_1b_create_tech_pwa_src_app_billing_page_tsx": "1b. Create `tech-pwa/src/app/billing/page.tsx`" | kind=entity | source=specs/archive/ANTIGRAVITY_BILLING_TEAM_SPRINT.md:L43 | neighbors=[TASK 1 — Rename "Jobs" → "Billing" in S…] | lang=en
- "archive_antigravity_billing_team_sprint_antigravity_sprint_billing_page_team_page_fix": "ANTIGRAVITY SPRINT — BILLING PAGE + TEAM PAGE FIX" | kind=entity | source=specs/archive/ANTIGRAVITY_BILLING_TEAM_SPRINT.md:L1 | neighbors=[ANTIGRAVITY_BILLING_TEAM_SPRINT.md] | lang=en
- "archive_antigravity_billing_team_sprint_commit_message": "COMMIT MESSAGE" | kind=entity | source=specs/archive/ANTIGRAVITY_BILLING_TEAM_SPRINT.md:L247 | neighbors=[Date: April 23, 2026] | lang=en
- "archive_antigravity_billing_team_sprint_do_not_touch": "DO NOT TOUCH" | kind=entity | source=specs/archive/ANTIGRAVITY_BILLING_TEAM_SPRINT.md:L238 | neighbors=[Date: April 23, 2026] | lang=pt
- "archive_antigravity_billing_team_sprint_exact_changes_to_team_page_tsx": "Exact changes to `team/page.tsx`:" | kind=entity | source=specs/archive/ANTIGRAVITY_BILLING_TEAM_SPRINT.md:L109 | neighbors=[TASK 2 — Fix Team Page: Weekly Job Coun…] | lang=en
- "archive_antigravity_billing_team_sprint_file_tech_pwa_src_app_team_page_tsx": "File: `tech-pwa/src/app/team/page.tsx`" | kind=entity | source=specs/archive/ANTIGRAVITY_BILLING_TEAM_SPRINT.md:L103 | neighbors=[TASK 2 — Fix Team Page: Weekly Job Coun…] | lang=en
- "archive_antigravity_billing_team_sprint_overview": "OVERVIEW" | kind=entity | source=specs/archive/ANTIGRAVITY_BILLING_TEAM_SPRINT.md:L7 | neighbors=[Date: April 23, 2026] | lang=en
- "archive_antigravity_billing_team_sprint_owner_claude_code_executor_antigravity": "Owner: Claude Code | Executor: Antigravity" | kind=entity | source=specs/archive/ANTIGRAVITY_BILLING_TEAM_SPRINT.md:L2 | neighbors=[ANTIGRAVITY_BILLING_TEAM_SPRINT.md] | lang=en
- "archive_antigravity_billing_team_sprint_verification": "VERIFICATION" | kind=entity | source=specs/archive/ANTIGRAVITY_BILLING_TEAM_SPRINT.md:L226 | neighbors=[Date: April 23, 2026] | lang=en
- "archive_antigravity_break_compliance_spec": "ANTIGRAVITY_BREAK_COMPLIANCE_SPEC.md" | kind=entity | source=specs/archive/ANTIGRAVITY_BREAK_COMPLIANCE_SPEC.md:L1 | neighbors=[ANTIGRAVITY SPRINT — CA Break Complianc…] | lang=en
- "archive_antigravity_break_compliance_spec_architecture_decision_claude_code": "ARCHITECTURE DECISION (Claude Code)" | kind=entity | source=specs/archive/ANTIGRAVITY_BREAK_COMPLIANCE_SPEC.md:L18 | neighbors=[ANTIGRAVITY SPRINT — CA Break Complianc…] | lang=en
- "archive_antigravity_break_compliance_spec_ca_break_law_reference_for_n8n_logic_validation": "CA BREAK LAW REFERENCE (for n8n logic validation)" | kind=entity | source=specs/archive/ANTIGRAVITY_BREAK_COMPLIANCE_SPEC.md:L570 | neighbors=[ANTIGRAVITY SPRINT — CA Break Complianc…] | lang=en
- "archive_antigravity_break_compliance_spec_dashboard_api_appsscript_json_enable_calendar_api": "`dashboard-api/appsscript.json` — enable Calendar API" | kind=entity | source=specs/archive/ANTIGRAVITY_BREAK_COMPLIANCE_SPEC.md:L45 | neighbors=[FEATURE 1 — TOM Phase 2: Google Calenda…] | lang=en
- "archive_antigravity_break_compliance_spec_dashboard_api_dashboardapi_gs_approvetimeoff_handler": "`dashboard-api/DashboardAPI.gs` — `approveTimeOff` handler" | kind=entity | source=specs/archive/ANTIGRAVITY_BREAK_COMPLIANCE_SPEC.md:L69 | neighbors=[FEATURE 1 — TOM Phase 2: Google Calenda…] | lang=en
- "archive_antigravity_break_compliance_spec_dashboard_api_dashboardapi_gs_denytimeoff_handler": "`dashboard-api/DashboardAPI.gs` — `denyTimeOff` handler" | kind=entity | source=specs/archive/ANTIGRAVITY_BREAK_COMPLIANCE_SPEC.md:L111 | neighbors=[FEATURE 1 — TOM Phase 2: Google Calenda…] | lang=en
- "archive_antigravity_break_compliance_spec_deployment_order": "DEPLOYMENT ORDER" | kind=entity | source=specs/archive/ANTIGRAVITY_BREAK_COMPLIANCE_SPEC.md:L528 | neighbors=[ANTIGRAVITY SPRINT — CA Break Complianc…] | lang=en
- "archive_antigravity_break_compliance_spec_part_a_techpwa_gs_compliance_webhook": "Part A: TechPWA.gs — Compliance Webhook" | kind=entity | source=specs/archive/ANTIGRAVITY_BREAK_COMPLIANCE_SPEC.md:L133 | neighbors=[FEATURE 2 — CA Break Compliance Foundat…] | lang=pt
- "archive_antigravity_break_compliance_spec_part_b_compliancealerts_sheet_setup": "Part B: ComplianceAlerts Sheet Setup" | kind=entity | source=specs/archive/ANTIGRAVITY_BREAK_COMPLIANCE_SPEC.md:L198 | neighbors=[FEATURE 2 — CA Break Compliance Foundat…] | lang=en
- "archive_antigravity_break_compliance_spec_part_c_dashboardapi_gs_getcompliancealerts_action": "Part C: DashboardAPI.gs — `getComplianceAlerts` action" | kind=entity | source=specs/archive/ANTIGRAVITY_BREAK_COMPLIANCE_SPEC.md:L221 | neighbors=[FEATURE 2 — CA Break Compliance Foundat…] | lang=en
- "archive_antigravity_break_compliance_spec_part_d_dashboard_api_ts_add_type_fetch": "Part D: `dashboard-api.ts` — add type + fetch" | kind=entity | source=specs/archive/ANTIGRAVITY_BREAK_COMPLIANCE_SPEC.md:L274 | neighbors=[FEATURE 2 — CA Break Compliance Foundat…] | lang=en
- "archive_antigravity_break_compliance_spec_part_e_n8n_workflow_n8n_workflows_ca_break_compliance_json": "Part E: n8n Workflow — `n8n/workflows/ca_break_compliance.json`" | kind=entity | source=specs/archive/ANTIGRAVITY_BREAK_COMPLIANCE_SPEC.md:L292 | neighbors=[FEATURE 2 — CA Break Compliance Foundat…] | lang=en
- "archive_antigravity_break_compliance_spec_prerequisite_brandon_action_before_deploying_this_sprint": "Prerequisite (Brandon action — before deploying this sprint)" | kind=entity | source=specs/archive/ANTIGRAVITY_BREAK_COMPLIANCE_SPEC.md:L39 | neighbors=[FEATURE 1 — TOM Phase 2: Google Calenda…] | lang=en
- "archive_antigravity_break_compliance_spec_tech_pwa_src_app_live_page_tsx": "`tech-pwa/src/app/live/page.tsx`" | kind=entity | source=specs/archive/ANTIGRAVITY_BREAK_COMPLIANCE_SPEC.md:L452 | neighbors=[Part F: CC2.0 — Compliance Badge on Tec…] | lang=en
- "archive_antigravity_break_compliance_spec_tech_pwa_src_components_dashboard_techavailabilitypanel_tsx": "`tech-pwa/src/components/dashboard/TechAvailabilityPanel.tsx`" | kind=entity | source=specs/archive/ANTIGRAVITY_BREAK_COMPLIANCE_SPEC.md:L480 | neighbors=[Part F: CC2.0 — Compliance Badge on Tec…] | lang=en
- "archive_antigravity_break_compliance_spec_verification": "VERIFICATION" | kind=entity | source=specs/archive/ANTIGRAVITY_BREAK_COMPLIANCE_SPEC.md:L541 | neighbors=[ANTIGRAVITY SPRINT — CA Break Complianc…] | lang=en
- "archive_antigravity_break_compliance_spec_what_it_does": "What it does" | kind=entity | source=specs/archive/ANTIGRAVITY_BREAK_COMPLIANCE_SPEC.md:L36 | neighbors=[FEATURE 1 — TOM Phase 2: Google Calenda…] | lang=en
- "archive_antigravity_break_compliance_spec_what_to_keep_unchanged": "WHAT TO KEEP UNCHANGED" | kind=entity | source=specs/archive/ANTIGRAVITY_BREAK_COMPLIANCE_SPEC.md:L517 | neighbors=[ANTIGRAVITY SPRINT — CA Break Complianc…] | lang=en
- "archive_antigravity_calendar_spec_appsidebar_tsx": "AppSidebar.tsx" | kind=entity | source=specs/archive/ANTIGRAVITY_CALENDAR_SPEC.md:L199 | neighbors=[SIDEBAR & ROUTE GUARD] | lang=en
- "archive_antigravity_calendar_spec_calendar_unified_team_calendar_view": "/calendar — Unified Team Calendar View" | kind=entity | source=specs/archive/ANTIGRAVITY_CALENDAR_SPEC.md:L2 | neighbors=[ANTIGRAVITY_CALENDAR_SPEC.md] | lang=en

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\PTOW\1_APT_Central_Command\.graphify\description-instructions\batch-142.json

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
