# Node Description Batch 98 of 412

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

- "27_dashboard_remainder_27_research_applicable_asvs_categories": "Applicable ASVS Categories" | kind=entity | source=.planning/phases/27-dashboard-remainder/27-RESEARCH.md:L481 | neighbors=[Security Domain]
- "27_dashboard_remainder_27_research_architectural_responsibility_map": "Architectural Responsibility Map" | kind=entity | source=.planning/phases/27-dashboard-remainder/27-RESEARCH.md:L55 | neighbors=[Phase 27: DashboardAPI Remainder Migrat…]
- "27_dashboard_remainder_27_research_assumptions_log": "Assumptions Log" | kind=entity | source=.planning/phases/27-dashboard-remainder/27-RESEARCH.md:L514 | neighbors=[Phase 27: DashboardAPI Remainder Migrat…]
- "27_dashboard_remainder_27_research_claude_s_discretion": "Claude's Discretion" | kind=entity | source=.planning/phases/27-dashboard-remainder/27-RESEARCH.md:L31 | neighbors=[User Constraints (from CONTEXT.md)]
- "27_dashboard_remainder_27_research_data_source_verdict_table": "Data Source Verdict Table" | kind=entity | source=.planning/phases/27-dashboard-remainder/27-RESEARCH.md:L267 | neighbors=[Phase 27: DashboardAPI Remainder Migrat…]
- "27_dashboard_remainder_27_research_deferred_ideas_out_of_scope": "Deferred Ideas (OUT OF SCOPE)" | kind=entity | source=.planning/phases/27-dashboard-remainder/27-RESEARCH.md:L35 | neighbors=[User Constraints (from CONTEXT.md)]
- "27_dashboard_remainder_27_research_don_t_hand_roll": "Don't Hand-Roll" | kind=entity | source=.planning/phases/27-dashboard-remainder/27-RESEARCH.md:L285 | neighbors=[Phase 27: DashboardAPI Remainder Migrat…]
- "27_dashboard_remainder_27_research_environment_availability": "Environment Availability" | kind=entity | source=.planning/phases/27-dashboard-remainder/27-RESEARCH.md:L502 | neighbors=[Phase 27: DashboardAPI Remainder Migrat…]
- "27_dashboard_remainder_27_research_established_dashboard_route_pattern_from_live_status_and_compliance_status": "Established Dashboard Route Pattern (from live-status and compliance-status)" | kind=entity | source=.planning/phases/27-dashboard-remainder/27-RESEARCH.md:L299 | neighbors=[Architecture Patterns]
- "27_dashboard_remainder_27_research_explicit_failure_rule": "Explicit-Failure Rule" | kind=entity | source=.planning/phases/27-dashboard-remainder/27-RESEARCH.md:L336 | neighbors=[Architecture Patterns]
- "27_dashboard_remainder_27_research_finding_1_getcalendardatada_body_is_missing_from_gas": "Finding 1: getCalendarDataDA Body is Missing from GAS" | kind=entity | source=.planning/phases/27-dashboard-remainder/27-RESEARCH.md:L376 | neighbors=[Critical Findings]
- "27_dashboard_remainder_27_research_finding_2_approvetimecardda_has_wrong_parameter_names": "Finding 2: approveTimecardDA Has Wrong Parameter Names" | kind=entity | source=.planning/phases/27-dashboard-remainder/27-RESEARCH.md:L380 | neighbors=[Critical Findings]
- "27_dashboard_remainder_27_research_finding_3_generatetenantschedulelink_returns_url_but_gas_returns_link": "Finding 3: generateTenantScheduleLink Returns `url` but GAS returns `link`" | kind=entity | source=.planning/phases/27-dashboard-remainder/27-RESEARCH.md:L384 | neighbors=[Critical Findings]
- "27_dashboard_remainder_27_research_finding_4_expandscope_and_markptegranted_have_no_gas_implementation": "Finding 4: expandScope and markPTEGranted Have No GAS Implementation" | kind=entity | source=.planning/phases/27-dashboard-remainder/27-RESEARCH.md:L388 | neighbors=[Critical Findings]
- "27_dashboard_remainder_27_research_finding_5_feedback_table_schema_must_be_migrated_before_port": "Finding 5: Feedback Table Schema Must Be Migrated Before Port" | kind=entity | source=.planning/phases/27-dashboard-remainder/27-RESEARCH.md:L392 | neighbors=[Critical Findings]
- "27_dashboard_remainder_27_research_finding_6_gettechavailability_already_has_a_helper_in_dashboard_api_ts": "Finding 6: getTechAvailability Already Has a Helper in dashboard-api.ts" | kind=entity | source=.planning/phases/27-dashboard-remainder/27-RESEARCH.md:L396 | neighbors=[Critical Findings]
- "27_dashboard_remainder_27_research_known_threat_patterns": "Known Threat Patterns" | kind=entity | source=.planning/phases/27-dashboard-remainder/27-RESEARCH.md:L491 | neighbors=[Security Domain]
- "27_dashboard_remainder_27_research_locked_decisions": "Locked Decisions" | kind=entity | source=.planning/phases/27-dashboard-remainder/27-RESEARCH.md:L20 | neighbors=[User Constraints (from CONTEXT.md)]
- "27_dashboard_remainder_27_research_metadata": "Metadata" | kind=entity | source=.planning/phases/27-dashboard-remainder/27-RESEARCH.md:L565 | neighbors=[Phase 27: DashboardAPI Remainder Migrat…]
- "27_dashboard_remainder_27_research_migrated_actions_vs_special_case_decision": "MIGRATED_ACTIONS vs Special-Case Decision" | kind=entity | source=.planning/phases/27-dashboard-remainder/27-RESEARCH.md:L319 | neighbors=[Architecture Patterns]
- "27_dashboard_remainder_27_research_open_questions_resolved": "Open Questions (RESOLVED)" | kind=entity | source=.planning/phases/27-dashboard-remainder/27-RESEARCH.md:L524 | neighbors=[Phase 27: DashboardAPI Remainder Migrat…]
- "27_dashboard_remainder_27_research_phase_requirements": "Phase Requirements" | kind=entity | source=.planning/phases/27-dashboard-remainder/27-RESEARCH.md:L42 | neighbors=[Phase 27: DashboardAPI Remainder Migrat…]
- "27_dashboard_remainder_27_research_phase_requirements_test_map": "Phase Requirements → Test Map" | kind=entity | source=.planning/phases/27-dashboard-remainder/27-RESEARCH.md:L457 | neighbors=[Validation Architecture]
- "27_dashboard_remainder_27_research_pitfall_1_timecard_actualhours_recalculation": "Pitfall 1: Timecard actualHours Recalculation" | kind=entity | source=.planning/phases/27-dashboard-remainder/27-RESEARCH.md:L404 | neighbors=[Common Pitfalls]
- "27_dashboard_remainder_27_research_pitfall_2_supervisorstatus_enum_values": "Pitfall 2: supervisorStatus Enum Values" | kind=entity | source=.planning/phases/27-dashboard-remainder/27-RESEARCH.md:L410 | neighbors=[Common Pitfalls]
- "27_dashboard_remainder_27_research_pitfall_3_calendar_teamdays_vs_dispatchdays_source_tables": "Pitfall 3: Calendar teamDays vs dispatchDays Source Tables" | kind=entity | source=.planning/phases/27-dashboard-remainder/27-RESEARCH.md:L414 | neighbors=[Common Pitfalls]
- "27_dashboard_remainder_27_research_pitfall_4_trackingtoken_uniqueness_and_collision": "Pitfall 4: trackingToken Uniqueness and Collision" | kind=entity | source=.planning/phases/27-dashboard-remainder/27-RESEARCH.md:L418 | neighbors=[Common Pitfalls]
- "27_dashboard_remainder_27_research_pitfall_5_dev_blocked_writes_not_cleaned_up": "Pitfall 5: DEV_BLOCKED_WRITES Not Cleaned Up" | kind=entity | source=.planning/phases/27-dashboard-remainder/27-RESEARCH.md:L422 | neighbors=[Common Pitfalls]
- "27_dashboard_remainder_27_research_pitfall_6_feedback_rowindex_vs_neon_id": "Pitfall 6: Feedback rowIndex vs Neon id" | kind=entity | source=.planning/phases/27-dashboard-remainder/27-RESEARCH.md:L426 | neighbors=[Common Pitfalls]
- "27_dashboard_remainder_27_research_primary_high_confidence": "Primary (HIGH confidence)" | kind=entity | source=.planning/phases/27-dashboard-remainder/27-RESEARCH.md:L545 | neighbors=[Sources]
- "27_dashboard_remainder_27_research_recommended_route_structure": "Recommended Route Structure" | kind=entity | source=.planning/phases/27-dashboard-remainder/27-RESEARCH.md:L351 | neighbors=[Architecture Patterns]
- "27_dashboard_remainder_27_research_runtime_state_inventory": "Runtime State Inventory" | kind=entity | source=.planning/phases/27-dashboard-remainder/27-RESEARCH.md:L432 | neighbors=[Phase 27: DashboardAPI Remainder Migrat…]
- "27_dashboard_remainder_27_research_secondary_medium_confidence": "Secondary (MEDIUM confidence)" | kind=entity | source=.planning/phases/27-dashboard-remainder/27-RESEARCH.md:L559 | neighbors=[Sources]
- "27_dashboard_remainder_27_research_summary": "Summary" | kind=entity | source=.planning/phases/27-dashboard-remainder/27-RESEARCH.md:L9 | neighbors=[Phase 27: DashboardAPI Remainder Migrat…]
- "27_dashboard_remainder_27_research_test_framework": "Test Framework" | kind=entity | source=.planning/phases/27-dashboard-remainder/27-RESEARCH.md:L449 | neighbors=[Validation Architecture]
- "27_dashboard_remainder_27_research_wave_0_gaps": "Wave 0 Gaps" | kind=entity | source=.planning/phases/27-dashboard-remainder/27-RESEARCH.md:L470 | neighbors=[Validation Architecture]
- "27_dashboard_remainder_27_validation": "27-VALIDATION.md" | kind=entity | source=.planning/phases/27-dashboard-remainder/27-VALIDATION.md:L1 | neighbors=[Phase 27 — Validation Strategy]
- "27_dashboard_remainder_27_validation_manual_only_verifications": "Manual-Only Verifications" | kind=entity | source=.planning/phases/27-dashboard-remainder/27-VALIDATION.md:L66 | neighbors=[Phase 27 — Validation Strategy]
- "27_dashboard_remainder_27_validation_per_task_verification_map": "Per-Task Verification Map" | kind=entity | source=.planning/phases/27-dashboard-remainder/27-VALIDATION.md:L38 | neighbors=[Phase 27 — Validation Strategy]
- "27_dashboard_remainder_27_validation_sampling_rate": "Sampling Rate" | kind=entity | source=.planning/phases/27-dashboard-remainder/27-VALIDATION.md:L29 | neighbors=[Phase 27 — Validation Strategy]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\PTOW\1_APT_Central_Command\.graphify\description-instructions\batch-097.json

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
