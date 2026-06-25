# Node Description Batch 385 of 412

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

- "templates_debug_subagent_prompt": "debug-subagent-prompt.md" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/templates/debug-subagent-prompt.md:L1 | neighbors=[Debug Subagent Prompt Template]
- "templates_debug_subagent_prompt_continuation": "Continuation" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/templates/debug-subagent-prompt.md:L70 | neighbors=[Debug Subagent Prompt Template]
- "templates_debug_subagent_prompt_placeholders": "Placeholders" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/templates/debug-subagent-prompt.md:L36 | neighbors=[Debug Subagent Prompt Template]
- "templates_debug_subagent_prompt_template": "Template" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/templates/debug-subagent-prompt.md:L7 | neighbors=[Debug Subagent Prompt Template]
- "templates_debug_subagent_prompt_usage": "Usage" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/templates/debug-subagent-prompt.md:L52 | neighbors=[Debug Subagent Prompt Template]
- "templates_dev_preferences": "dev-preferences.md" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/templates/dev-preferences.md:L1 | neighbors=[Developer Preferences]
- "templates_dev_preferences_behavioral_directives": "Behavioral Directives" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/templates/dev-preferences.md:L10 | neighbors=[Developer Preferences]
- "templates_dev_preferences_stack_preferences": "Stack Preferences" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/templates/dev-preferences.md:L19 | neighbors=[Developer Preferences]
- "templates_discovery_alternatives_considered": "Alternatives Considered" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/templates/discovery.md:L85 | neighbors=[[Topic] Discovery]
- "templates_discovery_category_1": "[Category 1]" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/templates/discovery.md:L90 | neighbors=[Key Findings]
- "templates_discovery_category_2": "[Category 2]" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/templates/discovery.md:L93 | neighbors=[Key Findings]
- "templates_discovery_code_examples": "Code Examples" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/templates/discovery.md:L96 | neighbors=[[Topic] Discovery]
- "templates_discovery_file_template": "File Template" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/templates/discovery.md:L11 | neighbors=[Discovery Template]
- "templates_discovery_metadata": "Metadata" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/templates/discovery.md:L99 | neighbors=[[Topic] Discovery]
- "templates_discovery_primary_recommendation": "Primary Recommendation" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/templates/discovery.md:L82 | neighbors=[[Topic] Discovery]
- "templates_discovery_summary": "Summary" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/templates/discovery.md:L79 | neighbors=[[Topic] Discovery]
- "templates_discussion_log_format": "Format" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/templates/discussion-log.md:L9 | neighbors=[Discussion Log Template]
- "templates_discussion_log_purpose": "Purpose" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/discuss-phase/templates/discussion-log.md:L7 | neighbors=[DISCUSSION-LOG.md template — for discus…]
- "templates_discussion_log_rules": "Rules" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/templates/discussion-log.md:L56 | neighbors=[Discussion Log Template]
- "templates_discussion_log_template_body": "Template body" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/discuss-phase/templates/discussion-log.md:L12 | neighbors=[DISCUSSION-LOG.md template — for discus…]
- "templates_milestone": "milestone.md" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/templates/milestone.md:L1 | neighbors=[Milestone Entry Template]
- "templates_milestone_archive_file_template": "File Template" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/templates/milestone-archive.md:L7 | neighbors=[Milestone Archive Template]
- "templates_milestone_archive_milestone_summary": "Milestone Summary" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/templates/milestone-archive.md:L57 | neighbors=[Milestone v{{VERSION}}: {{MILESTONE_NAM…]
- "templates_milestone_archive_overview": "Overview" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/templates/milestone-archive.md:L15 | neighbors=[Milestone v{{VERSION}}: {{MILESTONE_NAM…]
- "templates_milestone_archive_phase_2_1_critical_security_patch_inserted": "Phase 2.1: Critical Security Patch (INSERTED)" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/templates/milestone-archive.md:L42 | neighbors=[Phases]
- "templates_milestone_archive_phase_phase_num_phase_name": "Phase {{PHASE_NUM}}: {{PHASE_NAME}}" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/templates/milestone-archive.md:L25 | neighbors=[Phases]
- "templates_milestone_archive_usage_guidelines": "Usage Guidelines" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/templates/milestone-archive.md:L96 | neighbors=[Milestone v{{VERSION}}: {{MILESTONE_NAM…]
- "templates_milestone_milestone_entry_template": "Milestone Entry Template" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/templates/milestone.md:L1 | neighbors=[milestone.md]
- "templates_phase_prompt": "phase-prompt.md" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/templates/phase-prompt.md:L1 | neighbors=[Phase Prompt Template]
- "templates_phase_prompt_anti_patterns": "Anti-Patterns" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/templates/phase-prompt.md:L437 | neighbors=[Phase Prompt Template]
- "templates_phase_prompt_context_section": "Context Section" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/templates/phase-prompt.md:L213 | neighbors=[Phase Prompt Template]
- "templates_phase_prompt_examples": "Examples" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/templates/phase-prompt.md:L303 | neighbors=[Phase Prompt Template]
- "templates_phase_prompt_file_template": "File Template" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/templates/phase-prompt.md:L12 | neighbors=[Phase Prompt Template]
- "templates_phase_prompt_frontmatter_fields": "Frontmatter Fields" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/templates/phase-prompt.md:L130 | neighbors=[Phase Prompt Template]
- "templates_phase_prompt_guidelines": "Guidelines" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/templates/phase-prompt.md:L502 | neighbors=[Phase Prompt Template]
- "templates_phase_prompt_must_haves_goal_backward_verification": "Must-Haves (Goal-Backward Verification)" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/templates/phase-prompt.md:L547 | neighbors=[Phase Prompt Template]
- "templates_phase_prompt_parallel_vs_sequential": "Parallel vs Sequential" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/templates/phase-prompt.md:L151 | neighbors=[Phase Prompt Template]
- "templates_phase_prompt_scope_guidance": "Scope Guidance" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/templates/phase-prompt.md:L245 | neighbors=[Phase Prompt Template]
- "templates_phase_prompt_task_types": "Task Types" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/templates/phase-prompt.md:L285 | neighbors=[Phase Prompt Template]
- "templates_phase_prompt_tdd_plans": "TDD Plans" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/templates/phase-prompt.md:L273 | neighbors=[Phase Prompt Template]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\PTOW\1_APT_Central_Command\.graphify\description-instructions\batch-384.json

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
