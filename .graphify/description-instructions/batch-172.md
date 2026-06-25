# Node Description Batch 173 of 412

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

- "caveman_compress_skill_preserve_exactly_never_modify": "Preserve EXACTLY (never modify)" | kind=entity | source=.github/skills/caveman-compress/SKILL.md:L48 | neighbors=[Compression Rules]
- "caveman_compress_skill_preserve_structure": "Preserve Structure" | kind=entity | source=.github/skills/caveman-compress/SKILL.md:L59 | neighbors=[Compression Rules]
- "caveman_compress_skill_process": "Process" | kind=entity | source=.github/skills/caveman-compress/SKILL.md:L20 | neighbors=[Caveman Compress]
- "caveman_compress_skill_purpose": "Purpose" | kind=entity | source=.github/skills/caveman-compress/SKILL.md:L12 | neighbors=[Caveman Compress]
- "caveman_compress_skill_remove": "Remove" | kind=entity | source=.github/skills/caveman-compress/SKILL.md:L40 | neighbors=[Compression Rules]
- "caveman_compress_skill_trigger": "Trigger" | kind=entity | source=.github/skills/caveman-compress/SKILL.md:L16 | neighbors=[Caveman Compress]
- "caveman_help_readme": "README.md" | kind=entity | source=.github/skills/caveman-help/README.md:L1 | neighbors=[caveman-help]
- "caveman_help_readme_example_output": "Example output" | kind=entity | source=.github/skills/caveman-help/README.md:L17 | neighbors=[caveman-help]
- "caveman_help_readme_how_to_invoke": "How to invoke" | kind=entity | source=.github/skills/caveman-help/README.md:L9 | neighbors=[caveman-help]
- "caveman_help_readme_see_also": "See also" | kind=entity | source=.github/skills/caveman-help/README.md:L35 | neighbors=[caveman-help]
- "caveman_help_readme_what_it_does": "What it does" | kind=entity | source=.github/skills/caveman-help/README.md:L5 | neighbors=[caveman-help]
- "caveman_help_skill": "SKILL.md" | kind=entity | source=.github/skills/caveman-help/SKILL.md:L1 | neighbors=[Caveman Help]
- "caveman_help_skill_configure_default_mode": "Configure Default Mode" | kind=entity | source=.github/skills/caveman-help/SKILL.md:L39 | neighbors=[Caveman Help]
- "caveman_help_skill_deactivate": "Deactivate" | kind=entity | source=.github/skills/caveman-help/SKILL.md:L35 | neighbors=[Caveman Help]
- "caveman_help_skill_modes": "Modes" | kind=entity | source=.github/skills/caveman-help/SKILL.md:L13 | neighbors=[Caveman Help]
- "caveman_help_skill_more": "More" | kind=entity | source=.github/skills/caveman-help/SKILL.md:L57 | neighbors=[Caveman Help]
- "caveman_help_skill_skills": "Skills" | kind=entity | source=.github/skills/caveman-help/SKILL.md:L26 | neighbors=[Caveman Help]
- "caveman_readme": "README.md" | kind=entity | source=.github/skills/caveman/README.md:L1 | neighbors=[caveman]
- "caveman_readme_example_output": "Example output" | kind=entity | source=.github/skills/caveman/README.md:L32 | neighbors=[caveman]
- "caveman_readme_how_to_invoke": "How to invoke" | kind=entity | source=.github/skills/caveman/README.md:L22 | neighbors=[caveman]
- "caveman_readme_see_also": "See also" | kind=entity | source=.github/skills/caveman/README.md:L45 | neighbors=[caveman]
- "caveman_readme_what_it_does": "What it does" | kind=entity | source=.github/skills/caveman/README.md:L5 | neighbors=[caveman]
- "caveman_review_readme": "README.md" | kind=entity | source=.github/skills/caveman-review/README.md:L1 | neighbors=[caveman-review]
- "caveman_review_readme_example_output": "Example output" | kind=entity | source=.github/skills/caveman-review/README.md:L21 | neighbors=[caveman-review]
- "caveman_review_readme_how_to_invoke": "How to invoke" | kind=entity | source=.github/skills/caveman-review/README.md:L13 | neighbors=[caveman-review]
- "caveman_review_readme_see_also": "See also" | kind=entity | source=.github/skills/caveman-review/README.md:L30 | neighbors=[caveman-review]
- "caveman_review_readme_what_it_does": "What it does" | kind=entity | source=.github/skills/caveman-review/README.md:L5 | neighbors=[caveman-review]
- "caveman_review_skill_auto_clarity": "Auto-Clarity" | kind=entity | source=.github/skills/caveman-review/SKILL.md:L49 | neighbors=[SKILL.md]
- "caveman_review_skill_boundaries": "Boundaries" | kind=entity | source=.github/skills/caveman-review/SKILL.md:L53 | neighbors=[SKILL.md]
- "caveman_review_skill_examples": "Examples" | kind=entity | source=.github/skills/caveman-review/SKILL.md:L35 | neighbors=[SKILL.md]
- "caveman_review_skill_rules": "Rules" | kind=entity | source=.github/skills/caveman-review/SKILL.md:L12 | neighbors=[SKILL.md]
- "caveman_skill_auto_clarity": "Auto-Clarity" | kind=entity | source=.github/skills/caveman/SKILL.md:L54 | neighbors=[SKILL.md]
- "caveman_skill_boundaries": "Boundaries" | kind=entity | source=.github/skills/caveman/SKILL.md:L72 | neighbors=[SKILL.md]
- "caveman_skill_intensity": "Intensity" | kind=entity | source=.github/skills/caveman/SKILL.md:L28 | neighbors=[SKILL.md]
- "caveman_skill_persistence": "Persistence" | kind=entity | source=.github/skills/caveman/SKILL.md:L13 | neighbors=[SKILL.md]
- "caveman_skill_rules": "Rules" | kind=entity | source=.github/skills/caveman/SKILL.md:L19 | neighbors=[SKILL.md]
- "caveman_stats_readme": "README.md" | kind=entity | source=.github/skills/caveman-stats/README.md:L1 | neighbors=[caveman-stats]
- "caveman_stats_readme_example_output": "Example output" | kind=entity | source=.github/skills/caveman-stats/README.md:L17 | neighbors=[caveman-stats]
- "caveman_stats_readme_how_to_invoke": "How to invoke" | kind=entity | source=.github/skills/caveman-stats/README.md:L11 | neighbors=[caveman-stats]
- "caveman_stats_readme_see_also": "See also" | kind=entity | source=.github/skills/caveman-stats/README.md:L27 | neighbors=[caveman-stats]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\PTOW\1_APT_Central_Command\.graphify\description-instructions\batch-172.json

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
