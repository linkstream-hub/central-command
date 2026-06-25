# Node Description Batch 332 of 412

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

- "guides_development_build_commands": "Build Commands" | kind=entity | source=docs/guides/development.md:L34 | neighbors=[Development Guide]
- "guides_development_code_style": "Code Style" | kind=entity | source=docs/guides/development.md:L216 | neighbors=[Development Guide]
- "guides_development_dal_pattern": "DAL Pattern" | kind=entity | source=docs/guides/development.md:L155 | neighbors=[Development Guide]
- "guides_development_local_setup": "Local Setup" | kind=entity | source=docs/guides/development.md:L8 | neighbors=[Development Guide]
- "guides_development_pr_process": "PR Process" | kind=entity | source=docs/guides/development.md:L309 | neighbors=[Development Guide]
- "guides_development_project_structure": "Project Structure" | kind=entity | source=docs/guides/development.md:L54 | neighbors=[Development Guide]
- "guides_development_schema_migrations": "Schema Migrations" | kind=entity | source=docs/guides/development.md:L191 | neighbors=[Development Guide]
- "guides_development_sprint_protocol": "Sprint Protocol" | kind=entity | source=docs/guides/development.md:L252 | neighbors=[Development Guide]
- "guides_development_typescript_and_lint_workflow": "TypeScript and Lint Workflow" | kind=entity | source=docs/guides/development.md:L236 | neighbors=[Development Guide]
- "guides_getting_started": "getting-started.md" | kind=entity | source=docs/guides/getting-started.md:L1 | neighbors=[Getting Started]
- "guides_getting_started_available_scripts": "Available Scripts" | kind=entity | source=docs/guides/getting-started.md:L166 | neighbors=[Getting Started]
- "guides_getting_started_common_setup_issues": "Common Setup Issues" | kind=entity | source=docs/guides/getting-started.md:L135 | neighbors=[Getting Started]
- "guides_getting_started_environment_setup": "Environment Setup" | kind=entity | source=docs/guides/getting-started.md:L38 | neighbors=[Getting Started]
- "guides_getting_started_field_tech_portal": "Field Tech Portal" | kind=entity | source=docs/guides/getting-started.md:L119 | neighbors=[Accessing the Two Portals]
- "guides_getting_started_first_run": "First Run" | kind=entity | source=docs/guides/getting-started.md:L89 | neighbors=[Getting Started]
- "guides_getting_started_installation_steps": "Installation Steps" | kind=entity | source=docs/guides/getting-started.md:L22 | neighbors=[Getting Started]
- "guides_getting_started_next_steps": "Next Steps" | kind=entity | source=docs/guides/getting-started.md:L186 | neighbors=[Getting Started]
- "guides_getting_started_office_staff_portal": "Office Staff Portal" | kind=entity | source=docs/guides/getting-started.md:L109 | neighbors=[Accessing the Two Portals]
- "guides_getting_started_prerequisites": "Prerequisites" | kind=entity | source=docs/guides/getting-started.md:L8 | neighbors=[Getting Started]
- "guides_testing": "testing.md" | kind=entity | source=docs/guides/testing.md:L1 | neighbors=[Testing Guide]
- "guides_testing_ci_yml_typescript_lint_build": "`ci.yml` — TypeScript + Lint + Build" | kind=entity | source=docs/guides/testing.md:L178 | neighbors=[CI Integration]
- "guides_testing_coverage_requirements": "Coverage Requirements" | kind=entity | source=docs/guides/testing.md:L160 | neighbors=[Testing Guide]
- "guides_testing_e2e_nightly_yml_weekly_regression": "`e2e-nightly.yml` — Weekly Regression" | kind=entity | source=docs/guides/testing.md:L195 | neighbors=[CI Integration]
- "guides_testing_e2e_test_naming_and_location": "E2E test naming and location" | kind=entity | source=docs/guides/testing.md:L135 | neighbors=[Writing New Tests]
- "guides_testing_e2e_tests": "E2E tests" | kind=entity | source=docs/guides/testing.md:L52 | neighbors=[Running Tests]
- "guides_testing_e2e_yml_playwright_e2e": "`e2e.yml` — Playwright E2E" | kind=entity | source=docs/guides/testing.md:L187 | neighbors=[CI Integration]
- "guides_testing_sprint_test_protocol": "Sprint Test Protocol" | kind=entity | source=docs/guides/testing.md:L202 | neighbors=[Testing Guide]
- "guides_testing_staff_portal_office_admin_login": "Staff portal (office admin login)" | kind=entity | source=docs/guides/testing.md:L94 | neighbors=[Test Credentials]
- "guides_testing_tech_portal_badge_pin_login": "Tech portal (badge + PIN login)" | kind=entity | source=docs/guides/testing.md:L85 | neighbors=[Test Credentials]
- "guides_testing_test_framework_and_setup": "Test Framework and Setup" | kind=entity | source=docs/guides/testing.md:L8 | neighbors=[Testing Guide]
- "guides_testing_test_reports": "Test Reports" | kind=entity | source=docs/guides/testing.md:L217 | neighbors=[Testing Guide]
- "guides_testing_type_checking": "Type checking" | kind=entity | source=docs/guides/testing.md:L72 | neighbors=[Running Tests]
- "guides_testing_unit_test_naming_and_location": "Unit test naming and location" | kind=entity | source=docs/guides/testing.md:L117 | neighbors=[Writing New Tests]
- "guides_testing_unit_tests": "Unit tests" | kind=entity | source=docs/guides/testing.md:L37 | neighbors=[Running Tests]
- "history_route_get": "GET()" | kind=code-symbol | source=tech-pwa/src/app/api/jobs/history/route.ts:L8 | neighbors=[route.ts]
- "hook_dangerous_command_blocker": "Dangerous Command Blocker" | kind=entity | neighbors=[SPRINT_ADW_FLAG_GATE_AND_HOOKS.md]
- "hook_pre_compact": "Pre-Compact Hook" | kind=entity | neighbors=[SPRINT_ADW_FLAG_GATE_AND_HOOKS.md]
- "hook_subagent_stop": "Subagent Stop Hook" | kind=entity | neighbors=[SPRINT_ADW_FLAG_GATE_AND_HOOKS.md]
- "hook_universal_logger": "Universal Hook Logger" | kind=entity | neighbors=[SPRINT_ADW_FLAG_GATE_AND_HOOKS.md]
- "hookify_rules_skill": "SKILL.md" | kind=entity | source=.github/skills/ecc/hookify-rules/SKILL.md:L1 | neighbors=[Writing Hookify Rules]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\PTOW\1_APT_Central_Command\.graphify\description-instructions\batch-331.json

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
