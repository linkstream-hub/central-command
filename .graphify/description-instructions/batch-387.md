# Node Description Batch 388 of 412

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

- "templates_user_profile_communication_style": "Communication Style" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/templates/user-profile.md:L21 | neighbors=[Developer Profile]
- "templates_user_profile_debugging_approach": "Debugging Approach" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/templates/user-profile.md:L63 | neighbors=[Developer Profile]
- "templates_user_profile_decision_speed": "Decision Speed" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/templates/user-profile.md:L35 | neighbors=[Developer Profile]
- "templates_user_profile_explanation_depth": "Explanation Depth" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/templates/user-profile.md:L49 | neighbors=[Developer Profile]
- "templates_user_profile_frustration_triggers": "Frustration Triggers" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/templates/user-profile.md:L105 | neighbors=[Developer Profile]
- "templates_user_profile_learning_style": "Learning Style" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/templates/user-profile.md:L119 | neighbors=[Developer Profile]
- "templates_user_profile_profile_metadata": "Profile Metadata" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/templates/user-profile.md:L133 | neighbors=[Developer Profile]
- "templates_user_profile_quick_reference": "Quick Reference" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/templates/user-profile.md:L15 | neighbors=[Developer Profile]
- "templates_user_profile_ux_philosophy": "UX Philosophy" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/templates/user-profile.md:L77 | neighbors=[Developer Profile]
- "templates_user_profile_vendor_philosophy": "Vendor Philosophy" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/templates/user-profile.md:L91 | neighbors=[Developer Profile]
- "templates_user_setup_check_env_var": "Check env var" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/templates/user-setup.md:L288 | neighbors=[user-setup.md]
- "templates_user_setup_check_env_vars": "Check env vars" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/templates/user-setup.md:L235 | neighbors=[user-setup.md]
- "templates_user_setup_check_env_vars_are_set": "Check env vars are set" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/templates/user-setup.md:L174 | neighbors=[user-setup.md]
- "templates_user_setup_file_template": "File Template" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/templates/user-setup.md:L9 | neighbors=[User Setup Template]
- "templates_user_setup_frontmatter_schema": "Frontmatter Schema" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/templates/user-setup.md:L74 | neighbors=[[Verification commands]]
- "templates_user_setup_guidelines": "Guidelines" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/templates/user-setup.md:L305 | neighbors=[Test email sending (replace with your t…]
- "templates_user_setup_service_specific_examples": "Service-Specific Examples" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/templates/user-setup.md:L117 | neighbors=[[Verification commands]]
- "templates_user_setup_test_webhook_endpoint_should_return_400_bad_signature_not_500_crash": "Test webhook endpoint (should return 400 bad signature, not 500 crash)" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/templates/user-setup.md:L180 | neighbors=[user-setup.md]
- "templates_user_setup_the_automation_first_rule": "The Automation-First Rule" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/templates/user-setup.md:L98 | neighbors=[[Verification commands]]
- "templates_user_setup_verify_build_passes": "Verify build passes" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/templates/user-setup.md:L177 | neighbors=[user-setup.md]
- "templates_user_setup_verify_connection_run_in_project_directory": "Verify connection (run in project directory)" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/templates/user-setup.md:L238 | neighbors=[user-setup.md]
- "templates_user_setup_when_to_generate": "When to Generate" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/templates/user-setup.md:L62 | neighbors=[[Verification commands]]
- "templates_validation": "VALIDATION.md" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/templates/VALIDATION.md:L1 | neighbors=[Phase {N} — Validation Strategy]
- "templates_validation_manual_only_verifications": "Manual-Only Verifications" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/templates/VALIDATION.md:L57 | neighbors=[Phase {N} — Validation Strategy]
- "templates_validation_per_task_verification_map": "Per-Task Verification Map" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/templates/VALIDATION.md:L37 | neighbors=[Phase {N} — Validation Strategy]
- "templates_validation_sampling_rate": "Sampling Rate" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/templates/VALIDATION.md:L28 | neighbors=[Phase {N} — Validation Strategy]
- "templates_validation_test_infrastructure": "Test Infrastructure" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/templates/VALIDATION.md:L16 | neighbors=[Phase {N} — Validation Strategy]
- "templates_validation_validation_sign_off": "Validation Sign-Off" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/templates/VALIDATION.md:L67 | neighbors=[Phase {N} — Validation Strategy]
- "templates_validation_wave_0_requirements": "Wave 0 Requirements" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/templates/VALIDATION.md:L47 | neighbors=[Phase {N} — Validation Strategy]
- "templates_verification_report": "verification-report.md" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/templates/verification-report.md:L1 | neighbors=[Verification Report Template]
- "templates_verification_report_example": "Example" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/templates/verification-report.md:L188 | neighbors=[Verification Report Template]
- "templates_verification_report_file_template": "File Template" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/templates/verification-report.md:L7 | neighbors=[Verification Report Template]
- "templates_verification_report_guidelines": "Guidelines" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/templates/verification-report.md:L162 | neighbors=[Verification Report Template]
- "tests_compliance_test_hoursafter": "hoursAfter()" | kind=code-symbol | source=tech-pwa/src/lib/__tests__/compliance.test.ts:L6 | neighbors=[compliance.test.ts]
- "tests_compliance_test_minsafter": "minsAfter()" | kind=code-symbol | source=tech-pwa/src/lib/__tests__/compliance.test.ts:L7 | neighbors=[compliance.test.ts]
- "tests_compliance_test_t0": "T0" | kind=code-symbol | source=tech-pwa/src/lib/__tests__/compliance.test.ts:L5 | neighbors=[compliance.test.ts]
- "tests_detectlaphamform_test_fixturedir": "fixtureDir" | kind=code-symbol | source=tech-pwa/src/lib/__tests__/detectLaphamForm.test.ts:L9 | neighbors=[detectLaphamForm.test.ts]
- "tests_detectlaphamform_test_forwarded": "forwarded" | kind=code-symbol | source=tech-pwa/src/lib/__tests__/detectLaphamForm.test.ts:L11 | neighbors=[detectLaphamForm.test.ts]
- "tests_detectlaphamform_test_sameline": "sameline" | kind=code-symbol | source=tech-pwa/src/lib/__tests__/detectLaphamForm.test.ts:L10 | neighbors=[detectLaphamForm.test.ts]
- "tests_detectlaphamform_test_turnover": "turnover" | kind=code-symbol | source=tech-pwa/src/lib/__tests__/detectLaphamForm.test.ts:L12 | neighbors=[detectLaphamForm.test.ts]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\PTOW\1_APT_Central_Command\.graphify\description-instructions\batch-387.json

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
