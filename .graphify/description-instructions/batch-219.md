# Node Description Batch 220 of 412

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

- "github_skills_archive_impeccable_reference_product_md_reference_product_product_permissions": "Product permissions" | kind=entity | source=.github/skills_archive/impeccable/reference/product.md:L53 | neighbors=[Product register]
- "github_skills_archive_impeccable_reference_product_md_reference_product_the_product_slop_test": "The product slop test" | kind=entity | source=.github/skills_archive/impeccable/reference/product.md:L5 | neighbors=[Product register]
- "github_skills_archive_impeccable_reference_product_md_reference_product_typography": "Typography" | kind=entity | source=.github/skills_archive/impeccable/reference/product.md:L11 | neighbors=[Product register]
- "github_skills_archive_impeccable_reference_quieter_md_reference_quieter_assess_current_state": "Assess Current State" | kind=entity | source=.github/skills_archive/impeccable/reference/quieter.md:L13 | neighbors=[quieter.md]
- "github_skills_archive_impeccable_reference_quieter_md_reference_quieter_color_refinement": "Color Refinement" | kind=entity | source=.github/skills_archive/impeccable/reference/quieter.md:L50 | neighbors=[Refine the Design]
- "github_skills_archive_impeccable_reference_quieter_md_reference_quieter_composition_refinement": "Composition Refinement" | kind=entity | source=.github/skills_archive/impeccable/reference/quieter.md:L78 | neighbors=[Refine the Design]
- "github_skills_archive_impeccable_reference_quieter_md_reference_quieter_motion_reduction": "Motion Reduction" | kind=entity | source=.github/skills_archive/impeccable/reference/quieter.md:L71 | neighbors=[Refine the Design]
- "github_skills_archive_impeccable_reference_quieter_md_reference_quieter_plan_refinement": "Plan Refinement" | kind=entity | source=.github/skills_archive/impeccable/reference/quieter.md:L35 | neighbors=[quieter.md]
- "github_skills_archive_impeccable_reference_quieter_md_reference_quieter_register": "Register" | kind=entity | source=.github/skills_archive/impeccable/reference/quieter.md:L5 | neighbors=[quieter.md]
- "github_skills_archive_impeccable_reference_quieter_md_reference_quieter_simplification": "Simplification" | kind=entity | source=.github/skills_archive/impeccable/reference/quieter.md:L65 | neighbors=[Refine the Design]
- "github_skills_archive_impeccable_reference_quieter_md_reference_quieter_verify_quality": "Verify Quality" | kind=entity | source=.github/skills_archive/impeccable/reference/quieter.md:L90 | neighbors=[quieter.md]
- "github_skills_archive_impeccable_reference_quieter_md_reference_quieter_visual_weight_reduction": "Visual Weight Reduction" | kind=entity | source=.github/skills_archive/impeccable/reference/quieter.md:L59 | neighbors=[Refine the Design]
- "github_skills_archive_impeccable_reference_shape_md_reference_shape_anti_goals": "Anti-Goals" | kind=entity | source=.github/skills_archive/impeccable/reference/shape.md:L68 | neighbors=[Phase 1: Discovery Interview]
- "github_skills_archive_impeccable_reference_shape_md_reference_shape_brief_structure": "Brief Structure" | kind=entity | source=.github/skills_archive/impeccable/reference/shape.md:L125 | neighbors=[Phase 2: Design Brief]
- "github_skills_archive_impeccable_reference_shape_md_reference_shape_constraints": "Constraints" | kind=entity | source=.github/skills_archive/impeccable/reference/shape.md:L62 | neighbors=[Phase 1: Discovery Interview]
- "github_skills_archive_impeccable_reference_shape_md_reference_shape_content_data": "Content & Data" | kind=entity | source=.github/skills_archive/impeccable/reference/shape.md:L36 | neighbors=[Phase 1: Discovery Interview]
- "github_skills_archive_impeccable_reference_shape_md_reference_shape_design_direction": "Design Direction" | kind=entity | source=.github/skills_archive/impeccable/reference/shape.md:L43 | neighbors=[Phase 1: Discovery Interview]
- "github_skills_archive_impeccable_reference_shape_md_reference_shape_how_to_use_the_probes": "How to use the probes" | kind=entity | source=.github/skills_archive/impeccable/reference/shape.md:L97 | neighbors=[Phase 1.5: Visual Direction Probe (Capa…]
- "github_skills_archive_impeccable_reference_shape_md_reference_shape_important_limits": "Important limits" | kind=entity | source=.github/skills_archive/impeccable/reference/shape.md:L104 | neighbors=[Phase 1.5: Visual Direction Probe (Capa…]
- "github_skills_archive_impeccable_reference_shape_md_reference_shape_interview_cadence": "Interview cadence" | kind=entity | source=.github/skills_archive/impeccable/reference/shape.md:L17 | neighbors=[Phase 1: Discovery Interview]
- "github_skills_archive_impeccable_reference_shape_md_reference_shape_philosophy": "Philosophy" | kind=entity | source=.github/skills_archive/impeccable/reference/shape.md:L7 | neighbors=[shape.md]
- "github_skills_archive_impeccable_reference_shape_md_reference_shape_purpose_context": "Purpose & Context" | kind=entity | source=.github/skills_archive/impeccable/reference/shape.md:L30 | neighbors=[Phase 1: Discovery Interview]
- "github_skills_archive_impeccable_reference_shape_md_reference_shape_scope": "Scope" | kind=entity | source=.github/skills_archive/impeccable/reference/shape.md:L51 | neighbors=[Phase 1: Discovery Interview]
- "github_skills_archive_impeccable_reference_shape_md_reference_shape_what_to_generate": "What to generate" | kind=entity | source=.github/skills_archive/impeccable/reference/shape.md:L86 | neighbors=[Phase 1.5: Visual Direction Probe (Capa…]
- "github_skills_archive_impeccable_reference_typeset_md_reference_typeset_accessibility_considerations": "Accessibility Considerations" | kind=entity | source=.github/skills_archive/impeccable/reference/typeset.md:L268 | neighbors=[Typography]
- "github_skills_archive_impeccable_reference_typeset_md_reference_typeset_anti_reflexes_worth_defending_against": "Anti-reflexes worth defending against" | kind=entity | source=.github/skills_archive/impeccable/reference/typeset.md:L168 | neighbors=[Font Selection & Pairing]
- "github_skills_archive_impeccable_reference_typeset_md_reference_typeset_assess_current_typography": "Assess Current Typography" | kind=entity | source=.github/skills_archive/impeccable/reference/typeset.md:L13 | neighbors=[typeset.md]
- "github_skills_archive_impeccable_reference_typeset_md_reference_typeset_establish_hierarchy": "Establish Hierarchy" | kind=entity | source=.github/skills_archive/impeccable/reference/typeset.md:L64 | neighbors=[Improve Typography Systematically]
- "github_skills_archive_impeccable_reference_typeset_md_reference_typeset_fix_readability": "Fix Readability" | kind=entity | source=.github/skills_archive/impeccable/reference/typeset.md:L73 | neighbors=[Improve Typography Systematically]
- "github_skills_archive_impeccable_reference_typeset_md_reference_typeset_fluid_type": "Fluid Type" | kind=entity | source=.github/skills_archive/impeccable/reference/typeset.md:L223 | neighbors=[Modern Web Typography]
- "github_skills_archive_impeccable_reference_typeset_md_reference_typeset_font_selection": "Font Selection" | kind=entity | source=.github/skills_archive/impeccable/reference/typeset.md:L57 | neighbors=[Improve Typography Systematically]
- "github_skills_archive_impeccable_reference_typeset_md_reference_typeset_live_mode_signature_params": "Live-mode signature params" | kind=entity | source=.github/skills_archive/impeccable/reference/typeset.md:L114 | neighbors=[typeset.md]
- "github_skills_archive_impeccable_reference_typeset_md_reference_typeset_modular_scale_hierarchy": "Modular Scale & Hierarchy" | kind=entity | source=.github/skills_archive/impeccable/reference/typeset.md:L140 | neighbors=[Classic Typography Principles]
- "github_skills_archive_impeccable_reference_typeset_md_reference_typeset_opentype_features": "OpenType Features" | kind=entity | source=.github/skills_archive/impeccable/reference/typeset.md:L235 | neighbors=[Modern Web Typography]
- "github_skills_archive_impeccable_reference_typeset_md_reference_typeset_pairing_principles": "Pairing Principles" | kind=entity | source=.github/skills_archive/impeccable/reference/typeset.md:L177 | neighbors=[Font Selection & Pairing]
- "github_skills_archive_impeccable_reference_typeset_md_reference_typeset_plan_typography_improvements": "Plan Typography Improvements" | kind=entity | source=.github/skills_archive/impeccable/reference/typeset.md:L44 | neighbors=[typeset.md]
- "github_skills_archive_impeccable_reference_typeset_md_reference_typeset_readability_measure": "Readability & Measure" | kind=entity | source=.github/skills_archive/impeccable/reference/typeset.md:L156 | neighbors=[Classic Typography Principles]
- "github_skills_archive_impeccable_reference_typeset_md_reference_typeset_refine_details": "Refine Details" | kind=entity | source=.github/skills_archive/impeccable/reference/typeset.md:L80 | neighbors=[Improve Typography Systematically]
- "github_skills_archive_impeccable_reference_typeset_md_reference_typeset_register": "Register" | kind=entity | source=.github/skills_archive/impeccable/reference/typeset.md:L5 | neighbors=[typeset.md]
- "github_skills_archive_impeccable_reference_typeset_md_reference_typeset_rendering_polish": "Rendering polish" | kind=entity | source=.github/skills_archive/impeccable/reference/typeset.md:L255 | neighbors=[Modern Web Typography]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\PTOW\1_APT_Central_Command\.graphify\description-instructions\batch-219.json

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
