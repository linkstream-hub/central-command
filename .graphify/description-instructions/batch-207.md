# Node Description Batch 208 of 412

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

- "e2e_testing_skill_quarantine": "Quarantine" | kind=entity | source=.github/skills/ecc/e2e-testing/SKILL.md:L141 | neighbors=[Flaky Test Patterns]
- "e2e_testing_skill_screenshots": "Screenshots" | kind=entity | source=.github/skills/ecc/e2e-testing/SKILL.md:L195 | neighbors=[Artifact Management]
- "e2e_testing_skill_test_file_organization": "Test File Organization" | kind=entity | source=.github/skills/ecc/e2e-testing/SKILL.md:L11 | neighbors=[E2E Testing Patterns]
- "e2e_testing_skill_test_report_template": "Test Report Template" | kind=entity | source=.github/skills/ecc/e2e-testing/SKILL.md:L253 | neighbors=[E2E Testing Patterns]
- "e2e_testing_skill_test_structure": "Test Structure" | kind=entity | source=.github/skills/ecc/e2e-testing/SKILL.md:L67 | neighbors=[E2E Testing Patterns]
- "e2e_testing_skill_traces": "Traces" | kind=entity | source=.github/skills/ecc/e2e-testing/SKILL.md:L203 | neighbors=[Artifact Management]
- "e2e_testing_skill_video": "Video" | kind=entity | source=.github/skills/ecc/e2e-testing/SKILL.md:L215 | neighbors=[Artifact Management]
- "e2e_testing_skill_wallet_web3_testing": "Wallet / Web3 Testing" | kind=entity | source=.github/skills/ecc/e2e-testing/SKILL.md:L280 | neighbors=[E2E Testing Patterns]
- "end_route_post": "POST()" | kind=code-symbol | source=tech-pwa/src/app/api/field/shift/end/route.ts:L10 | neighbors=[route.ts]
- "entity_apt_ca": "APT-CA" | kind=entity | source=docs/DOMAIN_ARCHITECTURE.md | neighbors=[Central Command 2.0]
- "entity_apt_idaho": "APT-ID" | kind=entity | source=docs/DOMAIN_ARCHITECTURE.md | neighbors=[Central Command 2.0]
- "error_handling_skill": "SKILL.md" | kind=entity | source=.github/skills/ecc/error-handling/SKILL.md:L1 | neighbors=[Error Handling Patterns]
- "error_handling_skill_api_error_handler_next_js_express": "API Error Handler (Next.js / Express)" | kind=entity | source=.github/skills/ecc/error-handling/SKILL.md:L112 | neighbors=[TypeScript / JavaScript]
- "error_handling_skill_core_principles": "Core Principles" | kind=entity | source=.github/skills/ecc/error-handling/SKILL.md:L19 | neighbors=[Error Handling Patterns]
- "error_handling_skill_custom_exception_hierarchy": "Custom Exception Hierarchy" | kind=entity | source=.github/skills/ecc/error-handling/SKILL.md:L208 | neighbors=[Python]
- "error_handling_skill_error_handling_checklist": "Error Handling Checklist" | kind=entity | source=.github/skills/ecc/error-handling/SKILL.md:L365 | neighbors=[Error Handling Patterns]
- "error_handling_skill_fastapi_global_exception_handler": "FastAPI Global Exception Handler" | kind=entity | source=.github/skills/ecc/error-handling/SKILL.md:L228 | neighbors=[Python]
- "error_handling_skill_react_error_boundary": "React Error Boundary" | kind=entity | source=.github/skills/ecc/error-handling/SKILL.md:L166 | neighbors=[TypeScript / JavaScript]
- "error_handling_skill_result_pattern_no_throw_style": "Result Pattern (no-throw style)" | kind=entity | source=.github/skills/ecc/error-handling/SKILL.md:L74 | neighbors=[TypeScript / JavaScript]
- "error_handling_skill_retry_with_exponential_backoff": "Retry with Exponential Backoff" | kind=entity | source=.github/skills/ecc/error-handling/SKILL.md:L300 | neighbors=[Error Handling Patterns]
- "error_handling_skill_sentinel_errors_and_error_wrapping": "Sentinel Errors and Error Wrapping" | kind=entity | source=.github/skills/ecc/error-handling/SKILL.md:L255 | neighbors=[Go]
- "error_handling_skill_typed_error_classes": "Typed Error Classes" | kind=entity | source=.github/skills/ecc/error-handling/SKILL.md:L29 | neighbors=[TypeScript / JavaScript]
- "error_handling_skill_user_facing_error_messages": "User-Facing Error Messages" | kind=entity | source=.github/skills/ecc/error-handling/SKILL.md:L346 | neighbors=[Error Handling Patterns]
- "error_handling_skill_when_to_activate": "When to Activate" | kind=entity | source=.github/skills/ecc/error-handling/SKILL.md:L11 | neighbors=[Error Handling Patterns]
- "eval_harness_skill": "SKILL.md" | kind=entity | source=.github/skills/ecc/eval-harness/SKILL.md:L1 | neighbors=[Eval Harness Skill]
- "eval_harness_skill_1_code_based_grader": "1. Code-Based Grader" | kind=entity | source=.github/skills/ecc/eval-harness/SKILL.md:L56 | neighbors=[Grader Types]
- "eval_harness_skill_1_define_before_coding": "1. Define (Before Coding)" | kind=entity | source=.github/skills/ecc/eval-harness/SKILL.md:L108 | neighbors=[Eval Workflow]
- "eval_harness_skill_2_implement": "2. Implement" | kind=entity | source=.github/skills/ecc/eval-harness/SKILL.md:L127 | neighbors=[Eval Workflow]
- "eval_harness_skill_2_model_based_grader": "2. Model-Based Grader" | kind=entity | source=.github/skills/ecc/eval-harness/SKILL.md:L69 | neighbors=[Grader Types]
- "eval_harness_skill_3_evaluate": "3. Evaluate" | kind=entity | source=.github/skills/ecc/eval-harness/SKILL.md:L130 | neighbors=[Eval Workflow]
- "eval_harness_skill_3_human_grader": "3. Human Grader" | kind=entity | source=.github/skills/ecc/eval-harness/SKILL.md:L83 | neighbors=[Grader Types]
- "eval_harness_skill_4_report": "4. Report" | kind=entity | source=.github/skills/ecc/eval-harness/SKILL.md:L141 | neighbors=[Eval Workflow]
- "eval_harness_skill_best_practices": "Best Practices" | kind=entity | source=.github/skills/ecc/eval-harness/SKILL.md:L196 | neighbors=[Eval Harness Skill]
- "eval_harness_skill_capability_evals": "Capability Evals" | kind=entity | source=.github/skills/ecc/eval-harness/SKILL.md:L30 | neighbors=[Eval Types]
- "eval_harness_skill_during_implementation": "During Implementation" | kind=entity | source=.github/skills/ecc/eval-harness/SKILL.md:L173 | neighbors=[Integration Patterns]
- "eval_harness_skill_eval_anti_patterns": "Eval Anti-Patterns" | kind=entity | source=.github/skills/ecc/eval-harness/SKILL.md:L259 | neighbors=[Product Evals (v1.8)]
- "eval_harness_skill_eval_storage": "Eval Storage" | kind=entity | source=.github/skills/ecc/eval-harness/SKILL.md:L185 | neighbors=[Eval Harness Skill]
- "eval_harness_skill_example_adding_authentication": "Example: Adding Authentication" | kind=entity | source=.github/skills/ecc/eval-harness/SKILL.md:L206 | neighbors=[Eval Harness Skill]
- "eval_harness_skill_minimal_eval_artifact_layout": "Minimal Eval Artifact Layout" | kind=entity | source=.github/skills/ecc/eval-harness/SKILL.md:L266 | neighbors=[Product Evals (v1.8)]
- "eval_harness_skill_pass_k": "pass@k" | kind=entity | source=.github/skills/ecc/eval-harness/SKILL.md:L94 | neighbors=[Metrics]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\PTOW\1_APT_Central_Command\.graphify\description-instructions\batch-207.json

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
