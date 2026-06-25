# Node Description Batch 229 of 412

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

- "github_skills_impeccable_reference_live_md_reference_live_drift_heal_warning": "Drift-heal warning" | kind=entity | source=.github/skills/impeccable/reference/live.md:L599 | neighbors=[First-time setup (config missing or inv…]
- "github_skills_impeccable_reference_live_md_reference_live_exit": "Exit" | kind=entity | source=.github/skills/impeccable/reference/live.md:L536 | neighbors=[live.md]
- "github_skills_impeccable_reference_live_md_reference_live_handle_discard": "Handle `discard`" | kind=entity | source=.github/skills/impeccable/reference/live.md:L485 | neighbors=[live.md]
- "github_skills_impeccable_reference_live_md_reference_live_handle_manual_edit_apply": "Handle `manual_edit_apply`" | kind=entity | source=.github/skills/impeccable/reference/live.md:L524 | neighbors=[live.md]
- "github_skills_impeccable_reference_live_md_reference_live_handle_prefetch": "Handle `prefetch`" | kind=entity | source=.github/skills/impeccable/reference/live.md:L511 | neighbors=[live.md]
- "github_skills_impeccable_reference_live_md_reference_live_handle_steer": "Handle `steer`" | kind=entity | source=.github/skills/impeccable/reference/live.md:L489 | neighbors=[live.md]
- "github_skills_impeccable_reference_live_md_reference_live_insert_mode_branch": "Insert mode branch" | kind=entity | source=.github/skills/impeccable/reference/live.md:L97 | neighbors=[Handle `generate`]
- "github_skills_impeccable_reference_live_md_reference_live_phase_a_extract_the_identity_non_skippable": "Phase A: Extract the identity (non-skippable)" | kind=entity | source=.github/skills/impeccable/reference/live.md:L200 | neighbors=[4. Plan three variants: identity first,…]
- "github_skills_impeccable_reference_live_md_reference_live_phase_b_pick_mode_default_vs_departure": "Phase B: Pick mode (default vs departure)" | kind=entity | source=.github/skills/impeccable/reference/live.md:L223 | neighbors=[4. Plan three variants: identity first,…]
- "github_skills_impeccable_reference_live_md_reference_live_phase_c_plan_three_variants": "Phase C: Plan three variants" | kind=entity | source=.github/skills/impeccable/reference/live.md:L234 | neighbors=[4. Plan three variants: identity first,…]
- "github_skills_impeccable_reference_live_md_reference_live_phase_d_squint_test": "Phase D: Squint test" | kind=entity | source=.github/skills/impeccable/reference/live.md:L259 | neighbors=[4. Plan three variants: identity first,…]
- "github_skills_impeccable_reference_live_md_reference_live_poll_loop": "Poll loop" | kind=entity | source=.github/skills/impeccable/reference/live.md:L42 | neighbors=[live.md]
- "github_skills_impeccable_reference_live_md_reference_live_prerequisites": "Prerequisites" | kind=entity | source=.github/skills/impeccable/reference/live.md:L3 | neighbors=[live.md]
- "github_skills_impeccable_reference_live_md_reference_live_recovery_commands": "Recovery commands" | kind=entity | source=.github/skills/impeccable/reference/live.md:L71 | neighbors=[live.md]
- "github_skills_impeccable_reference_live_md_reference_live_replace_mode_default": "Replace mode (default)" | kind=entity | source=.github/skills/impeccable/reference/live.md:L118 | neighbors=[Handle `generate`]
- "github_skills_impeccable_reference_live_md_reference_live_required_after_accept_carbonize": "Required after accept (carbonize)" | kind=entity | source=.github/skills/impeccable/reference/live.md:L469 | neighbors=[Handle `accept`]
- "github_skills_impeccable_reference_live_md_reference_live_start": "Start" | kind=entity | source=.github/skills/impeccable/reference/live.md:L30 | neighbors=[live.md]
- "github_skills_impeccable_reference_live_md_reference_live_step_1_identify_where_the_element_actually_lives": "Step 1: Identify where the element actually lives" | kind=entity | source=.github/skills/impeccable/reference/live.md:L424 | neighbors=[Handle fallback]
- "github_skills_impeccable_reference_live_md_reference_live_step_2_show_three_variants_in_the_dom_for_preview": "Step 2: Show three variants in the DOM for preview" | kind=entity | source=.github/skills/impeccable/reference/live.md:L434 | neighbors=[Handle fallback]
- "github_skills_impeccable_reference_live_md_reference_live_step_3_on_accept_write_to_true_source": "Step 3: On accept, write to true source" | kind=entity | source=.github/skills/impeccable/reference/live.md:L444 | neighbors=[Handle fallback]
- "github_skills_impeccable_reference_live_md_reference_live_step_4_on_discard_clean_up_the_served_file": "Step 4: On discard, clean up the served file" | kind=entity | source=.github/skills/impeccable/reference/live.md:L454 | neighbors=[Handle fallback]
- "github_skills_impeccable_reference_live_md_reference_live_the_contract_read_once": "The contract (read once)" | kind=entity | source=.github/skills/impeccable/reference/live.md:L7 | neighbors=[live.md]
- "github_skills_impeccable_reference_live_md_reference_live_troubleshooting": "Troubleshooting" | kind=entity | source=.github/skills/impeccable/reference/live.md:L714 | neighbors=[First-time setup (config missing or inv…]
- "github_skills_impeccable_reference_onboard_md_reference_onboard_assess_onboarding_needs": "Assess Onboarding Needs" | kind=entity | source=.github/skills/impeccable/reference/onboard.md:L5 | neighbors=[onboard.md]
- "github_skills_impeccable_reference_onboard_md_reference_onboard_context_over_ceremony": "Context Over Ceremony" | kind=entity | source=.github/skills/impeccable/reference/onboard.md:L48 | neighbors=[Onboarding Principles]
- "github_skills_impeccable_reference_onboard_md_reference_onboard_contextual_help": "Contextual Help" | kind=entity | source=.github/skills/impeccable/reference/onboard.md:L184 | neighbors=[Empty State Design]
- "github_skills_impeccable_reference_onboard_md_reference_onboard_documentation_help": "Documentation & Help" | kind=entity | source=.github/skills/impeccable/reference/onboard.md:L155 | neighbors=[Design Onboarding Experiences]
- "github_skills_impeccable_reference_onboard_md_reference_onboard_feature_discovery_adoption": "Feature Discovery & Adoption" | kind=entity | source=.github/skills/impeccable/reference/onboard.md:L88 | neighbors=[Design Onboarding Experiences]
- "github_skills_impeccable_reference_onboard_md_reference_onboard_guided_tours_walkthroughs": "Guided Tours & Walkthroughs" | kind=entity | source=.github/skills/impeccable/reference/onboard.md:L122 | neighbors=[Design Onboarding Experiences]
- "github_skills_impeccable_reference_onboard_md_reference_onboard_how_to_get_started": "How to Get Started" | kind=entity | source=.github/skills/impeccable/reference/onboard.md:L178 | neighbors=[Empty State Design]
- "github_skills_impeccable_reference_onboard_md_reference_onboard_initial_product_onboarding": "Initial Product Onboarding" | kind=entity | source=.github/skills/impeccable/reference/onboard.md:L62 | neighbors=[Design Onboarding Experiences]
- "github_skills_impeccable_reference_onboard_md_reference_onboard_interactive_tutorials": "Interactive Tutorials" | kind=entity | source=.github/skills/impeccable/reference/onboard.md:L141 | neighbors=[Design Onboarding Experiences]
- "github_skills_impeccable_reference_onboard_md_reference_onboard_make_it_optional_when_possible": "Make It Optional (When Possible)" | kind=entity | source=.github/skills/impeccable/reference/onboard.md:L37 | neighbors=[Onboarding Principles]
- "github_skills_impeccable_reference_onboard_md_reference_onboard_respect_user_intelligence": "Respect User Intelligence" | kind=entity | source=.github/skills/impeccable/reference/onboard.md:L53 | neighbors=[Onboarding Principles]
- "github_skills_impeccable_reference_onboard_md_reference_onboard_show_don_t_tell": "Show, Don't Tell" | kind=entity | source=.github/skills/impeccable/reference/onboard.md:L32 | neighbors=[Onboarding Principles]
- "github_skills_impeccable_reference_onboard_md_reference_onboard_technical_approaches": "Technical approaches:" | kind=entity | source=.github/skills/impeccable/reference/onboard.md:L196 | neighbors=[Implementation Patterns]
- "github_skills_impeccable_reference_onboard_md_reference_onboard_time_to_value": "Time to Value" | kind=entity | source=.github/skills/impeccable/reference/onboard.md:L42 | neighbors=[Onboarding Principles]
- "github_skills_impeccable_reference_onboard_md_reference_onboard_verify_onboarding_quality": "Verify Onboarding Quality" | kind=entity | source=.github/skills/impeccable/reference/onboard.md:L223 | neighbors=[onboard.md]
- "github_skills_impeccable_reference_onboard_md_reference_onboard_visual_interest": "Visual Interest" | kind=entity | source=.github/skills/impeccable/reference/onboard.md:L181 | neighbors=[Empty State Design]
- "github_skills_impeccable_reference_onboard_md_reference_onboard_what_will_be_here": "What Will Be Here" | kind=entity | source=.github/skills/impeccable/reference/onboard.md:L172 | neighbors=[Empty State Design]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\PTOW\1_APT_Central_Command\.graphify\description-instructions\batch-228.json

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
