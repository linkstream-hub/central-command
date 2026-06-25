# Node Description Batch 380 of 412

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

- "strategic_compact_skill_context_optimization_tools": "Context Optimization Tools" | kind=entity | source=.github/skills/ecc/strategic-compact/SKILL.md:L127 | neighbors=[Token Optimization Patterns]
- "strategic_compact_skill_duplicate_instruction_detection": "Duplicate Instruction Detection" | kind=entity | source=.github/skills/ecc/strategic-compact/SKILL.md:L121 | neighbors=[Token Optimization Patterns]
- "strategic_compact_skill_hook_setup": "Hook Setup" | kind=entity | source=.github/skills/ecc/strategic-compact/SKILL.md:L40 | neighbors=[Strategic Compact Skill]
- "strategic_compact_skill_how_it_works": "How It Works" | kind=entity | source=.github/skills/ecc/strategic-compact/SKILL.md:L31 | neighbors=[Strategic Compact Skill]
- "strategic_compact_skill_related": "Related" | kind=entity | source=.github/skills/ecc/strategic-compact/SKILL.md:L131 | neighbors=[Strategic Compact Skill]
- "strategic_compact_skill_trigger_table_lazy_loading": "Trigger-Table Lazy Loading" | kind=entity | source=.github/skills/ecc/strategic-compact/SKILL.md:L105 | neighbors=[Token Optimization Patterns]
- "strategic_compact_skill_what_survives_compaction": "What Survives Compaction" | kind=entity | source=.github/skills/ecc/strategic-compact/SKILL.md:L82 | neighbors=[Strategic Compact Skill]
- "strategic_compact_skill_when_to_activate": "When to Activate" | kind=entity | source=.github/skills/ecc/strategic-compact/SKILL.md:L11 | neighbors=[Strategic Compact Skill]
- "strategic_compact_skill_why_strategic_compaction": "Why Strategic Compaction?" | kind=entity | source=.github/skills/ecc/strategic-compact/SKILL.md:L19 | neighbors=[Strategic Compact Skill]
- "subscribe_route_post": "POST()" | kind=code-symbol | source=tech-pwa/src/app/api/push/subscribe/route.ts:L3 | neighbors=[route.ts]
- "suggest_techs": "Suggest Techs Tool" | kind=entity | source=docs/DISPATCH_GUIDE.md | neighbors=[Robert (Dispatcher)]
- "SummaryCards": "Summary Cards" | kind=code-symbol | source=tech-pwa/src/components/dashboard/SummaryCards.tsx | neighbors=[page.tsx]
- "sync_route_post": "POST()" | kind=code-symbol | source=tech-pwa/src/app/api/time-records/sync/route.ts:L9 | neighbors=[route.ts]
- "tdd_workflow_skill": "SKILL.md" | kind=entity | source=.github/skills/ecc/tdd-workflow/SKILL.md:L1 | neighbors=[Test-Driven Development Workflow]
- "tdd_workflow_skill_1_tests_before_code": "1. Tests BEFORE Code" | kind=entity | source=.github/skills/ecc/tdd-workflow/SKILL.md:L21 | neighbors=[Core Principles]
- "tdd_workflow_skill_2_coverage_requirements": "2. Coverage Requirements" | kind=entity | source=.github/skills/ecc/tdd-workflow/SKILL.md:L24 | neighbors=[Core Principles]
- "tdd_workflow_skill_4_git_checkpoints": "4. Git Checkpoints" | kind=entity | source=.github/skills/ecc/tdd-workflow/SKILL.md:L50 | neighbors=[Core Principles]
- "tdd_workflow_skill_api_integration_test_pattern": "API Integration Test Pattern" | kind=entity | source=.github/skills/ecc/tdd-workflow/SKILL.md:L201 | neighbors=[Testing Patterns]
- "tdd_workflow_skill_best_practices": "Best Practices" | kind=entity | source=.github/skills/ecc/tdd-workflow/SKILL.md:L439 | neighbors=[Test-Driven Development Workflow]
- "tdd_workflow_skill_ci_cd_integration": "CI/CD Integration" | kind=entity | source=.github/skills/ecc/tdd-workflow/SKILL.md:L430 | neighbors=[Continuous Testing]
- "tdd_workflow_skill_coverage_thresholds": "Coverage Thresholds" | kind=entity | source=.github/skills/ecc/tdd-workflow/SKILL.md:L352 | neighbors=[Test Coverage Verification]
- "tdd_workflow_skill_e2e_test_pattern_playwright": "E2E Test Pattern (Playwright)" | kind=entity | source=.github/skills/ecc/tdd-workflow/SKILL.md:L232 | neighbors=[Testing Patterns]
- "tdd_workflow_skill_e2e_tests_playwright": "E2E Tests (Playwright)" | kind=entity | source=.github/skills/ecc/tdd-workflow/SKILL.md:L44 | neighbors=[3. Test Types]
- "tdd_workflow_skill_fail_wrong_brittle_selectors": "FAIL: WRONG: Brittle Selectors" | kind=entity | source=.github/skills/ecc/tdd-workflow/SKILL.md:L382 | neighbors=[Common Testing Mistakes to Avoid]
- "tdd_workflow_skill_fail_wrong_no_test_isolation": "FAIL: WRONG: No Test Isolation" | kind=entity | source=.github/skills/ecc/tdd-workflow/SKILL.md:L395 | neighbors=[Common Testing Mistakes to Avoid]
- "tdd_workflow_skill_fail_wrong_testing_implementation_details": "FAIL: WRONG: Testing Implementation Details" | kind=entity | source=.github/skills/ecc/tdd-workflow/SKILL.md:L370 | neighbors=[Common Testing Mistakes to Avoid]
- "tdd_workflow_skill_integration_tests": "Integration Tests" | kind=entity | source=.github/skills/ecc/tdd-workflow/SKILL.md:L38 | neighbors=[3. Test Types]
- "tdd_workflow_skill_openai_mock": "OpenAI Mock" | kind=entity | source=.github/skills/ecc/tdd-workflow/SKILL.md:L336 | neighbors=[Mocking External Services]
- "tdd_workflow_skill_pass_correct_independent_tests": "PASS: CORRECT: Independent Tests" | kind=entity | source=.github/skills/ecc/tdd-workflow/SKILL.md:L402 | neighbors=[Common Testing Mistakes to Avoid]
- "tdd_workflow_skill_pass_correct_semantic_selectors": "PASS: CORRECT: Semantic Selectors" | kind=entity | source=.github/skills/ecc/tdd-workflow/SKILL.md:L388 | neighbors=[Common Testing Mistakes to Avoid]
- "tdd_workflow_skill_pass_correct_test_user_visible_behavior": "PASS: CORRECT: Test User-Visible Behavior" | kind=entity | source=.github/skills/ecc/tdd-workflow/SKILL.md:L376 | neighbors=[Common Testing Mistakes to Avoid]
- "tdd_workflow_skill_pre_commit_hook": "Pre-Commit Hook" | kind=entity | source=.github/skills/ecc/tdd-workflow/SKILL.md:L424 | neighbors=[Continuous Testing]
- "tdd_workflow_skill_redis_mock": "Redis Mock" | kind=entity | source=.github/skills/ecc/tdd-workflow/SKILL.md:L326 | neighbors=[Mocking External Services]
- "tdd_workflow_skill_run_coverage_report": "Run Coverage Report" | kind=entity | source=.github/skills/ecc/tdd-workflow/SKILL.md:L347 | neighbors=[Test Coverage Verification]
- "tdd_workflow_skill_step_1_write_user_journeys": "Step 1: Write User Journeys" | kind=entity | source=.github/skills/ecc/tdd-workflow/SKILL.md:L65 | neighbors=[TDD Workflow Steps]
- "tdd_workflow_skill_step_2_generate_test_cases": "Step 2: Generate Test Cases" | kind=entity | source=.github/skills/ecc/tdd-workflow/SKILL.md:L74 | neighbors=[TDD Workflow Steps]
- "tdd_workflow_skill_step_3_run_tests_they_should_fail": "Step 3: Run Tests (They Should Fail)" | kind=entity | source=.github/skills/ecc/tdd-workflow/SKILL.md:L97 | neighbors=[TDD Workflow Steps]
- "tdd_workflow_skill_step_4_implement_code": "Step 4: Implement Code" | kind=entity | source=.github/skills/ecc/tdd-workflow/SKILL.md:L126 | neighbors=[TDD Workflow Steps]
- "tdd_workflow_skill_step_5_run_tests_again": "Step 5: Run Tests Again" | kind=entity | source=.github/skills/ecc/tdd-workflow/SKILL.md:L138 | neighbors=[TDD Workflow Steps]
- "tdd_workflow_skill_step_6_refactor": "Step 6: Refactor" | kind=entity | source=.github/skills/ecc/tdd-workflow/SKILL.md:L154 | neighbors=[TDD Workflow Steps]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\PTOW\1_APT_Central_Command\.graphify\description-instructions\batch-379.json

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
