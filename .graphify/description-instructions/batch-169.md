# Node Description Batch 170 of 412

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

- "archive_sprint_p1_professional_infrastructure_task_2_next_public_security_fix_5_minutes": "Task 2 — NEXT_PUBLIC security fix (5 minutes)" | kind=entity | source=specs/archive/SPRINT_P1_PROFESSIONAL_INFRASTRUCTURE.md:L51 | neighbors=[AG Implementation Tasks]
- "archive_sprint_p1_professional_infrastructure_task_3_sentry_setup": "Task 3 — Sentry setup" | kind=entity | source=specs/archive/SPRINT_P1_PROFESSIONAL_INFRASTRUCTURE.md:L63 | neighbors=[AG Implementation Tasks]
- "archive_sprint_p1_professional_infrastructure_task_4_seed_script": "Task 4 — Seed script" | kind=entity | source=specs/archive/SPRINT_P1_PROFESSIONAL_INFRASTRUCTURE.md:L103 | neighbors=[AG Implementation Tasks]
- "archive_sprint_p1_professional_infrastructure_task_5_e2e_tests_on_ci_auto_trigger": "Task 5 — E2E tests on CI auto-trigger" | kind=entity | source=specs/archive/SPRINT_P1_PROFESSIONAL_INFRASTRUCTURE.md:L212 | neighbors=[AG Implementation Tasks]
- "archive_sprint_p1_professional_infrastructure_task_6_typescript_check_and_diff": "Task 6 — TypeScript check and diff" | kind=entity | source=specs/archive/SPRINT_P1_PROFESSIONAL_INFRASTRUCTURE.md:L233 | neighbors=[AG Implementation Tasks]
- "archive_sprint_p1_professional_infrastructure_task_7_test_sprint_separate_session": "Task 7 — Test sprint (separate session)" | kind=entity | source=specs/archive/SPRINT_P1_PROFESSIONAL_INFRASTRUCTURE.md:L244 | neighbors=[AG Implementation Tasks]
- "archive_sprint_p1_professional_infrastructure_task_8_merge_after_claude_code_issues_clear_to_merge_not_before": "Task 8 — Merge after Claude Code issues \"Clear to merge.\" Not before." | kind=entity | source=specs/archive/SPRINT_P1_PROFESSIONAL_INFRASTRUCTURE.md:L263 | neighbors=[AG Implementation Tasks]
- "archive_sprint_p1_professional_infrastructure_what_does_not_change": "What Does NOT Change" | kind=entity | source=specs/archive/SPRINT_P1_PROFESSIONAL_INFRASTRUCTURE.md:L275 | neighbors=[SPRINT P1 — Professional Infrastructure…]
- "archive_stale_route_post": "POST()" | kind=code-symbol | source=tech-pwa/src/app/api/admin/archive-stale/route.ts:L9 | neighbors=[route.ts]
- "archive_test_report_2026_04_30": "TEST_REPORT_2026-04-30.md" | kind=entity | source=specs/archive/TEST_REPORT_2026-04-30.md:L1 | neighbors=[PTOW Ecosystem Test Report — 2026-04-30]
- "archive_test_report_2026_04_30_1_backend_fix_verification_critical_path": "1. Backend Fix Verification (Critical Path)" | kind=entity | source=specs/archive/TEST_REPORT_2026-04-30.md:L13 | neighbors=[PTOW Ecosystem Test Report — 2026-04-30]
- "archive_test_report_2026_04_30_2_test_mode_infrastructure_verification": "2. Test Mode Infrastructure Verification" | kind=entity | source=specs/archive/TEST_REPORT_2026-04-30.md:L24 | neighbors=[PTOW Ecosystem Test Report — 2026-04-30]
- "archive_test_report_2026_04_30_4_recommendations_next_steps": "4. Recommendations & Next Steps" | kind=entity | source=specs/archive/TEST_REPORT_2026-04-30.md:L59 | neighbors=[PTOW Ecosystem Test Report — 2026-04-30]
- "archive_test_report_2026_04_30_overview": "Overview" | kind=entity | source=specs/archive/TEST_REPORT_2026-04-30.md:L3 | neighbors=[PTOW Ecosystem Test Report — 2026-04-30]
- "archive_test_report_2026_04_30_pass_1_dispatch_dashboard": "Pass 1: Dispatch Dashboard" | kind=entity | source=specs/archive/TEST_REPORT_2026-04-30.md:L38 | neighbors=[3. Detailed Pass Results]
- "archive_test_report_2026_04_30_pass_2_tech_pwa_flows": "Pass 2: Tech PWA Flows" | kind=entity | source=specs/archive/TEST_REPORT_2026-04-30.md:L44 | neighbors=[3. Detailed Pass Results]
- "archive_test_report_2026_04_30_pass_3_edge_cases_error_handling": "Pass 3: Edge Cases & Error Handling" | kind=entity | source=specs/archive/TEST_REPORT_2026-04-30.md:L52 | neighbors=[3. Detailed Pass Results]
- "archive_test_report_2026_04_30_test_environment": "Test Environment" | kind=entity | source=specs/archive/TEST_REPORT_2026-04-30.md:L6 | neighbors=[PTOW Ecosystem Test Report — 2026-04-30]
- "archive_test_report_2026_05_01": "TEST_REPORT_2026-05-01.md" | kind=entity | source=specs/archive/TEST_REPORT_2026-05-01.md:L1 | neighbors=[CC2.0 Battle Test Report — 2026-05-01 (…]
- "archive_test_report_2026_05_01_11_3_urgent_job_sorted_first": "11.3 — URGENT job sorted first" | kind=entity | source=specs/archive/TEST_REPORT_2026-05-01.md:L13 | neighbors=[Resolution of Previous Failures]
- "archive_test_report_2026_05_01_4_5_suggest_techs": "4.5 — Suggest Techs" | kind=entity | source=specs/archive/TEST_REPORT_2026-05-01.md:L17 | neighbors=[Resolution of Previous Failures]
- "archive_test_report_2026_05_01_block_1_auth_login": "Block 1: Auth & Login" | kind=entity | source=specs/archive/TEST_REPORT_2026-05-01.md:L23 | neighbors=[Detailed Results]
- "archive_test_report_2026_05_01_block_10_feedback": "Block 10: Feedback" | kind=entity | source=specs/archive/TEST_REPORT_2026-05-01.md:L80 | neighbors=[Detailed Results]
- "archive_test_report_2026_05_01_block_11_tech_pwa_clock_flows": "Block 11: Tech PWA Clock Flows" | kind=entity | source=specs/archive/TEST_REPORT_2026-05-01.md:L86 | neighbors=[Detailed Results]
- "archive_test_report_2026_05_01_block_12_mobile_viewport": "Block 12: Mobile Viewport" | kind=entity | source=specs/archive/TEST_REPORT_2026-05-01.md:L101 | neighbors=[Detailed Results]
- "archive_test_report_2026_05_01_block_13_error_states_offline_behavior": "Block 13: Error States & Offline Behavior" | kind=entity | source=specs/archive/TEST_REPORT_2026-05-01.md:L109 | neighbors=[Detailed Results]
- "archive_test_report_2026_05_01_block_14_ag_attempts_to_break_it": "Block 14: AG Attempts to Break It" | kind=entity | source=specs/archive/TEST_REPORT_2026-05-01.md:L116 | neighbors=[Detailed Results]
- "archive_test_report_2026_05_01_block_2_summary_cards": "Block 2: Summary Cards" | kind=entity | source=specs/archive/TEST_REPORT_2026-05-01.md:L29 | neighbors=[Detailed Results]
- "archive_test_report_2026_05_01_block_3_coordination_feed": "Block 3: Coordination Feed" | kind=entity | source=specs/archive/TEST_REPORT_2026-05-01.md:L35 | neighbors=[Detailed Results]
- "archive_test_report_2026_05_01_block_4_job_detail_modal": "Block 4: Job Detail Modal" | kind=entity | source=specs/archive/TEST_REPORT_2026-05-01.md:L41 | neighbors=[Detailed Results]
- "archive_test_report_2026_05_01_block_5_scheduling_drag_drop": "Block 5: Scheduling Drag & Drop" | kind=entity | source=specs/archive/TEST_REPORT_2026-05-01.md:L50 | neighbors=[Detailed Results]
- "archive_test_report_2026_05_01_block_6_team_view": "Block 6: Team View" | kind=entity | source=specs/archive/TEST_REPORT_2026-05-01.md:L58 | neighbors=[Detailed Results]
- "archive_test_report_2026_05_01_block_7_finance_invoicing": "Block 7: Finance/Invoicing" | kind=entity | source=specs/archive/TEST_REPORT_2026-05-01.md:L63 | neighbors=[Detailed Results]
- "archive_test_report_2026_05_01_block_8_hr_module": "Block 8: HR Module" | kind=entity | source=specs/archive/TEST_REPORT_2026-05-01.md:L68 | neighbors=[Detailed Results]
- "archive_test_report_2026_05_01_block_9_notifications_bell": "Block 9: Notifications Bell" | kind=entity | source=specs/archive/TEST_REPORT_2026-05-01.md:L74 | neighbors=[Detailed Results]
- "archive_test_report_2026_05_01_summary": "Summary" | kind=entity | source=specs/archive/TEST_REPORT_2026-05-01.md:L4 | neighbors=[CC2.0 Battle Test Report — 2026-05-01 (…]
- "artifacts_15_02_summary": "15-02-SUMMARY.md" | kind=entity | source=artifacts/15-02-SUMMARY.md:L1 | neighbors=[Phase 15-02 Summary]
- "artifacts_15_02_summary_actions_performed": "Actions Performed" | kind=entity | source=artifacts/15-02-SUMMARY.md:L3 | neighbors=[Phase 15-02 Summary]
- "artifacts_15_02_summary_evidence": "Evidence" | kind=entity | source=artifacts/15-02-SUMMARY.md:L8 | neighbors=[Phase 15-02 Summary]
- "artifacts_15_caller_graph": "15_caller_graph.md" | kind=entity | source=artifacts/15_caller_graph.md:L1 | neighbors=[Phase 15-01 Caller Graph & Dead Code An…]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\PTOW\1_APT_Central_Command\.graphify\description-instructions\batch-169.json

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
