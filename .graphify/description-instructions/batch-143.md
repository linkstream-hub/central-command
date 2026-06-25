# Node Description Batch 144 of 412

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

- "archive_antigravity_calendar_spec_calendarskeleton_component_inline_in_the_file": "CalendarSkeleton component (inline in the file)" | kind=entity | source=specs/archive/ANTIGRAVITY_CALENDAR_SPEC.md:L611 | neighbors=[FRONTEND — calendar/page.tsx] | lang=en
- "archive_antigravity_calendar_spec_data_fetch": "Data fetch" | kind=entity | source=specs/archive/ANTIGRAVITY_CALENDAR_SPEC.md:L258 | neighbors=[FRONTEND — calendar/page.tsx] | lang=en
- "archive_antigravity_calendar_spec_daydetailpanel_component_inline_in_the_file": "DayDetailPanel component (inline in the file)" | kind=entity | source=specs/archive/ANTIGRAVITY_CALENDAR_SPEC.md:L513 | neighbors=[FRONTEND — calendar/page.tsx] | lang=en
- "archive_antigravity_calendar_spec_do_not_touch": "Do NOT touch" | kind=entity | source=specs/archive/ANTIGRAVITY_CALENDAR_SPEC.md:L30 | neighbors=[WHAT TO BUILD] | lang=pt
- "archive_antigravity_calendar_spec_files_to_edit": "Files to edit" | kind=entity | source=specs/archive/ANTIGRAVITY_CALENDAR_SPEC.md:L24 | neighbors=[WHAT TO BUILD] | lang=en
- "archive_antigravity_calendar_spec_frontend_dashboard_api_ts_additions": "FRONTEND — dashboard-api.ts additions" | kind=entity | source=specs/archive/ANTIGRAVITY_CALENDAR_SPEC.md:L169 | neighbors=[Sprint owner: Antigravity | Spec author…] | lang=en
- "archive_antigravity_calendar_spec_month_navigation_helpers": "Month navigation helpers" | kind=entity | source=specs/archive/ANTIGRAVITY_CALENDAR_SPEC.md:L272 | neighbors=[FRONTEND — calendar/page.tsx] | lang=en
- "archive_antigravity_calendar_spec_monthgrid_component_inline_in_the_file": "MonthGrid component (inline in the file)" | kind=entity | source=specs/archive/ANTIGRAVITY_CALENDAR_SPEC.md:L407 | neighbors=[FRONTEND — calendar/page.tsx] | lang=en
- "archive_antigravity_calendar_spec_new_files": "New files" | kind=entity | source=specs/archive/ANTIGRAVITY_CALENDAR_SPEC.md:L21 | neighbors=[WHAT TO BUILD] | lang=en
- "archive_antigravity_calendar_spec_notes": "NOTES" | kind=entity | source=specs/archive/ANTIGRAVITY_CALENDAR_SPEC.md:L692 | neighbors=[Sprint owner: Antigravity | Spec author…] | lang=en
- "archive_antigravity_calendar_spec_overview": "OVERVIEW" | kind=entity | source=specs/archive/ANTIGRAVITY_CALENDAR_SPEC.md:L7 | neighbors=[Sprint owner: Antigravity | Spec author…] | lang=en
- "archive_antigravity_calendar_spec_page_jsx_structure": "Page JSX structure" | kind=entity | source=specs/archive/ANTIGRAVITY_CALENDAR_SPEC.md:L313 | neighbors=[FRONTEND — calendar/page.tsx] | lang=en
- "archive_antigravity_calendar_spec_rbac_summary": "RBAC SUMMARY" | kind=entity | source=specs/archive/ANTIGRAVITY_CALENDAR_SPEC.md:L653 | neighbors=[Sprint owner: Antigravity | Spec author…] | lang=en
- "archive_antigravity_calendar_spec_required_imports_for_calendar_page_tsx": "Required imports for calendar/page.tsx" | kind=entity | source=specs/archive/ANTIGRAVITY_CALENDAR_SPEC.md:L638 | neighbors=[FRONTEND — calendar/page.tsx] | lang=en
- "archive_antigravity_calendar_spec_role_aware_view_mode_initialization": "Role-aware view mode initialization" | kind=entity | source=specs/archive/ANTIGRAVITY_CALENDAR_SPEC.md:L241 | neighbors=[FRONTEND — calendar/page.tsx] | lang=en
- "archive_antigravity_calendar_spec_routeguard_tsx": "RouteGuard.tsx" | kind=entity | source=specs/archive/ANTIGRAVITY_CALENDAR_SPEC.md:L214 | neighbors=[SIDEBAR & ROUTE GUARD] | lang=en
- "archive_antigravity_calendar_spec_state_variables": "State variables" | kind=entity | source=specs/archive/ANTIGRAVITY_CALENDAR_SPEC.md:L227 | neighbors=[FRONTEND — calendar/page.tsx] | lang=en
- "archive_antigravity_calendar_spec_step_1_wire_the_action_in_dopost": "Step 1: Wire the action in `doPost`" | kind=entity | source=specs/archive/ANTIGRAVITY_CALENDAR_SPEC.md:L40 | neighbors=[BACKEND — DashboardAPI.gs] | lang=en
- "archive_antigravity_calendar_spec_step_2_add_getcalendardatada_function": "Step 2: Add `getCalendarDataDA` function" | kind=entity | source=specs/archive/ANTIGRAVITY_CALENDAR_SPEC.md:L48 | neighbors=[BACKEND — DashboardAPI.gs] | lang=en
- "archive_antigravity_calendar_spec_verification_steps_check_these_in_the_browser_after_build": "VERIFICATION STEPS (check these in the browser after build)" | kind=entity | source=specs/archive/ANTIGRAVITY_CALENDAR_SPEC.md:L665 | neighbors=[Sprint owner: Antigravity | Spec author…] | lang=en
- "archive_antigravity_calendar_spec_what_to_keep_unchanged": "WHAT TO KEEP UNCHANGED" | kind=entity | source=specs/archive/ANTIGRAVITY_CALENDAR_SPEC.md:L683 | neighbors=[Sprint owner: Antigravity | Spec author…] | lang=en
- "archive_antigravity_claw_army_phase2_spec_add_to_github_secrets_for_github_actions_soldiers": "Add to GitHub Secrets (for GitHub Actions soldiers)" | kind=entity | source=specs/archive/ANTIGRAVITY_CLAW_ARMY_PHASE2_SPEC.md:L27 | neighbors=[PREREQUISITE — API KEY SETUP (Brandon m…] | lang=en
- "archive_antigravity_claw_army_phase2_spec_add_to_railway_for_railway_sentinels": "Add to Railway (for Railway sentinels)" | kind=entity | source=specs/archive/ANTIGRAVITY_CLAW_ARMY_PHASE2_SPEC.md:L32 | neighbors=[PREREQUISITE — API KEY SETUP (Brandon m…] | lang=en
- "archive_antigravity_claw_army_phase2_spec_anthropic_api_key": "Anthropic API Key" | kind=entity | source=specs/archive/ANTIGRAVITY_CLAW_ARMY_PHASE2_SPEC.md:L22 | neighbors=[PREREQUISITE — API KEY SETUP (Brandon m…] | lang=en
- "archive_antigravity_claw_army_phase2_spec_architecture": "ARCHITECTURE" | kind=entity | source=specs/archive/ANTIGRAVITY_CLAW_ARMY_PHASE2_SPEC.md:L41 | neighbors=[Sprint 30 | Spec author: Claude Code | …] | lang=en
- "archive_antigravity_claw_army_phase2_spec_claw_army_phase_2_railway_sentinels_spec_architect": "Claw Army Phase 2 — Railway Sentinels + Spec Architect" | kind=entity | source=specs/archive/ANTIGRAVITY_CLAW_ARMY_PHASE2_SPEC.md:L2 | neighbors=[ANTIGRAVITY_CLAW_ARMY_PHASE2_SPEC.md] | lang=en
- "archive_antigravity_claw_army_phase2_spec_gettimerecordsforauditda": "`getTimeRecordsForAuditDA()`" | kind=entity | source=specs/archive/ANTIGRAVITY_CLAW_ARMY_PHASE2_SPEC.md:L550 | neighbors=[ADDITIONAL DASHBOARDAPI.GS ENDPOINTS (n…] | lang=en
- "archive_antigravity_claw_army_phase2_spec_health_sentinel": "Health Sentinel" | kind=entity | source=specs/archive/ANTIGRAVITY_CLAW_ARMY_PHASE2_SPEC.md:L623 | neighbors=[VERIFICATION STEPS] | lang=en
- "archive_antigravity_claw_army_phase2_spec_logcomplianceanomaliesda_params": "`logComplianceAnomaliesDA(params)`" | kind=entity | source=specs/archive/ANTIGRAVITY_CLAW_ARMY_PHASE2_SPEC.md:L580 | neighbors=[ADDITIONAL DASHBOARDAPI.GS ENDPOINTS (n…] | lang=en
- "archive_antigravity_claw_army_phase2_spec_logwcscanresultda_and_logstalejobalertda_same_pattern_as_above_write_to_sentinellog_tab": "`logWcScanResultDA` and `logStaleJobAlertDA` — same pattern as above, write to …" | kind=entity | source=specs/archive/ANTIGRAVITY_CLAW_ARMY_PHASE2_SPEC.md:L598 | neighbors=[ADDITIONAL DASHBOARDAPI.GS ENDPOINTS (n…] | lang=en
- "archive_antigravity_claw_army_phase2_spec_overview": "OVERVIEW" | kind=entity | source=specs/archive/ANTIGRAVITY_CLAW_ARMY_PHASE2_SPEC.md:L7 | neighbors=[Sprint 30 | Spec author: Claude Code | …] | lang=en
- "archive_antigravity_claw_army_phase2_spec_sentinel_1_health_sentinel": "SENTINEL 1 — HEALTH SENTINEL" | kind=entity | source=specs/archive/ANTIGRAVITY_CLAW_ARMY_PHASE2_SPEC.md:L91 | neighbors=[Sprint 30 | Spec author: Claude Code | …] | lang=en
- "archive_antigravity_claw_army_phase2_spec_sentinel_2_time_anomaly_detector": "SENTINEL 2 — TIME ANOMALY DETECTOR" | kind=entity | source=specs/archive/ANTIGRAVITY_CLAW_ARMY_PHASE2_SPEC.md:L150 | neighbors=[Sprint 30 | Spec author: Claude Code | …] | lang=en
- "archive_antigravity_claw_army_phase2_spec_sentinel_3_wc_scanner": "SENTINEL 3 — WC SCANNER" | kind=entity | source=specs/archive/ANTIGRAVITY_CLAW_ARMY_PHASE2_SPEC.md:L251 | neighbors=[Sprint 30 | Spec author: Claude Code | …] | lang=en
- "archive_antigravity_claw_army_phase2_spec_sentinel_4_stale_job_sentinel": "SENTINEL 4 — STALE JOB SENTINEL" | kind=entity | source=specs/archive/ANTIGRAVITY_CLAW_ARMY_PHASE2_SPEC.md:L303 | neighbors=[Sprint 30 | Spec author: Claude Code | …] | lang=en
- "archive_antigravity_claw_army_phase2_spec_sentinel_5_spec_architect_tier_4": "SENTINEL 5 — SPEC ARCHITECT (TIER 4)" | kind=entity | source=specs/archive/ANTIGRAVITY_CLAW_ARMY_PHASE2_SPEC.md:L352 | neighbors=[Sprint 30 | Spec author: Claude Code | …] | lang=en
- "archive_antigravity_claw_army_phase2_spec_spec_architect": "Spec Architect" | kind=entity | source=specs/archive/ANTIGRAVITY_CLAW_ARMY_PHASE2_SPEC.md:L638 | neighbors=[VERIFICATION STEPS] | lang=en
- "archive_antigravity_claw_army_phase2_spec_stale_job_sentinel": "Stale Job Sentinel" | kind=entity | source=specs/archive/ANTIGRAVITY_CLAW_ARMY_PHASE2_SPEC.md:L635 | neighbors=[VERIFICATION STEPS] | lang=en
- "archive_antigravity_claw_army_phase2_spec_time_anomaly_detector": "Time Anomaly Detector" | kind=entity | source=specs/archive/ANTIGRAVITY_CLAW_ARMY_PHASE2_SPEC.md:L627 | neighbors=[VERIFICATION STEPS] | lang=en
- "archive_antigravity_claw_army_phase2_spec_wc_scanner": "WC Scanner" | kind=entity | source=specs/archive/ANTIGRAVITY_CLAW_ARMY_PHASE2_SPEC.md:L631 | neighbors=[VERIFICATION STEPS] | lang=en

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\PTOW\1_APT_Central_Command\.graphify\description-instructions\batch-143.json

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
