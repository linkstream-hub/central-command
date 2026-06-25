# Node Description Batch 97 of 412

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

- "25_parsing_intake_quality_25_validation_test_infrastructure": "Test Infrastructure" | kind=entity | source=.planning/phases/25-parsing-intake-quality/25-VALIDATION.md:L16 | neighbors=[Phase 25 — Validation Strategy]
- "25_parsing_intake_quality_25_validation_validation_sign_off": "Validation Sign-Off" | kind=entity | source=.planning/phases/25-parsing-intake-quality/25-VALIDATION.md:L77 | neighbors=[Phase 25 — Validation Strategy]
- "25_parsing_intake_quality_25_validation_wave_0_requirements": "Wave 0 Requirements" | kind=entity | source=.planning/phases/25-parsing-intake-quality/25-VALIDATION.md:L59 | neighbors=[Phase 25 — Validation Strategy]
- "25_parsing_intake_quality_continue_here_e2e_checklist_for_brandon_task_3_resume": "E2E Checklist for Brandon (Task 3 resume)" | kind=entity | source=.planning/phases/25-parsing-intake-quality/.continue-here.md:L46 | neighbors=[.continue-here.md]
- "25_parsing_intake_quality_continue_here_infrastructure_state": "Infrastructure State" | kind=entity | source=.planning/phases/25-parsing-intake-quality/.continue-here.md:L40 | neighbors=[.continue-here.md]
- "25_parsing_intake_quality_continue_here_required_reading_in_order": "Required Reading (in order)" | kind=entity | source=.planning/phases/25-parsing-intake-quality/.continue-here.md:L37 | neighbors=[.continue-here.md]
- "27_dashboard_remainder_27_01_plan_stride_threat_register": "STRIDE Threat Register" | kind=entity | source=.planning/phases/27-dashboard-remainder/27-01-PLAN.md:L161 | neighbors=[27-01-PLAN.md]
- "27_dashboard_remainder_27_01_plan_trust_boundaries": "Trust Boundaries" | kind=entity | source=.planning/phases/27-dashboard-remainder/27-01-PLAN.md:L155 | neighbors=[27-01-PLAN.md]
- "27_dashboard_remainder_27_02_plan_stride_threat_register": "STRIDE Threat Register" | kind=entity | source=.planning/phases/27-dashboard-remainder/27-02-PLAN.md:L167 | neighbors=[27-02-PLAN.md]
- "27_dashboard_remainder_27_02_plan_trust_boundaries": "Trust Boundaries" | kind=entity | source=.planning/phases/27-dashboard-remainder/27-02-PLAN.md:L160 | neighbors=[27-02-PLAN.md]
- "27_dashboard_remainder_27_03_plan_stride_threat_register": "STRIDE Threat Register" | kind=entity | source=.planning/phases/27-dashboard-remainder/27-03-PLAN.md:L131 | neighbors=[27-03-PLAN.md]
- "27_dashboard_remainder_27_03_plan_trust_boundaries": "Trust Boundaries" | kind=entity | source=.planning/phases/27-dashboard-remainder/27-03-PLAN.md:L125 | neighbors=[27-03-PLAN.md]
- "27_dashboard_remainder_27_04_plan_stride_threat_register": "STRIDE Threat Register" | kind=entity | source=.planning/phases/27-dashboard-remainder/27-04-PLAN.md:L141 | neighbors=[27-04-PLAN.md]
- "27_dashboard_remainder_27_04_plan_trust_boundaries": "Trust Boundaries" | kind=entity | source=.planning/phases/27-dashboard-remainder/27-04-PLAN.md:L135 | neighbors=[27-04-PLAN.md]
- "27_dashboard_remainder_27_05_plan_stride_threat_register": "STRIDE Threat Register" | kind=entity | source=.planning/phases/27-dashboard-remainder/27-05-PLAN.md:L155 | neighbors=[27-05-PLAN.md]
- "27_dashboard_remainder_27_05_plan_trust_boundaries": "Trust Boundaries" | kind=entity | source=.planning/phases/27-dashboard-remainder/27-05-PLAN.md:L148 | neighbors=[27-05-PLAN.md]
- "27_dashboard_remainder_27_06_plan_stride_threat_register": "STRIDE Threat Register" | kind=entity | source=.planning/phases/27-dashboard-remainder/27-06-PLAN.md:L134 | neighbors=[27-06-PLAN.md]
- "27_dashboard_remainder_27_06_plan_trust_boundaries": "Trust Boundaries" | kind=entity | source=.planning/phases/27-dashboard-remainder/27-06-PLAN.md:L128 | neighbors=[27-06-PLAN.md]
- "27_dashboard_remainder_27_context": "27-CONTEXT.md" | kind=entity | source=.planning/phases/27-dashboard-remainder/27-CONTEXT.md:L1 | neighbors=[Phase 27: DashboardAPI Remainder Migrat…]
- "27_dashboard_remainder_27_context_architecture_locked": "Architecture (locked)" | kind=entity | source=.planning/phases/27-dashboard-remainder/27-CONTEXT.md:L26 | neighbors=[Implementation Decisions]
- "27_dashboard_remainder_27_context_claude_s_discretion": "Claude's Discretion" | kind=entity | source=.planning/phases/27-dashboard-remainder/27-CONTEXT.md:L38 | neighbors=[Implementation Decisions]
- "27_dashboard_remainder_27_context_deferred_ideas": "Deferred Ideas" | kind=entity | source=.planning/phases/27-dashboard-remainder/27-CONTEXT.md:L71 | neighbors=[Phase 27: DashboardAPI Remainder Migrat…]
- "27_dashboard_remainder_27_context_in_scope_verified_fallthrough_actions": "In scope (verified fallthrough actions)" | kind=entity | source=.planning/phases/27-dashboard-remainder/27-CONTEXT.md:L17 | neighbors=[Implementation Decisions]
- "27_dashboard_remainder_27_context_migration_scope": "Migration scope" | kind=entity | source=.planning/phases/27-dashboard-remainder/27-CONTEXT.md:L57 | neighbors=[Canonical References]
- "27_dashboard_remainder_27_context_out_of_scope_locked": "Out of scope (locked)" | kind=entity | source=.planning/phases/27-dashboard-remainder/27-CONTEXT.md:L21 | neighbors=[Implementation Decisions]
- "27_dashboard_remainder_27_context_patterns_from_phase_25_proven_analogs": "Patterns from Phase 25 (proven analogs)" | kind=entity | source=.planning/phases/27-dashboard-remainder/27-CONTEXT.md:L52 | neighbors=[Canonical References]
- "27_dashboard_remainder_27_context_phase_boundary": "Phase Boundary" | kind=entity | source=.planning/phases/27-dashboard-remainder/27-CONTEXT.md:L8 | neighbors=[Phase 27: DashboardAPI Remainder Migrat…]
- "27_dashboard_remainder_27_context_port_sources_read_in_full": "Port sources (read in full)" | kind=entity | source=.planning/phases/27-dashboard-remainder/27-CONTEXT.md:L48 | neighbors=[Canonical References]
- "27_dashboard_remainder_27_context_quality_bar_locked": "Quality bar (locked)" | kind=entity | source=.planning/phases/27-dashboard-remainder/27-CONTEXT.md:L32 | neighbors=[Implementation Decisions]
- "27_dashboard_remainder_27_context_specific_ideas": "Specific Ideas" | kind=entity | source=.planning/phases/27-dashboard-remainder/27-CONTEXT.md:L62 | neighbors=[Phase 27: DashboardAPI Remainder Migrat…]
- "27_dashboard_remainder_27_research": "27-RESEARCH.md" | kind=entity | source=.planning/phases/27-dashboard-remainder/27-RESEARCH.md:L1 | neighbors=[Phase 27: DashboardAPI Remainder Migrat…]
- "27_dashboard_remainder_27_research_1_gettimecardapprovalqueueda_lines_2798_2888_portable": "1. `getTimecardApprovalQueueDA` (lines 2798–2888) — PORTABLE" | kind=entity | source=.planning/phases/27-dashboard-remainder/27-RESEARCH.md:L73 | neighbors=[GAS Source Audit — In-Scope Functions]
- "27_dashboard_remainder_27_research_2_approvetimecardda_lines_2890_2916_portable": "2. `approveTimecardDA` (lines 2890–2916) — PORTABLE" | kind=entity | source=.planning/phases/27-dashboard-remainder/27-RESEARCH.md:L104 | neighbors=[GAS Source Audit — In-Scope Functions]
- "27_dashboard_remainder_27_research_3_disputetimecardda_lines_2918_2947_portable": "3. `disputeTimecardDA` (lines 2918–2947) — PORTABLE" | kind=entity | source=.planning/phases/27-dashboard-remainder/27-RESEARCH.md:L121 | neighbors=[GAS Source Audit — In-Scope Functions]
- "27_dashboard_remainder_27_research_4_gettechavailabilityweekda_lines_1549_1610_portable_different_data_source": "4. `getTechAvailabilityWeekDA` (lines 1549–1610) — PORTABLE (different data sou…" | kind=entity | source=.planning/phases/27-dashboard-remainder/27-RESEARCH.md:L133 | neighbors=[GAS Source Audit — In-Scope Functions]
- "27_dashboard_remainder_27_research_5_getcalendardatada_gas_function_missing_implement_fresh": "5. `getCalendarDataDA` — GAS FUNCTION MISSING (implement fresh)" | kind=entity | source=.planning/phases/27-dashboard-remainder/27-RESEARCH.md:L155 | neighbors=[GAS Source Audit — In-Scope Functions]
- "27_dashboard_remainder_27_research_6_markptegranted_gas_action_does_not_exist_in_router": "6. `markPTEGranted` — GAS ACTION DOES NOT EXIST IN ROUTER" | kind=entity | source=.planning/phases/27-dashboard-remainder/27-RESEARCH.md:L179 | neighbors=[GAS Source Audit — In-Scope Functions]
- "27_dashboard_remainder_27_research_7_expandscope_gas_action_does_not_exist_in_router": "7. `expandScope` — GAS ACTION DOES NOT EXIST IN ROUTER" | kind=entity | source=.planning/phases/27-dashboard-remainder/27-RESEARCH.md:L191 | neighbors=[GAS Source Audit — In-Scope Functions]
- "27_dashboard_remainder_27_research_8_generatetenantschedulelink_action_name_mismatch": "8. `generateTenantScheduleLink` — ACTION NAME MISMATCH" | kind=entity | source=.planning/phases/27-dashboard-remainder/27-RESEARCH.md:L216 | neighbors=[GAS Source Audit — In-Scope Functions]
- "27_dashboard_remainder_27_research_9_submitfeedback_getfeedback_updatefeedbackstatus_schema_mismatch": "9. `submitFeedback` / `getFeedback` / `updateFeedbackStatus` — SCHEMA MISMATCH" | kind=entity | source=.planning/phases/27-dashboard-remainder/27-RESEARCH.md:L241 | neighbors=[GAS Source Audit — In-Scope Functions]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\PTOW\1_APT_Central_Command\.graphify\description-instructions\batch-096.json

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
