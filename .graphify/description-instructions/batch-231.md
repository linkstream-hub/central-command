# Node Description Batch 232 of 412

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

- "github_skills_impeccable_reference_typeset_md_reference_typeset_establish_hierarchy": "Establish Hierarchy" | kind=entity | source=.github/skills/impeccable/reference/typeset.md:L64 | neighbors=[Improve Typography Systematically]
- "github_skills_impeccable_reference_typeset_md_reference_typeset_fix_readability": "Fix Readability" | kind=entity | source=.github/skills/impeccable/reference/typeset.md:L73 | neighbors=[Improve Typography Systematically]
- "github_skills_impeccable_reference_typeset_md_reference_typeset_fluid_type": "Fluid Type" | kind=entity | source=.github/skills/impeccable/reference/typeset.md:L223 | neighbors=[Modern Web Typography]
- "github_skills_impeccable_reference_typeset_md_reference_typeset_font_selection": "Font Selection" | kind=entity | source=.github/skills/impeccable/reference/typeset.md:L57 | neighbors=[Improve Typography Systematically]
- "github_skills_impeccable_reference_typeset_md_reference_typeset_live_mode_signature_params": "Live-mode signature params" | kind=entity | source=.github/skills/impeccable/reference/typeset.md:L114 | neighbors=[typeset.md]
- "github_skills_impeccable_reference_typeset_md_reference_typeset_modular_scale_hierarchy": "Modular Scale & Hierarchy" | kind=entity | source=.github/skills/impeccable/reference/typeset.md:L140 | neighbors=[Classic Typography Principles]
- "github_skills_impeccable_reference_typeset_md_reference_typeset_opentype_features": "OpenType Features" | kind=entity | source=.github/skills/impeccable/reference/typeset.md:L235 | neighbors=[Modern Web Typography]
- "github_skills_impeccable_reference_typeset_md_reference_typeset_pairing_principles": "Pairing Principles" | kind=entity | source=.github/skills/impeccable/reference/typeset.md:L177 | neighbors=[Font Selection & Pairing]
- "github_skills_impeccable_reference_typeset_md_reference_typeset_plan_typography_improvements": "Plan Typography Improvements" | kind=entity | source=.github/skills/impeccable/reference/typeset.md:L44 | neighbors=[typeset.md]
- "github_skills_impeccable_reference_typeset_md_reference_typeset_readability_measure": "Readability & Measure" | kind=entity | source=.github/skills/impeccable/reference/typeset.md:L156 | neighbors=[Classic Typography Principles]
- "github_skills_impeccable_reference_typeset_md_reference_typeset_refine_details": "Refine Details" | kind=entity | source=.github/skills/impeccable/reference/typeset.md:L80 | neighbors=[Improve Typography Systematically]
- "github_skills_impeccable_reference_typeset_md_reference_typeset_register": "Register" | kind=entity | source=.github/skills/impeccable/reference/typeset.md:L5 | neighbors=[typeset.md]
- "github_skills_impeccable_reference_typeset_md_reference_typeset_rendering_polish": "Rendering polish" | kind=entity | source=.github/skills/impeccable/reference/typeset.md:L255 | neighbors=[Modern Web Typography]
- "github_skills_impeccable_reference_typeset_md_reference_typeset_typography_system_architecture": "Typography System Architecture" | kind=entity | source=.github/skills/impeccable/reference/typeset.md:L264 | neighbors=[Typography]
- "github_skills_impeccable_reference_typeset_md_reference_typeset_verify_typography_improvements": "Verify Typography Improvements" | kind=entity | source=.github/skills/impeccable/reference/typeset.md:L103 | neighbors=[typeset.md]
- "github_skills_impeccable_reference_typeset_md_reference_typeset_vertical_rhythm": "Vertical Rhythm" | kind=entity | source=.github/skills/impeccable/reference/typeset.md:L136 | neighbors=[Classic Typography Principles]
- "github_skills_impeccable_reference_typeset_md_reference_typeset_web_font_loading": "Web Font Loading" | kind=entity | source=.github/skills/impeccable/reference/typeset.md:L186 | neighbors=[Font Selection & Pairing]
- "github_skills_impeccable_reference_typeset_md_reference_typeset_weight_consistency": "Weight Consistency" | kind=entity | source=.github/skills/impeccable/reference/typeset.md:L87 | neighbors=[Improve Typography Systematically]
- "github_skills_impeccable_skill_md_impeccable_skill_absolute_bans": "Absolute bans" | kind=entity | source=.github/skills/impeccable/SKILL.md:L77 | neighbors=[Design guidance]
- "github_skills_impeccable_skill_md_impeccable_skill_color": "Color" | kind=entity | source=.github/skills/impeccable/SKILL.md:L28 | neighbors=[General rules]
- "github_skills_impeccable_skill_md_impeccable_skill_color_theme": "Color & Theme" | kind=entity | source=.github/skills/impeccable/SKILL.md:L65 | neighbors=[New projects only (when no prior work e…]
- "github_skills_impeccable_skill_md_impeccable_skill_interaction": "Interaction" | kind=entity | source=.github/skills/impeccable/SKILL.md:L59 | neighbors=[General rules]
- "github_skills_impeccable_skill_md_impeccable_skill_layout": "Layout" | kind=entity | source=.github/skills/impeccable/SKILL.md:L41 | neighbors=[General rules]
- "github_skills_impeccable_skill_md_impeccable_skill_motion": "Motion" | kind=entity | source=.github/skills/impeccable/SKILL.md:L49 | neighbors=[General rules]
- "github_skills_impeccable_skill_md_impeccable_skill_pin_unpin": "Pin / Unpin" | kind=entity | source=.github/skills/impeccable/SKILL.md:L154 | neighbors=[SKILL.md]
- "github_skills_impeccable_skill_md_impeccable_skill_routing_rules": "Routing rules" | kind=entity | source=.github/skills/impeccable/SKILL.md:L129 | neighbors=[Commands]
- "github_skills_impeccable_skill_md_impeccable_skill_setup": "Setup" | kind=entity | source=.github/skills/impeccable/SKILL.md:L12 | neighbors=[SKILL.md]
- "github_skills_impeccable_skill_md_impeccable_skill_the_ai_slop_test": "The AI slop test" | kind=entity | source=.github/skills/impeccable/SKILL.md:L90 | neighbors=[Design guidance]
- "github_skills_impeccable_skill_md_impeccable_skill_typography": "Typography" | kind=entity | source=.github/skills/impeccable/SKILL.md:L33 | neighbors=[General rules]
- "gmail_route_jobschema": "jobSchema" | kind=code-symbol | source=tech-pwa/src/app/api/webhooks/n8n/gmail/route.ts:L12 | neighbors=[route.ts]
- "graphify_skill": "SKILL.md" | kind=entity | source=.github/skills/graphify/SKILL.md:L1 | neighbors=[/graphify]
- "graphify_skill_for_graphify_add_and_watch": "For /graphify add and --watch" | kind=entity | source=.github/skills/graphify/SKILL.md:L619 | neighbors=[/graphify]
- "graphify_skill_for_graphify_query": "For /graphify query" | kind=entity | source=.github/skills/graphify/SKILL.md:L607 | neighbors=[/graphify]
- "graphify_skill_for_the_commit_hook_and_native_claude_md_integration": "For the commit hook and native CLAUDE.md integration" | kind=entity | source=.github/skills/graphify/SKILL.md:L625 | neighbors=[/graphify]
- "graphify_skill_for_update_and_cluster_only": "For --update and --cluster-only" | kind=entity | source=.github/skills/graphify/SKILL.md:L601 | neighbors=[/graphify]
- "graphify_skill_honesty_rules": "Honesty Rules" | kind=entity | source=.github/skills/graphify/SKILL.md:L644 | neighbors=[/graphify]
- "graphify_skill_interpreter_guard_for_subcommands": "Interpreter guard for subcommands" | kind=entity | source=.github/skills/graphify/SKILL.md:L583 | neighbors=[/graphify]
- "graphify_skill_part_a_structural_extraction_for_code_files": "Part A - Structural extraction for code files" | kind=entity | source=.github/skills/graphify/SKILL.md:L185 | neighbors=[Step 3 - Extract entities and relations…]
- "graphify_skill_part_b_semantic_extraction_parallel_subagents": "Part B - Semantic extraction (parallel subagents)" | kind=entity | source=.github/skills/graphify/SKILL.md:L211 | neighbors=[Step 3 - Extract entities and relations…]
- "graphify_skill_part_c_merge_ast_semantic_into_final_extraction": "Part C - Merge AST + semantic into final extraction" | kind=entity | source=.github/skills/graphify/SKILL.md:L356 | neighbors=[Step 3 - Extract entities and relations…]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\PTOW\1_APT_Central_Command\.graphify\description-instructions\batch-231.json

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
