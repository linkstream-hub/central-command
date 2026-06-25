# Node Description Batch 66 of 412

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

- "eval_harness_skill_eval_types": "Eval Types" | kind=entity | source=.github/skills/ecc/eval-harness/SKILL.md:L28 | neighbors=[Eval Harness Skill, Capability Evals, Regression Evals]
- "event_bus_module": "EventBus Module" | kind=code-symbol | source=tech-pwa/src/lib/services/event-bus.ts | neighbors=[n8n Event Bus, workflow_events, JobStateService]
- "exec_route_get": "GET()" | kind=code-symbol | source=tech-pwa/src/app/api/mock/exec/route.ts:L114 | neighbors=[route.ts, guardProduction(), handleGet()]
- "exec_route_guardproduction": "guardProduction()" | kind=code-symbol | source=tech-pwa/src/app/api/mock/exec/route.ts:L3 | neighbors=[route.ts, GET(), POST()]
- "exec_route_post": "POST()" | kind=code-symbol | source=tech-pwa/src/app/api/mock/exec/route.ts:L122 | neighbors=[route.ts, guardProduction(), handlePost()]
- "few_shot_examples_plan_checker_negative_examples": "Negative Examples" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/few-shot-examples/plan-checker.md:L45 | neighbors=[Example 1: All dimensions pass when ver…, Example 2: False positive INFO for a co…, Plan-Checker Few-Shot Examples]
- "few_shot_examples_plan_checker_plan_checker_few_shot_examples": "Plan-Checker Few-Shot Examples" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/few-shot-examples/plan-checker.md:L7 | neighbors=[plan-checker.md, Negative Examples, Positive Examples]
- "few_shot_examples_plan_checker_positive_examples": "Positive Examples" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/few-shot-examples/plan-checker.md:L9 | neighbors=[Plan-Checker Few-Shot Examples, Example 1: BLOCKER flagged for vague ta…, Example 2: BLOCKER for same-wave file c…]
- "few_shot_examples_verifier_negative_examples": "Negative Examples" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/references/few-shot-examples/verifier.md:L87 | neighbors=[Example 1: Blanket pass with no per-cri…, Example 2: File existence check without…, Verifier Few-Shot Examples]
- "fixtures_seed_teardownfixtures": "teardownFixtures()" | kind=code-symbol | source=tech-pwa/tests/fixtures/seed.ts:L174 | neighbors=[seed.ts, globalTeardown.ts, globalTeardown()]
- "gates_not_part_of_base_session_load_fetch_on_demand": "Not part of base session load — fetch on demand." | kind=entity | source=GATES.md:L4 | neighbors=[GATES.md, CLAUDE CODE — REVIEW GATES (run in orde…, ✅ SPRINT CHECKLISTS]
- "github_skills_archive_impeccable_reference_adapt_md_reference_adapt_responsive_images_get_it_right": "Responsive Images: Get It Right" | kind=entity | source=.github/skills_archive/impeccable/reference/adapt.md:L259 | neighbors=[Responsive Design, Picture Element for Art Direction, srcset with Width Descriptors]
- "github_skills_archive_impeccable_reference_audit_md_reference_audit": "audit.md" | kind=entity | source=.github/skills_archive/impeccable/reference/audit.md:L1 | neighbors=[Diagnostic Scan, Generate Report, Recommended Actions]
- "github_skills_archive_impeccable_reference_clarify_md_reference_clarify_error_messages_the_formula": "Error Messages: The Formula" | kind=entity | source=.github/skills_archive/impeccable/reference/clarify.md:L200 | neighbors=[Don't Blame the User, Error Message Templates, UX Writing]
- "github_skills_archive_impeccable_reference_clarify_md_reference_clarify_writing_for_translation": "Writing for Translation" | kind=entity | source=.github/skills_archive/impeccable/reference/clarify.md:L240 | neighbors=[UX Writing, Plan for Expansion, Translation-Friendly Patterns]
- "github_skills_archive_impeccable_reference_colorize_md_reference_colorize_theming_light_dark_mode": "Theming: Light & Dark Mode" | kind=entity | source=.github/skills_archive/impeccable/reference/colorize.md:L232 | neighbors=[Color & Contrast, Dark Mode Is Not Inverted Light Mode, Token Hierarchy]
- "github_skills_archive_impeccable_reference_interaction_design_md_reference_interaction_design_keyboard_navigation_patterns": "Keyboard Navigation Patterns" | kind=entity | source=.github/skills_archive/impeccable/reference/interaction-design.md:L157 | neighbors=[Interaction Design, Roving Tabindex, Skip Links]
- "github_skills_impeccable_reference_adapt_md_reference_adapt_responsive_images_get_it_right": "Responsive Images: Get It Right" | kind=entity | source=.github/skills/impeccable/reference/adapt.md:L259 | neighbors=[Responsive Design, Picture Element for Art Direction, srcset with Width Descriptors]
- "github_skills_impeccable_reference_audit_md_reference_audit": "audit.md" | kind=entity | source=.github/skills/impeccable/reference/audit.md:L1 | neighbors=[Diagnostic Scan, Generate Report, Recommended Actions]
- "github_skills_impeccable_reference_clarify_md_reference_clarify_error_messages_the_formula": "Error Messages: The Formula" | kind=entity | source=.github/skills/impeccable/reference/clarify.md:L200 | neighbors=[Don't Blame the User, Error Message Templates, UX Writing]
- "github_skills_impeccable_reference_clarify_md_reference_clarify_writing_for_translation": "Writing for Translation" | kind=entity | source=.github/skills/impeccable/reference/clarify.md:L240 | neighbors=[UX Writing, Plan for Expansion, Translation-Friendly Patterns]
- "github_skills_impeccable_reference_colorize_md_reference_colorize_theming_light_dark_mode": "Theming: Light & Dark Mode" | kind=entity | source=.github/skills/impeccable/reference/colorize.md:L232 | neighbors=[Color & Contrast, Dark Mode Is Not Inverted Light Mode, Token Hierarchy]
- "github_skills_impeccable_reference_interaction_design_md_reference_interaction_design_keyboard_navigation_patterns": "Keyboard Navigation Patterns" | kind=entity | source=.github/skills/impeccable/reference/interaction-design.md:L157 | neighbors=[Interaction Design, Roving Tabindex, Skip Links]
- "guides_deployment_gas_dashboard_api": "GAS — Dashboard API" | kind=entity | source=docs/guides/deployment.md:L101 | neighbors=[Deployment, CI Pipeline, Rollback]
- "guides_getting_started_accessing_the_two_portals": "Accessing the Two Portals" | kind=entity | source=docs/guides/getting-started.md:L105 | neighbors=[Field Tech Portal, Office Staff Portal, Getting Started]
- "guides_testing_test_credentials": "Test Credentials" | kind=entity | source=docs/guides/testing.md:L83 | neighbors=[Staff portal (office admin login), Tech portal (badge + PIN login), Testing Guide]
- "guides_testing_writing_new_tests": "Writing New Tests" | kind=entity | source=docs/guides/testing.md:L115 | neighbors=[Testing Guide, E2E test naming and location, Unit test naming and location]
- "hooks_gsd_statusline_formatgsdstate": "formatGsdState()" | kind=code-symbol | source=.claude/hooks/gsd-statusline.js:L244 | neighbors=[gsd-statusline.js, renderProgressBar(), renderStatusline()]
- "hooks_gsd_statusline_readgsdstate": "readGsdState()" | kind=code-symbol | source=.claude/hooks/gsd-statusline.js:L104 | neighbors=[gsd-statusline.js, parseStateMd(), renderStatusline()]
- "intake_actions_submitintakeform": "submitIntakeForm()" | kind=code-symbol | source=tech-pwa/src/app/intake/actions.ts:L9 | neighbors=[actions.ts, page.tsx, processIntakePayload()]
- "intel_page": "page.tsx" | kind=code-symbol | source=tech-pwa/src/app/intel/page.tsx:L1 | neighbors=[01bf641 Initial commit — clean history, DashboardLayout.tsx, IntelComingSoonPage()]
- "iterative_retrieval_skill_practical_examples": "Practical Examples" | kind=entity | source=.github/skills/ecc/iterative-retrieval/SKILL.md:L143 | neighbors=[Iterative Retrieval Pattern, Example 1: Bug Fix Context, Example 2: Feature Implementation]
- "job_job_state_createjobstateservice": "createJobStateService()" | kind=code-symbol | source=tech-pwa/src/domain/job/job-state.ts:L603 | neighbors=[index.ts, job-state.ts, job-state.test.ts]
- "job_job_state_job_state_machine": "JOB_STATE_MACHINE" | kind=code-symbol | source=tech-pwa/src/domain/job/job-state.ts:L256 | neighbors=[index.ts, job-state.ts, job-state.test.ts]
- "job_job_state_jobstatedal": "JobStateDAL" | kind=code-symbol | source=tech-pwa/src/domain/job/job-state.ts:L405 | neighbors=[index.ts, job-state.ts, job-state.test.ts]
- "job_job_state_jobstaterecord": "JobStateRecord" | kind=code-symbol | source=tech-pwa/src/domain/job/job-state.ts:L198 | neighbors=[index.ts, job-state.ts, job-state.test.ts]
- "job_job_state_schedulingtoken": "SchedulingToken" | kind=code-symbol | source=tech-pwa/src/domain/job/job-state.ts:L19 | neighbors=[index.ts, job-state.ts, job-state.test.ts]
- "job_job_state_tojobid": "toJobId()" | kind=code-symbol | source=tech-pwa/src/domain/job/job-state.ts:L22 | neighbors=[index.ts, job-state.ts, job-state.test.ts]
- "job_job_state_totechid": "toTechId()" | kind=code-symbol | source=tech-pwa/src/domain/job/job-state.ts:L27 | neighbors=[index.ts, job-state.ts, job-state.test.ts]
- "jobid_job_update_apply": "apply()" | kind=code-symbol | source=tech-pwa/src/app/api/jobs/[jobId]/job-update.ts:L31 | neighbors=[job-update.ts, route.ts, job-update.test.ts]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\PTOW\1_APT_Central_Command\.graphify\description-instructions\batch-065.json

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
