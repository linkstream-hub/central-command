# Node Description Batch 191 of 412

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

- "design_extract_output_aptmaintenanceinc_com_design_do_s_and_don_ts": "Do's and Don'ts" | kind=entity | source=design-extract-output/aptmaintenanceinc-com-DESIGN.md:L111 | neighbors=[aptmaintenanceinc-com-DESIGN.md]
- "design_extract_output_aptmaintenanceinc_com_design_elevation_and_depth": "Elevation and Depth" | kind=entity | source=design-extract-output/aptmaintenanceinc-com-DESIGN.md:L82 | neighbors=[aptmaintenanceinc-com-DESIGN.md]
- "design_extract_output_aptmaintenanceinc_com_design_language": "aptmaintenanceinc-com-design-language.md" | kind=entity | source=design-extract-output/aptmaintenanceinc-com-design-language.md:L1 | neighbors=[Design Language: APT Maintenance]
- "design_extract_output_aptmaintenanceinc_com_design_language_background_colors": "Background Colors" | kind=entity | source=design-extract-output/aptmaintenanceinc-com-design-language.md:L35 | neighbors=[Color Palette]
- "design_extract_output_aptmaintenanceinc_com_design_language_badges_1_instances": "Badges (1 instances)" | kind=entity | source=design-extract-output/aptmaintenanceinc-com-design-language.md:L536 | neighbors=[Component Patterns]
- "design_extract_output_aptmaintenanceinc_com_design_language_body_text": "Body Text" | kind=entity | source=design-extract-output/aptmaintenanceinc-com-design-language.md:L114 | neighbors=[Typography]
- "design_extract_output_aptmaintenanceinc_com_design_language_border_radii": "Border Radii" | kind=entity | source=design-extract-output/aptmaintenanceinc-com-design-language.md:L148 | neighbors=[Design Language: APT Maintenance]
- "design_extract_output_aptmaintenanceinc_com_design_language_box_shadows": "Box Shadows" | kind=entity | source=design-extract-output/aptmaintenanceinc-com-design-language.md:L157 | neighbors=[Design Language: APT Maintenance]
- "design_extract_output_aptmaintenanceinc_com_design_language_breakpoints": "Breakpoints" | kind=entity | source=design-extract-output/aptmaintenanceinc-com-design-language.md:L292 | neighbors=[Design Language: APT Maintenance]
- "design_extract_output_aptmaintenanceinc_com_design_language_button_1_instance_1_variant": "Button — 1 instance, 1 variant" | kind=entity | source=design-extract-output/aptmaintenanceinc-com-design-language.md:L576 | neighbors=[Component Clusters]
- "design_extract_output_aptmaintenanceinc_com_design_language_button_3_instances_1_variant": "Button — 3 instances, 1 variant" | kind=entity | source=design-extract-output/aptmaintenanceinc-com-design-language.md:L562 | neighbors=[Component Clusters]
- "design_extract_output_aptmaintenanceinc_com_design_language_button_6_instances": "button — 6 instances" | kind=entity | source=design-extract-output/aptmaintenanceinc-com-design-language.md:L796 | neighbors=[Component Anatomy]
- "design_extract_output_aptmaintenanceinc_com_design_language_button_copy_patterns": "Button Copy Patterns" | kind=entity | source=design-extract-output/aptmaintenanceinc-com-design-language.md:L814 | neighbors=[Brand Voice]
- "design_extract_output_aptmaintenanceinc_com_design_language_buttons_3_instances": "Buttons (3 instances)" | kind=entity | source=design-extract-output/aptmaintenanceinc-com-design-language.md:L448 | neighbors=[Component Patterns]
- "design_extract_output_aptmaintenanceinc_com_design_language_cards_4_instances": "Cards (4 instances)" | kind=entity | source=design-extract-output/aptmaintenanceinc-com-design-language.md:L462 | neighbors=[Component Patterns]
- "design_extract_output_aptmaintenanceinc_com_design_language_colors": "Colors" | kind=entity | source=design-extract-output/aptmaintenanceinc-com-design-language.md:L186 | neighbors=[CSS Custom Properties]
- "design_extract_output_aptmaintenanceinc_com_design_language_common_transitions": "Common Transitions" | kind=entity | source=design-extract-output/aptmaintenanceinc-com-design-language.md:L347 | neighbors=[Transitions & Animations]
- "design_extract_output_aptmaintenanceinc_com_design_language_container_widths": "Container Widths" | kind=entity | source=design-extract-output/aptmaintenanceinc-com-design-language.md:L650 | neighbors=[Layout System]
- "design_extract_output_aptmaintenanceinc_com_design_language_dependencies": "Dependencies" | kind=entity | source=design-extract-output/aptmaintenanceinc-com-design-language.md:L277 | neighbors=[CSS Custom Properties]
- "design_extract_output_aptmaintenanceinc_com_design_language_design_system_score": "Design System Score" | kind=entity | source=design-extract-output/aptmaintenanceinc-com-design-language.md:L699 | neighbors=[Design Language: APT Maintenance]
- "design_extract_output_aptmaintenanceinc_com_design_language_dropdowns_16_instances": "Dropdowns (16 instances)" | kind=entity | source=design-extract-output/aptmaintenanceinc-com-design-language.md:L525 | neighbors=[Component Patterns]
- "design_extract_output_aptmaintenanceinc_com_design_language_duration_tokens": "Duration Tokens" | kind=entity | source=design-extract-output/aptmaintenanceinc-com-design-language.md:L774 | neighbors=[Motion Language]
- "design_extract_output_aptmaintenanceinc_com_design_language_easing_families": "Easing Families" | kind=entity | source=design-extract-output/aptmaintenanceinc-com-design-language.md:L783 | neighbors=[Motion Language]
- "design_extract_output_aptmaintenanceinc_com_design_language_flex_patterns": "Flex Patterns" | kind=entity | source=design-extract-output/aptmaintenanceinc-com-design-language.md:L676 | neighbors=[Layout System]
- "design_extract_output_aptmaintenanceinc_com_design_language_font_families": "Font Families" | kind=entity | source=design-extract-output/aptmaintenanceinc-com-design-language.md:L79 | neighbors=[Typography]
- "design_extract_output_aptmaintenanceinc_com_design_language_font_files": "Font Files" | kind=entity | source=design-extract-output/aptmaintenanceinc-com-design-language.md:L754 | neighbors=[Design Language: APT Maintenance]
- "design_extract_output_aptmaintenanceinc_com_design_language_font_weights_in_use": "Font Weights in Use" | kind=entity | source=design-extract-output/aptmaintenanceinc-com-design-language.md:L120 | neighbors=[Typography]
- "design_extract_output_aptmaintenanceinc_com_design_language_footer_16_instances": "Footer (16 instances)" | kind=entity | source=design-extract-output/aptmaintenanceinc-com-design-language.md:L513 | neighbors=[Component Patterns]
- "design_extract_output_aptmaintenanceinc_com_design_language_full_color_inventory": "Full Color Inventory" | kind=entity | source=design-extract-output/aptmaintenanceinc-com-design-language.md:L53 | neighbors=[Color Palette]
- "design_extract_output_aptmaintenanceinc_com_design_language_grid_column_patterns": "Grid Column Patterns" | kind=entity | source=design-extract-output/aptmaintenanceinc-com-design-language.md:L663 | neighbors=[Layout System]
- "design_extract_output_aptmaintenanceinc_com_design_language_grid_templates": "Grid Templates" | kind=entity | source=design-extract-output/aptmaintenanceinc-com-design-language.md:L669 | neighbors=[Layout System]
- "design_extract_output_aptmaintenanceinc_com_design_language_heading_scale": "Heading Scale" | kind=entity | source=design-extract-output/aptmaintenanceinc-com-design-language.md:L103 | neighbors=[Typography]
- "design_extract_output_aptmaintenanceinc_com_design_language_image_style_patterns": "Image Style Patterns" | kind=entity | source=design-extract-output/aptmaintenanceinc-com-design-language.md:L760 | neighbors=[Design Language: APT Maintenance]
- "design_extract_output_aptmaintenanceinc_com_design_language_imagery_style": "Imagery Style" | kind=entity | source=design-extract-output/aptmaintenanceinc-com-design-language.md:L867 | neighbors=[Design Language: APT Maintenance]
- "design_extract_output_aptmaintenanceinc_com_design_language_input_1_instance_1_variant": "Input — 1 instance, 1 variant" | kind=entity | source=design-extract-output/aptmaintenanceinc-com-design-language.md:L632 | neighbors=[Component Clusters]
- "design_extract_output_aptmaintenanceinc_com_design_language_input_3_instances_1_variant": "Input — 3 instances, 1 variant" | kind=entity | source=design-extract-output/aptmaintenanceinc-com-design-language.md:L618 | neighbors=[Component Clusters]
- "design_extract_output_aptmaintenanceinc_com_design_language_input_4_instances": "input — 4 instances" | kind=entity | source=design-extract-output/aptmaintenanceinc-com-design-language.md:L800 | neighbors=[Component Anatomy]
- "design_extract_output_aptmaintenanceinc_com_design_language_inputs_14_instances": "Inputs (14 instances)" | kind=entity | source=design-extract-output/aptmaintenanceinc-com-design-language.md:L474 | neighbors=[Component Patterns]
- "design_extract_output_aptmaintenanceinc_com_design_language_keyframe_animations": "Keyframe Animations" | kind=entity | source=design-extract-output/aptmaintenanceinc-com-design-language.md:L359 | neighbors=[Transitions & Animations]
- "design_extract_output_aptmaintenanceinc_com_design_language_keyframes_in_use": "Keyframes In Use" | kind=entity | source=design-extract-output/aptmaintenanceinc-com-design-language.md:L787 | neighbors=[Motion Language]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\PTOW\1_APT_Central_Command\.graphify\description-instructions\batch-190.json

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
