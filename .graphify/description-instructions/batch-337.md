# Node Description Batch 338 of 412

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

- "modes_advisor_calibration_tier": "Calibration tier" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/discuss-phase/modes/advisor.md:L23 | neighbors=[Advisor mode — research-backed comparis…]
- "modes_advisor_discuss_areas_advisor_table_first_flow": "discuss_areas (advisor table-first flow)" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/discuss-phase/modes/advisor.md:L130 | neighbors=[Advisor mode — research-backed comparis…]
- "modes_advisor_non_technical_owner_detection": "Non-technical owner detection" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/discuss-phase/modes/advisor.md:L43 | neighbors=[Advisor mode — research-backed comparis…]
- "modes_advisor_scope_creep_handling_advisor_mode": "Scope creep handling (advisor mode)" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/discuss-phase/modes/advisor.md:L165 | neighbors=[Advisor mode — research-backed comparis…]
- "modes_all": "all.md" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/discuss-phase/modes/all.md:L1 | neighbors=[--all mode — auto-select ALL gray areas…]
- "modes_all_combination_rules": "Combination rules" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/discuss-phase/modes/all.md:L21 | neighbors=[--all mode — auto-select ALL gray areas…]
- "modes_all_effect": "Effect" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/discuss-phase/modes/all.md:L6 | neighbors=[--all mode — auto-select ALL gray areas…]
- "modes_all_why_this_mode_exists": "Why this mode exists" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/discuss-phase/modes/all.md:L16 | neighbors=[--all mode — auto-select ALL gray areas…]
- "modes_analyze": "analyze.md" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/discuss-phase/modes/analyze.md:L1 | neighbors=[--analyze mode — trade-off tables befor…]
- "modes_analyze_effect": "Effect" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/discuss-phase/modes/analyze.md:L7 | neighbors=[--analyze mode — trade-off tables befor…]
- "modes_analyze_example": "Example" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/discuss-phase/modes/analyze.md:L15 | neighbors=[--analyze mode — trade-off tables befor…]
- "modes_analyze_sourcing_the_analysis": "Sourcing the analysis" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/discuss-phase/modes/analyze.md:L37 | neighbors=[--analyze mode — trade-off tables befor…]
- "modes_auto": "auto.md" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/discuss-phase/modes/auto.md:L1 | neighbors=[--auto mode — fully autonomous discuss-…]
- "modes_auto_combination_rules": "Combination rules" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/discuss-phase/modes/auto.md:L49 | neighbors=[--auto mode — fully autonomous discuss-…]
- "modes_auto_critical_auto_mode_pass_cap": "CRITICAL — Auto-mode pass cap" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/discuss-phase/modes/auto.md:L32 | neighbors=[--auto mode — fully autonomous discuss-…]
- "modes_auto_effect_across_steps": "Effect across steps" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/discuss-phase/modes/auto.md:L8 | neighbors=[--auto mode — fully autonomous discuss-…]
- "modes_batch": "batch.md" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/discuss-phase/modes/batch.md:L1 | neighbors=[--batch mode — grouped question batches]
- "modes_batch_argument_parsing": "Argument parsing" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/discuss-phase/modes/batch.md:L7 | neighbors=[--batch mode — grouped question batches]
- "modes_batch_effect_on_discuss_areas": "Effect on discuss_areas" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/discuss-phase/modes/batch.md:L16 | neighbors=[--batch mode — grouped question batches]
- "modes_batch_example_batch": "Example batch" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/discuss-phase/modes/batch.md:L41 | neighbors=[--batch mode — grouped question batches]
- "modes_batch_philosophy": "Philosophy" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/discuss-phase/modes/batch.md:L32 | neighbors=[--batch mode — grouped question batches]
- "modes_chain": "chain.md" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/discuss-phase/modes/chain.md:L1 | neighbors=[--chain mode — interactive discuss, the…]
- "modes_chain_auto_advance_step_executed_by_the_parent_file": "auto_advance step (executed by the parent file)" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/discuss-phase/modes/chain.md:L16 | neighbors=[--chain mode — interactive discuss, the…]
- "modes_chain_effect": "Effect" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/discuss-phase/modes/chain.md:L7 | neighbors=[--chain mode — interactive discuss, the…]
- "modes_default": "default.md" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/discuss-phase/modes/default.md:L1 | neighbors=[Default mode — interactive discuss-phase]
- "modes_default_discuss_areas_default_interactive": "discuss_areas (default, interactive)" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/discuss-phase/modes/default.md:L14 | neighbors=[Default mode — interactive discuss-phase]
- "modes_power": "power.md" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/discuss-phase/modes/power.md:L1 | neighbors=[--power mode — bulk question generation…]
- "modes_power_combination_rules": "Combination rules" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/discuss-phase/modes/power.md:L39 | neighbors=[--power mode — bulk question generation…]
- "modes_power_dispatch": "Dispatch" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/discuss-phase/modes/power.md:L8 | neighbors=[--power mode — bulk question generation…]
- "modes_power_summary_of_flow": "Summary of flow" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/discuss-phase/modes/power.md:L16 | neighbors=[--power mode — bulk question generation…]
- "modes_power_when_to_use": "When to use" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/discuss-phase/modes/power.md:L33 | neighbors=[--power mode — bulk question generation…]
- "modes_text": "text.md" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/discuss-phase/modes/text.md:L1 | neighbors=[--text mode — plain-text overlay (no As…]
- "modes_text_activation": "Activation" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/discuss-phase/modes/text.md:L17 | neighbors=[--text mode — plain-text overlay (no As…]
- "modes_text_effect": "Effect" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/discuss-phase/modes/text.md:L7 | neighbors=[--text mode — plain-text overlay (no As…]
- "modes_text_empty_answer_handling": "Empty-answer handling" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/discuss-phase/modes/text.md:L51 | neighbors=[--text mode — plain-text overlay (no As…]
- "modes_text_question_rendering": "Question rendering" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/discuss-phase/modes/text.md:L25 | neighbors=[--text mode — plain-text overlay (no As…]
- "n8n_event_bus": "n8n Event Bus" | kind=entity | source=docs/adr/ADR-007-n8n-as-event-bus.md | neighbors=[EventBus Module]
- "n8n_readme": "README.md" | kind=entity | source=tools/n8n/README.md:L1 | neighbors=[n8n Workflow Version Control — PTOW ADW]
- "n8n_readme_directory_layout": "Directory Layout" | kind=entity | source=tools/n8n/README.md:L8 | neighbors=[n8n Workflow Version Control — PTOW ADW]
- "n8n_readme_enabling_the_n8n_rest_api": "Enabling the n8n REST API" | kind=entity | source=tools/n8n/README.md:L88 | neighbors=[n8n Workflow Version Control — PTOW ADW]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\PTOW\1_APT_Central_Command\.graphify\description-instructions\batch-337.json

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
