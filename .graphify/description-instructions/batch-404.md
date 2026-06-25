# Node Description Batch 405 of 412

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

- "entity_re_acq": "RE-ACQ" | kind=entity | source=docs/DOMAIN_ARCHITECTURE.md
- "file_svg": "file.svg" | kind=entity | source=tech-pwa/public/file.svg
- "file_weekly_schedule_page_tsx": "weekly-schedule/page.tsx" | kind=code-symbol | source=tech-pwa/src/app/weekly-schedule/page.tsx
- "gas_workspace_bridge": "GAS as Workspace Bridge" | kind=entity | source=docs/adr/ADR-003-gas-as-google-workspace-bridge.md
- "globe_icon": "Globe Icon (SVG)" | kind=entity | source=tech-pwa/public/globe.svg
- "gsd_add_tests": "add-tests.md" | kind=entity | source=.claude/commands/gsd/add-tests.md:L1
- "gsd_add_tests_skill": "SKILL.md" | kind=entity | source=.github/skills/gsd-add-tests/SKILL.md:L1
- "gsd_ai_integration_phase": "ai-integration-phase.md" | kind=entity | source=.claude/commands/gsd/ai-integration-phase.md:L1
- "gsd_ai_integration_phase_skill": "SKILL.md" | kind=entity | source=.github/skills/gsd-ai-integration-phase/SKILL.md:L1
- "gsd_audit_fix": "audit-fix.md" | kind=entity | source=.claude/commands/gsd/audit-fix.md:L1
- "gsd_audit_fix_skill": "SKILL.md" | kind=entity | source=.github/skills/gsd-audit-fix/SKILL.md:L1
- "gsd_audit_milestone": "audit-milestone.md" | kind=entity | source=.claude/commands/gsd/audit-milestone.md:L1
- "gsd_audit_milestone_skill": "SKILL.md" | kind=entity | source=.github/skills/gsd-audit-milestone/SKILL.md:L1
- "gsd_audit_uat": "audit-uat.md" | kind=entity | source=.claude/commands/gsd/audit-uat.md:L1
- "gsd_audit_uat_skill": "SKILL.md" | kind=entity | source=.github/skills/gsd-audit-uat/SKILL.md:L1
- "gsd_autonomous": "autonomous.md" | kind=entity | source=.claude/commands/gsd/autonomous.md:L1
- "gsd_autonomous_skill": "SKILL.md" | kind=entity | source=.github/skills/gsd-autonomous/SKILL.md:L1
- "gsd_capture": "capture.md" | kind=entity | source=.claude/commands/gsd/capture.md:L1
- "gsd_capture_skill": "SKILL.md" | kind=entity | source=.github/skills/gsd-capture/SKILL.md:L1
- "gsd_cleanup": "cleanup.md" | kind=entity | source=.claude/commands/gsd/cleanup.md:L1
- "gsd_cleanup_skill": "SKILL.md" | kind=entity | source=.github/skills/gsd-cleanup/SKILL.md:L1
- "gsd_code_review": "code-review.md" | kind=entity | source=.claude/commands/gsd/code-review.md:L1
- "gsd_code_review_skill": "SKILL.md" | kind=entity | source=.github/skills/gsd-code-review/SKILL.md:L1
- "gsd_complete_milestone": "complete-milestone.md" | kind=entity | source=.claude/commands/gsd/complete-milestone.md:L1
- "gsd_complete_milestone_skill": "SKILL.md" | kind=entity | source=.github/skills/gsd-complete-milestone/SKILL.md:L1
- "gsd_config": "config.md" | kind=entity | source=.claude/commands/gsd/config.md:L1
- "gsd_config_skill": "SKILL.md" | kind=entity | source=.github/skills/gsd-config/SKILL.md:L1
- "gsd_debug": "debug.md" | kind=entity | source=.claude/commands/gsd/debug.md:L1
- "gsd_debug_skill": "SKILL.md" | kind=entity | source=.github/skills/gsd-debug/SKILL.md:L1
- "gsd_discuss_phase": "discuss-phase.md" | kind=entity | source=.claude/commands/gsd/discuss-phase.md:L1
- "gsd_discuss_phase_skill": "SKILL.md" | kind=entity | source=.github/skills/gsd-discuss-phase/SKILL.md:L1
- "gsd_docs_update": "docs-update.md" | kind=entity | source=.claude/commands/gsd/docs-update.md:L1
- "gsd_docs_update_skill": "SKILL.md" | kind=entity | source=.github/skills/gsd-docs-update/SKILL.md:L1
- "gsd_eval_review": "eval-review.md" | kind=entity | source=.claude/commands/gsd/eval-review.md:L1
- "gsd_eval_review_skill": "SKILL.md" | kind=entity | source=.github/skills/gsd-eval-review/SKILL.md:L1
- "gsd_execute_phase": "execute-phase.md" | kind=entity | source=.claude/commands/gsd/execute-phase.md:L1
- "gsd_execute_phase_skill": "SKILL.md" | kind=entity | source=.github/skills/gsd-execute-phase/SKILL.md:L1
- "gsd_explore": "explore.md" | kind=entity | source=.claude/commands/gsd/explore.md:L1
- "gsd_explore_skill": "SKILL.md" | kind=entity | source=.github/skills/gsd-explore/SKILL.md:L1
- "gsd_extract_learnings": "extract-learnings.md" | kind=entity | source=.claude/commands/gsd/extract-learnings.md:L1

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\PTOW\1_APT_Central_Command\.graphify\description-instructions\batch-404.json

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
