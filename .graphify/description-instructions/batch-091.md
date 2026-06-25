# Node Description Batch 92 of 412

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

- "17_gas_migration_phase_b_pure_js_utility_migration_17_01_summary": "17-01-SUMMARY.md" | kind=entity | source=.planning/phases/17-gas-migration-phase-b-pure-js-utility-migration/17-01-SUMMARY.md:L1 | neighbors=[Phase 17 Execution Summary]
- "17_gas_migration_phase_b_pure_js_utility_migration_17_01_summary_next_steps": "Next Steps" | kind=entity | source=.planning/phases/17-gas-migration-phase-b-pure-js-utility-migration/17-01-SUMMARY.md:L16 | neighbors=[Phase 17 Execution Summary]
- "17_gas_migration_phase_b_pure_js_utility_migration_17_01_summary_tasks_completed": "Tasks Completed" | kind=entity | source=.planning/phases/17-gas-migration-phase-b-pure-js-utility-migration/17-01-SUMMARY.md:L3 | neighbors=[Phase 17 Execution Summary]
- "17_gas_migration_phase_b_pure_js_utility_migration_17_01_summary_validation": "Validation" | kind=entity | source=.planning/phases/17-gas-migration-phase-b-pure-js-utility-migration/17-01-SUMMARY.md:L11 | neighbors=[Phase 17 Execution Summary]
- "17_gas_migration_phase_b_pure_js_utility_migration_17_research": "17-RESEARCH.md" | kind=entity | source=.planning/phases/17-gas-migration-phase-b-pure-js-utility-migration/17-RESEARCH.md:L1 | neighbors=[Phase 17: TechPWA Cutover (validateToke…]
- "17_gas_migration_phase_b_pure_js_utility_migration_17_research_1_change_pin_route_stub": "1. Change PIN Route & Stub" | kind=entity | source=.planning/phases/17-gas-migration-phase-b-pure-js-utility-migration/17-RESEARCH.md:L7 | neighbors=[Context and Findings]
- "17_gas_migration_phase_b_pure_js_utility_migration_17_research_2_validatetoken_to_neon": "2. validateToken to Neon" | kind=entity | source=.planning/phases/17-gas-migration-phase-b-pure-js-utility-migration/17-RESEARCH.md:L12 | neighbors=[Context and Findings]
- "17_gas_migration_phase_b_pure_js_utility_migration_17_research_3_clock_events_cutover": "3. Clock Events Cutover" | kind=entity | source=.planning/phases/17-gas-migration-phase-b-pure-js-utility-migration/17-RESEARCH.md:L17 | neighbors=[Context and Findings]
- "17_gas_migration_phase_b_pure_js_utility_migration_17_research_4_job_status": "4. Job Status" | kind=entity | source=.planning/phases/17-gas-migration-phase-b-pure-js-utility-migration/17-RESEARCH.md:L23 | neighbors=[Context and Findings]
- "17_gas_migration_phase_b_pure_js_utility_migration_17_research_canonical_references": "Canonical References" | kind=entity | source=.planning/phases/17-gas-migration-phase-b-pure-js-utility-migration/17-RESEARCH.md:L27 | neighbors=[Phase 17: TechPWA Cutover (validateToke…]
- "18_gas_migration_phase_c_techpwa_cutover_18_01_plan": "18-01-PLAN.md" | kind=entity | source=.planning/phases/18-gas-migration-phase-c-techpwa-cutover/18-01-PLAN.md:L1 | neighbors=[Phase 18 Execution Plan: Full TechPWA C…]
- "18_gas_migration_phase_c_techpwa_cutover_18_01_plan_flags_gates": "Flags & Gates" | kind=entity | source=.planning/phases/18-gas-migration-phase-c-techpwa-cutover/18-01-PLAN.md:L30 | neighbors=[Phase 18 Execution Plan: Full TechPWA C…]
- "18_gas_migration_phase_c_techpwa_cutover_18_01_plan_goal": "Goal" | kind=entity | source=.planning/phases/18-gas-migration-phase-c-techpwa-cutover/18-01-PLAN.md:L3 | neighbors=[Phase 18 Execution Plan: Full TechPWA C…]
- "18_gas_migration_phase_c_techpwa_cutover_18_01_plan_scope_research_summary": "Scope & Research Summary" | kind=entity | source=.planning/phases/18-gas-migration-phase-c-techpwa-cutover/18-01-PLAN.md:L6 | neighbors=[Phase 18 Execution Plan: Full TechPWA C…]
- "18_gas_migration_phase_c_techpwa_cutover_18_01_plan_step_1_fully_stub_doget_and_dopost_in_techpwa_gs": "Step 1: Fully Stub `doGet` and `doPost` in `TechPWA.gs`" | kind=entity | source=.planning/phases/18-gas-migration-phase-c-techpwa-cutover/18-01-PLAN.md:L14 | neighbors=[Execution Steps]
- "18_gas_migration_phase_c_techpwa_cutover_18_01_plan_step_2_deployment": "Step 2: Deployment" | kind=entity | source=.planning/phases/18-gas-migration-phase-c-techpwa-cutover/18-01-PLAN.md:L26 | neighbors=[Execution Steps]
- "19_gas_migration_phase_d_email_polling_19_01_plan": "19-01-PLAN.md" | kind=entity | source=.planning/phases/19-gas-migration-phase-d-email-polling/19-01-PLAN.md:L1 | neighbors=[Phase 19 Execution Plan: Migrate Code.j…]
- "19_gas_migration_phase_d_email_polling_19_01_plan_flags_gates": "Flags & Gates" | kind=entity | source=.planning/phases/19-gas-migration-phase-d-email-polling/19-01-PLAN.md:L30 | neighbors=[Phase 19 Execution Plan: Migrate Code.j…]
- "19_gas_migration_phase_d_email_polling_19_01_plan_goal": "Goal" | kind=entity | source=.planning/phases/19-gas-migration-phase-d-email-polling/19-01-PLAN.md:L3 | neighbors=[Phase 19 Execution Plan: Migrate Code.j…]
- "19_gas_migration_phase_d_email_polling_19_01_plan_scope_research_summary": "Scope & Research Summary" | kind=entity | source=.planning/phases/19-gas-migration-phase-d-email-polling/19-01-PLAN.md:L6 | neighbors=[Phase 19 Execution Plan: Migrate Code.j…]
- "19_gas_migration_phase_d_email_polling_19_01_plan_step_1_create_n8n_workflow": "Step 1: Create n8n Workflow" | kind=entity | source=.planning/phases/19-gas-migration-phase-d-email-polling/19-01-PLAN.md:L16 | neighbors=[Execution Steps]
- "19_gas_migration_phase_d_email_polling_19_01_plan_step_2_disable_checknewleademails_in_code_js": "Step 2: Disable `checkNewLeadEmails` in `Code.js`" | kind=entity | source=.planning/phases/19-gas-migration-phase-d-email-polling/19-01-PLAN.md:L22 | neighbors=[Execution Steps]
- "19_gas_migration_phase_d_email_polling_19_01_plan_step_3_deployment": "Step 3: Deployment" | kind=entity | source=.planning/phases/19-gas-migration-phase-d-email-polling/19-01-PLAN.md:L26 | neighbors=[Execution Steps]
- "21_neon_migration_context": "CONTEXT.md" | kind=entity | source=.planning/phases/21-neon-migration/CONTEXT.md:L1 | neighbors=[Context: Neon Migration]
- "21_neon_migration_context_core_goal": "Core Goal" | kind=entity | source=.planning/phases/21-neon-migration/CONTEXT.md:L3 | neighbors=[Context: Neon Migration]
- "21_neon_migration_context_explicit_decisions_requirements": "Explicit Decisions & Requirements" | kind=entity | source=.planning/phases/21-neon-migration/CONTEXT.md:L6 | neighbors=[Context: Neon Migration]
- "21_neon_migration_context_next_step_for_planner": "Next Step for Planner" | kind=entity | source=.planning/phases/21-neon-migration/CONTEXT.md:L18 | neighbors=[Context: Neon Migration]
- "25_parsing_intake_quality_25_01_plan_port_source_read_in_full_before_writing": "Port source (read in full before writing):" | kind=entity | source=.planning/phases/25-parsing-intake-quality/25-01-PLAN.md:L67 | neighbors=[25-01-PLAN.md]
- "25_parsing_intake_quality_25_01_plan_stride_threat_register": "STRIDE Threat Register" | kind=entity | source=.planning/phases/25-parsing-intake-quality/25-01-PLAN.md:L187 | neighbors=[Analog files to copy structure from:]
- "25_parsing_intake_quality_25_01_plan_trust_boundaries": "Trust Boundaries" | kind=entity | source=.planning/phases/25-parsing-intake-quality/25-01-PLAN.md:L181 | neighbors=[Analog files to copy structure from:]
- "25_parsing_intake_quality_25_01_summary": "25-01-SUMMARY.md" | kind=entity | source=.planning/phases/25-parsing-intake-quality/25-01-SUMMARY.md:L1 | neighbors=[Phase 25 Plan 01: Port normalizeAddress…]
- "25_parsing_intake_quality_25_01_summary_accomplishments": "Accomplishments" | kind=entity | source=.planning/phases/25-parsing-intake-quality/25-01-SUMMARY.md:L67 | neighbors=[Phase 25 Plan 01: Port normalizeAddress…]
- "25_parsing_intake_quality_25_01_summary_auto_fixed_issues": "Auto-fixed Issues" | kind=entity | source=.planning/phases/25-parsing-intake-quality/25-01-SUMMARY.md:L103 | neighbors=[Deviations from Plan]
- "25_parsing_intake_quality_25_01_summary_decisions_made": "Decisions Made" | kind=entity | source=.planning/phases/25-parsing-intake-quality/25-01-SUMMARY.md:L93 | neighbors=[Phase 25 Plan 01: Port normalizeAddress…]
- "25_parsing_intake_quality_25_01_summary_files_created_modified": "Files Created/Modified" | kind=entity | source=.planning/phases/25-parsing-intake-quality/25-01-SUMMARY.md:L82 | neighbors=[Phase 25 Plan 01: Port normalizeAddress…]
- "25_parsing_intake_quality_25_01_summary_issues_encountered": "Issues Encountered" | kind=entity | source=.planning/phases/25-parsing-intake-quality/25-01-SUMMARY.md:L117 | neighbors=[Phase 25 Plan 01: Port normalizeAddress…]
- "25_parsing_intake_quality_25_01_summary_known_stubs": "Known Stubs" | kind=entity | source=.planning/phases/25-parsing-intake-quality/25-01-SUMMARY.md:L134 | neighbors=[Phase 25 Plan 01: Port normalizeAddress…]
- "25_parsing_intake_quality_25_01_summary_next_phase_readiness": "Next Phase Readiness" | kind=entity | source=.planning/phases/25-parsing-intake-quality/25-01-SUMMARY.md:L153 | neighbors=[Phase 25 Plan 01: Port normalizeAddress…]
- "25_parsing_intake_quality_25_01_summary_performance": "Performance" | kind=entity | source=.planning/phases/25-parsing-intake-quality/25-01-SUMMARY.md:L59 | neighbors=[Phase 25 Plan 01: Port normalizeAddress…]
- "25_parsing_intake_quality_25_01_summary_task_3_gate_status": "Task 3 Gate Status" | kind=entity | source=.planning/phases/25-parsing-intake-quality/25-01-SUMMARY.md:L142 | neighbors=[Phase 25 Plan 01: Port normalizeAddress…]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\PTOW\1_APT_Central_Command\.graphify\description-instructions\batch-091.json

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
