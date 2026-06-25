# Node Description Batch 95 of 412

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

- "25_parsing_intake_quality_25_context_lapham_forms_locked_paramount": "Lapham forms (locked — paramount)" | kind=entity | source=.planning/phases/25-parsing-intake-quality/25-CONTEXT.md:L27 | neighbors=[Implementation Decisions]
- "25_parsing_intake_quality_25_context_migration_scope": "Migration scope" | kind=entity | source=.planning/phases/25-parsing-intake-quality/25-CONTEXT.md:L69 | neighbors=[Canonical References]
- "25_parsing_intake_quality_25_context_parsing_source_audit_target_read_in_full_before_porting": "Parsing source (audit target — read in full before porting)" | kind=entity | source=.planning/phases/25-parsing-intake-quality/25-CONTEXT.md:L57 | neighbors=[Canonical References]
- "25_parsing_intake_quality_25_context_phase_boundary": "Phase Boundary" | kind=entity | source=.planning/phases/25-parsing-intake-quality/25-CONTEXT.md:L8 | neighbors=[Phase 25: Parsing & Intake Quality - Co…]
- "25_parsing_intake_quality_25_context_specific_ideas": "Specific Ideas" | kind=entity | source=.planning/phases/25-parsing-intake-quality/25-CONTEXT.md:L75 | neighbors=[Phase 25: Parsing & Intake Quality - Co…]
- "25_parsing_intake_quality_25_patterns": "25-PATTERNS.md" | kind=entity | source=.planning/phases/25-parsing-intake-quality/25-PATTERNS.md:L1 | neighbors=[Phase 25: Parsing & Intake Quality - Pa…]
- "25_parsing_intake_quality_25_patterns_api_key_auth_dashboard_api_key": "API Key Auth (DASHBOARD_API_KEY)" | kind=entity | source=.planning/phases/25-parsing-intake-quality/25-PATTERNS.md:L467 | neighbors=[Shared Patterns]
- "25_parsing_intake_quality_25_patterns_dev_sandbox_write_guard": "Dev/Sandbox Write Guard" | kind=entity | source=.planning/phases/25-parsing-intake-quality/25-PATTERNS.md:L482 | neighbors=[Shared Patterns]
- "25_parsing_intake_quality_25_patterns_drizzle_upsert_onconflictdoupdate": "Drizzle Upsert (onConflictDoUpdate)" | kind=entity | source=.planning/phases/25-parsing-intake-quality/25-PATTERNS.md:L496 | neighbors=[Shared Patterns]
- "25_parsing_intake_quality_25_patterns_error_handling_in_api_routes": "Error Handling in API Routes" | kind=entity | source=.planning/phases/25-parsing-intake-quality/25-PATTERNS.md:L510 | neighbors=[Shared Patterns]
- "25_parsing_intake_quality_25_patterns_file_classification": "File Classification" | kind=entity | source=.planning/phases/25-parsing-intake-quality/25-PATTERNS.md:L9 | neighbors=[Phase 25: Parsing & Intake Quality - Pa…]
- "25_parsing_intake_quality_25_patterns_metadata": "Metadata" | kind=entity | source=.planning/phases/25-parsing-intake-quality/25-PATTERNS.md:L561 | neighbors=[Phase 25: Parsing & Intake Quality - Pa…]
- "25_parsing_intake_quality_25_patterns_no_analog_found": "No Analog Found" | kind=entity | source=.planning/phases/25-parsing-intake-quality/25-PATTERNS.md:L551 | neighbors=[Phase 25: Parsing & Intake Quality - Pa…]
- "25_parsing_intake_quality_25_patterns_resend_initialization": "Resend Initialization" | kind=entity | source=.planning/phases/25-parsing-intake-quality/25-PATTERNS.md:L525 | neighbors=[Shared Patterns]
- "25_parsing_intake_quality_25_patterns_tech_pwa_src_app_api_intake_access_sync_route_ts_route_request_response": "`tech-pwa/src/app/api/intake/access-sync/route.ts` (route, request-response)" | kind=entity | source=.planning/phases/25-parsing-intake-quality/25-PATTERNS.md:L127 | neighbors=[Pattern Assignments]
- "25_parsing_intake_quality_25_patterns_tech_pwa_src_lib_detectlaphamform_ts_utility_transform": "`tech-pwa/src/lib/detectLaphamForm.ts` (utility, transform)" | kind=entity | source=.planning/phases/25-parsing-intake-quality/25-PATTERNS.md:L63 | neighbors=[Pattern Assignments]
- "25_parsing_intake_quality_25_patterns_tech_pwa_src_lib_email_ts_add_sendrequesterautoreply_sendtenantcoordinationemail_utility_request_response": "`tech-pwa/src/lib/email.ts` — add `sendRequesterAutoReply` + `sendTenantCoordin…" | kind=entity | source=.planning/phases/25-parsing-intake-quality/25-PATTERNS.md:L194 | neighbors=[Pattern Assignments]
- "25_parsing_intake_quality_25_patterns_tech_pwa_src_lib_normalizeaddresskey_ts_utility_transform": "`tech-pwa/src/lib/normalizeAddressKey.ts` (utility, transform)" | kind=entity | source=.planning/phases/25-parsing-intake-quality/25-PATTERNS.md:L26 | neighbors=[Pattern Assignments]
- "25_parsing_intake_quality_25_patterns_tech_pwa_src_lib_tests_access_codes_test_ts_test_request_response": "`tech-pwa/src/lib/__tests__/access-codes.test.ts` (test, request-response)" | kind=entity | source=.planning/phases/25-parsing-intake-quality/25-PATTERNS.md:L324 | neighbors=[Pattern Assignments]
- "25_parsing_intake_quality_25_patterns_tech_pwa_src_lib_tests_detectlaphamform_test_ts_test_transform": "`tech-pwa/src/lib/__tests__/detectLaphamForm.test.ts` (test, transform)" | kind=entity | source=.planning/phases/25-parsing-intake-quality/25-PATTERNS.md:L285 | neighbors=[Pattern Assignments]
- "25_parsing_intake_quality_25_patterns_tech_pwa_src_lib_tests_normalizeaddresskey_test_ts_test_transform": "`tech-pwa/src/lib/__tests__/normalizeAddressKey.test.ts` (test, transform)" | kind=entity | source=.planning/phases/25-parsing-intake-quality/25-PATTERNS.md:L243 | neighbors=[Pattern Assignments]
- "25_parsing_intake_quality_25_patterns_tools_n8n_workflows_phase_19_email_polling_json_n8n_workflow_event_driven": "`tools/n8n/workflows/phase-19-email-polling.json` (n8n workflow, event-driven)" | kind=entity | source=.planning/phases/25-parsing-intake-quality/25-PATTERNS.md:L347 | neighbors=[Pattern Assignments]
- "25_parsing_intake_quality_25_patterns_vitest_test_runner": "Vitest Test Runner" | kind=entity | source=.planning/phases/25-parsing-intake-quality/25-PATTERNS.md:L536 | neighbors=[Shared Patterns]
- "25_parsing_intake_quality_25_research": "25-RESEARCH.md" | kind=entity | source=.planning/phases/25-parsing-intake-quality/25-RESEARCH.md:L1 | neighbors=[Phase 25: Parsing & Intake Quality — Re…]
- "25_parsing_intake_quality_25_research_anti_patterns_to_avoid": "Anti-Patterns to Avoid" | kind=entity | source=.planning/phases/25-parsing-intake-quality/25-RESEARCH.md:L266 | neighbors=[Architecture Patterns]
- "25_parsing_intake_quality_25_research_applicable_asvs_categories": "Applicable ASVS Categories" | kind=entity | source=.planning/phases/25-parsing-intake-quality/25-RESEARCH.md:L629 | neighbors=[Security Domain]
- "25_parsing_intake_quality_25_research_architectural_responsibility_map": "Architectural Responsibility Map" | kind=entity | source=.planning/phases/25-parsing-intake-quality/25-RESEARCH.md:L64 | neighbors=[Phase 25: Parsing & Intake Quality — Re…]
- "25_parsing_intake_quality_25_research_assumptions_log": "Assumptions Log" | kind=entity | source=.planning/phases/25-parsing-intake-quality/25-RESEARCH.md:L531 | neighbors=[Phase 25: Parsing & Intake Quality — Re…]
- "25_parsing_intake_quality_25_research_claude_s_discretion": "Claude's Discretion" | kind=entity | source=.planning/phases/25-parsing-intake-quality/25-RESEARCH.md:L20 | neighbors=[User Constraints (from CONTEXT.md)]
- "25_parsing_intake_quality_25_research_core_already_in_codebase_no_new_installs_needed": "Core (already in codebase — no new installs needed)" | kind=entity | source=.planning/phases/25-parsing-intake-quality/25-RESEARCH.md:L83 | neighbors=[Standard Stack]
- "25_parsing_intake_quality_25_research_deferred_ideas_out_of_scope": "Deferred Ideas (OUT OF SCOPE)" | kind=entity | source=.planning/phases/25-parsing-intake-quality/25-RESEARCH.md:L29 | neighbors=[User Constraints (from CONTEXT.md)]
- "25_parsing_intake_quality_25_research_don_t_hand_roll": "Don't Hand-Roll" | kind=entity | source=.planning/phases/25-parsing-intake-quality/25-RESEARCH.md:L278 | neighbors=[Phase 25: Parsing & Intake Quality — Re…]
- "25_parsing_intake_quality_25_research_enrichfromlaphamdb_two_lookup_strategies": "enrichFromLaphamDb — Two Lookup Strategies" | kind=entity | source=.planning/phases/25-parsing-intake-quality/25-RESEARCH.md:L337 | neighbors=[Current Parsing Audit — Code.js]
- "25_parsing_intake_quality_25_research_environment_availability": "Environment Availability" | kind=entity | source=.planning/phases/25-parsing-intake-quality/25-RESEARCH.md:L567 | neighbors=[Phase 25: Parsing & Intake Quality — Re…]
- "25_parsing_intake_quality_25_research_known_gaps_in_current_implementation_from_code_audit": "Known Gaps in Current Implementation (from code audit)" | kind=entity | source=.planning/phases/25-parsing-intake-quality/25-RESEARCH.md:L321 | neighbors=[Current Parsing Audit — Code.js]
- "25_parsing_intake_quality_25_research_known_threat_patterns": "Known Threat Patterns" | kind=entity | source=.planning/phases/25-parsing-intake-quality/25-RESEARCH.md:L639 | neighbors=[Security Domain]
- "25_parsing_intake_quality_25_research_locked_decisions": "Locked Decisions" | kind=entity | source=.planning/phases/25-parsing-intake-quality/25-RESEARCH.md:L12 | neighbors=[User Constraints (from CONTEXT.md)]
- "25_parsing_intake_quality_25_research_metadata": "Metadata" | kind=entity | source=.planning/phases/25-parsing-intake-quality/25-RESEARCH.md:L676 | neighbors=[Phase 25: Parsing & Intake Quality — Re…]
- "25_parsing_intake_quality_25_research_new_external_api": "New External API" | kind=entity | source=.planning/phases/25-parsing-intake-quality/25-RESEARCH.md:L92 | neighbors=[Standard Stack]
- "25_parsing_intake_quality_25_research_no_new_npm_packages_required": "No New npm Packages Required" | kind=entity | source=.planning/phases/25-parsing-intake-quality/25-RESEARCH.md:L98 | neighbors=[Standard Stack]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\PTOW\1_APT_Central_Command\.graphify\description-instructions\batch-094.json

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
