# Node Description Batch 38 of 49

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
Write every description in English (en). Do not switch languages.
No marketing language.
Respond ONLY with a JSON object mapping each node id (as a string) to its
one-sentence description — no prose, no markdown fences.

- "dashboard_schedulingdispatch_todatestr": "toDateStr()" | kind=code-symbol | source=tech-pwa/src/components/dashboard/SchedulingDispatch.tsx:L66 | neighbors=[SchedulingDispatch.tsx]
- "dashboard_summarycards_summarycards": "SummaryCards()" | kind=code-symbol | source=tech-pwa/src/components/dashboard/SummaryCards.tsx:L15 | neighbors=[SummaryCards.tsx]
- "dashboard_summarycards_summarycardsprops": "SummaryCardsProps" | kind=code-symbol | source=tech-pwa/src/components/dashboard/SummaryCards.tsx:L9 | neighbors=[SummaryCards.tsx]
- "dashboard_techcard_techcard": "TechCard()" | kind=code-symbol | source=tech-pwa/src/components/dashboard/TechCard.tsx:L15 | neighbors=[TechCard.tsx]
- "dashboard_techcard_techcardprops": "TechCardProps" | kind=code-symbol | source=tech-pwa/src/components/dashboard/TechCard.tsx:L8 | neighbors=[TechCard.tsx]
- "dashboard_techrow_techrowprops": "TechRowProps" | kind=code-symbol | source=tech-pwa/src/components/dashboard/TechRow.tsx:L4 | neighbors=[TechRow.tsx]
- "dashboard_urgentqueuepanel_urgentqueuepanel": "UrgentQueuePanel()" | kind=code-symbol | source=tech-pwa/src/components/dashboard/UrgentQueuePanel.tsx:L8 | neighbors=[UrgentQueuePanel.tsx]
- "dashboard_urgentqueuepanel_urgentqueuepanelprops": "UrgentQueuePanelProps" | kind=code-symbol | source=tech-pwa/src/components/dashboard/UrgentQueuePanel.tsx:L4 | neighbors=[UrgentQueuePanel.tsx]
- "design_extract_output_aptmaintenanceinc_com_anatomy_button": "Button()" | kind=code-symbol | source=design-extract-output/aptmaintenanceinc-com-anatomy.tsx:L13 | neighbors=[aptmaintenanceinc-com-anatomy.tsx]
- "design_extract_output_aptmaintenanceinc_com_anatomy_buttonprops": "ButtonProps" | kind=code-symbol | source=design-extract-output/aptmaintenanceinc-com-anatomy.tsx:L6 | neighbors=[aptmaintenanceinc-com-anatomy.tsx]
- "design_extract_output_aptmaintenanceinc_com_anatomy_input": "Input()" | kind=code-symbol | source=design-extract-output/aptmaintenanceinc-com-anatomy.tsx:L23 | neighbors=[aptmaintenanceinc-com-anatomy.tsx]
- "design_extract_output_aptmaintenanceinc_com_anatomy_inputprops": "InputProps" | kind=code-symbol | source=design-extract-output/aptmaintenanceinc-com-anatomy.tsx:L17 | neighbors=[aptmaintenanceinc-com-anatomy.tsx]
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

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\PTOW\1_APT_Central_Command\.graphify\description-instructions\batch-037.json

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
