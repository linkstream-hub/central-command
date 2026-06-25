# Node Description Batch 131 of 412

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

- "agents_skills_archive_impeccable_reference_colorize_md_reference_colorize_tinted_neutrals": "Tinted Neutrals" | kind=entity | source=.agents/skills_archive/impeccable/reference/colorize.md:L172 | neighbors=[Building Functional Palettes] | lang=en
- "agents_skills_archive_impeccable_reference_colorize_md_reference_colorize_token_hierarchy": "Token Hierarchy" | kind=entity | source=.agents/skills_archive/impeccable/reference/colorize.md:L247 | neighbors=[Theming: Light & Dark Mode] | lang=en
- "agents_skills_archive_impeccable_reference_colorize_md_reference_colorize_typography_color": "Typography Color" | kind=entity | source=.agents/skills_archive/impeccable/reference/colorize.md:L92 | neighbors=[Introduce Color Strategically] | lang=en
- "agents_skills_archive_impeccable_reference_colorize_md_reference_colorize_verify_color_addition": "Verify Color Addition" | kind=entity | source=.agents/skills_archive/impeccable/reference/colorize.md:L132 | neighbors=[colorize.md] | lang=en
- "agents_skills_archive_impeccable_reference_colorize_md_reference_colorize_wcag_requirements": "WCAG Requirements" | kind=entity | source=.agents/skills_archive/impeccable/reference/colorize.md:L205 | neighbors=[Contrast & Accessibility] | lang=en
- "agents_skills_archive_impeccable_reference_craft_md_reference_craft": "craft.md" | kind=entity | source=.agents/skills_archive/impeccable/reference/craft.md:L1 | neighbors=[Craft Flow] | lang=en
- "agents_skills_archive_impeccable_reference_craft_md_reference_craft_gates_do_not_compress": "Gates: do not compress" | kind=entity | source=.agents/skills_archive/impeccable/reference/craft.md:L9 | neighbors=[Craft Flow] | lang=pt
- "agents_skills_archive_impeccable_reference_craft_md_reference_craft_production_bar": "Production bar" | kind=entity | source=.agents/skills_archive/impeccable/reference/craft.md:L83 | neighbors=[Step 4: Build to Production Quality] | lang=en
- "agents_skills_archive_impeccable_reference_craft_md_reference_craft_step_0_project_foundation": "Step 0: Project Foundation" | kind=entity | source=.agents/skills_archive/impeccable/reference/craft.md:L22 | neighbors=[Craft Flow] | lang=en
- "agents_skills_archive_impeccable_reference_craft_md_reference_craft_step_1_shape_the_design": "Step 1: Shape the Design" | kind=entity | source=.agents/skills_archive/impeccable/reference/craft.md:L43 | neighbors=[Craft Flow] | lang=en
- "agents_skills_archive_impeccable_reference_craft_md_reference_craft_step_2_load_references": "Step 2: Load References" | kind=entity | source=.agents/skills_archive/impeccable/reference/craft.md:L55 | neighbors=[Craft Flow] | lang=en
- "agents_skills_archive_impeccable_reference_craft_md_reference_craft_step_3_visual_direction_assets_harness_gated": "Step 3: Visual Direction & Assets (Harness-Gated)" | kind=entity | source=.agents/skills_archive/impeccable/reference/craft.md:L69 | neighbors=[Craft Flow] | lang=en
- "agents_skills_archive_impeccable_reference_craft_md_reference_craft_step_5_iterate_visually": "Step 5: Iterate Visually" | kind=entity | source=.agents/skills_archive/impeccable/reference/craft.md:L101 | neighbors=[Craft Flow] | lang=en
- "agents_skills_archive_impeccable_reference_craft_md_reference_craft_step_6_present": "Step 6: Present" | kind=entity | source=.agents/skills_archive/impeccable/reference/craft.md:L115 | neighbors=[Craft Flow] | lang=en
- "agents_skills_archive_impeccable_reference_critique_md_reference_critique_1_impatient_power_user_alex": "1. Impatient Power User: \"Alex\"" | kind=entity | source=.agents/skills_archive/impeccable/reference/critique.md:L621 | neighbors=[Persona-Based Design Testing] | lang=en
- "agents_skills_archive_impeccable_reference_critique_md_reference_critique_1_the_wall_of_options": "1. The Wall of Options" | kind=entity | source=.agents/skills_archive/impeccable/reference/critique.md:L342 | neighbors=[Common Cognitive Load Violations] | lang=en
- "agents_skills_archive_impeccable_reference_critique_md_reference_critique_1_visibility_of_system_status": "1. Visibility of System Status" | kind=entity | source=.agents/skills_archive/impeccable/reference/critique.md:L382 | neighbors=[Nielsen's 10 Heuristics] | lang=en
- "agents_skills_archive_impeccable_reference_critique_md_reference_critique_10_help_and_documentation": "10. Help and Documentation" | kind=entity | source=.agents/skills_archive/impeccable/reference/critique.md:L562 | neighbors=[Nielsen's 10 Heuristics] | lang=en
- "agents_skills_archive_impeccable_reference_critique_md_reference_critique_2_confused_first_timer_jordan": "2. Confused First-Timer: \"Jordan\"" | kind=entity | source=.agents/skills_archive/impeccable/reference/critique.md:L648 | neighbors=[Persona-Based Design Testing] | lang=en
- "agents_skills_archive_impeccable_reference_critique_md_reference_critique_2_match_between_system_and_real_world": "2. Match Between System and Real World" | kind=entity | source=.agents/skills_archive/impeccable/reference/critique.md:L402 | neighbors=[Nielsen's 10 Heuristics] | lang=en
- "agents_skills_archive_impeccable_reference_critique_md_reference_critique_2_the_memory_bridge": "2. The Memory Bridge" | kind=entity | source=.agents/skills_archive/impeccable/reference/critique.md:L346 | neighbors=[Common Cognitive Load Violations] | lang=en
- "agents_skills_archive_impeccable_reference_critique_md_reference_critique_3_accessibility_dependent_user_sam": "3. Accessibility-Dependent User: \"Sam\"" | kind=entity | source=.agents/skills_archive/impeccable/reference/critique.md:L675 | neighbors=[Persona-Based Design Testing] | lang=en
- "agents_skills_archive_impeccable_reference_critique_md_reference_critique_3_the_hidden_navigation": "3. The Hidden Navigation" | kind=entity | source=.agents/skills_archive/impeccable/reference/critique.md:L350 | neighbors=[Common Cognitive Load Violations] | lang=en
- "agents_skills_archive_impeccable_reference_critique_md_reference_critique_3_user_control_and_freedom": "3. User Control and Freedom" | kind=entity | source=.agents/skills_archive/impeccable/reference/critique.md:L422 | neighbors=[Nielsen's 10 Heuristics] | lang=en
- "agents_skills_archive_impeccable_reference_critique_md_reference_critique_4_consistency_and_standards": "4. Consistency and Standards" | kind=entity | source=.agents/skills_archive/impeccable/reference/critique.md:L442 | neighbors=[Nielsen's 10 Heuristics] | lang=en
- "agents_skills_archive_impeccable_reference_critique_md_reference_critique_4_deliberate_stress_tester_riley": "4. Deliberate Stress Tester: \"Riley\"" | kind=entity | source=.agents/skills_archive/impeccable/reference/critique.md:L703 | neighbors=[Persona-Based Design Testing] | lang=en
- "agents_skills_archive_impeccable_reference_critique_md_reference_critique_4_the_jargon_barrier": "4. The Jargon Barrier" | kind=entity | source=.agents/skills_archive/impeccable/reference/critique.md:L354 | neighbors=[Common Cognitive Load Violations] | lang=en
- "agents_skills_archive_impeccable_reference_critique_md_reference_critique_5_distracted_mobile_user_casey": "5. Distracted Mobile User: \"Casey\"" | kind=entity | source=.agents/skills_archive/impeccable/reference/critique.md:L730 | neighbors=[Persona-Based Design Testing] | lang=en
- "agents_skills_archive_impeccable_reference_critique_md_reference_critique_5_error_prevention": "5. Error Prevention" | kind=entity | source=.agents/skills_archive/impeccable/reference/critique.md:L462 | neighbors=[Nielsen's 10 Heuristics] | lang=en
- "agents_skills_archive_impeccable_reference_critique_md_reference_critique_5_the_visual_noise_floor": "5. The Visual Noise Floor" | kind=entity | source=.agents/skills_archive/impeccable/reference/critique.md:L358 | neighbors=[Common Cognitive Load Violations] | lang=en
- "agents_skills_archive_impeccable_reference_critique_md_reference_critique_6_recognition_rather_than_recall": "6. Recognition Rather Than Recall" | kind=entity | source=.agents/skills_archive/impeccable/reference/critique.md:L482 | neighbors=[Nielsen's 10 Heuristics] | lang=en
- "agents_skills_archive_impeccable_reference_critique_md_reference_critique_6_the_inconsistent_pattern": "6. The Inconsistent Pattern" | kind=entity | source=.agents/skills_archive/impeccable/reference/critique.md:L362 | neighbors=[Common Cognitive Load Violations] | lang=en
- "agents_skills_archive_impeccable_reference_critique_md_reference_critique_7_flexibility_and_efficiency_of_use": "7. Flexibility and Efficiency of Use" | kind=entity | source=.agents/skills_archive/impeccable/reference/critique.md:L502 | neighbors=[Nielsen's 10 Heuristics] | lang=en
- "agents_skills_archive_impeccable_reference_critique_md_reference_critique_7_the_multi_task_demand": "7. The Multi-Task Demand" | kind=entity | source=.agents/skills_archive/impeccable/reference/critique.md:L366 | neighbors=[Common Cognitive Load Violations] | lang=en
- "agents_skills_archive_impeccable_reference_critique_md_reference_critique_8_aesthetic_and_minimalist_design": "8. Aesthetic and Minimalist Design" | kind=entity | source=.agents/skills_archive/impeccable/reference/critique.md:L522 | neighbors=[Nielsen's 10 Heuristics] | lang=en
- "agents_skills_archive_impeccable_reference_critique_md_reference_critique_8_the_context_switch": "8. The Context Switch" | kind=entity | source=.agents/skills_archive/impeccable/reference/critique.md:L370 | neighbors=[Common Cognitive Load Violations] | lang=en
- "agents_skills_archive_impeccable_reference_critique_md_reference_critique_9_help_users_recognize_diagnose_and_recover_from_errors": "9. Help Users Recognize, Diagnose, and Recover from Errors" | kind=entity | source=.agents/skills_archive/impeccable/reference/critique.md:L542 | neighbors=[Nielsen's 10 Heuristics] | lang=en
- "agents_skills_archive_impeccable_reference_critique_md_reference_critique_action_summary": "Action Summary" | kind=entity | source=.agents/skills_archive/impeccable/reference/critique.md:L237 | neighbors=[Recommended Actions] | lang=en
- "agents_skills_archive_impeccable_reference_critique_md_reference_critique_anti_patterns_verdict": "Anti-Patterns Verdict" | kind=entity | source=.agents/skills_archive/impeccable/reference/critique.md:L117 | neighbors=[Generate Combined Critique Report] | lang=en
- "agents_skills_archive_impeccable_reference_critique_md_reference_critique_ask_the_user": "Ask the User" | kind=entity | source=.agents/skills_archive/impeccable/reference/critique.md:L211 | neighbors=[critique.md] | lang=en

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\PTOW\1_APT_Central_Command\.graphify\description-instructions\batch-130.json

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
