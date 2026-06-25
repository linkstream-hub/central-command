# Node Description Batch 53 of 412

Graphify is running in assistant/skill mode (no API key). You are the host
assistant (Claude Code / Codex / Gemini CLI). Read the prompt below and write
your JSON answer to the answer file.

## Prompt

You are documenting nodes in a knowledge graph.
For each entry below, write ONE concise factual plain-language sentence
describing what it is or does. Use only the provided context.
For a code symbol (kind=code-symbol — a function, class, or constant),
describe what the function/symbol does based on its name, source location
and neighbors — e.g. "Resolves the configured ontology profile from graphify.yaml.".
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

- "docs_roadmap_phase_1_operational_loop": "PHASE 1 — OPERATIONAL LOOP" | kind=entity | source=docs/ROADMAP.md:L23 | neighbors=[Last Updated: S137 (2026-06-04), Definition of Done, Risk, Tasks] | lang=en
- "docs_runbook_scenario_3_neon_database_unreachable": "SCENARIO 3 — Neon database unreachable" | kind=entity | source=docs/RUNBOOK.md:L110 | neighbors=[Last updated: 2026-05-19, Step 1 — Check Neon status, Step 2 — Verify DATABASE_URL is correct, Step 3 — Wait] | lang=en
- "docs_runbook_scenario_4_vercel_deploy_fails_after_a_push_to_main": "SCENARIO 4 — Vercel deploy fails after a push to main" | kind=entity | source=docs/RUNBOOK.md:L130 | neighbors=[Last updated: 2026-05-19, Step 1 — Read the Vercel build log, Step 2 — Retrigger, Step 3 — If urgent and unfixable] | lang=en
- "docs_session_guide_during_a_session": "DURING A SESSION" | kind=entity | source=docs/SESSION_GUIDE.md:L35 | neighbors=[Before any clasp push, Critical functions — never run without …, Keep Claude on track, How to start and end every Claude Code …] | lang=pt
- "docs_session_guide_key_commands_reference": "KEY COMMANDS REFERENCE" | kind=entity | source=docs/SESSION_GUIDE.md:L96 | neighbors=[How to start and end every Claude Code …, Check live version, Deploy, Git] | lang=en
- "docs_session_guide_starting_a_session": "STARTING A SESSION" | kind=entity | source=docs/SESSION_GUIDE.md:L6 | neighbors=[How to start and end every Claude Code …, 1. Open Claude Code from the right dire…, 2. Orient Claude immediately, 3. Confirm Claude is oriented] | lang=pt
- "docs_sheets_schema_spreadsheet_inventory_staff_created_not_yet_integrated": "Spreadsheet: Inventory (Staff-created — not yet integrated)" | kind=entity | source=docs/SHEETS_SCHEMA.md:L250 | neighbors=[Role-based terminology used throughout …, Tab: `Employee List`, Tab: `Inventory Master`, Tab: `Transaction Logs`] | lang=en
- "docs_sprint_standards_design_and_quality_gates_for_all_ag_claude_code_sprints": "Design and quality gates for all AG + Claude Code sprints." | kind=entity | source=docs/SPRINT_STANDARDS.md:L2 | neighbors=[SPRINT_STANDARDS.md, BACKEND SECURITY STANDARDS, DEFINITION OF DONE — ALL SPRINTS (hard …, VISUAL DESIGN STANDARDS] | lang=en
- "drizzle_0005_cloudy_nitro": "0005_cloudy_nitro.sql" | kind=code-symbol | source=tech-pwa/drizzle/0005_cloudy_nitro.sql:L1 | neighbors=[01bf641 Initial commit — clean history, 1a2c4c7 Merge branch 'main' of https://…, 989514d fix(job-comments): add sheetsId…, dc75827 feat(foundation): phases 9-11 —…] | lang=en
- "e2e_fsm_constraints_spec": "fsm-constraints.spec.ts" | kind=code-symbol | source=tech-pwa/tests/e2e/fsm-constraints.spec.ts:L1 | neighbors=[01bf641 Initial commit — clean history, 57acd08 Merge pull request #2402 from B…, a84fa3d fix(pipeline): un-archive June …, b135e46 fix(pipeline): un-archive June …] | lang=en
- "e2e_parser_spec": "parser.spec.ts" | kind=code-symbol | source=tech-pwa/tests/e2e/parser.spec.ts:L1 | neighbors=[01bf641 Initial commit — clean history, 57acd08 Merge pull request #2402 from B…, a84fa3d fix(pipeline): un-archive June …, b135e46 fix(pipeline): un-archive June …] | lang=en
- "e2e_testing_skill_artifact_management": "Artifact Management" | kind=entity | source=.github/skills/ecc/e2e-testing/SKILL.md:L193 | neighbors=[Screenshots, Traces, Video, E2E Testing Patterns] | lang=en
- "e2e_testing_skill_flaky_test_patterns": "Flaky Test Patterns" | kind=entity | source=.github/skills/ecc/e2e-testing/SKILL.md:L139 | neighbors=[E2E Testing Patterns, Common Causes & Fixes, Identify Flakiness, Quarantine] | lang=en
- "eval_harness_skill_integration_patterns": "Integration Patterns" | kind=entity | source=.github/skills/ecc/eval-harness/SKILL.md:L165 | neighbors=[Eval Harness Skill, During Implementation, Post-Implementation, Pre-Implementation] | lang=en
- "few_shot_examples_verifier_verifier_few_shot_examples": "Verifier Few-Shot Examples" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/few-shot-examples/verifier.md:L8 | neighbors=[verifier.md, Calibration-Derived Gap Patterns, Negative Examples, Positive Examples] | lang=en
- "file_spec_p2_2": "SPEC_P2_2_COMPLIANCE_ACTIVATION.md" | kind=entity | source=specs/SPEC_P2_2_COMPLIANCE_ACTIVATION.md | neighbors=[CA Break Compliance Monitor, Branch: feat/p2-2-compliance-activation, Priority: CRITICAL — PAGA exposure accu…, SPEC P2-2 — Compliance Activation + Inf…] | lang=en
- "fixtures_auth_loginastech": "loginAsTech()" | kind=code-symbol | source=tech-pwa/tests/fixtures/auth.ts:L11 | neighbors=[accessibility.spec.ts, auth.spec.ts, tech-pwa.spec.ts, auth.ts] | lang=en
- "fixtures_seed_seedfixtures": "seedFixtures()" | kind=code-symbol | source=tech-pwa/tests/fixtures/seed.ts:L107 | neighbors=[dispatch.spec.ts, seed.ts, globalSetup.ts, globalSetup()] | lang=en
- "gates": "GATES.md" | kind=entity | source=GATES.md:L1 | neighbors=[AG: load before implement sprint and be…, GATES.md — APT Central Command, Load this when: doing a diff review, re…, Not part of base session load — fetch o…] | lang=en
- "github_skills_archive_impeccable_reference_colorize_md_reference_colorize_balance_refinement": "Balance & Refinement" | kind=entity | source=.github/skills_archive/impeccable/reference/colorize.md:L103 | neighbors=[colorize.md, Accessibility, Cohesion, Maintain Hierarchy] | lang=en
- "github_skills_archive_impeccable_reference_colorize_md_reference_colorize_building_functional_palettes": "Building Functional Palettes" | kind=entity | source=.github/skills_archive/impeccable/reference/colorize.md:L170 | neighbors=[Palette Structure, The 60-30-10 Rule (Applied Correctly), Tinted Neutrals, Color & Contrast] | lang=en
- "github_skills_archive_impeccable_reference_colorize_md_reference_colorize_contrast_accessibility": "Contrast & Accessibility" | kind=entity | source=.github/skills_archive/impeccable/reference/colorize.md:L203 | neighbors=[Color & Contrast, Dangerous Color Combinations, Testing, WCAG Requirements] | lang=en
- "github_skills_archive_impeccable_reference_critique_md_reference_critique_heuristics_scoring_guide": "Heuristics Scoring Guide" | kind=entity | source=.github/skills_archive/impeccable/reference/critique.md:L353 | neighbors=[Issue Severity (P0–P3), Nielsen's 10 Heuristics, Score Summary, Reference Material] | lang=en
- "github_skills_archive_impeccable_reference_critique_md_reference_critique_reference_material": "Reference Material" | kind=entity | source=.github/skills_archive/impeccable/reference/critique.md:L240 | neighbors=[critique.md, Cognitive Load Assessment, Heuristics Scoring Guide, Persona-Based Design Testing] | lang=en
- "github_skills_archive_impeccable_reference_critique_md_reference_critique_three_types_of_cognitive_load": "Three Types of Cognitive Load" | kind=entity | source=.github/skills_archive/impeccable/reference/critique.md:L250 | neighbors=[Cognitive Load Assessment, Extraneous Load: Bad Design, Germane Load: Learning Effort, Intrinsic Load: The Task Itself] | lang=en
- "github_skills_archive_impeccable_reference_harden_md_reference_harden": "harden.md" | kind=entity | source=.github/skills_archive/impeccable/reference/harden.md:L1 | neighbors=[Assess Hardening Needs, Hardening Dimensions, Testing Strategies, Verify Hardening] | lang=en
- "github_skills_archive_impeccable_reference_live_md_reference_live_csp_detection_first_time_only": "CSP detection (first-time only)" | kind=entity | source=.github/skills_archive/impeccable/reference/live.md:L627 | neighbors=[append-arrays, append-string, Consent prompt template, First-time setup (config missing or inv…] | lang=en
- "github_skills_archive_impeccable_reference_live_md_reference_live_first_time_setup_config_missing_or_invalid": "First-time setup (config missing or invalid)" | kind=entity | source=.github/skills_archive/impeccable/reference/live.md:L557 | neighbors=[live.md, CSP detection (first-time only), Drift-heal warning, Troubleshooting] | lang=en
- "github_skills_archive_impeccable_reference_optimize_md_reference_optimize_core_web_vitals_optimization": "Core Web Vitals Optimization" | kind=entity | source=.github/skills_archive/impeccable/reference/optimize.md:L190 | neighbors=[optimize.md, Cumulative Layout Shift (CLS < 0.1), First Input Delay (FID < 100ms) / INP (…, Largest Contentful Paint (LCP < 2.5s)] | lang=en
- "github_skills_archive_impeccable_reference_overdrive_md_reference_overdrive_implement_with_discipline": "Implement with Discipline" | kind=entity | source=.github/skills_archive/impeccable/reference/overdrive.md:L84 | neighbors=[overdrive.md, Performance rules, Polish is the difference, Progressive enhancement is non-negotiab…] | lang=en
- "github_skills_archive_impeccable_reference_shape_md_reference_shape": "shape.md" | kind=entity | source=.github/skills_archive/impeccable/reference/shape.md:L1 | neighbors=[Phase 1.5: Visual Direction Probe (Capa…, Phase 1: Discovery Interview, Phase 2: Design Brief, Philosophy] | lang=en
- "github_skills_archive_impeccable_reference_shape_md_reference_shape_phase_1_5_visual_direction_probe_capability_gated": "Phase 1.5: Visual Direction Probe (Capability-Gated)" | kind=entity | source=.github/skills_archive/impeccable/reference/shape.md:L72 | neighbors=[shape.md, How to use the probes, Important limits, What to generate] | lang=en
- "github_skills_archive_impeccable_reference_typeset_md_reference_typeset_classic_typography_principles": "Classic Typography Principles" | kind=entity | source=.github/skills_archive/impeccable/reference/typeset.md:L134 | neighbors=[Modular Scale & Hierarchy, Readability & Measure, Vertical Rhythm, Typography] | lang=en
- "github_skills_archive_impeccable_reference_typeset_md_reference_typeset_font_selection_pairing": "Font Selection & Pairing" | kind=entity | source=.github/skills_archive/impeccable/reference/typeset.md:L164 | neighbors=[Anti-reflexes worth defending against, Pairing Principles, Web Font Loading, Typography] | lang=en
- "github_skills_archive_impeccable_reference_typeset_md_reference_typeset_modern_web_typography": "Modern Web Typography" | kind=entity | source=.github/skills_archive/impeccable/reference/typeset.md:L221 | neighbors=[Fluid Type, OpenType Features, Rendering polish, Typography] | lang=en
- "github_skills_archive_impeccable_skill_md_impeccable_skill": "SKILL.md" | kind=entity | source=.github/skills_archive/impeccable/SKILL.md:L1 | neighbors=[Commands, Design guidance, Pin / Unpin, Setup] | lang=en
- "github_skills_impeccable_reference_colorize_md_reference_colorize_balance_refinement": "Balance & Refinement" | kind=entity | source=.github/skills/impeccable/reference/colorize.md:L103 | neighbors=[colorize.md, Accessibility, Cohesion, Maintain Hierarchy] | lang=en
- "github_skills_impeccable_reference_colorize_md_reference_colorize_building_functional_palettes": "Building Functional Palettes" | kind=entity | source=.github/skills/impeccable/reference/colorize.md:L170 | neighbors=[Palette Structure, The 60-30-10 Rule (Applied Correctly), Tinted Neutrals, Color & Contrast] | lang=en
- "github_skills_impeccable_reference_colorize_md_reference_colorize_contrast_accessibility": "Contrast & Accessibility" | kind=entity | source=.github/skills/impeccable/reference/colorize.md:L203 | neighbors=[Color & Contrast, Dangerous Color Combinations, Testing, WCAG Requirements] | lang=en
- "github_skills_impeccable_reference_critique_md_reference_critique_heuristics_scoring_guide": "Heuristics Scoring Guide" | kind=entity | source=.github/skills/impeccable/reference/critique.md:L353 | neighbors=[Issue Severity (P0–P3), Nielsen's 10 Heuristics, Score Summary, Reference Material] | lang=en

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\PTOW\1_APT_Central_Command\.graphify\description-instructions\batch-052.json

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
