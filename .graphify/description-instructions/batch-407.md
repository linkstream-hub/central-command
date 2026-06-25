# Node Description Batch 408 of 412

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
LANGUAGE: each entry has a `lang=` marker giving the language of its source.
Write that entry's description in EXACTLY that language. Do not translate to
a single common language — match each node's source language individually.
No marketing language.
Respond ONLY with a JSON object mapping each node id (as a string) to its
one-sentence description — no prose, no markdown fences.

- "gsd_ultraplan_phase_skill": "SKILL.md" | kind=entity | source=.github/skills/gsd-ultraplan-phase/SKILL.md:L1 | lang=en
- "gsd_undo": "undo.md" | kind=entity | source=.claude/commands/gsd/undo.md:L1 | lang=en
- "gsd_undo_skill": "SKILL.md" | kind=entity | source=.github/skills/gsd-undo/SKILL.md:L1 | lang=en
- "gsd_update": "update.md" | kind=entity | source=.claude/commands/gsd/update.md:L1 | lang=en
- "gsd_update_skill": "SKILL.md" | kind=entity | source=.github/skills/gsd-update/SKILL.md:L1 | lang=en
- "gsd_validate_phase": "validate-phase.md" | kind=entity | source=.claude/commands/gsd/validate-phase.md:L1 | lang=en
- "gsd_validate_phase_skill": "SKILL.md" | kind=entity | source=.github/skills/gsd-validate-phase/SKILL.md:L1 | lang=en
- "gsd_verify_work": "verify-work.md" | kind=entity | source=.claude/commands/gsd/verify-work.md:L1 | lang=en
- "gsd_verify_work_skill": "SKILL.md" | kind=entity | source=.github/skills/gsd-verify-work/SKILL.md:L1 | lang=en
- "gsd_workspace": "workspace.md" | kind=entity | source=.claude/commands/gsd/workspace.md:L1 | lang=en
- "gsd_workspace_skill": "SKILL.md" | kind=entity | source=.github/skills/gsd-workspace/SKILL.md:L1 | lang=en
- "modular_monolith": "Modular Monolith Pattern" | kind=entity | source=docs/DOMAIN_ARCHITECTURE.md | lang=en
- "next_svg": "Next.js Logo" | kind=entity | source=tech-pwa/public/next.svg | lang=en
- "nextauth_route_get_post": "{ GET, POST }" | kind=code-symbol | source=tech-pwa/src/app/api/auth/[...nextauth]/route.ts:L2 | lang=en
- "org_id_multi_tenancy": "org_id Multi-Tenancy" | kind=entity | source=docs/adr/ADR-005-org-id-multi-tenancy.md | lang=en
- "playwright": "Playwright" | kind=entity | source=docs/PROFESSIONAL_BASELINE.md | lang=en
- "playwright_e2e": "Playwright E2E Testing" | kind=entity | source=docs/guides/testing.md | lang=en
- "professional_baseline": "Professional Baseline" | kind=entity | source=docs/PROFESSIONAL_BASELINE.md | lang=en
- "references_mandatory_initial_read": "mandatory-initial-read.md" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/mandatory-initial-read.md:L1 | lang=en
- "references_questioning": "questioning.md" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/questioning.md:L1 | lang=en
- "remember_remember": "remember.md" | kind=entity | source=.remember/remember.md:L1 | lang=en
- "rule_dual_auth": "Dual Auth Rule" | kind=entity | source=RULES.md | lang=en
- "rule_no_as_any": "No 'as any' Rule" | kind=entity | source=RULES.md | lang=en
- "SchedulePageComponents": "Schedule Page Components" | kind=code-symbol | source=tech-pwa/src/components/dashboard/SchedulePageComponents.tsx | lang=en
- "scripts_compress_rationale_47": "Heuristic denylist for files that must never be shipped to a third-party API." | kind=entity | source=.github/skills/caveman-compress/scripts/compress.py:L47 | lang=en
- "scripts_compress_rationale_60": "Strip outer ```markdown ... ``` fence when it wraps the entire output." | kind=entity | source=.github/skills/caveman-compress/scripts/compress.py:L60 | lang=en
- "scripts_detect_rationale_101": "Return True if the file is natural language and should be compressed." | kind=entity | source=.github/skills/caveman-compress/scripts/detect.py:L101 | lang=en
- "scripts_detect_rationale_33": "Check if a line looks like code." | kind=entity | source=.github/skills/caveman-compress/scripts/detect.py:L33 | lang=pt
- "scripts_detect_rationale_38": "Check if content is valid JSON." | kind=entity | source=.github/skills/caveman-compress/scripts/detect.py:L38 | lang=en
- "scripts_detect_rationale_47": "Heuristic: check if content looks like YAML." | kind=entity | source=.github/skills/caveman-compress/scripts/detect.py:L47 | lang=en
- "scripts_detect_rationale_63": "Classify a file as 'natural_language', 'code', 'config', or 'unknown'.      Retu" | kind=entity | source=.github/skills/caveman-compress/scripts/detect.py:L63 | lang=pt
- "scripts_init_rationale_1": "Caveman compress scripts.  This package provides tools to compress natural langu" | kind=entity | source=.github/skills/caveman-compress/scripts/__init__.py:L1 | lang=en
- "scripts_instinct_cli_rationale_1024": "Export instincts to file." | kind=entity | source=.github/skills/ecc/continuous-learning-v2/scripts/instinct-cli.py:L1024 | lang=en
- "scripts_instinct_cli_rationale_1097": "Analyze instincts and suggest evolutions to skills/commands/agents." | kind=entity | source=.github/skills/ecc/continuous-learning-v2/scripts/instinct-cli.py:L1097 | lang=en
- "scripts_instinct_cli_rationale_1213": "Find instincts that appear in multiple projects (promotion candidates).      Ret" | kind=entity | source=.github/skills/ecc/continuous-learning-v2/scripts/instinct-cli.py:L1213 | lang=en
- "scripts_instinct_cli_rationale_1240": "Show instincts that could be promoted from project to global." | kind=entity | source=.github/skills/ecc/continuous-learning-v2/scripts/instinct-cli.py:L1240 | lang=en
- "scripts_instinct_cli_rationale_1276": "Promote project-scoped instincts to global scope." | kind=entity | source=.github/skills/ecc/continuous-learning-v2/scripts/instinct-cli.py:L1276 | lang=en
- "scripts_instinct_cli_rationale_1288": "Promote a specific instinct by ID from current project to global." | kind=entity | source=.github/skills/ecc/continuous-learning-v2/scripts/instinct-cli.py:L1288 | lang=en
- "scripts_instinct_cli_rationale_1343": "Auto-promote instincts found in multiple projects." | kind=entity | source=.github/skills/ecc/continuous-learning-v2/scripts/instinct-cli.py:L1343 | lang=en
- "scripts_instinct_cli_rationale_1421": "List or maintain known projects and their instinct counts." | kind=entity | source=.github/skills/ecc/continuous-learning-v2/scripts/instinct-cli.py:L1421 | lang=en

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\PTOW\1_APT_Central_Command\.graphify\description-instructions\batch-407.json

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
