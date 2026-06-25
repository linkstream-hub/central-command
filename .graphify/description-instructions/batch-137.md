# Node Description Batch 138 of 412

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

- "agents_skills_archive_impeccable_reference_quieter_md_reference_quieter_register": "Register" | kind=entity | source=.agents/skills_archive/impeccable/reference/quieter.md:L5 | neighbors=[quieter.md]
- "agents_skills_archive_impeccable_reference_quieter_md_reference_quieter_simplification": "Simplification" | kind=entity | source=.agents/skills_archive/impeccable/reference/quieter.md:L65 | neighbors=[Refine the Design]
- "agents_skills_archive_impeccable_reference_quieter_md_reference_quieter_verify_quality": "Verify Quality" | kind=entity | source=.agents/skills_archive/impeccable/reference/quieter.md:L90 | neighbors=[quieter.md]
- "agents_skills_archive_impeccable_reference_quieter_md_reference_quieter_visual_weight_reduction": "Visual Weight Reduction" | kind=entity | source=.agents/skills_archive/impeccable/reference/quieter.md:L59 | neighbors=[Refine the Design]
- "agents_skills_archive_impeccable_reference_shape_md_reference_shape_anti_goals": "Anti-Goals" | kind=entity | source=.agents/skills_archive/impeccable/reference/shape.md:L68 | neighbors=[Phase 1: Discovery Interview]
- "agents_skills_archive_impeccable_reference_shape_md_reference_shape_brief_structure": "Brief Structure" | kind=entity | source=.agents/skills_archive/impeccable/reference/shape.md:L125 | neighbors=[Phase 2: Design Brief]
- "agents_skills_archive_impeccable_reference_shape_md_reference_shape_constraints": "Constraints" | kind=entity | source=.agents/skills_archive/impeccable/reference/shape.md:L62 | neighbors=[Phase 1: Discovery Interview]
- "agents_skills_archive_impeccable_reference_shape_md_reference_shape_content_data": "Content & Data" | kind=entity | source=.agents/skills_archive/impeccable/reference/shape.md:L36 | neighbors=[Phase 1: Discovery Interview]
- "agents_skills_archive_impeccable_reference_shape_md_reference_shape_design_direction": "Design Direction" | kind=entity | source=.agents/skills_archive/impeccable/reference/shape.md:L43 | neighbors=[Phase 1: Discovery Interview]
- "agents_skills_archive_impeccable_reference_shape_md_reference_shape_how_to_use_the_probes": "How to use the probes" | kind=entity | source=.agents/skills_archive/impeccable/reference/shape.md:L97 | neighbors=[Phase 1.5: Visual Direction Probe (Capa…]
- "agents_skills_archive_impeccable_reference_shape_md_reference_shape_important_limits": "Important limits" | kind=entity | source=.agents/skills_archive/impeccable/reference/shape.md:L104 | neighbors=[Phase 1.5: Visual Direction Probe (Capa…]
- "agents_skills_archive_impeccable_reference_shape_md_reference_shape_interview_cadence": "Interview cadence" | kind=entity | source=.agents/skills_archive/impeccable/reference/shape.md:L17 | neighbors=[Phase 1: Discovery Interview]
- "agents_skills_archive_impeccable_reference_shape_md_reference_shape_philosophy": "Philosophy" | kind=entity | source=.agents/skills_archive/impeccable/reference/shape.md:L7 | neighbors=[shape.md]
- "agents_skills_archive_impeccable_reference_shape_md_reference_shape_purpose_context": "Purpose & Context" | kind=entity | source=.agents/skills_archive/impeccable/reference/shape.md:L30 | neighbors=[Phase 1: Discovery Interview]
- "agents_skills_archive_impeccable_reference_shape_md_reference_shape_scope": "Scope" | kind=entity | source=.agents/skills_archive/impeccable/reference/shape.md:L51 | neighbors=[Phase 1: Discovery Interview]
- "agents_skills_archive_impeccable_reference_shape_md_reference_shape_what_to_generate": "What to generate" | kind=entity | source=.agents/skills_archive/impeccable/reference/shape.md:L86 | neighbors=[Phase 1.5: Visual Direction Probe (Capa…]
- "agents_skills_archive_impeccable_reference_typeset_md_reference_typeset_accessibility_considerations": "Accessibility Considerations" | kind=entity | source=.agents/skills_archive/impeccable/reference/typeset.md:L268 | neighbors=[Typography]
- "agents_skills_archive_impeccable_reference_typeset_md_reference_typeset_anti_reflexes_worth_defending_against": "Anti-reflexes worth defending against" | kind=entity | source=.agents/skills_archive/impeccable/reference/typeset.md:L168 | neighbors=[Font Selection & Pairing]
- "agents_skills_archive_impeccable_reference_typeset_md_reference_typeset_assess_current_typography": "Assess Current Typography" | kind=entity | source=.agents/skills_archive/impeccable/reference/typeset.md:L13 | neighbors=[typeset.md]
- "agents_skills_archive_impeccable_reference_typeset_md_reference_typeset_establish_hierarchy": "Establish Hierarchy" | kind=entity | source=.agents/skills_archive/impeccable/reference/typeset.md:L64 | neighbors=[Improve Typography Systematically]
- "agents_skills_archive_impeccable_reference_typeset_md_reference_typeset_fix_readability": "Fix Readability" | kind=entity | source=.agents/skills_archive/impeccable/reference/typeset.md:L73 | neighbors=[Improve Typography Systematically]
- "agents_skills_archive_impeccable_reference_typeset_md_reference_typeset_fluid_type": "Fluid Type" | kind=entity | source=.agents/skills_archive/impeccable/reference/typeset.md:L223 | neighbors=[Modern Web Typography]
- "agents_skills_archive_impeccable_reference_typeset_md_reference_typeset_font_selection": "Font Selection" | kind=entity | source=.agents/skills_archive/impeccable/reference/typeset.md:L57 | neighbors=[Improve Typography Systematically]
- "agents_skills_archive_impeccable_reference_typeset_md_reference_typeset_live_mode_signature_params": "Live-mode signature params" | kind=entity | source=.agents/skills_archive/impeccable/reference/typeset.md:L114 | neighbors=[typeset.md]
- "agents_skills_archive_impeccable_reference_typeset_md_reference_typeset_modular_scale_hierarchy": "Modular Scale & Hierarchy" | kind=entity | source=.agents/skills_archive/impeccable/reference/typeset.md:L140 | neighbors=[Classic Typography Principles]
- "agents_skills_archive_impeccable_reference_typeset_md_reference_typeset_opentype_features": "OpenType Features" | kind=entity | source=.agents/skills_archive/impeccable/reference/typeset.md:L235 | neighbors=[Modern Web Typography]
- "agents_skills_archive_impeccable_reference_typeset_md_reference_typeset_pairing_principles": "Pairing Principles" | kind=entity | source=.agents/skills_archive/impeccable/reference/typeset.md:L177 | neighbors=[Font Selection & Pairing]
- "agents_skills_archive_impeccable_reference_typeset_md_reference_typeset_plan_typography_improvements": "Plan Typography Improvements" | kind=entity | source=.agents/skills_archive/impeccable/reference/typeset.md:L44 | neighbors=[typeset.md]
- "agents_skills_archive_impeccable_reference_typeset_md_reference_typeset_readability_measure": "Readability & Measure" | kind=entity | source=.agents/skills_archive/impeccable/reference/typeset.md:L156 | neighbors=[Classic Typography Principles]
- "agents_skills_archive_impeccable_reference_typeset_md_reference_typeset_refine_details": "Refine Details" | kind=entity | source=.agents/skills_archive/impeccable/reference/typeset.md:L80 | neighbors=[Improve Typography Systematically]
- "agents_skills_archive_impeccable_reference_typeset_md_reference_typeset_register": "Register" | kind=entity | source=.agents/skills_archive/impeccable/reference/typeset.md:L5 | neighbors=[typeset.md]
- "agents_skills_archive_impeccable_reference_typeset_md_reference_typeset_rendering_polish": "Rendering polish" | kind=entity | source=.agents/skills_archive/impeccable/reference/typeset.md:L255 | neighbors=[Modern Web Typography]
- "agents_skills_archive_impeccable_reference_typeset_md_reference_typeset_typography_system_architecture": "Typography System Architecture" | kind=entity | source=.agents/skills_archive/impeccable/reference/typeset.md:L264 | neighbors=[Typography]
- "agents_skills_archive_impeccable_reference_typeset_md_reference_typeset_verify_typography_improvements": "Verify Typography Improvements" | kind=entity | source=.agents/skills_archive/impeccable/reference/typeset.md:L103 | neighbors=[typeset.md]
- "agents_skills_archive_impeccable_reference_typeset_md_reference_typeset_vertical_rhythm": "Vertical Rhythm" | kind=entity | source=.agents/skills_archive/impeccable/reference/typeset.md:L136 | neighbors=[Classic Typography Principles]
- "agents_skills_archive_impeccable_reference_typeset_md_reference_typeset_web_font_loading": "Web Font Loading" | kind=entity | source=.agents/skills_archive/impeccable/reference/typeset.md:L186 | neighbors=[Font Selection & Pairing]
- "agents_skills_archive_impeccable_reference_typeset_md_reference_typeset_weight_consistency": "Weight Consistency" | kind=entity | source=.agents/skills_archive/impeccable/reference/typeset.md:L87 | neighbors=[Improve Typography Systematically]
- "agents_skills_archive_impeccable_skill_md_impeccable_skill_absolute_bans": "Absolute bans" | kind=entity | source=.agents/skills_archive/impeccable/SKILL.md:L76 | neighbors=[Design guidance]
- "agents_skills_archive_impeccable_skill_md_impeccable_skill_color": "Color" | kind=entity | source=.agents/skills_archive/impeccable/SKILL.md:L24 | neighbors=[General rules]
- "agents_skills_archive_impeccable_skill_md_impeccable_skill_color_theme": "Color & Theme" | kind=entity | source=.agents/skills_archive/impeccable/SKILL.md:L64 | neighbors=[New projects only (when no prior work e…]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\PTOW\1_APT_Central_Command\.graphify\description-instructions\batch-137.json

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
