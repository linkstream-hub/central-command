# Node Description Batch 227 of 412

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

- "github_skills_impeccable_reference_document_md_reference_document_step_3_write_seed_design_md": "Step 3: Write seed DESIGN.md" | kind=entity | source=.github/skills/impeccable/reference/document.md:L377 | neighbors=[Seed mode]
- "github_skills_impeccable_reference_document_md_reference_document_step_4_confirm": "Step 4: Confirm" | kind=entity | source=.github/skills/impeccable/reference/document.md:L398 | neighbors=[Seed mode]
- "github_skills_impeccable_reference_document_md_reference_document_step_4_write_design_md": "Step 4: Write DESIGN.md" | kind=entity | source=.github/skills/impeccable/reference/document.md:L125 | neighbors=[Scan mode (approach C: auto-extract, th…]
- "github_skills_impeccable_reference_document_md_reference_document_step_5_confirm_and_refine": "Step 5: Confirm and refine" | kind=entity | source=.github/skills/impeccable/reference/document.md:L331 | neighbors=[Scan mode (approach C: auto-extract, th…]
- "github_skills_impeccable_reference_document_md_reference_document_style_guidelines": "Style guidelines" | kind=entity | source=.github/skills/impeccable/reference/document.md:L405 | neighbors=[document.md]
- "github_skills_impeccable_reference_document_md_reference_document_the_frontmatter_token_schema": "The frontmatter: token schema" | kind=entity | source=.github/skills/impeccable/reference/document.md:L5 | neighbors=[document.md]
- "github_skills_impeccable_reference_document_md_reference_document_the_markdown_body_six_sections_exact_order": "The markdown body: six sections (exact order)" | kind=entity | source=.github/skills/impeccable/reference/document.md:L51 | neighbors=[document.md]
- "github_skills_impeccable_reference_document_md_reference_document_tonal_ramps": "Tonal ramps" | kind=entity | source=.github/skills/impeccable/reference/document.md:L315 | neighbors=[Step 4b: Write .impeccable/design.json …]
- "github_skills_impeccable_reference_document_md_reference_document_two_paths": "Two paths" | kind=entity | source=.github/skills/impeccable/reference/document.md:L71 | neighbors=[document.md]
- "github_skills_impeccable_reference_document_md_reference_document_what_to_include": "What to include" | kind=entity | source=.github/skills/impeccable/reference/document.md:L305 | neighbors=[Step 4b: Write .impeccable/design.json …]
- "github_skills_impeccable_reference_document_md_reference_document_when_to_run": "When to run" | kind=entity | source=.github/skills/impeccable/reference/document.md:L62 | neighbors=[document.md]
- "github_skills_impeccable_reference_extract_md_reference_extract": "extract.md" | kind=entity | source=.github/skills/impeccable/reference/extract.md:L1 | neighbors=[Extract Flow]
- "github_skills_impeccable_reference_extract_md_reference_extract_step_1_discover_the_design_system": "Step 1: Discover the Design System" | kind=entity | source=.github/skills/impeccable/reference/extract.md:L5 | neighbors=[Extract Flow]
- "github_skills_impeccable_reference_extract_md_reference_extract_step_2_identify_patterns": "Step 2: Identify Patterns" | kind=entity | source=.github/skills/impeccable/reference/extract.md:L11 | neighbors=[Extract Flow]
- "github_skills_impeccable_reference_extract_md_reference_extract_step_3_plan_extraction": "Step 3: Plan Extraction" | kind=entity | source=.github/skills/impeccable/reference/extract.md:L24 | neighbors=[Extract Flow]
- "github_skills_impeccable_reference_extract_md_reference_extract_step_4_extract_enrich": "Step 4: Extract & Enrich" | kind=entity | source=.github/skills/impeccable/reference/extract.md:L36 | neighbors=[Extract Flow]
- "github_skills_impeccable_reference_extract_md_reference_extract_step_5_migrate": "Step 5: Migrate" | kind=entity | source=.github/skills/impeccable/reference/extract.md:L44 | neighbors=[Extract Flow]
- "github_skills_impeccable_reference_extract_md_reference_extract_step_6_document": "Step 6: Document" | kind=entity | source=.github/skills/impeccable/reference/extract.md:L53 | neighbors=[Extract Flow]
- "github_skills_impeccable_reference_harden_md_reference_harden_accessibility_resilience": "Accessibility Resilience" | kind=entity | source=.github/skills/impeccable/reference/harden.md:L250 | neighbors=[Hardening Dimensions]
- "github_skills_impeccable_reference_harden_md_reference_harden_assess_hardening_needs": "Assess Hardening Needs" | kind=entity | source=.github/skills/impeccable/reference/harden.md:L3 | neighbors=[harden.md]
- "github_skills_impeccable_reference_harden_md_reference_harden_edge_cases_boundary_conditions": "Edge Cases & Boundary Conditions" | kind=entity | source=.github/skills/impeccable/reference/harden.md:L180 | neighbors=[Hardening Dimensions]
- "github_skills_impeccable_reference_harden_md_reference_harden_error_handling": "Error Handling" | kind=entity | source=.github/skills/impeccable/reference/harden.md:L139 | neighbors=[Hardening Dimensions]
- "github_skills_impeccable_reference_harden_md_reference_harden_input_validation_sanitization": "Input Validation & Sanitization" | kind=entity | source=.github/skills/impeccable/reference/harden.md:L220 | neighbors=[Hardening Dimensions]
- "github_skills_impeccable_reference_harden_md_reference_harden_internationalization_i18n": "Internationalization (i18n)" | kind=entity | source=.github/skills/impeccable/reference/harden.md:L85 | neighbors=[Hardening Dimensions]
- "github_skills_impeccable_reference_harden_md_reference_harden_performance_resilience": "Performance Resilience" | kind=entity | source=.github/skills/impeccable/reference/harden.md:L280 | neighbors=[Hardening Dimensions]
- "github_skills_impeccable_reference_harden_md_reference_harden_testing_strategies": "Testing Strategies" | kind=entity | source=.github/skills/impeccable/reference/harden.md:L303 | neighbors=[harden.md]
- "github_skills_impeccable_reference_harden_md_reference_harden_text_overflow_wrapping": "Text Overflow & Wrapping" | kind=entity | source=.github/skills/impeccable/reference/harden.md:L37 | neighbors=[Hardening Dimensions]
- "github_skills_impeccable_reference_harden_md_reference_harden_verify_hardening": "Verify Hardening" | kind=entity | source=.github/skills/impeccable/reference/harden.md:L333 | neighbors=[harden.md]
- "github_skills_impeccable_reference_init_md_reference_init": "init.md" | kind=entity | source=.github/skills/impeccable/reference/init.md:L1 | neighbors=[Init Flow]
- "github_skills_impeccable_reference_init_md_reference_init_accessibility_inclusion": "Accessibility & Inclusion" | kind=entity | source=.github/skills/impeccable/reference/init.md:L85 | neighbors=[Step 3: Ask strategic questions (for PR…]
- "github_skills_impeccable_reference_init_md_reference_init_brand_personality": "Brand & Personality" | kind=entity | source=.github/skills/impeccable/reference/init.md:L79 | neighbors=[Step 3: Ask strategic questions (for PR…]
- "github_skills_impeccable_reference_init_md_reference_init_interview_mode_not_confirmation_mode": "Interview mode, not confirmation mode" | kind=entity | source=.github/skills/impeccable/reference/init.md:L50 | neighbors=[Step 3: Ask strategic questions (for PR…]
- "github_skills_impeccable_reference_init_md_reference_init_minimum_viable_interview": "Minimum viable interview" | kind=entity | source=.github/skills/impeccable/reference/init.md:L61 | neighbors=[Step 3: Ask strategic questions (for PR…]
- "github_skills_impeccable_reference_init_md_reference_init_register_ask_first_it_shapes_everything_below": "Register (ask first; it shapes everything below)" | kind=entity | source=.github/skills/impeccable/reference/init.md:L65 | neighbors=[Step 3: Ask strategic questions (for PR…]
- "github_skills_impeccable_reference_init_md_reference_init_step_1_load_current_state": "Step 1: Load current state" | kind=entity | source=.github/skills/impeccable/reference/init.md:L11 | neighbors=[Init Flow]
- "github_skills_impeccable_reference_init_md_reference_init_step_2_explore_the_codebase": "Step 2: Explore the codebase" | kind=entity | source=.github/skills/impeccable/reference/init.md:L26 | neighbors=[Init Flow]
- "github_skills_impeccable_reference_init_md_reference_init_step_4_write_product_md": "Step 4: Write PRODUCT.md" | kind=entity | source=.github/skills/impeccable/reference/init.md:L91 | neighbors=[Init Flow]
- "github_skills_impeccable_reference_init_md_reference_init_step_5_decide_on_design_md": "Step 5: Decide on DESIGN.md" | kind=entity | source=.github/skills/impeccable/reference/init.md:L127 | neighbors=[Init Flow]
- "github_skills_impeccable_reference_init_md_reference_init_step_6_configure_live_mode_when_code_exists": "Step 6: Configure live mode (when code exists)" | kind=entity | source=.github/skills/impeccable/reference/init.md:L138 | neighbors=[Init Flow]
- "github_skills_impeccable_reference_init_md_reference_init_step_7_recommend_starting_points_then_wrap_up": "Step 7: Recommend starting points, then wrap up" | kind=entity | source=.github/skills/impeccable/reference/init.md:L154 | neighbors=[Init Flow]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\PTOW\1_APT_Central_Command\.graphify\description-instructions\batch-226.json

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
