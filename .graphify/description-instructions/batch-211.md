# Node Description Batch 212 of 412

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

- "github_skills_archive_impeccable_reference_clarify_md_reference_clarify_confirmation_dialogs_use_sparingly": "Confirmation Dialogs: Use Sparingly" | kind=entity | source=.github/skills_archive/impeccable/reference/clarify.md:L278 | neighbors=[UX Writing]
- "github_skills_archive_impeccable_reference_clarify_md_reference_clarify_consistency_the_terminology_problem": "Consistency: The Terminology Problem" | kind=entity | source=.github/skills_archive/impeccable/reference/clarify.md:L257 | neighbors=[UX Writing]
- "github_skills_archive_impeccable_reference_clarify_md_reference_clarify_don_t_blame_the_user": "Don't Blame the User" | kind=entity | source=.github/skills_archive/impeccable/reference/clarify.md:L214 | neighbors=[Error Messages: The Formula]
- "github_skills_archive_impeccable_reference_clarify_md_reference_clarify_empty_states": "Empty States" | kind=entity | source=.github/skills_archive/impeccable/reference/clarify.md:L92 | neighbors=[Improve Copy Systematically]
- "github_skills_archive_impeccable_reference_clarify_md_reference_clarify_empty_states_are_opportunities": "Empty States Are Opportunities" | kind=entity | source=.github/skills_archive/impeccable/reference/clarify.md:L218 | neighbors=[UX Writing]
- "github_skills_archive_impeccable_reference_clarify_md_reference_clarify_error_message_templates": "Error Message Templates" | kind=entity | source=.github/skills_archive/impeccable/reference/clarify.md:L204 | neighbors=[Error Messages: The Formula]
- "github_skills_archive_impeccable_reference_clarify_md_reference_clarify_error_messages": "Error Messages" | kind=entity | source=.github/skills_archive/impeccable/reference/clarify.md:L44 | neighbors=[Improve Copy Systematically]
- "github_skills_archive_impeccable_reference_clarify_md_reference_clarify_form_instructions": "Form Instructions" | kind=entity | source=.github/skills_archive/impeccable/reference/clarify.md:L282 | neighbors=[UX Writing]
- "github_skills_archive_impeccable_reference_clarify_md_reference_clarify_form_labels_instructions": "Form Labels & Instructions" | kind=entity | source=.github/skills_archive/impeccable/reference/clarify.md:L58 | neighbors=[Improve Copy Systematically]
- "github_skills_archive_impeccable_reference_clarify_md_reference_clarify_help_text_tooltips": "Help Text & Tooltips" | kind=entity | source=.github/skills_archive/impeccable/reference/clarify.md:L82 | neighbors=[Improve Copy Systematically]
- "github_skills_archive_impeccable_reference_clarify_md_reference_clarify_navigation_wayfinding": "Navigation & Wayfinding" | kind=entity | source=.github/skills_archive/impeccable/reference/clarify.md:L131 | neighbors=[Improve Copy Systematically]
- "github_skills_archive_impeccable_reference_clarify_md_reference_clarify_plan_copy_improvements": "Plan Copy Improvements" | kind=entity | source=.github/skills_archive/impeccable/reference/clarify.md:L29 | neighbors=[clarify.md]
- "github_skills_archive_impeccable_reference_clarify_md_reference_clarify_plan_for_expansion": "Plan for Expansion" | kind=entity | source=.github/skills_archive/impeccable/reference/clarify.md:L242 | neighbors=[Writing for Translation]
- "github_skills_archive_impeccable_reference_clarify_md_reference_clarify_success_messages": "Success Messages" | kind=entity | source=.github/skills_archive/impeccable/reference/clarify.md:L101 | neighbors=[Improve Copy Systematically]
- "github_skills_archive_impeccable_reference_clarify_md_reference_clarify_the_button_label_problem": "The Button Label Problem" | kind=entity | source=.github/skills_archive/impeccable/reference/clarify.md:L184 | neighbors=[UX Writing]
- "github_skills_archive_impeccable_reference_clarify_md_reference_clarify_translation_friendly_patterns": "Translation-Friendly Patterns" | kind=entity | source=.github/skills_archive/impeccable/reference/clarify.md:L253 | neighbors=[Writing for Translation]
- "github_skills_archive_impeccable_reference_clarify_md_reference_clarify_verify_improvements": "Verify Improvements" | kind=entity | source=.github/skills_archive/impeccable/reference/clarify.md:L164 | neighbors=[clarify.md]
- "github_skills_archive_impeccable_reference_clarify_md_reference_clarify_voice_vs_tone": "Voice vs Tone" | kind=entity | source=.github/skills_archive/impeccable/reference/clarify.md:L222 | neighbors=[UX Writing]
- "github_skills_archive_impeccable_reference_clarify_md_reference_clarify_writing_for_accessibility": "Writing for Accessibility" | kind=entity | source=.github/skills_archive/impeccable/reference/clarify.md:L236 | neighbors=[UX Writing]
- "github_skills_archive_impeccable_reference_codex_md_reference_codex": "codex.md" | kind=entity | source=.github/skills_archive/impeccable/reference/codex.md:L1 | neighbors=[Codex: Visual Direction & Asset Product…]
- "github_skills_archive_impeccable_reference_codex_md_reference_codex_after_this_file": "After This File" | kind=entity | source=.github/skills_archive/impeccable/reference/codex.md:L103 | neighbors=[Codex: Visual Direction & Asset Product…]
- "github_skills_archive_impeccable_reference_codex_md_reference_codex_four_stop_points_before_code": "Four stop points before code" | kind=entity | source=.github/skills_archive/impeccable/reference/codex.md:L7 | neighbors=[Codex: Visual Direction & Asset Product…]
- "github_skills_archive_impeccable_reference_codex_md_reference_codex_step_a_explore_directions_with_the_user": "Step A: Explore Directions with the User" | kind=entity | source=.github/skills_archive/impeccable/reference/codex.md:L18 | neighbors=[Codex: Visual Direction & Asset Product…]
- "github_skills_archive_impeccable_reference_codex_md_reference_codex_step_b_generate_the_brand_palette_first": "Step B: Generate the Brand Palette First" | kind=entity | source=.github/skills_archive/impeccable/reference/codex.md:L31 | neighbors=[Codex: Visual Direction & Asset Product…]
- "github_skills_archive_impeccable_reference_codex_md_reference_codex_step_c_generate_1_3_visual_mocks_against_the_palette": "Step C: Generate 1-3 Visual Mocks Against the Palette" | kind=entity | source=.github/skills_archive/impeccable/reference/codex.md:L41 | neighbors=[Codex: Visual Direction & Asset Product…]
- "github_skills_archive_impeccable_reference_codex_md_reference_codex_step_d_approval_loop": "Step D: Approval Loop" | kind=entity | source=.github/skills_archive/impeccable/reference/codex.md:L51 | neighbors=[Codex: Visual Direction & Asset Product…]
- "github_skills_archive_impeccable_reference_codex_md_reference_codex_step_e_mock_fidelity_inventory": "Step E: Mock Fidelity Inventory" | kind=entity | source=.github/skills_archive/impeccable/reference/codex.md:L59 | neighbors=[Codex: Visual Direction & Asset Product…]
- "github_skills_archive_impeccable_reference_codex_md_reference_codex_step_f_asset_slicing_via_the_asset_producer": "Step F: Asset Slicing via the Asset Producer" | kind=entity | source=.github/skills_archive/impeccable/reference/codex.md:L78 | neighbors=[Codex: Visual Direction & Asset Product…]
- "github_skills_archive_impeccable_reference_colorize_md_reference_colorize_accent_color_application": "Accent Color Application" | kind=entity | source=.github/skills_archive/impeccable/reference/colorize.md:L63 | neighbors=[Introduce Color Strategically]
- "github_skills_archive_impeccable_reference_colorize_md_reference_colorize_accessibility": "Accessibility" | kind=entity | source=.github/skills_archive/impeccable/reference/colorize.md:L113 | neighbors=[Balance & Refinement]
- "github_skills_archive_impeccable_reference_colorize_md_reference_colorize_alpha_is_a_design_smell": "Alpha Is A Design Smell" | kind=entity | source=.github/skills_archive/impeccable/reference/colorize.md:L251 | neighbors=[Color & Contrast]
- "github_skills_archive_impeccable_reference_colorize_md_reference_colorize_assess_color_opportunity": "Assess Color Opportunity" | kind=entity | source=.github/skills_archive/impeccable/reference/colorize.md:L15 | neighbors=[colorize.md]
- "github_skills_archive_impeccable_reference_colorize_md_reference_colorize_background_surfaces": "Background & Surfaces" | kind=entity | source=.github/skills_archive/impeccable/reference/colorize.md:L70 | neighbors=[Introduce Color Strategically]
- "github_skills_archive_impeccable_reference_colorize_md_reference_colorize_borders_accents": "Borders & Accents" | kind=entity | source=.github/skills_archive/impeccable/reference/colorize.md:L83 | neighbors=[Introduce Color Strategically]
- "github_skills_archive_impeccable_reference_colorize_md_reference_colorize_cohesion": "Cohesion" | kind=entity | source=.github/skills_archive/impeccable/reference/colorize.md:L118 | neighbors=[Balance & Refinement]
- "github_skills_archive_impeccable_reference_colorize_md_reference_colorize_color_spaces_use_oklch": "Color Spaces: Use OKLCH" | kind=entity | source=.github/skills_archive/impeccable/reference/colorize.md:L162 | neighbors=[Color & Contrast]
- "github_skills_archive_impeccable_reference_colorize_md_reference_colorize_dangerous_color_combinations": "Dangerous Color Combinations" | kind=entity | source=.github/skills_archive/impeccable/reference/colorize.md:L214 | neighbors=[Contrast & Accessibility]
- "github_skills_archive_impeccable_reference_colorize_md_reference_colorize_dark_mode_is_not_inverted_light_mode": "Dark Mode Is Not Inverted Light Mode" | kind=entity | source=.github/skills_archive/impeccable/reference/colorize.md:L234 | neighbors=[Theming: Light & Dark Mode]
- "github_skills_archive_impeccable_reference_colorize_md_reference_colorize_data_visualization": "Data Visualization" | kind=entity | source=.github/skills_archive/impeccable/reference/colorize.md:L78 | neighbors=[Introduce Color Strategically]
- "github_skills_archive_impeccable_reference_colorize_md_reference_colorize_decorative_elements": "Decorative Elements" | kind=entity | source=.github/skills_archive/impeccable/reference/colorize.md:L97 | neighbors=[Introduce Color Strategically]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\PTOW\1_APT_Central_Command\.graphify\description-instructions\batch-211.json

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
