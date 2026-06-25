# Node Description Batch 147 of 412

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
Write every description in English (en). Do not switch languages.
No marketing language.
Respond ONLY with a JSON object mapping each node id (as a string) to its
one-sentence description — no prose, no markdown fences.

- "archive_antigravity_dashboard_redesign_prompt_time_off_blocks": "Time-Off Blocks" | kind=entity | source=specs/archive/ANTIGRAVITY_DASHBOARD_REDESIGN_PROMPT.md:L338 | neighbors=[PAGE 2: 📅 SCHEDULE — THE SCHEDULING SH…]
- "archive_antigravity_dashboard_redesign_prompt_today_s_momentum_strip": "Today's Momentum Strip" | kind=entity | source=specs/archive/ANTIGRAVITY_DASHBOARD_REDESIGN_PROMPT.md:L272 | neighbors=[PAGE 1: ⚡ LIVE — THE CHESS BOARD]
- "archive_antigravity_dashboard_redesign_prompt_typography": "Typography" | kind=entity | source=specs/archive/ANTIGRAVITY_DASHBOARD_REDESIGN_PROMPT.md:L119 | neighbors=[DESIGN SYSTEM]
- "archive_antigravity_dashboard_redesign_prompt_unassigned_alert_strip": "Unassigned Alert Strip" | kind=entity | source=specs/archive/ANTIGRAVITY_DASHBOARD_REDESIGN_PROMPT.md:L415 | neighbors=[PAGE 3: 👥 TEAM — TECH COMMAND CENTER]
- "archive_antigravity_dashboard_redesign_prompt_view_modes": "View Modes" | kind=entity | source=specs/archive/ANTIGRAVITY_DASHBOARD_REDESIGN_PROMPT.md:L345 | neighbors=[PAGE 2: 📅 SCHEDULE — THE SCHEDULING SH…]
- "archive_antigravity_dashboard_redesign_prompt_view_toggle_table_vs_kanban": "View Toggle: Table vs Kanban" | kind=entity | source=specs/archive/ANTIGRAVITY_DASHBOARD_REDESIGN_PROMPT.md:L278 | neighbors=[PAGE 1: ⚡ LIVE — THE CHESS BOARD]
- "archive_antigravity_dashboard_redesign_prompt_vision": "VISION" | kind=entity | source=specs/archive/ANTIGRAVITY_DASHBOARD_REDESIGN_PROMPT.md:L7 | neighbors=[Last updated: April 18, 2026]
- "archive_antigravity_dashboard_redesign_prompt_what_antigravity_builds": "WHAT ANTIGRAVITY BUILDS" | kind=entity | source=specs/archive/ANTIGRAVITY_DASHBOARD_REDESIGN_PROMPT.md:L735 | neighbors=[Last updated: April 18, 2026]
- "archive_antigravity_dashboard_redesign_prompt_what_claude_code_builds_separately_before_antigravity_handoff": "WHAT CLAUDE CODE BUILDS (separately, before Antigravity handoff)" | kind=entity | source=specs/archive/ANTIGRAVITY_DASHBOARD_REDESIGN_PROMPT.md:L754 | neighbors=[Last updated: April 18, 2026]
- "archive_antigravity_dispatch_battletest_spec_antigravity_dispatch_battle_test_spec": "ANTIGRAVITY DISPATCH BATTLE TEST SPEC" | kind=entity | source=specs/archive/ANTIGRAVITY_DISPATCH_BATTLETEST_SPEC.md:L1 | neighbors=[ANTIGRAVITY_DISPATCH_BATTLETEST_SPEC.md]
- "archive_antigravity_dispatch_battletest_spec_block_1_dev_server_auth": "BLOCK 1 — Dev Server + Auth" | kind=entity | source=specs/archive/ANTIGRAVITY_DISPATCH_BATTLETEST_SPEC.md:L37 | neighbors=[Mode: TEST SPRINT ONLY — find bugs, log…]
- "archive_antigravity_dispatch_battletest_spec_block_10_navigation_and_session_edge_cases": "BLOCK 10 — Navigation and Session Edge Cases" | kind=entity | source=specs/archive/ANTIGRAVITY_DISPATCH_BATTLETEST_SPEC.md:L217 | neighbors=[Mode: TEST SPRINT ONLY — find bugs, log…]
- "archive_antigravity_dispatch_battletest_spec_block_11_mobile_viewport": "BLOCK 11 — Mobile Viewport" | kind=entity | source=specs/archive/ANTIGRAVITY_DISPATCH_BATTLETEST_SPEC.md:L233 | neighbors=[Mode: TEST SPRINT ONLY — find bugs, log…]
- "archive_antigravity_dispatch_battletest_spec_block_12_trainee_rule_enforcement_federico_santos_rank_t": "BLOCK 12 — Trainee Rule Enforcement (Federico Santos = Rank T)" | kind=entity | source=specs/archive/ANTIGRAVITY_DISPATCH_BATTLETEST_SPEC.md:L249 | neighbors=[Mode: TEST SPRINT ONLY — find bugs, log…]
- "archive_antigravity_dispatch_battletest_spec_block_13_tech_pwa_login_and_session": "BLOCK 13 — Tech PWA: Login and Session" | kind=entity | source=specs/archive/ANTIGRAVITY_DISPATCH_BATTLETEST_SPEC.md:L259 | neighbors=[Mode: TEST SPRINT ONLY — find bugs, log…]
- "archive_antigravity_dispatch_battletest_spec_block_14_tech_pwa_jobs_list": "BLOCK 14 — Tech PWA: Jobs List" | kind=entity | source=specs/archive/ANTIGRAVITY_DISPATCH_BATTLETEST_SPEC.md:L279 | neighbors=[Mode: TEST SPRINT ONLY — find bugs, log…]
- "archive_antigravity_dispatch_battletest_spec_block_15_tech_pwa_shift_workflow": "BLOCK 15 — Tech PWA: Shift Workflow" | kind=entity | source=specs/archive/ANTIGRAVITY_DISPATCH_BATTLETEST_SPEC.md:L305 | neighbors=[Mode: TEST SPRINT ONLY — find bugs, log…]
- "archive_antigravity_dispatch_battletest_spec_block_16_tech_pwa_job_detail_page": "BLOCK 16 — Tech PWA: Job Detail Page" | kind=entity | source=specs/archive/ANTIGRAVITY_DISPATCH_BATTLETEST_SPEC.md:L325 | neighbors=[Mode: TEST SPRINT ONLY — find bugs, log…]
- "archive_antigravity_dispatch_battletest_spec_block_17_tech_pwa_mark_complete_flow": "BLOCK 17 — Tech PWA: Mark Complete Flow" | kind=entity | source=specs/archive/ANTIGRAVITY_DISPATCH_BATTLETEST_SPEC.md:L352 | neighbors=[Mode: TEST SPRINT ONLY — find bugs, log…]
- "archive_antigravity_dispatch_battletest_spec_block_18_tech_pwa_change_pin_page": "BLOCK 18 — Tech PWA: Change PIN Page" | kind=entity | source=specs/archive/ANTIGRAVITY_DISPATCH_BATTLETEST_SPEC.md:L369 | neighbors=[Mode: TEST SPRINT ONLY — find bugs, log…]
- "archive_antigravity_dispatch_battletest_spec_block_19_tech_pwa_time_off_page": "BLOCK 19 — Tech PWA: Time Off Page" | kind=entity | source=specs/archive/ANTIGRAVITY_DISPATCH_BATTLETEST_SPEC.md:L387 | neighbors=[Mode: TEST SPRINT ONLY — find bugs, log…]
- "archive_antigravity_dispatch_battletest_spec_block_2_dispatch_queue_tab_filtering": "BLOCK 2 — Dispatch Queue Tab Filtering" | kind=entity | source=specs/archive/ANTIGRAVITY_DISPATCH_BATTLETEST_SPEC.md:L53 | neighbors=[Mode: TEST SPRINT ONLY — find bugs, log…]
- "archive_antigravity_dispatch_battletest_spec_block_20_tech_pwa_break_attempts_and_edge_cases": "BLOCK 20 — Tech PWA: Break Attempts and Edge Cases" | kind=entity | source=specs/archive/ANTIGRAVITY_DISPATCH_BATTLETEST_SPEC.md:L399 | neighbors=[Mode: TEST SPRINT ONLY — find bugs, log…]
- "archive_antigravity_dispatch_battletest_spec_block_3_job_detail_modal_read_edit": "BLOCK 3 — Job Detail Modal (Read + Edit)" | kind=entity | source=specs/archive/ANTIGRAVITY_DISPATCH_BATTLETEST_SPEC.md:L79 | neighbors=[Mode: TEST SPRINT ONLY — find bugs, log…]
- "archive_antigravity_dispatch_battletest_spec_block_4_schedule_page_golden_path_dnd": "BLOCK 4 — Schedule Page Golden Path (DnD)" | kind=entity | source=specs/archive/ANTIGRAVITY_DISPATCH_BATTLETEST_SPEC.md:L103 | neighbors=[Mode: TEST SPRINT ONLY — find bugs, log…]
- "archive_antigravity_dispatch_battletest_spec_block_5_reschedule_and_modify_scheduled_wos": "BLOCK 5 — Reschedule and Modify Scheduled WOs" | kind=entity | source=specs/archive/ANTIGRAVITY_DISPATCH_BATTLETEST_SPEC.md:L128 | neighbors=[Mode: TEST SPRINT ONLY — find bugs, log…]
- "archive_antigravity_dispatch_battletest_spec_block_6_break_attempts_dnd_edge_cases": "BLOCK 6 — Break Attempts: DnD Edge Cases" | kind=entity | source=specs/archive/ANTIGRAVITY_DISPATCH_BATTLETEST_SPEC.md:L149 | neighbors=[Mode: TEST SPRINT ONLY — find bugs, log…]
- "archive_antigravity_dispatch_battletest_spec_block_7_break_attempts_job_queue_and_modals": "BLOCK 7 — Break Attempts: Job Queue and Modals" | kind=entity | source=specs/archive/ANTIGRAVITY_DISPATCH_BATTLETEST_SPEC.md:L167 | neighbors=[Mode: TEST SPRINT ONLY — find bugs, log…]
- "archive_antigravity_dispatch_battletest_spec_block_8_break_attempts_status_transitions_and_data_integrity": "BLOCK 8 — Break Attempts: Status Transitions and Data Integrity" | kind=entity | source=specs/archive/ANTIGRAVITY_DISPATCH_BATTLETEST_SPEC.md:L187 | neighbors=[Mode: TEST SPRINT ONLY — find bugs, log…]
- "archive_antigravity_dispatch_battletest_spec_block_9_session_47_features_verification": "BLOCK 9 — Session 47 Features Verification" | kind=entity | source=specs/archive/ANTIGRAVITY_DISPATCH_BATTLETEST_SPEC.md:L203 | neighbors=[Mode: TEST SPRINT ONLY — find bugs, log…]
- "archive_antigravity_dispatch_battletest_spec_mandatory_pre_flight": "MANDATORY PRE-FLIGHT" | kind=entity | source=specs/archive/ANTIGRAVITY_DISPATCH_BATTLETEST_SPEC.md:L8 | neighbors=[Mode: TEST SPRINT ONLY — find bugs, log…]
- "archive_antigravity_dispatch_battletest_spec_objective_exhaustive_browser_verification_of_dispatch_workflow_deliberate_break_attempts": "Objective: Exhaustive browser verification of dispatch workflow + deliberate br…" | kind=entity | source=specs/archive/ANTIGRAVITY_DISPATCH_BATTLETEST_SPEC.md:L3 | neighbors=[ANTIGRAVITY_DISPATCH_BATTLETEST_SPEC.md]
- "archive_antigravity_dispatch_battletest_spec_output_format": "OUTPUT FORMAT" | kind=entity | source=specs/archive/ANTIGRAVITY_DISPATCH_BATTLETEST_SPEC.md:L426 | neighbors=[Mode: TEST SPRINT ONLY — find bugs, log…]
- "archive_antigravity_dispatch_battletest_spec_session_48_test_sprint_only": "Session 48 — Test Sprint Only" | kind=entity | source=specs/archive/ANTIGRAVITY_DISPATCH_BATTLETEST_SPEC.md:L2 | neighbors=[ANTIGRAVITY_DISPATCH_BATTLETEST_SPEC.md]
- "archive_antigravity_dispatch_battletest_spec_verified_literals_pulled_from_live_code_ag_must_not_alter_these": "VERIFIED LITERALS (pulled from live code — AG must not alter these)" | kind=entity | source=specs/archive/ANTIGRAVITY_DISPATCH_BATTLETEST_SPEC.md:L20 | neighbors=[Mode: TEST SPRINT ONLY — find bugs, log…]
- "archive_antigravity_dispatch_excellence_spec": "ANTIGRAVITY_DISPATCH_EXCELLENCE_SPEC.md" | kind=entity | source=specs/archive/ANTIGRAVITY_DISPATCH_EXCELLENCE_SPEC.md:L1 | neighbors=[ANTIGRAVITY_DISPATCH_EXCELLENCE_SPEC]
- "archive_antigravity_dispatch_excellence_spec_2b_new_file_tech_pwa_src_components_dashboard_kanbanboard_tsx": "2B. New file: `tech-pwa/src/components/dashboard/KanbanBoard.tsx`" | kind=entity | source=specs/archive/ANTIGRAVITY_DISPATCH_EXCELLENCE_SPEC.md:L284 | neighbors=[Feature 2 — Kanban View]
- "archive_antigravity_dispatch_excellence_spec_6a_backend_new_action_in_dashboard_api_dashboardapi_gs": "6A. Backend — New action in `dashboard-api/DashboardAPI.gs`" | kind=entity | source=specs/archive/ANTIGRAVITY_DISPATCH_EXCELLENCE_SPEC.md:L875 | neighbors=[Feature 6 — Manual Job Creation in Tech…]
- "archive_antigravity_dispatch_excellence_spec_6b_new_file_tech_pwa_src_components_dashboard_manualjobcreatemodal_tsx": "6B. New file: `tech-pwa/src/components/dashboard/ManualJobCreateModal.tsx`" | kind=entity | source=specs/archive/ANTIGRAVITY_DISPATCH_EXCELLENCE_SPEC.md:L885 | neighbors=[Feature 6 — Manual Job Creation in Tech…]
- "archive_antigravity_dispatch_excellence_spec_7a_changes_to_tech_pwa_src_components_dashboard_schedulepagecomponents_tsx": "7A. Changes to `tech-pwa/src/components/dashboard/SchedulePageComponents.tsx`" | kind=entity | source=specs/archive/ANTIGRAVITY_DISPATCH_EXCELLENCE_SPEC.md:L1229 | neighbors=[Feature 7 — Job Detail Visibility in Sc…]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\PTOW\1_APT_Central_Command\.graphify\description-instructions\batch-146.json

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
