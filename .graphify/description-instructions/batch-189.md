# Node Description Batch 190 of 412

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
Write every description in Portuguese (pt). Do not switch languages.
No marketing language.
Respond ONLY with a JSON object mapping each node id (as a string) to its
one-sentence description — no prose, no markdown fences.

- "dashboard_schedulepagecomponents_time_labels": "TIME_LABELS" | kind=code-symbol | source=tech-pwa/src/components/dashboard/SchedulePageComponents.tsx:L137 | neighbors=[SchedulePageComponents.tsx]
- "dashboard_schedulepagecomponents_time_slots": "TIME_SLOTS" | kind=code-symbol | source=tech-pwa/src/components/dashboard/SchedulePageComponents.tsx:L136 | neighbors=[SchedulePageComponents.tsx]
- "dashboard_schedulingdispatch_day_short": "DAY_SHORT" | kind=code-symbol | source=tech-pwa/src/components/dashboard/SchedulingDispatch.tsx:L48 | neighbors=[SchedulingDispatch.tsx]
- "dashboard_schedulingdispatch_getnext7businessdays": "getNext7BusinessDays()" | kind=code-symbol | source=tech-pwa/src/components/dashboard/SchedulingDispatch.tsx:L68 | neighbors=[SchedulingDispatch.tsx]
- "dashboard_schedulingdispatch_getrankinfo": "getRankInfo()" | kind=code-symbol | source=tech-pwa/src/components/dashboard/SchedulingDispatch.tsx:L95 | neighbors=[SchedulingDispatch.tsx]
- "dashboard_schedulingdispatch_getskillmatch": "getSkillMatch()" | kind=code-symbol | source=tech-pwa/src/components/dashboard/SchedulingDispatch.tsx:L85 | neighbors=[SchedulingDispatch.tsx]
- "dashboard_schedulingdispatch_mon_short": "MON_SHORT" | kind=code-symbol | source=tech-pwa/src/components/dashboard/SchedulingDispatch.tsx:L49 | neighbors=[SchedulingDispatch.tsx]
- "dashboard_schedulingdispatch_schedulingdispatch": "SchedulingDispatch()" | kind=code-symbol | source=tech-pwa/src/components/dashboard/SchedulingDispatch.tsx:L115 | neighbors=[SchedulingDispatch.tsx]
- "dashboard_schedulingdispatch_service_to_skill": "SERVICE_TO_SKILL" | kind=code-symbol | source=tech-pwa/src/components/dashboard/SchedulingDispatch.tsx:L37 | neighbors=[SchedulingDispatch.tsx]
- "dashboard_schedulingdispatch_skill_badge": "SKILL_BADGE" | kind=code-symbol | source=tech-pwa/src/components/dashboard/SchedulingDispatch.tsx:L42 | neighbors=[SchedulingDispatch.tsx]
- "dashboard_schedulingdispatch_time_slots": "TIME_SLOTS" | kind=code-symbol | source=tech-pwa/src/components/dashboard/SchedulingDispatch.tsx:L51 | neighbors=[SchedulingDispatch.tsx]
- "dashboard_schedulingdispatch_todatestr": "toDateStr()" | kind=code-symbol | source=tech-pwa/src/components/dashboard/SchedulingDispatch.tsx:L66 | neighbors=[SchedulingDispatch.tsx]
- "dashboard_summarycards_summarycards": "SummaryCards()" | kind=code-symbol | source=tech-pwa/src/components/dashboard/SummaryCards.tsx:L15 | neighbors=[SummaryCards.tsx]
- "dashboard_urgentqueuepanel_urgentqueuepanel": "UrgentQueuePanel()" | kind=code-symbol | source=tech-pwa/src/components/dashboard/UrgentQueuePanel.tsx:L8 | neighbors=[UrgentQueuePanel.tsx]
- "design": "DESIGN.md" | kind=entity | source=DESIGN.md:L1 | neighbors=[Design System: APT Central Command]
- "design_1_overview": "1. Overview" | kind=entity | source=DESIGN.md:L95 | neighbors=[Design System: APT Central Command]
- "design_buttons": "Buttons" | kind=entity | source=DESIGN.md:L181 | neighbors=[5. Components]
- "design_cards_containers": "Cards / Containers" | kind=entity | source=DESIGN.md:L197 | neighbors=[5. Components]
- "design_do": "Do:" | kind=entity | source=DESIGN.md:L225 | neighbors=[6. Do's and Don'ts]
- "design_don_t": "Don't:" | kind=entity | source=DESIGN.md:L236 | neighbors=[6. Do's and Don'ts]
- "design_extract_output_aptmaintenanceinc_com_agent": "aptmaintenanceinc-com-AGENT.md" | kind=entity | source=design-extract-output/aptmaintenanceinc-com-AGENT.md:L1 | neighbors=[You are building UI in the aptmaintenan…]
- "design_extract_output_aptmaintenanceinc_com_agent_accessibility": "Accessibility" | kind=entity | source=design-extract-output/aptmaintenanceinc-com-AGENT.md:L50 | neighbors=[You are building UI in the aptmaintenan…]
- "design_extract_output_aptmaintenanceinc_com_agent_available_context_files": "Available context files" | kind=entity | source=design-extract-output/aptmaintenanceinc-com-AGENT.md:L72 | neighbors=[You are building UI in the aptmaintenan…]
- "design_extract_output_aptmaintenanceinc_com_agent_brand_at_a_glance": "Brand at a glance" | kind=entity | source=design-extract-output/aptmaintenanceinc-com-AGENT.md:L6 | neighbors=[You are building UI in the aptmaintenan…]
- "design_extract_output_aptmaintenanceinc_com_agent_build_rules": "Build rules" | kind=entity | source=design-extract-output/aptmaintenanceinc-com-AGENT.md:L54 | neighbors=[You are building UI in the aptmaintenan…]
- "design_extract_output_aptmaintenanceinc_com_agent_colour": "Colour" | kind=entity | source=design-extract-output/aptmaintenanceinc-com-AGENT.md:L13 | neighbors=[You are building UI in the aptmaintenan…]
- "design_extract_output_aptmaintenanceinc_com_agent_component_anatomy": "Component anatomy" | kind=entity | source=design-extract-output/aptmaintenanceinc-com-AGENT.md:L45 | neighbors=[You are building UI in the aptmaintenan…]
- "design_extract_output_aptmaintenanceinc_com_agent_motion": "Motion" | kind=entity | source=design-extract-output/aptmaintenanceinc-com-AGENT.md:L34 | neighbors=[You are building UI in the aptmaintenan…]
- "design_extract_output_aptmaintenanceinc_com_agent_one_line_install": "One-line install" | kind=entity | source=design-extract-output/aptmaintenanceinc-com-AGENT.md:L107 | neighbors=[You are building UI in the aptmaintenan…]
- "design_extract_output_aptmaintenanceinc_com_agent_output_expectations": "Output expectations" | kind=entity | source=design-extract-output/aptmaintenanceinc-com-AGENT.md:L93 | neighbors=[You are building UI in the aptmaintenan…]
- "design_extract_output_aptmaintenanceinc_com_agent_radii": "Radii" | kind=entity | source=design-extract-output/aptmaintenanceinc-com-AGENT.md:L30 | neighbors=[You are building UI in the aptmaintenan…]
- "design_extract_output_aptmaintenanceinc_com_agent_spacing": "Spacing" | kind=entity | source=design-extract-output/aptmaintenanceinc-com-AGENT.md:L26 | neighbors=[You are building UI in the aptmaintenan…]
- "design_extract_output_aptmaintenanceinc_com_agent_typography": "Typography" | kind=entity | source=design-extract-output/aptmaintenanceinc-com-AGENT.md:L20 | neighbors=[You are building UI in the aptmaintenan…]
- "design_extract_output_aptmaintenanceinc_com_agent_voice": "Voice" | kind=entity | source=design-extract-output/aptmaintenanceinc-com-AGENT.md:L38 | neighbors=[You are building UI in the aptmaintenan…]
- "design_extract_output_aptmaintenanceinc_com_anatomy_button": "Button()" | kind=code-symbol | source=design-extract-output/aptmaintenanceinc-com-anatomy.tsx:L13 | neighbors=[aptmaintenanceinc-com-anatomy.tsx]
- "design_extract_output_aptmaintenanceinc_com_anatomy_buttonprops": "ButtonProps" | kind=code-symbol | source=design-extract-output/aptmaintenanceinc-com-anatomy.tsx:L6 | neighbors=[aptmaintenanceinc-com-anatomy.tsx]
- "design_extract_output_aptmaintenanceinc_com_anatomy_input": "Input()" | kind=code-symbol | source=design-extract-output/aptmaintenanceinc-com-anatomy.tsx:L23 | neighbors=[aptmaintenanceinc-com-anatomy.tsx]
- "design_extract_output_aptmaintenanceinc_com_anatomy_inputprops": "InputProps" | kind=code-symbol | source=design-extract-output/aptmaintenanceinc-com-anatomy.tsx:L17 | neighbors=[aptmaintenanceinc-com-anatomy.tsx]
- "design_extract_output_aptmaintenanceinc_com_design_colors": "Colors" | kind=entity | source=design-extract-output/aptmaintenanceinc-com-DESIGN.md:L43 | neighbors=[aptmaintenanceinc-com-DESIGN.md]
- "design_extract_output_aptmaintenanceinc_com_design_components": "Components" | kind=entity | source=design-extract-output/aptmaintenanceinc-com-DESIGN.md:L101 | neighbors=[aptmaintenanceinc-com-DESIGN.md]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\PTOW\1_APT_Central_Command\.graphify\description-instructions\batch-189.json

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
