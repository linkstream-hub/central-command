# Node Description Batch 184 of 412

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

- "claude_gsd_migration_journal_2026_06_11t06_43_03_745z_bafae770ef4d5711_rollback_get_shit_done_templates_context_md_templates_context": "context.md" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/templates/context.md:L1 | neighbors=[Phase Context Template] | lang=en
- "claude_gsd_migration_journal_2026_06_11t06_43_03_745z_bafae770ef4d5711_rollback_get_shit_done_templates_discussion_log_md_templates_discussion_log": "discussion-log.md" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/templates/discussion-log.md:L1 | neighbors=[Discussion Log Template] | lang=en
- "claude_gsd_migration_journal_2026_06_11t06_43_03_745z_bafae770ef4d5711_rollback_get_shit_done_workflows_discuss_phase_templates_context_md_templates_context": "context.md" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/discuss-phase/templates/context.md:L1 | neighbors=[CONTEXT.md template — for discuss-phase…] | lang=en
- "claude_gsd_migration_journal_2026_06_11t06_43_03_745z_bafae770ef4d5711_rollback_get_shit_done_workflows_discuss_phase_templates_discussion_log_md_templates_discussion_log": "discussion-log.md" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/workflows/discuss-phase/templates/discussion-log.md:L1 | neighbors=[DISCUSSION-LOG.md template — for discus…] | lang=en
- "claude_invariants": "INVARIANTS" | kind=entity | source=CLAUDE.md:L146 | neighbors=[Ops reference. Non-narrative. Load refs…] | lang=en
- "claude_issue_tracker": "Issue tracker" | kind=entity | source=CLAUDE.md:L181 | neighbors=[Agent skills] | lang=en
- "claude_never_run": "NEVER RUN" | kind=entity | source=CLAUDE.md:L159 | neighbors=[Ops reference. Non-narrative. Load refs…] | lang=en
- "claude_refs_load_on_demand_do_not_pre_load": "REFS (load on demand — do not pre-load)" | kind=entity | source=CLAUDE.md:L34 | neighbors=[Ops reference. Non-narrative. Load refs…] | lang=pt
- "claude_roles": "ROLES" | kind=entity | source=CLAUDE.md:L54 | neighbors=[Ops reference. Non-narrative. Load refs…] | lang=en
- "claude_scripts_changeset_readme_md_changeset_readme": "README.md" | kind=entity | source=.claude/scripts/changeset/README.md:L1 | neighbors=[changeset/ — release-notes tooling] | lang=en
- "claude_scripts_changeset_readme_md_changeset_readme_examples": "Examples" | kind=entity | source=.claude/scripts/changeset/README.md:L102 | neighbors=[`cli.cjs extract`] | lang=en
- "claude_scripts_changeset_readme_md_changeset_readme_exit_codes": "Exit codes" | kind=entity | source=.claude/scripts/changeset/README.md:L58 | neighbors=[`cli.cjs extract`] | lang=en
- "claude_scripts_changeset_readme_md_changeset_readme_flags": "Flags" | kind=entity | source=.claude/scripts/changeset/README.md:L31 | neighbors=[`cli.cjs extract`] | lang=en
- "claude_scripts_changeset_readme_md_changeset_readme_output_shape": "Output shape" | kind=entity | source=.claude/scripts/changeset/README.md:L80 | neighbors=[`cli.cjs extract`] | lang=en
- "claude_scripts_changeset_readme_md_changeset_readme_version_validation": "Version validation" | kind=entity | source=.claude/scripts/changeset/README.md:L41 | neighbors=[`cli.cjs extract`] | lang=en
- "claude_sprint_protocol_every_sprint": "SPRINT PROTOCOL (every sprint)" | kind=entity | source=CLAUDE.md:L76 | neighbors=[Ops reference. Non-narrative. Load refs…] | lang=en
- "claude_stack": "STACK" | kind=entity | source=CLAUDE.md:L20 | neighbors=[Ops reference. Non-narrative. Load refs…] | lang=en
- "claude_system": "SYSTEM" | kind=entity | source=CLAUDE.md:L6 | neighbors=[Ops reference. Non-narrative. Load refs…] | lang=en
- "claude_triage_labels": "Triage labels" | kind=entity | source=CLAUDE.md:L185 | neighbors=[Agent skills] | lang=en
- "claw_code_army": "Claw-Code Army" | kind=entity | source=docs/CLAW_CODE_CC_INTEGRATION.md | neighbors=[Central Command 2.0] | lang=en
- "code_addtomasterdirectory": "addToMasterDirectory()" | kind=code-symbol | source=Code.js:L1174 | neighbors=[Code.js] | lang=en
- "code_dismissnewcontact": "dismissNewContact()" | kind=code-symbol | source=Code.js:L1209 | neighbors=[Code.js] | lang=en
- "code_fmtaddr": "fmtAddr()" | kind=code-symbol | source=Code.js:L1146 | neighbors=[Code.js] | lang=en
- "code_getgmailthread": "getGmailThread()" | kind=code-symbol | source=Code.js:L1259 | neighbors=[Code.js] | lang=en
- "code_morningauditreport": "morningAuditReport()" | kind=code-symbol | source=Code.js:L1394 | neighbors=[Code.js] | lang=en
- "code_replytothread": "replyToThread()" | kind=code-symbol | source=Code.js:L1306 | neighbors=[Code.js] | lang=en
- "code_senddashboardemail": "sendDashboardEmail()" | kind=code-symbol | source=Code.js:L1220 | neighbors=[Code.js] | lang=en
- "code_setuptrigger": "setupTrigger()" | kind=code-symbol | source=Code.js:L1160 | neighbors=[Code.js] | lang=en
- "code_tour_skill": "SKILL.md" | kind=entity | source=.github/skills/ecc/code-tour/SKILL.md:L1 | neighbors=[Code Tour] | lang=en
- "code_tour_skill_1_discover": "1. Discover" | kind=entity | source=.github/skills/ecc/code-tour/SKILL.md:L44 | neighbors=[Workflow] | lang=en
- "code_tour_skill_2_infer_the_reader": "2. Infer the reader" | kind=entity | source=.github/skills/ecc/code-tour/SKILL.md:L54 | neighbors=[Workflow] | lang=en
- "code_tour_skill_3_read_and_verify_anchors": "3. Read and verify anchors" | kind=entity | source=.github/skills/ecc/code-tour/SKILL.md:L69 | neighbors=[Workflow] | lang=en
- "code_tour_skill_4_write_the_tour": "4. Write the `.tour`" | kind=entity | source=.github/skills/ecc/code-tour/SKILL.md:L79 | neighbors=[Workflow] | lang=en
- "code_tour_skill_5_validate": "5. Validate" | kind=entity | source=.github/skills/ecc/code-tour/SKILL.md:L89 | neighbors=[Workflow] | lang=en
- "code_tour_skill_anti_patterns": "Anti-Patterns" | kind=entity | source=.github/skills/ecc/code-tour/SKILL.md:L212 | neighbors=[Code Tour] | lang=en
- "code_tour_skill_best_practices": "Best Practices" | kind=entity | source=.github/skills/ecc/code-tour/SKILL.md:L223 | neighbors=[Code Tour] | lang=en
- "code_tour_skill_content": "Content" | kind=entity | source=.github/skills/ecc/code-tour/SKILL.md:L99 | neighbors=[Step Types] | lang=en
- "code_tour_skill_directory": "Directory" | kind=entity | source=.github/skills/ecc/code-tour/SKILL.md:L109 | neighbors=[Step Types] | lang=en
- "code_tour_skill_example": "Example" | kind=entity | source=.github/skills/ecc/code-tour/SKILL.md:L178 | neighbors=[Code Tour] | lang=en
- "code_tour_skill_file_line": "File + line" | kind=entity | source=.github/skills/ecc/code-tour/SKILL.md:L117 | neighbors=[Step Types] | lang=en

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\PTOW\1_APT_Central_Command\.graphify\description-instructions\batch-183.json

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
