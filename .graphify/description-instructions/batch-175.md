# Node Description Batch 176 of 412

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

- "claude_agents_gsd_debugger_md_agents_gsd_debugger_resume_behavior": "Resume Behavior" | kind=entity | source=.claude/agents/gsd-debugger.md:L897 | neighbors=[command: "npx eslint --fix $FILE 2>/dev…]
- "claude_agents_gsd_debugger_md_agents_gsd_debugger_root_cause_found_goal_find_root_cause_only": "ROOT CAUSE FOUND (goal: find_root_cause_only)" | kind=entity | source=.claude/agents/gsd-debugger.md:L1292 | neighbors=[command: "npx eslint --fix $FILE 2>/dev…]
- "claude_agents_gsd_debugger_md_agents_gsd_debugger_rubber_duck_debugging": "Rubber Duck Debugging" | kind=entity | source=.claude/agents/gsd-debugger.md:L188 | neighbors=[command: "npx eslint --fix $FILE 2>/dev…]
- "claude_agents_gsd_debugger_md_agents_gsd_debugger_stability_testing": "Stability Testing" | kind=entity | source=.claude/agents/gsd-debugger.md:L522 | neighbors=[command: "npx eslint --fix $FILE 2>/dev…]
- "claude_agents_gsd_debugger_md_agents_gsd_debugger_status_transitions": "Status Transitions" | kind=entity | source=.claude/agents/gsd-debugger.md:L888 | neighbors=[command: "npx eslint --fix $FILE 2>/dev…]
- "claude_agents_gsd_debugger_md_agents_gsd_debugger_structured_reasoning_checkpoint": "Structured Reasoning Checkpoint" | kind=entity | source=.claude/agents/gsd-debugger.md:L238 | neighbors=[command: "npx eslint --fix $FILE 2>/dev…]
- "claude_agents_gsd_debugger_md_agents_gsd_debugger_tdd_checkpoint_tdd_mode_true_after_writing_failing_test": "TDD CHECKPOINT (tdd_mode: true, after writing failing test)" | kind=entity | source=.claude/agents/gsd-debugger.md:L1357 | neighbors=[command: "npx eslint --fix $FILE 2>/dev…]
- "claude_agents_gsd_debugger_md_agents_gsd_debugger_technique_selection": "Technique Selection" | kind=entity | source=.claude/agents/gsd-debugger.md:L445 | neighbors=[command: "npx eslint --fix $FILE 2>/dev…]
- "claude_agents_gsd_debugger_md_agents_gsd_debugger_test_first_debugging": "Test-First Debugging" | kind=entity | source=.claude/agents/gsd-debugger.md:L559 | neighbors=[command: "npx eslint --fix $FILE 2>/dev…]
- "claude_agents_gsd_debugger_md_agents_gsd_debugger_update_rules": "Update Rules" | kind=entity | source=.claude/agents/gsd-debugger.md:L872 | neighbors=[command: "npx eslint --fix $FILE 2>/dev…]
- "claude_agents_gsd_debugger_md_agents_gsd_debugger_verification_checklist": "Verification Checklist" | kind=entity | source=.claude/agents/gsd-debugger.md:L592 | neighbors=[command: "npx eslint --fix $FILE 2>/dev…]
- "claude_agents_gsd_debugger_md_agents_gsd_debugger_verification_mindset": "Verification Mindset" | kind=entity | source=.claude/agents/gsd-debugger.md:L634 | neighbors=[command: "npx eslint --fix $FILE 2>/dev…]
- "claude_agents_gsd_debugger_md_agents_gsd_debugger_verification_red_flags": "Verification Red Flags" | kind=entity | source=.claude/agents/gsd-debugger.md:L621 | neighbors=[command: "npx eslint --fix $FILE 2>/dev…]
- "claude_agents_gsd_debugger_md_agents_gsd_debugger_what_verified_means": "What \"Verified\" Means" | kind=entity | source=.claude/agents/gsd-debugger.md:L473 | neighbors=[command: "npx eslint --fix $FILE 2>/dev…]
- "claude_agents_gsd_debugger_md_agents_gsd_debugger_when_to_read": "When to Read" | kind=entity | source=.claude/agents/gsd-debugger.md:L796 | neighbors=[command: "npx eslint --fix $FILE 2>/dev…]
- "claude_agents_gsd_debugger_md_agents_gsd_debugger_when_to_reason_your_code": "When to Reason (Your Code)" | kind=entity | source=.claude/agents/gsd-debugger.md:L677 | neighbors=[command: "npx eslint --fix $FILE 2>/dev…]
- "claude_agents_gsd_debugger_md_agents_gsd_debugger_when_to_research_external_knowledge": "When to Research (External Knowledge)" | kind=entity | source=.claude/agents/gsd-debugger.md:L650 | neighbors=[command: "npx eslint --fix $FILE 2>/dev…]
- "claude_agents_gsd_debugger_md_agents_gsd_debugger_when_to_return_checkpoints": "When to Return Checkpoints" | kind=entity | source=.claude/agents/gsd-debugger.md:L1213 | neighbors=[command: "npx eslint --fix $FILE 2>/dev…]
- "claude_agents_gsd_debugger_md_agents_gsd_debugger_when_to_write": "When to Write" | kind=entity | source=.claude/agents/gsd-debugger.md:L800 | neighbors=[command: "npx eslint --fix $FILE 2>/dev…]
- "claude_agents_gsd_debugger_md_agents_gsd_debugger_working_backwards": "Working Backwards" | kind=entity | source=.claude/agents/gsd-debugger.md:L293 | neighbors=[command: "npx eslint --fix $FILE 2>/dev…]
- "claude_agents_gsd_doc_writer_md_agents_gsd_doc_writer_api_md": "API.md" | kind=entity | source=.claude/agents/gsd-doc-writer.md:L296 | neighbors=[command: "npx eslint --fix $FILE 2>/dev…]
- "claude_agents_gsd_doc_writer_md_agents_gsd_doc_writer_architecture_md": "ARCHITECTURE.md" | kind=entity | source=.claude/agents/gsd-doc-writer.md:L149 | neighbors=[command: "npx eslint --fix $FILE 2>/dev…]
- "claude_agents_gsd_doc_writer_md_agents_gsd_doc_writer_configuration_md": "CONFIGURATION.md" | kind=entity | source=.claude/agents/gsd-doc-writer.md:L341 | neighbors=[command: "npx eslint --fix $FILE 2>/dev…]
- "claude_agents_gsd_doc_writer_md_agents_gsd_doc_writer_contributing_md": "CONTRIBUTING.md" | kind=entity | source=.claude/agents/gsd-doc-writer.md:L426 | neighbors=[command: "npx eslint --fix $FILE 2>/dev…]
- "claude_agents_gsd_doc_writer_md_agents_gsd_doc_writer_custom_documentation_gap_detected": "Custom Documentation (gap-detected)" | kind=entity | source=.claude/agents/gsd-doc-writer.md:L498 | neighbors=[command: "npx eslint --fix $FILE 2>/dev…]
- "claude_agents_gsd_doc_writer_md_agents_gsd_doc_writer_deployment_md": "DEPLOYMENT.md" | kind=entity | source=.claude/agents/gsd-doc-writer.md:L383 | neighbors=[command: "npx eslint --fix $FILE 2>/dev…]
- "claude_agents_gsd_doc_writer_md_agents_gsd_doc_writer_development_md": "DEVELOPMENT.md" | kind=entity | source=.claude/agents/gsd-doc-writer.md:L222 | neighbors=[command: "npx eslint --fix $FILE 2>/dev…]
- "claude_agents_gsd_doc_writer_md_agents_gsd_doc_writer_doc_tooling_adaptation": "Doc Tooling Adaptation" | kind=entity | source=.claude/agents/gsd-doc-writer.md:L542 | neighbors=[command: "npx eslint --fix $FILE 2>/dev…]
- "claude_agents_gsd_doc_writer_md_agents_gsd_doc_writer_getting_started_md": "GETTING-STARTED.md" | kind=entity | source=.claude/agents/gsd-doc-writer.md:L184 | neighbors=[command: "npx eslint --fix $FILE 2>/dev…]
- "claude_agents_gsd_doc_writer_md_agents_gsd_doc_writer_per_package_readme_monorepo_scope": "Per-Package README (monorepo scope)" | kind=entity | source=.claude/agents/gsd-doc-writer.md:L464 | neighbors=[command: "npx eslint --fix $FILE 2>/dev…]
- "claude_agents_gsd_doc_writer_md_agents_gsd_doc_writer_readme_md": "README.md" | kind=entity | source=.claude/agents/gsd-doc-writer.md:L110 | neighbors=[command: "npx eslint --fix $FILE 2>/dev…]
- "claude_agents_gsd_doc_writer_md_agents_gsd_doc_writer_testing_md": "TESTING.md" | kind=entity | source=.claude/agents/gsd-doc-writer.md:L259 | neighbors=[command: "npx eslint --fix $FILE 2>/dev…]
- "claude_agents_gsd_executor_md_agents_gsd_executor_mvp_tdd_gate": "MVP+TDD Gate" | kind=entity | source=.claude/agents/gsd-executor.md:L387 | neighbors=[command: "npx eslint --fix $FILE 2>/dev…]
- "claude_agents_gsd_executor_md_agents_gsd_executor_plan_level_tdd_gate_enforcement_type_tdd_plans": "Plan-Level TDD Gate Enforcement (type: tdd plans)" | kind=entity | source=.claude/agents/gsd-executor.md:L373 | neighbors=[command: "npx eslint --fix $FILE 2>/dev…]
- "claude_agents_gsd_integration_checker_md_agents_gsd_integration_checker_flow_data_display": "Flow: Data Display" | kind=entity | source=.claude/agents/gsd-integration-checker.md:L273 | neighbors=[Step 5: Verify E2E Flows]
- "claude_agents_gsd_integration_checker_md_agents_gsd_integration_checker_flow_form_submission": "Flow: Form Submission" | kind=entity | source=.claude/agents/gsd-integration-checker.md:L312 | neighbors=[Step 5: Verify E2E Flows]
- "claude_agents_gsd_integration_checker_md_agents_gsd_integration_checker_flow_user_authentication": "Flow: User Authentication" | kind=entity | source=.claude/agents/gsd-integration-checker.md:L245 | neighbors=[Step 5: Verify E2E Flows]
- "claude_agents_gsd_integration_checker_md_agents_gsd_integration_checker_required_context_provided_by_milestone_auditor": "Required Context (provided by milestone auditor)" | kind=entity | source=.claude/agents/gsd-integration-checker.md:L61 | neighbors=[gsd-integration-checker.md]
- "claude_agents_gsd_integration_checker_md_agents_gsd_integration_checker_step_1_build_export_import_map": "Step 1: Build Export/Import Map" | kind=entity | source=.claude/agents/gsd-integration-checker.md:L89 | neighbors=[gsd-integration-checker.md]
- "claude_agents_gsd_integration_checker_md_agents_gsd_integration_checker_step_2_verify_export_usage": "Step 2: Verify Export Usage" | kind=entity | source=.claude/agents/gsd-integration-checker.md:L119 | neighbors=[gsd-integration-checker.md]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\PTOW\1_APT_Central_Command\.graphify\description-instructions\batch-175.json

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
