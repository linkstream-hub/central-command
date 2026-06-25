# Node Description Batch 166 of 412

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

- "archive_antigravity_weekly_schedule_nav_commit_message": "COMMIT MESSAGE" | kind=entity | source=specs/archive/ANTIGRAVITY_WEEKLY_SCHEDULE_NAV.md:L345 | neighbors=[PART B — schedule/page.tsx (DnD Ready t…] | lang=en
- "archive_antigravity_weekly_schedule_nav_date_april_23_2026": "Date: April 23, 2026" | kind=entity | source=specs/archive/ANTIGRAVITY_WEEKLY_SCHEDULE_NAV.md:L3 | neighbors=[ANTIGRAVITY_WEEKLY_SCHEDULE_NAV.md] | lang=en
- "archive_antigravity_weekly_schedule_nav_do_not_touch": "DO NOT TOUCH" | kind=entity | source=specs/archive/ANTIGRAVITY_WEEKLY_SCHEDULE_NAV.md:L336 | neighbors=[PART B — schedule/page.tsx (DnD Ready t…] | lang=pt
- "archive_antigravity_weekly_schedule_nav_files": "Files:" | kind=entity | source=specs/archive/ANTIGRAVITY_WEEKLY_SCHEDULE_NAV.md:L4 | neighbors=[ANTIGRAVITY_WEEKLY_SCHEDULE_NAV.md] | lang=en
- "archive_antigravity_weekly_schedule_nav_goal": "GOAL" | kind=entity | source=specs/archive/ANTIGRAVITY_WEEKLY_SCHEDULE_NAV.md:L11 | neighbors=[tech-pwa/src/components/dashboard/Sched…] | lang=en
- "archive_antigravity_weekly_schedule_nav_in_schedule_page_tsx_compute_ispast_for_each_date_and_pass_it_down": "In schedule/page.tsx, compute isPast for each date and pass it down:" | kind=entity | source=specs/archive/ANTIGRAVITY_WEEKLY_SCHEDULE_NAV.md:L305 | neighbors=[Step B5 — Dim past date columns and dis…] | lang=en
- "archive_antigravity_weekly_schedule_nav_owner_claude_code_executor_antigravity": "Owner: Claude Code | Executor: Antigravity" | kind=entity | source=specs/archive/ANTIGRAVITY_WEEKLY_SCHEDULE_NAV.md:L2 | neighbors=[ANTIGRAVITY_WEEKLY_SCHEDULE_NAV.md] | lang=en
- "archive_antigravity_weekly_schedule_nav_step_a1_update_getweekdates_to_accept_offset": "Step A1 — Update getWeekDates to accept offset" | kind=entity | source=specs/archive/ANTIGRAVITY_WEEKLY_SCHEDULE_NAV.md:L21 | neighbors=[PART A — weekly-schedule/page.tsx (read…] | lang=en
- "archive_antigravity_weekly_schedule_nav_step_a2_add_weekoffset_state_update_weekdates_and_useeffect": "Step A2 — Add weekOffset state, update weekDates and useEffect" | kind=entity | source=specs/archive/ANTIGRAVITY_WEEKLY_SCHEDULE_NAV.md:L45 | neighbors=[PART A — weekly-schedule/page.tsx (read…] | lang=en
- "archive_antigravity_weekly_schedule_nav_step_a3_replace_header_with_navigation_ui": "Step A3 — Replace header with navigation UI" | kind=entity | source=specs/archive/ANTIGRAVITY_WEEKLY_SCHEDULE_NAV.md:L80 | neighbors=[PART A — weekly-schedule/page.tsx (read…] | lang=en
- "archive_antigravity_weekly_schedule_nav_step_b1_add_weekoffset_state": "Step B1 — Add weekOffset state" | kind=entity | source=specs/archive/ANTIGRAVITY_WEEKLY_SCHEDULE_NAV.md:L128 | neighbors=[PART B — schedule/page.tsx (DnD Ready t…] | lang=en
- "archive_antigravity_weekly_schedule_nav_step_b2_replace_the_date_building_logic_in_loaddata": "Step B2 — Replace the date-building logic in loadData" | kind=entity | source=specs/archive/ANTIGRAVITY_WEEKLY_SCHEDULE_NAV.md:L135 | neighbors=[PART B — schedule/page.tsx (DnD Ready t…] | lang=en
- "archive_antigravity_weekly_schedule_nav_step_b3_re_run_loaddata_when_weekoffset_changes": "Step B3 — Re-run loadData when weekOffset changes" | kind=entity | source=specs/archive/ANTIGRAVITY_WEEKLY_SCHEDULE_NAV.md:L209 | neighbors=[PART B — schedule/page.tsx (DnD Ready t…] | lang=en
- "archive_antigravity_weekly_schedule_nav_step_b4_add_navigation_ui_to_the_schedule_page_header": "Step B4 — Add navigation UI to the schedule page header" | kind=entity | source=specs/archive/ANTIGRAVITY_WEEKLY_SCHEDULE_NAV.md:L221 | neighbors=[PART B — schedule/page.tsx (DnD Ready t…] | lang=en
- "archive_antigravity_weekly_schedule_nav_tech_pwa_src_app_schedule_page_tsx": "tech-pwa/src/app/schedule/page.tsx" | kind=entity | source=specs/archive/ANTIGRAVITY_WEEKLY_SCHEDULE_NAV.md:L6 | neighbors=[ANTIGRAVITY_WEEKLY_SCHEDULE_NAV.md] | lang=en
- "archive_antigravity_weekly_schedule_nav_tech_pwa_src_app_weekly_schedule_page_tsx": "tech-pwa/src/app/weekly-schedule/page.tsx" | kind=entity | source=specs/archive/ANTIGRAVITY_WEEKLY_SCHEDULE_NAV.md:L5 | neighbors=[ANTIGRAVITY_WEEKLY_SCHEDULE_NAV.md] | lang=en
- "archive_antigravity_weekly_schedule_nav_verification": "VERIFICATION" | kind=entity | source=specs/archive/ANTIGRAVITY_WEEKLY_SCHEDULE_NAV.md:L325 | neighbors=[PART B — schedule/page.tsx (DnD Ready t…] | lang=en
- "archive_antigravity_wo_card_redesign_spec_2a_state_changes": "2A — State changes" | kind=entity | source=specs/archive/ANTIGRAVITY_WO_CARD_REDESIGN_SPEC.md:L220 | neighbors=[PART 2 — JobDetailModal.tsx] | lang=pt
- "archive_antigravity_wo_card_redesign_spec_2b_header_replacement": "2B — Header replacement" | kind=entity | source=specs/archive/ANTIGRAVITY_WO_CARD_REDESIGN_SPEC.md:L253 | neighbors=[PART 2 — JobDetailModal.tsx] | lang=en
- "archive_antigravity_wo_card_redesign_spec_2c_left_panel_add_coordination_label": "2C — Left panel — add COORDINATION label" | kind=entity | source=specs/archive/ANTIGRAVITY_WO_CARD_REDESIGN_SPEC.md:L277 | neighbors=[PART 2 — JobDetailModal.tsx] | lang=en
- "archive_antigravity_wo_card_redesign_spec_2d_right_panel_restructure": "2D — Right panel restructure" | kind=entity | source=specs/archive/ANTIGRAVITY_WO_CARD_REDESIGN_SPEC.md:L297 | neighbors=[PART 2 — JobDetailModal.tsx] | lang=en
- "archive_antigravity_wo_card_redesign_spec_2e_required_new_imports": "2E — Required new imports" | kind=entity | source=specs/archive/ANTIGRAVITY_WO_CARD_REDESIGN_SPEC.md:L836 | neighbors=[PART 2 — JobDetailModal.tsx] | lang=en
- "archive_antigravity_wo_card_redesign_spec_deferred_not_in_this_sprint": "DEFERRED (not in this sprint)" | kind=entity | source=specs/archive/ANTIGRAVITY_WO_CARD_REDESIGN_SPEC.md:L974 | neighbors=[ANTIGRAVITY_WO_CARD_REDESIGN_SPEC.md] | lang=en
- "archive_antigravity_wo_card_redesign_spec_exact_changes_to_commandpalette_tsx": "Exact changes to `CommandPalette.tsx`" | kind=entity | source=specs/archive/ANTIGRAVITY_WO_CARD_REDESIGN_SPEC.md:L31 | neighbors=[PART 1 — CommandPalette.tsx] | lang=en
- "archive_antigravity_wo_card_redesign_spec_exact_changes_to_datedetailmodal_function": "Exact changes to `DateDetailModal` function" | kind=entity | source=specs/archive/ANTIGRAVITY_WO_CARD_REDESIGN_SPEC.md:L858 | neighbors=[PART 3 — SchedulePageComponents.tsx — D…] | lang=en
- "archive_antigravity_wo_card_redesign_spec_overview_of_changes": "Overview of changes" | kind=entity | source=specs/archive/ANTIGRAVITY_WO_CARD_REDESIGN_SPEC.md:L208 | neighbors=[PART 2 — JobDetailModal.tsx] | lang=en
- "archive_antigravity_wo_card_redesign_spec_scope": "SCOPE" | kind=entity | source=specs/archive/ANTIGRAVITY_WO_CARD_REDESIGN_SPEC.md:L9 | neighbors=[ANTIGRAVITY_WO_CARD_REDESIGN_SPEC.md] | lang=en
- "archive_antigravity_wo_card_redesign_spec_solution": "Solution" | kind=entity | source=specs/archive/ANTIGRAVITY_WO_CARD_REDESIGN_SPEC.md:L28 | neighbors=[PART 1 — CommandPalette.tsx] | lang=en
- "archive_antigravity_wo_card_redesign_spec_verification_steps": "VERIFICATION STEPS" | kind=entity | source=specs/archive/ANTIGRAVITY_WO_CARD_REDESIGN_SPEC.md:L984 | neighbors=[ANTIGRAVITY_WO_CARD_REDESIGN_SPEC.md] | lang=en
- "archive_antigravity_wo_card_redesign_spec_what_not_to_touch": "WHAT NOT TO TOUCH" | kind=entity | source=specs/archive/ANTIGRAVITY_WO_CARD_REDESIGN_SPEC.md:L962 | neighbors=[ANTIGRAVITY_WO_CARD_REDESIGN_SPEC.md] | lang=en
- "archive_claw_army_phase1_spec_claw_army_phase_1_spec": "CLAW ARMY — PHASE 1 SPEC" | kind=entity | source=specs/archive/CLAW_ARMY_PHASE1_SPEC.md:L1 | neighbors=[CLAW_ARMY_PHASE1_SPEC.md] | lang=en
- "archive_claw_army_phase1_spec_escalation_policy_for_all_phase_1_soldiers": "ESCALATION POLICY (for all Phase 1 soldiers)" | kind=entity | source=specs/archive/CLAW_ARMY_PHASE1_SPEC.md:L522 | neighbors=[Authored: April 26, 2026] | lang=en
- "archive_claw_army_phase1_spec_soldier_1_typescript_guardian": "SOLDIER 1: TYPESCRIPT GUARDIAN" | kind=entity | source=specs/archive/CLAW_ARMY_PHASE1_SPEC.md:L22 | neighbors=[Authored: April 26, 2026] | lang=en
- "archive_claw_army_phase1_spec_soldier_2_design_lint_enforcer": "SOLDIER 2: DESIGN LINT ENFORCER" | kind=entity | source=specs/archive/CLAW_ARMY_PHASE1_SPEC.md:L161 | neighbors=[Authored: April 26, 2026] | lang=en
- "archive_claw_army_phase1_spec_soldier_3_spec_quality_auditor": "SOLDIER 3: SPEC QUALITY AUDITOR" | kind=entity | source=specs/archive/CLAW_ARMY_PHASE1_SPEC.md:L313 | neighbors=[Authored: April 26, 2026] | lang=en
- "archive_claw_army_phase1_spec_step_1_create_the_github_labels_run_from_repo_root": "Step 1 — Create the GitHub labels (run from repo root)" | kind=entity | source=specs/archive/CLAW_ARMY_PHASE1_SPEC.md:L470 | neighbors=[DEPLOYMENT STEPS (one-time, in order)] | lang=en
- "archive_claw_army_phase1_spec_step_2_create_the_workflow_files": "Step 2 — Create the workflow files" | kind=entity | source=specs/archive/CLAW_ARMY_PHASE1_SPEC.md:L477 | neighbors=[DEPLOYMENT STEPS (one-time, in order)] | lang=en
- "archive_claw_army_phase1_spec_step_3_push_to_main": "Step 3 — Push to main" | kind=entity | source=specs/archive/CLAW_ARMY_PHASE1_SPEC.md:L483 | neighbors=[DEPLOYMENT STEPS (one-time, in order)] | lang=en
- "archive_claw_army_phase1_spec_step_4_verify_ts_guardian_fires": "Step 4 — Verify TS Guardian fires" | kind=entity | source=specs/archive/CLAW_ARMY_PHASE1_SPEC.md:L490 | neighbors=[DEPLOYMENT STEPS (one-time, in order)] | lang=en
- "archive_claw_army_phase1_spec_step_5_test_spec_auditor_manually": "Step 5 — Test Spec Auditor manually" | kind=entity | source=specs/archive/CLAW_ARMY_PHASE1_SPEC.md:L493 | neighbors=[DEPLOYMENT STEPS (one-time, in order)] | lang=en

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\PTOW\1_APT_Central_Command\.graphify\description-instructions\batch-165.json

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
