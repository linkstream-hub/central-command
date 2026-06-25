# Node Description Batch 228 of 412

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

- "github_skills_impeccable_reference_init_md_reference_init_users_purpose": "Users & Purpose" | kind=entity | source=.github/skills/impeccable/reference/init.md:L73 | neighbors=[Step 3: Ask strategic questions (for PR…] | lang=en
- "github_skills_impeccable_reference_interaction_design_md_reference_interaction_design": "interaction-design.md" | kind=entity | source=.github/skills/impeccable/reference/interaction-design.md:L1 | neighbors=[Interaction Design] | lang=en
- "github_skills_impeccable_reference_interaction_design_md_reference_interaction_design_css_anchor_positioning": "CSS Anchor Positioning" | kind=entity | source=.github/skills/impeccable/reference/interaction-design.md:L91 | neighbors=[Dropdown & Overlay Positioning] | lang=en
- "github_skills_impeccable_reference_interaction_design_md_reference_interaction_design_destructive_actions_undo_confirm": "Destructive Actions: Undo > Confirm" | kind=entity | source=.github/skills/impeccable/reference/interaction-design.md:L153 | neighbors=[Interaction Design] | lang=en
- "github_skills_impeccable_reference_interaction_design_md_reference_interaction_design_fixed_positioning_fallback": "Fixed Positioning Fallback" | kind=entity | source=.github/skills/impeccable/reference/interaction-design.md:L140 | neighbors=[Dropdown & Overlay Positioning] | lang=en
- "github_skills_impeccable_reference_interaction_design_md_reference_interaction_design_focus_rings_do_them_right": "Focus Rings: Do Them Right" | kind=entity | source=.github/skills/impeccable/reference/interaction-design.md:L20 | neighbors=[Interaction Design] | lang=pt
- "github_skills_impeccable_reference_interaction_design_md_reference_interaction_design_form_design_the_non_obvious": "Form Design: The Non-Obvious" | kind=entity | source=.github/skills/impeccable/reference/interaction-design.md:L43 | neighbors=[Interaction Design] | lang=en
- "github_skills_impeccable_reference_interaction_design_md_reference_interaction_design_gesture_discoverability": "Gesture Discoverability" | kind=entity | source=.github/skills/impeccable/reference/interaction-design.md:L177 | neighbors=[Interaction Design] | lang=en
- "github_skills_impeccable_reference_interaction_design_md_reference_interaction_design_loading_states": "Loading States" | kind=entity | source=.github/skills/impeccable/reference/interaction-design.md:L47 | neighbors=[Interaction Design] | lang=en
- "github_skills_impeccable_reference_interaction_design_md_reference_interaction_design_modals_the_inert_approach": "Modals: The Inert Approach" | kind=entity | source=.github/skills/impeccable/reference/interaction-design.md:L51 | neighbors=[Interaction Design] | lang=en
- "github_skills_impeccable_reference_interaction_design_md_reference_interaction_design_popover_anchor_combo": "Popover + Anchor Combo" | kind=entity | source=.github/skills/impeccable/reference/interaction-design.md:L116 | neighbors=[Dropdown & Overlay Positioning] | lang=en
- "github_skills_impeccable_reference_interaction_design_md_reference_interaction_design_portal_teleport_pattern": "Portal / Teleport Pattern" | kind=entity | source=.github/skills/impeccable/reference/interaction-design.md:L130 | neighbors=[Dropdown & Overlay Positioning] | lang=en
- "github_skills_impeccable_reference_interaction_design_md_reference_interaction_design_roving_tabindex": "Roving Tabindex" | kind=entity | source=.github/skills/impeccable/reference/interaction-design.md:L159 | neighbors=[Keyboard Navigation Patterns] | lang=en
- "github_skills_impeccable_reference_interaction_design_md_reference_interaction_design_skip_links": "Skip Links" | kind=entity | source=.github/skills/impeccable/reference/interaction-design.md:L173 | neighbors=[Keyboard Navigation Patterns] | lang=en
- "github_skills_impeccable_reference_interaction_design_md_reference_interaction_design_the_eight_interactive_states": "The Eight Interactive States" | kind=entity | source=.github/skills/impeccable/reference/interaction-design.md:L3 | neighbors=[Interaction Design] | lang=en
- "github_skills_impeccable_reference_interaction_design_md_reference_interaction_design_the_popover_api": "The Popover API" | kind=entity | source=.github/skills/impeccable/reference/interaction-design.md:L73 | neighbors=[Interaction Design] | lang=en
- "github_skills_impeccable_reference_layout_md_reference_layout_assess_current_layout": "Assess Current Layout" | kind=entity | source=.github/skills/impeccable/reference/layout.md:L13 | neighbors=[layout.md] | lang=en
- "github_skills_impeccable_reference_layout_md_reference_layout_break_card_grid_monotony": "Break Card Grid Monotony" | kind=entity | source=.github/skills/impeccable/reference/layout.md:L84 | neighbors=[Improve Layout Systematically] | lang=en
- "github_skills_impeccable_reference_layout_md_reference_layout_choose_the_right_layout_tool": "Choose the Right Layout Tool" | kind=entity | source=.github/skills/impeccable/reference/layout.md:L69 | neighbors=[Improve Layout Systematically] | lang=en
- "github_skills_impeccable_reference_layout_md_reference_layout_create_visual_rhythm": "Create Visual Rhythm" | kind=entity | source=.github/skills/impeccable/reference/layout.md:L62 | neighbors=[Improve Layout Systematically] | lang=en
- "github_skills_impeccable_reference_layout_md_reference_layout_establish_a_spacing_system": "Establish a Spacing System" | kind=entity | source=.github/skills/impeccable/reference/layout.md:L54 | neighbors=[Improve Layout Systematically] | lang=pt
- "github_skills_impeccable_reference_layout_md_reference_layout_live_mode_signature_params": "Live-mode signature params" | kind=entity | source=.github/skills/impeccable/reference/layout.md:L143 | neighbors=[layout.md] | lang=en
- "github_skills_impeccable_reference_layout_md_reference_layout_manage_depth_elevation": "Manage Depth & Elevation" | kind=entity | source=.github/skills/impeccable/reference/layout.md:L106 | neighbors=[Improve Layout Systematically] | lang=en
- "github_skills_impeccable_reference_layout_md_reference_layout_optical_adjustments": "Optical Adjustments" | kind=entity | source=.github/skills/impeccable/reference/layout.md:L111 | neighbors=[Improve Layout Systematically] | lang=en
- "github_skills_impeccable_reference_layout_md_reference_layout_plan_layout_improvements": "Plan Layout Improvements" | kind=entity | source=.github/skills/impeccable/reference/layout.md:L43 | neighbors=[layout.md] | lang=en
- "github_skills_impeccable_reference_layout_md_reference_layout_register": "Register" | kind=entity | source=.github/skills/impeccable/reference/layout.md:L5 | neighbors=[layout.md] | lang=en
- "github_skills_impeccable_reference_layout_md_reference_layout_strengthen_visual_hierarchy": "Strengthen Visual Hierarchy" | kind=entity | source=.github/skills/impeccable/reference/layout.md:L90 | neighbors=[Improve Layout Systematically] | lang=en
- "github_skills_impeccable_reference_layout_md_reference_layout_verify_layout_improvements": "Verify Layout Improvements" | kind=entity | source=.github/skills/impeccable/reference/layout.md:L132 | neighbors=[layout.md] | lang=en
- "github_skills_impeccable_reference_live_md_reference_live_1_read_the_screenshot_if_present": "1. Read the screenshot (if present)" | kind=entity | source=.github/skills/impeccable/reference/live.md:L120 | neighbors=[Handle `generate`] | lang=en
- "github_skills_impeccable_reference_live_md_reference_live_2_wrap_the_element": "2. Wrap the element" | kind=entity | source=.github/skills/impeccable/reference/live.md:L135 | neighbors=[Handle `generate`] | lang=en
- "github_skills_impeccable_reference_live_md_reference_live_3_load_the_action_s_reference": "3. Load the action's reference" | kind=entity | source=.github/skills/impeccable/reference/live.md:L188 | neighbors=[Handle `generate`] | lang=en
- "github_skills_impeccable_reference_live_md_reference_live_5_apply_the_freeform_prompt_if_present": "5. Apply the freeform prompt (if present)" | kind=entity | source=.github/skills/impeccable/reference/live.md:L284 | neighbors=[Handle `generate`] | lang=en
- "github_skills_impeccable_reference_live_md_reference_live_6_write_all_variants_in_a_single_edit": "6. Write all variants in a single edit" | kind=entity | source=.github/skills/impeccable/reference/live.md:L294 | neighbors=[Handle `generate`] | lang=en
- "github_skills_impeccable_reference_live_md_reference_live_7_parameters_composition_sized_0_4_per_variant": "7. Parameters (composition-sized, 0–4 per variant)" | kind=entity | source=.github/skills/impeccable/reference/live.md:L343 | neighbors=[Handle `generate`] | lang=it
- "github_skills_impeccable_reference_live_md_reference_live_8_signal_done": "8. Signal done" | kind=entity | source=.github/skills/impeccable/reference/live.md:L398 | neighbors=[Handle `generate`] | lang=en
- "github_skills_impeccable_reference_live_md_reference_live_aborting_an_in_flight_session": "Aborting an in-flight session" | kind=entity | source=.github/skills/impeccable/reference/live.md:L408 | neighbors=[Handle `generate`] | lang=en
- "github_skills_impeccable_reference_live_md_reference_live_append_arrays": "append-arrays" | kind=entity | source=.github/skills/impeccable/reference/live.md:L666 | neighbors=[CSP detection (first-time only)] | lang=en
- "github_skills_impeccable_reference_live_md_reference_live_append_string": "append-string" | kind=entity | source=.github/skills/impeccable/reference/live.md:L690 | neighbors=[CSP detection (first-time only)] | lang=en
- "github_skills_impeccable_reference_live_md_reference_live_cleanup": "Cleanup" | kind=entity | source=.github/skills/impeccable/reference/live.md:L545 | neighbors=[live.md] | lang=en
- "github_skills_impeccable_reference_live_md_reference_live_consent_prompt_template": "Consent prompt template" | kind=entity | source=.github/skills/impeccable/reference/live.md:L649 | neighbors=[CSP detection (first-time only)] | lang=en

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\PTOW\1_APT_Central_Command\.graphify\description-instructions\batch-227.json

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
