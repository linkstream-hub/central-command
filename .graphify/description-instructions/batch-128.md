# Node Description Batch 129 of 412

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

- "agents_skills_archive_impeccable_reference_audit_md_reference_audit_executive_summary": "Executive Summary" | kind=entity | source=.agents/skills_archive/impeccable/reference/audit.md:L77 | neighbors=[Generate Report]
- "agents_skills_archive_impeccable_reference_audit_md_reference_audit_patterns_systemic_issues": "Patterns & Systemic Issues" | kind=entity | source=.agents/skills_archive/impeccable/reference/audit.md:L100 | neighbors=[Generate Report]
- "agents_skills_archive_impeccable_reference_audit_md_reference_audit_positive_findings": "Positive Findings" | kind=entity | source=.agents/skills_archive/impeccable/reference/audit.md:L106 | neighbors=[Generate Report]
- "agents_skills_archive_impeccable_reference_audit_md_reference_audit_recommended_actions": "Recommended Actions" | kind=entity | source=.agents/skills_archive/impeccable/reference/audit.md:L110 | neighbors=[audit.md]
- "agents_skills_archive_impeccable_reference_bolder_md_reference_bolder_assess_current_state": "Assess Current State" | kind=entity | source=.agents/skills_archive/impeccable/reference/bolder.md:L13 | neighbors=[bolder.md]
- "agents_skills_archive_impeccable_reference_bolder_md_reference_bolder_color_intensification": "Color Intensification" | kind=entity | source=.agents/skills_archive/impeccable/reference/bolder.md:L58 | neighbors=[Amplify the Design]
- "agents_skills_archive_impeccable_reference_bolder_md_reference_bolder_composition_boldness": "Composition Boldness" | kind=entity | source=.agents/skills_archive/impeccable/reference/bolder.md:L86 | neighbors=[Amplify the Design]
- "agents_skills_archive_impeccable_reference_bolder_md_reference_bolder_motion_animation": "Motion & Animation" | kind=entity | source=.agents/skills_archive/impeccable/reference/bolder.md:L80 | neighbors=[Amplify the Design]
- "agents_skills_archive_impeccable_reference_bolder_md_reference_bolder_plan_amplification": "Plan Amplification" | kind=entity | source=.agents/skills_archive/impeccable/reference/bolder.md:L37 | neighbors=[bolder.md]
- "agents_skills_archive_impeccable_reference_bolder_md_reference_bolder_register": "Register" | kind=entity | source=.agents/skills_archive/impeccable/reference/bolder.md:L5 | neighbors=[bolder.md]
- "agents_skills_archive_impeccable_reference_bolder_md_reference_bolder_spatial_drama": "Spatial Drama" | kind=entity | source=.agents/skills_archive/impeccable/reference/bolder.md:L66 | neighbors=[Amplify the Design]
- "agents_skills_archive_impeccable_reference_bolder_md_reference_bolder_typography_amplification": "Typography Amplification" | kind=entity | source=.agents/skills_archive/impeccable/reference/bolder.md:L52 | neighbors=[Amplify the Design]
- "agents_skills_archive_impeccable_reference_bolder_md_reference_bolder_verify_quality": "Verify Quality" | kind=entity | source=.agents/skills_archive/impeccable/reference/bolder.md:L100 | neighbors=[bolder.md]
- "agents_skills_archive_impeccable_reference_bolder_md_reference_bolder_visual_effects": "Visual Effects" | kind=entity | source=.agents/skills_archive/impeccable/reference/bolder.md:L73 | neighbors=[Amplify the Design]
- "agents_skills_archive_impeccable_reference_brand_md_reference_brand": "brand.md" | kind=entity | source=.agents/skills_archive/impeccable/reference/brand.md:L1 | neighbors=[Brand register]
- "agents_skills_archive_impeccable_reference_brand_md_reference_brand_brand_bans_on_top_of_the_shared_absolute_bans": "Brand bans (on top of the shared absolute bans)" | kind=entity | source=.agents/skills_archive/impeccable/reference/brand.md:L90 | neighbors=[Brand register]
- "agents_skills_archive_impeccable_reference_brand_md_reference_brand_brand_permissions": "Brand permissions" | kind=entity | source=.agents/skills_archive/impeccable/reference/brand.md:L101 | neighbors=[Brand register]
- "agents_skills_archive_impeccable_reference_brand_md_reference_brand_color": "Color" | kind=entity | source=.agents/skills_archive/impeccable/reference/brand.md:L56 | neighbors=[Brand register]
- "agents_skills_archive_impeccable_reference_brand_md_reference_brand_font_selection_procedure": "Font selection procedure" | kind=entity | source=.agents/skills_archive/impeccable/reference/brand.md:L19 | neighbors=[Typography]
- "agents_skills_archive_impeccable_reference_brand_md_reference_brand_imagery": "Imagery" | kind=entity | source=.agents/skills_archive/impeccable/reference/brand.md:L73 | neighbors=[Brand register]
- "agents_skills_archive_impeccable_reference_brand_md_reference_brand_layout": "Layout" | kind=entity | source=.agents/skills_archive/impeccable/reference/brand.md:L66 | neighbors=[Brand register]
- "agents_skills_archive_impeccable_reference_brand_md_reference_brand_motion": "Motion" | kind=entity | source=.agents/skills_archive/impeccable/reference/brand.md:L86 | neighbors=[Brand register]
- "agents_skills_archive_impeccable_reference_brand_md_reference_brand_pairing_and_voice": "Pairing and voice" | kind=entity | source=.agents/skills_archive/impeccable/reference/brand.md:L44 | neighbors=[Typography]
- "agents_skills_archive_impeccable_reference_brand_md_reference_brand_reflex_reject_aesthetic_lanes": "Reflex-reject aesthetic lanes" | kind=entity | source=.agents/skills_archive/impeccable/reference/brand.md:L34 | neighbors=[Typography]
- "agents_skills_archive_impeccable_reference_brand_md_reference_brand_reflex_reject_list": "Reflex-reject list" | kind=entity | source=.agents/skills_archive/impeccable/reference/brand.md:L28 | neighbors=[Typography]
- "agents_skills_archive_impeccable_reference_brand_md_reference_brand_scale": "Scale" | kind=entity | source=.agents/skills_archive/impeccable/reference/brand.md:L50 | neighbors=[Typography]
- "agents_skills_archive_impeccable_reference_brand_md_reference_brand_the_brand_slop_test": "The brand slop test" | kind=entity | source=.agents/skills_archive/impeccable/reference/brand.md:L7 | neighbors=[Brand register]
- "agents_skills_archive_impeccable_reference_clarify_md_reference_clarify_apply_clarity_principles": "Apply Clarity Principles" | kind=entity | source=.agents/skills_archive/impeccable/reference/clarify.md:L141 | neighbors=[clarify.md]
- "agents_skills_archive_impeccable_reference_clarify_md_reference_clarify_assess_current_copy": "Assess Current Copy" | kind=entity | source=.agents/skills_archive/impeccable/reference/clarify.md:L8 | neighbors=[clarify.md]
- "agents_skills_archive_impeccable_reference_clarify_md_reference_clarify_avoid_redundant_copy": "Avoid Redundant Copy" | kind=entity | source=.agents/skills_archive/impeccable/reference/clarify.md:L270 | neighbors=[UX Writing]
- "agents_skills_archive_impeccable_reference_clarify_md_reference_clarify_button_cta_text": "Button & CTA Text" | kind=entity | source=.agents/skills_archive/impeccable/reference/clarify.md:L72 | neighbors=[Improve Copy Systematically]
- "agents_skills_archive_impeccable_reference_clarify_md_reference_clarify_confirmation_dialogs": "Confirmation Dialogs" | kind=entity | source=.agents/skills_archive/impeccable/reference/clarify.md:L121 | neighbors=[Improve Copy Systematically]
- "agents_skills_archive_impeccable_reference_clarify_md_reference_clarify_confirmation_dialogs_use_sparingly": "Confirmation Dialogs: Use Sparingly" | kind=entity | source=.agents/skills_archive/impeccable/reference/clarify.md:L278 | neighbors=[UX Writing]
- "agents_skills_archive_impeccable_reference_clarify_md_reference_clarify_consistency_the_terminology_problem": "Consistency: The Terminology Problem" | kind=entity | source=.agents/skills_archive/impeccable/reference/clarify.md:L257 | neighbors=[UX Writing]
- "agents_skills_archive_impeccable_reference_clarify_md_reference_clarify_don_t_blame_the_user": "Don't Blame the User" | kind=entity | source=.agents/skills_archive/impeccable/reference/clarify.md:L214 | neighbors=[Error Messages: The Formula]
- "agents_skills_archive_impeccable_reference_clarify_md_reference_clarify_empty_states": "Empty States" | kind=entity | source=.agents/skills_archive/impeccable/reference/clarify.md:L92 | neighbors=[Improve Copy Systematically]
- "agents_skills_archive_impeccable_reference_clarify_md_reference_clarify_empty_states_are_opportunities": "Empty States Are Opportunities" | kind=entity | source=.agents/skills_archive/impeccable/reference/clarify.md:L218 | neighbors=[UX Writing]
- "agents_skills_archive_impeccable_reference_clarify_md_reference_clarify_error_message_templates": "Error Message Templates" | kind=entity | source=.agents/skills_archive/impeccable/reference/clarify.md:L204 | neighbors=[Error Messages: The Formula]
- "agents_skills_archive_impeccable_reference_clarify_md_reference_clarify_error_messages": "Error Messages" | kind=entity | source=.agents/skills_archive/impeccable/reference/clarify.md:L44 | neighbors=[Improve Copy Systematically]
- "agents_skills_archive_impeccable_reference_clarify_md_reference_clarify_form_instructions": "Form Instructions" | kind=entity | source=.agents/skills_archive/impeccable/reference/clarify.md:L282 | neighbors=[UX Writing]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\PTOW\1_APT_Central_Command\.graphify\description-instructions\batch-128.json

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
