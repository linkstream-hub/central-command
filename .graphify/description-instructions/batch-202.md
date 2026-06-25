# Node Description Batch 203 of 412

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

- "docs_operator_guide_green_lights": "Green lights ✅" | kind=entity | source=docs/OPERATOR_GUIDE.md:L80 | neighbors=[3. HOW TO READ A PLAN] | lang=en
- "docs_operator_guide_hard_blocks_do_not_approve": "Hard blocks ⛔ — do not approve:" | kind=entity | source=docs/OPERATOR_GUIDE.md:L92 | neighbors=[3. HOW TO READ A PLAN] | lang=pt
- "docs_operator_guide_red_flags_ask_claude_to_clarify": "Red flags 🚩 — ask Claude to clarify:" | kind=entity | source=docs/OPERATOR_GUIDE.md:L85 | neighbors=[3. HOW TO READ A PLAN] | lang=en
- "docs_operator_guide_the_30_second_version": "THE 30-SECOND VERSION" | kind=entity | source=docs/OPERATOR_GUIDE.md:L8 | neighbors=[Last Updated: S137 (2026-06-04)] | lang=en
- "docs_operator_guide_this_is_your_playbook_for_working_with_claude_to_build_apt_fsm_like_a_professional_team": "This is your playbook for working with Claude to build APT FSM like a professio…" | kind=entity | source=docs/OPERATOR_GUIDE.md:L3 | neighbors=[OPERATOR_GUIDE.md] | lang=en
- "docs_operator_guide_typing_secrets_into_web_dashboards_you_are_the_account_holder": "Typing secrets into web dashboards (you are the account holder)" | kind=entity | source=docs/OPERATOR_GUIDE.md:L135 | neighbors=[6. YOUR COMPLETE TECHNICAL ROLE] | lang=en
- "docs_operator_guide_use_this_template_for_every_request": "Use this template for every request:" | kind=entity | source=docs/OPERATOR_GUIDE.md:L48 | neighbors=[2. HOW TO REQUEST WORK] | lang=en
- "docs_org_apt_maintenance_org_structure": "APT MAINTENANCE — ORG STRUCTURE" | kind=entity | source=docs/ORG.md:L1 | neighbors=[ORG.md] | lang=en
- "docs_org_keith_s_rank_trade_keys": "KEITH'S RANK / TRADE KEYS" | kind=entity | source=docs/ORG.md:L28 | neighbors=[Named staff roster for operational refe…] | lang=en
- "docs_org_staff_roster": "STAFF ROSTER" | kind=entity | source=docs/ORG.md:L6 | neighbors=[Named staff roster for operational refe…] | lang=en
- "docs_product_vision_1_intake_engine_shipped": "1. Intake Engine ✅ SHIPPED" | kind=entity | source=docs/PRODUCT_VISION.md:L81 | neighbors=[THE 10 CAPABILITIES OF A COMPLETE FSM] | lang=en
- "docs_product_vision_10_operations_intelligence_not_built_phase_4": "10. Operations Intelligence ❌ NOT BUILT (Phase 4)" | kind=entity | source=docs/PRODUCT_VISION.md:L129 | neighbors=[THE 10 CAPABILITIES OF A COMPLETE FSM] | lang=en
- "docs_product_vision_2_dispatch_console_shipped": "2. Dispatch Console ✅ SHIPPED" | kind=entity | source=docs/PRODUCT_VISION.md:L87 | neighbors=[THE 10 CAPABILITIES OF A COMPLETE FSM] | lang=en
- "docs_product_vision_3_tech_mobile_app_shipped": "3. Tech Mobile App ✅ SHIPPED" | kind=entity | source=docs/PRODUCT_VISION.md:L92 | neighbors=[THE 10 CAPABILITIES OF A COMPLETE FSM] | lang=en
- "docs_product_vision_4_coordination_loop_gap_highest_priority": "4. Coordination Loop ❌ GAP — HIGHEST PRIORITY" | kind=entity | source=docs/PRODUCT_VISION.md:L98 | neighbors=[THE 10 CAPABILITIES OF A COMPLETE FSM] | lang=en
- "docs_product_vision_5_sms_dispatch_gap_blocks_operational_use": "5. SMS Dispatch ❌ GAP — BLOCKS OPERATIONAL USE" | kind=entity | source=docs/PRODUCT_VISION.md:L103 | neighbors=[THE 10 CAPABILITIES OF A COMPLETE FSM] | lang=en
- "docs_product_vision_6_automation_engine_not_built": "6. Automation Engine ❌ NOT BUILT" | kind=entity | source=docs/PRODUCT_VISION.md:L108 | neighbors=[THE 10 CAPABILITIES OF A COMPLETE FSM] | lang=en
- "docs_product_vision_7_client_portal_not_built_phase_3": "7. Client Portal ❌ NOT BUILT (Phase 3)" | kind=entity | source=docs/PRODUCT_VISION.md:L114 | neighbors=[THE 10 CAPABILITIES OF A COMPLETE FSM] | lang=en
- "docs_product_vision_8_job_execution_partial": "8. Job Execution ❌ PARTIAL" | kind=entity | source=docs/PRODUCT_VISION.md:L119 | neighbors=[THE 10 CAPABILITIES OF A COMPLETE FSM] | lang=en
- "docs_product_vision_9_billing_invoicing_not_built_phase_4": "9. Billing & Invoicing ❌ NOT BUILT (Phase 4)" | kind=entity | source=docs/PRODUCT_VISION.md:L124 | neighbors=[THE 10 CAPABILITIES OF A COMPLETE FSM] | lang=en
- "docs_product_vision_any_feature_sprint_or_architectural_choice_that_doesn_t_advance_this_vision_don_t_build_it": "Any feature, sprint, or architectural choice that doesn't advance this vision =…" | kind=entity | source=docs/PRODUCT_VISION.md:L3 | neighbors=[PRODUCT_VISION.md] | lang=en
- "docs_product_vision_apt_fsm_product_vision": "APT FSM — PRODUCT VISION" | kind=entity | source=docs/PRODUCT_VISION.md:L1 | neighbors=[PRODUCT_VISION.md] | lang=en
- "docs_product_vision_design_principles": "DESIGN PRINCIPLES" | kind=entity | source=docs/PRODUCT_VISION.md:L160 | neighbors=[Last Updated: S137 (2026-06-04)] | lang=en
- "docs_product_vision_market_position": "MARKET POSITION" | kind=entity | source=docs/PRODUCT_VISION.md:L55 | neighbors=[Last Updated: S137 (2026-06-04)] | lang=en
- "docs_product_vision_phase_1_gate_operational_pilot": "Phase 1 Gate (Operational Pilot):" | kind=entity | source=docs/PRODUCT_VISION.md:L138 | neighbors=[SUCCESS METRICS] | lang=en
- "docs_product_vision_phase_2_gate_operational_reliability": "Phase 2 Gate (Operational Reliability):" | kind=entity | source=docs/PRODUCT_VISION.md:L142 | neighbors=[SUCCESS METRICS] | lang=en
- "docs_product_vision_phase_3_gate_client_visibility": "Phase 3 Gate (Client Visibility):" | kind=entity | source=docs/PRODUCT_VISION.md:L146 | neighbors=[SUCCESS METRICS] | lang=en
- "docs_product_vision_phase_4_gate_revenue_operations": "Phase 4 Gate (Revenue Operations):" | kind=entity | source=docs/PRODUCT_VISION.md:L150 | neighbors=[SUCCESS METRICS] | lang=en
- "docs_product_vision_phase_5_gate_saas_validation": "Phase 5 Gate (SaaS Validation):" | kind=entity | source=docs/PRODUCT_VISION.md:L154 | neighbors=[SUCCESS METRICS] | lang=en
- "docs_product_vision_the_authoritative_north_star_for_all_build_decisions": "The authoritative north star for all build decisions." | kind=entity | source=docs/PRODUCT_VISION.md:L2 | neighbors=[PRODUCT_VISION.md] | lang=en
- "docs_product_vision_the_problem_we_solve": "THE PROBLEM WE SOLVE" | kind=entity | source=docs/PRODUCT_VISION.md:L21 | neighbors=[Last Updated: S137 (2026-06-04)] | lang=en
- "docs_product_vision_the_solution": "THE SOLUTION" | kind=entity | source=docs/PRODUCT_VISION.md:L37 | neighbors=[Last Updated: S137 (2026-06-04)] | lang=en
- "docs_product_vision_what_we_are_building": "WHAT WE ARE BUILDING" | kind=entity | source=docs/PRODUCT_VISION.md:L8 | neighbors=[Last Updated: S137 (2026-06-04)] | lang=en
- "docs_professional_baseline_critical_untested_business_logic": "Critical Untested Business Logic" | kind=entity | source=docs/PROFESSIONAL_BASELINE.md:L99 | neighbors=[DIMENSION 3 — TESTING] | lang=en
- "docs_professional_baseline_gap_analysis_against_professional_dev_team_standard": "Gap analysis against professional dev team standard." | kind=entity | source=docs/PROFESSIONAL_BASELINE.md:L2 | neighbors=[PROFESSIONAL_BASELINE.md] | lang=en
- "docs_professional_baseline_p1_blocking_fix_before_next_sprint_p2_scheduled_within_30_days_p3_tracked_backlog": "P1 = blocking (fix before next sprint). P2 = scheduled (within 30 days). P3 = t…" | kind=entity | source=docs/PROFESSIONAL_BASELINE.md:L3 | neighbors=[PROFESSIONAL_BASELINE.md] | lang=en
- "docs_professional_baseline_p1_fix_before_next_sprint_blocking": "P1 — Fix Before Next Sprint (blocking)" | kind=entity | source=docs/PROFESSIONAL_BASELINE.md:L237 | neighbors=[CONSOLIDATED REMEDIATION ROADMAP] | lang=en
- "docs_professional_baseline_p2_schedule_within_30_days": "P2 — Schedule Within 30 Days" | kind=entity | source=docs/PROFESSIONAL_BASELINE.md:L248 | neighbors=[CONSOLIDATED REMEDIATION ROADMAP] | lang=en
- "docs_professional_baseline_p3_tracked_backlog": "P3 — Tracked Backlog" | kind=entity | source=docs/PROFESSIONAL_BASELINE.md:L264 | neighbors=[CONSOLIDATED REMEDIATION ROADMAP] | lang=en
- "docs_professional_baseline_professional_baseline_apt_central_command": "PROFESSIONAL BASELINE — APT CENTRAL COMMAND" | kind=entity | source=docs/PROFESSIONAL_BASELINE.md:L1 | neighbors=[PROFESSIONAL_BASELINE.md] | lang=en

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\PTOW\1_APT_Central_Command\.graphify\description-instructions\batch-202.json

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
