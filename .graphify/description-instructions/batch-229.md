# Node Description Batch 230 of 412

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

- "github_skills_impeccable_reference_onboard_md_reference_onboard_why_it_matters": "Why It Matters" | kind=entity | source=.github/skills/impeccable/reference/onboard.md:L175 | neighbors=[Empty State Design]
- "github_skills_impeccable_reference_optimize_md_reference_optimize_animation_performance": "Animation Performance" | kind=entity | source=.github/skills/impeccable/reference/optimize.md:L117 | neighbors=[Optimization Strategy]
- "github_skills_impeccable_reference_optimize_md_reference_optimize_assess_performance_issues": "Assess Performance Issues" | kind=entity | source=.github/skills/impeccable/reference/optimize.md:L3 | neighbors=[optimize.md]
- "github_skills_impeccable_reference_optimize_md_reference_optimize_cumulative_layout_shift_cls_0_1": "Cumulative Layout Shift (CLS < 0.1)" | kind=entity | source=.github/skills/impeccable/reference/optimize.md:L205 | neighbors=[Core Web Vitals Optimization]
- "github_skills_impeccable_reference_optimize_md_reference_optimize_first_input_delay_fid_100ms_inp_200ms": "First Input Delay (FID < 100ms) / INP (< 200ms)" | kind=entity | source=.github/skills/impeccable/reference/optimize.md:L199 | neighbors=[Core Web Vitals Optimization]
- "github_skills_impeccable_reference_optimize_md_reference_optimize_largest_contentful_paint_lcp_2_5s": "Largest Contentful Paint (LCP < 2.5s)" | kind=entity | source=.github/skills/impeccable/reference/optimize.md:L192 | neighbors=[Core Web Vitals Optimization]
- "github_skills_impeccable_reference_optimize_md_reference_optimize_loading_performance": "Loading Performance" | kind=entity | source=.github/skills/impeccable/reference/optimize.md:L26 | neighbors=[Optimization Strategy]
- "github_skills_impeccable_reference_optimize_md_reference_optimize_network_optimization": "Network Optimization" | kind=entity | source=.github/skills/impeccable/reference/optimize.md:L169 | neighbors=[Optimization Strategy]
- "github_skills_impeccable_reference_optimize_md_reference_optimize_performance_monitoring": "Performance Monitoring" | kind=entity | source=.github/skills/impeccable/reference/optimize.md:L219 | neighbors=[optimize.md]
- "github_skills_impeccable_reference_optimize_md_reference_optimize_react_framework_optimization": "React/Framework Optimization" | kind=entity | source=.github/skills/impeccable/reference/optimize.md:L153 | neighbors=[Optimization Strategy]
- "github_skills_impeccable_reference_optimize_md_reference_optimize_rendering_performance": "Rendering Performance" | kind=entity | source=.github/skills/impeccable/reference/optimize.md:L87 | neighbors=[Optimization Strategy]
- "github_skills_impeccable_reference_optimize_md_reference_optimize_verify_improvements": "Verify Improvements" | kind=entity | source=.github/skills/impeccable/reference/optimize.md:L247 | neighbors=[optimize.md]
- "github_skills_impeccable_reference_overdrive_md_reference_overdrive_animate_complex_properties": "Animate complex properties" | kind=entity | source=.github/skills/impeccable/reference/overdrive.md:L69 | neighbors=[The Toolkit]
- "github_skills_impeccable_reference_overdrive_md_reference_overdrive_for_data_heavy_interfaces": "For data-heavy interfaces" | kind=entity | source=.github/skills/impeccable/reference/overdrive.md:L41 | neighbors=[Assess What "Extraordinary" Means Here]
- "github_skills_impeccable_reference_overdrive_md_reference_overdrive_for_functional_ui": "For functional UI" | kind=entity | source=.github/skills/impeccable/reference/overdrive.md:L35 | neighbors=[Assess What "Extraordinary" Means Here]
- "github_skills_impeccable_reference_overdrive_md_reference_overdrive_for_performance_critical_ui": "For performance-critical UI" | kind=entity | source=.github/skills/impeccable/reference/overdrive.md:L38 | neighbors=[Assess What "Extraordinary" Means Here]
- "github_skills_impeccable_reference_overdrive_md_reference_overdrive_for_visual_marketing_surfaces": "For visual/marketing surfaces" | kind=entity | source=.github/skills/impeccable/reference/overdrive.md:L32 | neighbors=[Assess What "Extraordinary" Means Here]
- "github_skills_impeccable_reference_overdrive_md_reference_overdrive_interact_with_the_device": "Interact with the device" | kind=entity | source=.github/skills/impeccable/reference/overdrive.md:L78 | neighbors=[The Toolkit]
- "github_skills_impeccable_reference_overdrive_md_reference_overdrive_iterate_with_browser_automation": "Iterate with Browser Automation" | kind=entity | source=.github/skills/impeccable/reference/overdrive.md:L22 | neighbors=[overdrive.md]
- "github_skills_impeccable_reference_overdrive_md_reference_overdrive_make_data_feel_alive": "Make data feel alive" | kind=entity | source=.github/skills/impeccable/reference/overdrive.md:L64 | neighbors=[The Toolkit]
- "github_skills_impeccable_reference_overdrive_md_reference_overdrive_make_transitions_feel_cinematic": "Make transitions feel cinematic" | kind=entity | source=.github/skills/impeccable/reference/overdrive.md:L50 | neighbors=[The Toolkit]
- "github_skills_impeccable_reference_overdrive_md_reference_overdrive_performance_rules": "Performance rules" | kind=entity | source=.github/skills/impeccable/reference/overdrive.md:L102 | neighbors=[Implement with Discipline]
- "github_skills_impeccable_reference_overdrive_md_reference_overdrive_polish_is_the_difference": "Polish is the difference" | kind=entity | source=.github/skills/impeccable/reference/overdrive.md:L110 | neighbors=[Implement with Discipline]
- "github_skills_impeccable_reference_overdrive_md_reference_overdrive_progressive_enhancement_is_non_negotiable": "Progressive enhancement is non-negotiable" | kind=entity | source=.github/skills/impeccable/reference/overdrive.md:L86 | neighbors=[Implement with Discipline]
- "github_skills_impeccable_reference_overdrive_md_reference_overdrive_propose_before_building": "Propose Before Building" | kind=entity | source=.github/skills/impeccable/reference/overdrive.md:L12 | neighbors=[overdrive.md]
- "github_skills_impeccable_reference_overdrive_md_reference_overdrive_push_performance_boundaries": "Push performance boundaries" | kind=entity | source=.github/skills/impeccable/reference/overdrive.md:L73 | neighbors=[The Toolkit]
- "github_skills_impeccable_reference_overdrive_md_reference_overdrive_render_beyond_css": "Render beyond CSS" | kind=entity | source=.github/skills/impeccable/reference/overdrive.md:L58 | neighbors=[The Toolkit]
- "github_skills_impeccable_reference_overdrive_md_reference_overdrive_tie_animation_to_scroll_position": "Tie animation to scroll position" | kind=entity | source=.github/skills/impeccable/reference/overdrive.md:L55 | neighbors=[The Toolkit]
- "github_skills_impeccable_reference_overdrive_md_reference_overdrive_verify_the_result": "Verify the Result" | kind=entity | source=.github/skills/impeccable/reference/overdrive.md:L122 | neighbors=[overdrive.md]
- "github_skills_impeccable_reference_polish_md_reference_polish_clean_up": "Clean Up" | kind=entity | source=.github/skills/impeccable/reference/polish.md:L234 | neighbors=[polish.md]
- "github_skills_impeccable_reference_polish_md_reference_polish_code_quality": "Code Quality" | kind=entity | source=.github/skills/impeccable/reference/polish.md:L171 | neighbors=[Polish Systematically]
- "github_skills_impeccable_reference_polish_md_reference_polish_color_contrast": "Color & Contrast" | kind=entity | source=.github/skills/impeccable/reference/polish.md:L87 | neighbors=[Polish Systematically]
- "github_skills_impeccable_reference_polish_md_reference_polish_content_copy": "Content & Copy" | kind=entity | source=.github/skills/impeccable/reference/polish.md:L119 | neighbors=[Polish Systematically]
- "github_skills_impeccable_reference_polish_md_reference_polish_design_system_discovery": "Design System Discovery" | kind=entity | source=.github/skills/impeccable/reference/polish.md:L7 | neighbors=[polish.md]
- "github_skills_impeccable_reference_polish_md_reference_polish_edge_cases_error_states": "Edge Cases & Error States" | kind=entity | source=.github/skills/impeccable/reference/polish.md:L145 | neighbors=[Polish Systematically]
- "github_skills_impeccable_reference_polish_md_reference_polish_final_verification": "Final Verification" | kind=entity | source=.github/skills/impeccable/reference/polish.md:L223 | neighbors=[polish.md]
- "github_skills_impeccable_reference_polish_md_reference_polish_forms_inputs": "Forms & Inputs" | kind=entity | source=.github/skills/impeccable/reference/polish.md:L136 | neighbors=[Polish Systematically]
- "github_skills_impeccable_reference_polish_md_reference_polish_icons_images": "Icons & Images" | kind=entity | source=.github/skills/impeccable/reference/polish.md:L127 | neighbors=[Polish Systematically]
- "github_skills_impeccable_reference_polish_md_reference_polish_information_architecture_flow": "Information Architecture & Flow" | kind=entity | source=.github/skills/impeccable/reference/polish.md:L67 | neighbors=[Polish Systematically]
- "github_skills_impeccable_reference_polish_md_reference_polish_interaction_states": "Interaction States" | kind=entity | source=.github/skills/impeccable/reference/polish.md:L96 | neighbors=[Polish Systematically]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\PTOW\1_APT_Central_Command\.graphify\description-instructions\batch-229.json

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
