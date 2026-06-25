# Node Description Batch 371 of 412

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

- "specs_phase3_p3_4_spec_post_api_field_shift_end": "POST /api/field/shift/end" | kind=entity | source=specs/PHASE3_P3_4_SPEC.md:L213 | neighbors=[ROUTE SPECIFICATIONS]
- "specs_phase3_p3_4_spec_post_api_field_shift_start": "POST /api/field/shift/start" | kind=entity | source=specs/PHASE3_P3_4_SPEC.md:L195 | neighbors=[ROUTE SPECIFICATIONS]
- "specs_phase3_p3_4_spec_post_api_field_shift_status": "POST /api/field/shift/status" | kind=entity | source=specs/PHASE3_P3_4_SPEC.md:L232 | neighbors=[ROUTE SPECIFICATIONS]
- "specs_phase3_p3_4_spec_task_1_branch_verify": "Task 1 — Branch verify" | kind=entity | source=specs/PHASE3_P3_4_SPEC.md:L413 | neighbors=[NUMBERED TASK LIST]
- "specs_phase3_p3_4_spec_task_10_write_api_field_job_complete_route_ts": "Task 10 — Write `/api/field/job/complete/route.ts`" | kind=entity | source=specs/PHASE3_P3_4_SPEC.md:L519 | neighbors=[NUMBERED TASK LIST]
- "specs_phase3_p3_4_spec_task_11_write_api_field_attestation_sign_route_ts": "Task 11 — Write `/api/field/attestation/sign/route.ts`" | kind=entity | source=specs/PHASE3_P3_4_SPEC.md:L526 | neighbors=[NUMBERED TASK LIST]
- "specs_phase3_p3_4_spec_task_12_update_frontend_files": "Task 12 — Update frontend files" | kind=entity | source=specs/PHASE3_P3_4_SPEC.md:L537 | neighbors=[NUMBERED TASK LIST]
- "specs_phase3_p3_4_spec_task_13_tsc_zero_errors_playwright_e2e": "Task 13 — tsc zero errors + Playwright E2E" | kind=entity | source=specs/PHASE3_P3_4_SPEC.md:L551 | neighbors=[NUMBERED TASK LIST]
- "specs_phase3_p3_4_spec_task_14_tsc_diff_push_terminal_n_2": "Task 14 — tsc + diff + push (terminal N-2)" | kind=entity | source=specs/PHASE3_P3_4_SPEC.md:L577 | neighbors=[NUMBERED TASK LIST]
- "specs_phase3_p3_4_spec_task_15_test_sprint_terminal_n_1_separate_session": "Task 15 — Test sprint (terminal N-1, separate session)" | kind=entity | source=specs/PHASE3_P3_4_SPEC.md:L619 | neighbors=[NUMBERED TASK LIST]
- "specs_phase3_p3_4_spec_task_16_merge_terminal_n": "Task 16 — Merge (terminal N)" | kind=entity | source=specs/PHASE3_P3_4_SPEC.md:L673 | neighbors=[NUMBERED TASK LIST]
- "specs_phase3_p3_4_spec_task_2_add_n8n_compliance_webhook_url_to_env_local": "Task 2 — Add N8N_COMPLIANCE_WEBHOOK_URL to .env.local" | kind=entity | source=specs/PHASE3_P3_4_SPEC.md:L434 | neighbors=[NUMBERED TASK LIST]
- "specs_phase3_p3_4_spec_task_3_audit_grep_before_touching_any_frontend_file": "Task 3 audit — grep BEFORE touching any frontend file:" | kind=entity | source=specs/PHASE3_P3_4_SPEC.md:L391 | neighbors=[FRONTEND UPDATE PROTOCOL]
- "specs_phase3_p3_4_spec_task_3_frontend_audit_mandatory_before_any_code_change": "Task 3 — Frontend audit (MANDATORY before any code change)" | kind=entity | source=specs/PHASE3_P3_4_SPEC.md:L448 | neighbors=[NUMBERED TASK LIST]
- "specs_phase3_p3_4_spec_task_4_write_tech_pwa_src_lib_fieldauth_ts": "Task 4 — Write `tech-pwa/src/lib/fieldAuth.ts`" | kind=entity | source=specs/PHASE3_P3_4_SPEC.md:L461 | neighbors=[NUMBERED TASK LIST]
- "specs_phase3_p3_4_spec_task_5_write_api_field_auth_login_route_ts": "Task 5 — Write `/api/field/auth/login/route.ts`" | kind=entity | source=specs/PHASE3_P3_4_SPEC.md:L468 | neighbors=[NUMBERED TASK LIST]
- "specs_phase3_p3_4_spec_task_6_write_api_field_jobs_route_ts": "Task 6 — Write `/api/field/jobs/route.ts`" | kind=entity | source=specs/PHASE3_P3_4_SPEC.md:L480 | neighbors=[NUMBERED TASK LIST]
- "specs_phase3_p3_4_spec_task_7_write_shift_routes_3_files": "Task 7 — Write shift routes (3 files)" | kind=entity | source=specs/PHASE3_P3_4_SPEC.md:L489 | neighbors=[NUMBERED TASK LIST]
- "specs_phase3_p3_4_spec_task_8_write_clock_routes_2_files": "Task 8 — Write clock routes (2 files)" | kind=entity | source=specs/PHASE3_P3_4_SPEC.md:L500 | neighbors=[NUMBERED TASK LIST]
- "specs_phase3_p3_4_spec_task_9_write_break_routes_2_files": "Task 9 — Write break routes (2 files)" | kind=entity | source=specs/PHASE3_P3_4_SPEC.md:L509 | neighbors=[NUMBERED TASK LIST]
- "specs_phase3_schema_spec_accrual_rules_pto_accrual_config_replaces_appsheet_tom_accrualrules_tab": "`accrual_rules` — PTO accrual config (replaces AppSheet TOM AccrualRules tab)" | kind=entity | source=specs/PHASE3_SCHEMA_SPEC.md:L279 | neighbors=[DOMAIN 3: WORKFORCE]
- "specs_phase3_schema_spec_attestations_separate_attestation_audit_trail_replaces_embedded_fields_in_time_records": "`attestations` — Separate attestation audit trail (replaces embedded fields in …" | kind=entity | source=specs/PHASE3_SCHEMA_SPEC.md:L362 | neighbors=[DOMAIN 4: COMPLIANCE / PAGA]
- "specs_phase3_schema_spec_breaks_multi_break_support_ca_law_requires_tracking_all_breaks": "`breaks` — Multi-break support (CA law requires tracking all breaks)" | kind=entity | source=specs/PHASE3_SCHEMA_SPEC.md:L311 | neighbors=[DOMAIN 2: FIELD OPERATIONS]
- "specs_phase3_schema_spec_clients_pm_companies_and_property_owners": "`clients` — PM companies and property owners" | kind=entity | source=specs/PHASE3_SCHEMA_SPEC.md:L115 | neighbors=[DOMAIN 6: PROPERTY / CLIENT]
- "specs_phase3_schema_spec_comms_messages_add_org_id": "`comms_messages` — ADD `org_id`" | kind=entity | source=specs/PHASE3_SCHEMA_SPEC.md:L41 | neighbors=[EXISTING TABLES — CHANGES ONLY]
- "specs_phase3_schema_spec_complete_multi_tenant_schema_for_all_six_domains": "Complete multi-tenant schema for all six domains." | kind=entity | source=specs/PHASE3_SCHEMA_SPEC.md:L2 | neighbors=[PHASE3_SCHEMA_SPEC.md]
- "specs_phase3_schema_spec_compliance_alerts_add_org_id_add_employee_id": "`compliance_alerts` — ADD `org_id`, ADD `employee_id`" | kind=entity | source=specs/PHASE3_SCHEMA_SPEC.md:L69 | neighbors=[EXISTING TABLES — CHANGES ONLY]
- "specs_phase3_schema_spec_dispatcher_feedback_replaces_dispatcher_feedback_sheets_tab": "`dispatcher_feedback` — Replaces Dispatcher Feedback Sheets tab" | kind=entity | source=specs/PHASE3_SCHEMA_SPEC.md:L417 | neighbors=[DOMAIN 1: WORK ORDER MANAGEMENT]
- "specs_phase3_schema_spec_employees_unified_people_table_replaces_techs_neon_table_staff_roster_sheets_tab": "`employees` — Unified people table (replaces `techs` Neon table + Staff Roster …" | kind=entity | source=specs/PHASE3_SCHEMA_SPEC.md:L191 | neighbors=[DOMAIN 3: WORKFORCE]
- "specs_phase3_schema_spec_entity_id_org_id": "Entity ID → Org ID" | kind=entity | source=specs/PHASE3_SCHEMA_SPEC.md:L530 | neighbors=[MIGRATION STRATEGY]
- "specs_phase3_schema_spec_existing_data_compatibility": "Existing data compatibility" | kind=entity | source=specs/PHASE3_SCHEMA_SPEC.md:L536 | neighbors=[MIGRATION STRATEGY]
- "specs_phase3_schema_spec_ground_rules": "GROUND RULES" | kind=entity | source=specs/PHASE3_SCHEMA_SPEC.md:L26 | neighbors=[Last updated: 2026-05-25 (Session 97 co…]
- "specs_phase3_schema_spec_historical_assignments_tech_scoring_history_replaces_historical_assignments_sheets_tab": "`historical_assignments` — Tech scoring history (replaces Historical Assignment…" | kind=entity | source=specs/PHASE3_SCHEMA_SPEC.md:L401 | neighbors=[DOMAIN 1: WORK ORDER MANAGEMENT]
- "specs_phase3_schema_spec_index_strategy": "Index strategy" | kind=entity | source=specs/PHASE3_SCHEMA_SPEC.md:L541 | neighbors=[MIGRATION STRATEGY]
- "specs_phase3_schema_spec_inventory_items_wholesale_materials_tracking_replaces_inventory_sheet": "`inventory_items` — Wholesale materials tracking (replaces Inventory sheet)" | kind=entity | source=specs/PHASE3_SCHEMA_SPEC.md:L325 | neighbors=[DOMAIN 2: FIELD OPERATIONS]
- "specs_phase3_schema_spec_inventory_transactions_replaces_transaction_logs_sheet": "`inventory_transactions` — Replaces Transaction Logs sheet" | kind=entity | source=specs/PHASE3_SCHEMA_SPEC.md:L344 | neighbors=[DOMAIN 2: FIELD OPERATIONS]
- "specs_phase3_schema_spec_invoice_line_items_billing_placeholder": "`invoice_line_items` — Billing placeholder" | kind=entity | source=specs/PHASE3_SCHEMA_SPEC.md:L475 | neighbors=[DOMAIN 5: FINANCIAL (placeholders — not…]
- "specs_phase3_schema_spec_invoices_billing_placeholder": "`invoices` — Billing placeholder" | kind=entity | source=specs/PHASE3_SCHEMA_SPEC.md:L458 | neighbors=[DOMAIN 5: FINANCIAL (placeholders — not…]
- "specs_phase3_schema_spec_job_comments_add_org_id": "`job_comments` — ADD `org_id`" | kind=entity | source=specs/PHASE3_SCHEMA_SPEC.md:L65 | neighbors=[EXISTING TABLES — CHANGES ONLY]
- "specs_phase3_schema_spec_job_costs_job_costing_line_items": "`job_costs` — Job costing line items" | kind=entity | source=specs/PHASE3_SCHEMA_SPEC.md:L445 | neighbors=[DOMAIN 5: FINANCIAL (placeholders — not…]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\PTOW\1_APT_Central_Command\.graphify\description-instructions\batch-370.json

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
