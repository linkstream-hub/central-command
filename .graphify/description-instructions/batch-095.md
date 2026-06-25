# Node Description Batch 96 of 412

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

- "25_parsing_intake_quality_25_research_open_questions_resolved": "Open Questions (RESOLVED)" | kind=entity | source=.planning/phases/25-parsing-intake-quality/25-RESEARCH.md:L543 | neighbors=[Phase 25: Parsing & Intake Quality — Re…]
- "25_parsing_intake_quality_25_research_orchestrator_verification_addendum_2026_06_10": "Orchestrator Verification Addendum (2026-06-10)" | kind=entity | source=.planning/phases/25-parsing-intake-quality/25-RESEARCH.md:L691 | neighbors=[Phase 25: Parsing & Intake Quality — Re…]
- "25_parsing_intake_quality_25_research_package_legitimacy_audit": "Package Legitimacy Audit" | kind=entity | source=.planning/phases/25-parsing-intake-quality/25-RESEARCH.md:L104 | neighbors=[Phase 25: Parsing & Intake Quality — Re…]
- "25_parsing_intake_quality_25_research_parsing_quality_eval_discretion_recommended": "Parsing Quality Eval (Discretion — Recommended)" | kind=entity | source=.planning/phases/25-parsing-intake-quality/25-RESEARCH.md:L611 | neighbors=[Validation Architecture]
- "25_parsing_intake_quality_25_research_pattern_1_access_info_reconciliation_two_way_sync": "Pattern 1: Access Info Reconciliation (two-way sync)" | kind=entity | source=.planning/phases/25-parsing-intake-quality/25-RESEARCH.md:L170 | neighbors=[Architecture Patterns]
- "25_parsing_intake_quality_25_research_pattern_2_normalizeaddresskey_parity_n8n_code_node": "Pattern 2: normalizeAddressKey parity (n8n Code node)" | kind=entity | source=.planning/phases/25-parsing-intake-quality/25-RESEARCH.md:L192 | neighbors=[Architecture Patterns]
- "25_parsing_intake_quality_25_research_pattern_3_lapham_form_detection_n8n_code_node_port_of_detectlaphamform": "Pattern 3: Lapham Form Detection (n8n Code node — port of detectLaphamForm)" | kind=entity | source=.planning/phases/25-parsing-intake-quality/25-RESEARCH.md:L219 | neighbors=[Architecture Patterns]
- "25_parsing_intake_quality_25_research_pattern_4_requester_auto_reply_resend_dev_guard": "Pattern 4: Requester Auto-Reply (Resend + dev guard)" | kind=entity | source=.planning/phases/25-parsing-intake-quality/25-RESEARCH.md:L230 | neighbors=[Architecture Patterns]
- "25_parsing_intake_quality_25_research_pattern_5_openphone_sms_n8n_http_request_node": "Pattern 5: OpenPhone SMS (n8n HTTP Request node)" | kind=entity | source=.planning/phases/25-parsing-intake-quality/25-RESEARCH.md:L247 | neighbors=[Architecture Patterns]
- "25_parsing_intake_quality_25_research_phase_requirements": "Phase Requirements" | kind=entity | source=.planning/phases/25-parsing-intake-quality/25-RESEARCH.md:L37 | neighbors=[Phase 25: Parsing & Intake Quality — Re…]
- "25_parsing_intake_quality_25_research_phase_requirements_test_map": "Phase Requirements → Test Map" | kind=entity | source=.planning/phases/25-parsing-intake-quality/25-RESEARCH.md:L599 | neighbors=[Validation Architecture]
- "25_parsing_intake_quality_25_research_pitfall_1_activating_n8n_workflow_before_disabling_gas_trigger": "Pitfall 1: Activating n8n workflow before disabling GAS trigger" | kind=entity | source=.planning/phases/25-parsing-intake-quality/25-RESEARCH.md:L364 | neighbors=[Common Pitfalls]
- "25_parsing_intake_quality_25_research_pitfall_2_phone_number_normalization_for_openphone": "Pitfall 2: Phone number normalization for OpenPhone" | kind=entity | source=.planning/phases/25-parsing-intake-quality/25-RESEARCH.md:L370 | neighbors=[Common Pitfalls]
- "25_parsing_intake_quality_25_research_pitfall_3_two_line_regex_regression_for_lapham_forwarded_forms": "Pitfall 3: Two-line regex regression for Lapham forwarded forms" | kind=entity | source=.planning/phases/25-parsing-intake-quality/25-RESEARCH.md:L376 | neighbors=[Common Pitfalls]
- "25_parsing_intake_quality_25_research_pitfall_4_access_info_overwrite_instead_of_merge": "Pitfall 4: Access info overwrite instead of merge" | kind=entity | source=.planning/phases/25-parsing-intake-quality/25-RESEARCH.md:L382 | neighbors=[Common Pitfalls]
- "25_parsing_intake_quality_25_research_pitfall_5_sending_tenant_sms_for_turnover_inspection_jobs": "Pitfall 5: Sending tenant SMS for turnover/inspection jobs" | kind=entity | source=.planning/phases/25-parsing-intake-quality/25-RESEARCH.md:L388 | neighbors=[Common Pitfalls]
- "25_parsing_intake_quality_25_research_pitfall_6_auto_reply_to_apt_internal_senders": "Pitfall 6: Auto-reply to APT Internal senders" | kind=entity | source=.planning/phases/25-parsing-intake-quality/25-RESEARCH.md:L394 | neighbors=[Common Pitfalls]
- "25_parsing_intake_quality_25_research_pitfall_7_properties_table_not_populated_neon": "Pitfall 7: Properties table not populated (Neon)" | kind=entity | source=.planning/phases/25-parsing-intake-quality/25-RESEARCH.md:L400 | neighbors=[Common Pitfalls]
- "25_parsing_intake_quality_25_research_pitfall_8_header_name_mismatch_on_dashboard_api_key": "Pitfall 8: Header name mismatch on DASHBOARD_API_KEY" | kind=entity | source=.planning/phases/25-parsing-intake-quality/25-RESEARCH.md:L406 | neighbors=[Common Pitfalls]
- "25_parsing_intake_quality_25_research_primary_high_confidence": "Primary (HIGH confidence)" | kind=entity | source=.planning/phases/25-parsing-intake-quality/25-RESEARCH.md:L653 | neighbors=[Sources]
- "25_parsing_intake_quality_25_research_recommended_project_structure_for_new_code": "Recommended Project Structure for New Code" | kind=entity | source=.planning/phases/25-parsing-intake-quality/25-RESEARCH.md:L160 | neighbors=[Architecture Patterns]
- "25_parsing_intake_quality_25_research_runtime_state_inventory": "Runtime State Inventory" | kind=entity | source=.planning/phases/25-parsing-intake-quality/25-RESEARCH.md:L346 | neighbors=[Phase 25: Parsing & Intake Quality — Re…]
- "25_parsing_intake_quality_25_research_secondary_medium_confidence": "Secondary (MEDIUM confidence)" | kind=entity | source=.planning/phases/25-parsing-intake-quality/25-RESEARCH.md:L662 | neighbors=[Sources]
- "25_parsing_intake_quality_25_research_shouldskipemail_preserved_exactly": "shouldSkipEmail — Preserved Exactly" | kind=entity | source=.planning/phases/25-parsing-intake-quality/25-RESEARCH.md:L333 | neighbors=[Current Parsing Audit — Code.js]
- "25_parsing_intake_quality_25_research_state_of_the_art": "State of the Art" | kind=entity | source=.planning/phases/25-parsing-intake-quality/25-RESEARCH.md:L514 | neighbors=[Phase 25: Parsing & Intake Quality — Re…]
- "25_parsing_intake_quality_25_research_summary": "Summary" | kind=entity | source=.planning/phases/25-parsing-intake-quality/25-RESEARCH.md:L52 | neighbors=[Phase 25: Parsing & Intake Quality — Re…]
- "25_parsing_intake_quality_25_research_system_architecture_diagram": "System Architecture Diagram" | kind=entity | source=.planning/phases/25-parsing-intake-quality/25-RESEARCH.md:L120 | neighbors=[Architecture Patterns]
- "25_parsing_intake_quality_25_research_tertiary_low_confidence": "Tertiary (LOW confidence)" | kind=entity | source=.planning/phases/25-parsing-intake-quality/25-RESEARCH.md:L670 | neighbors=[Sources]
- "25_parsing_intake_quality_25_research_test_framework": "Test Framework" | kind=entity | source=.planning/phases/25-parsing-intake-quality/25-RESEARCH.md:L590 | neighbors=[Validation Architecture]
- "25_parsing_intake_quality_25_research_verified_pattern_access_sync_route_shape": "Verified Pattern: Access Sync Route Shape" | kind=entity | source=.planning/phases/25-parsing-intake-quality/25-RESEARCH.md:L415 | neighbors=[Code Examples]
- "25_parsing_intake_quality_25_research_verified_pattern_openphone_sms_via_n8n_http_request_node": "Verified Pattern: OpenPhone SMS via n8n HTTP Request node" | kind=entity | source=.planning/phases/25-parsing-intake-quality/25-RESEARCH.md:L480 | neighbors=[Code Examples]
- "25_parsing_intake_quality_25_research_verified_pattern_phone_normalization_n8n_code_node": "Verified Pattern: Phone Normalization (n8n Code node)" | kind=entity | source=.planning/phases/25-parsing-intake-quality/25-RESEARCH.md:L499 | neighbors=[Code Examples]
- "25_parsing_intake_quality_25_research_verified_pattern_resend_auto_reply_dev_guard": "Verified Pattern: Resend Auto-Reply (dev guard)" | kind=entity | source=.planning/phases/25-parsing-intake-quality/25-RESEARCH.md:L460 | neighbors=[Code Examples]
- "25_parsing_intake_quality_25_research_wave_0_gaps": "Wave 0 Gaps" | kind=entity | source=.planning/phases/25-parsing-intake-quality/25-RESEARCH.md:L615 | neighbors=[Validation Architecture]
- "25_parsing_intake_quality_25_research_what_is_extracted_today_gemini_path": "What Is Extracted Today (Gemini path)" | kind=entity | source=.planning/phases/25-parsing-intake-quality/25-RESEARCH.md:L294 | neighbors=[Current Parsing Audit — Code.js]
- "25_parsing_intake_quality_25_research_what_is_extracted_today_lapham_form_path": "What Is Extracted Today (Lapham form path)" | kind=entity | source=.planning/phases/25-parsing-intake-quality/25-RESEARCH.md:L317 | neighbors=[Current Parsing Audit — Code.js]
- "25_parsing_intake_quality_25_validation": "25-VALIDATION.md" | kind=entity | source=.planning/phases/25-parsing-intake-quality/25-VALIDATION.md:L1 | neighbors=[Phase 25 — Validation Strategy]
- "25_parsing_intake_quality_25_validation_manual_only_verifications": "Manual-Only Verifications" | kind=entity | source=.planning/phases/25-parsing-intake-quality/25-VALIDATION.md:L68 | neighbors=[Phase 25 — Validation Strategy]
- "25_parsing_intake_quality_25_validation_per_task_verification_map": "Per-Task Verification Map" | kind=entity | source=.planning/phases/25-parsing-intake-quality/25-VALIDATION.md:L37 | neighbors=[Phase 25 — Validation Strategy]
- "25_parsing_intake_quality_25_validation_sampling_rate": "Sampling Rate" | kind=entity | source=.planning/phases/25-parsing-intake-quality/25-VALIDATION.md:L28 | neighbors=[Phase 25 — Validation Strategy]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\PTOW\1_APT_Central_Command\.graphify\description-instructions\batch-095.json

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
