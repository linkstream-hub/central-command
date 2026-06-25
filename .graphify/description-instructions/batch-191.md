# Node Description Batch 192 of 412

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

- "design_extract_output_aptmaintenanceinc_com_design_language_links_39_instances": "Links (39 instances)" | kind=entity | source=design-extract-output/aptmaintenanceinc-com-design-language.md:L488 | neighbors=[Component Patterns]
- "design_extract_output_aptmaintenanceinc_com_design_language_material_language": "Material Language" | kind=entity | source=design-extract-output/aptmaintenanceinc-com-design-language.md:L854 | neighbors=[Design Language: APT Maintenance]
- "design_extract_output_aptmaintenanceinc_com_design_language_navigation_11_instances": "Navigation (11 instances)" | kind=entity | source=design-extract-output/aptmaintenanceinc-com-design-language.md:L498 | neighbors=[Component Patterns]
- "design_extract_output_aptmaintenanceinc_com_design_language_neutral_colors": "Neutral Colors" | kind=entity | source=design-extract-output/aptmaintenanceinc-com-design-language.md:L18 | neighbors=[Color Palette]
- "design_extract_output_aptmaintenanceinc_com_design_language_other": "Other" | kind=entity | source=design-extract-output/aptmaintenanceinc-com-design-language.md:L242 | neighbors=[CSS Custom Properties]
- "design_extract_output_aptmaintenanceinc_com_design_language_page_intent": "Page Intent" | kind=entity | source=design-extract-output/aptmaintenanceinc-com-design-language.md:L835 | neighbors=[Design Language: APT Maintenance]
- "design_extract_output_aptmaintenanceinc_com_design_language_passing_color_pairs": "Passing Color Pairs" | kind=entity | source=design-extract-output/aptmaintenanceinc-com-design-language.md:L691 | neighbors=[Accessibility (WCAG 2.1)]
- "design_extract_output_aptmaintenanceinc_com_design_language_primary_colors": "Primary Colors" | kind=entity | source=design-extract-output/aptmaintenanceinc-com-design-language.md:L10 | neighbors=[Color Palette]
- "design_extract_output_aptmaintenanceinc_com_design_language_quick_start": "Quick Start" | kind=entity | source=design-extract-output/aptmaintenanceinc-com-design-language.md:L874 | neighbors=[Design Language: APT Maintenance]
- "design_extract_output_aptmaintenanceinc_com_design_language_sample_headings": "Sample Headings" | kind=entity | source=design-extract-output/aptmaintenanceinc-com-design-language.md:L823 | neighbors=[Brand Voice]
- "design_extract_output_aptmaintenanceinc_com_design_language_section_roles": "Section Roles" | kind=entity | source=design-extract-output/aptmaintenanceinc-com-design-language.md:L842 | neighbors=[Design Language: APT Maintenance]
- "design_extract_output_aptmaintenanceinc_com_design_language_semantic": "Semantic" | kind=entity | source=design-extract-output/aptmaintenanceinc-com-design-language.md:L283 | neighbors=[CSS Custom Properties]
- "design_extract_output_aptmaintenanceinc_com_design_language_shadows": "Shadows" | kind=entity | source=design-extract-output/aptmaintenanceinc-com-design-language.md:L232 | neighbors=[CSS Custom Properties]
- "design_extract_output_aptmaintenanceinc_com_design_language_svg_icons": "SVG Icons" | kind=entity | source=design-extract-output/aptmaintenanceinc-com-design-language.md:L743 | neighbors=[Design Language: APT Maintenance]
- "design_extract_output_aptmaintenanceinc_com_design_language_switches_1_instances": "Switches (1 instances)" | kind=entity | source=design-extract-output/aptmaintenanceinc-com-design-language.md:L549 | neighbors=[Component Patterns]
- "design_extract_output_aptmaintenanceinc_com_design_language_text_colors": "Text Colors" | kind=entity | source=design-extract-output/aptmaintenanceinc-com-design-language.md:L39 | neighbors=[Color Palette]
- "design_extract_output_aptmaintenanceinc_com_design_language_top_cta_verbs": "Top CTA Verbs" | kind=entity | source=design-extract-output/aptmaintenanceinc-com-design-language.md:L807 | neighbors=[Brand Voice]
- "design_extract_output_aptmaintenanceinc_com_design_language_type_scale": "Type Scale" | kind=entity | source=design-extract-output/aptmaintenanceinc-com-design-language.md:L84 | neighbors=[Typography]
- "design_extract_output_aptmaintenanceinc_com_design_language_z_index_map": "Z-Index Map" | kind=entity | source=design-extract-output/aptmaintenanceinc-com-design-language.md:L734 | neighbors=[Design Language: APT Maintenance]
- "design_extract_output_aptmaintenanceinc_com_design_layout": "Layout" | kind=entity | source=design-extract-output/aptmaintenanceinc-com-DESIGN.md:L73 | neighbors=[aptmaintenanceinc-com-DESIGN.md]
- "design_extract_output_aptmaintenanceinc_com_design_overview": "Overview" | kind=entity | source=design-extract-output/aptmaintenanceinc-com-DESIGN.md:L31 | neighbors=[aptmaintenanceinc-com-DESIGN.md]
- "design_extract_output_aptmaintenanceinc_com_design_shapes": "Shapes" | kind=entity | source=design-extract-output/aptmaintenanceinc-com-DESIGN.md:L93 | neighbors=[aptmaintenanceinc-com-DESIGN.md]
- "design_extract_output_aptmaintenanceinc_com_design_typography": "Typography" | kind=entity | source=design-extract-output/aptmaintenanceinc-com-DESIGN.md:L57 | neighbors=[aptmaintenanceinc-com-DESIGN.md]
- "design_extract_output_aptmaintenanceinc_com_motion_framer_durations": "durations" | kind=code-symbol | source=design-extract-output/aptmaintenanceinc-com-motion.framer.js:L15 | neighbors=[aptmaintenanceinc-com-motion.framer.js]
- "design_extract_output_aptmaintenanceinc_com_motion_framer_easings": "easings" | kind=code-symbol | source=design-extract-output/aptmaintenanceinc-com-motion.framer.js:L10 | neighbors=[aptmaintenanceinc-com-motion.framer.js]
- "design_extract_output_aptmaintenanceinc_com_motion_framer_inview": "inView" | kind=code-symbol | source=design-extract-output/aptmaintenanceinc-com-motion.framer.js:L74 | neighbors=[aptmaintenanceinc-com-motion.framer.js]
- "design_extract_output_aptmaintenanceinc_com_motion_framer_springs": "springs" | kind=code-symbol | source=design-extract-output/aptmaintenanceinc-com-motion.framer.js:L23 | neighbors=[aptmaintenanceinc-com-motion.framer.js]
- "design_extract_output_aptmaintenanceinc_com_motion_framer_transitions": "transitions" | kind=code-symbol | source=design-extract-output/aptmaintenanceinc-com-motion.framer.js:L28 | neighbors=[aptmaintenanceinc-com-motion.framer.js]
- "design_extract_output_aptmaintenanceinc_com_motion_framer_variants": "variants" | kind=code-symbol | source=design-extract-output/aptmaintenanceinc-com-motion.framer.js:L36 | neighbors=[aptmaintenanceinc-com-motion.framer.js]
- "design_extract_output_aptmaintenanceinc_com_motion_one_animations": "animations" | kind=code-symbol | source=design-extract-output/aptmaintenanceinc-com-motion.one.js:L44 | neighbors=[aptmaintenanceinc-com-motion.one.js]
- "design_extract_output_aptmaintenanceinc_com_motion_one_durations": "durations" | kind=code-symbol | source=design-extract-output/aptmaintenanceinc-com-motion.one.js:L17 | neighbors=[aptmaintenanceinc-com-motion.one.js]
- "design_extract_output_aptmaintenanceinc_com_motion_one_easings": "easings" | kind=code-symbol | source=design-extract-output/aptmaintenanceinc-com-motion.one.js:L12 | neighbors=[aptmaintenanceinc-com-motion.one.js]
- "design_extract_output_aptmaintenanceinc_com_motion_one_enteronview": "enterOnView()" | kind=code-symbol | source=design-extract-output/aptmaintenanceinc-com-motion.one.js:L62 | neighbors=[aptmaintenanceinc-com-motion.one.js]
- "design_extract_output_aptmaintenanceinc_com_motion_one_keyframes": "keyframes" | kind=code-symbol | source=design-extract-output/aptmaintenanceinc-com-motion.one.js:L30 | neighbors=[aptmaintenanceinc-com-motion.one.js]
- "design_extract_output_aptmaintenanceinc_com_motion_one_parallaxy": "parallaxY()" | kind=code-symbol | source=design-extract-output/aptmaintenanceinc-com-motion.one.js:L65 | neighbors=[aptmaintenanceinc-com-motion.one.js]
- "design_extract_output_aptmaintenanceinc_com_motion_one_springs": "springs" | kind=code-symbol | source=design-extract-output/aptmaintenanceinc-com-motion.one.js:L25 | neighbors=[aptmaintenanceinc-com-motion.one.js]
- "design_extract_output_aptmaintenanceinc_com_motion_one_t": "_t" | kind=code-symbol | source=design-extract-output/aptmaintenanceinc-com-motion.one.js:L42 | neighbors=[aptmaintenanceinc-com-motion.one.js]
- "design_extract_output_aptmaintenanceinc_com_motion_tailwind_extend": "extend" | kind=code-symbol | source=design-extract-output/aptmaintenanceinc-com-motion.tailwind.js:L11 | neighbors=[aptmaintenanceinc-com-motion.tailwind.js]
- "design_extract_output_aptmaintenanceinc_com_theme_muitheme": "muiTheme" | kind=code-symbol | source=design-extract-output/aptmaintenanceinc-com-theme.js:L159 | neighbors=[aptmaintenanceinc-com-theme.js]
- "design_extract_output_aptmaintenanceinc_com_theme_theme": "theme" | kind=code-symbol | source=design-extract-output/aptmaintenanceinc-com-theme.js:L79 | neighbors=[aptmaintenanceinc-com-theme.js]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\PTOW\1_APT_Central_Command\.graphify\description-instructions\batch-191.json

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
