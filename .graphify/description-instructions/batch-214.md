# Node Description Batch 215 of 412

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

- "github_skills_archive_impeccable_reference_delight_md_reference_delight_micro_interactions_animation": "Micro-interactions & Animation" | kind=entity | source=.github/skills_archive/impeccable/reference/delight.md:L76 | neighbors=[Delight Techniques]
- "github_skills_archive_impeccable_reference_delight_md_reference_delight_personality_in_copy": "Personality in Copy" | kind=entity | source=.github/skills_archive/impeccable/reference/delight.md:L115 | neighbors=[Delight Techniques]
- "github_skills_archive_impeccable_reference_delight_md_reference_delight_register": "Register" | kind=entity | source=.github/skills_archive/impeccable/reference/delight.md:L7 | neighbors=[delight.md]
- "github_skills_archive_impeccable_reference_delight_md_reference_delight_satisfying_interactions": "Satisfying Interactions" | kind=entity | source=.github/skills_archive/impeccable/reference/delight.md:L167 | neighbors=[Delight Techniques]
- "github_skills_archive_impeccable_reference_delight_md_reference_delight_sound_design": "Sound Design" | kind=entity | source=.github/skills_archive/impeccable/reference/delight.md:L193 | neighbors=[Delight Techniques]
- "github_skills_archive_impeccable_reference_delight_md_reference_delight_surprise_and_discovery": "Surprise and Discovery" | kind=entity | source=.github/skills_archive/impeccable/reference/delight.md:L54 | neighbors=[Delight Principles]
- "github_skills_archive_impeccable_reference_delight_md_reference_delight_verify_delight_quality": "Verify Delight Quality" | kind=entity | source=.github/skills_archive/impeccable/reference/delight.md:L291 | neighbors=[delight.md]
- "github_skills_archive_impeccable_reference_distill_md_reference_distill_assess_current_state": "Assess Current State" | kind=entity | source=.github/skills_archive/impeccable/reference/distill.md:L6 | neighbors=[distill.md]
- "github_skills_archive_impeccable_reference_distill_md_reference_distill_code_simplification": "Code Simplification" | kind=entity | source=.github/skills_archive/impeccable/reference/distill.md:L80 | neighbors=[Simplify the Design]
- "github_skills_archive_impeccable_reference_distill_md_reference_distill_content_simplification": "Content Simplification" | kind=entity | source=.github/skills_archive/impeccable/reference/distill.md:L72 | neighbors=[Simplify the Design]
- "github_skills_archive_impeccable_reference_distill_md_reference_distill_document_removed_complexity": "Document Removed Complexity" | kind=entity | source=.github/skills_archive/impeccable/reference/distill.md:L104 | neighbors=[distill.md]
- "github_skills_archive_impeccable_reference_distill_md_reference_distill_information_architecture": "Information Architecture" | kind=entity | source=.github/skills_archive/impeccable/reference/distill.md:L43 | neighbors=[Simplify the Design]
- "github_skills_archive_impeccable_reference_distill_md_reference_distill_interaction_simplification": "Interaction Simplification" | kind=entity | source=.github/skills_archive/impeccable/reference/distill.md:L65 | neighbors=[Simplify the Design]
- "github_skills_archive_impeccable_reference_distill_md_reference_distill_layout_simplification": "Layout Simplification" | kind=entity | source=.github/skills_archive/impeccable/reference/distill.md:L58 | neighbors=[Simplify the Design]
- "github_skills_archive_impeccable_reference_distill_md_reference_distill_plan_simplification": "Plan Simplification" | kind=entity | source=.github/skills_archive/impeccable/reference/distill.md:L28 | neighbors=[distill.md]
- "github_skills_archive_impeccable_reference_distill_md_reference_distill_verify_simplification": "Verify Simplification" | kind=entity | source=.github/skills_archive/impeccable/reference/distill.md:L94 | neighbors=[distill.md]
- "github_skills_archive_impeccable_reference_distill_md_reference_distill_visual_simplification": "Visual Simplification" | kind=entity | source=.github/skills_archive/impeccable/reference/distill.md:L50 | neighbors=[Simplify the Design]
- "github_skills_archive_impeccable_reference_document_md_reference_document_component_translation_rules": "Component translation rules" | kind=entity | source=.github/skills_archive/impeccable/reference/document.md:L294 | neighbors=[Step 4b: Write .impeccable/design.json …]
- "github_skills_archive_impeccable_reference_document_md_reference_document_narrative_mapping": "Narrative mapping" | kind=entity | source=.github/skills_archive/impeccable/reference/document.md:L319 | neighbors=[Step 4b: Write .impeccable/design.json …]
- "github_skills_archive_impeccable_reference_document_md_reference_document_pitfalls": "Pitfalls" | kind=entity | source=.github/skills_archive/impeccable/reference/document.md:L419 | neighbors=[document.md]
- "github_skills_archive_impeccable_reference_document_md_reference_document_schema": "Schema" | kind=entity | source=.github/skills_archive/impeccable/reference/document.md:L246 | neighbors=[Step 4b: Write .impeccable/design.json …]
- "github_skills_archive_impeccable_reference_document_md_reference_document_step_1_confirm_seed_mode": "Step 1: Confirm seed mode" | kind=entity | source=.github/skills_archive/impeccable/reference/document.md:L343 | neighbors=[Seed mode]
- "github_skills_archive_impeccable_reference_document_md_reference_document_step_1_find_the_design_assets": "Step 1: Find the design assets" | kind=entity | source=.github/skills_archive/impeccable/reference/document.md:L80 | neighbors=[Scan mode (approach C: auto-extract, th…]
- "github_skills_archive_impeccable_reference_document_md_reference_document_step_2_auto_extract_what_can_be_auto_extracted": "Step 2: Auto-extract what can be auto-extracted" | kind=entity | source=.github/skills_archive/impeccable/reference/document.md:L92 | neighbors=[Scan mode (approach C: auto-extract, th…]
- "github_skills_archive_impeccable_reference_document_md_reference_document_step_2_five_questions": "Step 2: Five questions" | kind=entity | source=.github/skills_archive/impeccable/reference/document.md:L349 | neighbors=[Seed mode]
- "github_skills_archive_impeccable_reference_document_md_reference_document_step_2b_stage_the_frontmatter": "Step 2b: Stage the frontmatter" | kind=entity | source=.github/skills_archive/impeccable/reference/document.md:L102 | neighbors=[Scan mode (approach C: auto-extract, th…]
- "github_skills_archive_impeccable_reference_document_md_reference_document_step_3_ask_the_user_for_qualitative_language": "Step 3: Ask the user for qualitative language" | kind=entity | source=.github/skills_archive/impeccable/reference/document.md:L113 | neighbors=[Scan mode (approach C: auto-extract, th…]
- "github_skills_archive_impeccable_reference_document_md_reference_document_step_3_write_seed_design_md": "Step 3: Write seed DESIGN.md" | kind=entity | source=.github/skills_archive/impeccable/reference/document.md:L377 | neighbors=[Seed mode]
- "github_skills_archive_impeccable_reference_document_md_reference_document_step_4_confirm": "Step 4: Confirm" | kind=entity | source=.github/skills_archive/impeccable/reference/document.md:L398 | neighbors=[Seed mode]
- "github_skills_archive_impeccable_reference_document_md_reference_document_step_4_write_design_md": "Step 4: Write DESIGN.md" | kind=entity | source=.github/skills_archive/impeccable/reference/document.md:L125 | neighbors=[Scan mode (approach C: auto-extract, th…]
- "github_skills_archive_impeccable_reference_document_md_reference_document_step_5_confirm_and_refine": "Step 5: Confirm and refine" | kind=entity | source=.github/skills_archive/impeccable/reference/document.md:L331 | neighbors=[Scan mode (approach C: auto-extract, th…]
- "github_skills_archive_impeccable_reference_document_md_reference_document_style_guidelines": "Style guidelines" | kind=entity | source=.github/skills_archive/impeccable/reference/document.md:L405 | neighbors=[document.md]
- "github_skills_archive_impeccable_reference_document_md_reference_document_the_frontmatter_token_schema": "The frontmatter: token schema" | kind=entity | source=.github/skills_archive/impeccable/reference/document.md:L5 | neighbors=[document.md]
- "github_skills_archive_impeccable_reference_document_md_reference_document_the_markdown_body_six_sections_exact_order": "The markdown body: six sections (exact order)" | kind=entity | source=.github/skills_archive/impeccable/reference/document.md:L51 | neighbors=[document.md]
- "github_skills_archive_impeccable_reference_document_md_reference_document_tonal_ramps": "Tonal ramps" | kind=entity | source=.github/skills_archive/impeccable/reference/document.md:L315 | neighbors=[Step 4b: Write .impeccable/design.json …]
- "github_skills_archive_impeccable_reference_document_md_reference_document_two_paths": "Two paths" | kind=entity | source=.github/skills_archive/impeccable/reference/document.md:L71 | neighbors=[document.md]
- "github_skills_archive_impeccable_reference_document_md_reference_document_what_to_include": "What to include" | kind=entity | source=.github/skills_archive/impeccable/reference/document.md:L305 | neighbors=[Step 4b: Write .impeccable/design.json …]
- "github_skills_archive_impeccable_reference_document_md_reference_document_when_to_run": "When to run" | kind=entity | source=.github/skills_archive/impeccable/reference/document.md:L62 | neighbors=[document.md]
- "github_skills_archive_impeccable_reference_extract_md_reference_extract": "extract.md" | kind=entity | source=.github/skills_archive/impeccable/reference/extract.md:L1 | neighbors=[Extract Flow]
- "github_skills_archive_impeccable_reference_extract_md_reference_extract_step_1_discover_the_design_system": "Step 1: Discover the Design System" | kind=entity | source=.github/skills_archive/impeccable/reference/extract.md:L5 | neighbors=[Extract Flow]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\PTOW\1_APT_Central_Command\.graphify\description-instructions\batch-214.json

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
