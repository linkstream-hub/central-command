# Node Description Batch 112 of 412

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

- "agents_gsd_domain_researcher_posttooluse": "PostToolUse:" | kind=entity | source=.claude/agents/gsd-domain-researcher.md:L7 | neighbors=[gsd-domain-researcher.md]
- "agents_gsd_domain_researcher_type_command": "- type: command" | kind=entity | source=.claude/agents/gsd-domain-researcher.md:L10 | neighbors=[gsd-domain-researcher.md]
- "agents_gsd_eval_auditor_command_echo_eval_review_written_2_dev_null_true": "command: \"echo 'EVAL-REVIEW written' 2>/dev/null || true\"" | kind=entity | source=.claude/agents/gsd-eval-auditor.md:L11 | neighbors=[gsd-eval-auditor.md]
- "agents_gsd_eval_auditor_hooks": "hooks:" | kind=entity | source=.claude/agents/gsd-eval-auditor.md:L6 | neighbors=[gsd-eval-auditor.md]
- "agents_gsd_eval_auditor_matcher_write_edit": "- matcher: \"Write|Edit\"" | kind=entity | source=.claude/agents/gsd-eval-auditor.md:L8 | neighbors=[gsd-eval-auditor.md]
- "agents_gsd_eval_auditor_posttooluse": "PostToolUse:" | kind=entity | source=.claude/agents/gsd-eval-auditor.md:L7 | neighbors=[gsd-eval-auditor.md]
- "agents_gsd_eval_auditor_type_command": "- type: command" | kind=entity | source=.claude/agents/gsd-eval-auditor.md:L10 | neighbors=[gsd-eval-auditor.md]
- "agents_gsd_eval_planner_command_echo_ai_spec_eval_sections_written_2_dev_null_true": "command: \"echo 'AI-SPEC eval sections written' 2>/dev/null || true\"" | kind=entity | source=.claude/agents/gsd-eval-planner.md:L11 | neighbors=[gsd-eval-planner.md]
- "agents_gsd_eval_planner_hooks": "hooks:" | kind=entity | source=.claude/agents/gsd-eval-planner.md:L6 | neighbors=[gsd-eval-planner.md]
- "agents_gsd_eval_planner_matcher_write_edit": "- matcher: \"Write|Edit\"" | kind=entity | source=.claude/agents/gsd-eval-planner.md:L8 | neighbors=[gsd-eval-planner.md]
- "agents_gsd_eval_planner_posttooluse": "PostToolUse:" | kind=entity | source=.claude/agents/gsd-eval-planner.md:L7 | neighbors=[gsd-eval-planner.md]
- "agents_gsd_eval_planner_type_command": "- type: command" | kind=entity | source=.claude/agents/gsd-eval-planner.md:L10 | neighbors=[gsd-eval-planner.md]
- "agents_gsd_executor_agent_mvp_tdd_gate": "MVP+TDD Gate" | kind=entity | source=.github/agents/gsd-executor.agent.md:L381 | neighbors=[gsd-executor.agent.md]
- "agents_gsd_executor_agent_plan_level_tdd_gate_enforcement_type_tdd_plans": "Plan-Level TDD Gate Enforcement (type: tdd plans)" | kind=entity | source=.github/agents/gsd-executor.agent.md:L367 | neighbors=[gsd-executor.agent.md]
- "agents_gsd_executor_hooks": "hooks:" | kind=entity | source=.claude/agents/gsd-executor.md:L6 | neighbors=[gsd-executor.md]
- "agents_gsd_executor_matcher_write_edit": "- matcher: \"Write|Edit\"" | kind=entity | source=.claude/agents/gsd-executor.md:L8 | neighbors=[gsd-executor.md]
- "agents_gsd_executor_md_agents_gsd_executor_mvp_tdd_gate": "MVP+TDD Gate" | kind=entity | source=agents/gsd-executor.md:L379 | neighbors=[gsd-executor.md]
- "agents_gsd_executor_md_agents_gsd_executor_plan_level_tdd_gate_enforcement_type_tdd_plans": "Plan-Level TDD Gate Enforcement (type: tdd plans)" | kind=entity | source=agents/gsd-executor.md:L365 | neighbors=[gsd-executor.md]
- "agents_gsd_executor_posttooluse": "PostToolUse:" | kind=entity | source=.claude/agents/gsd-executor.md:L7 | neighbors=[gsd-executor.md]
- "agents_gsd_executor_type_command": "- type: command" | kind=entity | source=.claude/agents/gsd-executor.md:L10 | neighbors=[gsd-executor.md]
- "agents_gsd_integration_checker_agent_flow_data_display": "Flow: Data Display" | kind=entity | source=.github/agents/gsd-integration-checker.agent.md:L273 | neighbors=[Step 5: Verify E2E Flows]
- "agents_gsd_integration_checker_agent_flow_form_submission": "Flow: Form Submission" | kind=entity | source=.github/agents/gsd-integration-checker.agent.md:L312 | neighbors=[Step 5: Verify E2E Flows]
- "agents_gsd_integration_checker_agent_flow_user_authentication": "Flow: User Authentication" | kind=entity | source=.github/agents/gsd-integration-checker.agent.md:L245 | neighbors=[Step 5: Verify E2E Flows]
- "agents_gsd_integration_checker_agent_required_context_provided_by_milestone_auditor": "Required Context (provided by milestone auditor)" | kind=entity | source=.github/agents/gsd-integration-checker.agent.md:L61 | neighbors=[gsd-integration-checker.agent.md]
- "agents_gsd_integration_checker_agent_step_1_build_export_import_map": "Step 1: Build Export/Import Map" | kind=entity | source=.github/agents/gsd-integration-checker.agent.md:L89 | neighbors=[gsd-integration-checker.agent.md]
- "agents_gsd_integration_checker_agent_step_2_verify_export_usage": "Step 2: Verify Export Usage" | kind=entity | source=.github/agents/gsd-integration-checker.agent.md:L119 | neighbors=[gsd-integration-checker.agent.md]
- "agents_gsd_integration_checker_agent_step_3_verify_api_coverage": "Step 3: Verify API Coverage" | kind=entity | source=.github/agents/gsd-integration-checker.agent.md:L158 | neighbors=[gsd-integration-checker.agent.md]
- "agents_gsd_integration_checker_agent_step_4_verify_auth_protection": "Step 4: Verify Auth Protection" | kind=entity | source=.github/agents/gsd-integration-checker.agent.md:L205 | neighbors=[gsd-integration-checker.agent.md]
- "agents_gsd_integration_checker_agent_step_6_compile_integration_report": "Step 6: Compile Integration Report" | kind=entity | source=.github/agents/gsd-integration-checker.agent.md:L343 | neighbors=[gsd-integration-checker.agent.md]
- "agents_gsd_integration_checker_md_agents_gsd_integration_checker_flow_data_display": "Flow: Data Display" | kind=entity | source=agents/gsd-integration-checker.md:L271 | neighbors=[Step 5: Verify E2E Flows]
- "agents_gsd_integration_checker_md_agents_gsd_integration_checker_flow_form_submission": "Flow: Form Submission" | kind=entity | source=agents/gsd-integration-checker.md:L310 | neighbors=[Step 5: Verify E2E Flows]
- "agents_gsd_integration_checker_md_agents_gsd_integration_checker_flow_user_authentication": "Flow: User Authentication" | kind=entity | source=agents/gsd-integration-checker.md:L243 | neighbors=[Step 5: Verify E2E Flows]
- "agents_gsd_integration_checker_md_agents_gsd_integration_checker_required_context_provided_by_milestone_auditor": "Required Context (provided by milestone auditor)" | kind=entity | source=agents/gsd-integration-checker.md:L59 | neighbors=[gsd-integration-checker.md]
- "agents_gsd_integration_checker_md_agents_gsd_integration_checker_step_1_build_export_import_map": "Step 1: Build Export/Import Map" | kind=entity | source=agents/gsd-integration-checker.md:L87 | neighbors=[gsd-integration-checker.md]
- "agents_gsd_integration_checker_md_agents_gsd_integration_checker_step_2_verify_export_usage": "Step 2: Verify Export Usage" | kind=entity | source=agents/gsd-integration-checker.md:L117 | neighbors=[gsd-integration-checker.md]
- "agents_gsd_integration_checker_md_agents_gsd_integration_checker_step_3_verify_api_coverage": "Step 3: Verify API Coverage" | kind=entity | source=agents/gsd-integration-checker.md:L156 | neighbors=[gsd-integration-checker.md]
- "agents_gsd_integration_checker_md_agents_gsd_integration_checker_step_4_verify_auth_protection": "Step 4: Verify Auth Protection" | kind=entity | source=agents/gsd-integration-checker.md:L203 | neighbors=[gsd-integration-checker.md]
- "agents_gsd_integration_checker_md_agents_gsd_integration_checker_step_6_compile_integration_report": "Step 6: Compile Integration Report" | kind=entity | source=agents/gsd-integration-checker.md:L341 | neighbors=[gsd-integration-checker.md]
- "agents_gsd_intel_updater_agent": "gsd-intel-updater.agent.md" | kind=entity | source=.github/agents/gsd-intel-updater.agent.md:L1 | neighbors=[GSD Intel Updater]
- "agents_gsd_intel_updater_agent_anti_patterns": "Anti-Patterns" | kind=entity | source=.github/agents/gsd-intel-updater.agent.md:L331 | neighbors=[GSD Intel Updater]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\PTOW\1_APT_Central_Command\.graphify\description-instructions\batch-111.json

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
