# Node Description Batch 224 of 412

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

- "github_skills_impeccable_reference_codex_md_reference_codex_step_f_asset_slicing_via_the_asset_producer": "Step F: Asset Slicing via the Asset Producer" | kind=entity | source=.github/skills/impeccable/reference/codex.md:L78 | neighbors=[Codex: Visual Direction & Asset Product…] | lang=en
- "github_skills_impeccable_reference_colorize_md_reference_colorize_accent_color_application": "Accent Color Application" | kind=entity | source=.github/skills/impeccable/reference/colorize.md:L63 | neighbors=[Introduce Color Strategically] | lang=en
- "github_skills_impeccable_reference_colorize_md_reference_colorize_accessibility": "Accessibility" | kind=entity | source=.github/skills/impeccable/reference/colorize.md:L113 | neighbors=[Balance & Refinement] | lang=en
- "github_skills_impeccable_reference_colorize_md_reference_colorize_alpha_is_a_design_smell": "Alpha Is A Design Smell" | kind=entity | source=.github/skills/impeccable/reference/colorize.md:L251 | neighbors=[Color & Contrast] | lang=en
- "github_skills_impeccable_reference_colorize_md_reference_colorize_assess_color_opportunity": "Assess Color Opportunity" | kind=entity | source=.github/skills/impeccable/reference/colorize.md:L15 | neighbors=[colorize.md] | lang=en
- "github_skills_impeccable_reference_colorize_md_reference_colorize_background_surfaces": "Background & Surfaces" | kind=entity | source=.github/skills/impeccable/reference/colorize.md:L70 | neighbors=[Introduce Color Strategically] | lang=en
- "github_skills_impeccable_reference_colorize_md_reference_colorize_borders_accents": "Borders & Accents" | kind=entity | source=.github/skills/impeccable/reference/colorize.md:L83 | neighbors=[Introduce Color Strategically] | lang=en
- "github_skills_impeccable_reference_colorize_md_reference_colorize_cohesion": "Cohesion" | kind=entity | source=.github/skills/impeccable/reference/colorize.md:L118 | neighbors=[Balance & Refinement] | lang=en
- "github_skills_impeccable_reference_colorize_md_reference_colorize_color_spaces_use_oklch": "Color Spaces: Use OKLCH" | kind=entity | source=.github/skills/impeccable/reference/colorize.md:L162 | neighbors=[Color & Contrast] | lang=en
- "github_skills_impeccable_reference_colorize_md_reference_colorize_dangerous_color_combinations": "Dangerous Color Combinations" | kind=entity | source=.github/skills/impeccable/reference/colorize.md:L214 | neighbors=[Contrast & Accessibility] | lang=en
- "github_skills_impeccable_reference_colorize_md_reference_colorize_dark_mode_is_not_inverted_light_mode": "Dark Mode Is Not Inverted Light Mode" | kind=entity | source=.github/skills/impeccable/reference/colorize.md:L234 | neighbors=[Theming: Light & Dark Mode] | lang=en
- "github_skills_impeccable_reference_colorize_md_reference_colorize_data_visualization": "Data Visualization" | kind=entity | source=.github/skills/impeccable/reference/colorize.md:L78 | neighbors=[Introduce Color Strategically] | lang=en
- "github_skills_impeccable_reference_colorize_md_reference_colorize_decorative_elements": "Decorative Elements" | kind=entity | source=.github/skills/impeccable/reference/colorize.md:L97 | neighbors=[Introduce Color Strategically] | lang=en
- "github_skills_impeccable_reference_colorize_md_reference_colorize_live_mode_signature_params": "Live-mode signature params" | kind=entity | source=.github/skills/impeccable/reference/colorize.md:L144 | neighbors=[colorize.md] | lang=en
- "github_skills_impeccable_reference_colorize_md_reference_colorize_maintain_hierarchy": "Maintain Hierarchy" | kind=entity | source=.github/skills/impeccable/reference/colorize.md:L107 | neighbors=[Balance & Refinement] | lang=en
- "github_skills_impeccable_reference_colorize_md_reference_colorize_palette_structure": "Palette Structure" | kind=entity | source=.github/skills/impeccable/reference/colorize.md:L180 | neighbors=[Building Functional Palettes] | lang=en
- "github_skills_impeccable_reference_colorize_md_reference_colorize_plan_color_strategy": "Plan Color Strategy" | kind=entity | source=.github/skills/impeccable/reference/colorize.md:L37 | neighbors=[colorize.md] | lang=en
- "github_skills_impeccable_reference_colorize_md_reference_colorize_register": "Register" | kind=entity | source=.github/skills/impeccable/reference/colorize.md:L7 | neighbors=[colorize.md] | lang=en
- "github_skills_impeccable_reference_colorize_md_reference_colorize_semantic_color": "Semantic Color" | kind=entity | source=.github/skills/impeccable/reference/colorize.md:L52 | neighbors=[Introduce Color Strategically] | lang=en
- "github_skills_impeccable_reference_colorize_md_reference_colorize_testing": "Testing" | kind=entity | source=.github/skills/impeccable/reference/colorize.md:L224 | neighbors=[Contrast & Accessibility] | lang=en
- "github_skills_impeccable_reference_colorize_md_reference_colorize_the_60_30_10_rule_applied_correctly": "The 60-30-10 Rule (Applied Correctly)" | kind=entity | source=.github/skills/impeccable/reference/colorize.md:L193 | neighbors=[Building Functional Palettes] | lang=en
- "github_skills_impeccable_reference_colorize_md_reference_colorize_tinted_neutrals": "Tinted Neutrals" | kind=entity | source=.github/skills/impeccable/reference/colorize.md:L172 | neighbors=[Building Functional Palettes] | lang=en
- "github_skills_impeccable_reference_colorize_md_reference_colorize_token_hierarchy": "Token Hierarchy" | kind=entity | source=.github/skills/impeccable/reference/colorize.md:L247 | neighbors=[Theming: Light & Dark Mode] | lang=en
- "github_skills_impeccable_reference_colorize_md_reference_colorize_typography_color": "Typography Color" | kind=entity | source=.github/skills/impeccable/reference/colorize.md:L92 | neighbors=[Introduce Color Strategically] | lang=en
- "github_skills_impeccable_reference_colorize_md_reference_colorize_verify_color_addition": "Verify Color Addition" | kind=entity | source=.github/skills/impeccable/reference/colorize.md:L132 | neighbors=[colorize.md] | lang=en
- "github_skills_impeccable_reference_colorize_md_reference_colorize_wcag_requirements": "WCAG Requirements" | kind=entity | source=.github/skills/impeccable/reference/colorize.md:L205 | neighbors=[Contrast & Accessibility] | lang=en
- "github_skills_impeccable_reference_craft_md_reference_craft": "craft.md" | kind=entity | source=.github/skills/impeccable/reference/craft.md:L1 | neighbors=[Craft Flow] | lang=en
- "github_skills_impeccable_reference_craft_md_reference_craft_gates_do_not_compress": "Gates: do not compress" | kind=entity | source=.github/skills/impeccable/reference/craft.md:L9 | neighbors=[Craft Flow] | lang=pt
- "github_skills_impeccable_reference_craft_md_reference_craft_production_bar": "Production bar" | kind=entity | source=.github/skills/impeccable/reference/craft.md:L83 | neighbors=[Step 4: Build to Production Quality] | lang=en
- "github_skills_impeccable_reference_craft_md_reference_craft_step_0_project_foundation": "Step 0: Project Foundation" | kind=entity | source=.github/skills/impeccable/reference/craft.md:L22 | neighbors=[Craft Flow] | lang=en
- "github_skills_impeccable_reference_craft_md_reference_craft_step_1_shape_the_design": "Step 1: Shape the Design" | kind=entity | source=.github/skills/impeccable/reference/craft.md:L43 | neighbors=[Craft Flow] | lang=en
- "github_skills_impeccable_reference_craft_md_reference_craft_step_2_load_references": "Step 2: Load References" | kind=entity | source=.github/skills/impeccable/reference/craft.md:L55 | neighbors=[Craft Flow] | lang=en
- "github_skills_impeccable_reference_craft_md_reference_craft_step_3_visual_direction_assets_harness_gated": "Step 3: Visual Direction & Assets (Harness-Gated)" | kind=entity | source=.github/skills/impeccable/reference/craft.md:L69 | neighbors=[Craft Flow] | lang=en
- "github_skills_impeccable_reference_craft_md_reference_craft_step_5_iterate_visually": "Step 5: Iterate Visually" | kind=entity | source=.github/skills/impeccable/reference/craft.md:L101 | neighbors=[Craft Flow] | lang=en
- "github_skills_impeccable_reference_craft_md_reference_craft_step_6_present": "Step 6: Present" | kind=entity | source=.github/skills/impeccable/reference/craft.md:L115 | neighbors=[Craft Flow] | lang=en
- "github_skills_impeccable_reference_critique_md_reference_critique_1_impatient_power_user_alex": "1. Impatient Power User: \"Alex\"" | kind=entity | source=.github/skills/impeccable/reference/critique.md:L598 | neighbors=[Persona-Based Design Testing] | lang=en
- "github_skills_impeccable_reference_critique_md_reference_critique_1_the_wall_of_options": "1. The Wall of Options" | kind=entity | source=.github/skills/impeccable/reference/critique.md:L319 | neighbors=[Common Cognitive Load Violations] | lang=en
- "github_skills_impeccable_reference_critique_md_reference_critique_1_visibility_of_system_status": "1. Visibility of System Status" | kind=entity | source=.github/skills/impeccable/reference/critique.md:L359 | neighbors=[Nielsen's 10 Heuristics] | lang=en
- "github_skills_impeccable_reference_critique_md_reference_critique_10_help_and_documentation": "10. Help and Documentation" | kind=entity | source=.github/skills/impeccable/reference/critique.md:L539 | neighbors=[Nielsen's 10 Heuristics] | lang=en
- "github_skills_impeccable_reference_critique_md_reference_critique_2_confused_first_timer_jordan": "2. Confused First-Timer: \"Jordan\"" | kind=entity | source=.github/skills/impeccable/reference/critique.md:L625 | neighbors=[Persona-Based Design Testing] | lang=en

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\PTOW\1_APT_Central_Command\.graphify\description-instructions\batch-223.json

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
