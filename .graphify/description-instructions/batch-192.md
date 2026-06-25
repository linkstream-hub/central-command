# Node Description Batch 193 of 412

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

- "design_extract_output_dispatch_aptmaintenanceinc_com_agent": "dispatch-aptmaintenanceinc-com-AGENT.md" | kind=entity | source=design-extract-output/dispatch-aptmaintenanceinc-com-AGENT.md:L1 | neighbors=[You are building UI in the dispatch.apt…] | lang=en
- "design_extract_output_dispatch_aptmaintenanceinc_com_agent_accessibility": "Accessibility" | kind=entity | source=design-extract-output/dispatch-aptmaintenanceinc-com-AGENT.md:L43 | neighbors=[You are building UI in the dispatch.apt…] | lang=en
- "design_extract_output_dispatch_aptmaintenanceinc_com_agent_available_context_files": "Available context files" | kind=entity | source=design-extract-output/dispatch-aptmaintenanceinc-com-AGENT.md:L65 | neighbors=[You are building UI in the dispatch.apt…] | lang=en
- "design_extract_output_dispatch_aptmaintenanceinc_com_agent_brand_at_a_glance": "Brand at a glance" | kind=entity | source=design-extract-output/dispatch-aptmaintenanceinc-com-AGENT.md:L6 | neighbors=[You are building UI in the dispatch.apt…] | lang=pt
- "design_extract_output_dispatch_aptmaintenanceinc_com_agent_build_rules": "Build rules" | kind=entity | source=design-extract-output/dispatch-aptmaintenanceinc-com-AGENT.md:L47 | neighbors=[You are building UI in the dispatch.apt…] | lang=en
- "design_extract_output_dispatch_aptmaintenanceinc_com_agent_colour": "Colour" | kind=entity | source=design-extract-output/dispatch-aptmaintenanceinc-com-AGENT.md:L13 | neighbors=[You are building UI in the dispatch.apt…] | lang=en
- "design_extract_output_dispatch_aptmaintenanceinc_com_agent_motion": "Motion" | kind=entity | source=design-extract-output/dispatch-aptmaintenanceinc-com-AGENT.md:L32 | neighbors=[You are building UI in the dispatch.apt…] | lang=en
- "design_extract_output_dispatch_aptmaintenanceinc_com_agent_one_line_install": "One-line install" | kind=entity | source=design-extract-output/dispatch-aptmaintenanceinc-com-AGENT.md:L100 | neighbors=[You are building UI in the dispatch.apt…] | lang=en
- "design_extract_output_dispatch_aptmaintenanceinc_com_agent_output_expectations": "Output expectations" | kind=entity | source=design-extract-output/dispatch-aptmaintenanceinc-com-AGENT.md:L86 | neighbors=[You are building UI in the dispatch.apt…] | lang=en
- "design_extract_output_dispatch_aptmaintenanceinc_com_agent_radii": "Radii" | kind=entity | source=design-extract-output/dispatch-aptmaintenanceinc-com-AGENT.md:L28 | neighbors=[You are building UI in the dispatch.apt…] | lang=en
- "design_extract_output_dispatch_aptmaintenanceinc_com_agent_spacing": "Spacing" | kind=entity | source=design-extract-output/dispatch-aptmaintenanceinc-com-AGENT.md:L24 | neighbors=[You are building UI in the dispatch.apt…] | lang=en
- "design_extract_output_dispatch_aptmaintenanceinc_com_agent_typography": "Typography" | kind=entity | source=design-extract-output/dispatch-aptmaintenanceinc-com-AGENT.md:L19 | neighbors=[You are building UI in the dispatch.apt…] | lang=en
- "design_extract_output_dispatch_aptmaintenanceinc_com_agent_voice": "Voice" | kind=entity | source=design-extract-output/dispatch-aptmaintenanceinc-com-AGENT.md:L36 | neighbors=[You are building UI in the dispatch.apt…] | lang=en
- "design_extract_output_dispatch_aptmaintenanceinc_com_design_colors": "Colors" | kind=entity | source=design-extract-output/dispatch-aptmaintenanceinc-com-DESIGN.md:L38 | neighbors=[dispatch-aptmaintenanceinc-com-DESIGN.md] | lang=en
- "design_extract_output_dispatch_aptmaintenanceinc_com_design_components": "Components" | kind=entity | source=design-extract-output/dispatch-aptmaintenanceinc-com-DESIGN.md:L81 | neighbors=[dispatch-aptmaintenanceinc-com-DESIGN.md] | lang=en
- "design_extract_output_dispatch_aptmaintenanceinc_com_design_do_s_and_don_ts": "Do's and Don'ts" | kind=entity | source=design-extract-output/dispatch-aptmaintenanceinc-com-DESIGN.md:L86 | neighbors=[dispatch-aptmaintenanceinc-com-DESIGN.md] | lang=en
- "design_extract_output_dispatch_aptmaintenanceinc_com_design_elevation_and_depth": "Elevation and Depth" | kind=entity | source=design-extract-output/dispatch-aptmaintenanceinc-com-DESIGN.md:L69 | neighbors=[dispatch-aptmaintenanceinc-com-DESIGN.md] | lang=en
- "design_extract_output_dispatch_aptmaintenanceinc_com_design_language": "dispatch-aptmaintenanceinc-com-design-language.md" | kind=entity | source=design-extract-output/dispatch-aptmaintenanceinc-com-design-language.md:L1 | neighbors=[Design Language: APT Central Command] | lang=en
- "design_extract_output_dispatch_aptmaintenanceinc_com_design_language_accessibility_wcag_2_1": "Accessibility (WCAG 2.1)" | kind=entity | source=design-extract-output/dispatch-aptmaintenanceinc-com-design-language.md:L404 | neighbors=[Design Language: APT Central Command] | lang=en
- "design_extract_output_dispatch_aptmaintenanceinc_com_design_language_background_colors": "Background Colors" | kind=entity | source=design-extract-output/dispatch-aptmaintenanceinc-com-design-language.md:L24 | neighbors=[Color Palette] | lang=en
- "design_extract_output_dispatch_aptmaintenanceinc_com_design_language_body_text": "Body Text" | kind=entity | source=design-extract-output/dispatch-aptmaintenanceinc-com-design-language.md:L59 | neighbors=[Typography] | lang=en
- "design_extract_output_dispatch_aptmaintenanceinc_com_design_language_border_radii": "Border Radii" | kind=entity | source=design-extract-output/dispatch-aptmaintenanceinc-com-design-language.md:L79 | neighbors=[Design Language: APT Central Command] | lang=en
- "design_extract_output_dispatch_aptmaintenanceinc_com_design_language_button_1_instance_1_variant": "Button — 1 instance, 1 variant" | kind=entity | source=design-extract-output/dispatch-aptmaintenanceinc-com-design-language.md:L371 | neighbors=[Component Clusters] | lang=en
- "design_extract_output_dispatch_aptmaintenanceinc_com_design_language_button_copy_patterns": "Button Copy Patterns" | kind=entity | source=design-extract-output/dispatch-aptmaintenanceinc-com-design-language.md:L483 | neighbors=[Brand Voice] | lang=en
- "design_extract_output_dispatch_aptmaintenanceinc_com_design_language_buttons_1_instances": "Buttons (1 instances)" | kind=entity | source=design-extract-output/dispatch-aptmaintenanceinc-com-design-language.md:L353 | neighbors=[Component Patterns] | lang=en
- "design_extract_output_dispatch_aptmaintenanceinc_com_design_language_colors": "Colors" | kind=entity | source=design-extract-output/dispatch-aptmaintenanceinc-com-design-language.md:L88 | neighbors=[CSS Custom Properties] | lang=en
- "design_extract_output_dispatch_aptmaintenanceinc_com_design_language_common_transitions": "Common Transitions" | kind=entity | source=design-extract-output/dispatch-aptmaintenanceinc-com-design-language.md:L316 | neighbors=[Transitions & Animations] | lang=en
- "design_extract_output_dispatch_aptmaintenanceinc_com_design_language_component_library": "Component Library" | kind=entity | source=design-extract-output/dispatch-aptmaintenanceinc-com-design-language.md:L512 | neighbors=[Design Language: APT Central Command] | lang=en
- "design_extract_output_dispatch_aptmaintenanceinc_com_design_language_container_widths": "Container Widths" | kind=entity | source=design-extract-output/dispatch-aptmaintenanceinc-com-design-language.md:L389 | neighbors=[Layout System] | lang=en
- "design_extract_output_dispatch_aptmaintenanceinc_com_design_language_dependencies": "Dependencies" | kind=entity | source=design-extract-output/dispatch-aptmaintenanceinc-com-design-language.md:L288 | neighbors=[CSS Custom Properties] | lang=en
- "design_extract_output_dispatch_aptmaintenanceinc_com_design_language_design_system_score": "Design System Score" | kind=entity | source=design-extract-output/dispatch-aptmaintenanceinc-com-design-language.md:L408 | neighbors=[Design Language: APT Central Command] | lang=en
- "design_extract_output_dispatch_aptmaintenanceinc_com_design_language_duration_tokens": "Duration Tokens" | kind=entity | source=design-extract-output/dispatch-aptmaintenanceinc-com-design-language.md:L464 | neighbors=[Motion Language] | lang=en
- "design_extract_output_dispatch_aptmaintenanceinc_com_design_language_easing_families": "Easing Families" | kind=entity | source=design-extract-output/dispatch-aptmaintenanceinc-com-design-language.md:L471 | neighbors=[Motion Language] | lang=en
- "design_extract_output_dispatch_aptmaintenanceinc_com_design_language_flex_patterns": "Flex Patterns" | kind=entity | source=design-extract-output/dispatch-aptmaintenanceinc-com-design-language.md:L395 | neighbors=[Layout System] | lang=en
- "design_extract_output_dispatch_aptmaintenanceinc_com_design_language_font_files": "Font Files" | kind=entity | source=design-extract-output/dispatch-aptmaintenanceinc-com-design-language.md:L445 | neighbors=[Design Language: APT Central Command] | lang=en
- "design_extract_output_dispatch_aptmaintenanceinc_com_design_language_font_weights_in_use": "Font Weights in Use" | kind=entity | source=design-extract-output/dispatch-aptmaintenanceinc-com-design-language.md:L65 | neighbors=[Typography] | lang=en
- "design_extract_output_dispatch_aptmaintenanceinc_com_design_language_full_color_inventory": "Full Color Inventory" | kind=entity | source=design-extract-output/dispatch-aptmaintenanceinc-com-design-language.md:L32 | neighbors=[Color Palette] | lang=en
- "design_extract_output_dispatch_aptmaintenanceinc_com_design_language_heading_scale": "Heading Scale" | kind=entity | source=design-extract-output/dispatch-aptmaintenanceinc-com-design-language.md:L52 | neighbors=[Typography] | lang=en
- "design_extract_output_dispatch_aptmaintenanceinc_com_design_language_image_style_patterns": "Image Style Patterns" | kind=entity | source=design-extract-output/dispatch-aptmaintenanceinc-com-design-language.md:L452 | neighbors=[Design Language: APT Central Command] | lang=en
- "design_extract_output_dispatch_aptmaintenanceinc_com_design_language_imagery_style": "Imagery Style" | kind=entity | source=design-extract-output/dispatch-aptmaintenanceinc-com-design-language.md:L505 | neighbors=[Design Language: APT Central Command] | lang=en

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\PTOW\1_APT_Central_Command\.graphify\description-instructions\batch-192.json

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
