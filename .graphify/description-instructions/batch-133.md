# Node Description Batch 134 of 412

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

- "agents_skills_archive_impeccable_reference_harden_md_reference_harden_error_handling": "Error Handling" | kind=entity | source=.agents/skills_archive/impeccable/reference/harden.md:L139 | neighbors=[Hardening Dimensions] | lang=en
- "agents_skills_archive_impeccable_reference_harden_md_reference_harden_input_validation_sanitization": "Input Validation & Sanitization" | kind=entity | source=.agents/skills_archive/impeccable/reference/harden.md:L220 | neighbors=[Hardening Dimensions] | lang=en
- "agents_skills_archive_impeccable_reference_harden_md_reference_harden_internationalization_i18n": "Internationalization (i18n)" | kind=entity | source=.agents/skills_archive/impeccable/reference/harden.md:L85 | neighbors=[Hardening Dimensions] | lang=en
- "agents_skills_archive_impeccable_reference_harden_md_reference_harden_performance_resilience": "Performance Resilience" | kind=entity | source=.agents/skills_archive/impeccable/reference/harden.md:L280 | neighbors=[Hardening Dimensions] | lang=en
- "agents_skills_archive_impeccable_reference_harden_md_reference_harden_testing_strategies": "Testing Strategies" | kind=entity | source=.agents/skills_archive/impeccable/reference/harden.md:L303 | neighbors=[harden.md] | lang=en
- "agents_skills_archive_impeccable_reference_harden_md_reference_harden_text_overflow_wrapping": "Text Overflow & Wrapping" | kind=entity | source=.agents/skills_archive/impeccable/reference/harden.md:L37 | neighbors=[Hardening Dimensions] | lang=en
- "agents_skills_archive_impeccable_reference_harden_md_reference_harden_verify_hardening": "Verify Hardening" | kind=entity | source=.agents/skills_archive/impeccable/reference/harden.md:L333 | neighbors=[harden.md] | lang=en
- "agents_skills_archive_impeccable_reference_init_md_reference_init": "init.md" | kind=entity | source=.agents/skills_archive/impeccable/reference/init.md:L1 | neighbors=[Init Flow] | lang=en
- "agents_skills_archive_impeccable_reference_init_md_reference_init_accessibility_inclusion": "Accessibility & Inclusion" | kind=entity | source=.agents/skills_archive/impeccable/reference/init.md:L85 | neighbors=[Step 3: Ask strategic questions (for PR…] | lang=en
- "agents_skills_archive_impeccable_reference_init_md_reference_init_brand_personality": "Brand & Personality" | kind=entity | source=.agents/skills_archive/impeccable/reference/init.md:L79 | neighbors=[Step 3: Ask strategic questions (for PR…] | lang=en
- "agents_skills_archive_impeccable_reference_init_md_reference_init_interview_mode_not_confirmation_mode": "Interview mode, not confirmation mode" | kind=entity | source=.agents/skills_archive/impeccable/reference/init.md:L50 | neighbors=[Step 3: Ask strategic questions (for PR…] | lang=en
- "agents_skills_archive_impeccable_reference_init_md_reference_init_minimum_viable_interview": "Minimum viable interview" | kind=entity | source=.agents/skills_archive/impeccable/reference/init.md:L61 | neighbors=[Step 3: Ask strategic questions (for PR…] | lang=en
- "agents_skills_archive_impeccable_reference_init_md_reference_init_register_ask_first_it_shapes_everything_below": "Register (ask first; it shapes everything below)" | kind=entity | source=.agents/skills_archive/impeccable/reference/init.md:L65 | neighbors=[Step 3: Ask strategic questions (for PR…] | lang=en
- "agents_skills_archive_impeccable_reference_init_md_reference_init_step_1_load_current_state": "Step 1: Load current state" | kind=entity | source=.agents/skills_archive/impeccable/reference/init.md:L11 | neighbors=[Init Flow] | lang=en
- "agents_skills_archive_impeccable_reference_init_md_reference_init_step_2_explore_the_codebase": "Step 2: Explore the codebase" | kind=entity | source=.agents/skills_archive/impeccable/reference/init.md:L26 | neighbors=[Init Flow] | lang=en
- "agents_skills_archive_impeccable_reference_init_md_reference_init_step_4_write_product_md": "Step 4: Write PRODUCT.md" | kind=entity | source=.agents/skills_archive/impeccable/reference/init.md:L91 | neighbors=[Init Flow] | lang=en
- "agents_skills_archive_impeccable_reference_init_md_reference_init_step_5_decide_on_design_md": "Step 5: Decide on DESIGN.md" | kind=entity | source=.agents/skills_archive/impeccable/reference/init.md:L127 | neighbors=[Init Flow] | lang=en
- "agents_skills_archive_impeccable_reference_init_md_reference_init_step_6_configure_live_mode_when_code_exists": "Step 6: Configure live mode (when code exists)" | kind=entity | source=.agents/skills_archive/impeccable/reference/init.md:L138 | neighbors=[Init Flow] | lang=en
- "agents_skills_archive_impeccable_reference_init_md_reference_init_step_7_recommend_starting_points_then_wrap_up": "Step 7: Recommend starting points, then wrap up" | kind=entity | source=.agents/skills_archive/impeccable/reference/init.md:L154 | neighbors=[Init Flow] | lang=en
- "agents_skills_archive_impeccable_reference_init_md_reference_init_users_purpose": "Users & Purpose" | kind=entity | source=.agents/skills_archive/impeccable/reference/init.md:L73 | neighbors=[Step 3: Ask strategic questions (for PR…] | lang=en
- "agents_skills_archive_impeccable_reference_interaction_design_md_reference_interaction_design": "interaction-design.md" | kind=entity | source=.agents/skills_archive/impeccable/reference/interaction-design.md:L1 | neighbors=[Interaction Design] | lang=en
- "agents_skills_archive_impeccable_reference_interaction_design_md_reference_interaction_design_css_anchor_positioning": "CSS Anchor Positioning" | kind=entity | source=.agents/skills_archive/impeccable/reference/interaction-design.md:L91 | neighbors=[Dropdown & Overlay Positioning] | lang=en
- "agents_skills_archive_impeccable_reference_interaction_design_md_reference_interaction_design_destructive_actions_undo_confirm": "Destructive Actions: Undo > Confirm" | kind=entity | source=.agents/skills_archive/impeccable/reference/interaction-design.md:L153 | neighbors=[Interaction Design] | lang=en
- "agents_skills_archive_impeccable_reference_interaction_design_md_reference_interaction_design_fixed_positioning_fallback": "Fixed Positioning Fallback" | kind=entity | source=.agents/skills_archive/impeccable/reference/interaction-design.md:L140 | neighbors=[Dropdown & Overlay Positioning] | lang=en
- "agents_skills_archive_impeccable_reference_interaction_design_md_reference_interaction_design_focus_rings_do_them_right": "Focus Rings: Do Them Right" | kind=entity | source=.agents/skills_archive/impeccable/reference/interaction-design.md:L20 | neighbors=[Interaction Design] | lang=pt
- "agents_skills_archive_impeccable_reference_interaction_design_md_reference_interaction_design_form_design_the_non_obvious": "Form Design: The Non-Obvious" | kind=entity | source=.agents/skills_archive/impeccable/reference/interaction-design.md:L43 | neighbors=[Interaction Design] | lang=en
- "agents_skills_archive_impeccable_reference_interaction_design_md_reference_interaction_design_gesture_discoverability": "Gesture Discoverability" | kind=entity | source=.agents/skills_archive/impeccable/reference/interaction-design.md:L177 | neighbors=[Interaction Design] | lang=en
- "agents_skills_archive_impeccable_reference_interaction_design_md_reference_interaction_design_loading_states": "Loading States" | kind=entity | source=.agents/skills_archive/impeccable/reference/interaction-design.md:L47 | neighbors=[Interaction Design] | lang=en
- "agents_skills_archive_impeccable_reference_interaction_design_md_reference_interaction_design_modals_the_inert_approach": "Modals: The Inert Approach" | kind=entity | source=.agents/skills_archive/impeccable/reference/interaction-design.md:L51 | neighbors=[Interaction Design] | lang=en
- "agents_skills_archive_impeccable_reference_interaction_design_md_reference_interaction_design_popover_anchor_combo": "Popover + Anchor Combo" | kind=entity | source=.agents/skills_archive/impeccable/reference/interaction-design.md:L116 | neighbors=[Dropdown & Overlay Positioning] | lang=en
- "agents_skills_archive_impeccable_reference_interaction_design_md_reference_interaction_design_portal_teleport_pattern": "Portal / Teleport Pattern" | kind=entity | source=.agents/skills_archive/impeccable/reference/interaction-design.md:L130 | neighbors=[Dropdown & Overlay Positioning] | lang=en
- "agents_skills_archive_impeccable_reference_interaction_design_md_reference_interaction_design_roving_tabindex": "Roving Tabindex" | kind=entity | source=.agents/skills_archive/impeccable/reference/interaction-design.md:L159 | neighbors=[Keyboard Navigation Patterns] | lang=en
- "agents_skills_archive_impeccable_reference_interaction_design_md_reference_interaction_design_skip_links": "Skip Links" | kind=entity | source=.agents/skills_archive/impeccable/reference/interaction-design.md:L173 | neighbors=[Keyboard Navigation Patterns] | lang=en
- "agents_skills_archive_impeccable_reference_interaction_design_md_reference_interaction_design_the_eight_interactive_states": "The Eight Interactive States" | kind=entity | source=.agents/skills_archive/impeccable/reference/interaction-design.md:L3 | neighbors=[Interaction Design] | lang=en
- "agents_skills_archive_impeccable_reference_interaction_design_md_reference_interaction_design_the_popover_api": "The Popover API" | kind=entity | source=.agents/skills_archive/impeccable/reference/interaction-design.md:L73 | neighbors=[Interaction Design] | lang=en
- "agents_skills_archive_impeccable_reference_layout_md_reference_layout_assess_current_layout": "Assess Current Layout" | kind=entity | source=.agents/skills_archive/impeccable/reference/layout.md:L13 | neighbors=[layout.md] | lang=en
- "agents_skills_archive_impeccable_reference_layout_md_reference_layout_break_card_grid_monotony": "Break Card Grid Monotony" | kind=entity | source=.agents/skills_archive/impeccable/reference/layout.md:L84 | neighbors=[Improve Layout Systematically] | lang=en
- "agents_skills_archive_impeccable_reference_layout_md_reference_layout_choose_the_right_layout_tool": "Choose the Right Layout Tool" | kind=entity | source=.agents/skills_archive/impeccable/reference/layout.md:L69 | neighbors=[Improve Layout Systematically] | lang=en
- "agents_skills_archive_impeccable_reference_layout_md_reference_layout_create_visual_rhythm": "Create Visual Rhythm" | kind=entity | source=.agents/skills_archive/impeccable/reference/layout.md:L62 | neighbors=[Improve Layout Systematically] | lang=en
- "agents_skills_archive_impeccable_reference_layout_md_reference_layout_establish_a_spacing_system": "Establish a Spacing System" | kind=entity | source=.agents/skills_archive/impeccable/reference/layout.md:L54 | neighbors=[Improve Layout Systematically] | lang=pt

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\PTOW\1_APT_Central_Command\.graphify\description-instructions\batch-133.json

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
