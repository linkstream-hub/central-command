# Node Description Batch 384 of 412

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

- "templates_ai_spec_common_pitfalls": "Common Pitfalls" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/templates/AI-SPEC.md:L100 | neighbors=[3. Framework Quick Reference]
- "templates_ai_spec_context_window_management": "Context Window Management" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/templates/AI-SPEC.md:L154 | neighbors=[4b. AI Systems Best Practices]
- "templates_ai_spec_core_imports": "Core Imports" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/templates/AI-SPEC.md:L84 | neighbors=[3. Framework Quick Reference]
- "templates_ai_spec_cost_and_latency_budget": "Cost and Latency Budget" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/templates/AI-SPEC.md:L158 | neighbors=[4b. AI Systems Best Practices]
- "templates_ai_spec_dimensions": "Dimensions" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/templates/AI-SPEC.md:L166 | neighbors=[5. Evaluation Strategy]
- "templates_ai_spec_domain_expert_roles_for_evaluation": "Domain Expert Roles for Evaluation" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/templates/AI-SPEC.md:L48 | neighbors=[1b. Domain Context]
- "templates_ai_spec_entry_point_pattern": "Entry Point Pattern" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/templates/AI-SPEC.md:L89 | neighbors=[3. Framework Quick Reference]
- "templates_ai_spec_eval_tooling": "Eval Tooling" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/templates/AI-SPEC.md:L172 | neighbors=[5. Evaluation Strategy]
- "templates_ai_spec_installation": "Installation" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/templates/AI-SPEC.md:L79 | neighbors=[3. Framework Quick Reference]
- "templates_ai_spec_key_abstractions": "Key Abstractions" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/templates/AI-SPEC.md:L94 | neighbors=[3. Framework Quick Reference]
- "templates_ai_spec_known_failure_modes_in_this_domain": "Known Failure Modes in This Domain" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/templates/AI-SPEC.md:L40 | neighbors=[1b. Domain Context]
- "templates_ai_spec_offline_flywheel": "Offline (Flywheel)" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/templates/AI-SPEC.md:L206 | neighbors=[6. Guardrails]
- "templates_ai_spec_online_real_time": "Online (Real-Time)" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/templates/AI-SPEC.md:L200 | neighbors=[6. Guardrails]
- "templates_ai_spec_prompt_engineering_discipline": "Prompt Engineering Discipline" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/templates/AI-SPEC.md:L150 | neighbors=[4b. AI Systems Best Practices]
- "templates_ai_spec_recommended_project_structure": "Recommended Project Structure" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/templates/AI-SPEC.md:L106 | neighbors=[3. Framework Quick Reference]
- "templates_ai_spec_reference_dataset": "Reference Dataset" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/templates/AI-SPEC.md:L186 | neighbors=[5. Evaluation Strategy]
- "templates_ai_spec_regulatory_compliance_context": "Regulatory / Compliance Context" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/templates/AI-SPEC.md:L44 | neighbors=[1b. Domain Context]
- "templates_ai_spec_structured_outputs_with_pydantic": "Structured Outputs with Pydantic" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/templates/AI-SPEC.md:L137 | neighbors=[4b. AI Systems Best Practices]
- "templates_ai_spec_what_domain_experts_evaluate_against": "What Domain Experts Evaluate Against" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/templates/AI-SPEC.md:L35 | neighbors=[1b. Domain Context]
- "templates_claude_md": "claude-md.md" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/templates/claude-md.md:L1 | neighbors=[CLAUDE.md Template]
- "templates_claude_md_architecture_section": "Architecture Section" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/templates/claude-md.md:L55 | neighbors=[Section Templates]
- "templates_claude_md_conventions_section": "Conventions Section" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/templates/claude-md.md:L41 | neighbors=[Section Templates]
- "templates_claude_md_fallback_behavior": "Fallback Behavior" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/templates/claude-md.md:L140 | neighbors=[CLAUDE.md Template]
- "templates_claude_md_marker_format": "Marker Format" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/templates/claude-md.md:L133 | neighbors=[CLAUDE.md Template]
- "templates_claude_md_profile_section_placeholder_only": "Profile Section (Placeholder Only)" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/templates/claude-md.md:L107 | neighbors=[Section Templates]
- "templates_claude_md_project_section": "Project Section" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/templates/claude-md.md:L13 | neighbors=[Section Templates]
- "templates_claude_md_section_ordering": "Section Ordering" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/templates/claude-md.md:L123 | neighbors=[CLAUDE.md Template]
- "templates_claude_md_skills_section": "Skills Section" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/templates/claude-md.md:L69 | neighbors=[Section Templates]
- "templates_claude_md_stack_section": "Stack Section" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/templates/claude-md.md:L27 | neighbors=[Section Templates]
- "templates_claude_md_workflow_enforcement_section": "Workflow Enforcement Section" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/templates/claude-md.md:L91 | neighbors=[Section Templates]
- "templates_context_conditional_sections": "Conditional sections" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/discuss-phase/templates/context.md:L18 | neighbors=[CONTEXT.md template — for discuss-phase…]
- "templates_context_file_template": "File Template" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/templates/context.md:L15 | neighbors=[Phase Context Template]
- "templates_context_template_body": "Template body" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/discuss-phase/templates/context.md:L25 | neighbors=[CONTEXT.md template — for discuss-phase…]
- "templates_context_variable_substitutions": "Variable substitutions" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/discuss-phase/templates/context.md:L9 | neighbors=[CONTEXT.md template — for discuss-phase…]
- "templates_continue_here": "continue-here.md" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/templates/continue-here.md:L1 | neighbors=[Continue-Here Template]
- "templates_continue_here_continue_here_template": "Continue-Here Template" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/templates/continue-here.md:L1 | neighbors=[continue-here.md]
- "templates_copilot_instructions": "copilot-instructions.md" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/templates/copilot-instructions.md:L1 | neighbors=[Instructions for GSD]
- "templates_copilot_instructions_instructions_for_gsd": "Instructions for GSD" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/templates/copilot-instructions.md:L1 | neighbors=[copilot-instructions.md]
- "templates_debug": "DEBUG.md" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/templates/DEBUG.md:L1 | neighbors=[Debug Template]
- "templates_debug_file_template": "File Template" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/templates/DEBUG.md:L7 | neighbors=[Debug Template]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\PTOW\1_APT_Central_Command\.graphify\description-instructions\batch-383.json

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
