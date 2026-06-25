# Node Description Batch 130 of 412

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

- "agents_skills_archive_impeccable_reference_clarify_md_reference_clarify_form_labels_instructions": "Form Labels & Instructions" | kind=entity | source=.agents/skills_archive/impeccable/reference/clarify.md:L58 | neighbors=[Improve Copy Systematically]
- "agents_skills_archive_impeccable_reference_clarify_md_reference_clarify_help_text_tooltips": "Help Text & Tooltips" | kind=entity | source=.agents/skills_archive/impeccable/reference/clarify.md:L82 | neighbors=[Improve Copy Systematically]
- "agents_skills_archive_impeccable_reference_clarify_md_reference_clarify_navigation_wayfinding": "Navigation & Wayfinding" | kind=entity | source=.agents/skills_archive/impeccable/reference/clarify.md:L131 | neighbors=[Improve Copy Systematically]
- "agents_skills_archive_impeccable_reference_clarify_md_reference_clarify_plan_copy_improvements": "Plan Copy Improvements" | kind=entity | source=.agents/skills_archive/impeccable/reference/clarify.md:L29 | neighbors=[clarify.md]
- "agents_skills_archive_impeccable_reference_clarify_md_reference_clarify_plan_for_expansion": "Plan for Expansion" | kind=entity | source=.agents/skills_archive/impeccable/reference/clarify.md:L242 | neighbors=[Writing for Translation]
- "agents_skills_archive_impeccable_reference_clarify_md_reference_clarify_success_messages": "Success Messages" | kind=entity | source=.agents/skills_archive/impeccable/reference/clarify.md:L101 | neighbors=[Improve Copy Systematically]
- "agents_skills_archive_impeccable_reference_clarify_md_reference_clarify_the_button_label_problem": "The Button Label Problem" | kind=entity | source=.agents/skills_archive/impeccable/reference/clarify.md:L184 | neighbors=[UX Writing]
- "agents_skills_archive_impeccable_reference_clarify_md_reference_clarify_translation_friendly_patterns": "Translation-Friendly Patterns" | kind=entity | source=.agents/skills_archive/impeccable/reference/clarify.md:L253 | neighbors=[Writing for Translation]
- "agents_skills_archive_impeccable_reference_clarify_md_reference_clarify_verify_improvements": "Verify Improvements" | kind=entity | source=.agents/skills_archive/impeccable/reference/clarify.md:L164 | neighbors=[clarify.md]
- "agents_skills_archive_impeccable_reference_clarify_md_reference_clarify_voice_vs_tone": "Voice vs Tone" | kind=entity | source=.agents/skills_archive/impeccable/reference/clarify.md:L222 | neighbors=[UX Writing]
- "agents_skills_archive_impeccable_reference_clarify_md_reference_clarify_writing_for_accessibility": "Writing for Accessibility" | kind=entity | source=.agents/skills_archive/impeccable/reference/clarify.md:L236 | neighbors=[UX Writing]
- "agents_skills_archive_impeccable_reference_codex_md_reference_codex": "codex.md" | kind=entity | source=.agents/skills_archive/impeccable/reference/codex.md:L1 | neighbors=[Codex: Visual Direction & Asset Product…]
- "agents_skills_archive_impeccable_reference_codex_md_reference_codex_after_this_file": "After This File" | kind=entity | source=.agents/skills_archive/impeccable/reference/codex.md:L103 | neighbors=[Codex: Visual Direction & Asset Product…]
- "agents_skills_archive_impeccable_reference_codex_md_reference_codex_four_stop_points_before_code": "Four stop points before code" | kind=entity | source=.agents/skills_archive/impeccable/reference/codex.md:L7 | neighbors=[Codex: Visual Direction & Asset Product…]
- "agents_skills_archive_impeccable_reference_codex_md_reference_codex_step_a_explore_directions_with_the_user": "Step A: Explore Directions with the User" | kind=entity | source=.agents/skills_archive/impeccable/reference/codex.md:L18 | neighbors=[Codex: Visual Direction & Asset Product…]
- "agents_skills_archive_impeccable_reference_codex_md_reference_codex_step_b_generate_the_brand_palette_first": "Step B: Generate the Brand Palette First" | kind=entity | source=.agents/skills_archive/impeccable/reference/codex.md:L31 | neighbors=[Codex: Visual Direction & Asset Product…]
- "agents_skills_archive_impeccable_reference_codex_md_reference_codex_step_c_generate_1_3_visual_mocks_against_the_palette": "Step C: Generate 1-3 Visual Mocks Against the Palette" | kind=entity | source=.agents/skills_archive/impeccable/reference/codex.md:L41 | neighbors=[Codex: Visual Direction & Asset Product…]
- "agents_skills_archive_impeccable_reference_codex_md_reference_codex_step_d_approval_loop": "Step D: Approval Loop" | kind=entity | source=.agents/skills_archive/impeccable/reference/codex.md:L51 | neighbors=[Codex: Visual Direction & Asset Product…]
- "agents_skills_archive_impeccable_reference_codex_md_reference_codex_step_e_mock_fidelity_inventory": "Step E: Mock Fidelity Inventory" | kind=entity | source=.agents/skills_archive/impeccable/reference/codex.md:L59 | neighbors=[Codex: Visual Direction & Asset Product…]
- "agents_skills_archive_impeccable_reference_codex_md_reference_codex_step_f_asset_slicing_via_the_asset_producer": "Step F: Asset Slicing via the Asset Producer" | kind=entity | source=.agents/skills_archive/impeccable/reference/codex.md:L78 | neighbors=[Codex: Visual Direction & Asset Product…]
- "agents_skills_archive_impeccable_reference_colorize_md_reference_colorize_accent_color_application": "Accent Color Application" | kind=entity | source=.agents/skills_archive/impeccable/reference/colorize.md:L63 | neighbors=[Introduce Color Strategically]
- "agents_skills_archive_impeccable_reference_colorize_md_reference_colorize_accessibility": "Accessibility" | kind=entity | source=.agents/skills_archive/impeccable/reference/colorize.md:L113 | neighbors=[Balance & Refinement]
- "agents_skills_archive_impeccable_reference_colorize_md_reference_colorize_alpha_is_a_design_smell": "Alpha Is A Design Smell" | kind=entity | source=.agents/skills_archive/impeccable/reference/colorize.md:L251 | neighbors=[Color & Contrast]
- "agents_skills_archive_impeccable_reference_colorize_md_reference_colorize_assess_color_opportunity": "Assess Color Opportunity" | kind=entity | source=.agents/skills_archive/impeccable/reference/colorize.md:L15 | neighbors=[colorize.md]
- "agents_skills_archive_impeccable_reference_colorize_md_reference_colorize_background_surfaces": "Background & Surfaces" | kind=entity | source=.agents/skills_archive/impeccable/reference/colorize.md:L70 | neighbors=[Introduce Color Strategically]
- "agents_skills_archive_impeccable_reference_colorize_md_reference_colorize_borders_accents": "Borders & Accents" | kind=entity | source=.agents/skills_archive/impeccable/reference/colorize.md:L83 | neighbors=[Introduce Color Strategically]
- "agents_skills_archive_impeccable_reference_colorize_md_reference_colorize_cohesion": "Cohesion" | kind=entity | source=.agents/skills_archive/impeccable/reference/colorize.md:L118 | neighbors=[Balance & Refinement]
- "agents_skills_archive_impeccable_reference_colorize_md_reference_colorize_color_spaces_use_oklch": "Color Spaces: Use OKLCH" | kind=entity | source=.agents/skills_archive/impeccable/reference/colorize.md:L162 | neighbors=[Color & Contrast]
- "agents_skills_archive_impeccable_reference_colorize_md_reference_colorize_dangerous_color_combinations": "Dangerous Color Combinations" | kind=entity | source=.agents/skills_archive/impeccable/reference/colorize.md:L214 | neighbors=[Contrast & Accessibility]
- "agents_skills_archive_impeccable_reference_colorize_md_reference_colorize_dark_mode_is_not_inverted_light_mode": "Dark Mode Is Not Inverted Light Mode" | kind=entity | source=.agents/skills_archive/impeccable/reference/colorize.md:L234 | neighbors=[Theming: Light & Dark Mode]
- "agents_skills_archive_impeccable_reference_colorize_md_reference_colorize_data_visualization": "Data Visualization" | kind=entity | source=.agents/skills_archive/impeccable/reference/colorize.md:L78 | neighbors=[Introduce Color Strategically]
- "agents_skills_archive_impeccable_reference_colorize_md_reference_colorize_decorative_elements": "Decorative Elements" | kind=entity | source=.agents/skills_archive/impeccable/reference/colorize.md:L97 | neighbors=[Introduce Color Strategically]
- "agents_skills_archive_impeccable_reference_colorize_md_reference_colorize_live_mode_signature_params": "Live-mode signature params" | kind=entity | source=.agents/skills_archive/impeccable/reference/colorize.md:L144 | neighbors=[colorize.md]
- "agents_skills_archive_impeccable_reference_colorize_md_reference_colorize_maintain_hierarchy": "Maintain Hierarchy" | kind=entity | source=.agents/skills_archive/impeccable/reference/colorize.md:L107 | neighbors=[Balance & Refinement]
- "agents_skills_archive_impeccable_reference_colorize_md_reference_colorize_palette_structure": "Palette Structure" | kind=entity | source=.agents/skills_archive/impeccable/reference/colorize.md:L180 | neighbors=[Building Functional Palettes]
- "agents_skills_archive_impeccable_reference_colorize_md_reference_colorize_plan_color_strategy": "Plan Color Strategy" | kind=entity | source=.agents/skills_archive/impeccable/reference/colorize.md:L37 | neighbors=[colorize.md]
- "agents_skills_archive_impeccable_reference_colorize_md_reference_colorize_register": "Register" | kind=entity | source=.agents/skills_archive/impeccable/reference/colorize.md:L7 | neighbors=[colorize.md]
- "agents_skills_archive_impeccable_reference_colorize_md_reference_colorize_semantic_color": "Semantic Color" | kind=entity | source=.agents/skills_archive/impeccable/reference/colorize.md:L52 | neighbors=[Introduce Color Strategically]
- "agents_skills_archive_impeccable_reference_colorize_md_reference_colorize_testing": "Testing" | kind=entity | source=.agents/skills_archive/impeccable/reference/colorize.md:L224 | neighbors=[Contrast & Accessibility]
- "agents_skills_archive_impeccable_reference_colorize_md_reference_colorize_the_60_30_10_rule_applied_correctly": "The 60-30-10 Rule (Applied Correctly)" | kind=entity | source=.agents/skills_archive/impeccable/reference/colorize.md:L193 | neighbors=[Building Functional Palettes]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\PTOW\1_APT_Central_Command\.graphify\description-instructions\batch-129.json

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
