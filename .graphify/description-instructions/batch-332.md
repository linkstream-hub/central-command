# Node Description Batch 333 of 412

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

- "hookify_rules_skill_advanced_format_multiple_conditions": "Advanced Format (Multiple Conditions)" | kind=entity | source=.github/skills/ecc/hookify-rules/SKILL.md:L38 | neighbors=[Rule File Format]
- "hookify_rules_skill_bash_events": "bash Events" | kind=entity | source=.github/skills/ecc/hookify-rules/SKILL.md:L68 | neighbors=[Event Type Guide]
- "hookify_rules_skill_basic_structure": "Basic Structure" | kind=entity | source=.github/skills/ecc/hookify-rules/SKILL.md:L14 | neighbors=[Rule File Format]
- "hookify_rules_skill_commands": "Commands" | kind=entity | source=.github/skills/ecc/hookify-rules/SKILL.md:L110 | neighbors=[Writing Hookify Rules]
- "hookify_rules_skill_common_pitfalls": "Common Pitfalls" | kind=entity | source=.github/skills/ecc/hookify-rules/SKILL.md:L94 | neighbors=[Pattern Writing Tips]
- "hookify_rules_skill_file_events": "file Events" | kind=entity | source=.github/skills/ecc/hookify-rules/SKILL.md:L74 | neighbors=[Event Type Guide]
- "hookify_rules_skill_file_organization": "File Organization" | kind=entity | source=.github/skills/ecc/hookify-rules/SKILL.md:L104 | neighbors=[Writing Hookify Rules]
- "hookify_rules_skill_frontmatter_fields": "Frontmatter Fields" | kind=entity | source=.github/skills/ecc/hookify-rules/SKILL.md:L28 | neighbors=[Rule File Format]
- "hookify_rules_skill_overview": "Overview" | kind=entity | source=.github/skills/ecc/hookify-rules/SKILL.md:L8 | neighbors=[Writing Hookify Rules]
- "hookify_rules_skill_prompt_events": "prompt Events" | kind=entity | source=.github/skills/ecc/hookify-rules/SKILL.md:L83 | neighbors=[Event Type Guide]
- "hookify_rules_skill_quick_reference": "Quick Reference" | kind=entity | source=.github/skills/ecc/hookify-rules/SKILL.md:L117 | neighbors=[Writing Hookify Rules]
- "hookify_rules_skill_regex_basics": "Regex Basics" | kind=entity | source=.github/skills/ecc/hookify-rules/SKILL.md:L88 | neighbors=[Pattern Writing Tips]
- "hookify_rules_skill_stop_events": "stop Events" | kind=entity | source=.github/skills/ecc/hookify-rules/SKILL.md:L80 | neighbors=[Event Type Guide]
- "hookify_rules_skill_testing": "Testing" | kind=entity | source=.github/skills/ecc/hookify-rules/SKILL.md:L99 | neighbors=[Pattern Writing Tips]
- "hooks_gsd_check_update_cachedir": "cacheDir" | kind=code-symbol | source=.claude/hooks/gsd-check-update.js:L37 | neighbors=[gsd-check-update.js]
- "hooks_gsd_check_update_cachefile": "cacheFile" | kind=code-symbol | source=.claude/hooks/gsd-check-update.js:L38 | neighbors=[gsd-check-update.js]
- "hooks_gsd_check_update_child": "child" | kind=code-symbol | source=.claude/hooks/gsd-check-update.js:L54 | neighbors=[gsd-check-update.js]
- "hooks_gsd_check_update_cwd": "cwd" | kind=code-symbol | source=.claude/hooks/gsd-check-update.js:L14 | neighbors=[gsd-check-update.js]
- "hooks_gsd_check_update_detectconfigdir": "detectConfigDir()" | kind=code-symbol | source=.claude/hooks/gsd-check-update.js:L18 | neighbors=[gsd-check-update.js]
- "hooks_gsd_check_update_fs": "fs" | kind=code-symbol | source=.claude/hooks/gsd-check-update.js:L6 | neighbors=[gsd-check-update.js]
- "hooks_gsd_check_update_globalconfigdir": "globalConfigDir" | kind=code-symbol | source=.claude/hooks/gsd-check-update.js:L32 | neighbors=[gsd-check-update.js]
- "hooks_gsd_check_update_globalversionfile": "globalVersionFile" | kind=code-symbol | source=.claude/hooks/gsd-check-update.js:L42 | neighbors=[gsd-check-update.js]
- "hooks_gsd_check_update_homedir": "homeDir" | kind=code-symbol | source=.claude/hooks/gsd-check-update.js:L13 | neighbors=[gsd-check-update.js]
- "hooks_gsd_check_update_os": "os" | kind=code-symbol | source=.claude/hooks/gsd-check-update.js:L8 | neighbors=[gsd-check-update.js]
- "hooks_gsd_check_update_path": "path" | kind=code-symbol | source=.claude/hooks/gsd-check-update.js:L7 | neighbors=[gsd-check-update.js]
- "hooks_gsd_check_update_projectconfigdir": "projectConfigDir" | kind=code-symbol | source=.claude/hooks/gsd-check-update.js:L33 | neighbors=[gsd-check-update.js]
- "hooks_gsd_check_update_projectversionfile": "projectVersionFile" | kind=code-symbol | source=.claude/hooks/gsd-check-update.js:L41 | neighbors=[gsd-check-update.js]
- "hooks_gsd_check_update_spawn": "{ spawn }" | kind=code-symbol | source=.claude/hooks/gsd-check-update.js:L9 | neighbors=[gsd-check-update.js]
- "hooks_gsd_check_update_updatecachefilename": "{ updateCacheFileName }" | kind=code-symbol | source=.claude/hooks/gsd-check-update.js:L11 | neighbors=[gsd-check-update.js]
- "hooks_gsd_check_update_worker_checklatestversion": "{ checkLatestVersion }" | kind=code-symbol | source=.claude/hooks/gsd-check-update-worker.js:L21 | neighbors=[gsd-check-update-worker.js]
- "hooks_gsd_check_update_worker_fs": "fs" | kind=code-symbol | source=.claude/hooks/gsd-check-update-worker.js:L12 | neighbors=[gsd-check-update-worker.js]
- "hooks_gsd_check_update_worker_issemvernewer": "{ isSemverNewer }" | kind=code-symbol | source=.claude/hooks/gsd-check-update-worker.js:L14 | neighbors=[gsd-check-update-worker.js]
- "hooks_gsd_check_update_worker_managed_hooks": "MANAGED_HOOKS" | kind=code-symbol | source=.claude/hooks/gsd-check-update-worker.js:L29 | neighbors=[gsd-check-update-worker.js]
- "hooks_gsd_check_update_worker_package_name": "{ PACKAGE_NAME }" | kind=code-symbol | source=.claude/hooks/gsd-check-update-worker.js:L22 | neighbors=[gsd-check-update-worker.js]
- "hooks_gsd_check_update_worker_path": "path" | kind=code-symbol | source=.claude/hooks/gsd-check-update-worker.js:L13 | neighbors=[gsd-check-update-worker.js]
- "hooks_gsd_check_update_worker_result": "result" | kind=code-symbol | source=.claude/hooks/gsd-check-update-worker.js:L97 | neighbors=[gsd-check-update-worker.js]
- "hooks_gsd_check_update_worker_stalehooks": "staleHooks" | kind=code-symbol | source=.claude/hooks/gsd-check-update-worker.js:L61 | neighbors=[gsd-check-update-worker.js]
- "hooks_gsd_check_update_workerpath": "workerPath" | kind=code-symbol | source=.claude/hooks/gsd-check-update.js:L53 | neighbors=[gsd-check-update.js]
- "hooks_gsd_config_reload_fs": "fs" | kind=code-symbol | source=.claude/hooks/gsd-config-reload.js:L21 | neighbors=[gsd-config-reload.js]
- "hooks_gsd_config_reload_path": "path" | kind=code-symbol | source=.claude/hooks/gsd-config-reload.js:L22 | neighbors=[gsd-config-reload.js]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\PTOW\1_APT_Central_Command\.graphify\description-instructions\batch-332.json

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
