# Node Description Batch 58 of 412

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
Write every description in English (en). Do not switch languages.
No marketing language.
Respond ONLY with a JSON object mapping each node id (as a string) to its
one-sentence description — no prose, no markdown fences.

- "25_parsing_intake_quality_25_01_plan_analog_files_to_copy_structure_from": "Analog files to copy structure from:" | kind=entity | source=.planning/phases/25-parsing-intake-quality/25-01-PLAN.md:L70 | neighbors=[25-01-PLAN.md, STRIDE Threat Register, Trust Boundaries]
- "25_parsing_intake_quality_25_02_plan_produced_this_plan_consumed_by_plan_25_03_n8n_nodes": "Produced this plan — consumed by Plan 25-03 n8n nodes:" | kind=entity | source=.planning/phases/25-parsing-intake-quality/25-02-PLAN.md:L93 | neighbors=[25-02-PLAN.md, STRIDE Threat Register, Trust Boundaries]
- "25_parsing_intake_quality_25_03_plan_commit_with_active_false": "commit with \"active\": false" | kind=entity | source=.planning/phases/25-parsing-intake-quality/25-03-PLAN.md:L103 | neighbors=[25-03-PLAN.md, STRIDE Threat Register, Trust Boundaries]
- "25_parsing_intake_quality_25_04_plan_clasp_deploy_is_manual_only_never_automate_dev_write_guard_stays_on_for_any_test_sends": "clasp deploy is MANUAL ONLY — never automate; dev write guard stays on for any …" | kind=entity | source=.planning/phases/25-parsing-intake-quality/25-04-PLAN.md:L66 | neighbors=[25-04-PLAN.md, STRIDE Threat Register, Trust Boundaries]
- "25_parsing_intake_quality_25_research_security_domain": "Security Domain" | kind=entity | source=.planning/phases/25-parsing-intake-quality/25-RESEARCH.md:L627 | neighbors=[Phase 25: Parsing & Intake Quality — Re…, Applicable ASVS Categories, Known Threat Patterns]
- "25_parsing_intake_quality_continue_here": ".continue-here.md" | kind=entity | source=.planning/phases/25-parsing-intake-quality/.continue-here.md:L1 | neighbors=[E2E Checklist for Brandon (Task 3 resum…, Infrastructure State, Required Reading (in order)]
- "27_dashboard_remainder_27_research_security_domain": "Security Domain" | kind=entity | source=.planning/phases/27-dashboard-remainder/27-RESEARCH.md:L479 | neighbors=[Phase 27: DashboardAPI Remainder Migrat…, Applicable ASVS Categories, Known Threat Patterns]
- "27_dashboard_remainder_27_research_sources": "Sources" | kind=entity | source=.planning/phases/27-dashboard-remainder/27-RESEARCH.md:L543 | neighbors=[Phase 27: DashboardAPI Remainder Migrat…, Primary (HIGH confidence), Secondary (MEDIUM confidence)]
- "28_sentinel_diet_28_research_security_domain": "Security Domain" | kind=entity | source=.planning/phases/28-sentinel-diet/28-RESEARCH.md:L377 | neighbors=[Phase 28: Sentinel Consolidation — Neon…, Applicable ASVS Categories, Known Threat Patterns]
- "28_sentinel_diet_28_research_standard_stack": "Standard Stack" | kind=entity | source=.planning/phases/28-sentinel-diet/28-RESEARCH.md:L65 | neighbors=[Phase 28: Sentinel Consolidation — Neon…, Core (all already in project — no new p…, Supporting]
- "access_sync_route_post": "POST()" | kind=code-symbol | source=tech-pwa/src/app/api/intake/access-sync/route.ts:L25 | neighbors=[route.ts, computeAccessMerge(), extractCodes()]
- "accessibility_accessibilit_15359_has_no_critical_violations_mobile_error_context": "error-context.md" | kind=entity | source=tech-pwa/test-results/accessibility-Accessibilit-15359--has-no-critical-violations-mobile/error-context.md:L1 | neighbors=[Error details, Instructions, Test info]
- "accessibility_accessibilit_30196_has_no_critical_violations_mobile_error_context": "error-context.md" | kind=entity | source=tech-pwa/test-results/accessibility-Accessibilit-30196--has-no-critical-violations-mobile/error-context.md:L1 | neighbors=[Error details, Instructions, Test info]
- "accessibility_accessibilit_9fbbd_has_no_critical_violations_mobile_error_context": "error-context.md" | kind=entity | source=tech-pwa/test-results/accessibility-Accessibilit-9fbbd--has-no-critical-violations-mobile/error-context.md:L1 | neighbors=[Error details, Instructions, Test info]
- "accessibility_accessibilit_d3ec7_has_no_critical_violations_mobile_error_context": "error-context.md" | kind=entity | source=tech-pwa/test-results/accessibility-Accessibilit-d3ec7--has-no-critical-violations-mobile/error-context.md:L1 | neighbors=[Error details, Instructions, Test info]
- "accessibility_accessibilit_e274b_has_no_critical_violations_mobile_error_context": "error-context.md" | kind=entity | source=tech-pwa/test-results/accessibility-Accessibilit-e274b--has-no-critical-violations-mobile/error-context.md:L1 | neighbors=[Error details, Instructions, Test info]
- "accessibility_accessibilit_ef671_has_no_critical_violations_mobile_error_context": "error-context.md" | kind=entity | source=tech-pwa/test-results/accessibility-Accessibilit-ef671--has-no-critical-violations-mobile/error-context.md:L1 | neighbors=[Error details, Instructions, Test info]
- "adr_001": "ADR-001 (Dual Auth Architecture)" | kind=entity | source=docs/ARCHITECTURE.md | neighbors=[Central Command 2.0, API Routes Gate, Auth Split Gate]
- "adr_readme_architecture_decision_records": "Architecture Decision Records" | kind=entity | source=docs/adr/README.md:L1 | neighbors=[README.md, Findings from Phase 1 Mapping, Format]
- "ag": "AG.md" | kind=entity | source=AG.md:L1 | neighbors=[AG's runtime reference. CLAUDE.md handl…, ANTIGRAVITY OPERATIONAL PLAYBOOK — AG.md, Updated: Session 74 — created. Typograp…]
- "agents_diff_reviewer_purpose": "Purpose" | kind=entity | source=.claude/agents/diff-reviewer.md:L9 | neighbors=[diff-reviewer.md, Instructions, Report]
- "agents_gsd_assumptions_analyzer_agent": "gsd-assumptions-analyzer.agent.md" | kind=entity | source=.github/agents/gsd-assumptions-analyzer.agent.md:L1 | neighbors=[full_maturity, minimal_decisive, standard]
- "agents_gsd_assumptions_analyzer_md_agents_gsd_assumptions_analyzer": "gsd-assumptions-analyzer.md" | kind=entity | source=agents/gsd-assumptions-analyzer.md:L1 | neighbors=[full_maturity, minimal_decisive, standard]
- "agents_gsd_code_reviewer_before_write": "- before_write" | kind=entity | source=.claude/agents/gsd-code-reviewer.md:L7 | neighbors=[Issues to Detect, Three Review Modes, gsd-code-reviewer.md]
- "agents_gsd_executor_command_npx_eslint_fix_file_2_dev_null_true": "command: \"npx eslint --fix $FILE 2>/dev/null || true\"" | kind=entity | source=.claude/agents/gsd-executor.md:L11 | neighbors=[MVP+TDD Gate, Plan-Level TDD Gate Enforcement (type: …, gsd-executor.md]
- "agents_gsd_intel_updater_agent_upstream_input": "Upstream Input" | kind=entity | source=.github/agents/gsd-intel-updater.agent.md:L45 | neighbors=[GSD Intel Updater, Config Gate, From `/gsd-map-codebase --query` Command]
- "agents_gsd_nyquist_auditor_agent": "gsd-nyquist-auditor.agent.md" | kind=entity | source=.github/agents/gsd-nyquist-auditor.agent.md:L1 | neighbors=[ESCALATE, GAPS FILLED, PARTIAL]
- "agents_gsd_nyquist_auditor_md_agents_gsd_nyquist_auditor": "gsd-nyquist-auditor.md" | kind=entity | source=agents/gsd-nyquist-auditor.md:L1 | neighbors=[ESCALATE, GAPS FILLED, PARTIAL]
- "agents_gsd_security_auditor_agent": "gsd-security-auditor.agent.md" | kind=entity | source=.github/agents/gsd-security-auditor.agent.md:L1 | neighbors=[ESCALATE, OPEN_THREATS, SECURED]
- "agents_gsd_security_auditor_md_agents_gsd_security_auditor": "gsd-security-auditor.md" | kind=entity | source=agents/gsd-security-auditor.md:L1 | neighbors=[ESCALATE, OPEN_THREATS, SECURED]
- "agents_meta_agent_purpose": "Purpose" | kind=entity | source=.claude/agents/meta-agent.md:L9 | neighbors=[meta-agent.md, Output Format, Workflow]
- "agents_observer_output": "Output" | kind=entity | source=.github/skills/ecc/continuous-learning-v2/agents/observer.md:L66 | neighbors=[Observer Agent, Global Instinct (universal patterns), Project-Scoped Instinct (default)]
- "agents_skills_archive_impeccable_reference_adapt_md_reference_adapt_responsive_images_get_it_right": "Responsive Images: Get It Right" | kind=entity | source=.agents/skills_archive/impeccable/reference/adapt.md:L259 | neighbors=[Responsive Design, Picture Element for Art Direction, srcset with Width Descriptors]
- "agents_skills_archive_impeccable_reference_audit_md_reference_audit": "audit.md" | kind=entity | source=.agents/skills_archive/impeccable/reference/audit.md:L1 | neighbors=[Diagnostic Scan, Generate Report, Recommended Actions]
- "agents_skills_archive_impeccable_reference_clarify_md_reference_clarify_error_messages_the_formula": "Error Messages: The Formula" | kind=entity | source=.agents/skills_archive/impeccable/reference/clarify.md:L200 | neighbors=[Don't Blame the User, Error Message Templates, UX Writing]
- "agents_skills_archive_impeccable_reference_clarify_md_reference_clarify_writing_for_translation": "Writing for Translation" | kind=entity | source=.agents/skills_archive/impeccable/reference/clarify.md:L240 | neighbors=[UX Writing, Plan for Expansion, Translation-Friendly Patterns]
- "agents_skills_archive_impeccable_reference_colorize_md_reference_colorize_theming_light_dark_mode": "Theming: Light & Dark Mode" | kind=entity | source=.agents/skills_archive/impeccable/reference/colorize.md:L232 | neighbors=[Color & Contrast, Dark Mode Is Not Inverted Light Mode, Token Hierarchy]
- "agents_skills_archive_impeccable_reference_interaction_design_md_reference_interaction_design_keyboard_navigation_patterns": "Keyboard Navigation Patterns" | kind=entity | source=.agents/skills_archive/impeccable/reference/interaction-design.md:L157 | neighbors=[Interaction Design, Roving Tabindex, Skip Links]
- "ai_regression_testing_skill_integrating_tests_into_bug_check_workflow": "Integrating Tests into Bug-Check Workflow" | kind=entity | source=.github/skills/ecc/ai-regression-testing/SKILL.md:L195 | neighbors=[AI Regression Testing, Custom Command Definition, The Workflow]
- "api_reference_dashboard": "Dashboard" | kind=entity | source=docs/api/reference.md:L584 | neighbors=[GET `/api/dashboard/compliance-status`, GET `/api/dashboard/live-status`, Domain Details]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\PTOW\1_APT_Central_Command\.graphify\description-instructions\batch-057.json

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
