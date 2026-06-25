# Node Description Batch 93 of 412

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

- "25_parsing_intake_quality_25_01_summary_task_commits": "Task Commits" | kind=entity | source=.planning/phases/25-parsing-intake-quality/25-01-SUMMARY.md:L76 | neighbors=[Phase 25 Plan 01: Port normalizeAddress…]
- "25_parsing_intake_quality_25_01_summary_tdd_gate_compliance": "TDD Gate Compliance" | kind=entity | source=.planning/phases/25-parsing-intake-quality/25-01-SUMMARY.md:L125 | neighbors=[Phase 25 Plan 01: Port normalizeAddress…]
- "25_parsing_intake_quality_25_01_summary_threat_flags": "Threat Flags" | kind=entity | source=.planning/phases/25-parsing-intake-quality/25-01-SUMMARY.md:L138 | neighbors=[Phase 25 Plan 01: Port normalizeAddress…]
- "25_parsing_intake_quality_25_01_summary_user_setup_required": "User Setup Required" | kind=entity | source=.planning/phases/25-parsing-intake-quality/25-01-SUMMARY.md:L121 | neighbors=[Phase 25 Plan 01: Port normalizeAddress…]
- "25_parsing_intake_quality_25_02_plan_accessinfo_text_access_info_nullable": "accessInfo: text('access_info')        // nullable" | kind=entity | source=.planning/phases/25-parsing-intake-quality/25-02-PLAN.md:L80 | neighbors=[25-02-PLAN.md]
- "25_parsing_intake_quality_25_02_plan_addresskey_text_address_key_notnull": "addressKey: text('address_key').notNull()" | kind=entity | source=.planning/phases/25-parsing-intake-quality/25-02-PLAN.md:L79 | neighbors=[25-02-PLAN.md]
- "25_parsing_intake_quality_25_02_plan_analog_files_to_copy_structure_from": "Analog files to copy structure from:" | kind=entity | source=.planning/phases/25-parsing-intake-quality/25-02-PLAN.md:L70 | neighbors=[25-02-PLAN.md]
- "25_parsing_intake_quality_25_02_plan_auth_header_jobs_sync_route_ts_properties_route_ts_internal_key_not_session": "Auth header (jobs/sync/route.ts, properties/route.ts) — INTERNAL key, NOT sessi…" | kind=entity | source=.planning/phases/25-parsing-intake-quality/25-02-PLAN.md:L84 | neighbors=[25-02-PLAN.md]
- "25_parsing_intake_quality_25_02_plan_const_getresend_new_resend_process_env_resend_api_key_re_placeholder": "const getResend = () => new Resend(process.env.RESEND_API_KEY || 're_placeholde…" | kind=entity | source=.planning/phases/25-parsing-intake-quality/25-02-PLAN.md:L91 | neighbors=[25-02-PLAN.md]
- "25_parsing_intake_quality_25_02_plan_dev_write_guard_email_ts_existing_pattern_copy_verbatim_into_new_functions": "Dev write guard (email.ts existing pattern — copy verbatim into new functions):" | kind=entity | source=.planning/phases/25-parsing-intake-quality/25-02-PLAN.md:L87 | neighbors=[25-02-PLAN.md]
- "25_parsing_intake_quality_25_02_plan_if_process_env_node_env_production_process_env_next_public_sandbox_mode_true_console_log_return": "if (process.env.NODE_ENV !== 'production' || process.env.NEXT_PUBLIC_SANDBOX_MO…" | kind=entity | source=.planning/phases/25-parsing-intake-quality/25-02-PLAN.md:L88 | neighbors=[25-02-PLAN.md]
- "25_parsing_intake_quality_25_02_plan_orgid_text_org_id_notnull_default_apt_ca": "orgId: text('org_id').notNull().default('APT-CA')" | kind=entity | source=.planning/phases/25-parsing-intake-quality/25-02-PLAN.md:L81 | neighbors=[25-02-PLAN.md]
- "25_parsing_intake_quality_25_02_plan_port_source_for_merge_logic": "Port source for merge logic:" | kind=entity | source=.planning/phases/25-parsing-intake-quality/25-02-PLAN.md:L67 | neighbors=[25-02-PLAN.md]
- "25_parsing_intake_quality_25_02_plan_properties_table_tech_pwa_src_lib_schema_ts": "properties table (tech-pwa/src/lib/schema.ts):" | kind=entity | source=.planning/phases/25-parsing-intake-quality/25-02-PLAN.md:L78 | neighbors=[25-02-PLAN.md]
- "25_parsing_intake_quality_25_02_plan_req_headers_get_dashboard_api_key_process_env_dashboard_api_key": "req.headers.get('DASHBOARD_API_KEY') === process.env.DASHBOARD_API_KEY" | kind=entity | source=.planning/phases/25-parsing-intake-quality/25-02-PLAN.md:L85 | neighbors=[25-02-PLAN.md]
- "25_parsing_intake_quality_25_02_plan_resend_lazy_init_email_ts_line_5": "Resend lazy init (email.ts line 5):" | kind=entity | source=.planning/phases/25-parsing-intake-quality/25-02-PLAN.md:L90 | neighbors=[25-02-PLAN.md]
- "25_parsing_intake_quality_25_02_plan_stride_threat_register": "STRIDE Threat Register" | kind=entity | source=.planning/phases/25-parsing-intake-quality/25-02-PLAN.md:L180 | neighbors=[Produced this plan — consumed by Plan 2…]
- "25_parsing_intake_quality_25_02_plan_trust_boundaries": "Trust Boundaries" | kind=entity | source=.planning/phases/25-parsing-intake-quality/25-02-PLAN.md:L173 | neighbors=[Produced this plan — consumed by Plan 2…]
- "25_parsing_intake_quality_25_02_plan_unique_on_orgid_addresskey": "unique on (orgId, addressKey)" | kind=entity | source=.planning/phases/25-parsing-intake-quality/25-02-PLAN.md:L82 | neighbors=[25-02-PLAN.md]
- "25_parsing_intake_quality_25_02_summary": "25-02-SUMMARY.md" | kind=entity | source=.planning/phases/25-parsing-intake-quality/25-02-SUMMARY.md:L1 | neighbors=[Phase 25 Plan 02: Access-Sync Route + E…]
- "25_parsing_intake_quality_25_02_summary_access_sync_request_response_contract": "Access-Sync Request/Response Contract" | kind=entity | source=.planning/phases/25-parsing-intake-quality/25-02-SUMMARY.md:L107 | neighbors=[Phase 25 Plan 02: Access-Sync Route + E…]
- "25_parsing_intake_quality_25_02_summary_accomplishments": "Accomplishments" | kind=entity | source=.planning/phases/25-parsing-intake-quality/25-02-SUMMARY.md:L69 | neighbors=[Phase 25 Plan 02: Access-Sync Route + E…]
- "25_parsing_intake_quality_25_02_summary_auto_fixed_issues": "Auto-fixed Issues" | kind=entity | source=.planning/phases/25-parsing-intake-quality/25-02-SUMMARY.md:L147 | neighbors=[Deviations from Plan]
- "25_parsing_intake_quality_25_02_summary_exported_symbol_contracts": "Exported Symbol Contracts" | kind=entity | source=.planning/phases/25-parsing-intake-quality/25-02-SUMMARY.md:L87 | neighbors=[Phase 25 Plan 02: Access-Sync Route + E…]
- "25_parsing_intake_quality_25_02_summary_known_stubs": "Known Stubs" | kind=entity | source=.planning/phases/25-parsing-intake-quality/25-02-SUMMARY.md:L160 | neighbors=[Phase 25 Plan 02: Access-Sync Route + E…]
- "25_parsing_intake_quality_25_02_summary_merge_semantics": "Merge Semantics" | kind=entity | source=.planning/phases/25-parsing-intake-quality/25-02-SUMMARY.md:L137 | neighbors=[Phase 25 Plan 02: Access-Sync Route + E…]
- "25_parsing_intake_quality_25_02_summary_next_phase_readiness": "Next Phase Readiness" | kind=entity | source=.planning/phases/25-parsing-intake-quality/25-02-SUMMARY.md:L187 | neighbors=[Phase 25 Plan 02: Access-Sync Route + E…]
- "25_parsing_intake_quality_25_02_summary_performance": "Performance" | kind=entity | source=.planning/phases/25-parsing-intake-quality/25-02-SUMMARY.md:L61 | neighbors=[Phase 25 Plan 02: Access-Sync Route + E…]
- "25_parsing_intake_quality_25_02_summary_task_3_gate_status": "Task 3 Gate Status" | kind=entity | source=.planning/phases/25-parsing-intake-quality/25-02-SUMMARY.md:L176 | neighbors=[Phase 25 Plan 02: Access-Sync Route + E…]
- "25_parsing_intake_quality_25_02_summary_task_commits": "Task Commits" | kind=entity | source=.planning/phases/25-parsing-intake-quality/25-02-SUMMARY.md:L79 | neighbors=[Phase 25 Plan 02: Access-Sync Route + E…]
- "25_parsing_intake_quality_25_02_summary_tdd_gate_compliance": "TDD Gate Compliance" | kind=entity | source=.planning/phases/25-parsing-intake-quality/25-02-SUMMARY.md:L151 | neighbors=[Phase 25 Plan 02: Access-Sync Route + E…]
- "25_parsing_intake_quality_25_02_summary_threat_flags": "Threat Flags" | kind=entity | source=.planning/phases/25-parsing-intake-quality/25-02-SUMMARY.md:L164 | neighbors=[Phase 25 Plan 02: Access-Sync Route + E…]
- "25_parsing_intake_quality_25_03_plan_all_secrets_as_env_var_never_hardcode": "all secrets as {{$env.VAR}} — never hardcode" | kind=entity | source=.planning/phases/25-parsing-intake-quality/25-03-PLAN.md:L102 | neighbors=[25-03-PLAN.md]
- "25_parsing_intake_quality_25_03_plan_analog_workflows_to_copy_node_shapes_from": "Analog workflows to copy node shapes from:" | kind=entity | source=.planning/phases/25-parsing-intake-quality/25-03-PLAN.md:L78 | neighbors=[25-03-PLAN.md]
- "25_parsing_intake_quality_25_03_plan_api_key_outbound_number_a2p_10dlc_registration_moves_to_phase_23_unified_dispatch_comms": "(API key, outbound number, A2P 10DLC registration) moves to Phase 23 Unified Di…" | kind=entity | source=.planning/phases/25-parsing-intake-quality/25-03-PLAN.md:L19 | neighbors=[25-03-PLAN.md]
- "25_parsing_intake_quality_25_03_plan_body_addresskey_inboundaccessinfo_orgid": "body: { addressKey, inboundAccessInfo, orgId? }" | kind=entity | source=.planning/phases/25-parsing-intake-quality/25-03-PLAN.md:L93 | neighbors=[25-03-PLAN.md]
- "25_parsing_intake_quality_25_03_plan_computeaccessmerge_semantics_25_02_the_access_sync_route_owns_the_merge_n8n_just_posts_inbound": "computeAccessMerge semantics (25-02) — the access-sync route owns the merge; n8…" | kind=entity | source=.planning/phases/25-parsing-intake-quality/25-03-PLAN.md:L89 | neighbors=[25-03-PLAN.md]
- "25_parsing_intake_quality_25_03_plan_credentials_use_name_only_never_id_postgres_confirm_exact_credential_name_in_railway_before_commit": "credentials use \"name\" only, never \"id\"   (Postgres: confirm exact credential n…" | kind=entity | source=.planning/phases/25-parsing-intake-quality/25-03-PLAN.md:L101 | neighbors=[25-03-PLAN.md]
- "25_parsing_intake_quality_25_03_plan_detectlaphamform_25_01_reproduce_in_a_code_node_return_the_laphamparseresult_fields": "detectLaphamForm (25-01) — reproduce in a Code node, return the LaphamParseResu…" | kind=entity | source=.planning/phases/25-parsing-intake-quality/25-03-PLAN.md:L87 | neighbors=[25-03-PLAN.md]
- "25_parsing_intake_quality_25_03_plan_headers_dashboard_api_key_key": "headers: DASHBOARD_API_KEY: <key>" | kind=entity | source=.planning/phases/25-parsing-intake-quality/25-03-PLAN.md:L92 | neighbors=[25-03-PLAN.md]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\PTOW\1_APT_Central_Command\.graphify\description-instructions\batch-092.json

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
