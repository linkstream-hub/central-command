# Node Description Batch 75 of 412

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
LANGUAGE: each entry has a `lang=` marker giving the language of its source.
Write that entry's description in EXACTLY that language. Do not translate to
a single common language — match each node's source language individually.
No marketing language.
Respond ONLY with a JSON object mapping each node id (as a string) to its
one-sentence description — no prose, no markdown fences.

- "dashboard_jobassignmentmodal_jobassignmentmodalprops": "JobAssignmentModalProps" | kind=code-symbol | source=tech-pwa/src/components/dashboard/JobAssignmentModal.tsx:L6 | neighbors=[JobAssignmentModal.tsx, Job] | lang=en
- "dashboard_jobchip_jobchipprops": "JobChipProps" | kind=code-symbol | source=tech-pwa/src/components/dashboard/JobChip.tsx:L3 | neighbors=[JobChip.tsx, Job] | lang=en
- "dashboard_jobdetailmodal_formattechname": "formatTechName()" | kind=code-symbol | source=tech-pwa/src/components/dashboard/JobDetailModal.tsx:L74 | neighbors=[JobDetailModal.tsx, JobDetailModal()] | lang=en
- "dashboard_jobdetailmodal_jobdetailmodalprops": "JobDetailModalProps" | kind=code-symbol | source=tech-pwa/src/components/dashboard/JobDetailModal.tsx:L40 | neighbors=[JobDetailModal.tsx, Job] | lang=en
- "dashboard_jobqueuetable_statustab": "StatusTab" | kind=code-symbol | source=tech-pwa/src/components/dashboard/JobQueueTable.tsx:L34 | neighbors=[JobQueueTable.tsx, page.tsx] | lang=en
- "dashboard_kanbanboard_kanbanboardprops": "KanbanBoardProps" | kind=code-symbol | source=tech-pwa/src/components/dashboard/KanbanBoard.tsx:L9 | neighbors=[KanbanBoard.tsx, Job] | lang=en
- "dashboard_kanbanboard_persiststatuschange": "persistStatusChange()" | kind=code-symbol | source=tech-pwa/src/components/dashboard/KanbanBoard.tsx:L39 | neighbors=[KanbanBoard.tsx, dashboardRequest()] | lang=en
- "dashboard_locksendbutton_locksendbutton": "LockSendButton()" | kind=code-symbol | source=tech-pwa/src/components/dashboard/LockSendButton.tsx:L12 | neighbors=[LockSendButton.tsx, page.tsx] | lang=en
- "dashboard_schedulegrid_getweekdates": "getWeekDates()" | kind=code-symbol | source=tech-pwa/src/components/dashboard/ScheduleGrid.tsx:L19 | neighbors=[ScheduleGrid.tsx, ScheduleGrid()] | lang=en
- "dashboard_schedulegrid_schedulegrid": "ScheduleGrid()" | kind=code-symbol | source=tech-pwa/src/components/dashboard/ScheduleGrid.tsx:L34 | neighbors=[ScheduleGrid.tsx, getWeekDates()] | lang=en
- "dashboard_schedulegrid_schedulegridprops": "ScheduleGridProps" | kind=code-symbol | source=tech-pwa/src/components/dashboard/ScheduleGrid.tsx:L11 | neighbors=[ScheduleGrid.tsx, Job] | lang=en
- "dashboard_schedulepagecomponents_datedetailmodal": "DateDetailModal()" | kind=code-symbol | source=tech-pwa/src/components/dashboard/SchedulePageComponents.tsx:L679 | neighbors=[SchedulePageComponents.tsx, page.tsx] | lang=en
- "dashboard_schedulepagecomponents_draggablejobcardprops": "DraggableJobCardProps" | kind=code-symbol | source=tech-pwa/src/components/dashboard/SchedulePageComponents.tsx:L17 | neighbors=[SchedulePageComponents.tsx, Job] | lang=en
- "dashboard_schedulingdispatch_techentry": "TechEntry" | kind=code-symbol | source=tech-pwa/src/components/dashboard/SchedulingDispatch.tsx:L15 | neighbors=[JobDetailModal.tsx, SchedulingDispatch.tsx] | lang=en
- "dashboard_summarycards_summarycardsprops": "SummaryCardsProps" | kind=code-symbol | source=tech-pwa/src/components/dashboard/SummaryCards.tsx:L9 | neighbors=[SummaryCards.tsx, DashboardStats] | lang=en
- "dashboard_techcard_techcard": "TechCard()" | kind=code-symbol | source=tech-pwa/src/components/dashboard/TechCard.tsx:L15 | neighbors=[TechCard.tsx, page.tsx] | lang=en
- "dashboard_techrow_getinitials": "getInitials()" | kind=code-symbol | source=tech-pwa/src/components/dashboard/TechRow.tsx:L11 | neighbors=[TechRow.tsx, TechRow()] | lang=en
- "dashboard_techrow_techrowprops": "TechRowProps" | kind=code-symbol | source=tech-pwa/src/components/dashboard/TechRow.tsx:L4 | neighbors=[TechRow.tsx, Job] | lang=en
- "dashboard_urgentqueuepanel_urgentqueuepanelprops": "UrgentQueuePanelProps" | kind=code-symbol | source=tech-pwa/src/components/dashboard/UrgentQueuePanel.tsx:L4 | neighbors=[UrgentQueuePanel.tsx, Job] | lang=en
- "design_3_typography": "3. Typography" | kind=entity | source=DESIGN.md:L146 | neighbors=[Hierarchy, Design System: APT Central Command] | lang=en
- "design_4_elevation": "4. Elevation" | kind=entity | source=DESIGN.md:L163 | neighbors=[Shadow Vocabulary, Design System: APT Central Command] | lang=en
- "design_extract_output_aptmaintenanceinc_com_design_language_accessibility_wcag_2_1": "Accessibility (WCAG 2.1)" | kind=entity | source=design-extract-output/aptmaintenanceinc-com-design-language.md:L687 | neighbors=[Passing Color Pairs, Design Language: APT Maintenance] | lang=en
- "design_extract_output_aptmaintenanceinc_com_design_language_gradients": "Gradients" | kind=entity | source=design-extract-output/aptmaintenanceinc-com-design-language.md:L43 | neighbors=[Color Palette, Design Language: APT Maintenance] | lang=en
- "design_extract_output_aptmaintenanceinc_com_design_language_spacing": "Spacing" | kind=entity | source=design-extract-output/aptmaintenanceinc-com-design-language.md:L124 | neighbors=[CSS Custom Properties, Design Language: APT Maintenance] | lang=en
- "design_extract_output_dispatch_aptmaintenanceinc_com_design_language_component_clusters": "Component Clusters" | kind=entity | source=design-extract-output/dispatch-aptmaintenanceinc-com-design-language.md:L367 | neighbors=[Button — 1 instance, 1 variant, Design Language: APT Central Command] | lang=en
- "design_extract_output_dispatch_aptmaintenanceinc_com_design_language_component_patterns": "Component Patterns" | kind=entity | source=design-extract-output/dispatch-aptmaintenanceinc-com-design-language.md:L349 | neighbors=[Buttons (1 instances), Design Language: APT Central Command] | lang=en
- "design_extract_output_dispatch_aptmaintenanceinc_com_design_language_spacing": "Spacing" | kind=entity | source=design-extract-output/dispatch-aptmaintenanceinc-com-design-language.md:L69 | neighbors=[CSS Custom Properties, Design Language: APT Central Command] | lang=en
- "dispatch_aptmaintenanceinc_com_prompts_recipe_button_recipe_button": "Recipe: button" | kind=entity | source=design-extract-output/dispatch-aptmaintenanceinc-com-prompts/recipe-button.md:L1 | neighbors=[recipe-button.md, Anatomy (detected)] | lang=en
- "docs_apt_compliance_hr_blueprint_part_3_separation_and_final_pay": "PART 3: SEPARATION AND FINAL PAY" | kind=entity | source=docs/APT_COMPLIANCE_HR_BLUEPRINT.md:L65 | neighbors=[APT WAGE, HOUR & PAGA COMPLIANCE BLUEPR…, 1. Termination Timing Logic (LC § 203)] | lang=en
- "docs_claw_code_cc_integration": "CLAW_CODE_CC_INTEGRATION.md" | kind=entity | source=docs/CLAW_CODE_CC_INTEGRATION.md:L1 | neighbors=[Authored: April 26, 2026 | For Claude r…, Central Command × Claw-Code Army: Exper…] | lang=en
- "docs_org": "ORG.md" | kind=entity | source=docs/ORG.md:L1 | neighbors=[APT MAINTENANCE — ORG STRUCTURE, Named staff roster for operational refe…] | lang=en
- "docs_runbook_scenario_6_github_actions_ci_fails_on_a_pr": "SCENARIO 6 — GitHub Actions CI fails on a PR" | kind=entity | source=docs/RUNBOOK.md:L180 | neighbors=[Last updated: 2026-05-19, Check the failing job] | lang=pt
- "docs_runbook_scenario_7_railway_sentinel_fires_an_alert": "SCENARIO 7 — Railway Sentinel fires an alert" | kind=entity | source=docs/RUNBOOK.md:L197 | neighbors=[Last updated: 2026-05-19, Reading a Sentinel alert] | lang=en
- "docs_session_guide": "SESSION_GUIDE.md" | kind=entity | source=docs/SESSION_GUIDE.md:L1 | neighbors=[APT CENTRAL COMMAND — SESSION GUIDE, How to start and end every Claude Code …] | lang=en
- "docs_sheets_schema_spreadsheet_time_off_manager": "Spreadsheet: Time Off Manager" | kind=entity | source=docs/SHEETS_SCHEMA.md:L241 | neighbors=[Role-based terminology used throughout …, Tab: `TimeOffRequests`] | lang=en
- "docs_sprint_standards": "SPRINT_STANDARDS.md" | kind=entity | source=docs/SPRINT_STANDARDS.md:L1 | neighbors=[Design and quality gates for all AG + C…, SPRINT STANDARDS — APT Central Command] | lang=en
- "drizzle_0007_curly_kree": "0007_curly_kree.sql" | kind=code-symbol | source=tech-pwa/drizzle/0007_curly_kree.sql:L1 | neighbors=[086dc4e feat(phase-18): event publishin…, workflow_events] | lang=en
- "dual_auth_architecture": "Dual Auth Architecture" | kind=entity | source=docs/adr/README.md | neighbors=[Staff Auth (next-auth v5), Tech Auth (Bearer Token)] | lang=en
- "error_handling_skill_go": "Go" | kind=entity | source=.github/skills/ecc/error-handling/SKILL.md:L253 | neighbors=[Error Handling Patterns, Sentinel Errors and Error Wrapping] | lang=en
- "eval_harness_skill_metrics": "Metrics" | kind=entity | source=.github/skills/ecc/eval-harness/SKILL.md:L92 | neighbors=[Eval Harness Skill, pass@k] | lang=en

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\PTOW\1_APT_Central_Command\.graphify\description-instructions\batch-074.json

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
