# Node Description Batch 346 of 412

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

- "references_exports_step_7b_svg_export_only_if_svg_flag": "Step 7b - SVG export (only if --svg flag)" | kind=entity | source=.github/skills/graphify/references/exports.md:L31 | neighbors=[graphify reference: extra exports and b…]
- "references_exports_step_7c_graphml_export_only_if_graphml_flag": "Step 7c - GraphML export (only if --graphml flag)" | kind=entity | source=.github/skills/graphify/references/exports.md:L37 | neighbors=[graphify reference: extra exports and b…]
- "references_exports_step_7d_mcp_server_only_if_mcp_flag": "Step 7d - MCP server (only if --mcp flag)" | kind=entity | source=.github/skills/graphify/references/exports.md:L43 | neighbors=[graphify reference: extra exports and b…]
- "references_exports_step_8_token_reduction_benchmark_only_if_total_words_5000": "Step 8 - Token reduction benchmark (only if total_words > 5000)" | kind=entity | source=.github/skills/graphify/references/exports.md:L63 | neighbors=[graphify reference: extra exports and b…]
- "references_extraction_spec": "extraction-spec.md" | kind=entity | source=.github/skills/graphify/references/extraction-spec.md:L1 | neighbors=[graphify reference: extraction subagent…]
- "references_extraction_spec_graphify_reference_extraction_subagent_prompt": "graphify reference: extraction subagent prompt" | kind=entity | source=.github/skills/graphify/references/extraction-spec.md:L1 | neighbors=[extraction-spec.md]
- "references_gate_prompts": "gate-prompts.md" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/gate-prompts.md:L1 | neighbors=[Gate Prompt Patterns]
- "references_gate_prompts_pattern_action_routing": "Pattern: action-routing" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/gate-prompts.md:L70 | neighbors=[Gate Prompt Patterns]
- "references_gate_prompts_pattern_approve_revise_abort": "Pattern: approve-revise-abort" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/gate-prompts.md:L16 | neighbors=[Gate Prompt Patterns]
- "references_gate_prompts_pattern_context_handling": "Pattern: context-handling" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/gate-prompts.md:L89 | neighbors=[Gate Prompt Patterns]
- "references_gate_prompts_pattern_depth_select": "Pattern: depth-select" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/gate-prompts.md:L83 | neighbors=[Gate Prompt Patterns]
- "references_gate_prompts_pattern_gray_area_option": "Pattern: gray-area-option" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/gate-prompts.md:L95 | neighbors=[Gate Prompt Patterns]
- "references_gate_prompts_pattern_multi_option_escalation": "Pattern: multi-option-escalation" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/gate-prompts.md:L46 | neighbors=[Gate Prompt Patterns]
- "references_gate_prompts_pattern_multi_option_failure": "Pattern: multi-option-failure" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/gate-prompts.md:L40 | neighbors=[Gate Prompt Patterns]
- "references_gate_prompts_pattern_multi_option_gaps": "Pattern: multi-option-gaps" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/gate-prompts.md:L52 | neighbors=[Gate Prompt Patterns]
- "references_gate_prompts_pattern_multi_option_priority": "Pattern: multi-option-priority" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/gate-prompts.md:L58 | neighbors=[Gate Prompt Patterns]
- "references_gate_prompts_pattern_scope_confirm": "Pattern: scope-confirm" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/gate-prompts.md:L77 | neighbors=[Gate Prompt Patterns]
- "references_gate_prompts_pattern_stale_continue": "Pattern: stale-continue" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/gate-prompts.md:L28 | neighbors=[Gate Prompt Patterns]
- "references_gate_prompts_pattern_toggle_confirm": "Pattern: toggle-confirm" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/gate-prompts.md:L64 | neighbors=[Gate Prompt Patterns]
- "references_gate_prompts_pattern_yes_no": "Pattern: yes-no" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/gate-prompts.md:L22 | neighbors=[Gate Prompt Patterns]
- "references_gate_prompts_pattern_yes_no_pick": "Pattern: yes-no-pick" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/gate-prompts.md:L34 | neighbors=[Gate Prompt Patterns]
- "references_gate_prompts_rules": "Rules" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/gate-prompts.md:L7 | neighbors=[Gate Prompt Patterns]
- "references_gates": "gates.md" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/gates.md:L1 | neighbors=[Gates Taxonomy]
- "references_gates_abort_gate": "Abort Gate" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/gates.md:L35 | neighbors=[Gate Types]
- "references_gates_escalation_gate": "Escalation Gate" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/gates.md:L26 | neighbors=[Gate Types]
- "references_gates_gate_matrix": "Gate Matrix" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/gates.md:L46 | neighbors=[Gates Taxonomy]
- "references_gates_implementing_gates": "Implementing Gates" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/gates.md:L61 | neighbors=[Gates Taxonomy]
- "references_gates_pre_flight_gate": "Pre-flight Gate" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/gates.md:L9 | neighbors=[Gate Types]
- "references_gates_revision_gate": "Revision Gate" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/gates.md:L18 | neighbors=[Gate Types]
- "references_git_integration_commit_routing": "Commit Routing" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/git-integration.md:L285 | neighbors=[Multi-Repo Workspace Support (sub_repos)]
- "references_git_integration_configuration": "Configuration" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/git-integration.md:L263 | neighbors=[Multi-Repo Workspace Support (sub_repos)]
- "references_git_integration_handoff_wip": "Handoff (WIP)" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/git-integration.md:L147 | neighbors=[git-integration.md]
- "references_git_integration_how_it_works": "How It Works" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/git-integration.md:L278 | neighbors=[Multi-Repo Workspace Support (sub_repos)]
- "references_git_integration_plan_completion_after_all_tasks_done": "Plan Completion (After All Tasks Done)" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/git-integration.md:L121 | neighbors=[git-integration.md]
- "references_git_integration_project_initialization_brief_roadmap_together": "Project Initialization (brief + roadmap together)" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/git-integration.md:L38 | neighbors=[git-integration.md]
- "references_git_integration_task_completion_during_plan_execution": "Task Completion (During Plan Execution)" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/git-integration.md:L60 | neighbors=[git-integration.md]
- "references_git_integration_why_per_task_commits": "Why Per-Task Commits?" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/git-integration.md:L232 | neighbors=[git-integration.md]
- "references_git_planning_commit": "git-planning-commit.md" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/git-planning-commit.md:L1 | neighbors=[Git Planning Commit]
- "references_git_planning_commit_amend_previous_commit": "Amend previous commit" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/git-planning-commit.md:L17 | neighbors=[Git Planning Commit]
- "references_git_planning_commit_commit_message_patterns": "Commit Message Patterns" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/git-planning-commit.md:L25 | neighbors=[Git Planning Commit]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\PTOW\1_APT_Central_Command\.graphify\description-instructions\batch-345.json

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
