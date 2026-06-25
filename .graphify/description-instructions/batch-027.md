# Node Description Batch 28 of 49

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

- "scripts_verify_p3_2": "verify-p3-2.ts" | kind=code-symbol | source=tech-pwa/scripts/verify-p3-2.ts:L1 | neighbors=[01bf641 Initial commit — clean history, 1bfef1d feat(p3-2): migration scripts —…, 24cd71e feat(p3-2): time records migrat…] | lang=en
- "sentinel_stale_job_index_runstalejobscan": "runStaleJobScan()" | kind=code-symbol | source=railway/sentinel-stale-job/index.js:L43 | neighbors=[index.js, apiRequest(), raiseGitHubIssue()] | lang=en
- "sentinel_time_anomaly_index_runaudit": "runAudit()" | kind=code-symbol | source=railway/sentinel-time-anomaly/index.js:L38 | neighbors=[index.js, apiRequest(), raiseGitHubIssue()] | lang=en
- "sentinel_wc_scanner_index_runwcscan": "runWcScan()" | kind=code-symbol | source=railway/sentinel-wc-scanner/index.js:L38 | neighbors=[index.js, apiRequest(), raiseGitHubIssue()] | lang=en
- "side_effects_email_executor_emailsideeffectexecutor": "EmailSideEffectExecutor" | kind=code-symbol | source=tech-pwa/src/lib/side-effects/email-executor.ts:L5 | neighbors=[email-executor.ts, .execute(), SideEffectExecutor] | lang=en
- "src_proxy": "proxy.ts" | kind=code-symbol | source=tech-pwa/src/proxy.ts:L1 | neighbors=[01bf641 Initial commit — clean history, config, proxy()] | lang=en
- "subscribe_route": "route.ts" | kind=code-symbol | source=tech-pwa/src/app/api/push/subscribe/route.ts:L1 | neighbors=[01bf641 Initial commit — clean history, e61f88a fix(security+team): server-side…, POST()] | lang=en
- "suggesttechs_buildtechscores": "buildTechScores()" | kind=code-symbol | source=SuggestTechs.js:L93 | neighbors=[SuggestTechs.js, loadSkillRatings(), suggestTechsForJob()] | lang=en
- "tech_pwa_sentry_client_config": "sentry.client.config.ts" | kind=code-symbol | source=tech-pwa/sentry.client.config.ts:L1 | neighbors=[01bf641 Initial commit — clean history, 9ad6303 feat(p1): Professional Infrastr…, c94407e Merge remote-tracking branch 'o…] | lang=en
- "tech_pwa_sentry_edge_config": "sentry.edge.config.ts" | kind=code-symbol | source=tech-pwa/sentry.edge.config.ts:L1 | neighbors=[01bf641 Initial commit — clean history, 9ad6303 feat(p1): Professional Infrastr…, c94407e Merge remote-tracking branch 'o…] | lang=en
- "tech_pwa_sentry_server_config": "sentry.server.config.ts" | kind=code-symbol | source=tech-pwa/sentry.server.config.ts:L1 | neighbors=[01bf641 Initial commit — clean history, 9ad6303 feat(p1): Professional Infrastr…, c94407e Merge remote-tracking branch 'o…] | lang=en
- "tests_intake_processor_test": "intake-processor.test.ts" | kind=code-symbol | source=tech-pwa/src/lib/__tests__/intake-processor.test.ts:L1 | neighbors=[01bf641 Initial commit — clean history, intake-processor.ts, processIntakePayload()] | lang=en
- "tests_kanbanboard_test": "KanbanBoard.test.ts" | kind=code-symbol | source=tech-pwa/src/components/dashboard/__tests__/KanbanBoard.test.ts:L1 | neighbors=[5d0ae0d feat(ui): phase 22 surgical fix…, KanbanBoard.tsx, KANBAN_COLUMNS] | lang=en
- "app_global_error": "global-error.tsx" | kind=code-symbol | source=tech-pwa/src/app/global-error.tsx:L1 | neighbors=[GlobalError(), 01bf641 Initial commit — clean history] | lang=en
- "branch:repo:github.com/linkstream-hub/central-command#fix/remove-vercel-cron": "fix/remove-vercel-cron" | kind=Branch | source=git | neighbors=[01bf641 Initial commit — clean history, 9c89835 chore: remove every-minute cron…] | lang=en
- "change_pin_route_hashpin": "hashPin()" | kind=code-symbol | source=tech-pwa/src/app/api/field/auth/change-pin/route.ts:L11 | neighbors=[route.ts, POST()] | lang=en
- "change_pin_route_post": "POST()" | kind=code-symbol | source=tech-pwa/src/app/api/field/auth/change-pin/route.ts:L15 | neighbors=[route.ts, hashPin()] | lang=en
- "clock_in_route_post": "POST()" | kind=code-symbol | source=tech-pwa/src/app/api/field/clock-in/route.ts:L12 | neighbors=[route.ts, route.test.ts] | lang=en
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
- "commit:repo:github.com/linkstream-hub/central-command@029d955ce03ba41bb1597934959f0f26588ec755": "029d955 chore(s104): allow gh pr commands in settings.local.json" | kind=Commit | source=git | neighbors=[chore/s104-session-closeout, b1606b1 chore(s104): session closeout —…] | lang=en
- "commit:repo:github.com/linkstream-hub/central-command@0cd93d527b135fd79681ba218602e3a22bea642a": "0cd93d5 chore: wire context_bundle.ps1 UserPromptSubmit hook + sync phase-12 st…" | kind=Commit | source=git | neighbors=[chore/context-bundle-hook, 8ae235b feat(phase-12): data integrity …] | lang=en
- "commit:repo:github.com/linkstream-hub/central-command@13bcd0ede98af3408d36f8b0624989f00d0adddf": "13bcd0e security: remove html.txt export, add to gitignore" | kind=Commit | source=git | neighbors=[0d3dd7b chore: lean agent stack — remov…, fix/remove-leaked-html-file] | lang=en
- "commit:repo:github.com/linkstream-hub/central-command@143a13a85541ff239ef24fa194e60f0ba9c2e98f": "143a13a chore(s117): session close — Phase 1 planned, AG executing archive-stal…" | kind=Commit | source=git | neighbors=[feat/s115-dispatch-flow, da39104 chore: add GSD skill permission…] | lang=pt

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\PTOW\1_APT_Central_Command\.graphify\description-instructions\batch-027.json

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
