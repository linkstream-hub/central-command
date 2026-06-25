# Node Description Batch 210 of 412

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

- "github_scripts_changeset_readme_md_changeset_readme_flags": "Flags" | kind=entity | source=.github/scripts/changeset/README.md:L31 | neighbors=[`cli.cjs extract`]
- "github_scripts_changeset_readme_md_changeset_readme_output_shape": "Output shape" | kind=entity | source=.github/scripts/changeset/README.md:L80 | neighbors=[`cli.cjs extract`]
- "github_scripts_changeset_readme_md_changeset_readme_version_validation": "Version validation" | kind=entity | source=.github/scripts/changeset/README.md:L41 | neighbors=[`cli.cjs extract`]
- "github_skills_archive_impeccable_reference_adapt_md_reference_adapt_assess_adaptation_challenge": "Assess Adaptation Challenge" | kind=entity | source=.github/skills_archive/impeccable/reference/adapt.md:L8 | neighbors=[adapt.md]
- "github_skills_archive_impeccable_reference_adapt_md_reference_adapt_breakpoints_content_driven": "Breakpoints: Content-Driven" | kind=entity | source=.github/skills_archive/impeccable/reference/adapt.md:L204 | neighbors=[Responsive Design]
- "github_skills_archive_impeccable_reference_adapt_md_reference_adapt_content_adaptation": "Content Adaptation" | kind=entity | source=.github/skills_archive/impeccable/reference/adapt.md:L153 | neighbors=[Implement Adaptations]
- "github_skills_archive_impeccable_reference_adapt_md_reference_adapt_desktop_adaptation_mobile_desktop": "Desktop Adaptation (Mobile → Desktop)" | kind=entity | source=.github/skills_archive/impeccable/reference/adapt.md:L77 | neighbors=[Plan Adaptation Strategy]
- "github_skills_archive_impeccable_reference_adapt_md_reference_adapt_detect_input_method_not_just_screen_size": "Detect Input Method, Not Just Screen Size" | kind=entity | source=.github/skills_archive/impeccable/reference/adapt.md:L208 | neighbors=[Responsive Design]
- "github_skills_archive_impeccable_reference_adapt_md_reference_adapt_email_adaptation_web_email": "Email Adaptation (Web → Email)" | kind=entity | source=.github/skills_archive/impeccable/reference/adapt.md:L112 | neighbors=[Plan Adaptation Strategy]
- "github_skills_archive_impeccable_reference_adapt_md_reference_adapt_layout_adaptation_patterns": "Layout Adaptation Patterns" | kind=entity | source=.github/skills_archive/impeccable/reference/adapt.md:L293 | neighbors=[Responsive Design]
- "github_skills_archive_impeccable_reference_adapt_md_reference_adapt_layout_adaptation_techniques": "Layout Adaptation Techniques" | kind=entity | source=.github/skills_archive/impeccable/reference/adapt.md:L137 | neighbors=[Implement Adaptations]
- "github_skills_archive_impeccable_reference_adapt_md_reference_adapt_mobile_adaptation_desktop_mobile": "Mobile Adaptation (Desktop → Mobile)" | kind=entity | source=.github/skills_archive/impeccable/reference/adapt.md:L36 | neighbors=[Plan Adaptation Strategy]
- "github_skills_archive_impeccable_reference_adapt_md_reference_adapt_mobile_first_write_it_right": "Mobile-First: Write It Right" | kind=entity | source=.github/skills_archive/impeccable/reference/adapt.md:L200 | neighbors=[Responsive Design]
- "github_skills_archive_impeccable_reference_adapt_md_reference_adapt_navigation_adaptation": "Navigation Adaptation" | kind=entity | source=.github/skills_archive/impeccable/reference/adapt.md:L160 | neighbors=[Implement Adaptations]
- "github_skills_archive_impeccable_reference_adapt_md_reference_adapt_picture_element_for_art_direction": "Picture Element for Art Direction" | kind=entity | source=.github/skills_archive/impeccable/reference/adapt.md:L281 | neighbors=[Responsive Images: Get It Right]
- "github_skills_archive_impeccable_reference_adapt_md_reference_adapt_print_adaptation_screen_print": "Print Adaptation (Screen → Print)" | kind=entity | source=.github/skills_archive/impeccable/reference/adapt.md:L98 | neighbors=[Plan Adaptation Strategy]
- "github_skills_archive_impeccable_reference_adapt_md_reference_adapt_responsive_breakpoints": "Responsive Breakpoints" | kind=entity | source=.github/skills_archive/impeccable/reference/adapt.md:L129 | neighbors=[Implement Adaptations]
- "github_skills_archive_impeccable_reference_adapt_md_reference_adapt_safe_areas_handle_the_notch": "Safe Areas: Handle the Notch" | kind=entity | source=.github/skills_archive/impeccable/reference/adapt.md:L236 | neighbors=[Responsive Design]
- "github_skills_archive_impeccable_reference_adapt_md_reference_adapt_srcset_with_width_descriptors": "srcset with Width Descriptors" | kind=entity | source=.github/skills_archive/impeccable/reference/adapt.md:L261 | neighbors=[Responsive Images: Get It Right]
- "github_skills_archive_impeccable_reference_adapt_md_reference_adapt_tablet_adaptation_hybrid_approach": "Tablet Adaptation (Hybrid Approach)" | kind=entity | source=.github/skills_archive/impeccable/reference/adapt.md:L63 | neighbors=[Plan Adaptation Strategy]
- "github_skills_archive_impeccable_reference_adapt_md_reference_adapt_testing_don_t_trust_devtools_alone": "Testing: Don't Trust DevTools Alone" | kind=entity | source=.github/skills_archive/impeccable/reference/adapt.md:L297 | neighbors=[Responsive Design]
- "github_skills_archive_impeccable_reference_adapt_md_reference_adapt_touch_adaptation": "Touch Adaptation" | kind=entity | source=.github/skills_archive/impeccable/reference/adapt.md:L145 | neighbors=[Implement Adaptations]
- "github_skills_archive_impeccable_reference_adapt_md_reference_adapt_verify_adaptations": "Verify Adaptations" | kind=entity | source=.github/skills_archive/impeccable/reference/adapt.md:L178 | neighbors=[adapt.md]
- "github_skills_archive_impeccable_reference_animate_md_reference_animate_accessibility": "Accessibility" | kind=entity | source=.github/skills_archive/impeccable/reference/animate.md:L170 | neighbors=[Technical Implementation]
- "github_skills_archive_impeccable_reference_animate_md_reference_animate_assess_animation_opportunities": "Assess Animation Opportunities" | kind=entity | source=.github/skills_archive/impeccable/reference/animate.md:L15 | neighbors=[animate.md]
- "github_skills_archive_impeccable_reference_animate_md_reference_animate_css_animations": "CSS Animations" | kind=entity | source=.github/skills_archive/impeccable/reference/animate.md:L124 | neighbors=[Technical Implementation]
- "github_skills_archive_impeccable_reference_animate_md_reference_animate_delight_moments": "Delight Moments" | kind=entity | source=.github/skills_archive/impeccable/reference/animate.md:L89 | neighbors=[Implement Animations]
- "github_skills_archive_impeccable_reference_animate_md_reference_animate_entrance_animations": "Entrance Animations" | kind=entity | source=.github/skills_archive/impeccable/reference/animate.md:L51 | neighbors=[Implement Animations]
- "github_skills_archive_impeccable_reference_animate_md_reference_animate_feedback_guidance": "Feedback & Guidance" | kind=entity | source=.github/skills_archive/impeccable/reference/animate.md:L83 | neighbors=[Implement Animations]
- "github_skills_archive_impeccable_reference_animate_md_reference_animate_javascript_animation": "JavaScript Animation" | kind=entity | source=.github/skills_archive/impeccable/reference/animate.md:L133 | neighbors=[Technical Implementation]
- "github_skills_archive_impeccable_reference_animate_md_reference_animate_micro_interactions": "Micro-interactions" | kind=entity | source=.github/skills_archive/impeccable/reference/animate.md:L58 | neighbors=[Implement Animations]
- "github_skills_archive_impeccable_reference_animate_md_reference_animate_motion_materials": "Motion Materials" | kind=entity | source=.github/skills_archive/impeccable/reference/animate.md:L141 | neighbors=[Technical Implementation]
- "github_skills_archive_impeccable_reference_animate_md_reference_animate_navigation_flow": "Navigation & Flow" | kind=entity | source=.github/skills_archive/impeccable/reference/animate.md:L77 | neighbors=[Implement Animations]
- "github_skills_archive_impeccable_reference_animate_md_reference_animate_perceived_performance": "Perceived Performance" | kind=entity | source=.github/skills_archive/impeccable/reference/animate.md:L160 | neighbors=[Technical Implementation]
- "github_skills_archive_impeccable_reference_animate_md_reference_animate_performance": "Performance" | kind=entity | source=.github/skills_archive/impeccable/reference/animate.md:L153 | neighbors=[Technical Implementation]
- "github_skills_archive_impeccable_reference_animate_md_reference_animate_plan_animation_strategy": "Plan Animation Strategy" | kind=entity | source=.github/skills_archive/impeccable/reference/animate.md:L36 | neighbors=[animate.md]
- "github_skills_archive_impeccable_reference_animate_md_reference_animate_register": "Register" | kind=entity | source=.github/skills_archive/impeccable/reference/animate.md:L7 | neighbors=[animate.md]
- "github_skills_archive_impeccable_reference_animate_md_reference_animate_state_transitions": "State Transitions" | kind=entity | source=.github/skills_archive/impeccable/reference/animate.md:L70 | neighbors=[Implement Animations]
- "github_skills_archive_impeccable_reference_animate_md_reference_animate_timing_easing": "Timing & Easing" | kind=entity | source=.github/skills_archive/impeccable/reference/animate.md:L99 | neighbors=[Technical Implementation]
- "github_skills_archive_impeccable_reference_animate_md_reference_animate_verify_quality": "Verify Quality" | kind=entity | source=.github/skills_archive/impeccable/reference/animate.md:L190 | neighbors=[animate.md]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\PTOW\1_APT_Central_Command\.graphify\description-instructions\batch-209.json

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
