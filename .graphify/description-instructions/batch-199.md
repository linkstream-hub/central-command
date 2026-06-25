# Node Description Batch 200 of 412

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

- "docs_claw_code_cc_integration_6_automated_browser_test_worker": "6. 🧪 Automated Browser Test Worker" | kind=entity | source=docs/CLAW_CODE_CC_INTEGRATION.md:L96 | neighbors=[THE 10 STRATEGIC USES OF CLAW-CODE FOR …] | lang=en
- "docs_claw_code_cc_integration_7_morning_intelligence_brief_worker": "7. 📊 Morning Intelligence Brief Worker" | kind=entity | source=docs/CLAW_CODE_CC_INTEGRATION.md:L109 | neighbors=[THE 10 STRATEGIC USES OF CLAW-CODE FOR …] | lang=en
- "docs_claw_code_cc_integration_8_compliance_alert_escalation_worker": "8. 🔁 Compliance Alert Escalation Worker" | kind=entity | source=docs/CLAW_CODE_CC_INTEGRATION.md:L122 | neighbors=[THE 10 STRATEGIC USES OF CLAW-CODE FOR …] | lang=en
- "docs_claw_code_cc_integration_9_stale_spec_archive_worker": "9. 📁 Stale Spec Archive Worker" | kind=entity | source=docs/CLAW_CODE_CC_INTEGRATION.md:L134 | neighbors=[THE 10 STRATEGIC USES OF CLAW-CODE FOR …] | lang=en
- "docs_claw_code_cc_integration_central_command_claw_code_army_expert_integration_brief": "Central Command × Claw-Code Army: Expert Integration Brief" | kind=entity | source=docs/CLAW_CODE_CC_INTEGRATION.md:L2 | neighbors=[CLAW_CODE_CC_INTEGRATION.md] | lang=en
- "docs_claw_code_cc_integration_core_premise_the_factory_model": "CORE PREMISE: THE FACTORY MODEL" | kind=entity | source=docs/CLAW_CODE_CC_INTEGRATION.md:L21 | neighbors=[Authored: April 26, 2026 | For Claude r…] | lang=en
- "docs_claw_code_cc_integration_cross_project_generalization": "CROSS-PROJECT GENERALIZATION" | kind=entity | source=docs/CLAW_CODE_CC_INTEGRATION.md:L190 | neighbors=[Authored: April 26, 2026 | For Claude r…] | lang=en
- "docs_claw_code_cc_integration_the_railway_deployment_map_for_cc_workers": "THE RAILWAY DEPLOYMENT MAP FOR CC WORKERS" | kind=entity | source=docs/CLAW_CODE_CC_INTEGRATION.md:L159 | neighbors=[Authored: April 26, 2026 | For Claude r…] | lang=en
- "docs_claw_code_cc_integration_what_claude_needs_to_review_before_engaging": "WHAT CLAUDE NEEDS TO REVIEW BEFORE ENGAGING" | kind=entity | source=docs/CLAW_CODE_CC_INTEGRATION.md:L7 | neighbors=[Authored: April 26, 2026 | For Claude r…] | lang=en
- "docs_claw_code_cc_integration_what_claude_needs_to_sign_off_on": "WHAT CLAUDE NEEDS TO SIGN OFF ON" | kind=entity | source=docs/CLAW_CODE_CC_INTEGRATION.md:L178 | neighbors=[Authored: April 26, 2026 | For Claude r…] | lang=en
- "docs_design_reference_anchors_component_audit_checklist": "COMPONENT AUDIT CHECKLIST" | kind=entity | source=docs/DESIGN_REFERENCE_ANCHORS.md:L130 | neighbors=["Does this look at home next to these?"…] | lang=en
- "docs_design_reference_anchors_concrete_ui_anchors_for_antigravity_checked_before_building_any_new_component": "Concrete UI anchors for Antigravity — checked before building any new component." | kind=entity | source=docs/DESIGN_REFERENCE_ANCHORS.md:L2 | neighbors=[DESIGN_REFERENCE_ANCHORS.md] | lang=en
- "docs_design_reference_anchors_specific_patterns_to_copy_exactly": "Specific patterns to copy exactly" | kind=entity | source=docs/DESIGN_REFERENCE_ANCHORS.md:L17 | neighbors=[LINEAR — linear.app] | lang=en
- "docs_design_reference_anchors_these_are_the_specific_pages_and_ui_states_to_open_and_compare_against": "These are the specific pages and UI states to open and compare against." | kind=entity | source=docs/DESIGN_REFERENCE_ANCHORS.md:L3 | neighbors=[DESIGN_REFERENCE_ANCHORS.md] | lang=en
- "docs_design_reference_anchors_what_to_study_when_the_time_comes": "What to study when the time comes" | kind=entity | source=docs/DESIGN_REFERENCE_ANCHORS.md:L123 | neighbors=[LIVEBLOCKS — liveblocks.io] | lang=en
- "docs_design_reference_anchors_when_to_use": "When to use" | kind=entity | source=docs/DESIGN_REFERENCE_ANCHORS.md:L118 | neighbors=[LIVEBLOCKS — liveblocks.io] | lang=en
- "docs_dispatch_guide": "DISPATCH_GUIDE.md" | kind=entity | source=docs/DISPATCH_GUIDE.md:L1 | neighbors=[Central Command 2.0 — Dispatcher Guide] | lang=en
- "docs_dispatch_guide_1_coordination": "1. COORDINATION" | kind=entity | source=docs/DISPATCH_GUIDE.md:L69 | neighbors=[Inside a Job — The Detail Panel] | lang=en
- "docs_dispatch_guide_2_dispatch": "2. DISPATCH" | kind=entity | source=docs/DISPATCH_GUIDE.md:L80 | neighbors=[Inside a Job — The Detail Panel] | lang=en
- "docs_dispatch_guide_3_execution": "3. EXECUTION" | kind=entity | source=docs/DISPATCH_GUIDE.md:L93 | neighbors=[Inside a Job — The Detail Panel] | lang=en
- "docs_dispatch_guide_4_post_job": "4. POST-JOB" | kind=entity | source=docs/DISPATCH_GUIDE.md:L105 | neighbors=[Inside a Job — The Detail Panel] | lang=en
- "docs_dispatch_guide_a_job_gets_bigger_on_site": "A job gets bigger on-site" | kind=entity | source=docs/DISPATCH_GUIDE.md:L222 | neighbors=[Common Workflows — Step by Step] | lang=pt
- "docs_dispatch_guide_a_new_job_comes_in": "A new job comes in" | kind=entity | source=docs/DISPATCH_GUIDE.md:L207 | neighbors=[Common Workflows — Step by Step] | lang=en
- "docs_dispatch_guide_archiving_a_job": "Archiving a job" | kind=entity | source=docs/DISPATCH_GUIDE.md:L230 | neighbors=[Common Workflows — Step by Step] | lang=pt
- "docs_dispatch_guide_how_to_get_in": "How to Get In" | kind=entity | source=docs/DISPATCH_GUIDE.md:L16 | neighbors=[Central Command 2.0 — Dispatcher Guide] | lang=en
- "docs_dispatch_guide_quick_tips": "Quick Tips" | kind=entity | source=docs/DISPATCH_GUIDE.md:L239 | neighbors=[Central Command 2.0 — Dispatcher Guide] | lang=en
- "docs_dispatch_guide_scheduling_a_job": "Scheduling a job" | kind=entity | source=docs/DISPATCH_GUIDE.md:L214 | neighbors=[Common Workflows — Step by Step] | lang=pt
- "docs_dispatch_guide_suggest_techs_the_smart_matching_tool": "Suggest Techs — The Smart Matching Tool" | kind=entity | source=docs/DISPATCH_GUIDE.md:L110 | neighbors=[Central Command 2.0 — Dispatcher Guide] | lang=en
- "docs_dispatch_guide_testing_the_tech_app_we_need_your_help": "Testing the Tech App — We Need Your Help" | kind=entity | source=docs/DISPATCH_GUIDE.md:L170 | neighbors=[Central Command 2.0 — Dispatcher Guide] | lang=en
- "docs_dispatch_guide_the_job_cards_what_you_re_looking_at": "The Job Cards — What You're Looking At" | kind=entity | source=docs/DISPATCH_GUIDE.md:L49 | neighbors=[Central Command 2.0 — Dispatcher Guide] | lang=en
- "docs_dispatch_guide_the_job_queue_your_main_screen": "The Job Queue — Your Main Screen" | kind=entity | source=docs/DISPATCH_GUIDE.md:L26 | neighbors=[Central Command 2.0 — Dispatcher Guide] | lang=en
- "docs_dispatch_guide_the_live_tech_panel_where_are_my_techs_right_now": "The Live Tech Panel — Where Are My Techs Right Now?" | kind=entity | source=docs/DISPATCH_GUIDE.md:L122 | neighbors=[Central Command 2.0 — Dispatcher Guide] | lang=en
- "docs_dispatch_guide_the_scheduling_grid": "The Scheduling Grid" | kind=entity | source=docs/DISPATCH_GUIDE.md:L137 | neighbors=[Central Command 2.0 — Dispatcher Guide] | lang=en
- "docs_dispatch_guide_the_tech_mobile_app_how_it_connects_to_your_work": "The Tech Mobile App — How It Connects to Your Work" | kind=entity | source=docs/DISPATCH_GUIDE.md:L151 | neighbors=[Central Command 2.0 — Dispatcher Guide] | lang=en
- "docs_dispatch_guide_what_is_central_command_2_0": "What Is Central Command 2.0?" | kind=entity | source=docs/DISPATCH_GUIDE.md:L6 | neighbors=[Central Command 2.0 — Dispatcher Guide] | lang=en
- "docs_dispatch_guide_why_this_system_gets_smarter_over_time": "Why This System Gets Smarter Over Time" | kind=entity | source=docs/DISPATCH_GUIDE.md:L185 | neighbors=[Central Command 2.0 — Dispatcher Guide] | lang=en
- "docs_dispatch_guide_your_feedback_matters_use_the_feedback_panel": "Your Feedback Matters — Use the Feedback Panel" | kind=entity | source=docs/DISPATCH_GUIDE.md:L249 | neighbors=[Central Command 2.0 — Dispatcher Guide] | lang=en
- "docs_domain_architecture_1_lead_intake_parsing_qualification": "1. LEAD INTAKE (Parsing & Qualification)" | kind=entity | source=docs/DOMAIN_ARCHITECTURE.md:L40 | neighbors=[BOUNDED CONTEXTS — THE NINE DOMAINS] | lang=en
- "docs_domain_architecture_2_work_order_management": "2. WORK ORDER MANAGEMENT" | kind=entity | source=docs/DOMAIN_ARCHITECTURE.md:L68 | neighbors=[BOUNDED CONTEXTS — THE NINE DOMAINS] | lang=en
- "docs_domain_architecture_3_field_operations": "3. FIELD OPERATIONS" | kind=entity | source=docs/DOMAIN_ARCHITECTURE.md:L100 | neighbors=[BOUNDED CONTEXTS — THE NINE DOMAINS] | lang=en

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\PTOW\1_APT_Central_Command\.graphify\description-instructions\batch-199.json

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
