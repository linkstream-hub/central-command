# Node Description Batch 94 of 412

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

- "25_parsing_intake_quality_25_03_plan_n8n_invariants": "n8n invariants:" | kind=entity | source=.planning/phases/25-parsing-intake-quality/25-03-PLAN.md:L100 | neighbors=[25-03-PLAN.md]
- "25_parsing_intake_quality_25_03_plan_normalizeaddresskey_25_01_reproduce_in_a_code_node_for_the_property_lookup_key": "normalizeAddressKey (25-01) — reproduce in a Code node for the property lookup …" | kind=entity | source=.planning/phases/25-parsing-intake-quality/25-03-PLAN.md:L88 | neighbors=[25-03-PLAN.md]
- "25_parsing_intake_quality_25_03_plan_openphone_sms_deferred_coo_2026_06_10_core_intake_features_first_openphone_integration": "OpenPhone SMS DEFERRED (COO 2026-06-10): core intake features first. OpenPhone …" | kind=entity | source=.planning/phases/25-parsing-intake-quality/25-03-PLAN.md:L18 | neighbors=[25-03-PLAN.md]
- "25_parsing_intake_quality_25_03_plan_openphone_sms_deferred_to_phase_23_do_not_add_any_openphone_node_in_this_phase": "OpenPhone SMS: DEFERRED to Phase 23 — do not add any OpenPhone node in this pha…" | kind=entity | source=.planning/phases/25-parsing-intake-quality/25-03-PLAN.md:L98 | neighbors=[25-03-PLAN.md]
- "25_parsing_intake_quality_25_03_plan_port_source_for_the_workflow_code_nodes": "Port source for the workflow Code nodes:" | kind=entity | source=.planning/phases/25-parsing-intake-quality/25-03-PLAN.md:L75 | neighbors=[25-03-PLAN.md]
- "25_parsing_intake_quality_25_03_plan_post_api_intake_access_sync_25_02": "POST /api/intake/access-sync  (25-02)" | kind=entity | source=.planning/phases/25-parsing-intake-quality/25-03-PLAN.md:L91 | neighbors=[25-03-PLAN.md]
- "25_parsing_intake_quality_25_03_plan_post_api_jobs_sync_existing_header_dashboard_api_key_not_x_api_key": "POST /api/jobs/sync (existing) — header DASHBOARD_API_KEY (NOT x-api-key)" | kind=entity | source=.planning/phases/25-parsing-intake-quality/25-03-PLAN.md:L96 | neighbors=[25-03-PLAN.md]
- "25_parsing_intake_quality_25_03_plan_resp_updated_boolean_newcodes_string_reason_string": "resp: { updated: boolean, newCodes?: string[], reason?: string }" | kind=entity | source=.planning/phases/25-parsing-intake-quality/25-03-PLAN.md:L94 | neighbors=[25-03-PLAN.md]
- "25_parsing_intake_quality_25_03_plan_stride_threat_register": "STRIDE Threat Register" | kind=entity | source=.planning/phases/25-parsing-intake-quality/25-03-PLAN.md:L185 | neighbors=[commit with "active": false]
- "25_parsing_intake_quality_25_03_plan_trust_boundaries": "Trust Boundaries" | kind=entity | source=.planning/phases/25-parsing-intake-quality/25-03-PLAN.md:L177 | neighbors=[commit with "active": false]
- "25_parsing_intake_quality_25_03_summary": "25-03-SUMMARY.md" | kind=entity | source=.planning/phases/25-parsing-intake-quality/25-03-SUMMARY.md:L1 | neighbors=[Phase 25 Plan 03: WO-Intake n8n Workflo…]
- "25_parsing_intake_quality_25_03_summary_accomplishments": "Accomplishments" | kind=entity | source=.planning/phases/25-parsing-intake-quality/25-03-SUMMARY.md:L65 | neighbors=[Phase 25 Plan 03: WO-Intake n8n Workflo…]
- "25_parsing_intake_quality_25_03_summary_auto_fixed_issues": "Auto-fixed Issues" | kind=entity | source=.planning/phases/25-parsing-intake-quality/25-03-SUMMARY.md:L178 | neighbors=[Deviations from Plan]
- "25_parsing_intake_quality_25_03_summary_credential_names_used": "Credential Names Used" | kind=entity | source=.planning/phases/25-parsing-intake-quality/25-03-SUMMARY.md:L127 | neighbors=[Phase 25 Plan 03: WO-Intake n8n Workflo…]
- "25_parsing_intake_quality_25_03_summary_env_vars_required": "Env Vars Required" | kind=entity | source=.planning/phases/25-parsing-intake-quality/25-03-SUMMARY.md:L134 | neighbors=[Phase 25 Plan 03: WO-Intake n8n Workflo…]
- "25_parsing_intake_quality_25_03_summary_known_stubs": "Known Stubs" | kind=entity | source=.planning/phases/25-parsing-intake-quality/25-03-SUMMARY.md:L186 | neighbors=[Phase 25 Plan 03: WO-Intake n8n Workflo…]
- "25_parsing_intake_quality_25_03_summary_node_inventory_24_nodes": "Node Inventory (24 nodes)" | kind=entity | source=.planning/phases/25-parsing-intake-quality/25-03-SUMMARY.md:L98 | neighbors=[Phase 25 Plan 03: WO-Intake n8n Workflo…]
- "25_parsing_intake_quality_25_03_summary_performance": "Performance" | kind=entity | source=.planning/phases/25-parsing-intake-quality/25-03-SUMMARY.md:L58 | neighbors=[Phase 25 Plan 03: WO-Intake n8n Workflo…]
- "25_parsing_intake_quality_25_03_summary_pre_activation_checklist": "Pre-activation Checklist" | kind=entity | source=.planning/phases/25-parsing-intake-quality/25-03-SUMMARY.md:L144 | neighbors=[Phase 25 Plan 03: WO-Intake n8n Workflo…]
- "25_parsing_intake_quality_25_03_summary_task_4_gate_status": "Task 4 Gate Status" | kind=entity | source=.planning/phases/25-parsing-intake-quality/25-03-SUMMARY.md:L211 | neighbors=[Phase 25 Plan 03: WO-Intake n8n Workflo…]
- "25_parsing_intake_quality_25_03_summary_task_commits": "Task Commits" | kind=entity | source=.planning/phases/25-parsing-intake-quality/25-03-SUMMARY.md:L83 | neighbors=[Phase 25 Plan 03: WO-Intake n8n Workflo…]
- "25_parsing_intake_quality_25_03_summary_threat_flags": "Threat Flags" | kind=entity | source=.planning/phases/25-parsing-intake-quality/25-03-SUMMARY.md:L198 | neighbors=[Phase 25 Plan 03: WO-Intake n8n Workflo…]
- "25_parsing_intake_quality_25_03_summary_workflow_source": "Workflow Source" | kind=entity | source=.planning/phases/25-parsing-intake-quality/25-03-SUMMARY.md:L89 | neighbors=[Phase 25 Plan 03: WO-Intake n8n Workflo…]
- "25_parsing_intake_quality_25_04_plan_1_insert_return_stub_at_top_of_checknewleademails_clasp_push_force_gas_stops_polling": "1. Insert `return;` stub at top of checkNewLeadEmails  →  clasp push --force  (…" | kind=entity | source=.planning/phases/25-parsing-intake-quality/25-04-PLAN.md:L59 | neighbors=[25-04-PLAN.md]
- "25_parsing_intake_quality_25_04_plan_2_delete_the_gas_time_based_trigger_manual_triggers_panel_kill_it_while_gas_is_stubbed": "2. Delete the GAS time-based trigger (manual, Triggers panel — kill it while GA…" | kind=entity | source=.planning/phases/25-parsing-intake-quality/25-04-PLAN.md:L60 | neighbors=[25-04-PLAN.md]
- "25_parsing_intake_quality_25_04_plan_3_activate_n8n_phase_19_email_polling_workflow_n8n_starts_polling_only_poller_left": "3. Activate n8n phase-19-email-polling workflow         (n8n starts polling — o…" | kind=entity | source=.planning/phases/25-parsing-intake-quality/25-04-PLAN.md:L61 | neighbors=[25-04-PLAN.md]
- "25_parsing_intake_quality_25_04_plan_claude_md_invariants_no_new_gas_code_a_stub_early_return_is_migration_allowed": "CLAUDE.md invariants: no NEW GAS code (a stub/early-return is migration, allowe…" | kind=entity | source=.planning/phases/25-parsing-intake-quality/25-04-PLAN.md:L65 | neighbors=[25-04-PLAN.md]
- "25_parsing_intake_quality_25_04_plan_concurrency_duplicate_wos_warning_sign_two_wos_with_same_gmail_msgid_in_neon_jobs_table": "Concurrency = duplicate WOs. Warning sign: two WOs with same Gmail msgId in Neo…" | kind=entity | source=.planning/phases/25-parsing-intake-quality/25-04-PLAN.md:L63 | neighbors=[25-04-PLAN.md]
- "25_parsing_intake_quality_25_04_plan_cutover_source": "Cutover source:" | kind=entity | source=.planning/phases/25-parsing-intake-quality/25-04-PLAN.md:L54 | neighbors=[25-04-PLAN.md]
- "25_parsing_intake_quality_25_04_plan_stride_threat_register": "STRIDE Threat Register" | kind=entity | source=.planning/phases/25-parsing-intake-quality/25-04-PLAN.md:L130 | neighbors=[clasp deploy is MANUAL ONLY — never aut…]
- "25_parsing_intake_quality_25_04_plan_trust_boundaries": "Trust Boundaries" | kind=entity | source=.planning/phases/25-parsing-intake-quality/25-04-PLAN.md:L123 | neighbors=[clasp deploy is MANUAL ONLY — never aut…]
- "25_parsing_intake_quality_25_context": "25-CONTEXT.md" | kind=entity | source=.planning/phases/25-parsing-intake-quality/25-CONTEXT.md:L1 | neighbors=[Phase 25: Parsing & Intake Quality - Co…]
- "25_parsing_intake_quality_25_context_access_info_locked": "Access info (locked)" | kind=entity | source=.planning/phases/25-parsing-intake-quality/25-CONTEXT.md:L23 | neighbors=[Implementation Decisions]
- "25_parsing_intake_quality_25_context_architecture_constraints_locked": "Architecture constraints (locked)" | kind=entity | source=.planning/phases/25-parsing-intake-quality/25-CONTEXT.md:L38 | neighbors=[Implementation Decisions]
- "25_parsing_intake_quality_25_context_claude_s_discretion": "Claude's Discretion" | kind=entity | source=.planning/phases/25-parsing-intake-quality/25-CONTEXT.md:L43 | neighbors=[Implementation Decisions]
- "25_parsing_intake_quality_25_context_comms": "Comms" | kind=entity | source=.planning/phases/25-parsing-intake-quality/25-CONTEXT.md:L65 | neighbors=[Canonical References]
- "25_parsing_intake_quality_25_context_comms_wiring_locked": "Comms wiring (locked)" | kind=entity | source=.planning/phases/25-parsing-intake-quality/25-CONTEXT.md:L32 | neighbors=[Implementation Decisions]
- "25_parsing_intake_quality_25_context_data_layer": "Data layer" | kind=entity | source=.planning/phases/25-parsing-intake-quality/25-CONTEXT.md:L61 | neighbors=[Canonical References]
- "25_parsing_intake_quality_25_context_deferred_ideas": "Deferred Ideas" | kind=entity | source=.planning/phases/25-parsing-intake-quality/25-CONTEXT.md:L85 | neighbors=[Phase 25: Parsing & Intake Quality - Co…]
- "25_parsing_intake_quality_25_context_extraction_targets_locked_the_assign_schedule_minimum": "Extraction targets (locked — the assign/schedule minimum)" | kind=entity | source=.planning/phases/25-parsing-intake-quality/25-CONTEXT.md:L17 | neighbors=[Implementation Decisions]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\PTOW\1_APT_Central_Command\.graphify\description-instructions\batch-093.json

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
