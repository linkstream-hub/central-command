# Node Description Batch 135 of 412

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

- "agents_skills_archive_impeccable_reference_layout_md_reference_layout_live_mode_signature_params": "Live-mode signature params" | kind=entity | source=.agents/skills_archive/impeccable/reference/layout.md:L143 | neighbors=[layout.md] | lang=en
- "agents_skills_archive_impeccable_reference_layout_md_reference_layout_manage_depth_elevation": "Manage Depth & Elevation" | kind=entity | source=.agents/skills_archive/impeccable/reference/layout.md:L106 | neighbors=[Improve Layout Systematically] | lang=en
- "agents_skills_archive_impeccable_reference_layout_md_reference_layout_optical_adjustments": "Optical Adjustments" | kind=entity | source=.agents/skills_archive/impeccable/reference/layout.md:L111 | neighbors=[Improve Layout Systematically] | lang=en
- "agents_skills_archive_impeccable_reference_layout_md_reference_layout_plan_layout_improvements": "Plan Layout Improvements" | kind=entity | source=.agents/skills_archive/impeccable/reference/layout.md:L43 | neighbors=[layout.md] | lang=en
- "agents_skills_archive_impeccable_reference_layout_md_reference_layout_register": "Register" | kind=entity | source=.agents/skills_archive/impeccable/reference/layout.md:L5 | neighbors=[layout.md] | lang=en
- "agents_skills_archive_impeccable_reference_layout_md_reference_layout_strengthen_visual_hierarchy": "Strengthen Visual Hierarchy" | kind=entity | source=.agents/skills_archive/impeccable/reference/layout.md:L90 | neighbors=[Improve Layout Systematically] | lang=en
- "agents_skills_archive_impeccable_reference_layout_md_reference_layout_verify_layout_improvements": "Verify Layout Improvements" | kind=entity | source=.agents/skills_archive/impeccable/reference/layout.md:L132 | neighbors=[layout.md] | lang=en
- "agents_skills_archive_impeccable_reference_live_md_reference_live_1_read_the_screenshot_if_present": "1. Read the screenshot (if present)" | kind=entity | source=.agents/skills_archive/impeccable/reference/live.md:L122 | neighbors=[Handle `generate`] | lang=en
- "agents_skills_archive_impeccable_reference_live_md_reference_live_2_wrap_the_element": "2. Wrap the element" | kind=entity | source=.agents/skills_archive/impeccable/reference/live.md:L137 | neighbors=[Handle `generate`] | lang=en
- "agents_skills_archive_impeccable_reference_live_md_reference_live_3_load_the_action_s_reference": "3. Load the action's reference" | kind=entity | source=.agents/skills_archive/impeccable/reference/live.md:L190 | neighbors=[Handle `generate`] | lang=en
- "agents_skills_archive_impeccable_reference_live_md_reference_live_5_apply_the_freeform_prompt_if_present": "5. Apply the freeform prompt (if present)" | kind=entity | source=.agents/skills_archive/impeccable/reference/live.md:L286 | neighbors=[Handle `generate`] | lang=en
- "agents_skills_archive_impeccable_reference_live_md_reference_live_6_write_all_variants_in_a_single_edit": "6. Write all variants in a single edit" | kind=entity | source=.agents/skills_archive/impeccable/reference/live.md:L296 | neighbors=[Handle `generate`] | lang=en
- "agents_skills_archive_impeccable_reference_live_md_reference_live_7_parameters_composition_sized_0_4_per_variant": "7. Parameters (composition-sized, 0–4 per variant)" | kind=entity | source=.agents/skills_archive/impeccable/reference/live.md:L345 | neighbors=[Handle `generate`] | lang=it
- "agents_skills_archive_impeccable_reference_live_md_reference_live_8_signal_done": "8. Signal done" | kind=entity | source=.agents/skills_archive/impeccable/reference/live.md:L400 | neighbors=[Handle `generate`] | lang=en
- "agents_skills_archive_impeccable_reference_live_md_reference_live_aborting_an_in_flight_session": "Aborting an in-flight session" | kind=entity | source=.agents/skills_archive/impeccable/reference/live.md:L410 | neighbors=[Handle `generate`] | lang=en
- "agents_skills_archive_impeccable_reference_live_md_reference_live_append_arrays": "append-arrays" | kind=entity | source=.agents/skills_archive/impeccable/reference/live.md:L668 | neighbors=[CSP detection (first-time only)] | lang=en
- "agents_skills_archive_impeccable_reference_live_md_reference_live_append_string": "append-string" | kind=entity | source=.agents/skills_archive/impeccable/reference/live.md:L692 | neighbors=[CSP detection (first-time only)] | lang=en
- "agents_skills_archive_impeccable_reference_live_md_reference_live_cleanup": "Cleanup" | kind=entity | source=.agents/skills_archive/impeccable/reference/live.md:L547 | neighbors=[live.md] | lang=en
- "agents_skills_archive_impeccable_reference_live_md_reference_live_consent_prompt_template": "Consent prompt template" | kind=entity | source=.agents/skills_archive/impeccable/reference/live.md:L651 | neighbors=[CSP detection (first-time only)] | lang=en
- "agents_skills_archive_impeccable_reference_live_md_reference_live_drift_heal_warning": "Drift-heal warning" | kind=entity | source=.agents/skills_archive/impeccable/reference/live.md:L601 | neighbors=[First-time setup (config missing or inv…] | lang=en
- "agents_skills_archive_impeccable_reference_live_md_reference_live_exit": "Exit" | kind=entity | source=.agents/skills_archive/impeccable/reference/live.md:L538 | neighbors=[live.md] | lang=en
- "agents_skills_archive_impeccable_reference_live_md_reference_live_handle_discard": "Handle `discard`" | kind=entity | source=.agents/skills_archive/impeccable/reference/live.md:L487 | neighbors=[live.md] | lang=en
- "agents_skills_archive_impeccable_reference_live_md_reference_live_handle_manual_edit_apply": "Handle `manual_edit_apply`" | kind=entity | source=.agents/skills_archive/impeccable/reference/live.md:L526 | neighbors=[live.md] | lang=en
- "agents_skills_archive_impeccable_reference_live_md_reference_live_handle_prefetch": "Handle `prefetch`" | kind=entity | source=.agents/skills_archive/impeccable/reference/live.md:L513 | neighbors=[live.md] | lang=en
- "agents_skills_archive_impeccable_reference_live_md_reference_live_handle_steer": "Handle `steer`" | kind=entity | source=.agents/skills_archive/impeccable/reference/live.md:L491 | neighbors=[live.md] | lang=en
- "agents_skills_archive_impeccable_reference_live_md_reference_live_insert_mode_branch": "Insert mode branch" | kind=entity | source=.agents/skills_archive/impeccable/reference/live.md:L99 | neighbors=[Handle `generate`] | lang=en
- "agents_skills_archive_impeccable_reference_live_md_reference_live_phase_a_extract_the_identity_non_skippable": "Phase A: Extract the identity (non-skippable)" | kind=entity | source=.agents/skills_archive/impeccable/reference/live.md:L202 | neighbors=[4. Plan three variants: identity first,…] | lang=en
- "agents_skills_archive_impeccable_reference_live_md_reference_live_phase_b_pick_mode_default_vs_departure": "Phase B: Pick mode (default vs departure)" | kind=entity | source=.agents/skills_archive/impeccable/reference/live.md:L225 | neighbors=[4. Plan three variants: identity first,…] | lang=en
- "agents_skills_archive_impeccable_reference_live_md_reference_live_phase_c_plan_three_variants": "Phase C: Plan three variants" | kind=entity | source=.agents/skills_archive/impeccable/reference/live.md:L236 | neighbors=[4. Plan three variants: identity first,…] | lang=en
- "agents_skills_archive_impeccable_reference_live_md_reference_live_phase_d_squint_test": "Phase D: Squint test" | kind=entity | source=.agents/skills_archive/impeccable/reference/live.md:L261 | neighbors=[4. Plan three variants: identity first,…] | lang=en
- "agents_skills_archive_impeccable_reference_live_md_reference_live_poll_loop": "Poll loop" | kind=entity | source=.agents/skills_archive/impeccable/reference/live.md:L44 | neighbors=[live.md] | lang=en
- "agents_skills_archive_impeccable_reference_live_md_reference_live_prerequisites": "Prerequisites" | kind=entity | source=.agents/skills_archive/impeccable/reference/live.md:L3 | neighbors=[live.md] | lang=en
- "agents_skills_archive_impeccable_reference_live_md_reference_live_recovery_commands": "Recovery commands" | kind=entity | source=.agents/skills_archive/impeccable/reference/live.md:L73 | neighbors=[live.md] | lang=en
- "agents_skills_archive_impeccable_reference_live_md_reference_live_replace_mode_default": "Replace mode (default)" | kind=entity | source=.agents/skills_archive/impeccable/reference/live.md:L120 | neighbors=[Handle `generate`] | lang=en
- "agents_skills_archive_impeccable_reference_live_md_reference_live_required_after_accept_carbonize": "Required after accept (carbonize)" | kind=entity | source=.agents/skills_archive/impeccable/reference/live.md:L471 | neighbors=[Handle `accept`] | lang=en
- "agents_skills_archive_impeccable_reference_live_md_reference_live_start": "Start" | kind=entity | source=.agents/skills_archive/impeccable/reference/live.md:L32 | neighbors=[live.md] | lang=en
- "agents_skills_archive_impeccable_reference_live_md_reference_live_step_1_identify_where_the_element_actually_lives": "Step 1: Identify where the element actually lives" | kind=entity | source=.agents/skills_archive/impeccable/reference/live.md:L426 | neighbors=[Handle fallback] | lang=en
- "agents_skills_archive_impeccable_reference_live_md_reference_live_step_2_show_three_variants_in_the_dom_for_preview": "Step 2: Show three variants in the DOM for preview" | kind=entity | source=.agents/skills_archive/impeccable/reference/live.md:L436 | neighbors=[Handle fallback] | lang=en
- "agents_skills_archive_impeccable_reference_live_md_reference_live_step_3_on_accept_write_to_true_source": "Step 3: On accept, write to true source" | kind=entity | source=.agents/skills_archive/impeccable/reference/live.md:L446 | neighbors=[Handle fallback] | lang=en
- "agents_skills_archive_impeccable_reference_live_md_reference_live_step_4_on_discard_clean_up_the_served_file": "Step 4: On discard, clean up the served file" | kind=entity | source=.agents/skills_archive/impeccable/reference/live.md:L456 | neighbors=[Handle fallback] | lang=en

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\PTOW\1_APT_Central_Command\.graphify\description-instructions\batch-134.json

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
