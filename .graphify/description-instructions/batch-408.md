# Node Description Batch 409 of 412

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

- "scripts_instinct_cli_rationale_148": "Validate and resolve a file path, guarding against path traversal.      Raises V" | kind=entity | source=.github/skills/ecc/continuous-learning-v2/scripts/instinct-cli.py:L148 | lang=en
- "scripts_instinct_cli_rationale_1615": "Generate skill/command/agent files from analyzed instinct clusters." | kind=entity | source=.github/skills/ecc/continuous-learning-v2/scripts/instinct-cli.py:L1615 | lang=en
- "scripts_instinct_cli_rationale_1693": "Return all pending instinct directories (global + per-project)." | kind=entity | source=.github/skills/ecc/continuous-learning-v2/scripts/instinct-cli.py:L1693 | lang=en
- "scripts_instinct_cli_rationale_1708": "Parse the 'created' date from YAML frontmatter of an instinct file.      Falls b" | kind=entity | source=.github/skills/ecc/continuous-learning-v2/scripts/instinct-cli.py:L1708 | lang=en
- "scripts_instinct_cli_rationale_175": "Validate instinct IDs before using them in filenames." | kind=entity | source=.github/skills/ecc/continuous-learning-v2/scripts/instinct-cli.py:L175 | lang=en
- "scripts_instinct_cli_rationale_1752": "Scan all pending directories and return info about each pending instinct.      E" | kind=entity | source=.github/skills/ecc/continuous-learning-v2/scripts/instinct-cli.py:L1752 | lang=en
- "scripts_instinct_cli_rationale_1784": "Delete pending instincts older than the TTL threshold." | kind=entity | source=.github/skills/ecc/continuous-learning-v2/scripts/instinct-cli.py:L1784 | lang=en
- "scripts_instinct_cli_rationale_188": "Validate remote instinct imports before opening a network connection." | kind=entity | source=.github/skills/ecc/continuous-learning-v2/scripts/instinct-cli.py:L188 | lang=pt
- "scripts_instinct_cli_rationale_220": "Fetch a validated remote instinct file with bounded size and timeout." | kind=entity | source=.github/skills/ecc/continuous-learning-v2/scripts/instinct-cli.py:L220 | lang=en
- "scripts_instinct_cli_rationale_237": "Quote a string for safe YAML frontmatter serialization.      Uses double quotes" | kind=entity | source=.github/skills/ecc/continuous-learning-v2/scripts/instinct-cli.py:L237 | lang=en
- "scripts_instinct_cli_rationale_265": "Return the main worktree root when project_root is a linked worktree." | kind=entity | source=.github/skills/ecc/continuous-learning-v2/scripts/instinct-cli.py:L265 | lang=en
- "scripts_instinct_cli_rationale_285": "Detect current project context. Returns dict with id, name, root, project_dir." | kind=entity | source=.github/skills/ecc/continuous-learning-v2/scripts/instinct-cli.py:L285 | lang=en
- "scripts_instinct_cli_rationale_398": "Update the projects.json registry.      Uses file locking (where available) to p" | kind=entity | source=.github/skills/ecc/continuous-learning-v2/scripts/instinct-cli.py:L398 | lang=en
- "scripts_instinct_cli_rationale_439": "Load the projects registry." | kind=entity | source=.github/skills/ecc/continuous-learning-v2/scripts/instinct-cli.py:L439 | lang=en
- "scripts_instinct_cli_rationale_448": "Write the project registry atomically." | kind=entity | source=.github/skills/ecc/continuous-learning-v2/scripts/instinct-cli.py:L448 | lang=en
- "scripts_instinct_cli_rationale_472": "Parse YAML-like instinct file format.      Each instinct is delimited by a pair" | kind=entity | source=.github/skills/ecc/continuous-learning-v2/scripts/instinct-cli.py:L472 | lang=en
- "scripts_instinct_cli_rationale_526": "Load instincts from a single directory." | kind=entity | source=.github/skills/ecc/continuous-learning-v2/scripts/instinct-cli.py:L526 | lang=en
- "scripts_instinct_cli_rationale_642": "Load all instincts: project-scoped + global.      Project-scoped instincts take" | kind=entity | source=.github/skills/ecc/continuous-learning-v2/scripts/instinct-cli.py:L642 | lang=en
- "scripts_instinct_cli_rationale_677": "Load only project-scoped instincts (no global).      In global fallback mode (no" | kind=entity | source=.github/skills/ecc/continuous-learning-v2/scripts/instinct-cli.py:L677 | lang=en
- "scripts_instinct_cli_rationale_693": "Show status of all instincts (project + global)." | kind=entity | source=.github/skills/ecc/continuous-learning-v2/scripts/instinct-cli.py:L693 | lang=en
- "scripts_instinct_cli_rationale_766": "Warn if legacy ~/.claude/homunculus/ contains data while the active     path has" | kind=entity | source=.github/skills/ecc/continuous-learning-v2/scripts/instinct-cli.py:L766 | lang=en
- "scripts_instinct_cli_rationale_800": "Helper to print instincts grouped by domain." | kind=entity | source=.github/skills/ecc/continuous-learning-v2/scripts/instinct-cli.py:L800 | lang=en
- "scripts_instinct_cli_rationale_835": "Import instincts from file or URL." | kind=entity | source=.github/skills/ecc/continuous-learning-v2/scripts/instinct-cli.py:L835 | lang=en
- "scripts_test_parse_instinct_rationale_1": "Tests for continuous-learning-v2 instinct-cli.py  Covers:   - parse_instinct_fil" | kind=entity | source=.github/skills/ecc/continuous-learning-v2/scripts/test_parse_instinct.py:L1 | lang=en
- "scripts_test_parse_instinct_rationale_115": "Patch module-level globals to use tmp_path-based directories." | kind=entity | source=.github/skills/ecc/continuous-learning-v2/scripts/test_parse_instinct.py:L115 | lang=en
- "scripts_test_parse_instinct_rationale_127": "Create project directory structure and return a project dict." | kind=entity | source=.github/skills/ecc/continuous-learning-v2/scripts/test_parse_instinct.py:L127 | lang=en
- "scripts_test_parse_instinct_rationale_225": "Instincts without an 'id' field should be silently dropped." | kind=entity | source=.github/skills/ecc/continuous-learning-v2/scripts/test_parse_instinct.py:L225 | lang=en
- "scripts_test_parse_instinct_rationale_316": "Tilde expansion should work." | kind=entity | source=.github/skills/ecc/continuous-learning-v2/scripts/test_parse_instinct.py:L316 | lang=en
- "scripts_test_parse_instinct_rationale_322": "Relative paths should be resolved." | kind=entity | source=.github/skills/ecc/continuous-learning-v2/scripts/test_parse_instinct.py:L322 | lang=en
- "scripts_test_parse_instinct_rationale_331": "Remote imports should not downgrade to plaintext HTTP." | kind=entity | source=.github/skills/ecc/continuous-learning-v2/scripts/test_parse_instinct.py:L331 | lang=en
- "scripts_test_parse_instinct_rationale_337": "Remote imports should not resolve to private or loopback addresses." | kind=entity | source=.github/skills/ecc/continuous-learning-v2/scripts/test_parse_instinct.py:L337 | lang=en
- "scripts_test_parse_instinct_rationale_361": "When no git and no env var, should return global project." | kind=entity | source=.github/skills/ecc/continuous-learning-v2/scripts/test_parse_instinct.py:L361 | lang=en
- "scripts_test_parse_instinct_rationale_376": "CLAUDE_PROJECT_DIR env var should be used as project root." | kind=entity | source=.github/skills/ecc/continuous-learning-v2/scripts/test_parse_instinct.py:L376 | lang=en
- "scripts_test_parse_instinct_rationale_397": "Git timeout should fall through to global." | kind=entity | source=.github/skills/ecc/continuous-learning-v2/scripts/test_parse_instinct.py:L397 | lang=en
- "scripts_test_parse_instinct_rationale_411": "detect_project should create the project dir structure." | kind=entity | source=.github/skills/ecc/continuous-learning-v2/scripts/test_parse_instinct.py:L411 | lang=en
- "scripts_test_parse_instinct_rationale_446": "Loaded instincts should have _source_file, _source_type, _scope_label." | kind=entity | source=.github/skills/ecc/continuous-learning-v2/scripts/test_parse_instinct.py:L446 | lang=en
- "scripts_test_parse_instinct_rationale_458": "If an instinct has no 'scope' in frontmatter, it should default to scope_label." | kind=entity | source=.github/skills/ecc/continuous-learning-v2/scripts/test_parse_instinct.py:L458 | lang=en
- "scripts_test_parse_instinct_rationale_475": "If frontmatter has explicit scope, it should be preserved." | kind=entity | source=.github/skills/ecc/continuous-learning-v2/scripts/test_parse_instinct.py:L475 | lang=en
- "scripts_test_parse_instinct_rationale_486": "Corrupt YAML files should be warned about but not crash." | kind=entity | source=.github/skills/ecc/continuous-learning-v2/scripts/test_parse_instinct.py:L486 | lang=en
- "scripts_test_parse_instinct_rationale_535": "Should load from both project and global directories." | kind=entity | source=.github/skills/ecc/continuous-learning-v2/scripts/test_parse_instinct.py:L535 | lang=en

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\PTOW\1_APT_Central_Command\.graphify\description-instructions\batch-408.json

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
