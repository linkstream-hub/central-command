# Node Description Batch 139 of 412

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

- "agents_skills_archive_impeccable_skill_md_impeccable_skill_interaction": "Interaction" | kind=entity | source=.agents/skills_archive/impeccable/SKILL.md:L58 | neighbors=[General rules] | lang=en
- "agents_skills_archive_impeccable_skill_md_impeccable_skill_layout": "Layout" | kind=entity | source=.agents/skills_archive/impeccable/SKILL.md:L40 | neighbors=[General rules] | lang=en
- "agents_skills_archive_impeccable_skill_md_impeccable_skill_motion": "Motion" | kind=entity | source=.agents/skills_archive/impeccable/SKILL.md:L48 | neighbors=[General rules] | lang=en
- "agents_skills_archive_impeccable_skill_md_impeccable_skill_pin_unpin": "Pin / Unpin" | kind=entity | source=.agents/skills_archive/impeccable/SKILL.md:L161 | neighbors=[SKILL.md] | lang=en
- "agents_skills_archive_impeccable_skill_md_impeccable_skill_routing_rules": "Routing rules" | kind=entity | source=.agents/skills_archive/impeccable/SKILL.md:L136 | neighbors=[Commands] | lang=en
- "agents_skills_archive_impeccable_skill_md_impeccable_skill_setup": "Setup" | kind=entity | source=.agents/skills_archive/impeccable/SKILL.md:L8 | neighbors=[SKILL.md] | lang=en
- "agents_skills_archive_impeccable_skill_md_impeccable_skill_the_ai_slop_test": "The AI slop test" | kind=entity | source=.agents/skills_archive/impeccable/SKILL.md:L97 | neighbors=[Design guidance] | lang=en
- "agents_skills_archive_impeccable_skill_md_impeccable_skill_typography": "Typography" | kind=entity | source=.agents/skills_archive/impeccable/SKILL.md:L29 | neighbors=[General rules] | lang=en
- "agents_triage_labels": "triage-labels.md" | kind=entity | source=docs/agents/triage-labels.md:L1 | neighbors=[Triage Labels] | lang=en
- "agents_triage_labels_triage_labels": "Triage Labels" | kind=entity | source=docs/agents/triage-labels.md:L1 | neighbors=[triage-labels.md] | lang=en
- "ai_native_fsm": "AI-native FSM" | kind=entity | source=docs/PRODUCT_VISION.md | neighbors=[ServiceTitan] | lang=en
- "ai_regression_testing_skill": "SKILL.md" | kind=entity | source=.github/skills/ecc/ai-regression-testing/SKILL.md:L1 | neighbors=[AI Regression Testing] | lang=en
- "ai_regression_testing_skill_custom_command_definition": "Custom Command Definition" | kind=entity | source=.github/skills/ecc/ai-regression-testing/SKILL.md:L197 | neighbors=[Integrating Tests into Bug-Check Workfl…] | lang=en
- "ai_regression_testing_skill_do_don_t": "DO / DON'T" | kind=entity | source=.github/skills/ecc/ai-regression-testing/SKILL.md:L371 | neighbors=[AI Regression Testing] | lang=pt
- "ai_regression_testing_skill_pattern_1_sandbox_production_path_mismatch": "Pattern 1: Sandbox/Production Path Mismatch" | kind=entity | source=.github/skills/ecc/ai-regression-testing/SKILL.md:L247 | neighbors=[Common AI Regression Patterns] | lang=en
- "ai_regression_testing_skill_pattern_2_select_clause_omission": "Pattern 2: SELECT Clause Omission" | kind=entity | source=.github/skills/ecc/ai-regression-testing/SKILL.md:L280 | neighbors=[Common AI Regression Patterns] | lang=en
- "ai_regression_testing_skill_pattern_3_error_state_leakage": "Pattern 3: Error State Leakage" | kind=entity | source=.github/skills/ecc/ai-regression-testing/SKILL.md:L301 | neighbors=[Common AI Regression Patterns] | lang=en
- "ai_regression_testing_skill_pattern_4_optimistic_update_without_proper_rollback": "Pattern 4: Optimistic Update Without Proper Rollback" | kind=entity | source=.github/skills/ecc/ai-regression-testing/SKILL.md:L319 | neighbors=[Common AI Regression Patterns] | lang=en
- "ai_regression_testing_skill_quick_reference": "Quick Reference" | kind=entity | source=.github/skills/ecc/ai-regression-testing/SKILL.md:L361 | neighbors=[AI Regression Testing] | lang=en
- "ai_regression_testing_skill_setup_vitest_next_js_app_router": "Setup (Vitest + Next.js App Router)" | kind=entity | source=.github/skills/ecc/ai-regression-testing/SKILL.md:L51 | neighbors=[Sandbox-Mode API Testing] | lang=en
- "ai_regression_testing_skill_strategy_test_where_bugs_were_found": "Strategy: Test Where Bugs Were Found" | kind=entity | source=.github/skills/ecc/ai-regression-testing/SKILL.md:L343 | neighbors=[AI Regression Testing] | lang=en
- "ai_regression_testing_skill_test_helper_for_next_js_api_routes": "Test Helper for Next.js API Routes" | kind=entity | source=.github/skills/ecc/ai-regression-testing/SKILL.md:L81 | neighbors=[Sandbox-Mode API Testing] | lang=en
- "ai_regression_testing_skill_testing_sandbox_production_parity": "Testing Sandbox/Production Parity" | kind=entity | source=.github/skills/ecc/ai-regression-testing/SKILL.md:L170 | neighbors=[Sandbox-Mode API Testing] | lang=en
- "ai_regression_testing_skill_the_core_problem": "The Core Problem" | kind=entity | source=.github/skills/ecc/ai-regression-testing/SKILL.md:L19 | neighbors=[AI Regression Testing] | lang=en
- "ai_regression_testing_skill_the_workflow": "The Workflow" | kind=entity | source=.github/skills/ecc/ai-regression-testing/SKILL.md:L225 | neighbors=[Integrating Tests into Bug-Check Workfl…] | lang=en
- "ai_regression_testing_skill_when_to_activate": "When to Activate" | kind=entity | source=.github/skills/ecc/ai-regression-testing/SKILL.md:L11 | neighbors=[AI Regression Testing] | lang=en
- "ai_regression_testing_skill_writing_regression_tests": "Writing Regression Tests" | kind=entity | source=.github/skills/ecc/ai-regression-testing/SKILL.md:L123 | neighbors=[Sandbox-Mode API Testing] | lang=en
- "antigravity_dispatch_excellence_spec_md": "Dispatch Excellence Spec" | kind=entity | source=specs/archive/ANTIGRAVITY_DISPATCH_EXCELLENCE_SPEC.md | neighbors=[Kanban View] | lang=en
- "antigravity_google_auth_spec_md": "Google Auth Spec" | kind=entity | source=specs/archive/ANTIGRAVITY_GOOGLE_AUTH_SPEC.md | neighbors=[Staff Roster Tab] | lang=en
- "api_claude": "CLAUDE.md" | kind=entity | source=tech-pwa/src/app/api/CLAUDE.md:L1 | neighbors=[Gate: API Routes] | lang=en
- "api_claude_gate_api_routes": "Gate: API Routes" | kind=entity | source=tech-pwa/src/app/api/CLAUDE.md:L1 | neighbors=[CLAUDE.md] | lang=en
- "api_reference": "reference.md" | kind=entity | source=docs/api/reference.md:L1 | neighbors=[APT Central Command — API Reference] | lang=en
- "api_reference_cron_secret": "Cron Secret" | kind=entity | source=docs/api/reference.md:L58 | neighbors=[Authentication] | lang=en
- "api_reference_endpoints_overview": "Endpoints Overview" | kind=entity | source=docs/api/reference.md:L85 | neighbors=[APT Central Command — API Reference] | lang=en
- "api_reference_environment_variables_api_relevant": "Environment Variables (API-relevant)" | kind=entity | source=docs/api/reference.md:L1061 | neighbors=[APT Central Command — API Reference] | lang=en
- "api_reference_error_codes": "Error Codes" | kind=entity | source=docs/api/reference.md:L1046 | neighbors=[APT Central Command — API Reference] | lang=en
- "api_reference_gas_internal_secret": "GAS Internal Secret" | kind=entity | source=docs/api/reference.md:L50 | neighbors=[Authentication] | lang=en
- "api_reference_get_api_comms_jobid": "GET `/api/comms/[jobId]`" | kind=entity | source=docs/api/reference.md:L673 | neighbors=[Comms] | lang=en
- "api_reference_get_api_comms_unread": "GET `/api/comms/unread`" | kind=entity | source=docs/api/reference.md:L732 | neighbors=[Comms] | lang=en
- "api_reference_get_api_cron_sync_gmail_history": "GET `/api/cron/sync-gmail-history`" | kind=entity | source=docs/api/reference.md:L885 | neighbors=[Cron] | lang=en

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\PTOW\1_APT_Central_Command\.graphify\description-instructions\batch-138.json

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
