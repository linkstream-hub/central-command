# Node Description Batch 54 of 412

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

- "github_skills_impeccable_reference_critique_md_reference_critique_reference_material": "Reference Material" | kind=entity | source=.github/skills/impeccable/reference/critique.md:L240 | neighbors=[critique.md, Cognitive Load Assessment, Heuristics Scoring Guide, Persona-Based Design Testing]
- "github_skills_impeccable_reference_critique_md_reference_critique_three_types_of_cognitive_load": "Three Types of Cognitive Load" | kind=entity | source=.github/skills/impeccable/reference/critique.md:L250 | neighbors=[Cognitive Load Assessment, Extraneous Load: Bad Design, Germane Load: Learning Effort, Intrinsic Load: The Task Itself]
- "github_skills_impeccable_reference_harden_md_reference_harden": "harden.md" | kind=entity | source=.github/skills/impeccable/reference/harden.md:L1 | neighbors=[Assess Hardening Needs, Hardening Dimensions, Testing Strategies, Verify Hardening]
- "github_skills_impeccable_reference_live_md_reference_live_csp_detection_first_time_only": "CSP detection (first-time only)" | kind=entity | source=.github/skills/impeccable/reference/live.md:L627 | neighbors=[append-arrays, append-string, Consent prompt template, First-time setup (config missing or inv…]
- "github_skills_impeccable_reference_live_md_reference_live_first_time_setup_config_missing_or_invalid": "First-time setup (config missing or invalid)" | kind=entity | source=.github/skills/impeccable/reference/live.md:L557 | neighbors=[live.md, CSP detection (first-time only), Drift-heal warning, Troubleshooting]
- "github_skills_impeccable_reference_optimize_md_reference_optimize_core_web_vitals_optimization": "Core Web Vitals Optimization" | kind=entity | source=.github/skills/impeccable/reference/optimize.md:L190 | neighbors=[optimize.md, Cumulative Layout Shift (CLS < 0.1), First Input Delay (FID < 100ms) / INP (…, Largest Contentful Paint (LCP < 2.5s)]
- "github_skills_impeccable_reference_overdrive_md_reference_overdrive_implement_with_discipline": "Implement with Discipline" | kind=entity | source=.github/skills/impeccable/reference/overdrive.md:L84 | neighbors=[overdrive.md, Performance rules, Polish is the difference, Progressive enhancement is non-negotiab…]
- "github_skills_impeccable_reference_shape_md_reference_shape": "shape.md" | kind=entity | source=.github/skills/impeccable/reference/shape.md:L1 | neighbors=[Phase 1.5: Visual Direction Probe (Capa…, Phase 1: Discovery Interview, Phase 2: Design Brief, Philosophy]
- "github_skills_impeccable_reference_shape_md_reference_shape_phase_1_5_visual_direction_probe_capability_gated": "Phase 1.5: Visual Direction Probe (Capability-Gated)" | kind=entity | source=.github/skills/impeccable/reference/shape.md:L72 | neighbors=[shape.md, How to use the probes, Important limits, What to generate]
- "github_skills_impeccable_reference_typeset_md_reference_typeset_classic_typography_principles": "Classic Typography Principles" | kind=entity | source=.github/skills/impeccable/reference/typeset.md:L134 | neighbors=[Modular Scale & Hierarchy, Readability & Measure, Vertical Rhythm, Typography]
- "github_skills_impeccable_reference_typeset_md_reference_typeset_font_selection_pairing": "Font Selection & Pairing" | kind=entity | source=.github/skills/impeccable/reference/typeset.md:L164 | neighbors=[Anti-reflexes worth defending against, Pairing Principles, Web Font Loading, Typography]
- "github_skills_impeccable_reference_typeset_md_reference_typeset_modern_web_typography": "Modern Web Typography" | kind=entity | source=.github/skills/impeccable/reference/typeset.md:L221 | neighbors=[Fluid Type, OpenType Features, Rendering polish, Typography]
- "github_skills_impeccable_skill_md_impeccable_skill": "SKILL.md" | kind=entity | source=.github/skills/impeccable/SKILL.md:L1 | neighbors=[Commands, Design guidance, Pin / Unpin, Setup]
- "graphify_skill_step_3_extract_entities_and_relationships": "Step 3 - Extract entities and relationships" | kind=entity | source=.github/skills/graphify/SKILL.md:L168 | neighbors=[Part A - Structural extraction for code…, Part B - Semantic extraction (parallel …, Part C - Merge AST + semantic into fina…, What You Must Do When Invoked]
- "gsd_graphify_skill_step_2_parse_argument": "Step 2 -- Parse Argument" | kind=entity | source=.github/skills/gsd-graphify/SKILL.md:L49 | neighbors=[SKILL.md, Step 2a -- Query, Step 2b -- Status, Step 2c -- Diff]
- "gsd_graphify_step_2_parse_argument": "Step 2 -- Parse Argument" | kind=entity | source=.claude/commands/gsd/graphify.md:L51 | neighbors=[graphify.md, Step 2a -- Query, Step 2b -- Status, Step 2c -- Diff]
- "gsd_quick": "quick.md" | kind=entity | source=.claude/commands/gsd/quick.md:L1 | neighbors=[LIST subcommand, RESUME subcommand, RUN subcommand (default), STATUS subcommand]
- "gsd_quick_skill": "SKILL.md" | kind=entity | source=.github/skills/gsd-quick/SKILL.md:L1 | neighbors=[LIST subcommand, RESUME subcommand, RUN subcommand (default), STATUS subcommand]
- "guides_deployment_n8n_railway": "n8n — Railway" | kind=entity | source=docs/guides/deployment.md:L128 | neighbors=[Deployment, Credential Names, Rollback, Workflow Deploy Process]
- "guides_deployment_rollback": "Rollback" | kind=entity | source=docs/guides/deployment.md:L73 | neighbors=[GAS — Dashboard API, GAS — Root Project (Lead Parsing), n8n — Railway, Tech PWA — Vercel]
- "guides_testing_ci_integration": "CI Integration" | kind=entity | source=docs/guides/testing.md:L176 | neighbors=[`ci.yml` — TypeScript + Lint + Build, `e2e-nightly.yml` — Weekly Regression, `e2e.yml` — Playwright E2E, Testing Guide]
- "guides_testing_running_tests": "Running Tests" | kind=entity | source=docs/guides/testing.md:L35 | neighbors=[E2E tests, Type checking, Unit tests, Testing Guide]
- "hookify_rules_skill_pattern_writing_tips": "Pattern Writing Tips" | kind=entity | source=.github/skills/ecc/hookify-rules/SKILL.md:L86 | neighbors=[Common Pitfalls, Regex Basics, Testing, Writing Hookify Rules]
- "hookify_rules_skill_rule_file_format": "Rule File Format" | kind=entity | source=.github/skills/ecc/hookify-rules/SKILL.md:L12 | neighbors=[Advanced Format (Multiple Conditions), Basic Structure, Frontmatter Fields, Writing Hookify Rules]
- "hooks_gsd_cursor_post_tool": "gsd-cursor-post-tool.js" | kind=code-symbol | source=.claude/hooks/gsd-cursor-post-tool.js:L1 | neighbors=[01bf641 Initial commit — clean history, 8fbeeb2 feat(phase-28): sentinel diet —…, ae595ff chore(tooling): add GSD platfor…, stdinTimeout]
- "intake_page": "page.tsx" | kind=code-symbol | source=tech-pwa/src/app/intake/page.tsx:L1 | neighbors=[01bf641 Initial commit — clean history, actions.ts, submitIntakeForm(), IntakePage()]
- "lib_dashboard_api_dispatchdataresponse": "DispatchDataResponse" | kind=code-symbol | source=tech-pwa/src/lib/dashboard-api.ts:L98 | neighbors=[dashboard-api.ts, page.tsx, DashboardStats, Job]
- "lib_dashboard_api_returnmockdata": "returnMockData()" | kind=code-symbol | source=tech-pwa/src/lib/dashboard-api.ts:L415 | neighbors=[dashboard-api.ts, dashboardRequest(), buildMockWeekSchedule(), computeStats()]
- "lib_dashboard_api_techsuggestion": "TechSuggestion" | kind=code-symbol | source=tech-pwa/src/lib/dashboard-api.ts:L123 | neighbors=[JobDetailModal.tsx, SchedulingDispatch.tsx, dashboard-api.ts, SchedulingDispatchProps]
- "lib_dashboard_api_weekscheduleresponse": "WeekScheduleResponse" | kind=code-symbol | source=tech-pwa/src/lib/dashboard-api.ts:L141 | neighbors=[JobDetailModal.tsx, dashboard-api.ts, page.tsx, Job]
- "lib_email_sendrequesterautoreply": "sendRequesterAutoReply()" | kind=code-symbol | source=tech-pwa/src/lib/email.ts:L140 | neighbors=[email.ts, escapeHtml(), getResend(), email-intake.test.ts]
- "lib_email_sendtenantcoordinationemail": "sendTenantCoordinationEmail()" | kind=code-symbol | source=tech-pwa/src/lib/email.ts:L191 | neighbors=[email.ts, escapeHtml(), getResend(), email-intake.test.ts]
- "lib_git_cmd_tokenize": "tokenize()" | kind=code-symbol | source=.claude/hooks/lib/git-cmd.js:L63 | neighbors=[gsd-workflow-guard.js, git-cmd.js, isGitSubcommand(), forceGitAddCwds()]
- "lib_gmail_client_extractbody": "extractBody()" | kind=code-symbol | source=tech-pwa/src/lib/gmail-client.ts:L76 | neighbors=[gmail-client.ts, stripHtml(), getNewMessages(), getThreadByMessageId()]
- "lib_gmail_client_getcurrenthistoryid": "getCurrentHistoryId()" | kind=code-symbol | source=tech-pwa/src/lib/gmail-client.ts:L207 | neighbors=[gmail-client.ts, getGmailClient(), route.ts, GET()]
- "lib_gmail_client_getthreadmessageids": "getThreadMessageIds()" | kind=code-symbol | source=tech-pwa/src/lib/gmail-client.ts:L286 | neighbors=[gmail-client.ts, getGmailClient(), route.ts, GET()]
- "lib_intake_processor_processintakepayload": "processIntakePayload()" | kind=code-symbol | source=tech-pwa/src/lib/intake-processor.ts:L7 | neighbors=[actions.ts, intake-processor.ts, intake-processor.test.ts, submitIntakeForm()]
- "lib_normalizeaddresskey_normalizeaddresskey": "normalizeAddressKey()" | kind=code-symbol | source=tech-pwa/src/lib/normalizeAddressKey.ts:L18 | neighbors=[route.ts, detectLaphamForm.ts, normalizeAddressKey.ts, normalizeAddressKey.test.ts]
- "lib_ratelimit_checkloginratelimit": "checkLoginRateLimit()" | kind=code-symbol | source=tech-pwa/src/lib/rateLimit.ts:L37 | neighbors=[rateLimit.ts, getRateLimiter(), route.ts, POST()]
- "lib_sandbox_store_readstore": "readStore()" | kind=code-symbol | source=tech-pwa/src/lib/sandbox-store.ts:L115 | neighbors=[sandbox-store.ts, getDefaultData(), writeStore(), sandboxAction()]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\PTOW\1_APT_Central_Command\.graphify\description-instructions\batch-053.json

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
