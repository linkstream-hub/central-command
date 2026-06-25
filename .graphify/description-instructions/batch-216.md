# Node Description Batch 217 of 412

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

- "github_skills_archive_impeccable_reference_interaction_design_md_reference_interaction_design_skip_links": "Skip Links" | kind=entity | source=.github/skills_archive/impeccable/reference/interaction-design.md:L173 | neighbors=[Keyboard Navigation Patterns] | lang=en
- "github_skills_archive_impeccable_reference_interaction_design_md_reference_interaction_design_the_eight_interactive_states": "The Eight Interactive States" | kind=entity | source=.github/skills_archive/impeccable/reference/interaction-design.md:L3 | neighbors=[Interaction Design] | lang=en
- "github_skills_archive_impeccable_reference_interaction_design_md_reference_interaction_design_the_popover_api": "The Popover API" | kind=entity | source=.github/skills_archive/impeccable/reference/interaction-design.md:L73 | neighbors=[Interaction Design] | lang=en
- "github_skills_archive_impeccable_reference_layout_md_reference_layout_assess_current_layout": "Assess Current Layout" | kind=entity | source=.github/skills_archive/impeccable/reference/layout.md:L13 | neighbors=[layout.md] | lang=en
- "github_skills_archive_impeccable_reference_layout_md_reference_layout_break_card_grid_monotony": "Break Card Grid Monotony" | kind=entity | source=.github/skills_archive/impeccable/reference/layout.md:L84 | neighbors=[Improve Layout Systematically] | lang=en
- "github_skills_archive_impeccable_reference_layout_md_reference_layout_choose_the_right_layout_tool": "Choose the Right Layout Tool" | kind=entity | source=.github/skills_archive/impeccable/reference/layout.md:L69 | neighbors=[Improve Layout Systematically] | lang=en
- "github_skills_archive_impeccable_reference_layout_md_reference_layout_create_visual_rhythm": "Create Visual Rhythm" | kind=entity | source=.github/skills_archive/impeccable/reference/layout.md:L62 | neighbors=[Improve Layout Systematically] | lang=en
- "github_skills_archive_impeccable_reference_layout_md_reference_layout_establish_a_spacing_system": "Establish a Spacing System" | kind=entity | source=.github/skills_archive/impeccable/reference/layout.md:L54 | neighbors=[Improve Layout Systematically] | lang=pt
- "github_skills_archive_impeccable_reference_layout_md_reference_layout_live_mode_signature_params": "Live-mode signature params" | kind=entity | source=.github/skills_archive/impeccable/reference/layout.md:L143 | neighbors=[layout.md] | lang=en
- "github_skills_archive_impeccable_reference_layout_md_reference_layout_manage_depth_elevation": "Manage Depth & Elevation" | kind=entity | source=.github/skills_archive/impeccable/reference/layout.md:L106 | neighbors=[Improve Layout Systematically] | lang=en
- "github_skills_archive_impeccable_reference_layout_md_reference_layout_optical_adjustments": "Optical Adjustments" | kind=entity | source=.github/skills_archive/impeccable/reference/layout.md:L111 | neighbors=[Improve Layout Systematically] | lang=en
- "github_skills_archive_impeccable_reference_layout_md_reference_layout_plan_layout_improvements": "Plan Layout Improvements" | kind=entity | source=.github/skills_archive/impeccable/reference/layout.md:L43 | neighbors=[layout.md] | lang=en
- "github_skills_archive_impeccable_reference_layout_md_reference_layout_register": "Register" | kind=entity | source=.github/skills_archive/impeccable/reference/layout.md:L5 | neighbors=[layout.md] | lang=en
- "github_skills_archive_impeccable_reference_layout_md_reference_layout_strengthen_visual_hierarchy": "Strengthen Visual Hierarchy" | kind=entity | source=.github/skills_archive/impeccable/reference/layout.md:L90 | neighbors=[Improve Layout Systematically] | lang=en
- "github_skills_archive_impeccable_reference_layout_md_reference_layout_verify_layout_improvements": "Verify Layout Improvements" | kind=entity | source=.github/skills_archive/impeccable/reference/layout.md:L132 | neighbors=[layout.md] | lang=en
- "github_skills_archive_impeccable_reference_live_md_reference_live_1_read_the_screenshot_if_present": "1. Read the screenshot (if present)" | kind=entity | source=.github/skills_archive/impeccable/reference/live.md:L120 | neighbors=[Handle `generate`] | lang=en
- "github_skills_archive_impeccable_reference_live_md_reference_live_2_wrap_the_element": "2. Wrap the element" | kind=entity | source=.github/skills_archive/impeccable/reference/live.md:L135 | neighbors=[Handle `generate`] | lang=en
- "github_skills_archive_impeccable_reference_live_md_reference_live_3_load_the_action_s_reference": "3. Load the action's reference" | kind=entity | source=.github/skills_archive/impeccable/reference/live.md:L188 | neighbors=[Handle `generate`] | lang=en
- "github_skills_archive_impeccable_reference_live_md_reference_live_5_apply_the_freeform_prompt_if_present": "5. Apply the freeform prompt (if present)" | kind=entity | source=.github/skills_archive/impeccable/reference/live.md:L284 | neighbors=[Handle `generate`] | lang=en
- "github_skills_archive_impeccable_reference_live_md_reference_live_6_write_all_variants_in_a_single_edit": "6. Write all variants in a single edit" | kind=entity | source=.github/skills_archive/impeccable/reference/live.md:L294 | neighbors=[Handle `generate`] | lang=en
- "github_skills_archive_impeccable_reference_live_md_reference_live_7_parameters_composition_sized_0_4_per_variant": "7. Parameters (composition-sized, 0–4 per variant)" | kind=entity | source=.github/skills_archive/impeccable/reference/live.md:L343 | neighbors=[Handle `generate`] | lang=it
- "github_skills_archive_impeccable_reference_live_md_reference_live_8_signal_done": "8. Signal done" | kind=entity | source=.github/skills_archive/impeccable/reference/live.md:L398 | neighbors=[Handle `generate`] | lang=en
- "github_skills_archive_impeccable_reference_live_md_reference_live_aborting_an_in_flight_session": "Aborting an in-flight session" | kind=entity | source=.github/skills_archive/impeccable/reference/live.md:L408 | neighbors=[Handle `generate`] | lang=en
- "github_skills_archive_impeccable_reference_live_md_reference_live_append_arrays": "append-arrays" | kind=entity | source=.github/skills_archive/impeccable/reference/live.md:L666 | neighbors=[CSP detection (first-time only)] | lang=en
- "github_skills_archive_impeccable_reference_live_md_reference_live_append_string": "append-string" | kind=entity | source=.github/skills_archive/impeccable/reference/live.md:L690 | neighbors=[CSP detection (first-time only)] | lang=en
- "github_skills_archive_impeccable_reference_live_md_reference_live_cleanup": "Cleanup" | kind=entity | source=.github/skills_archive/impeccable/reference/live.md:L545 | neighbors=[live.md] | lang=en
- "github_skills_archive_impeccable_reference_live_md_reference_live_consent_prompt_template": "Consent prompt template" | kind=entity | source=.github/skills_archive/impeccable/reference/live.md:L649 | neighbors=[CSP detection (first-time only)] | lang=en
- "github_skills_archive_impeccable_reference_live_md_reference_live_drift_heal_warning": "Drift-heal warning" | kind=entity | source=.github/skills_archive/impeccable/reference/live.md:L599 | neighbors=[First-time setup (config missing or inv…] | lang=en
- "github_skills_archive_impeccable_reference_live_md_reference_live_exit": "Exit" | kind=entity | source=.github/skills_archive/impeccable/reference/live.md:L536 | neighbors=[live.md] | lang=en
- "github_skills_archive_impeccable_reference_live_md_reference_live_handle_discard": "Handle `discard`" | kind=entity | source=.github/skills_archive/impeccable/reference/live.md:L485 | neighbors=[live.md] | lang=en
- "github_skills_archive_impeccable_reference_live_md_reference_live_handle_manual_edit_apply": "Handle `manual_edit_apply`" | kind=entity | source=.github/skills_archive/impeccable/reference/live.md:L524 | neighbors=[live.md] | lang=en
- "github_skills_archive_impeccable_reference_live_md_reference_live_handle_prefetch": "Handle `prefetch`" | kind=entity | source=.github/skills_archive/impeccable/reference/live.md:L511 | neighbors=[live.md] | lang=en
- "github_skills_archive_impeccable_reference_live_md_reference_live_handle_steer": "Handle `steer`" | kind=entity | source=.github/skills_archive/impeccable/reference/live.md:L489 | neighbors=[live.md] | lang=en
- "github_skills_archive_impeccable_reference_live_md_reference_live_insert_mode_branch": "Insert mode branch" | kind=entity | source=.github/skills_archive/impeccable/reference/live.md:L97 | neighbors=[Handle `generate`] | lang=en
- "github_skills_archive_impeccable_reference_live_md_reference_live_phase_a_extract_the_identity_non_skippable": "Phase A: Extract the identity (non-skippable)" | kind=entity | source=.github/skills_archive/impeccable/reference/live.md:L200 | neighbors=[4. Plan three variants: identity first,…] | lang=en
- "github_skills_archive_impeccable_reference_live_md_reference_live_phase_b_pick_mode_default_vs_departure": "Phase B: Pick mode (default vs departure)" | kind=entity | source=.github/skills_archive/impeccable/reference/live.md:L223 | neighbors=[4. Plan three variants: identity first,…] | lang=en
- "github_skills_archive_impeccable_reference_live_md_reference_live_phase_c_plan_three_variants": "Phase C: Plan three variants" | kind=entity | source=.github/skills_archive/impeccable/reference/live.md:L234 | neighbors=[4. Plan three variants: identity first,…] | lang=en
- "github_skills_archive_impeccable_reference_live_md_reference_live_phase_d_squint_test": "Phase D: Squint test" | kind=entity | source=.github/skills_archive/impeccable/reference/live.md:L259 | neighbors=[4. Plan three variants: identity first,…] | lang=en
- "github_skills_archive_impeccable_reference_live_md_reference_live_poll_loop": "Poll loop" | kind=entity | source=.github/skills_archive/impeccable/reference/live.md:L42 | neighbors=[live.md] | lang=en
- "github_skills_archive_impeccable_reference_live_md_reference_live_prerequisites": "Prerequisites" | kind=entity | source=.github/skills_archive/impeccable/reference/live.md:L3 | neighbors=[live.md] | lang=en

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\PTOW\1_APT_Central_Command\.graphify\description-instructions\batch-216.json

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
