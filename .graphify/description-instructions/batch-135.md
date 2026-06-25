# Node Description Batch 136 of 412

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

- "agents_skills_archive_impeccable_reference_live_md_reference_live_the_contract_read_once": "The contract (read once)" | kind=entity | source=.agents/skills_archive/impeccable/reference/live.md:L9 | neighbors=[live.md]
- "agents_skills_archive_impeccable_reference_live_md_reference_live_troubleshooting": "Troubleshooting" | kind=entity | source=.agents/skills_archive/impeccable/reference/live.md:L716 | neighbors=[First-time setup (config missing or inv…]
- "agents_skills_archive_impeccable_reference_onboard_md_reference_onboard_assess_onboarding_needs": "Assess Onboarding Needs" | kind=entity | source=.agents/skills_archive/impeccable/reference/onboard.md:L5 | neighbors=[onboard.md]
- "agents_skills_archive_impeccable_reference_onboard_md_reference_onboard_context_over_ceremony": "Context Over Ceremony" | kind=entity | source=.agents/skills_archive/impeccable/reference/onboard.md:L48 | neighbors=[Onboarding Principles]
- "agents_skills_archive_impeccable_reference_onboard_md_reference_onboard_contextual_help": "Contextual Help" | kind=entity | source=.agents/skills_archive/impeccable/reference/onboard.md:L184 | neighbors=[Empty State Design]
- "agents_skills_archive_impeccable_reference_onboard_md_reference_onboard_documentation_help": "Documentation & Help" | kind=entity | source=.agents/skills_archive/impeccable/reference/onboard.md:L155 | neighbors=[Design Onboarding Experiences]
- "agents_skills_archive_impeccable_reference_onboard_md_reference_onboard_feature_discovery_adoption": "Feature Discovery & Adoption" | kind=entity | source=.agents/skills_archive/impeccable/reference/onboard.md:L88 | neighbors=[Design Onboarding Experiences]
- "agents_skills_archive_impeccable_reference_onboard_md_reference_onboard_guided_tours_walkthroughs": "Guided Tours & Walkthroughs" | kind=entity | source=.agents/skills_archive/impeccable/reference/onboard.md:L122 | neighbors=[Design Onboarding Experiences]
- "agents_skills_archive_impeccable_reference_onboard_md_reference_onboard_how_to_get_started": "How to Get Started" | kind=entity | source=.agents/skills_archive/impeccable/reference/onboard.md:L178 | neighbors=[Empty State Design]
- "agents_skills_archive_impeccable_reference_onboard_md_reference_onboard_initial_product_onboarding": "Initial Product Onboarding" | kind=entity | source=.agents/skills_archive/impeccable/reference/onboard.md:L62 | neighbors=[Design Onboarding Experiences]
- "agents_skills_archive_impeccable_reference_onboard_md_reference_onboard_interactive_tutorials": "Interactive Tutorials" | kind=entity | source=.agents/skills_archive/impeccable/reference/onboard.md:L141 | neighbors=[Design Onboarding Experiences]
- "agents_skills_archive_impeccable_reference_onboard_md_reference_onboard_make_it_optional_when_possible": "Make It Optional (When Possible)" | kind=entity | source=.agents/skills_archive/impeccable/reference/onboard.md:L37 | neighbors=[Onboarding Principles]
- "agents_skills_archive_impeccable_reference_onboard_md_reference_onboard_respect_user_intelligence": "Respect User Intelligence" | kind=entity | source=.agents/skills_archive/impeccable/reference/onboard.md:L53 | neighbors=[Onboarding Principles]
- "agents_skills_archive_impeccable_reference_onboard_md_reference_onboard_show_don_t_tell": "Show, Don't Tell" | kind=entity | source=.agents/skills_archive/impeccable/reference/onboard.md:L32 | neighbors=[Onboarding Principles]
- "agents_skills_archive_impeccable_reference_onboard_md_reference_onboard_technical_approaches": "Technical approaches:" | kind=entity | source=.agents/skills_archive/impeccable/reference/onboard.md:L196 | neighbors=[Implementation Patterns]
- "agents_skills_archive_impeccable_reference_onboard_md_reference_onboard_time_to_value": "Time to Value" | kind=entity | source=.agents/skills_archive/impeccable/reference/onboard.md:L42 | neighbors=[Onboarding Principles]
- "agents_skills_archive_impeccable_reference_onboard_md_reference_onboard_verify_onboarding_quality": "Verify Onboarding Quality" | kind=entity | source=.agents/skills_archive/impeccable/reference/onboard.md:L223 | neighbors=[onboard.md]
- "agents_skills_archive_impeccable_reference_onboard_md_reference_onboard_visual_interest": "Visual Interest" | kind=entity | source=.agents/skills_archive/impeccable/reference/onboard.md:L181 | neighbors=[Empty State Design]
- "agents_skills_archive_impeccable_reference_onboard_md_reference_onboard_what_will_be_here": "What Will Be Here" | kind=entity | source=.agents/skills_archive/impeccable/reference/onboard.md:L172 | neighbors=[Empty State Design]
- "agents_skills_archive_impeccable_reference_onboard_md_reference_onboard_why_it_matters": "Why It Matters" | kind=entity | source=.agents/skills_archive/impeccable/reference/onboard.md:L175 | neighbors=[Empty State Design]
- "agents_skills_archive_impeccable_reference_optimize_md_reference_optimize_animation_performance": "Animation Performance" | kind=entity | source=.agents/skills_archive/impeccable/reference/optimize.md:L117 | neighbors=[Optimization Strategy]
- "agents_skills_archive_impeccable_reference_optimize_md_reference_optimize_assess_performance_issues": "Assess Performance Issues" | kind=entity | source=.agents/skills_archive/impeccable/reference/optimize.md:L3 | neighbors=[optimize.md]
- "agents_skills_archive_impeccable_reference_optimize_md_reference_optimize_cumulative_layout_shift_cls_0_1": "Cumulative Layout Shift (CLS < 0.1)" | kind=entity | source=.agents/skills_archive/impeccable/reference/optimize.md:L205 | neighbors=[Core Web Vitals Optimization]
- "agents_skills_archive_impeccable_reference_optimize_md_reference_optimize_first_input_delay_fid_100ms_inp_200ms": "First Input Delay (FID < 100ms) / INP (< 200ms)" | kind=entity | source=.agents/skills_archive/impeccable/reference/optimize.md:L199 | neighbors=[Core Web Vitals Optimization]
- "agents_skills_archive_impeccable_reference_optimize_md_reference_optimize_largest_contentful_paint_lcp_2_5s": "Largest Contentful Paint (LCP < 2.5s)" | kind=entity | source=.agents/skills_archive/impeccable/reference/optimize.md:L192 | neighbors=[Core Web Vitals Optimization]
- "agents_skills_archive_impeccable_reference_optimize_md_reference_optimize_loading_performance": "Loading Performance" | kind=entity | source=.agents/skills_archive/impeccable/reference/optimize.md:L26 | neighbors=[Optimization Strategy]
- "agents_skills_archive_impeccable_reference_optimize_md_reference_optimize_network_optimization": "Network Optimization" | kind=entity | source=.agents/skills_archive/impeccable/reference/optimize.md:L169 | neighbors=[Optimization Strategy]
- "agents_skills_archive_impeccable_reference_optimize_md_reference_optimize_performance_monitoring": "Performance Monitoring" | kind=entity | source=.agents/skills_archive/impeccable/reference/optimize.md:L219 | neighbors=[optimize.md]
- "agents_skills_archive_impeccable_reference_optimize_md_reference_optimize_react_framework_optimization": "React/Framework Optimization" | kind=entity | source=.agents/skills_archive/impeccable/reference/optimize.md:L153 | neighbors=[Optimization Strategy]
- "agents_skills_archive_impeccable_reference_optimize_md_reference_optimize_rendering_performance": "Rendering Performance" | kind=entity | source=.agents/skills_archive/impeccable/reference/optimize.md:L87 | neighbors=[Optimization Strategy]
- "agents_skills_archive_impeccable_reference_optimize_md_reference_optimize_verify_improvements": "Verify Improvements" | kind=entity | source=.agents/skills_archive/impeccable/reference/optimize.md:L247 | neighbors=[optimize.md]
- "agents_skills_archive_impeccable_reference_overdrive_md_reference_overdrive_animate_complex_properties": "Animate complex properties" | kind=entity | source=.agents/skills_archive/impeccable/reference/overdrive.md:L69 | neighbors=[The Toolkit]
- "agents_skills_archive_impeccable_reference_overdrive_md_reference_overdrive_for_data_heavy_interfaces": "For data-heavy interfaces" | kind=entity | source=.agents/skills_archive/impeccable/reference/overdrive.md:L41 | neighbors=[Assess What "Extraordinary" Means Here]
- "agents_skills_archive_impeccable_reference_overdrive_md_reference_overdrive_for_functional_ui": "For functional UI" | kind=entity | source=.agents/skills_archive/impeccable/reference/overdrive.md:L35 | neighbors=[Assess What "Extraordinary" Means Here]
- "agents_skills_archive_impeccable_reference_overdrive_md_reference_overdrive_for_performance_critical_ui": "For performance-critical UI" | kind=entity | source=.agents/skills_archive/impeccable/reference/overdrive.md:L38 | neighbors=[Assess What "Extraordinary" Means Here]
- "agents_skills_archive_impeccable_reference_overdrive_md_reference_overdrive_for_visual_marketing_surfaces": "For visual/marketing surfaces" | kind=entity | source=.agents/skills_archive/impeccable/reference/overdrive.md:L32 | neighbors=[Assess What "Extraordinary" Means Here]
- "agents_skills_archive_impeccable_reference_overdrive_md_reference_overdrive_interact_with_the_device": "Interact with the device" | kind=entity | source=.agents/skills_archive/impeccable/reference/overdrive.md:L78 | neighbors=[The Toolkit]
- "agents_skills_archive_impeccable_reference_overdrive_md_reference_overdrive_iterate_with_browser_automation": "Iterate with Browser Automation" | kind=entity | source=.agents/skills_archive/impeccable/reference/overdrive.md:L22 | neighbors=[overdrive.md]
- "agents_skills_archive_impeccable_reference_overdrive_md_reference_overdrive_make_data_feel_alive": "Make data feel alive" | kind=entity | source=.agents/skills_archive/impeccable/reference/overdrive.md:L64 | neighbors=[The Toolkit]
- "agents_skills_archive_impeccable_reference_overdrive_md_reference_overdrive_make_transitions_feel_cinematic": "Make transitions feel cinematic" | kind=entity | source=.agents/skills_archive/impeccable/reference/overdrive.md:L50 | neighbors=[The Toolkit]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\PTOW\1_APT_Central_Command\.graphify\description-instructions\batch-135.json

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
