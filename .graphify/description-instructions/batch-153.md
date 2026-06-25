# Node Description Batch 154 of 412

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

- "archive_antigravity_notifications_spec_step_1_wire_action_in_dopost": "Step 1: Wire action in `doPost`" | kind=entity | source=specs/archive/ANTIGRAVITY_NOTIFICATIONS_SPEC.md:L33 | neighbors=[BACKEND — DashboardAPI.gs] | lang=en
- "archive_antigravity_notifications_spec_step_2_add_getnotificationsda": "Step 2: Add `getNotificationsDA`" | kind=entity | source=specs/archive/ANTIGRAVITY_NOTIFICATIONS_SPEC.md:L40 | neighbors=[BACKEND — DashboardAPI.gs] | lang=en
- "archive_antigravity_notifications_spec_verification_steps": "VERIFICATION STEPS" | kind=entity | source=specs/archive/ANTIGRAVITY_NOTIFICATIONS_SPEC.md:L410 | neighbors=[Sprint owner: Antigravity | Spec author…] | lang=en
- "archive_antigravity_playwright_spec": "ANTIGRAVITY_PLAYWRIGHT_SPEC.md" | kind=entity | source=specs/archive/ANTIGRAVITY_PLAYWRIGHT_SPEC.md:L1 | neighbors=[ANTIGRAVITY SPEC — Playwright E2E Test …] | lang=en
- "archive_antigravity_playwright_spec_files_to_create": "Files to Create" | kind=entity | source=specs/archive/ANTIGRAVITY_PLAYWRIGHT_SPEC.md:L23 | neighbors=[ANTIGRAVITY SPEC — Playwright E2E Test …] | lang=en
- "archive_antigravity_playwright_spec_files_to_modify": "Files to Modify" | kind=entity | source=specs/archive/ANTIGRAVITY_PLAYWRIGHT_SPEC.md:L38 | neighbors=[ANTIGRAVITY SPEC — Playwright E2E Test …] | lang=en
- "archive_antigravity_playwright_spec_step_1_install_playwright": "Step 1 — Install Playwright" | kind=entity | source=specs/archive/ANTIGRAVITY_PLAYWRIGHT_SPEC.md:L53 | neighbors=[ANTIGRAVITY SPEC — Playwright E2E Test …] | lang=en
- "archive_antigravity_playwright_spec_step_10_lighthouserc_json_root": "Step 10 — `lighthouserc.json` (root)" | kind=entity | source=specs/archive/ANTIGRAVITY_PLAYWRIGHT_SPEC.md:L549 | neighbors=[ANTIGRAVITY SPEC — Playwright E2E Test …] | lang=en
- "archive_antigravity_playwright_spec_step_11_github_workflows_quality_sentinel_yml": "Step 11 — `.github/workflows/quality-sentinel.yml`" | kind=entity | source=specs/archive/ANTIGRAVITY_PLAYWRIGHT_SPEC.md:L580 | neighbors=[ANTIGRAVITY SPEC — Playwright E2E Test …] | lang=en
- "archive_antigravity_playwright_spec_step_2_tech_pwa_playwright_config_ts": "Step 2 — `tech-pwa/playwright.config.ts`" | kind=entity | source=specs/archive/ANTIGRAVITY_PLAYWRIGHT_SPEC.md:L65 | neighbors=[ANTIGRAVITY SPEC — Playwright E2E Test …] | lang=en
- "archive_antigravity_playwright_spec_step_3_tech_pwa_tests_fixtures_auth_ts": "Step 3 — `tech-pwa/tests/fixtures/auth.ts`" | kind=entity | source=specs/archive/ANTIGRAVITY_PLAYWRIGHT_SPEC.md:L110 | neighbors=[ANTIGRAVITY SPEC — Playwright E2E Test …] | lang=en
- "archive_antigravity_playwright_spec_step_4_tech_pwa_tests_e2e_auth_spec_ts": "Step 4 — `tech-pwa/tests/e2e/auth.spec.ts`" | kind=entity | source=specs/archive/ANTIGRAVITY_PLAYWRIGHT_SPEC.md:L137 | neighbors=[ANTIGRAVITY SPEC — Playwright E2E Test …] | lang=en
- "archive_antigravity_playwright_spec_step_5_tech_pwa_tests_e2e_dispatch_spec_ts": "Step 5 — `tech-pwa/tests/e2e/dispatch.spec.ts`" | kind=entity | source=specs/archive/ANTIGRAVITY_PLAYWRIGHT_SPEC.md:L188 | neighbors=[ANTIGRAVITY SPEC — Playwright E2E Test …] | lang=en
- "archive_antigravity_playwright_spec_step_6_tech_pwa_tests_e2e_scheduling_spec_ts": "Step 6 — `tech-pwa/tests/e2e/scheduling.spec.ts`" | kind=entity | source=specs/archive/ANTIGRAVITY_PLAYWRIGHT_SPEC.md:L275 | neighbors=[ANTIGRAVITY SPEC — Playwright E2E Test …] | lang=en
- "archive_antigravity_playwright_spec_step_7_tech_pwa_tests_e2e_tech_pwa_spec_ts": "Step 7 — `tech-pwa/tests/e2e/tech-pwa.spec.ts`" | kind=entity | source=specs/archive/ANTIGRAVITY_PLAYWRIGHT_SPEC.md:L317 | neighbors=[ANTIGRAVITY SPEC — Playwright E2E Test …] | lang=en
- "archive_antigravity_playwright_spec_step_8_tech_pwa_tests_e2e_accessibility_spec_ts": "Step 8 — `tech-pwa/tests/e2e/accessibility.spec.ts`" | kind=entity | source=specs/archive/ANTIGRAVITY_PLAYWRIGHT_SPEC.md:L405 | neighbors=[ANTIGRAVITY SPEC — Playwright E2E Test …] | lang=en
- "archive_antigravity_playwright_spec_step_9_github_workflows_e2e_yml": "Step 9 — `.github/workflows/e2e.yml`" | kind=entity | source=specs/archive/ANTIGRAVITY_PLAYWRIGHT_SPEC.md:L450 | neighbors=[ANTIGRAVITY SPEC — Playwright E2E Test …] | lang=en
- "archive_antigravity_playwright_spec_verification_steps_ag_must_confirm_all_before_marking_sprint_complete": "Verification Steps (AG must confirm all before marking sprint complete)" | kind=entity | source=specs/archive/ANTIGRAVITY_PLAYWRIGHT_SPEC.md:L667 | neighbors=[ANTIGRAVITY SPEC — Playwright E2E Test …] | lang=en
- "archive_antigravity_playwright_spec_what_not_to_change": "What NOT to Change" | kind=entity | source=specs/archive/ANTIGRAVITY_PLAYWRIGHT_SPEC.md:L44 | neighbors=[ANTIGRAVITY SPEC — Playwright E2E Test …] | lang=en
- "archive_antigravity_playwright_spec_what_this_builds": "What This Builds" | kind=entity | source=specs/archive/ANTIGRAVITY_PLAYWRIGHT_SPEC.md:L8 | neighbors=[ANTIGRAVITY SPEC — Playwright E2E Test …] | lang=en
- "archive_antigravity_project_overview": "ANTIGRAVITY_PROJECT_OVERVIEW.md" | kind=entity | source=specs/archive/ANTIGRAVITY_PROJECT_OVERVIEW.md:L1 | neighbors=[APT Central Command: Capabilities & Roa…] | lang=en
- "archive_antigravity_project_overview_autopilot_intake_zero_effort": "🛰️ Autopilot Intake (Zero-Effort)" | kind=entity | source=specs/archive/ANTIGRAVITY_PROJECT_OVERVIEW.md:L9 | neighbors=[1. Current Capabilities (The Foundation)] | lang=en
- "archive_antigravity_project_overview_compliance_sentinel_paga_mitigation": "🛡️ Compliance Sentinel (PAGA Mitigation)" | kind=entity | source=specs/archive/ANTIGRAVITY_PROJECT_OVERVIEW.md:L18 | neighbors=[1. Current Capabilities (The Foundation)] | lang=en
- "archive_antigravity_project_overview_data_driven_dispatch_triage_free": "🎯 Data-Driven Dispatch (Triage-Free)" | kind=entity | source=specs/archive/ANTIGRAVITY_PROJECT_OVERVIEW.md:L13 | neighbors=[1. Current Capabilities (The Foundation)] | lang=en
- "archive_antigravity_project_overview_master_work_order_archive": "🔍 Master Work Order Archive" | kind=entity | source=specs/archive/ANTIGRAVITY_PROJECT_OVERVIEW.md:L23 | neighbors=[1. Current Capabilities (The Foundation)] | lang=en
- "archive_antigravity_project_overview_phase_1_location_geofencing": "📍 Phase 1: Location & Geofencing" | kind=entity | source=specs/archive/ANTIGRAVITY_PROJECT_OVERVIEW.md:L31 | neighbors=[2. Technical Roadmap (The Future)] | lang=en
- "archive_antigravity_project_overview_phase_2_autonomous_compliance_alerts": "✉️ Phase 2: Autonomous Compliance Alerts" | kind=entity | source=specs/archive/ANTIGRAVITY_PROJECT_OVERVIEW.md:L35 | neighbors=[2. Technical Roadmap (The Future)] | lang=en
- "archive_antigravity_project_overview_phase_3_ae_docgen_integration_power_core": "📄 Phase 3: AE_DocGen Integration (Power Core)" | kind=entity | source=specs/archive/ANTIGRAVITY_PROJECT_OVERVIEW.md:L39 | neighbors=[2. Technical Roadmap (The Future)] | lang=en
- "archive_antigravity_project_overview_phase_4_full_cycle_automation": "🤖 Phase 4: Full-Cycle Automation" | kind=entity | source=specs/archive/ANTIGRAVITY_PROJECT_OVERVIEW.md:L43 | neighbors=[2. Technical Roadmap (The Future)] | lang=en
- "archive_antigravity_pwa_ui_prompt_1_login_screen_login_or": "1. Login Screen (`/login` or `/`)" | kind=entity | source=specs/archive/ANTIGRAVITY_PWA_UI_PROMPT.md:L82 | neighbors=[Screen-by-Screen Requirements] | lang=en
- "archive_antigravity_pwa_ui_prompt_2_today_s_jobs_screen_jobs": "2. Today's Jobs Screen (`/jobs`)" | kind=entity | source=specs/archive/ANTIGRAVITY_PWA_UI_PROMPT.md:L105 | neighbors=[Screen-by-Screen Requirements] | lang=en
- "archive_antigravity_pwa_ui_prompt_4_animations_motion": "4. Animations & Motion" | kind=entity | source=specs/archive/ANTIGRAVITY_PWA_UI_PROMPT.md:L211 | neighbors=[Screen-by-Screen Requirements] | lang=en
- "archive_antigravity_pwa_ui_prompt_5_toast_notification_system": "5. Toast Notification System" | kind=entity | source=specs/archive/ANTIGRAVITY_PWA_UI_PROMPT.md:L237 | neighbors=[Screen-by-Screen Requirements] | lang=en
- "archive_antigravity_pwa_ui_prompt_6_pwa_install_prompt": "6. PWA Install Prompt" | kind=entity | source=specs/archive/ANTIGRAVITY_PWA_UI_PROMPT.md:L249 | neighbors=[Screen-by-Screen Requirements] | lang=en
- "archive_antigravity_pwa_ui_prompt_7_technical_fixes_required": "7. Technical Fixes Required" | kind=entity | source=specs/archive/ANTIGRAVITY_PWA_UI_PROMPT.md:L261 | neighbors=[Screen-by-Screen Requirements] | lang=en
- "archive_antigravity_pwa_ui_prompt_8_skeleton_loaders": "8. Skeleton Loaders" | kind=entity | source=specs/archive/ANTIGRAVITY_PWA_UI_PROMPT.md:L289 | neighbors=[Screen-by-Screen Requirements] | lang=en
- "archive_antigravity_pwa_ui_prompt_acceptance_criteria": "Acceptance Criteria" | kind=entity | source=specs/archive/ANTIGRAVITY_PWA_UI_PROMPT.md:L298 | neighbors=[Paste this entire file into Antigravity…] | lang=en
- "archive_antigravity_pwa_ui_prompt_action_buttons": "Action Buttons" | kind=entity | source=specs/archive/ANTIGRAVITY_PWA_UI_PROMPT.md:L173 | neighbors=[3. Job Detail Screen (`/job/[jobId]`)] | lang=en
- "archive_antigravity_pwa_ui_prompt_api_endpoints_do_not_change": "API Endpoints (do not change)" | kind=entity | source=specs/archive/ANTIGRAVITY_PWA_UI_PROMPT.md:L339 | neighbors=[Paste this entire file into Antigravity…] | lang=pt
- "archive_antigravity_pwa_ui_prompt_apt_tech_pwa_expert_grade_ui_brief_for_antigravity": "APT Tech PWA — Expert-Grade UI Brief for Antigravity" | kind=entity | source=specs/archive/ANTIGRAVITY_PWA_UI_PROMPT.md:L1 | neighbors=[ANTIGRAVITY_PWA_UI_PROMPT.md] | lang=en

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\PTOW\1_APT_Central_Command\.graphify\description-instructions\batch-153.json

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
