# Node Description Batch 372 of 412

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

- "specs_phase3_schema_spec_job_performance_history_replaces_job_performance_history_sheets_tab": "`job_performance_history` — Replaces Job Performance History Sheets tab" | kind=entity | source=specs/PHASE3_SCHEMA_SPEC.md:L385 | neighbors=[DOMAIN 1: WORK ORDER MANAGEMENT] | lang=en
- "specs_phase3_schema_spec_jobs_add_org_id_add_employee_id_add_property_id": "`jobs` — ADD `org_id`, ADD `employee_id`, ADD `property_id`" | kind=entity | source=specs/PHASE3_SCHEMA_SPEC.md:L51 | neighbors=[EXISTING TABLES — CHANGES ONLY] | lang=en
- "specs_phase3_schema_spec_locked_design_decisions_2026_05_25": "LOCKED DESIGN DECISIONS (2026-05-25)" | kind=entity | source=specs/PHASE3_SCHEMA_SPEC.md:L7 | neighbors=[Last updated: 2026-05-25 (Session 97 co…] | lang=en
- "specs_phase3_schema_spec_new_contact_queue_staging_queue_replaces_new_contacts_sheets_tab": "`new_contact_queue` — Staging queue (replaces New Contacts Sheets tab)" | kind=entity | source=specs/PHASE3_SCHEMA_SPEC.md:L167 | neighbors=[DOMAIN 6: PROPERTY / CLIENT] | lang=en
- "specs_phase3_schema_spec_orgs_federated_entity_registry": "`orgs` — Federated entity registry" | kind=entity | source=specs/PHASE3_SCHEMA_SPEC.md:L82 | neighbors=[INFRASTRUCTURE] | lang=en
- "specs_phase3_schema_spec_phase_3_neon_schema_design": "PHASE 3 — NEON SCHEMA DESIGN" | kind=entity | source=specs/PHASE3_SCHEMA_SPEC.md:L1 | neighbors=[PHASE3_SCHEMA_SPEC.md] | lang=en
- "specs_phase3_schema_spec_properties_verified_property_database_replaces_master_directory_sheets_tab": "`properties` — Verified property database (replaces Master Directory Sheets tab)" | kind=entity | source=specs/PHASE3_SCHEMA_SPEC.md:L129 | neighbors=[DOMAIN 6: PROPERTY / CLIENT] | lang=en
- "specs_phase3_schema_spec_push_subscriptions_web_push_delivery_endpoints_split_from_techs_push_sub_json_blob": "`push_subscriptions` — Web push delivery endpoints (split from techs.push_sub J…" | kind=entity | source=specs/PHASE3_SCHEMA_SPEC.md:L248 | neighbors=[DOMAIN 3: WORKFORCE] | lang=en
- "specs_phase3_schema_spec_sentinel_log_railway_sentinel_write_back_replaces_sheets_tab": "`sentinel_log` — Railway Sentinel write-back (replaces Sheets tab)" | kind=entity | source=specs/PHASE3_SCHEMA_SPEC.md:L99 | neighbors=[INFRASTRUCTURE] | lang=en
- "specs_phase3_schema_spec_shifts_shift_level_tracking_new_not_in_existing_sheets_or_neon": "`shifts` — Shift-level tracking (new — not in existing Sheets or Neon)" | kind=entity | source=specs/PHASE3_SCHEMA_SPEC.md:L295 | neighbors=[DOMAIN 2: FIELD OPERATIONS] | lang=en
- "specs_phase3_schema_spec_sprint_p3_1_implements_this_schema_in_drizzle_sprints_p3_2_through_p3_5_migrate_and_rebuild_on_top_of_it": "Sprint P3-1 implements this schema in Drizzle. Sprints P3-2 through P3-5 migrat…" | kind=entity | source=specs/PHASE3_SCHEMA_SPEC.md:L4 | neighbors=[PHASE3_SCHEMA_SPEC.md] | lang=en
- "specs_phase3_schema_spec_table_inventory_summary": "TABLE INVENTORY SUMMARY" | kind=entity | source=specs/PHASE3_SCHEMA_SPEC.md:L490 | neighbors=[Last updated: 2026-05-25 (Session 97 co…] | lang=en
- "specs_phase3_schema_spec_techs_migrate_to_employees_then_drop": "`techs` — MIGRATE TO `employees`, THEN DROP" | kind=entity | source=specs/PHASE3_SCHEMA_SPEC.md:L45 | neighbors=[EXISTING TABLES — CHANGES ONLY] | lang=en
- "specs_phase3_schema_spec_tenant_contacts_tenant_info_per_property": "`tenant_contacts` — Tenant info per property" | kind=entity | source=specs/PHASE3_SCHEMA_SPEC.md:L151 | neighbors=[DOMAIN 6: PROPERTY / CLIENT] | lang=it
- "specs_phase3_schema_spec_this_is_the_foundation_document_nothing_gets_built_until_this_is_reviewed_and_approved": "This is the foundation document — nothing gets built until this is reviewed and…" | kind=entity | source=specs/PHASE3_SCHEMA_SPEC.md:L3 | neighbors=[PHASE3_SCHEMA_SPEC.md] | lang=en
- "specs_phase3_schema_spec_time_off_requests_replaces_appsheet_tom_timeoffrequests_tab": "`time_off_requests` — Replaces AppSheet TOM TimeOffRequests tab" | kind=entity | source=specs/PHASE3_SCHEMA_SPEC.md:L263 | neighbors=[DOMAIN 3: WORKFORCE] | lang=en
- "specs_phase3_schema_spec_time_records_add_org_id_add_shift_id_add_employee_id": "`time_records` — ADD `org_id`, ADD `shift_id`, ADD `employee_id`" | kind=entity | source=specs/PHASE3_SCHEMA_SPEC.md:L58 | neighbors=[EXISTING TABLES — CHANGES ONLY] | lang=en
- "specs_phase3_schema_spec_trade_duration_defaults_replaces_trade_duration_defaults_sheets_tab": "`trade_duration_defaults` — Replaces Trade Duration Defaults Sheets tab" | kind=entity | source=specs/PHASE3_SCHEMA_SPEC.md:L429 | neighbors=[DOMAIN 1: WORK ORDER MANAGEMENT] | lang=en
- "specs_phase3_sprint_plan_after_phase_3": "AFTER PHASE 3" | kind=entity | source=specs/PHASE3_SPRINT_PLAN.md:L192 | neighbors=[Last updated: 2026-05-21 (Session 97)] | lang=en
- "specs_phase3_sprint_plan_dependencies_and_sequence": "DEPENDENCIES AND SEQUENCE" | kind=entity | source=specs/PHASE3_SPRINT_PLAN.md:L170 | neighbors=[Last updated: 2026-05-21 (Session 97)] | lang=en
- "specs_phase3_sprint_plan_foundation_rebuild_google_sheets_neon_postgres": "Foundation rebuild: Google Sheets → Neon Postgres" | kind=entity | source=specs/PHASE3_SPRINT_PLAN.md:L2 | neighbors=[PHASE3_SPRINT_PLAN.md] | lang=en
- "specs_phase3_sprint_plan_guiding_principle": "GUIDING PRINCIPLE" | kind=entity | source=specs/PHASE3_SPRINT_PLAN.md:L8 | neighbors=[Last updated: 2026-05-21 (Session 97)] | lang=en
- "specs_phase3_sprint_plan_p3_1_schema_foundation": "P3-1: SCHEMA FOUNDATION" | kind=entity | source=specs/PHASE3_SPRINT_PLAN.md:L30 | neighbors=[Last updated: 2026-05-21 (Session 97)] | lang=en
- "specs_phase3_sprint_plan_p3_2_time_records_migration": "P3-2: TIME RECORDS MIGRATION" | kind=entity | source=specs/PHASE3_SPRINT_PLAN.md:L48 | neighbors=[Last updated: 2026-05-21 (Session 97)] | lang=en
- "specs_phase3_sprint_plan_p3_3_dispatch_queue_master_directory_migration": "P3-3: DISPATCH QUEUE + MASTER DIRECTORY MIGRATION" | kind=entity | source=specs/PHASE3_SPRINT_PLAN.md:L73 | neighbors=[Last updated: 2026-05-21 (Session 97)] | lang=en
- "specs_phase3_sprint_plan_p3_4_techpwa_gs_next_js_api_routes": "P3-4: TECHPWA.GS → NEXT.JS API ROUTES" | kind=entity | source=specs/PHASE3_SPRINT_PLAN.md:L101 | neighbors=[Last updated: 2026-05-21 (Session 97)] | lang=en
- "specs_phase3_sprint_plan_p3_5_gas_bridge_only_cutover": "P3-5: GAS BRIDGE-ONLY CUTOVER" | kind=entity | source=specs/PHASE3_SPRINT_PLAN.md:L141 | neighbors=[Last updated: 2026-05-21 (Session 97)] | lang=en
- "specs_phase3_sprint_plan_phase_3_sprint_plan": "PHASE 3 — SPRINT PLAN" | kind=entity | source=specs/PHASE3_SPRINT_PLAN.md:L1 | neighbors=[PHASE3_SPRINT_PLAN.md] | lang=en
- "specs_phase3_sprint_plan_schema_specs_phase3_schema_spec_md": "Schema: specs/PHASE3_SCHEMA_SPEC.md" | kind=entity | source=specs/PHASE3_SPRINT_PLAN.md:L3 | neighbors=[PHASE3_SPRINT_PLAN.md] | lang=en
- "specs_phase3_sprint_plan_sprint_overview": "SPRINT OVERVIEW" | kind=entity | source=specs/PHASE3_SPRINT_PLAN.md:L18 | neighbors=[Last updated: 2026-05-21 (Session 97)] | lang=en
- "specs_phase3_sprint_plan_what_does_not_change_in_phase_3": "WHAT DOES NOT CHANGE IN PHASE 3" | kind=entity | source=specs/PHASE3_SPRINT_PLAN.md:L182 | neighbors=[Last updated: 2026-05-21 (Session 97)] | lang=en
- "specs_schedule_view_spec": "SCHEDULE_VIEW_SPEC.md" | kind=entity | source=specs/SCHEDULE_VIEW_SPEC.md:L1 | neighbors=[SPEC — SCHEDULE VIEW RESTRUCTURE (Sched…] | lang=en
- "specs_schedule_view_spec_behavior_rules": "Behavior rules:" | kind=entity | source=specs/SCHEDULE_VIEW_SPEC.md:L97 | neighbors=[CHANGE 3 — Tech picker redesign in `Sch…] | lang=en
- "specs_schedule_view_spec_change_1_add_field_status_techavailabilitypanel_to_schedule_page_tsx": "CHANGE 1 — Add Field Status (TechAvailabilityPanel) to `schedule/page.tsx`" | kind=entity | source=specs/SCHEDULE_VIEW_SPEC.md:L46 | neighbors=[SPEC — SCHEDULE VIEW RESTRUCTURE (Sched…] | lang=en
- "specs_schedule_view_spec_change_2_rts_backlog_panel_in_schedule_page_tsx": "CHANGE 2 — RtS Backlog Panel in `schedule/page.tsx`" | kind=entity | source=specs/SCHEDULE_VIEW_SPEC.md:L58 | neighbors=[SPEC — SCHEDULE VIEW RESTRUCTURE (Sched…] | lang=en
- "specs_schedule_view_spec_change_5_viewcontext_schedule_on_jobdetailmodal_in_schedule_page_tsx": "CHANGE 5 — `viewContext=\"schedule\"` on JobDetailModal in `schedule/page.tsx`" | kind=entity | source=specs/SCHEDULE_VIEW_SPEC.md:L153 | neighbors=[SPEC — SCHEDULE VIEW RESTRUCTURE (Sched…] | lang=en
- "specs_schedule_view_spec_change_6_rescheduling_is_always_editable": "CHANGE 6 — Rescheduling is always editable" | kind=entity | source=specs/SCHEDULE_VIEW_SPEC.md:L174 | neighbors=[SPEC — SCHEDULE VIEW RESTRUCTURE (Sched…] | lang=en
- "specs_schedule_view_spec_constraint_contradiction_detector": "CONSTRAINT — CONTRADICTION DETECTOR" | kind=entity | source=specs/SCHEDULE_VIEW_SPEC.md:L30 | neighbors=[SPEC — SCHEDULE VIEW RESTRUCTURE (Sched…] | lang=en
- "specs_schedule_view_spec_do_not_touch": "DO NOT TOUCH" | kind=entity | source=specs/SCHEDULE_VIEW_SPEC.md:L185 | neighbors=[SPEC — SCHEDULE VIEW RESTRUCTURE (Sched…] | lang=pt
- "specs_schedule_view_spec_downstream_read_normalization": "Downstream read normalization:" | kind=entity | source=specs/SCHEDULE_VIEW_SPEC.md:L139 | neighbors=[CHANGE 4 — Canonical SnA write format (…] | lang=en

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\PTOW\1_APT_Central_Command\.graphify\description-instructions\batch-371.json

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
