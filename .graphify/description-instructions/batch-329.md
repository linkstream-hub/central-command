# Node Description Batch 330 of 412

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

- "gsd_quick_list_subcommand": "LIST subcommand" | kind=entity | source=.claude/commands/gsd/quick.md:L63 | neighbors=[quick.md]
- "gsd_quick_resume_subcommand": "RESUME subcommand" | kind=entity | source=.claude/commands/gsd/quick.md:L127 | neighbors=[quick.md]
- "gsd_quick_run_subcommand_default": "RUN subcommand (default)" | kind=entity | source=.claude/commands/gsd/quick.md:L153 | neighbors=[quick.md]
- "gsd_quick_skill_list_subcommand": "LIST subcommand" | kind=entity | source=.github/skills/gsd-quick/SKILL.md:L55 | neighbors=[SKILL.md]
- "gsd_quick_skill_resume_subcommand": "RESUME subcommand" | kind=entity | source=.github/skills/gsd-quick/SKILL.md:L119 | neighbors=[SKILL.md]
- "gsd_quick_skill_run_subcommand_default": "RUN subcommand (default)" | kind=entity | source=.github/skills/gsd-quick/SKILL.md:L145 | neighbors=[SKILL.md]
- "gsd_quick_skill_status_subcommand": "STATUS subcommand" | kind=entity | source=.github/skills/gsd-quick/SKILL.md:L94 | neighbors=[SKILL.md]
- "gsd_quick_status_subcommand": "STATUS subcommand" | kind=entity | source=.claude/commands/gsd/quick.md:L102 | neighbors=[quick.md]
- "gsd_surface_disable_cluster": "disable \\<cluster\\>" | kind=entity | source=.claude/commands/gsd/surface.md:L77 | neighbors=[surface.md]
- "gsd_surface_enable_cluster": "enable \\<cluster\\>" | kind=entity | source=.claude/commands/gsd/surface.md:L94 | neighbors=[surface.md]
- "gsd_surface_error_handling": "Error handling" | kind=entity | source=.claude/commands/gsd/surface.md:L143 | neighbors=[surface.md]
- "gsd_surface_list_status": "list / status" | kind=entity | source=.claude/commands/gsd/surface.md:L37 | neighbors=[surface.md]
- "gsd_surface_profile_name": "profile \\<name\\>" | kind=entity | source=.claude/commands/gsd/surface.md:L63 | neighbors=[surface.md]
- "gsd_surface_reset": "reset" | kind=entity | source=.claude/commands/gsd/surface.md:L107 | neighbors=[surface.md]
- "gsd_surface_runtimeconfigdir_resolution": "runtimeConfigDir resolution" | kind=entity | source=.claude/commands/gsd/surface.md:L116 | neighbors=[surface.md]
- "gsd_surface_skill_disable_cluster": "disable \\<cluster\\>" | kind=entity | source=.github/skills/gsd-surface/SKILL.md:L74 | neighbors=[SKILL.md]
- "gsd_surface_skill_enable_cluster": "enable \\<cluster\\>" | kind=entity | source=.github/skills/gsd-surface/SKILL.md:L91 | neighbors=[SKILL.md]
- "gsd_surface_skill_error_handling": "Error handling" | kind=entity | source=.github/skills/gsd-surface/SKILL.md:L140 | neighbors=[SKILL.md]
- "gsd_surface_skill_list_status": "list / status" | kind=entity | source=.github/skills/gsd-surface/SKILL.md:L34 | neighbors=[SKILL.md]
- "gsd_surface_skill_profile_name": "profile \\<name\\>" | kind=entity | source=.github/skills/gsd-surface/SKILL.md:L60 | neighbors=[SKILL.md]
- "gsd_surface_skill_reset": "reset" | kind=entity | source=.github/skills/gsd-surface/SKILL.md:L104 | neighbors=[SKILL.md]
- "gsd_surface_skill_runtimeconfigdir_resolution": "runtimeConfigDir resolution" | kind=entity | source=.github/skills/gsd-surface/SKILL.md:L113 | neighbors=[SKILL.md]
- "gsd_surface_skill_sub_command_routing": "Sub-command routing" | kind=entity | source=.github/skills/gsd-surface/SKILL.md:L17 | neighbors=[SKILL.md]
- "gsd_surface_sub_command_routing": "Sub-command routing" | kind=entity | source=.claude/commands/gsd/surface.md:L20 | neighbors=[surface.md]
- "gsd_workstreams": "workstreams.md" | kind=entity | source=.claude/commands/gsd/workstreams.md:L1 | neighbors=[/gsd-workstreams]
- "gsd_workstreams_complete": "complete" | kind=entity | source=.claude/commands/gsd/workstreams.md:L60 | neighbors=[Step 2: Execute Operation]
- "gsd_workstreams_create": "create" | kind=entity | source=.claude/commands/gsd/workstreams.md:L41 | neighbors=[Step 2: Execute Operation]
- "gsd_workstreams_list": "list" | kind=entity | source=.claude/commands/gsd/workstreams.md:L37 | neighbors=[Step 2: Execute Operation]
- "gsd_workstreams_progress": "progress" | kind=entity | source=.claude/commands/gsd/workstreams.md:L56 | neighbors=[Step 2: Execute Operation]
- "gsd_workstreams_resume": "resume" | kind=entity | source=.claude/commands/gsd/workstreams.md:L64 | neighbors=[Step 2: Execute Operation]
- "gsd_workstreams_skill": "SKILL.md" | kind=entity | source=.github/skills/gsd-workstreams/SKILL.md:L1 | neighbors=[/gsd-workstreams]
- "gsd_workstreams_skill_complete": "complete" | kind=entity | source=.github/skills/gsd-workstreams/SKILL.md:L58 | neighbors=[Step 2: Execute Operation]
- "gsd_workstreams_skill_create": "create" | kind=entity | source=.github/skills/gsd-workstreams/SKILL.md:L39 | neighbors=[Step 2: Execute Operation]
- "gsd_workstreams_skill_list": "list" | kind=entity | source=.github/skills/gsd-workstreams/SKILL.md:L35 | neighbors=[Step 2: Execute Operation]
- "gsd_workstreams_skill_progress": "progress" | kind=entity | source=.github/skills/gsd-workstreams/SKILL.md:L54 | neighbors=[Step 2: Execute Operation]
- "gsd_workstreams_skill_resume": "resume" | kind=entity | source=.github/skills/gsd-workstreams/SKILL.md:L62 | neighbors=[Step 2: Execute Operation]
- "gsd_workstreams_skill_status": "status" | kind=entity | source=.github/skills/gsd-workstreams/SKILL.md:L44 | neighbors=[Step 2: Execute Operation]
- "gsd_workstreams_skill_step_1_parse_subcommand": "Step 1: Parse Subcommand" | kind=entity | source=.github/skills/gsd-workstreams/SKILL.md:L28 | neighbors=[/gsd-workstreams]
- "gsd_workstreams_skill_step_3_display_results": "Step 3: Display Results" | kind=entity | source=.github/skills/gsd-workstreams/SKILL.md:L65 | neighbors=[/gsd-workstreams]
- "gsd_workstreams_skill_subcommands": "Subcommands" | kind=entity | source=.github/skills/gsd-workstreams/SKILL.md:L16 | neighbors=[Usage]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\PTOW\1_APT_Central_Command\.graphify\description-instructions\batch-329.json

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
