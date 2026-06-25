# Node Description Batch 199 of 412

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

- "docs_central_command_expansion_roadmap_dispatch_queue_caching": "Dispatch Queue Caching" | kind=entity | source=docs/CENTRAL_COMMAND_EXPANSION_ROADMAP.md:L404 | neighbors=[CC3.0 ARCHITECTURE — INFRASTRUCTURE DES…] | lang=en
- "docs_central_command_expansion_roadmap_division_of_labor": "Division of Labor" | kind=entity | source=docs/CENTRAL_COMMAND_EXPANSION_ROADMAP.md:L639 | neighbors=[TEAM PROTOCOL — PEER PAIR MODEL (Update…] | lang=en
- "docs_central_command_expansion_roadmap_employee_ownership_structure": "EMPLOYEE OWNERSHIP STRUCTURE" | kind=entity | source=docs/CENTRAL_COMMAND_EXPANSION_ROADMAP.md:L151 | neighbors=[APT ECOSYSTEM — MASTER STRATEGIC ROADMAP] | lang=en
- "docs_central_command_expansion_roadmap_entity_1_apt_maintenance_inc_california": "Entity 1 — APT Maintenance Inc. (California)" | kind=entity | source=docs/CENTRAL_COMMAND_EXPANSION_ROADMAP.md:L67 | neighbors=[ECOSYSTEM ARCHITECTURE — FOUR ENTITIES] | lang=en
- "docs_central_command_expansion_roadmap_entity_2_apt_maintenance_inc_idaho": "Entity 2 — APT Maintenance Inc. (Idaho)" | kind=entity | source=docs/CENTRAL_COMMAND_EXPANSION_ROADMAP.md:L83 | neighbors=[ECOSYSTEM ARCHITECTURE — FOUR ENTITIES] | lang=en
- "docs_central_command_expansion_roadmap_entity_3_property_management_lapham_model": "Entity 3 — Property Management (Lapham Model)" | kind=entity | source=docs/CENTRAL_COMMAND_EXPANSION_ROADMAP.md:L101 | neighbors=[ECOSYSTEM ARCHITECTURE — FOUR ENTITIES] | lang=en
- "docs_central_command_expansion_roadmap_entity_4_real_estate_acquisition": "Entity 4 — Real Estate Acquisition" | kind=entity | source=docs/CENTRAL_COMMAND_EXPANSION_ROADMAP.md:L127 | neighbors=[ECOSYSTEM ARCHITECTURE — FOUR ENTITIES] | lang=en
- "docs_central_command_expansion_roadmap_entity_5_construction_phase_5": "Entity 5 — Construction (Phase 5)" | kind=entity | source=docs/CENTRAL_COMMAND_EXPANSION_ROADMAP.md:L146 | neighbors=[ECOSYSTEM ARCHITECTURE — FOUR ENTITIES] | lang=en
- "docs_central_command_expansion_roadmap_field_documentation_before_after_photos_receipts": "Field Documentation — Before/After Photos + Receipts" | kind=entity | source=docs/CENTRAL_COMMAND_EXPANSION_ROADMAP.md:L445 | neighbors=[CC3.0 ARCHITECTURE — INFRASTRUCTURE DES…] | lang=en
- "docs_central_command_expansion_roadmap_gemini_parsing_vercel_ai_sdk_route": "Gemini Parsing → Vercel AI SDK Route" | kind=entity | source=docs/CENTRAL_COMMAND_EXPANSION_ROADMAP.md:L390 | neighbors=[CC3.0 ARCHITECTURE — INFRASTRUCTURE DES…] | lang=en
- "docs_central_command_expansion_roadmap_intelligence_layer_gaps_and_improvements": "Intelligence Layer — Gaps and Improvements" | kind=entity | source=docs/CENTRAL_COMMAND_EXPANSION_ROADMAP.md:L246 | neighbors=[BACKEND SECURITY & INFRASTRUCTURE STAND…] | lang=en
- "docs_central_command_expansion_roadmap_paga_wage_compliance_active_enforcement_architecture": "PAGA / Wage Compliance — Active Enforcement Architecture" | kind=entity | source=docs/CENTRAL_COMMAND_EXPANSION_ROADMAP.md:L420 | neighbors=[CC3.0 ARCHITECTURE — INFRASTRUCTURE DES…] | lang=en
- "docs_central_command_expansion_roadmap_pre_assignment_triage_workspace": "Pre-Assignment Triage Workspace" | kind=entity | source=docs/CENTRAL_COMMAND_EXPANSION_ROADMAP.md:L343 | neighbors=[CC3.0 ARCHITECTURE — INFRASTRUCTURE DES…] | lang=en
- "docs_central_command_expansion_roadmap_quality_gate_every_sprint": "Quality Gate — Every Sprint" | kind=entity | source=docs/CENTRAL_COMMAND_EXPANSION_ROADMAP.md:L652 | neighbors=[TEAM PROTOCOL — PEER PAIR MODEL (Update…] | lang=en
- "docs_central_command_expansion_roadmap_security_fix_next_public_dashboard_api_key": "Security Fix — NEXT_PUBLIC_DASHBOARD_API_KEY" | kind=entity | source=docs/CENTRAL_COMMAND_EXPANSION_ROADMAP.md:L414 | neighbors=[CC3.0 ARCHITECTURE — INFRASTRUCTURE DES…] | lang=en
- "docs_central_command_expansion_roadmap_security_migration_sequence": "Security Migration Sequence" | kind=entity | source=docs/CENTRAL_COMMAND_EXPANSION_ROADMAP.md:L186 | neighbors=[BACKEND SECURITY & INFRASTRUCTURE STAND…] | lang=en
- "docs_central_command_expansion_roadmap_structured_comms_log": "Structured Comms Log" | kind=entity | source=docs/CENTRAL_COMMAND_EXPANSION_ROADMAP.md:L358 | neighbors=[CC3.0 ARCHITECTURE — INFRASTRUCTURE DES…] | lang=en
- "docs_central_command_expansion_roadmap_tech_job_acceptance_loop": "Tech Job Acceptance Loop" | kind=entity | source=docs/CENTRAL_COMMAND_EXPANSION_ROADMAP.md:L492 | neighbors=[CC3.0 ARCHITECTURE — INFRASTRUCTURE DES…] | lang=en
- "docs_central_command_expansion_roadmap_tier_1_complete_what_s_started_highest_impact_per_token": "Tier 1 — Complete What's Started (Highest Impact Per Token)" | kind=entity | source=docs/CENTRAL_COMMAND_EXPANSION_ROADMAP.md:L512 | neighbors=[PRIORITY BUILD SEQUENCE] | lang=it
- "docs_central_command_expansion_roadmap_tier_2_5_professional_infrastructure_baseline_spec_written": "Tier 2.5 — Professional Infrastructure Baseline (SPEC WRITTEN)" | kind=entity | source=docs/CENTRAL_COMMAND_EXPANSION_ROADMAP.md:L531 | neighbors=[PRIORITY BUILD SEQUENCE] | lang=en
- "docs_central_command_expansion_roadmap_tier_2_6_time_off_manager_migration_spec_pending": "Tier 2.6 — Time Off Manager Migration (SPEC PENDING)" | kind=entity | source=docs/CENTRAL_COMMAND_EXPANSION_ROADMAP.md:L541 | neighbors=[PRIORITY BUILD SEQUENCE] | lang=en
- "docs_central_command_expansion_roadmap_tier_2_close_infrastructure_gaps_cc3_0_foundation": "Tier 2 — Close Infrastructure Gaps + CC3.0 Foundation" | kind=entity | source=docs/CENTRAL_COMMAND_EXPANSION_ROADMAP.md:L520 | neighbors=[PRIORITY BUILD SEQUENCE] | lang=en
- "docs_central_command_expansion_roadmap_tier_3_deepen_core_platform": "Tier 3 — Deepen Core Platform" | kind=entity | source=docs/CENTRAL_COMMAND_EXPANSION_ROADMAP.md:L591 | neighbors=[PRIORITY BUILD SEQUENCE] | lang=en
- "docs_central_command_expansion_roadmap_tier_4_external_expansion": "Tier 4 — External Expansion" | kind=entity | source=docs/CENTRAL_COMMAND_EXPANSION_ROADMAP.md:L608 | neighbors=[PRIORITY BUILD SEQUENCE] | lang=en
- "docs_central_command_expansion_roadmap_tier_5_new_entities": "Tier 5 — New Entities" | kind=entity | source=docs/CENTRAL_COMMAND_EXPANSION_ROADMAP.md:L618 | neighbors=[PRIORITY BUILD SEQUENCE] | lang=en
- "docs_central_command_expansion_roadmap_tier_6_saas_infrastructure": "Tier 6 — SaaS Infrastructure" | kind=entity | source=docs/CENTRAL_COMMAND_EXPANSION_ROADMAP.md:L625 | neighbors=[PRIORITY BUILD SEQUENCE] | lang=en
- "docs_central_command_expansion_roadmap_untapped_tools_activation_plan": "UNTAPPED TOOLS — ACTIVATION PLAN" | kind=entity | source=docs/CENTRAL_COMMAND_EXPANSION_ROADMAP.md:L263 | neighbors=[APT ECOSYSTEM — MASTER STRATEGIC ROADMAP] | lang=en
- "docs_central_command_expansion_roadmap_what_claude_code_never_delegates": "What Claude Code Never Delegates" | kind=entity | source=docs/CENTRAL_COMMAND_EXPANSION_ROADMAP.md:L663 | neighbors=[TEAM PROTOCOL — PEER PAIR MODEL (Update…] | lang=en
- "docs_central_command_expansion_roadmap_wo_intake_dual_path_email_primary_form_parallel": "WO Intake: Dual-Path (Email Primary, Form Parallel)" | kind=entity | source=docs/CENTRAL_COMMAND_EXPANSION_ROADMAP.md:L320 | neighbors=[CC3.0 ARCHITECTURE — INFRASTRUCTURE DES…] | lang=en
- "docs_cf_worker_dashboardapi_update": "CF_WORKER_DASHBOARDAPI_UPDATE.md" | kind=entity | source=docs/CF_WORKER_DASHBOARDAPI_UPDATE.md:L1 | neighbors=[CF Worker — DashboardAPI URL Update] | lang=en
- "docs_cf_worker_dashboardapi_update_ag_does_not_access_cloudflare": "AG Does NOT Access Cloudflare" | kind=entity | source=docs/CF_WORKER_DASHBOARDAPI_UPDATE.md:L26 | neighbors=[CF Worker — DashboardAPI URL Update] | lang=en
- "docs_cf_worker_dashboardapi_update_change_required_brandon_cloudflare_dashboard": "Change Required (Brandon — Cloudflare Dashboard)" | kind=entity | source=docs/CF_WORKER_DASHBOARDAPI_UPDATE.md:L8 | neighbors=[CF Worker — DashboardAPI URL Update] | lang=en
- "docs_cf_worker_dashboardapi_update_context": "Context" | kind=entity | source=docs/CF_WORKER_DASHBOARDAPI_UPDATE.md:L3 | neighbors=[CF Worker — DashboardAPI URL Update] | lang=en
- "docs_cf_worker_dashboardapi_update_why_this_is_safe": "Why This Is Safe" | kind=entity | source=docs/CF_WORKER_DASHBOARDAPI_UPDATE.md:L19 | neighbors=[CF Worker — DashboardAPI URL Update] | lang=en
- "docs_claw_code_cc_integration_1_pre_sprint_freshness_verification_worker": "1. 🔄 Pre-Sprint \"Freshness Verification\" Worker" | kind=entity | source=docs/CLAW_CODE_CC_INTEGRATION.md:L33 | neighbors=[THE 10 STRATEGIC USES OF CLAW-CODE FOR …] | lang=en
- "docs_claw_code_cc_integration_10_sprint_execution_agent_the_full_replacement_path": "10. 🤖 Sprint Execution Agent (The \"Full Replacement\" Path)" | kind=entity | source=docs/CLAW_CODE_CC_INTEGRATION.md:L146 | neighbors=[THE 10 STRATEGIC USES OF CLAW-CODE FOR …] | lang=en
- "docs_claw_code_cc_integration_2_post_sprint_typescript_guardian": "2. ✅ Post-Sprint TypeScript Guardian" | kind=entity | source=docs/CLAW_CODE_CC_INTEGRATION.md:L45 | neighbors=[THE 10 STRATEGIC USES OF CLAW-CODE FOR …] | lang=en
- "docs_claw_code_cc_integration_3_design_reference_compliance_checker": "3. 🎨 Design Reference Compliance Checker" | kind=entity | source=docs/CLAW_CODE_CC_INTEGRATION.md:L58 | neighbors=[THE 10 STRATEGIC USES OF CLAW-CODE FOR …] | lang=en
- "docs_claw_code_cc_integration_4_security_sentinel_paga_compliance_guard": "4. 🔒 Security Sentinel (PAGA Compliance Guard)" | kind=entity | source=docs/CLAW_CODE_CC_INTEGRATION.md:L71 | neighbors=[THE 10 STRATEGIC USES OF CLAW-CODE FOR …] | lang=en
- "docs_claw_code_cc_integration_5_spec_drift_detector": "5. 📋 Spec Drift Detector" | kind=entity | source=docs/CLAW_CODE_CC_INTEGRATION.md:L84 | neighbors=[THE 10 STRATEGIC USES OF CLAW-CODE FOR …] | lang=en

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\PTOW\1_APT_Central_Command\.graphify\description-instructions\batch-198.json

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
