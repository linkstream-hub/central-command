# Node Description Batch 406 of 412

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

- "gsd_extract_learnings_skill": "SKILL.md" | kind=entity | source=.github/skills/gsd-extract-learnings/SKILL.md:L1
- "gsd_fast": "fast.md" | kind=entity | source=.claude/commands/gsd/fast.md:L1
- "gsd_fast_skill": "SKILL.md" | kind=entity | source=.github/skills/gsd-fast/SKILL.md:L1
- "gsd_forensics": "forensics.md" | kind=entity | source=.claude/commands/gsd/forensics.md:L1
- "gsd_forensics_skill": "SKILL.md" | kind=entity | source=.github/skills/gsd-forensics/SKILL.md:L1
- "gsd_health": "health.md" | kind=entity | source=.claude/commands/gsd/health.md:L1
- "gsd_health_skill": "SKILL.md" | kind=entity | source=.github/skills/gsd-health/SKILL.md:L1
- "gsd_help": "help.md" | kind=entity | source=.claude/commands/gsd/help.md:L1
- "gsd_help_skill": "SKILL.md" | kind=entity | source=.github/skills/gsd-help/SKILL.md:L1
- "gsd_import": "import.md" | kind=entity | source=.claude/commands/gsd/import.md:L1
- "gsd_import_skill": "SKILL.md" | kind=entity | source=.github/skills/gsd-import/SKILL.md:L1
- "gsd_inbox": "inbox.md" | kind=entity | source=.claude/commands/gsd/inbox.md:L1
- "gsd_inbox_skill": "SKILL.md" | kind=entity | source=.github/skills/gsd-inbox/SKILL.md:L1
- "gsd_ingest_docs": "ingest-docs.md" | kind=entity | source=.claude/commands/gsd/ingest-docs.md:L1
- "gsd_ingest_docs_skill": "SKILL.md" | kind=entity | source=.github/skills/gsd-ingest-docs/SKILL.md:L1
- "gsd_manager": "manager.md" | kind=entity | source=.claude/commands/gsd/manager.md:L1
- "gsd_manager_skill": "SKILL.md" | kind=entity | source=.github/skills/gsd-manager/SKILL.md:L1
- "gsd_map_codebase": "map-codebase.md" | kind=entity | source=.claude/commands/gsd/map-codebase.md:L1
- "gsd_map_codebase_skill": "SKILL.md" | kind=entity | source=.github/skills/gsd-map-codebase/SKILL.md:L1
- "gsd_milestone_summary": "milestone-summary.md" | kind=entity | source=.claude/commands/gsd/milestone-summary.md:L1
- "gsd_milestone_summary_skill": "SKILL.md" | kind=entity | source=.github/skills/gsd-milestone-summary/SKILL.md:L1
- "gsd_mvp_phase": "mvp-phase.md" | kind=entity | source=.claude/commands/gsd/mvp-phase.md:L1
- "gsd_mvp_phase_skill": "SKILL.md" | kind=entity | source=.github/skills/gsd-mvp-phase/SKILL.md:L1
- "gsd_new_milestone": "new-milestone.md" | kind=entity | source=.claude/commands/gsd/new-milestone.md:L1
- "gsd_new_milestone_skill": "SKILL.md" | kind=entity | source=.github/skills/gsd-new-milestone/SKILL.md:L1
- "gsd_new_project": "new-project.md" | kind=entity | source=.claude/commands/gsd/new-project.md:L1
- "gsd_new_project_skill": "SKILL.md" | kind=entity | source=.github/skills/gsd-new-project/SKILL.md:L1
- "gsd_ns_context": "ns-context.md" | kind=entity | source=.claude/commands/gsd/ns-context.md:L1
- "gsd_ns_context_skill": "SKILL.md" | kind=entity | source=.github/skills/gsd-ns-context/SKILL.md:L1
- "gsd_ns_ideate": "ns-ideate.md" | kind=entity | source=.claude/commands/gsd/ns-ideate.md:L1
- "gsd_ns_ideate_skill": "SKILL.md" | kind=entity | source=.github/skills/gsd-ns-ideate/SKILL.md:L1
- "gsd_ns_manage": "ns-manage.md" | kind=entity | source=.claude/commands/gsd/ns-manage.md:L1
- "gsd_ns_manage_skill": "SKILL.md" | kind=entity | source=.github/skills/gsd-ns-manage/SKILL.md:L1
- "gsd_ns_project": "ns-project.md" | kind=entity | source=.claude/commands/gsd/ns-project.md:L1
- "gsd_ns_project_skill": "SKILL.md" | kind=entity | source=.github/skills/gsd-ns-project/SKILL.md:L1
- "gsd_ns_review": "ns-review.md" | kind=entity | source=.claude/commands/gsd/ns-review.md:L1
- "gsd_ns_review_skill": "SKILL.md" | kind=entity | source=.github/skills/gsd-ns-review/SKILL.md:L1
- "gsd_ns_workflow": "ns-workflow.md" | kind=entity | source=.claude/commands/gsd/ns-workflow.md:L1
- "gsd_ns_workflow_skill": "SKILL.md" | kind=entity | source=.github/skills/gsd-ns-workflow/SKILL.md:L1
- "gsd_pause_work": "pause-work.md" | kind=entity | source=.claude/commands/gsd/pause-work.md:L1

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\PTOW\1_APT_Central_Command\.graphify\description-instructions\batch-405.json

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
