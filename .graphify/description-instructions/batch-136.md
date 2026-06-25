# Node Description Batch 137 of 412

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

- "agents_skills_archive_impeccable_reference_overdrive_md_reference_overdrive_performance_rules": "Performance rules" | kind=entity | source=.agents/skills_archive/impeccable/reference/overdrive.md:L102 | neighbors=[Implement with Discipline]
- "agents_skills_archive_impeccable_reference_overdrive_md_reference_overdrive_polish_is_the_difference": "Polish is the difference" | kind=entity | source=.agents/skills_archive/impeccable/reference/overdrive.md:L110 | neighbors=[Implement with Discipline]
- "agents_skills_archive_impeccable_reference_overdrive_md_reference_overdrive_progressive_enhancement_is_non_negotiable": "Progressive enhancement is non-negotiable" | kind=entity | source=.agents/skills_archive/impeccable/reference/overdrive.md:L86 | neighbors=[Implement with Discipline]
- "agents_skills_archive_impeccable_reference_overdrive_md_reference_overdrive_propose_before_building": "Propose Before Building" | kind=entity | source=.agents/skills_archive/impeccable/reference/overdrive.md:L12 | neighbors=[overdrive.md]
- "agents_skills_archive_impeccable_reference_overdrive_md_reference_overdrive_push_performance_boundaries": "Push performance boundaries" | kind=entity | source=.agents/skills_archive/impeccable/reference/overdrive.md:L73 | neighbors=[The Toolkit]
- "agents_skills_archive_impeccable_reference_overdrive_md_reference_overdrive_render_beyond_css": "Render beyond CSS" | kind=entity | source=.agents/skills_archive/impeccable/reference/overdrive.md:L58 | neighbors=[The Toolkit]
- "agents_skills_archive_impeccable_reference_overdrive_md_reference_overdrive_tie_animation_to_scroll_position": "Tie animation to scroll position" | kind=entity | source=.agents/skills_archive/impeccable/reference/overdrive.md:L55 | neighbors=[The Toolkit]
- "agents_skills_archive_impeccable_reference_overdrive_md_reference_overdrive_verify_the_result": "Verify the Result" | kind=entity | source=.agents/skills_archive/impeccable/reference/overdrive.md:L122 | neighbors=[overdrive.md]
- "agents_skills_archive_impeccable_reference_polish_md_reference_polish_clean_up": "Clean Up" | kind=entity | source=.agents/skills_archive/impeccable/reference/polish.md:L234 | neighbors=[polish.md]
- "agents_skills_archive_impeccable_reference_polish_md_reference_polish_code_quality": "Code Quality" | kind=entity | source=.agents/skills_archive/impeccable/reference/polish.md:L171 | neighbors=[Polish Systematically]
- "agents_skills_archive_impeccable_reference_polish_md_reference_polish_color_contrast": "Color & Contrast" | kind=entity | source=.agents/skills_archive/impeccable/reference/polish.md:L87 | neighbors=[Polish Systematically]
- "agents_skills_archive_impeccable_reference_polish_md_reference_polish_content_copy": "Content & Copy" | kind=entity | source=.agents/skills_archive/impeccable/reference/polish.md:L119 | neighbors=[Polish Systematically]
- "agents_skills_archive_impeccable_reference_polish_md_reference_polish_design_system_discovery": "Design System Discovery" | kind=entity | source=.agents/skills_archive/impeccable/reference/polish.md:L7 | neighbors=[polish.md]
- "agents_skills_archive_impeccable_reference_polish_md_reference_polish_edge_cases_error_states": "Edge Cases & Error States" | kind=entity | source=.agents/skills_archive/impeccable/reference/polish.md:L145 | neighbors=[Polish Systematically]
- "agents_skills_archive_impeccable_reference_polish_md_reference_polish_final_verification": "Final Verification" | kind=entity | source=.agents/skills_archive/impeccable/reference/polish.md:L223 | neighbors=[polish.md]
- "agents_skills_archive_impeccable_reference_polish_md_reference_polish_forms_inputs": "Forms & Inputs" | kind=entity | source=.agents/skills_archive/impeccable/reference/polish.md:L136 | neighbors=[Polish Systematically]
- "agents_skills_archive_impeccable_reference_polish_md_reference_polish_icons_images": "Icons & Images" | kind=entity | source=.agents/skills_archive/impeccable/reference/polish.md:L127 | neighbors=[Polish Systematically]
- "agents_skills_archive_impeccable_reference_polish_md_reference_polish_information_architecture_flow": "Information Architecture & Flow" | kind=entity | source=.agents/skills_archive/impeccable/reference/polish.md:L67 | neighbors=[Polish Systematically]
- "agents_skills_archive_impeccable_reference_polish_md_reference_polish_interaction_states": "Interaction States" | kind=entity | source=.agents/skills_archive/impeccable/reference/polish.md:L96 | neighbors=[Polish Systematically]
- "agents_skills_archive_impeccable_reference_polish_md_reference_polish_micro_interactions_transitions": "Micro-interactions & Transitions" | kind=entity | source=.agents/skills_archive/impeccable/reference/polish.md:L111 | neighbors=[Polish Systematically]
- "agents_skills_archive_impeccable_reference_polish_md_reference_polish_performance": "Performance" | kind=entity | source=.agents/skills_archive/impeccable/reference/polish.md:L163 | neighbors=[Polish Systematically]
- "agents_skills_archive_impeccable_reference_polish_md_reference_polish_polish_checklist": "Polish Checklist" | kind=entity | source=.agents/skills_archive/impeccable/reference/polish.md:L180 | neighbors=[polish.md]
- "agents_skills_archive_impeccable_reference_polish_md_reference_polish_pre_polish_assessment": "Pre-Polish Assessment" | kind=entity | source=.agents/skills_archive/impeccable/reference/polish.md:L17 | neighbors=[polish.md]
- "agents_skills_archive_impeccable_reference_polish_md_reference_polish_responsiveness": "Responsiveness" | kind=entity | source=.agents/skills_archive/impeccable/reference/polish.md:L155 | neighbors=[Polish Systematically]
- "agents_skills_archive_impeccable_reference_polish_md_reference_polish_typography_refinement": "Typography Refinement" | kind=entity | source=.agents/skills_archive/impeccable/reference/polish.md:L77 | neighbors=[Polish Systematically]
- "agents_skills_archive_impeccable_reference_polish_md_reference_polish_visual_alignment_spacing": "Visual Alignment & Spacing" | kind=entity | source=.agents/skills_archive/impeccable/reference/polish.md:L53 | neighbors=[Polish Systematically]
- "agents_skills_archive_impeccable_reference_product_md_reference_product": "product.md" | kind=entity | source=.agents/skills_archive/impeccable/reference/product.md:L1 | neighbors=[Product register]
- "agents_skills_archive_impeccable_reference_product_md_reference_product_color": "Color" | kind=entity | source=.agents/skills_archive/impeccable/reference/product.md:L18 | neighbors=[Product register]
- "agents_skills_archive_impeccable_reference_product_md_reference_product_components": "Components" | kind=entity | source=.agents/skills_archive/impeccable/reference/product.md:L30 | neighbors=[Product register]
- "agents_skills_archive_impeccable_reference_product_md_reference_product_layout": "Layout" | kind=entity | source=.agents/skills_archive/impeccable/reference/product.md:L26 | neighbors=[Product register]
- "agents_skills_archive_impeccable_reference_product_md_reference_product_motion": "Motion" | kind=entity | source=.agents/skills_archive/impeccable/reference/product.md:L38 | neighbors=[Product register]
- "agents_skills_archive_impeccable_reference_product_md_reference_product_product_bans_on_top_of_the_shared_absolute_bans": "Product bans (on top of the shared absolute bans)" | kind=entity | source=.agents/skills_archive/impeccable/reference/product.md:L44 | neighbors=[Product register]
- "agents_skills_archive_impeccable_reference_product_md_reference_product_product_permissions": "Product permissions" | kind=entity | source=.agents/skills_archive/impeccable/reference/product.md:L53 | neighbors=[Product register]
- "agents_skills_archive_impeccable_reference_product_md_reference_product_the_product_slop_test": "The product slop test" | kind=entity | source=.agents/skills_archive/impeccable/reference/product.md:L5 | neighbors=[Product register]
- "agents_skills_archive_impeccable_reference_product_md_reference_product_typography": "Typography" | kind=entity | source=.agents/skills_archive/impeccable/reference/product.md:L11 | neighbors=[Product register]
- "agents_skills_archive_impeccable_reference_quieter_md_reference_quieter_assess_current_state": "Assess Current State" | kind=entity | source=.agents/skills_archive/impeccable/reference/quieter.md:L13 | neighbors=[quieter.md]
- "agents_skills_archive_impeccable_reference_quieter_md_reference_quieter_color_refinement": "Color Refinement" | kind=entity | source=.agents/skills_archive/impeccable/reference/quieter.md:L50 | neighbors=[Refine the Design]
- "agents_skills_archive_impeccable_reference_quieter_md_reference_quieter_composition_refinement": "Composition Refinement" | kind=entity | source=.agents/skills_archive/impeccable/reference/quieter.md:L78 | neighbors=[Refine the Design]
- "agents_skills_archive_impeccable_reference_quieter_md_reference_quieter_motion_reduction": "Motion Reduction" | kind=entity | source=.agents/skills_archive/impeccable/reference/quieter.md:L71 | neighbors=[Refine the Design]
- "agents_skills_archive_impeccable_reference_quieter_md_reference_quieter_plan_refinement": "Plan Refinement" | kind=entity | source=.agents/skills_archive/impeccable/reference/quieter.md:L35 | neighbors=[quieter.md]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\PTOW\1_APT_Central_Command\.graphify\description-instructions\batch-136.json

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
