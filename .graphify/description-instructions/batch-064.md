# Node Description Batch 65 of 412

Graphify is running in assistant/skill mode (no API key). You are the host
assistant (Claude Code / Codex / Gemini CLI). Read the prompt below and write
your JSON answer to the answer file.

## Prompt

You are documenting nodes in a knowledge graph.
For each entry below, write ONE concise factual plain-language sentence
describing what it is or does. Use only the provided context.
For a code symbol (kind=code-symbol — a function, class, or constant),
describe what the function/symbol does based on its name, source location
and neighbors — e.g. "Resolves the configured ontology profile from graphify.yaml.".
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

- "design_extract_output_dispatch_aptmaintenanceinc_com_design_language_transitions_animations": "Transitions & Animations" | kind=entity | source=design-extract-output/dispatch-aptmaintenanceinc-com-design-language.md:L310 | neighbors=[Design Language: APT Central Command, Common Transitions, Keyframe Animations] | lang=en
- "dispatch_block_2_summary_11e52_ble_and_filter_the_job_list_mobile_error_context": "error-context.md" | kind=entity | source=tech-pwa/test-results/dispatch-Block-2-—-Summary-11e52-ble-and-filter-the-job-list-mobile/error-context.md:L1 | neighbors=[Error details, Instructions, Test info] | lang=en
- "dispatch_block_2_summary_33efa_2_pte_pending_card_renders_mobile_error_context": "error-context.md" | kind=entity | source=tech-pwa/test-results/dispatch-Block-2-—-Summary-33efa--2-PTE-Pending-card-renders-mobile/error-context.md:L1 | neighbors=[Error details, Instructions, Test info] | lang=en
- "dispatch_block_2_summary_7653e_card_renders_non_zero_count_mobile_error_context": "error-context.md" | kind=entity | source=tech-pwa/test-results/dispatch-Block-2-—-Summary-7653e-card-renders-non-zero-count-mobile/error-context.md:L1 | neighbors=[Error details, Instructions, Test info] | lang=en
- "dispatch_block_3_coordin_66311_rity_badge_address_category_mobile_error_context": "error-context.md" | kind=entity | source=tech-pwa/test-results/dispatch-Block-3-—-Coordin-66311-rity-badge-address-category-mobile/error-context.md:L1 | neighbors=[Error details, Instructions, Test info] | lang=en
- "dispatch_block_3_coordin_75c29_shows_apt_3001_and_apt_3002_mobile_error_context": "error-context.md" | kind=entity | source=tech-pwa/test-results/dispatch-Block-3-—-Coordin-75c29-shows-APT-3001-and-APT-3002-mobile/error-context.md:L1 | neighbors=[Error details, Instructions, Test info] | lang=en
- "dispatch_block_3_coordin_8fd4c_shows_apt_3003_and_apt_3004_mobile_error_context": "error-context.md" | kind=entity | source=tech-pwa/test-results/dispatch-Block-3-—-Coordin-8fd4c-shows-APT-3003-and-APT-3004-mobile/error-context.md:L1 | neighbors=[Error details, Instructions, Test info] | lang=en
- "dispatch_block_3_coordin_aa983_filters_job_list_by_address_mobile_error_context": "error-context.md" | kind=entity | source=tech-pwa/test-results/dispatch-Block-3-—-Coordin-aa983-filters-job-list-by-address-mobile/error-context.md:L1 | neighbors=[Error details, Instructions, Test info] | lang=en
- "dispatch_block_4_job_det_31919_job_card_opens_detail_modal_mobile_error_context": "error-context.md" | kind=entity | source=tech-pwa/test-results/dispatch-Block-4-—-Job-Det-31919-job-card-opens-detail-modal-mobile/error-context.md:L1 | neighbors=[Error details, Instructions, Test info] | lang=en
- "dispatch_block_4_job_det_39bd6_techs_panel_returns_results_mobile_error_context": "error-context.md" | kind=entity | source=tech-pwa/test-results/dispatch-Block-4-—-Job-Det-39bd6-Techs-panel-returns-results-mobile/error-context.md:L1 | neighbors=[Error details, Instructions, Test info] | lang=en
- "dispatch_block_4_job_det_a0e19_address_description_rm_name_mobile_error_context": "error-context.md" | kind=entity | source=tech-pwa/test-results/dispatch-Block-4-—-Job-Det-a0e19-address-description-RM-name-mobile/error-context.md:L1 | neighbors=[Error details, Instructions, Test info] | lang=en
- "docs_apt_strategic_integration_roadmap_2_resource_availability": "2. Resource Availability" | kind=entity | source=docs/APT_STRATEGIC_INTEGRATION_ROADMAP.md:L9 | neighbors=[AI Implementation Agents, Core Infrastructure (A:\PTOW\4_Double_G…, APT Strategic Integration Roadmap] | lang=en
- "docs_design_reference_anchors": "DESIGN_REFERENCE_ANCHORS.md" | kind=entity | source=docs/DESIGN_REFERENCE_ANCHORS.md:L1 | neighbors=[Concrete UI anchors for Antigravity — c…, "Does this look at home next to these?"…, These are the specific pages and UI sta…] | lang=en
- "docs_design_reference_anchors_fey_fey_com": "FEY — fey.com" | kind=entity | source=docs/DESIGN_REFERENCE_ANCHORS.md:L44 | neighbors=["Does this look at home next to these?"…, Pages to open, Specific patterns to copy] | lang=pt
- "docs_design_reference_anchors_height_app_height_app": "HEIGHT.APP — height.app" | kind=entity | source=docs/DESIGN_REFERENCE_ANCHORS.md:L92 | neighbors=["Does this look at home next to these?"…, Pages to open, Specific patterns to copy] | lang=en
- "docs_design_reference_anchors_linear_linear_app": "LINEAR — linear.app" | kind=entity | source=docs/DESIGN_REFERENCE_ANCHORS.md:L8 | neighbors=["Does this look at home next to these?"…, Pages to open, Specific patterns to copy exactly] | lang=en
- "docs_design_reference_anchors_liveblocks_liveblocks_io": "LIVEBLOCKS — liveblocks.io" | kind=entity | source=docs/DESIGN_REFERENCE_ANCHORS.md:L115 | neighbors=["Does this look at home next to these?"…, What to study when the time comes, When to use] | lang=en
- "docs_design_reference_anchors_raycast_raycast_com": "RAYCAST — raycast.com" | kind=entity | source=docs/DESIGN_REFERENCE_ANCHORS.md:L70 | neighbors=["Does this look at home next to these?"…, Pages to open, Specific patterns to copy] | lang=pt
- "docs_design_reference_anchors_vercel_dashboard_vercel_com_dashboard": "VERCEL DASHBOARD — vercel.com/dashboard" | kind=entity | source=docs/DESIGN_REFERENCE_ANCHORS.md:L28 | neighbors=["Does this look at home next to these?"…, Pages to open, Specific patterns to copy] | lang=pt
- "docs_gas_migration_scope_assumptions_and_open_questions": "Assumptions and Open Questions" | kind=entity | source=docs/GAS_MIGRATION_SCOPE.md:L446 | neighbors=[Assumptions Log, Open Questions, GAS Migration Scope] | lang=en
- "docs_operator_guide_6_your_complete_technical_role": "6. YOUR COMPLETE TECHNICAL ROLE" | kind=entity | source=docs/OPERATOR_GUIDE.md:L131 | neighbors=[Decision-making, Typing secrets into web dashboards (you…, Last Updated: S137 (2026-06-04)] | lang=en
- "docs_org_named_staff_roster_for_operational_reference_role_based_permission_mapping_is_in_architecture_md": "Named staff roster for operational reference. Role-based permission mapping is …" | kind=entity | source=docs/ORG.md:L2 | neighbors=[ORG.md, KEITH'S RANK / TRADE KEYS, STAFF ROSTER] | lang=en
- "docs_professional_baseline_dimension_1_ci_cd": "DIMENSION 1 — CI/CD" | kind=entity | source=docs/PROFESSIONAL_BASELINE.md:L22 | neighbors=[Current State, Gaps, Last updated: 2026-05-18] | lang=en
- "docs_professional_baseline_dimension_2_observability": "DIMENSION 2 — OBSERVABILITY" | kind=entity | source=docs/PROFESSIONAL_BASELINE.md:L53 | neighbors=[Current State, Gaps, Last updated: 2026-05-18] | lang=en
- "docs_professional_baseline_dimension_4_deployment_safety": "DIMENSION 4 — DEPLOYMENT SAFETY" | kind=entity | source=docs/PROFESSIONAL_BASELINE.md:L120 | neighbors=[Current State, Gaps, Last updated: 2026-05-18] | lang=en
- "docs_professional_baseline_dimension_5_secret_management": "DIMENSION 5 — SECRET MANAGEMENT" | kind=entity | source=docs/PROFESSIONAL_BASELINE.md:L145 | neighbors=[Current State, Gaps, Last updated: 2026-05-18] | lang=en
- "docs_professional_baseline_dimension_6_documentation_currency": "DIMENSION 6 — DOCUMENTATION CURRENCY" | kind=entity | source=docs/PROFESSIONAL_BASELINE.md:L172 | neighbors=[Current State, Gaps, Last updated: 2026-05-18] | lang=en
- "docs_professional_baseline_dimension_7_dependency_hygiene": "DIMENSION 7 — DEPENDENCY HYGIENE" | kind=entity | source=docs/PROFESSIONAL_BASELINE.md:L199 | neighbors=[Current State, Gaps, Last updated: 2026-05-18] | lang=en
- "docs_professional_baseline_dimension_8_incident_response": "DIMENSION 8 — INCIDENT RESPONSE" | kind=entity | source=docs/PROFESSIONAL_BASELINE.md:L220 | neighbors=[Current State, Gaps, Last updated: 2026-05-18] | lang=en
- "docs_roadmap_phase_2_operational_excellence": "PHASE 2 — OPERATIONAL EXCELLENCE" | kind=entity | source=docs/ROADMAP.md:L50 | neighbors=[Last Updated: S137 (2026-06-04), Definition of Done, Tasks] | lang=en
- "docs_roadmap_phase_3_client_experience": "PHASE 3 — CLIENT EXPERIENCE" | kind=entity | source=docs/ROADMAP.md:L77 | neighbors=[Last Updated: S137 (2026-06-04), Definition of Done, Tasks] | lang=en
- "docs_roadmap_phase_4_business_operations": "PHASE 4 — BUSINESS OPERATIONS" | kind=entity | source=docs/ROADMAP.md:L101 | neighbors=[Last Updated: S137 (2026-06-04), Definition of Done, Tasks] | lang=en
- "docs_roadmap_phase_5_platform_saas": "PHASE 5 — PLATFORM (SAAS)" | kind=entity | source=docs/ROADMAP.md:L125 | neighbors=[Last Updated: S137 (2026-06-04), Definition of Done, Tasks] | lang=en
- "docs_runbook": "RUNBOOK.md" | kind=entity | source=docs/RUNBOOK.md:L1 | neighbors=[CENTRAL COMMAND — INCIDENT RUNBOOK, Last updated: 2026-05-19, What to do when something breaks. Writt…] | lang=en
- "docs_shadow_writes": "SHADOW_WRITES.md" | kind=entity | source=docs/SHADOW_WRITES.md:L1 | neighbors=[Generated: 2026-05-31 | Foundation Mile…, Shadow-Writes Inventory, Updated: 2026-06-01 | Phase 14 Cut-Over…] | lang=en
- "docs_sheets_schema": "SHEETS_SCHEMA.md" | kind=entity | source=docs/SHEETS_SCHEMA.md:L1 | neighbors=[Derived from Code.js and DashboardAPI.g…, Google Sheets Schema Reference, Role-based terminology used throughout …] | lang=en
- "drizzle_0002_noisy_shinko_yamashiro": "0002_noisy_shinko_yamashiro.sql" | kind=code-symbol | source=tech-pwa/drizzle/0002_noisy_shinko_yamashiro.sql:L1 | neighbors=[01bf641 Initial commit — clean history, c6162cc feat(sprint6b): tenant response…, compliance_alerts] | lang=en
- "drizzle_0004_normalize_job_status_names": "0004_normalize_job_status_names.sql" | kind=code-symbol | source=tech-pwa/drizzle/0004_normalize_job_status_names.sql:L1 | neighbors=[01bf641 Initial commit — clean history, 37a172f feat(s115): dispatch flow lockd…, bfb635a Merge pull request #1304 from B…] | lang=en
- "drizzle_0006_glossy_puck": "0006_glossy_puck.sql" | kind=code-symbol | source=tech-pwa/drizzle/0006_glossy_puck.sql:L1 | neighbors=[01bf641 Initial commit — clean history, 48540a0 feat(schedule): lock-and-send A…, 7c1b6fa feat(schedule): Wave 2b Lock an…] | lang=en
- "error_handling_skill_python": "Python" | kind=entity | source=.github/skills/ecc/error-handling/SKILL.md:L206 | neighbors=[Error Handling Patterns, Custom Exception Hierarchy, FastAPI Global Exception Handler] | lang=en

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\PTOW\1_APT_Central_Command\.graphify\description-instructions\batch-064.json

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
