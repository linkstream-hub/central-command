# Node Description Batch 20 of 49

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

- "commit:repo:github.com/linkstream-hub/central-command@f0c78652a0a1b3fa3c531ffc3dd536dabb59cba8": "f0c7865 docs(phase-25): cutover live — n8n active, GAS stubbed, comms gated sil…" | kind=Commit | source=git | neighbors=[2c89968 feat(phase-25): gate intake com…, feat/phase-28-sentinel-diet, fix/dashboard-stats-semantics, fix/phase-19-env-blocked, 0d3aef2 feat(phase-25): tighten Gmail p…]
- "commit:repo:github.com/linkstream-hub/central-command@f1b30c1092b49c10070004c9cbc405e065131bc7": "f1b30c1 feat(phase-28): Wave 0 sentinel discovery — script + SENTINEL_INVENTORY…" | kind=Commit | source=git | neighbors=[7476d3c feat(28-01): add Railway sentin…, feat/phase-28-sentinel-diet, fix/dashboard-stats-semantics, fix/phase-19-env-blocked, 6e82d0b docs(phase-28): 28-01 Wave 0 co…]
- "commit:repo:github.com/linkstream-hub/central-command@f64c4d310cbff1fe3f1f249fb80e02e110c8856e": "f64c4d3 feat(techpwa): stub doGet and doPost for Phase 18 cutover" | kind=Commit | source=git | neighbors=[811ec93 fix(security): Remove dev-reset…, chore/design-extract-artifacts, feat/phase-18-techpwa-cutover-2, feat/phase-19-code-js-email-migration, 111ab72 feat: migrate email polling to …]
- "commit:repo:github.com/linkstream-hub/central-command@fe45ced7f8f946d029c5bee505e6234e89eaca50": "fe45ced docs: generate project documentation suite (8 docs)" | kind=Commit | source=git | neighbors=[27cd4a0 wip: docs-update complete — 8 d…, feat/phase-28-sentinel-diet, fix/dashboard-stats-semantics, fix/phase-19-env-blocked, 93e7f70 wip: docs-verify-only complete …]
- "compliance_status_route": "route.ts" | kind=code-symbol | source=tech-pwa/src/app/api/dashboard/compliance-status/route.ts:L1 | neighbors=[01bf641 Initial commit — clean history, 7aa872a feat(p3-5): GAS bridge cleanup, af72cae feat(p3-5): GAS bridge cleanup …, GET(), auth.ts]
- "components_techloginview": "TechLoginView.tsx" | kind=code-symbol | source=tech-pwa/src/components/TechLoginView.tsx:L1 | neighbors=[01bf641 Initial commit — clean history, 6e67493 feat(mobile): Wave 3 badge/PIN …, TechLoginView(), TechLoginViewProps, page.tsx]
- "design_extract_output_aptmaintenanceinc_com_motion_tailwind": "aptmaintenanceinc-com-motion.tailwind.js" | kind=code-symbol | source=design-extract-output/aptmaintenanceinc-com-motion.tailwind.js:L1 | neighbors=[01bf641 Initial commit — clean history, 22e0799 chore: remove design extract ar…, eacdcfe Feat/phase 17 techpwa cutover (…, fb73ec0 feat(phase-17): Complete TechPW…, extend]
- "design_extract_output_dispatch_aptmaintenanceinc_com_motion_tailwind": "dispatch-aptmaintenanceinc-com-motion.tailwind.js" | kind=code-symbol | source=design-extract-output/dispatch-aptmaintenanceinc-com-motion.tailwind.js:L1 | neighbors=[01bf641 Initial commit — clean history, 22e0799 chore: remove design extract ar…, eacdcfe Feat/phase 17 techpwa cutover (…, fb73ec0 feat(phase-17): Complete TechPW…, extend]
- "hooks_gsd_update_banner_main": "main()" | kind=code-symbol | source=.claude/hooks/gsd-update-banner.js:L101 | neighbors=[gsd-update-banner.js, buildBannerOutput(), readCache(), recordFailureWarning(), shouldSuppressFailureWarning()]
- "lib_access_codes_computeaccessmerge": "computeAccessMerge()" | kind=code-symbol | source=tech-pwa/src/lib/access-codes.ts:L39 | neighbors=[route.ts, route.ts, access-codes.ts, extractCodes(), access-codes.test.ts]
- "lib_email_escapehtml": "escapeHtml()" | kind=code-symbol | source=tech-pwa/src/lib/email.ts:L113 | neighbors=[email.ts, sendPteCoordinationEmail(), sendRequesterAutoReply(), sendTenantCoordinationEmail(), sendTenantScheduledEmail()]
- "lib_email_getresend": "getResend()" | kind=code-symbol | source=tech-pwa/src/lib/email.ts:L5 | neighbors=[email.ts, sendPteCoordinationEmail(), sendRequesterAutoReply(), sendTenantCoordinationEmail(), sendTenantScheduledEmail()]
- "lib_gmail_client_getgmailclient": "getGmailClient()" | kind=code-symbol | source=tech-pwa/src/lib/gmail-client.ts:L3 | neighbors=[gmail-client.ts, getCurrentHistoryId(), getNewMessages(), getThreadByMessageId(), getThreadMessageIds()]
- "lib_sandbox_store_sandboxaction": "sandboxAction()" | kind=code-symbol | source=tech-pwa/src/lib/sandbox-store.ts:L134 | neighbors=[route.ts, sandbox-store.ts, readStore(), writeStore(), route.ts]
- "lib_schema_shifts": "shifts" | kind=code-symbol | source=tech-pwa/src/lib/schema.ts:L202 | neighbors=[route.ts, schema.ts, route.ts, route.ts, route.ts]
- "lib_tech_session_getshiftsession": "getShiftSession()" | kind=code-symbol | source=tech-pwa/src/lib/tech-session.ts:L19 | neighbors=[ClockedInBar.tsx, page.tsx, page.tsx, tech-session.ts, updateShiftBreak()]
- "lib_utils": "utils.ts" | kind=code-symbol | source=tech-pwa/src/lib/utils.ts:L1 | neighbors=[01bf641 Initial commit — clean history, 57acd08 Merge pull request #2402 from B…, 938c5d6 Fix Tech Roster sync, cache bug…, eb6cbf4 Fix Tech Roster sync, cache bug…, cn()]
- "live_status_route": "route.ts" | kind=code-symbol | source=tech-pwa/src/app/api/dashboard/live-status/route.ts:L1 | neighbors=[01bf641 Initial commit — clean history, 7aa872a feat(p3-5): GAS bridge cleanup, af72cae feat(p3-5): GAS bridge cleanup …, GET(), auth.ts]
- "n8n_export": "export.py" | kind=code-symbol | source=tools/n8n/export.py:L1 | neighbors=[01bf641 Initial commit — clean history, ac7e65d feat(infra): p2-1 infra hardeni…, api_get(), main(), slugify()]
- "scripts_check_neon_statuses": "check-neon-statuses.ts" | kind=code-symbol | source=tech-pwa/scripts/check-neon-statuses.ts:L1 | neighbors=[01bf641 Initial commit — clean history, 57acd08 Merge pull request #2402 from B…, a84fa3d fix(pipeline): un-archive June …, b135e46 fix(pipeline): un-archive June …, main()]
- "scripts_check_neon_wos": "check-neon-wos.ts" | kind=code-symbol | source=tech-pwa/scripts/check-neon-wos.ts:L1 | neighbors=[01bf641 Initial commit — clean history, 57acd08 Merge pull request #2402 from B…, a84fa3d fix(pipeline): un-archive June …, b135e46 fix(pipeline): un-archive June …, main()]
- "scripts_fix_archived_wos": "fix-archived-wos.ts" | kind=code-symbol | source=tech-pwa/scripts/fix-archived-wos.ts:L1 | neighbors=[01bf641 Initial commit — clean history, 57acd08 Merge pull request #2402 from B…, a84fa3d fix(pipeline): un-archive June …, b135e46 fix(pipeline): un-archive June …, main()]
- "scripts_reparse_lapham": "reparse-lapham.ts" | kind=code-symbol | source=tech-pwa/scripts/reparse-lapham.ts:L1 | neighbors=[01bf641 Initial commit — clean history, 57acd08 Merge pull request #2402 from B…, 938c5d6 Fix Tech Roster sync, cache bug…, eb6cbf4 Fix Tech Roster sync, cache bug…, run()]
- "scripts_test_gemini": "test-gemini.ts" | kind=code-symbol | source=tech-pwa/scripts/test-gemini.ts:L1 | neighbors=[01bf641 Initial commit — clean history, 57acd08 Merge pull request #2402 from B…, a84fa3d fix(pipeline): un-archive June …, b135e46 fix(pipeline): un-archive June …, main()]
- "scripts_test_sheets": "test-sheets.js" | kind=code-symbol | source=tech-pwa/scripts/test-sheets.js:L1 | neighbors=[01bf641 Initial commit — clean history, 57acd08 Merge pull request #2402 from B…, 938c5d6 Fix Tech Roster sync, cache bug…, eb6cbf4 Fix Tech Roster sync, cache bug…, fetchSheet()]
- "scripts_test_webhook": "test-webhook.ts" | kind=code-symbol | source=tech-pwa/scripts/test-webhook.ts:L1 | neighbors=[01bf641 Initial commit — clean history, 57acd08 Merge pull request #2402 from B…, a84fa3d fix(pipeline): un-archive June …, b135e46 fix(pipeline): un-archive June …, main()]
- "sentinel_health_index": "index.js" | kind=code-symbol | source=railway/sentinel-health/index.js:L1 | neighbors=[01bf641 Initial commit — clean history, 500f6b5 feat(sprint5): E2E test suite w…, dba30ac Merge pull request #53 from BGB…, pingDashboard(), raiseAlert()]
- "sentinel_stale_job_index": "index.js" | kind=code-symbol | source=railway/sentinel-stale-job/index.js:L1 | neighbors=[01bf641 Initial commit — clean history, apiRequest(), raiseGitHubIssue(), runStaleJobScan(), THRESHOLDS_MS]
- "sentinel_time_anomaly_index": "index.js" | kind=code-symbol | source=railway/sentinel-time-anomaly/index.js:L1 | neighbors=[01bf641 Initial commit — clean history, anthropic, apiRequest(), raiseGitHubIssue(), runAudit()]
- "sentinel_wc_scanner_index": "index.js" | kind=code-symbol | source=railway/sentinel-wc-scanner/index.js:L1 | neighbors=[01bf641 Initial commit — clean history, anthropic, apiRequest(), raiseGitHubIssue(), runWcScan()]
- "side_effects_index_sideeffectexecutor": "SideEffectExecutor" | kind=code-symbol | source=tech-pwa/src/lib/side-effects/index.ts:L1 | neighbors=[job-update.ts, email-executor.ts, event-bus-executor.ts, fake-executor.ts, index.ts]
- "tests_access_codes_test": "access-codes.test.ts" | kind=code-symbol | source=tech-pwa/src/lib/__tests__/access-codes.test.ts:L1 | neighbors=[01bf641 Initial commit — clean history, 2ea94d6 feat(phase-25): Parsing & Intak…, access-codes.ts, computeAccessMerge(), extractCodes()]
- "tests_email_intake_test": "email-intake.test.ts" | kind=code-symbol | source=tech-pwa/src/lib/__tests__/email-intake.test.ts:L1 | neighbors=[01bf641 Initial commit — clean history, 2ea94d6 feat(phase-25): Parsing & Intak…, email.ts, sendRequesterAutoReply(), sendTenantCoordinationEmail()]
- "types_next_auth_d": "next-auth.d.ts" | kind=code-symbol | source=tech-pwa/src/types/next-auth.d.ts:L1 | neighbors=[01bf641 Initial commit — clean history, permissions.ts, StaffPermissions, JWT, Session]
- "weather_route": "route.ts" | kind=code-symbol | source=tech-pwa/src/app/api/weather/route.ts:L1 | neighbors=[01bf641 Initial commit — clean history, 57acd08 Merge pull request #2402 from B…, 938c5d6 Fix Tech Roster sync, cache bug…, eb6cbf4 Fix Tech Roster sync, cache bug…, GET()]
- "app_manifest": "manifest.ts" | kind=code-symbol | source=tech-pwa/src/app/manifest.ts:L1 | neighbors=[manifest(), 01bf641 Initial commit — clean history, 57b506e Merge pull request #73 from BGB…, d6d989d feat(ui): implement sprint 9 ui…]
- "code_addtodispatchqueue": "addToDispatchQueue()" | kind=code-symbol | source=Code.js:L776 | neighbors=[Code.js, isDuplicateJob(), sanitizeAddress(), checkNewLeadEmails()]
- "code_logtosheet": "logToSheet()" | kind=code-symbol | source=Code.js:L899 | neighbors=[Code.js, checkNewLeadEmails(), getNextLeadId(), sanitizeAddress()]
- "code_normalizeaddresskey": "normalizeAddressKey()" | kind=code-symbol | source=Code.js:L1742 | neighbors=[Code.js, flagNewContactsForReview(), isDuplicateJob(), lookupByAddress()]
- "code_sanitizeaddress": "sanitizeAddress()" | kind=code-symbol | source=Code.js:L1138 | neighbors=[Code.js, addToDispatchQueue(), flagNewContactsForReview(), logToSheet()]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\PTOW\1_APT_Central_Command\.graphify\description-instructions\batch-019.json

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
