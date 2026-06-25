# Node Description Batch 73 of 412

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

- "clock_out_route_post": "POST()" | kind=code-symbol | source=tech-pwa/src/app/api/field/clock-out/route.ts:L10 | neighbors=[route.ts, verifyFieldSession()] | lang=en
- "code_applyclassificationlabels": "applyClassificationLabels()" | kind=code-symbol | source=Code.js:L1075 | neighbors=[Code.js, checkNewLeadEmails()] | lang=en
- "code_applyprocessedlabel": "applyProcessedLabel()" | kind=code-symbol | source=Code.js:L1088 | neighbors=[Code.js, checkNewLeadEmails()] | lang=en
- "code_buildthreadcontext": "buildThreadContext()" | kind=code-symbol | source=Code.js:L1127 | neighbors=[Code.js, checkNewLeadEmails()] | lang=en
- "code_detectlaphamform": "detectLaphamForm()" | kind=code-symbol | source=Code.js:L178 | neighbors=[Code.js, checkNewLeadEmails()] | lang=en
- "code_expandaddressrange": "expandAddressRange()" | kind=code-symbol | source=Code.js:L540 | neighbors=[Code.js, loadLaphamDatabase()] | lang=en
- "code_extractaddressfromsubject": "extractAddressFromSubject()" | kind=code-symbol | source=Code.js:L1098 | neighbors=[Code.js, parseWithGemini()] | lang=en
- "code_extractcodes": "extractCodes()" | kind=code-symbol | source=Code.js:L664 | neighbors=[Code.js, enrichFromLaphamDb()] | lang=en
- "code_getjobidforthread": "getJobIdForThread()" | kind=code-symbol | source=Code.js:L1778 | neighbors=[Code.js, checkNewLeadEmails()] | lang=en
- "code_getnextleadid": "getNextLeadId()" | kind=code-symbol | source=Code.js:L955 | neighbors=[Code.js, logToSheet()] | lang=en
- "code_getprocessedmessageids": "getProcessedMessageIds()" | kind=code-symbol | source=Code.js:L1106 | neighbors=[Code.js, checkNewLeadEmails()] | lang=en
- "code_isofficeemail": "isOfficeEmail()" | kind=code-symbol | source=Code.js:L1057 | neighbors=[Code.js, flagNewContactsForReview()] | lang=en
- "code_ispropertylevelaccessinfo": "isPropertyLevelAccessInfo()" | kind=code-symbol | source=Code.js:L718 | neighbors=[Code.js, flagNewContactsForReview()] | lang=en
- "code_normalizeaccessinfo": "normalizeAccessInfo()" | kind=code-symbol | source=Code.js:L654 | neighbors=[Code.js, enrichFromLaphamDb()] | lang=en
- "code_normalizeclientname": "normalizeClientName()" | kind=code-symbol | source=Code.js:L1066 | neighbors=[Code.js, flagNewContactsForReview()] | lang=en
- "code_sendinspectionsummary": "sendInspectionSummary()" | kind=code-symbol | source=Code.js:L761 | neighbors=[Code.js, routeLead()] | lang=en
- "code_sendlowconfidencealert": "sendLowConfidenceAlert()" | kind=code-symbol | source=Code.js:L333 | neighbors=[Code.js, checkNewLeadEmails()] | lang=en
- "code_shouldskipemail": "shouldSkipEmail()" | kind=code-symbol | source=Code.js:L1633 | neighbors=[Code.js, checkNewLeadEmails()] | lang=en
- "code_writeinboundreplytoneon": "writeInboundReplyToNeon()" | kind=code-symbol | source=Code.js:L1793 | neighbors=[Code.js, checkNewLeadEmails()] | lang=en
- "codebase_architecture_architecture_template": "Architecture Template" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/templates/codebase/architecture.md:L1 | neighbors=[architecture.md, File Template] | lang=en
- "codebase_concerns_codebase_concerns_template": "Codebase Concerns Template" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/templates/codebase/concerns.md:L1 | neighbors=[concerns.md, File Template] | lang=en
- "codebase_conventions_coding_conventions_template": "Coding Conventions Template" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/templates/codebase/conventions.md:L1 | neighbors=[conventions.md, File Template] | lang=en
- "codebase_integrations_external_integrations_template": "External Integrations Template" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/templates/codebase/integrations.md:L1 | neighbors=[integrations.md, File Template] | lang=en
- "codebase_stack_technology_stack_template": "Technology Stack Template" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/templates/codebase/stack.md:L1 | neighbors=[stack.md, File Template] | lang=en
- "codebase_structure_structure_template": "Structure Template" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/templates/codebase/structure.md:L1 | neighbors=[structure.md, File Template] | lang=en
- "codebase_testing_testing_patterns_template": "Testing Patterns Template" | kind=entity | source=.claude/gsd-migration-journal/2026-06-11T06-43-03-745Z-bafae770ef4d5711-rollback/get-shit-done/templates/codebase/testing.md:L1 | neighbors=[testing.md, File Template] | lang=en
- "commit:repo:github.com/linkstream-hub/central-command@029d955ce03ba41bb1597934959f0f26588ec755": "029d955 chore(s104): allow gh pr commands in settings.local.json" | kind=Commit | source=git | neighbors=[chore/s104-session-closeout, b1606b1 chore(s104): session closeout —…] | lang=en
- "commit:repo:github.com/linkstream-hub/central-command@0cd93d527b135fd79681ba218602e3a22bea642a": "0cd93d5 chore: wire context_bundle.ps1 UserPromptSubmit hook + sync phase-12 st…" | kind=Commit | source=git | neighbors=[chore/context-bundle-hook, 8ae235b feat(phase-12): data integrity …] | lang=en
- "commit:repo:github.com/linkstream-hub/central-command@13bcd0ede98af3408d36f8b0624989f00d0adddf": "13bcd0e security: remove html.txt export, add to gitignore" | kind=Commit | source=git | neighbors=[0d3dd7b chore: lean agent stack — remov…, fix/remove-leaked-html-file] | lang=en
- "commit:repo:github.com/linkstream-hub/central-command@143a13a85541ff239ef24fa194e60f0ba9c2e98f": "143a13a chore(s117): session close — Phase 1 planned, AG executing archive-stal…" | kind=Commit | source=git | neighbors=[feat/s115-dispatch-flow, da39104 chore: add GSD skill permission…] | lang=pt
- "commit:repo:github.com/linkstream-hub/central-command@1a1e686df1ced8e9ffbb1465654793f4385f6c5d": "1a1e686 chore: update settings allowlist" | kind=Commit | source=git | neighbors=[claude/plan-dispatch-dashboard-BX4AV, 448bb95 chore: dispatch dashboard diff …] | lang=pt
- "commit:repo:github.com/linkstream-hub/central-command@1ba194ebb0435e288e8f9a85698bc7c2e68b97a3": "1ba194e chore(phase-14): generate diff artifact" | kind=Commit | source=git | neighbors=[07a0a9c docs(phase-14): formally mark d…, feat/phase-14-archive] | lang=en
- "commit:repo:github.com/linkstream-hub/central-command@261857b6f2e2b59e60d6b6078952eeb2c50b1100": "261857b docs(12): add plans 04 and 05 — NEON-02 read cutover and NEON-03 write …" | kind=Commit | source=git | neighbors=[feat/phase-19-code-js-email-migration, b1f1740 docs(11-02): close plan — check…] | lang=en
- "commit:repo:github.com/linkstream-hub/central-command@2abacbf3d12325bd35d394ba67b15b8b03fbbb30": "2abacbf test(p3-5): add passing playwright test results for gate 16" | kind=Commit | source=git | neighbors=[feat/p3-5-gas-bridge-cleanup, e0dd250 chore(p3-5): add test results] | lang=en
- "commit:repo:github.com/linkstream-hub/central-command@4209061302408b94fbeb8a7576c549e19c10d54f": "4209061 docs(s119): session close — Foundation Phases 1-4 complete, STATE + ROA…" | kind=Commit | source=git | neighbors=[feat/foundation-milestone, 6c76106 chore: update ag_diff.txt — pla…] | lang=en
- "commit:repo:github.com/linkstream-hub/central-command@51b349c6b9516781d4d78aca41a593769f997c8e": "51b349c chore(p3-2): add test results artifact" | kind=Commit | source=git | neighbors=[feat/p3-2-time-records-migration, 658624f chore(p3-2): regenerate diff ar…] | lang=en
- "commit:repo:github.com/linkstream-hub/central-command@54c3520d741b9484d54d2cd9db5eb12b9f804cff": "54c3520 chore: close session S143 — Phase 16 execution complete, team structure…" | kind=Commit | source=git | neighbors=[feat/phase-16-execution, 59d38ba chore: stub handleLogin (Phase …] | lang=en
- "commit:repo:github.com/linkstream-hub/central-command@57c59e66ee9969c9682478595d01805d64f6b369": "57c59e6 docs: Phase A email intake hotfix spec + SESSION_STATE phase sequence" | kind=Commit | source=git | neighbors=[464b853 Merge branch 'main' of https://…, docs/phase-a-intake-plan] | lang=pt
- "commit:repo:github.com/linkstream-hub/central-command@702027aee255523d97963fc1541b3cac5abeb1a7": "702027a fix(ci): correct actions/checkout and setup-node to v4 (v6 does not exi…" | kind=Commit | source=git | neighbors=[feat/phase-17-job-state-machine, d38ff89 test: add integration tests and…] | lang=en
- "commit:repo:github.com/linkstream-hub/central-command@738a640aa3796f6af9e38f42a232ddbedd8722aa": "738a640 chore(ci): gate E2E to workflow_dispatch only" | kind=Commit | source=git | neighbors=[feat/phase-20-auth-lint, ce35b66 fix(phase-20): fix remaining Ty…] | lang=en

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\PTOW\1_APT_Central_Command\.graphify\description-instructions\batch-072.json

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
