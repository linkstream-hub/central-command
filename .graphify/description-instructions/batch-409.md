# Node Description Batch 410 of 412

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
Write every description in English (en). Do not switch languages.
No marketing language.
Respond ONLY with a JSON object mapping each node id (as a string) to its
one-sentence description — no prose, no markdown fences.

- "scripts_test_parse_instinct_rationale_551": "When project and global have same ID, project wins." | kind=entity | source=.github/skills/ecc/continuous-learning-v2/scripts/test_parse_instinct.py:L551
- "scripts_test_parse_instinct_rationale_572": "Global project should only load global instincts." | kind=entity | source=.github/skills/ecc/continuous-learning-v2/scripts/test_parse_instinct.py:L572
- "scripts_test_parse_instinct_rationale_593": "load_project_only_instincts should NOT include global instincts." | kind=entity | source=.github/skills/ecc/continuous-learning-v2/scripts/test_parse_instinct.py:L593
- "scripts_test_parse_instinct_rationale_607": "Global fallback should return global instincts for project-only queries." | kind=entity | source=.github/skills/ecc/continuous-learning-v2/scripts/test_parse_instinct.py:L607
- "scripts_test_parse_instinct_rationale_628": "No instincts at all should return empty list." | kind=entity | source=.github/skills/ecc/continuous-learning-v2/scripts/test_parse_instinct.py:L628
- "scripts_test_parse_instinct_rationale_641": "Status with no instincts should print fallback message." | kind=entity | source=.github/skills/ecc/continuous-learning-v2/scripts/test_parse_instinct.py:L641
- "scripts_test_parse_instinct_rationale_654": "Status should show project and global instinct counts." | kind=entity | source=.github/skills/ecc/continuous-learning-v2/scripts/test_parse_instinct.py:L654
- "scripts_test_parse_instinct_rationale_674": "Confidence bars should retain block glyphs on UTF-8 streams." | kind=entity | source=.github/skills/ecc/continuous-learning-v2/scripts/test_parse_instinct.py:L674
- "scripts_test_parse_instinct_rationale_680": "Windows cp1252 streams cannot encode block glyphs." | kind=entity | source=.github/skills/ecc/continuous-learning-v2/scripts/test_parse_instinct.py:L680
- "scripts_test_parse_instinct_rationale_686": "Status rendering should not crash on Windows cp1252 stdout." | kind=entity | source=.github/skills/ecc/continuous-learning-v2/scripts/test_parse_instinct.py:L686
- "scripts_test_parse_instinct_rationale_707": "cmd_status should always return an int." | kind=entity | source=.github/skills/ecc/continuous-learning-v2/scripts/test_parse_instinct.py:L707
- "scripts_test_parse_instinct_rationale_722": "No projects should print helpful message." | kind=entity | source=.github/skills/ecc/continuous-learning-v2/scripts/test_parse_instinct.py:L722
- "scripts_test_parse_instinct_rationale_731": "Should list projects from registry." | kind=entity | source=.github/skills/ecc/continuous-learning-v2/scripts/test_parse_instinct.py:L731
- "scripts_test_parse_instinct_rationale_764": "Promoting nonexistent instinct should fail." | kind=entity | source=.github/skills/ecc/continuous-learning-v2/scripts/test_parse_instinct.py:L764
- "scripts_test_parse_instinct_rationale_775": "Path-like instinct IDs should be rejected before file writes." | kind=entity | source=.github/skills/ecc/continuous-learning-v2/scripts/test_parse_instinct.py:L775
- "scripts_test_parse_instinct_rationale_786": "Promoting an instinct that already exists globally should fail." | kind=entity | source=.github/skills/ecc/continuous-learning-v2/scripts/test_parse_instinct.py:L786
- "scripts_test_parse_instinct_rationale_802": "Promote a project instinct to global with --force." | kind=entity | source=.github/skills/ecc/continuous-learning-v2/scripts/test_parse_instinct.py:L802
- "scripts_test_parse_instinct_rationale_826": "Auto-promote with no cross-project instincts should say so." | kind=entity | source=.github/skills/ecc/continuous-learning-v2/scripts/test_parse_instinct.py:L826
- "scripts_test_parse_instinct_rationale_840": "Dry run should list candidates but not write files." | kind=entity | source=.github/skills/ecc/continuous-learning-v2/scripts/test_parse_instinct.py:L840
- "scripts_test_parse_instinct_rationale_88": "Create a realistic project directory tree for testing." | kind=entity | source=.github/skills/ecc/continuous-learning-v2/scripts/test_parse_instinct.py:L88
- "scripts_test_parse_instinct_rationale_881": "Auto-promote with force should write global instinct file." | kind=entity | source=.github/skills/ecc/continuous-learning-v2/scripts/test_parse_instinct.py:L881
- "scripts_test_parse_instinct_rationale_964": "Single project should return nothing (need 2+)." | kind=entity | source=.github/skills/ecc/continuous-learning-v2/scripts/test_parse_instinct.py:L964
- "scripts_test_parse_instinct_rationale_977": "Same instinct ID in 2 projects should be found." | kind=entity | source=.github/skills/ecc/continuous-learning-v2/scripts/test_parse_instinct.py:L977
- "scripts_validate_rationale_42": "Line-based fenced code block extractor.      Handles ``` and ~~~ fences with var" | kind=entity | source=.github/skills/caveman-compress/scripts/validate.py:L42
- "sentinel_spec_architect": "Sentinel Spec Architect" | kind=code-symbol | source=railway/sentinel-spec-architect/index.js
- "sentry_error_tracking": "Sentry Error Tracking" | kind=entity | source=tech-pwa/sentry.client.config.ts
- "sprint_tier_2_5_security_md": "SPRINT TIER 2.5 Security" | kind=entity | source=specs/SPRINT_TIER_2_5_SECURITY.md
- "tax_search_engine": "Tax Search Engine" | kind=entity | source=docs/CENTRAL_COMMAND_EXPANSION_ROADMAP.md
- "tech_pwa_api_spec_md": "TECH PWA API Spec" | kind=entity | source=specs/TECH_PWA_API_SPEC.md
- "tech_pwa_scripts_seed_test_data_mjs_scripts_seed_test_data": "seed-test-data.mjs" | kind=code-symbol | source=tech-pwa/scripts/seed-test-data.mjs:L1
- "vercel_svg_vercel_logo": "Vercel Logo" | kind=entity | source=tech-pwa/public/vercel.svg
- "vitest_unit_tests": "Vitest Unit Testing" | kind=entity | source=docs/guides/testing.md
- "wc_code_fix": "WC Code Auto-resolve at Assignment" | kind=entity | source=docs/adr/ADR-009-wc-code-fix-at-source-not-sentinel.md
- "window_svg": "Window Icon" | kind=entity | source=public/window.svg
- "wo_type_field": "woType Field" | kind=entity | source=docs/adr/ADR-004-work-order-status-lifecycle.md
- "work_order_status_awaiting_tenant": "Status: Awaiting Tenant" | kind=entity | source=docs/adr/ADR-004-work-order-status-lifecycle.md
- "work_order_status_complete": "Status: Complete" | kind=entity | source=docs/adr/ADR-004-work-order-status-lifecycle.md
- "work_order_status_in_progress": "Status: In Progress" | kind=entity | source=docs/adr/ADR-004-work-order-status-lifecycle.md
- "work_order_status_needs_info": "Status: Needs Info" | kind=entity | source=docs/adr/ADR-004-work-order-status-lifecycle.md
- "work_order_status_ready_to_schedule": "Status: Ready to Schedule" | kind=entity | source=docs/adr/ADR-004-work-order-status-lifecycle.md

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\PTOW\1_APT_Central_Command\.graphify\description-instructions\batch-409.json

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
