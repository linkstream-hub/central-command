# Node Description Batch 194 of 412

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

- "design_extract_output_dispatch_aptmaintenanceinc_com_design_language_keyframe_animations": "Keyframe Animations" | kind=entity | source=design-extract-output/dispatch-aptmaintenanceinc-com-design-language.md:L324 | neighbors=[Transitions & Animations]
- "design_extract_output_dispatch_aptmaintenanceinc_com_design_language_material_language": "Material Language" | kind=entity | source=design-extract-output/dispatch-aptmaintenanceinc-com-design-language.md:L492 | neighbors=[Design Language: APT Central Command]
- "design_extract_output_dispatch_aptmaintenanceinc_com_design_language_neutral_colors": "Neutral Colors" | kind=entity | source=design-extract-output/dispatch-aptmaintenanceinc-com-design-language.md:L17 | neighbors=[Color Palette]
- "design_extract_output_dispatch_aptmaintenanceinc_com_design_language_other": "Other" | kind=entity | source=design-extract-output/dispatch-aptmaintenanceinc-com-design-language.md:L251 | neighbors=[CSS Custom Properties]
- "design_extract_output_dispatch_aptmaintenanceinc_com_design_language_page_intent": "Page Intent" | kind=entity | source=design-extract-output/dispatch-aptmaintenanceinc-com-design-language.md:L487 | neighbors=[Design Language: APT Central Command]
- "design_extract_output_dispatch_aptmaintenanceinc_com_design_language_primary_colors": "Primary Colors" | kind=entity | source=design-extract-output/dispatch-aptmaintenanceinc-com-design-language.md:L10 | neighbors=[Color Palette]
- "design_extract_output_dispatch_aptmaintenanceinc_com_design_language_quick_start": "Quick Start" | kind=entity | source=design-extract-output/dispatch-aptmaintenanceinc-com-design-language.md:L519 | neighbors=[Design Language: APT Central Command]
- "design_extract_output_dispatch_aptmaintenanceinc_com_design_language_radii": "Radii" | kind=entity | source=design-extract-output/dispatch-aptmaintenanceinc-com-design-language.md:L240 | neighbors=[CSS Custom Properties]
- "design_extract_output_dispatch_aptmaintenanceinc_com_design_language_semantic": "Semantic" | kind=entity | source=design-extract-output/dispatch-aptmaintenanceinc-com-design-language.md:L301 | neighbors=[CSS Custom Properties]
- "design_extract_output_dispatch_aptmaintenanceinc_com_design_language_shadows": "Shadows" | kind=entity | source=design-extract-output/dispatch-aptmaintenanceinc-com-design-language.md:L229 | neighbors=[CSS Custom Properties]
- "design_extract_output_dispatch_aptmaintenanceinc_com_design_language_svg_icons": "SVG Icons" | kind=entity | source=design-extract-output/dispatch-aptmaintenanceinc-com-design-language.md:L435 | neighbors=[Design Language: APT Central Command]
- "design_extract_output_dispatch_aptmaintenanceinc_com_design_language_text_colors": "Text Colors" | kind=entity | source=design-extract-output/dispatch-aptmaintenanceinc-com-design-language.md:L28 | neighbors=[Color Palette]
- "design_extract_output_dispatch_aptmaintenanceinc_com_design_language_top_cta_verbs": "Top CTA Verbs" | kind=entity | source=design-extract-output/dispatch-aptmaintenanceinc-com-design-language.md:L479 | neighbors=[Brand Voice]
- "design_extract_output_dispatch_aptmaintenanceinc_com_design_language_type_scale": "Type Scale" | kind=entity | source=design-extract-output/dispatch-aptmaintenanceinc-com-design-language.md:L43 | neighbors=[Typography]
- "design_extract_output_dispatch_aptmaintenanceinc_com_design_language_z_index_map": "Z-Index Map" | kind=entity | source=design-extract-output/dispatch-aptmaintenanceinc-com-design-language.md:L427 | neighbors=[Design Language: APT Central Command]
- "design_extract_output_dispatch_aptmaintenanceinc_com_design_layout": "Layout" | kind=entity | source=design-extract-output/dispatch-aptmaintenanceinc-com-DESIGN.md:L62 | neighbors=[dispatch-aptmaintenanceinc-com-DESIGN.md]
- "design_extract_output_dispatch_aptmaintenanceinc_com_design_overview": "Overview" | kind=entity | source=design-extract-output/dispatch-aptmaintenanceinc-com-DESIGN.md:L24 | neighbors=[dispatch-aptmaintenanceinc-com-DESIGN.md]
- "design_extract_output_dispatch_aptmaintenanceinc_com_design_shapes": "Shapes" | kind=entity | source=design-extract-output/dispatch-aptmaintenanceinc-com-DESIGN.md:L75 | neighbors=[dispatch-aptmaintenanceinc-com-DESIGN.md]
- "design_extract_output_dispatch_aptmaintenanceinc_com_design_typography": "Typography" | kind=entity | source=design-extract-output/dispatch-aptmaintenanceinc-com-DESIGN.md:L51 | neighbors=[dispatch-aptmaintenanceinc-com-DESIGN.md]
- "design_extract_output_dispatch_aptmaintenanceinc_com_motion_framer_durations": "durations" | kind=code-symbol | source=design-extract-output/dispatch-aptmaintenanceinc-com-motion.framer.js:L15 | neighbors=[dispatch-aptmaintenanceinc-com-motion.f…]
- "design_extract_output_dispatch_aptmaintenanceinc_com_motion_framer_easings": "easings" | kind=code-symbol | source=design-extract-output/dispatch-aptmaintenanceinc-com-motion.framer.js:L10 | neighbors=[dispatch-aptmaintenanceinc-com-motion.f…]
- "design_extract_output_dispatch_aptmaintenanceinc_com_motion_framer_inview": "inView" | kind=code-symbol | source=design-extract-output/dispatch-aptmaintenanceinc-com-motion.framer.js:L58 | neighbors=[dispatch-aptmaintenanceinc-com-motion.f…]
- "design_extract_output_dispatch_aptmaintenanceinc_com_motion_framer_springs": "springs" | kind=code-symbol | source=design-extract-output/dispatch-aptmaintenanceinc-com-motion.framer.js:L21 | neighbors=[dispatch-aptmaintenanceinc-com-motion.f…]
- "design_extract_output_dispatch_aptmaintenanceinc_com_motion_framer_transitions": "transitions" | kind=code-symbol | source=design-extract-output/dispatch-aptmaintenanceinc-com-motion.framer.js:L26 | neighbors=[dispatch-aptmaintenanceinc-com-motion.f…]
- "design_extract_output_dispatch_aptmaintenanceinc_com_motion_framer_variants": "variants" | kind=code-symbol | source=design-extract-output/dispatch-aptmaintenanceinc-com-motion.framer.js:L34 | neighbors=[dispatch-aptmaintenanceinc-com-motion.f…]
- "design_extract_output_dispatch_aptmaintenanceinc_com_motion_one_animations": "animations" | kind=code-symbol | source=design-extract-output/dispatch-aptmaintenanceinc-com-motion.one.js:L35 | neighbors=[dispatch-aptmaintenanceinc-com-motion.o…]
- "design_extract_output_dispatch_aptmaintenanceinc_com_motion_one_durations": "durations" | kind=code-symbol | source=design-extract-output/dispatch-aptmaintenanceinc-com-motion.one.js:L17 | neighbors=[dispatch-aptmaintenanceinc-com-motion.o…]
- "design_extract_output_dispatch_aptmaintenanceinc_com_motion_one_easings": "easings" | kind=code-symbol | source=design-extract-output/dispatch-aptmaintenanceinc-com-motion.one.js:L12 | neighbors=[dispatch-aptmaintenanceinc-com-motion.o…]
- "design_extract_output_dispatch_aptmaintenanceinc_com_motion_one_enteronview": "enterOnView()" | kind=code-symbol | source=design-extract-output/dispatch-aptmaintenanceinc-com-motion.one.js:L53 | neighbors=[dispatch-aptmaintenanceinc-com-motion.o…]
- "design_extract_output_dispatch_aptmaintenanceinc_com_motion_one_keyframes": "keyframes" | kind=code-symbol | source=design-extract-output/dispatch-aptmaintenanceinc-com-motion.one.js:L28 | neighbors=[dispatch-aptmaintenanceinc-com-motion.o…]
- "design_extract_output_dispatch_aptmaintenanceinc_com_motion_one_parallaxy": "parallaxY()" | kind=code-symbol | source=design-extract-output/dispatch-aptmaintenanceinc-com-motion.one.js:L56 | neighbors=[dispatch-aptmaintenanceinc-com-motion.o…]
- "design_extract_output_dispatch_aptmaintenanceinc_com_motion_one_springs": "springs" | kind=code-symbol | source=design-extract-output/dispatch-aptmaintenanceinc-com-motion.one.js:L23 | neighbors=[dispatch-aptmaintenanceinc-com-motion.o…]
- "design_extract_output_dispatch_aptmaintenanceinc_com_motion_one_t": "_t" | kind=code-symbol | source=design-extract-output/dispatch-aptmaintenanceinc-com-motion.one.js:L33 | neighbors=[dispatch-aptmaintenanceinc-com-motion.o…]
- "design_extract_output_dispatch_aptmaintenanceinc_com_motion_tailwind_extend": "extend" | kind=code-symbol | source=design-extract-output/dispatch-aptmaintenanceinc-com-motion.tailwind.js:L11 | neighbors=[dispatch-aptmaintenanceinc-com-motion.t…]
- "design_extract_output_dispatch_aptmaintenanceinc_com_theme_muitheme": "muiTheme" | kind=code-symbol | source=design-extract-output/dispatch-aptmaintenanceinc-com-theme.js:L87 | neighbors=[dispatch-aptmaintenanceinc-com-theme.js]
- "design_extract_output_dispatch_aptmaintenanceinc_com_theme_theme": "theme" | kind=code-symbol | source=design-extract-output/dispatch-aptmaintenanceinc-com-theme.js:L45 | neighbors=[dispatch-aptmaintenanceinc-com-theme.js]
- "design_hierarchy": "Hierarchy" | kind=entity | source=DESIGN.md:L154 | neighbors=[3. Typography]
- "design_inputs_fields": "Inputs / Fields" | kind=entity | source=DESIGN.md:L204 | neighbors=[5. Components]
- "design_navigation": "Navigation" | kind=entity | source=DESIGN.md:L211 | neighbors=[5. Components]
- "design_neutral": "Neutral" | kind=entity | source=DESIGN.md:L120 | neighbors=[2. Colors: The Signal Palette]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\PTOW\1_APT_Central_Command\.graphify\description-instructions\batch-193.json

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
