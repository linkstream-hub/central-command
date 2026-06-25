# Node Description Batch 344 of 412

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

- "references_common_bug_patterns_null_undefined_access": "Null / Undefined Access" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/common-bug-patterns.md:L7 | neighbors=[Common Bug Patterns] | lang=en
- "references_common_bug_patterns_off_by_one_boundary": "Off-by-One / Boundary" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/common-bug-patterns.md:L14 | neighbors=[Common Bug Patterns] | lang=en
- "references_common_bug_patterns_regex_string": "Regex / String" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/common-bug-patterns.md:L68 | neighbors=[Common Bug Patterns] | lang=en
- "references_common_bug_patterns_scope_closure": "Scope / Closure" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/common-bug-patterns.md:L82 | neighbors=[Common Bug Patterns] | lang=en
- "references_common_bug_patterns_state_management": "State Management" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/common-bug-patterns.md:L29 | neighbors=[Common Bug Patterns] | lang=en
- "references_common_bug_patterns_symptom_to_category_quick_map": "Symptom-to-Category Quick Map" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/common-bug-patterns.md:L100 | neighbors=[How to Use This Checklist] | lang=en
- "references_common_bug_patterns_type_coercion": "Type / Coercion" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/common-bug-patterns.md:L45 | neighbors=[Common Bug Patterns] | lang=en
- "references_context_budget": "context-budget.md" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/context-budget.md:L1 | neighbors=[Context Budget Rules] | lang=en
- "references_context_budget_composition_with_model_profile": "Composition with model_profile" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/context-budget.md:L83 | neighbors=[MCP Tool Schema Cost (Harness Concern)] | lang=en
- "references_context_budget_context_degradation_tiers": "Context Degradation Tiers" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/context-budget.md:L30 | neighbors=[Context Budget Rules] | lang=en
- "references_context_budget_context_degradation_warning_signs": "Context Degradation Warning Signs" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/context-budget.md:L41 | neighbors=[Context Budget Rules] | lang=en
- "references_context_budget_how_to_toggle": "How to toggle" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/context-budget.md:L70 | neighbors=[MCP Tool Schema Cost (Harness Concern)] | lang=en
- "references_context_budget_pre_phase_mcp_audit": "Pre-Phase MCP Audit" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/context-budget.md:L59 | neighbors=[MCP Tool Schema Cost (Harness Concern)] | lang=en
- "references_context_budget_read_depth_by_context_window": "Read Depth by Context Window" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/context-budget.md:L21 | neighbors=[Context Budget Rules] | lang=en
- "references_context_budget_universal_rules": "Universal Rules" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/context-budget.md:L9 | neighbors=[Context Budget Rules] | lang=en
- "references_context_budget_why_this_is_the_biggest_cost_lever_you_don_t_own": "Why this is the biggest cost lever you don't own" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/context-budget.md:L55 | neighbors=[MCP Tool Schema Cost (Harness Concern)] | lang=en
- "references_continuation_format": "continuation-format.md" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/continuation-format.md:L1 | neighbors=[Continuation Format] | lang=en
- "references_continuation_format_core_structure": "Core Structure" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/continuation-format.md:L5 | neighbors=[Continuation Format] | lang=en
- "references_continuation_format_don_t_command_only_no_context": "Don't: Command-only (no context)" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/continuation-format.md:L215 | neighbors=[Anti-Patterns] | lang=en
- "references_continuation_format_don_t_fenced_code_blocks_for_commands": "Don't: Fenced code blocks for commands" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/continuation-format.md:L245 | neighbors=[Anti-Patterns] | lang=en
- "references_continuation_format_don_t_missing_clear_explanation": "Don't: Missing /clear explanation" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/continuation-format.md:L226 | neighbors=[Anti-Patterns] | lang=en
- "references_continuation_format_don_t_other_options_language": "Don't: \"Other options\" language" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/continuation-format.md:L236 | neighbors=[Anti-Patterns] | lang=en
- "references_continuation_format_execute_final_plan_in_phase": "Execute Final Plan in Phase" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/continuation-format.md:L64 | neighbors=[Variants] | lang=en
- "references_continuation_format_execute_next_plan": "Execute Next Plan" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/continuation-format.md:L42 | neighbors=[Variants] | lang=en
- "references_continuation_format_for_phases_from_roadmap_md": "For phases (from ROADMAP.md):" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/continuation-format.md:L185 | neighbors=[Pulling Context] | lang=en
- "references_continuation_format_for_plans_from_roadmap_md": "For plans (from ROADMAP.md):" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/continuation-format.md:L194 | neighbors=[Pulling Context] | lang=en
- "references_continuation_format_format_rules": "Format Rules" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/continuation-format.md:L30 | neighbors=[Continuation Format] | lang=en
- "references_continuation_format_milestone_complete": "Milestone Complete" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/continuation-format.md:L163 | neighbors=[Variants] | lang=en
- "references_continuation_format_multiple_equal_options": "Multiple Equal Options" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/continuation-format.md:L141 | neighbors=[Variants] | lang=en
- "references_continuation_format_phase_complete_ready_for_next": "Phase Complete, Ready for Next" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/continuation-format.md:L112 | neighbors=[Variants] | lang=en
- "references_continuation_format_plan_a_phase": "Plan a Phase" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/continuation-format.md:L89 | neighbors=[Variants] | lang=pt
- "references_debugger_philosophy": "debugger-philosophy.md" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/debugger-philosophy.md:L1 | neighbors=[Debugger Philosophy] | lang=en
- "references_debugger_philosophy_cognitive_biases_to_avoid": "Cognitive Biases to Avoid" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/debugger-philosophy.md:L45 | neighbors=[Debugger Philosophy] | lang=en
- "references_debugger_philosophy_foundation_principles": "Foundation Principles" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/debugger-philosophy.md:L37 | neighbors=[Debugger Philosophy] | lang=en
- "references_debugger_philosophy_meta_debugging_your_own_code": "Meta-Debugging: Your Own Code" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/debugger-philosophy.md:L20 | neighbors=[Debugger Philosophy] | lang=en
- "references_debugger_philosophy_systematic_investigation_disciplines": "Systematic Investigation Disciplines" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/debugger-philosophy.md:L54 | neighbors=[Debugger Philosophy] | lang=en
- "references_debugger_philosophy_user_reporter_claude_investigator": "User = Reporter, Claude = Investigator" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/debugger-philosophy.md:L5 | neighbors=[Debugger Philosophy] | lang=en
- "references_debugger_philosophy_when_to_restart": "When to Restart" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/debugger-philosophy.md:L62 | neighbors=[Debugger Philosophy] | lang=en
- "references_decimal_phase_calculation": "decimal-phase-calculation.md" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/decimal-phase-calculation.md:L1 | neighbors=[Decimal Phase Calculation] | lang=en
- "references_decimal_phase_calculation_directory_naming": "Directory Naming" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/decimal-phase-calculation.md:L54 | neighbors=[Decimal Phase Calculation] | lang=en

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\PTOW\1_APT_Central_Command\.graphify\description-instructions\batch-343.json

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
