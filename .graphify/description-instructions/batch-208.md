# Node Description Batch 209 of 412

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

- "eval_harness_skill_pass_k_guidance": "pass@k Guidance" | kind=entity | source=.github/skills/ecc/eval-harness/SKILL.md:L249 | neighbors=[Product Evals (v1.8)] | lang=en
- "eval_harness_skill_philosophy": "Philosophy" | kind=entity | source=.github/skills/ecc/eval-harness/SKILL.md:L20 | neighbors=[Eval Harness Skill] | lang=en
- "eval_harness_skill_post_implementation": "Post-Implementation" | kind=entity | source=.github/skills/ecc/eval-harness/SKILL.md:L179 | neighbors=[Integration Patterns] | lang=en
- "eval_harness_skill_pre_implementation": "Pre-Implementation" | kind=entity | source=.github/skills/ecc/eval-harness/SKILL.md:L167 | neighbors=[Integration Patterns] | lang=en
- "eval_harness_skill_regression_evals": "Regression Evals" | kind=entity | source=.github/skills/ecc/eval-harness/SKILL.md:L42 | neighbors=[Eval Types] | lang=en
- "eval_harness_skill_when_to_activate": "When to Activate" | kind=entity | source=.github/skills/ecc/eval-harness/SKILL.md:L12 | neighbors=[Eval Harness Skill] | lang=en
- "exec_route_mock_jobs": "MOCK_JOBS" | kind=code-symbol | source=tech-pwa/src/app/api/mock/exec/route.ts:L20 | neighbors=[route.ts] | lang=en
- "exec_route_mock_tech": "MOCK_TECH" | kind=code-symbol | source=tech-pwa/src/app/api/mock/exec/route.ts:L11 | neighbors=[route.ts] | lang=en
- "feedback_page_admincontrolpanel": "AdminControlPanel()" | kind=code-symbol | source=tech-pwa/src/app/feedback/page.tsx:L307 | neighbors=[page.tsx] | lang=en
- "feedback_page_feedbackpage": "FeedbackPage()" | kind=code-symbol | source=tech-pwa/src/app/feedback/page.tsx:L12 | neighbors=[page.tsx] | lang=en
- "ferra_doctrine": "Ferra Doctrine" | kind=entity | source=docs/APT_COMPLIANCE_HR_BLUEPRINT.md | neighbors=[PAGA Compliance] | lang=en
- "few_shot_examples_plan_checker": "plan-checker.md" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/few-shot-examples/plan-checker.md:L1 | neighbors=[Plan-Checker Few-Shot Examples] | lang=en
- "few_shot_examples_plan_checker_example_1_all_dimensions_pass_when_verify_commands_are_missing": "Example 1: All dimensions pass when verify commands are missing" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/few-shot-examples/plan-checker.md:L47 | neighbors=[Negative Examples] | lang=en
- "few_shot_examples_plan_checker_example_1_blocker_flagged_for_vague_task_action_missing_file_and_function_names": "Example 1: BLOCKER flagged for vague task action missing file and function names" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/few-shot-examples/plan-checker.md:L11 | neighbors=[Positive Examples] | lang=en
- "few_shot_examples_plan_checker_example_2_blocker_for_same_wave_file_conflict_between_two_plans": "Example 2: BLOCKER for same-wave file conflict between two plans" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/few-shot-examples/plan-checker.md:L28 | neighbors=[Positive Examples] | lang=en
- "few_shot_examples_plan_checker_example_2_false_positive_info_for_a_correctly_sized_plan": "Example 2: False positive INFO for a correctly-sized plan" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/few-shot-examples/plan-checker.md:L58 | neighbors=[Negative Examples] | lang=en
- "few_shot_examples_verifier": "verifier.md" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/few-shot-examples/verifier.md:L1 | neighbors=[Verifier Few-Shot Examples] | lang=en
- "few_shot_examples_verifier_calibration_derived_gap_patterns": "Calibration-Derived Gap Patterns" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/few-shot-examples/verifier.md:L77 | neighbors=[Verifier Few-Shot Examples] | lang=en
- "few_shot_examples_verifier_example_1_blanket_pass_with_no_per_criterion_evidence": "Example 1: Blanket pass with no per-criterion evidence" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/few-shot-examples/verifier.md:L89 | neighbors=[Negative Examples] | lang=en
- "few_shot_examples_verifier_example_1_thorough_multi_level_artifact_verification_with_real_gap_discovery": "Example 1: Thorough multi-level artifact verification with real gap discovery" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/few-shot-examples/verifier.md:L12 | neighbors=[Positive Examples] | lang=en
- "few_shot_examples_verifier_example_2_correct_failed_classification_with_grep_evidence": "Example 2: Correct FAILED classification with grep evidence" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/few-shot-examples/verifier.md:L25 | neighbors=[Positive Examples] | lang=en
- "few_shot_examples_verifier_example_2_file_existence_check_without_substance_or_wiring_verification": "Example 2: File existence check without substance or wiring verification" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/few-shot-examples/verifier.md:L100 | neighbors=[Negative Examples] | lang=en
- "few_shot_examples_verifier_example_3_catching_missing_wiring_calibration_derived_gap_pattern": "Example 3: Catching missing wiring (calibration-derived gap pattern)" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/few-shot-examples/verifier.md:L38 | neighbors=[Positive Examples] | lang=en
- "few_shot_examples_verifier_example_4_catching_missing_config_schema_entries_calibration_derived_gap_pattern": "Example 4: Catching missing config schema entries (calibration-derived gap patt…" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/few-shot-examples/verifier.md:L51 | neighbors=[Positive Examples] | lang=en
- "few_shot_examples_verifier_example_5_distinguishing_planning_gaps_from_execution_failures": "Example 5: Distinguishing planning gaps from execution failures" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/few-shot-examples/verifier.md:L64 | neighbors=[Positive Examples] | lang=en
- "file_job_page_tsx": "job/[jobId]/page.tsx" | kind=code-symbol | source=tech-pwa/src/app/job/[jobId]/page.tsx | neighbors=[Employee Attestation] | lang=en
- "file_time_off_page_tsx": "time-off/page.tsx" | kind=code-symbol | source=tech-pwa/src/app/time-off/page.tsx | neighbors=[Time Off Manager] | lang=en
- "fixtures_seed_test_jobs": "TEST_JOBS" | kind=code-symbol | source=tech-pwa/tests/fixtures/seed.ts:L5 | neighbors=[seed.ts] | lang=en
- "gas": "Google Apps Script (GAS)" | kind=entity | source=docs/ARCHITECTURE.md | neighbors=[Central Command 2.0] | lang=en
- "gas_route_post": "POST()" | kind=code-symbol | source=tech-pwa/src/app/api/gas/route.ts:L7 | neighbors=[route.ts] | lang=en
- "gates_ag_load_before_implement_sprint_and_before_test_sprint": "AG: load before implement sprint and before test sprint." | kind=entity | source=GATES.md:L3 | neighbors=[GATES.md] | lang=en
- "gates_claude_code_review_gates_run_in_order_every_diff_and_every_test_result": "CLAUDE CODE — REVIEW GATES (run in order, every diff and every test result)" | kind=entity | source=GATES.md:L47 | neighbors=[Not part of base session load — fetch o…] | lang=en
- "gates_gates_md_apt_central_command": "GATES.md — APT Central Command" | kind=entity | source=GATES.md:L1 | neighbors=[GATES.md] | lang=en
- "gates_load_this_when_doing_a_diff_review_reviewing_test_results_or_making_a_merge_decision": "Load this when: doing a diff review, reviewing test results, or making a merge …" | kind=entity | source=GATES.md:L2 | neighbors=[GATES.md] | lang=pt
- "gates_sprint_checklists": "✅ SPRINT CHECKLISTS" | kind=entity | source=GATES.md:L8 | neighbors=[Not part of base session load — fetch o…] | lang=en
- "github_copilot_instructions": "copilot-instructions.md" | kind=entity | source=.github/copilot-instructions.md:L1 | neighbors=[Instructions for GSD] | lang=en
- "github_copilot_instructions_instructions_for_gsd": "Instructions for GSD" | kind=entity | source=.github/copilot-instructions.md:L2 | neighbors=[copilot-instructions.md] | lang=en
- "github_scripts_changeset_readme_md_changeset_readme": "README.md" | kind=entity | source=.github/scripts/changeset/README.md:L1 | neighbors=[changeset/ — release-notes tooling] | lang=en
- "github_scripts_changeset_readme_md_changeset_readme_examples": "Examples" | kind=entity | source=.github/scripts/changeset/README.md:L102 | neighbors=[`cli.cjs extract`] | lang=en
- "github_scripts_changeset_readme_md_changeset_readme_exit_codes": "Exit codes" | kind=entity | source=.github/scripts/changeset/README.md:L58 | neighbors=[`cli.cjs extract`] | lang=en

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\PTOW\1_APT_Central_Command\.graphify\description-instructions\batch-208.json

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
