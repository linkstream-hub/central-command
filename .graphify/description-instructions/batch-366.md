# Node Description Batch 367 of 412

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

- "specs_legacy_migration_blueprint_5_compliance_rules_engine": "5. Compliance Rules Engine" | kind=entity | source=specs/LEGACY_MIGRATION_BLUEPRINT.md:L77 | neighbors=[Master Legacy Migration Blueprint] | lang=en
- "specs_legacy_migration_blueprint_phase_1_foundation_tech_authentication_proof_of_concept": "Phase 1: Foundation & Tech Authentication (Proof of Concept)" | kind=entity | source=specs/LEGACY_MIGRATION_BLUEPRINT.md:L86 | neighbors=[6. Migration Priorities & Phased Execut…] | lang=en
- "specs_legacy_migration_blueprint_phase_2_time_clocking_compliance": "Phase 2: Time Clocking & Compliance" | kind=entity | source=specs/LEGACY_MIGRATION_BLUEPRINT.md:L94 | neighbors=[6. Migration Priorities & Phased Execut…] | lang=en
- "specs_legacy_migration_blueprint_phase_3_dispatch_scheduling_dashboard": "Phase 3: Dispatch & Scheduling (Dashboard)" | kind=entity | source=specs/LEGACY_MIGRATION_BLUEPRINT.md:L101 | neighbors=[6. Migration Priorities & Phased Execut…] | lang=en
- "specs_legacy_migration_blueprint_phase_4_intake_ai_parsing_the_brain": "Phase 4: Intake & AI Parsing (The Brain)" | kind=entity | source=specs/LEGACY_MIGRATION_BLUEPRINT.md:L108 | neighbors=[6. Migration Priorities & Phased Execut…] | lang=en
- "specs_operations_view_spec": "OPERATIONS_VIEW_SPEC.md" | kind=entity | source=specs/OPERATIONS_VIEW_SPEC.md:L1 | neighbors=[SPEC — OPERATIONS VIEW RESTRUCTURE] | lang=en
- "specs_operations_view_spec_change_1_remove_summarycards_from_live_page_tsx": "CHANGE 1 — Remove SummaryCards from `live/page.tsx`" | kind=entity | source=specs/OPERATIONS_VIEW_SPEC.md:L39 | neighbors=[SPEC — OPERATIONS VIEW RESTRUCTURE] | lang=en
- "specs_operations_view_spec_change_2_remove_techavailabilitypanel_from_live_page_tsx": "CHANGE 2 — Remove TechAvailabilityPanel from `live/page.tsx`" | kind=entity | source=specs/OPERATIONS_VIEW_SPEC.md:L50 | neighbors=[SPEC — OPERATIONS VIEW RESTRUCTURE] | lang=en
- "specs_operations_view_spec_change_3_add_viewcontext_prop_to_jobdetailmodal": "CHANGE 3 — Add `viewContext` prop to `JobDetailModal`" | kind=entity | source=specs/OPERATIONS_VIEW_SPEC.md:L60 | neighbors=[SPEC — OPERATIONS VIEW RESTRUCTURE] | lang=en
- "specs_operations_view_spec_change_5_pass_viewcontext_from_live_page_tsx": "CHANGE 5 — Pass `viewContext` from `live/page.tsx`" | kind=entity | source=specs/OPERATIONS_VIEW_SPEC.md:L120 | neighbors=[SPEC — OPERATIONS VIEW RESTRUCTURE] | lang=en
- "specs_operations_view_spec_change_6_rename_nav_item_to_operations": "CHANGE 6 — Rename nav item to \"Operations\"" | kind=entity | source=specs/OPERATIONS_VIEW_SPEC.md:L135 | neighbors=[SPEC — OPERATIONS VIEW RESTRUCTURE] | lang=en
- "specs_operations_view_spec_change_7_operations_tab_strip": "CHANGE 7 — Operations tab strip" | kind=entity | source=specs/OPERATIONS_VIEW_SPEC.md:L141 | neighbors=[SPEC — OPERATIONS VIEW RESTRUCTURE] | lang=en
- "specs_operations_view_spec_constraint_contradiction_detector": "CONSTRAINT — CONTRADICTION DETECTOR" | kind=entity | source=specs/OPERATIONS_VIEW_SPEC.md:L23 | neighbors=[SPEC — OPERATIONS VIEW RESTRUCTURE] | lang=en
- "specs_operations_view_spec_do_not_touch": "DO NOT TOUCH" | kind=entity | source=specs/OPERATIONS_VIEW_SPEC.md:L154 | neighbors=[SPEC — OPERATIONS VIEW RESTRUCTURE] | lang=pt
- "specs_operations_view_spec_objective": "OBJECTIVE" | kind=entity | source=specs/OPERATIONS_VIEW_SPEC.md:L15 | neighbors=[SPEC — OPERATIONS VIEW RESTRUCTURE] | lang=en
- "specs_operations_view_spec_priority_badge_suppress_everywhere": "Priority badge — suppress everywhere:" | kind=entity | source=specs/OPERATIONS_VIEW_SPEC.md:L112 | neighbors=[CHANGE 4 — Operations-mode gating in `J…] | lang=en
- "specs_operations_view_spec_status_transitions_in_operations_mode": "Status transitions in Operations mode:" | kind=entity | source=specs/OPERATIONS_VIEW_SPEC.md:L100 | neighbors=[CHANGE 4 — Operations-mode gating in `J…] | lang=en
- "specs_operations_view_spec_success_criteria": "SUCCESS CRITERIA" | kind=entity | source=specs/OPERATIONS_VIEW_SPEC.md:L193 | neighbors=[SPEC — OPERATIONS VIEW RESTRUCTURE] | lang=en
- "specs_operations_view_spec_task_list_execute_in_order": "TASK LIST — EXECUTE IN ORDER" | kind=entity | source=specs/OPERATIONS_VIEW_SPEC.md:L165 | neighbors=[SPEC — OPERATIONS VIEW RESTRUCTURE] | lang=en
- "specs_operations_view_spec_what_to_hide_when_viewcontext_operations": "What to HIDE when `viewContext === 'operations'`:" | kind=entity | source=specs/OPERATIONS_VIEW_SPEC.md:L84 | neighbors=[CHANGE 4 — Operations-mode gating in `J…] | lang=en
- "specs_operations_view_spec_what_to_show_confirm_these_render_normally": "What to SHOW (confirm these render normally):" | kind=entity | source=specs/OPERATIONS_VIEW_SPEC.md:L94 | neighbors=[CHANGE 4 — Operations-mode gating in `J…] | lang=en
- "specs_orchestration_direct_activation": "Activation" | kind=entity | source=specs/ORCHESTRATION_DIRECT.md:L138 | neighbors=[Author: Claude Code — Session 106] | lang=en
- "specs_orchestration_direct_brandon_s_remaining_touchpoints": "Brandon's Remaining Touchpoints" | kind=entity | source=specs/ORCHESTRATION_DIRECT.md:L108 | neighbors=[Author: Claude Code — Session 106] | lang=en
- "specs_orchestration_direct_claude_code_review_gates_unchanged": "Claude Code Review Gates (unchanged)" | kind=entity | source=specs/ORCHESTRATION_DIRECT.md:L100 | neighbors=[Author: Claude Code — Session 106] | lang=en
- "specs_orchestration_direct_implement_sprint": "Implement sprint" | kind=entity | source=specs/ORCHESTRATION_DIRECT.md:L45 | neighbors=[How Claude Code Invokes a Sub-Agent] | lang=en
- "specs_orchestration_direct_limitations": "Limitations" | kind=entity | source=specs/ORCHESTRATION_DIRECT.md:L118 | neighbors=[Author: Claude Code — Session 106] | lang=en
- "specs_orchestration_direct_problem": "Problem" | kind=entity | source=specs/ORCHESTRATION_DIRECT.md:L7 | neighbors=[Author: Claude Code — Session 106] | lang=en
- "specs_orchestration_direct_solution": "Solution" | kind=entity | source=specs/ORCHESTRATION_DIRECT.md:L17 | neighbors=[Author: Claude Code — Session 106] | lang=en
- "specs_orchestration_direct_spec_direct_agent_orchestration_no_relay_workflow": "SPEC: Direct Agent Orchestration (No-Relay Workflow)" | kind=entity | source=specs/ORCHESTRATION_DIRECT.md:L1 | neighbors=[ORCHESTRATION_DIRECT.md] | lang=en
- "specs_orchestration_direct_status_ready_no_code_required_workflow_change_only": "Status: READY — no code required, workflow change only" | kind=entity | source=specs/ORCHESTRATION_DIRECT.md:L2 | neighbors=[ORCHESTRATION_DIRECT.md] | lang=en
- "specs_orchestration_direct_test_sprint": "Test sprint" | kind=entity | source=specs/ORCHESTRATION_DIRECT.md:L72 | neighbors=[How Claude Code Invokes a Sub-Agent] | lang=en
- "specs_orchestration_direct_what_playwright_handles_automatically": "What Playwright Handles Automatically" | kind=entity | source=specs/ORCHESTRATION_DIRECT.md:L126 | neighbors=[Author: Claude Code — Session 106] | lang=en
- "specs_orchestration_direct_when_to_use_direct_orchestration": "When to Use Direct Orchestration" | kind=entity | source=specs/ORCHESTRATION_DIRECT.md:L29 | neighbors=[Author: Claude Code — Session 106] | lang=en
- "specs_p2_3_meal_premium_calc_spec": "P2-3-MEAL-PREMIUM-CALC-SPEC.md" | kind=entity | source=specs/P2-3-MEAL-PREMIUM-CALC-SPEC.md:L1 | neighbors=[SPEC: P2-3 — Meal Premium Calculation] | lang=en
- "specs_p2_3_meal_premium_calc_spec_ca_labor_code_rules_being_implemented": "CA LABOR CODE RULES BEING IMPLEMENTED" | kind=entity | source=specs/P2-3-MEAL-PREMIUM-CALC-SPEC.md:L43 | neighbors=[SPEC: P2-3 — Meal Premium Calculation] | lang=en
- "specs_p2_3_meal_premium_calc_spec_claude_code_review_checklist_run_before_pass": "CLAUDE CODE REVIEW CHECKLIST (run before PASS)" | kind=entity | source=specs/P2-3-MEAL-PREMIUM-CALC-SPEC.md:L370 | neighbors=[SPEC: P2-3 — Meal Premium Calculation] | lang=en
- "specs_p2_3_meal_premium_calc_spec_files_to_modify_exactly_these_three_no_others": "FILES TO MODIFY (exactly these three — no others)" | kind=entity | source=specs/P2-3-MEAL-PREMIUM-CALC-SPEC.md:L33 | neighbors=[SPEC: P2-3 — Meal Premium Calculation] | lang=en
- "specs_p2_3_meal_premium_calc_spec_goal": "GOAL" | kind=entity | source=specs/P2-3-MEAL-PREMIUM-CALC-SPEC.md:L9 | neighbors=[SPEC: P2-3 — Meal Premium Calculation] | lang=en
- "specs_p2_3_meal_premium_calc_spec_known_issues_out_of_scope": "KNOWN ISSUES / OUT OF SCOPE" | kind=entity | source=specs/P2-3-MEAL-PREMIUM-CALC-SPEC.md:L362 | neighbors=[SPEC: P2-3 — Meal Premium Calculation] | lang=en
- "specs_p2_3_meal_premium_calc_spec_outcome_definition_of_done": "OUTCOME (definition of done)" | kind=entity | source=specs/P2-3-MEAL-PREMIUM-CALC-SPEC.md:L17 | neighbors=[SPEC: P2-3 — Meal Premium Calculation] | lang=en

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\PTOW\1_APT_Central_Command\.graphify\description-instructions\batch-366.json

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
