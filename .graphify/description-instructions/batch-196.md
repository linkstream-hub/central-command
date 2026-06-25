# Node Description Batch 197 of 412

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

- "dispatch_block_4_job_det_39bd6_techs_panel_returns_results_mobile_error_context_error_details": "Error details" | kind=entity | source=tech-pwa/test-results/dispatch-Block-4-—-Job-Det-39bd6-Techs-panel-returns-results-mobile/error-context.md:L12 | neighbors=[error-context.md] | lang=en
- "dispatch_block_4_job_det_39bd6_techs_panel_returns_results_mobile_error_context_instructions": "Instructions" | kind=entity | source=tech-pwa/test-results/dispatch-Block-4-—-Job-Det-39bd6-Techs-panel-returns-results-mobile/error-context.md:L1 | neighbors=[error-context.md] | lang=en
- "dispatch_block_4_job_det_39bd6_techs_panel_returns_results_mobile_error_context_test_info": "Test info" | kind=entity | source=tech-pwa/test-results/dispatch-Block-4-—-Job-Det-39bd6-Techs-panel-returns-results-mobile/error-context.md:L7 | neighbors=[error-context.md] | lang=en
- "dispatch_block_4_job_det_a0e19_address_description_rm_name_chromium_error_context_error_details": "Error details" | kind=entity | source=tech-pwa/test-results/dispatch-Block-4-—-Job-Det-a0e19-address-description-RM-name-chromium/error-context.md:L12 | neighbors=[error-context.md] | lang=en
- "dispatch_block_4_job_det_a0e19_address_description_rm_name_chromium_error_context_instructions": "Instructions" | kind=entity | source=tech-pwa/test-results/dispatch-Block-4-—-Job-Det-a0e19-address-description-RM-name-chromium/error-context.md:L1 | neighbors=[error-context.md] | lang=en
- "dispatch_block_4_job_det_a0e19_address_description_rm_name_chromium_error_context_page_snapshot": "Page snapshot" | kind=entity | source=tech-pwa/test-results/dispatch-Block-4-—-Job-Det-a0e19-address-description-RM-name-chromium/error-context.md:L24 | neighbors=[error-context.md] | lang=en
- "dispatch_block_4_job_det_a0e19_address_description_rm_name_chromium_error_context_test_info": "Test info" | kind=entity | source=tech-pwa/test-results/dispatch-Block-4-—-Job-Det-a0e19-address-description-RM-name-chromium/error-context.md:L7 | neighbors=[error-context.md] | lang=en
- "dispatch_block_4_job_det_a0e19_address_description_rm_name_chromium_error_context_test_source": "Test source" | kind=entity | source=tech-pwa/test-results/dispatch-Block-4-—-Job-Det-a0e19-address-description-RM-name-chromium/error-context.md:L56 | neighbors=[error-context.md] | lang=en
- "dispatch_block_4_job_det_a0e19_address_description_rm_name_mobile_error_context_error_details": "Error details" | kind=entity | source=tech-pwa/test-results/dispatch-Block-4-—-Job-Det-a0e19-address-description-RM-name-mobile/error-context.md:L12 | neighbors=[error-context.md] | lang=en
- "dispatch_block_4_job_det_a0e19_address_description_rm_name_mobile_error_context_instructions": "Instructions" | kind=entity | source=tech-pwa/test-results/dispatch-Block-4-—-Job-Det-a0e19-address-description-RM-name-mobile/error-context.md:L1 | neighbors=[error-context.md] | lang=en
- "dispatch_block_4_job_det_a0e19_address_description_rm_name_mobile_error_context_test_info": "Test info" | kind=entity | source=tech-pwa/test-results/dispatch-Block-4-—-Job-Det-a0e19-address-description-RM-name-mobile/error-context.md:L7 | neighbors=[error-context.md] | lang=en
- "docs_apt_compliance_hr_blueprint": "APT_COMPLIANCE_HR_BLUEPRINT.md" | kind=entity | source=docs/APT_COMPLIANCE_HR_BLUEPRINT.md:L1 | neighbors=[APT WAGE, HOUR & PAGA COMPLIANCE BLUEPR…] | lang=en
- "docs_apt_compliance_hr_blueprint_1_feha_disability_medical_accommodation_workflow": "1. FEHA Disability/Medical Accommodation Workflow" | kind=entity | source=docs/APT_COMPLIANCE_HR_BLUEPRINT.md:L44 | neighbors=[PART 2: SYSTEMATIC HR WORKFLOWS] | lang=en
- "docs_apt_compliance_hr_blueprint_1_termination_timing_logic_lc_203": "1. Termination Timing Logic (LC § 203)" | kind=entity | source=docs/APT_COMPLIANCE_HR_BLUEPRINT.md:L67 | neighbors=[PART 3: SEPARATION AND FINAL PAY] | lang=en
- "docs_apt_compliance_hr_blueprint_1_timekeeping_break_automation": "1. Timekeeping & Break Automation" | kind=entity | source=docs/APT_COMPLIANCE_HR_BLUEPRINT.md:L11 | neighbors=[PART 1: WAGE, HOUR & PAGA AUTOMATED GUA…] | lang=en
- "docs_apt_compliance_hr_blueprint_2_harassment_discrimination_investigation_tracker": "2. Harassment/Discrimination Investigation Tracker" | kind=entity | source=docs/APT_COMPLIANCE_HR_BLUEPRINT.md:L52 | neighbors=[PART 2: SYSTEMATIC HR WORKFLOWS] | lang=en
- "docs_apt_compliance_hr_blueprint_2_the_regular_rate_of_pay_rrop_engine": "2. The Regular Rate of Pay (RROP) Engine" | kind=entity | source=docs/APT_COMPLIANCE_HR_BLUEPRINT.md:L20 | neighbors=[PART 1: WAGE, HOUR & PAGA AUTOMATED GUA…] | lang=en
- "docs_apt_compliance_hr_blueprint_3_itemized_wage_statement_paystub_generator_lc_226": "3. Itemized Wage Statement (Paystub) Generator (LC § 226)" | kind=entity | source=docs/APT_COMPLIANCE_HR_BLUEPRINT.md:L25 | neighbors=[PART 1: WAGE, HOUR & PAGA AUTOMATED GUA…] | lang=en
- "docs_apt_compliance_hr_blueprint_3_leave_stacking_logic": "3. Leave Stacking Logic" | kind=entity | source=docs/APT_COMPLIANCE_HR_BLUEPRINT.md:L58 | neighbors=[PART 2: SYSTEMATIC HR WORKFLOWS] | lang=en
- "docs_apt_compliance_hr_blueprint_4_paga_defense_15_penalty_cap_ab_2288": "4. PAGA Defense & 15% Penalty Cap (AB 2288)" | kind=entity | source=docs/APT_COMPLIANCE_HR_BLUEPRINT.md:L36 | neighbors=[PART 1: WAGE, HOUR & PAGA AUTOMATED GUA…] | lang=en
- "docs_apt_strategic_integration_roadmap": "APT_STRATEGIC_INTEGRATION_ROADMAP.md" | kind=entity | source=docs/APT_STRATEGIC_INTEGRATION_ROADMAP.md:L1 | neighbors=[APT Strategic Integration Roadmap] | lang=en
- "docs_apt_strategic_integration_roadmap_1_the_context": "1. The Context" | kind=entity | source=docs/APT_STRATEGIC_INTEGRATION_ROADMAP.md:L6 | neighbors=[APT Strategic Integration Roadmap] | lang=en
- "docs_apt_strategic_integration_roadmap_3_guiding_principles_for_1_apt_central_command": "3. Guiding Principles for 1_APT_Central_Command" | kind=entity | source=docs/APT_STRATEGIC_INTEGRATION_ROADMAP.md:L21 | neighbors=[APT Strategic Integration Roadmap] | lang=en
- "docs_apt_strategic_integration_roadmap_4_next_integration_milestone": "4. Next Integration Milestone" | kind=entity | source=docs/APT_STRATEGIC_INTEGRATION_ROADMAP.md:L28 | neighbors=[APT Strategic Integration Roadmap] | lang=en
- "docs_apt_strategic_integration_roadmap_ai_implementation_agents": "AI Implementation Agents" | kind=entity | source=docs/APT_STRATEGIC_INTEGRATION_ROADMAP.md:L18 | neighbors=[2. Resource Availability] | lang=en
- "docs_apt_strategic_integration_roadmap_core_infrastructure_a_ptow_4_double_great_project_35": "Core Infrastructure (A:\\PTOW\\4_Double_Great_Project_35\\)" | kind=entity | source=docs/APT_STRATEGIC_INTEGRATION_ROADMAP.md:L12 | neighbors=[2. Resource Availability] | lang=pt
- "docs_architecture": "ARCHITECTURE.md" | kind=entity | source=docs/ARCHITECTURE.md:L1 | neighbors=[APT CENTRAL COMMAND — ARCHITECTURE] | lang=en
- "docs_architecture_1_lead_intake": "1. Lead Intake" | kind=entity | source=docs/ARCHITECTURE.md:L187 | neighbors=[Bounded Contexts] | lang=en
- "docs_architecture_2_work_order_management": "2. Work Order Management" | kind=entity | source=docs/ARCHITECTURE.md:L195 | neighbors=[Bounded Contexts] | lang=en
- "docs_architecture_3_field_operations": "3. Field Operations" | kind=entity | source=docs/ARCHITECTURE.md:L199 | neighbors=[Bounded Contexts] | lang=en
- "docs_architecture_4_communications": "4. Communications" | kind=entity | source=docs/ARCHITECTURE.md:L203 | neighbors=[Bounded Contexts] | lang=en
- "docs_architecture_5_workforce": "5. Workforce" | kind=entity | source=docs/ARCHITECTURE.md:L215 | neighbors=[Bounded Contexts] | lang=en
- "docs_architecture_6_compliance_paga_core_domain": "6. Compliance / PAGA (Core Domain)" | kind=entity | source=docs/ARCHITECTURE.md:L224 | neighbors=[Bounded Contexts] | lang=en
- "docs_architecture_7_property_client_directory": "7. Property / Client Directory" | kind=entity | source=docs/ARCHITECTURE.md:L242 | neighbors=[Bounded Contexts] | lang=en
- "docs_architecture_8_financial": "8. Financial" | kind=entity | source=docs/ARCHITECTURE.md:L246 | neighbors=[Bounded Contexts] | lang=en
- "docs_architecture_9_intelligence_analytics": "9. Intelligence / Analytics" | kind=entity | source=docs/ARCHITECTURE.md:L250 | neighbors=[Bounded Contexts] | lang=en
- "docs_architecture_adr_index": "ADR Index" | kind=entity | source=docs/ARCHITECTURE.md:L381 | neighbors=[APT CENTRAL COMMAND — ARCHITECTURE] | lang=en
- "docs_architecture_architecture_gradient": "Architecture Gradient" | kind=entity | source=docs/ARCHITECTURE.md:L340 | neighbors=[APT CENTRAL COMMAND — ARCHITECTURE] | lang=en
- "docs_architecture_authentication_adr_001": "Authentication (ADR-001)" | kind=entity | source=docs/ARCHITECTURE.md:L101 | neighbors=[APT CENTRAL COMMAND — ARCHITECTURE] | lang=en
- "docs_architecture_component_diagram": "Component Diagram" | kind=entity | source=docs/ARCHITECTURE.md:L18 | neighbors=[APT CENTRAL COMMAND — ARCHITECTURE] | lang=en

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\PTOW\1_APT_Central_Command\.graphify\description-instructions\batch-196.json

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
