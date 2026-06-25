# Graph Report - .  (2026-06-25)

## Corpus Check
- Large corpus: 931 files · ~1,396,410 words. Semantic extraction will be expensive (many Claude tokens). Consider running on a subfolder, or use --no-semantic to run AST-only.

## Summary
- 1964 nodes · 14083 edges · 121 communities detected
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 1 edges (avg confidence: 0.8)
- Token cost: 0 input · 0 output
- Edge kinds: ON_BRANCH: 10137 · MODIFIES: 1322 · contains: 879 · PARENT_OF: 736 · imports: 423 · imports_from: 369 · calls: 175 · re_exports: 30 · method: 4 · implements: 3 · references: 2 · conceptually_related_to: 1 · inherits: 1 · semantically_similar_to: 1


## Input Scope
- Requested: auto
- Resolved: committed (source: default-auto)
- Included files: 931 · Candidates: 1313
- Excluded: 8426 untracked · 81295 ignored · 4 sensitive · 5 missing committed
- Recommendation: Use --scope all or graphify.yaml inputs.corpus for a knowledge-base folder.

## Graph Freshness
- Built from Git commit: `95a784e`
- Compare this hash to `git rev-parse HEAD` before trusting freshness-sensitive graph output.
## God Nodes (most connected - your core abstractions)
1. `db` - 60 edges
2. `jobs` - 34 edges
3. `Job` - 29 edges
4. `employees` - 25 edges
5. `dashboardRequest()` - 22 edges
6. `checkNewLeadEmails()` - 19 edges
7. `verifyFieldSession()` - 13 edges
8. `timeRecords` - 11 edges
9. `getSession()` - 9 edges
10. `TechStatus` - 9 edges

## Surprising Connections (you probably didn't know these)
- `GET()` --calls--> `extractEmailAddress()`  [EXTRACTED]
  tech-pwa/src/app/api/jobs/[jobId]/route.ts → tech-pwa/src/app/api/comms/[jobId]/route.ts
- `Clocked In Bar` --calls--> `Tech Session`  [EXTRACTED]
  tech-pwa/src/components/ClockedInBar.tsx → tech-pwa/src/lib/tech-session.ts
- `Job Detail Modal` --calls--> `Dashboard API Client`  [EXTRACTED]
  tech-pwa/src/components/dashboard/JobDetailModal.tsx → tech-pwa/src/lib/dashboard-api.ts
- `Comms Route` --references--> `Database Schema`  [EXTRACTED]
  tech-pwa/src/app/api/comms/[jobId]/route.ts → tech-pwa/src/lib/schema.ts
- `Job Detail Page` --calls--> `Clocked In Bar`  [EXTRACTED]
  tech-pwa/src/app/job/[jobId]/page.tsx → tech-pwa/src/components/ClockedInBar.tsx

## Hyperedges (group relationships)
- **Shift Management** — ClockedInBar, tech_session_ts, tech_pwa_gs [INFERRED 0.85]
- **Dispatch Job Status Workflow** — JobDetailModal, JobQueueTable, live_page [INFERRED 0.85]
- **n8n Workflow Management** — n8n_version_control, n8n_export_script, n8n_import_script, n8n_manifest_json [EXTRACTED 1.00]
- **Lapham Intake Fixtures Group** — lapham_forwarded_fixture, lapham_sameline_fixture, lapham_turnover_fixture [INFERRED 0.90]
- **AI Evaluation Lifecycle** — agent_gsd_domain_researcher, agent_gsd_eval_planner, agent_gsd_eval_auditor [INFERRED 0.85]
- **Planning Phase Tools** — agent_gsd_pattern_mapper, agent_gsd_phase_researcher, agent_gsd_planner, agent_gsd_plan_checker [INFERRED 0.90]
- **Documentation Tools** — agent_gsd_doc_verifier, agent_gsd_doc_writer [INFERRED 0.90]
- **GAS to Next.js Migration** — code_js, tech_pwa_gs, dashboard_api_gs [EXTRACTED 1.00]

## Communities

### Community 0 - "Community 0"
Cohesion: 0.10
Nodes (242): chore/design-extract-artifacts, chore/trigger-prod-deploy, chore/trigger-prod-deploy-2, claude/plan-dispatch-dashboard-BX4AV, dependabot/npm_and_yarn/tech-pwa/all-dependencies-7de26a6757, feat/add-workflow-dispatch, feat/gas-migration-scope, feat/governance-scaffold (+234 more)

### Community 1 - "Community 1"
Cohesion: 0.12
Nodes (213): chore/context-bundle-hook, chore/neon-preview-cleanup, chore/phase-12-merge-sync, chore/s115-session-cleanup, chore/s117-session-close, chore/s121-state-and-spec, chore/s123-session-close, chore/v1.1-milestone-init (+205 more)

### Community 2 - "Community 2"
Cohesion: 0.12
Nodes (73): docs/phase-a-intake-plan, feat/phase-18-event-publishing-seam, feat/phase-19-observability, feat/phase-20-auth-lint, feature/phase-23-lapham-integration, feature/phase-24-tech-roster, fix/email-intake-parse, fix/intake-parse-and-comms (+65 more)

### Community 3 - "Community 3"
Cohesion: 0.06
Nodes (48): feat/phase-17-job-state-machine, hashPin(), POST(), POST(), 1a3868e chore: post phase-17 diff for Claude Code review, 1e45239 feat(domain): add JobStateService — 6-state FSM, TDD-first (Phase 17), 4fa0199 Merge pull request #1003 from BGB-CRB-Holdings/feat/tier-2-5-security-hardening, 702027a fix(ci): correct actions/checkout and setup-node to v4 (v6 does not exist) (+40 more)

### Community 4 - "Community 4"
Cohesion: 0.05
Nodes (57): addToDispatchQueue(), applyClassificationLabels(), applyProcessedLabel(), buildSmartPropertyContext(), buildThreadContext(), checkForMissingEmail(), checkNewLeadEmails(), detectLaphamForm() (+49 more)

### Community 5 - "Community 5"
Cohesion: 0.04
Nodes (38): 042746d docs(session62): Operations/Schedule view specs + session 62 handoff, 17f8236 Sprint 2: Integrated RtS backlog, TechAvailabilityPanel, and canonical semicolon-separated tech assignment workflow., 1cce207 feat(operations): implement operations triage view restructure (Sprint 1), 200e8e1 fix(modal+weekly-schedule): null guard on comms fetch, fallback key for jobless rows, 45487d9 feat(dev): add dev write guard and amber mode banner, 45da6f7 fix(dispatch): session 58 — DnD sourceType, multi-tech UI, draft AI, null guards, 706a717 refactor(ui): resolve JobDetailModal React warnings and unused variables, 72a4316 feat(ui): implement UI backlog sprint (email regex, status dropdowns, branding, sidebar, contrast) (+30 more)

### Community 6 - "Community 6"
Cohesion: 0.05
Nodes (36): 22e0799 chore: remove design extract artifacts from Phase 19 scope, eacdcfe Feat/phase 17 techpwa cutover (#2653), fb73ec0 feat(phase-17): Complete TechPWA cutover, ButtonProps, InputProps, durations, easings, inView (+28 more)

### Community 7 - "Community 7"
Cohesion: 0.05
Nodes (39): ComplianceData, TimeRecord, ManualJobCreateModalProps, PRIORITIES, SERVICE_CATEGORIES, approveTimecard(), buildMockWeekSchedule(), CalendarDispatchEntry (+31 more)

### Community 8 - "Community 8"
Cohesion: 0.04
Nodes (4): fix/remove-vercel-cron, 01bf641 Initial commit — clean history, config, config

### Community 9 - "Community 9"
Cohesion: 0.13
Nodes (44): feat/hotfix-archive-neon, feat/p3-5-gas-bridge-cleanup, 01acaf8 docs: regenerate diff artifact for complete branch comparison, 0275fab ci: remove deploy-vercel.yml workflow to delegate to native Vercel integration, 0d026cf chore(p3-5): regenerate diff artifact — single commit above main, 13b1a4a Merge pull request #62 from BGB-CRB-Holdings/docs/session72-handoff, 18582c4 ci: add Vercel CLI deploy workflow, 1db6df5 feat(sprint6a): inbound reply automation (#58) (+36 more)

### Community 10 - "Community 10"
Cohesion: 0.09
Nodes (27): refactor/c1-job-update-module, 0a622e8 chore(tests): remove console.log, 41b6a57 feat(job-update): Phase 18 event publishing seam, 4e08c33 test(c1): RED tests for JobUpdate.apply() — module deepening, 5ad3849 feat(c1): implement JobUpdate deep module — PATCH route shrinks to 15 lines, 8694875 fix(phase-18): sql encoding, resend integration, n8n credentials, 9514d05 fix(tests): remove dead discord.com passthrough from event-bus test, escapeHtml() (+19 more)

### Community 11 - "Community 11"
Cohesion: 0.10
Nodes (31): AdvanceEvent, ArrivalWindow, ClockInEvent, CompleteEvent, createJobStateService(), JOB_STATE_MACHINE, JobEvent, JobEventType (+23 more)

### Community 12 - "Community 12"
Cohesion: 0.09
Nodes (16): 57acd08 Merge pull request #2402 from BGB-CRB-Holdings/fix-pipeline-and-ui, a84fa3d fix(pipeline): un-archive June WOs, patch n8n AI webhook fallback, add thread backfill script and Tech UI, b135e46 fix(pipeline): un-archive June WOs, patch n8n AI webhook fallback, add thread backfill script and Tech UI, fe0e4e1 chore: add db assignment test scripts, { neon }, sql, { neon }, sql (+8 more)

### Community 13 - "Community 13"
Cohesion: 0.11
Nodes (15): 938c5d6 Fix Tech Roster sync, cache bug, UI, add CONTEXT, eb6cbf4 Fix Tech Roster sync, cache bug, UI, add CONTEXT, GET(), normalizeName(), db, sql, INITIAL_TECHS, extractField() (+7 more)

### Community 14 - "Community 14"
Cohesion: 0.11
Nodes (19): 1f6816a refactor(c4): collapse mapper duplication — delete job-mapper.ts, migrate 3 call sites to mapJob, 4d7ba4d feat(phase-12): Neon-only cutover — sever Sheets reads/writes (NEON-02, NEON-03) (#2655), bdabbf4 fix: correct dashboard stats semantics + delete dead getDispatchData, f24b922 chore: update SESSION_STATE — PR #14 merged, C4 done, n8n import pending, jobsRepository, ManualJobPayload, computeDashboardStats(), mapJob() (+11 more)

### Community 15 - "Community 15"
Cohesion: 0.16
Nodes (31): chore/s97-phase3-architecture-design, chore/s99-closeout, 36249ad feat(sprint4): server-side RtS→Scheduled auto-transition + targeted PATCH for PWA mark-complete, 3fa40c1 docs(claude): complete session 57 issue list — 8 items from Brandon's test, 4431b41 feat(sprint4): type filter chips + assigned tech in work queue rows, 44a3b59 fix(backfill): full-field PATCH coverage + comprehensive backfill script, 46027b1 fix(dispatch): add jobId to all updateJob call sites + TENANT tab null guards, 4744b66 feat(comms): Phase C — replyToThread via Resend + Neon comms_messages write (+23 more)

### Community 16 - "Community 16"
Cohesion: 0.09
Nodes (22): 0f4d6d9 chore(phase2): create verification artifact template + PLAN.md, 1fe925e chore: session close S127 — Playwright baseline complete, drive migration pending, 2572de2 docs(phase2): close verification — 3 pass, 4 fail/blocked, 9 gaps, 42ca9f4 docs(02): capture Phase 2 context — Core Loop Verification, 7044d01 docs(03): create phase 3 gap remediation plans — 3 plans, 2 waves, 79ca7b3 docs(03): research phase gap-remediation domain, 7db2a9c wip: phase-16 paused at inventory complete — 3 cutover blockers documented, 8133164 chore(s117): session close — Phase 2 complete, Phase 3 gap inventory ready (+14 more)

### Community 17 - "Community 17"
Cohesion: 0.07
Nodes (23): 8fbeeb2 feat(phase-28): sentinel diet — migrate Railway sentinels to n8n (#2668), { checkLatestVersion }, fs, { isSemverNewer }, MANAGED_HOOKS, { PACKAGE_NAME }, path, result (+15 more)

### Community 18 - "Community 18"
Cohesion: 0.12
Nodes (16): Clocked In Bar, b0bfd98 feat(tech-pwa): impeccable harden+polish pass on jobs surface, CameraUploadProps, SkeletonCard(), en, Messages, es, Locale (+8 more)

### Community 19 - "Community 19"
Cohesion: 0.09
Nodes (17): accrualRules, clients, commsMessages, dispatcherFeedback, historicalAssignments, inventoryItems, inventoryTransactions, invoiceLineItems (+9 more)

### Community 20 - "Community 20"
Cohesion: 0.08
Nodes (23): accrual_rules, attestations, breaks, clients, dispatcher_feedback, employees, gmail_sync_state, historical_assignments (+15 more)

### Community 21 - "Community 21"
Cohesion: 0.15
Nodes (20): feat/p3-2-time-records-migration, 03878ac fix(dispatch): update suggestTechs payload signature to match backend, 0a62366 chore(deps-dev): bump tailwindcss from 4.2.2 to 4.3.0 in /tech-pwa (#45), 19de58c chore(p3-2): add P3-2 execution spec — time records migration, 1bfef1d feat(p3-2): migration scripts — migrate-time-records + verify-p3-2, 22c933a docs(claude): session 69 → 70 handoff — lean CLAUDE.md + Sprint 6 spec (#55), 30f468f feat: implement Neon write routes for jobs (Phase 2 Sprint 1), 336c3c3 chore(p3-2): add diff artifact for review (+12 more)

### Community 22 - "Community 22"
Cohesion: 0.18
Nodes (13): clearSession(), getSession(), apiCall(), apiGet(), dequeueEvent(), enqueueEvent(), FIELD_POST_ROUTES, flushQueue() (+5 more)

### Community 23 - "Community 23"
Cohesion: 0.19
Nodes (11): 2ea94d6 feat(phase-25): Parsing & Intake Quality — GAS parsing ports, access-sync, comms, n8n intake workflow (#2660), AccessMergeResult, computeAccessMerge(), extractCodes(), detectLaphamForm(), LaphamParseResult, normalizeAddressKey(), fixtureDir (+3 more)

### Community 24 - "Community 24"
Cohesion: 0.15
Nodes (13): buildScheduledJobUpdate(), JobChip(), JobChipProps, getWeekDates(), ScheduleGrid(), ScheduleGridProps, WeekTech, getInitials() (+5 more)

### Community 25 - "Community 25"
Cohesion: 0.22
Nodes (18): chore/s104-session-closeout, 029d955 chore(s104): allow gh pr commands in settings.local.json, 1146671 chore(gas): cosmetic reformat DashboardAPI.gs — no functional changes, 18ddcf8 feat: implement Resend email sends for job status transitions, 3e3f6ee merge(feat/neon-migration-phase2-email): Resend HTML email templates + automation triggers, 40a496b docs(claude): session 66 → 67 handoff, 45cd253 merge(feat/ui-issues-backlog): UI backlog sprint, Comms Phase B, CI cleanup, 6c90df1 chore(ci): strip issue-creation noise, add lean PR check (+10 more)

### Community 26 - "Community 26"
Cohesion: 0.15
Nodes (8): babaa64 chore: S99 session closeout — P3-1 complete, SESSION_STATE ready for S100, d7eb645 feat(p3-1): schema foundation — 28-table Neon schema + techs→employees migration (#818), techsRepository, teardownFixtures(), TEST_JOBS, employees, buildWeekDates(), GET()

### Community 27 - "Community 27"
Cohesion: 0.14
Nodes (9): ToastContext, ToastItem, ToastType, useToast(), STATUS_STYLES, Coords, getCurrentPosition(), TimecardRecord (+1 more)

### Community 28 - "Community 28"
Cohesion: 0.12
Nodes (11): JobQueueTableProps, SortDir, SortIndicatorProps, SortKey, STATUS_LABELS, STATUS_ORDER, STATUS_TRANSITIONS, TYPE_MAP (+3 more)

### Community 29 - "Community 29"
Cohesion: 0.17
Nodes (16): composeStatusline(), evaluateUpdateCache(), formatGsdState(), fs, getConfigValue(), isInstalledAheadOfLatest(), { isSemverNewer }, os (+8 more)

### Community 30 - "Community 30"
Cohesion: 0.13
Nodes (15): Job Queue Table, Summary Cards, 1a1e686 chore: update settings allowlist, 448bb95 chore: dispatch dashboard diff artifact, a5382b6 feat(live): rebuild /live as three-column dispatch dashboard, StatusTab, ComplianceAlert, ComplianceAlertsResponse (+7 more)

### Community 31 - "Community 31"
Cohesion: 0.12
Nodes (15): cacheDir, cacheFile, child, cwd, fs, globalConfigDir, globalVersionFile, homeDir (+7 more)

### Community 32 - "Community 32"
Cohesion: 0.13
Nodes (7): CommandPaletteProps, PRIORITY_COLOR, NOTIF_COLORS, NOTIF_ICON, PAGE_TITLES, Notification, NotificationsResponse

### Community 33 - "Community 33"
Cohesion: 0.19
Nodes (9): submitIntakeForm(), JobInsert, LeadInsert, processIntakePayload(), IntakeFormData, intakeSchema, leadSchema, workOrderSchema (+1 more)

### Community 34 - "Community 34"
Cohesion: 0.17
Nodes (7): 10dfe41 fix(phase-20): resolve TypeScript errors blocking CI, 17fd617 fix(lint): resolve all 41 ESLint errors to zero, 738a640 chore(ci): gate E2E to workflow_dispatch only, ce35b66 fix(phase-20): fix remaining TypeScript errors from type-narrowing changes, DispatchTimelineBoardProps, HOURS, JobAssignmentModalProps

### Community 35 - "Community 35"
Cohesion: 0.18
Nodes (10): AppSidebar(), cn(), NAV_ITEMS, TECH_ROUTES, defaultRoute(), hasAccess(), MODULE_ROUTES, StaffPermissions (+2 more)

### Community 36 - "Community 36"
Cohesion: 0.14
Nodes (10): fs, path, { spawnSync }, stdinTimeout, { tokenize }, ARGUMENT_TAKING_FLAGS, BOOLEAN_FLAGS, isGitSubcommand() (+2 more)

### Community 37 - "Community 37"
Cohesion: 0.15
Nodes (3): pushSubscriptions, SendRoleSchema, { handlers, auth, signIn, signOut }

### Community 38 - "Community 38"
Cohesion: 0.18
Nodes (12): ADDRESSES, CATEGORIES, db, DISTRIBUTION, EMAIL_TYPES, pick(), PRIORITIES, RM_NAMES (+4 more)

### Community 39 - "Community 39"
Cohesion: 0.17
Nodes (6): metadata, viewport, BeforeInstallPromptEvent, Event, ToastProvider(), LocaleProvider()

### Community 40 - "Community 40"
Cohesion: 0.17
Nodes (6): e61f88a fix(security+team): server-side GAS proxy, team view scheduled status, calendar rename, fe2aac9 feat: implement Neon-first PAGA meal premium automation and audit trail, complianceAlerts, JobInsert, TechInsert, TimeRecordInsert

### Community 41 - "Community 41"
Cohesion: 0.26
Nodes (9): apply(), JobUpdateBody, JobUpdateError, JobUpdateSuccess, EmailTrigger, resolveEmailTrigger(), resolveJobStatus(), TransitionContext (+1 more)

### Community 42 - "Community 42"
Cohesion: 0.17
Nodes (11): DispatchDataResponse, FieldStatusEntry, SyncEvent, TechRosterEntry, TechSession, ThreadAttachment, ThreadMessage, TimecardApprovalQueueResponse (+3 more)

### Community 43 - "Community 43"
Cohesion: 0.27
Nodes (5): timeRecordsRepository, ComplianceStatus, evaluateCACompliance(), ShiftDetails, T0

### Community 44 - "Community 44"
Cohesion: 0.22
Nodes (4): KANBAN_COLUMNS, KanbanBoardProps, PRIORITY_CLASS, PRIORITY_LABEL

### Community 45 - "Community 45"
Cohesion: 0.20
Nodes (7): API_HEADERS, FlowResult, fsSync, pathSync, results, todayLA, tomorrowLA

### Community 46 - "Community 46"
Cohesion: 0.29
Nodes (9): buildBannerOutput(), fs, main(), os, { PACKAGE_NAME, updateCacheFileName }, path, readCache(), recordFailureWarning() (+1 more)

### Community 47 - "Community 47"
Cohesion: 0.31
Nodes (8): anthropic, createPR(), fetchClaudeMd(), ghGet(), ghPost(), ghPut(), listExistingSpecs(), server

### Community 48 - "Community 48"
Cohesion: 0.31
Nodes (7): 3bb152f fix(sprint5): scope database wipes to TEST- prefix and remove debug logs, 43f69fc test(sprint5): Sprint 5 verification results and branch diff, 500f6b5 feat(sprint5): E2E test suite with Neon seeding and stable data-attribute selectors, 6043914 ci: add Vercel CLI deploy workflow, dba30ac Merge pull request #53 from BGB-CRB-Holdings/feat/e2e-real-tests, pingDashboard(), raiseAlert()

### Community 49 - "Community 49"
Cohesion: 0.39
Nodes (6): ClockedInBarProps, clearShiftSession(), getShiftSession(), setShiftSession(), ShiftSession, updateShiftBreak()

### Community 50 - "Community 50"
Cohesion: 0.25
Nodes (5): Job Detail Modal, Dashboard API Client, TechCardProps, TechStatus, DaySchedule

### Community 51 - "Community 51"
Cohesion: 0.36
Nodes (6): getDefaultData(), readStore(), sandboxAction(), SandboxData, STORE_PATH, writeStore()

### Community 52 - "Community 52"
Cohesion: 0.42
Nodes (8): buildTechScores(), getInactiveTechNames(), getTechAvailability(), getTodayStr(), loadDurationDefaults(), loadSkillRatings(), loadTechAssignments(), suggestTechsForJob()

### Community 53 - "Community 53"
Cohesion: 0.36
Nodes (6): chore/lean-agent-stack, 43c9034 fix(ui): BottomNav — remove dead tabs, wire real routes only, 5d5026b chore: remove GSD from agent stack, purge archived skills, update docs, dea1c75 chore: update SESSION_STATE to S157 — PR #4 open, lean stack complete, f5c63dc docs(agents): add Codex design brief — design.json, anti-slop rules, skill pointers, BottomNavProps

### Community 54 - "Community 54"
Cohesion: 0.39
Nodes (7): GET(), guardProduction(), handleGet(), handlePost(), MOCK_JOBS, MOCK_TECH, POST()

### Community 55 - "Community 55"
Cohesion: 0.25
Nodes (6): ALL_PATTERNS, INJECTION_PATTERNS, MARKDOWN_LINK_PATTERNS, path, stdinTimeout, SUMMARISATION_PATTERNS

### Community 56 - "Community 56"
Cohesion: 0.25
Nodes (5): fs, path, SPAWNOPT, { spawnSync }, stdinTimeout

### Community 57 - "Community 57"
Cohesion: 0.29
Nodes (1): 7aa872a feat(p3-5): GAS bridge cleanup

### Community 58 - "Community 58"
Cohesion: 0.33
Nodes (3): TechLoginView(), TechLoginViewProps, setSession()

### Community 59 - "Community 59"
Cohesion: 0.47
Nodes (3): 3770cb1 tmp: fix unused imports in triage-audit, 95a784e fix(jobs): normalize legacy statuses in GET /api/jobs; extend triage-audit with cleanup mode, d5886d5 tmp: diagnostic triage-audit endpoint (remove after analysis)

### Community 60 - "Community 60"
Cohesion: 0.33
Nodes (5): 423027f chore(deps): bump react-dom from 19.2.4 to 19.2.6 in /tech-pwa (#43), c6162cc feat(sprint6b): tenant response loop — unread badge and auto-clear (#56), dd60718 chore(deps): bump actions/github-script from 7 to 9 (#51), e1d3de6 chore(deps): bump @sentry/nextjs from 10.51.0 to 10.53.1 in /tech-pwa (#52), compliance_alerts

### Community 61 - "Community 61"
Cohesion: 0.33
Nodes (5): 48540a0 feat(schedule): lock-and-send API + schema migration + confirmation screen, 4a4b8b2 chore: sr-01-03 diff artifact, 83b1277 chore: session close S132 — Wave 2b merged, sentinel-health deleted, b52653d fix(ci): prefer-const phoneMap + remove unused index import, ca1117e chore: test results for sr-01-03

### Community 62 - "Community 62"
Cohesion: 0.33
Nodes (5): comms_messages, job_comments, jobs, techs, time_records

### Community 63 - "Community 63"
Cohesion: 0.33
Nodes (5): fs, os, path, { spawn }, stdinTimeout

### Community 64 - "Community 64"
Cohesion: 0.40
Nodes (4): 64760e1 fix(drizzle): commit _journal.json alongside 0005_cloudy_nitro migration, 65edec3 Merge branch 'main' into feat/foundation-phase6-drizzle-fix, 989514d fix(job-comments): add sheetsId dedup key — prevent lazy-backfill duplicates, ea82854 feat(foundation): phases 9-11 — n8n error handling, GAS migration scope, shadow-writes inventory

### Community 65 - "Community 65"
Cohesion: 0.40
Nodes (3): DURATION_OPTIONS, ManualScheduleModalProps, TIME_OPTIONS

### Community 66 - "Community 66"
Cohesion: 0.40
Nodes (3): FlowResult, fsSync, pathSync

### Community 67 - "Community 67"
Cohesion: 0.50
Nodes (3): extractEmailFromSender(), jobSchema, POST()

### Community 68 - "Community 68"
Cohesion: 0.60
Nodes (4): apiRequest(), raiseGitHubIssue(), runStaleJobScan(), THRESHOLDS_MS

### Community 69 - "Community 69"
Cohesion: 0.60
Nodes (4): anthropic, apiRequest(), raiseGitHubIssue(), runAudit()

### Community 70 - "Community 70"
Cohesion: 0.60
Nodes (4): anthropic, apiRequest(), raiseGitHubIssue(), runWcScan()

### Community 71 - "Community 71"
Cohesion: 0.50
Nodes (2): ActivityEvent, ActivityFeedProps

### Community 72 - "Community 72"
Cohesion: 0.83
Nodes (3): api_get(), main(), slugify()

### Community 73 - "Community 73"
Cohesion: 0.67
Nodes (3): db, main(), sql

### Community 74 - "Community 74"
Cohesion: 0.50
Nodes (1): { request }

### Community 75 - "Community 75"
Cohesion: 0.67
Nodes (3): ALLOWED_ORIGINS, corsHeaders(), fetch()

### Community 76 - "Community 76"
Cohesion: 0.67
Nodes (3): ALLOWED_ORIGINS, corsHeaders(), fetch()

### Community 77 - "Community 77"
Cohesion: 0.50
Nodes (3): nextConfig, sentryConfig, withPWA

### Community 78 - "Community 78"
Cohesion: 0.67
Nodes (1): DateNavigationProps

### Community 80 - "Community 80"
Cohesion: 1.00
Nodes (2): api_post(), main()

### Community 81 - "Community 81"
Cohesion: 1.00
Nodes (2): fetch_data(), main()

### Community 82 - "Community 82"
Cohesion: 1.00
Nodes (2): normalizeAddressKey(), run()

### Community 83 - "Community 83"
Cohesion: 1.00
Nodes (2): normalizeAddressKey(), run()

### Community 84 - "Community 84"
Cohesion: 0.67
Nodes (1): MIGRATION

### Community 85 - "Community 85"
Cohesion: 1.00
Nodes (2): Comms Route, Database Schema

### Community 86 - "Community 86"
Cohesion: 1.00
Nodes (2): EventBus Module, JobStateService

### Community 87 - "Community 87"
Cohesion: 1.00
Nodes (1): ADR-001 (Dual Auth Architecture)

### Community 88 - "Community 88"
Cohesion: 1.00
Nodes (1): ADR-002 (Neon Postgres)

### Community 89 - "Community 89"
Cohesion: 1.00
Nodes (1): ADR-004 (Work Order Lifecycle)

### Community 90 - "Community 90"
Cohesion: 1.00
Nodes (1): ADR-005 (Multi-Tenancy)

### Community 91 - "Community 91"
Cohesion: 1.00
Nodes (1): Dispatch Battle Test Spec

### Community 92 - "Community 92"
Cohesion: 1.00
Nodes (1): Dispatch Excellence Spec

### Community 93 - "Community 93"
Cohesion: 1.00
Nodes (1): Dispatch Polish Spec

### Community 94 - "Community 94"
Cohesion: 1.00
Nodes (1): Dispatcher Feedback System Spec

### Community 95 - "Community 95"
Cohesion: 1.00
Nodes (1): Google Auth Spec

### Community 96 - "Community 96"
Cohesion: 1.00
Nodes (1): HR Permissions and Deploy Spec

### Community 97 - "Community 97"
Cohesion: 1.00
Nodes (1): Tech PWA I18n Spec

### Community 98 - "Community 98"
Cohesion: 1.00
Nodes (1): Job Comments Spec

### Community 99 - "Community 99"
Cohesion: 1.00
Nodes (1): Kill Sync Spec

### Community 100 - "Community 100"
Cohesion: 1.00
Nodes (1): App Sidebar

### Community 101 - "Community 101"
Cohesion: 1.00
Nodes (1): computeDashboardStats

### Community 102 - "Community 102"
Cohesion: 1.00
Nodes (1): AI-SPEC.md

### Community 103 - "Community 103"
Cohesion: 1.00
Nodes (1): EVAL-REVIEW.md

### Community 104 - "Community 104"
Cohesion: 1.00
Nodes (1): PATTERNS.md

### Community 105 - "Community 105"
Cohesion: 1.00
Nodes (1): PLAN.md

### Community 106 - "Community 106"
Cohesion: 1.00
Nodes (1): RESEARCH.md

### Community 108 - "Community 108"
Cohesion: 1.00
Nodes (1): hr/page.tsx

### Community 110 - "Community 110"
Cohesion: 1.00
Nodes (1): job/[jobId]/page.tsx

### Community 115 - "Community 115"
Cohesion: 1.00
Nodes (1): time-off/page.tsx

### Community 116 - "Community 116"
Cohesion: 1.00
Nodes (1): weekly-schedule/page.tsx

### Community 117 - "Community 117"
Cohesion: 1.00
Nodes (1): Globe Icon (SVG)

### Community 118 - "Community 118"
Cohesion: 1.00
Nodes (1): APT Maintenance Logo

### Community 119 - "Community 119"
Cohesion: 1.00
Nodes (1): n8n Version Control

### Community 120 - "Community 120"
Cohesion: 1.00
Nodes (1): Next.js Logo

### Community 121 - "Community 121"
Cohesion: 1.00
Nodes (1): Schedule Page Components

### Community 122 - "Community 122"
Cohesion: 1.00
Nodes (1): Sentinel Spec Architect

### Community 123 - "Community 123"
Cohesion: 1.00
Nodes (1): SPRINT P3-5 GAS Bridge Cleanup

### Community 124 - "Community 124"
Cohesion: 1.00
Nodes (1): SPRINT TIER 2.5 Security

### Community 125 - "Community 125"
Cohesion: 1.00
Nodes (1): TECH PWA API Spec

### Community 126 - "Community 126"
Cohesion: 1.00
Nodes (1): Vercel Logo

### Community 128 - "Community 128"
Cohesion: 1.00
Nodes (1): Window Icon

## Knowledge Gaps
- **391 isolated node(s):** `fs`, `path`, `{ isSemverNewer }`, `{ checkLatestVersion }`, `{ PACKAGE_NAME }` (+386 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **Thin community `Community 57`** (1 nodes): `7aa872a feat(p3-5): GAS bridge cleanup`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 71`** (2 nodes): `ActivityEvent`, `ActivityFeedProps`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 74`** (1 nodes): `{ request }`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 78`** (1 nodes): `DateNavigationProps`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 80`** (2 nodes): `api_post()`, `main()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 81`** (2 nodes): `fetch_data()`, `main()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 82`** (2 nodes): `normalizeAddressKey()`, `run()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 83`** (2 nodes): `normalizeAddressKey()`, `run()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 84`** (1 nodes): `MIGRATION`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 85`** (2 nodes): `Comms Route`, `Database Schema`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 86`** (2 nodes): `EventBus Module`, `JobStateService`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 87`** (1 nodes): `ADR-001 (Dual Auth Architecture)`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 88`** (1 nodes): `ADR-002 (Neon Postgres)`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 89`** (1 nodes): `ADR-004 (Work Order Lifecycle)`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 90`** (1 nodes): `ADR-005 (Multi-Tenancy)`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 91`** (1 nodes): `Dispatch Battle Test Spec`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 92`** (1 nodes): `Dispatch Excellence Spec`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 93`** (1 nodes): `Dispatch Polish Spec`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 94`** (1 nodes): `Dispatcher Feedback System Spec`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 95`** (1 nodes): `Google Auth Spec`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 96`** (1 nodes): `HR Permissions and Deploy Spec`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 97`** (1 nodes): `Tech PWA I18n Spec`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 98`** (1 nodes): `Job Comments Spec`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 99`** (1 nodes): `Kill Sync Spec`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 100`** (1 nodes): `App Sidebar`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 101`** (1 nodes): `computeDashboardStats`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 102`** (1 nodes): `AI-SPEC.md`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 103`** (1 nodes): `EVAL-REVIEW.md`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 104`** (1 nodes): `PATTERNS.md`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 105`** (1 nodes): `PLAN.md`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 106`** (1 nodes): `RESEARCH.md`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 108`** (1 nodes): `hr/page.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 110`** (1 nodes): `job/[jobId]/page.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 115`** (1 nodes): `time-off/page.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 116`** (1 nodes): `weekly-schedule/page.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 117`** (1 nodes): `Globe Icon (SVG)`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 118`** (1 nodes): `APT Maintenance Logo`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 119`** (1 nodes): `n8n Version Control`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 120`** (1 nodes): `Next.js Logo`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 121`** (1 nodes): `Schedule Page Components`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 122`** (1 nodes): `Sentinel Spec Architect`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 123`** (1 nodes): `SPRINT P3-5 GAS Bridge Cleanup`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 124`** (1 nodes): `SPRINT TIER 2.5 Security`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 125`** (1 nodes): `TECH PWA API Spec`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 126`** (1 nodes): `Vercel Logo`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 128`** (1 nodes): `Window Icon`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `db` connect `Community 13` to `Community 23`, `Community 37`, `Community 3`, `Community 14`, `Community 26`, `Community 43`, `Community 2`, `Community 19`, `Community 33`, `Community 41`, `Community 12`, `Community 74`, `Community 10`, `Community 4`, `Community 40`?**
  _High betweenness centrality (0.004) - this node is a cross-community bridge._
- **Why does `Job` connect `Community 24` to `Community 14`, `Community 71`, `Community 32`, `Community 34`, `Community 5`, `Community 28`, `Community 44`, `Community 65`, `Community 50`, `Community 27`, `Community 18`, `Community 7`, `Community 42`, `Community 30`, `Community 26`?**
  _High betweenness centrality (0.003) - this node is a cross-community bridge._
- **Why does `jobs` connect `Community 14` to `Community 37`, `Community 3`, `Community 13`, `Community 26`, `Community 2`, `Community 33`, `Community 41`, `Community 19`, `Community 12`, `Community 38`, `Community 4`, `Community 40`, `Community 10`?**
  _High betweenness centrality (0.002) - this node is a cross-community bridge._
- **What connects `fs`, `path`, `{ isSemverNewer }` to the rest of the system?**
  _391 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Community 0` be split into smaller, more focused modules?**
  _Cohesion score 0.09651299464542248 - nodes in this community are weakly interconnected._
- **Should `Community 1` be split into smaller, more focused modules?**
  _Cohesion score 0.12433940726334926 - nodes in this community are weakly interconnected._
- **Should `Community 2` be split into smaller, more focused modules?**
  _Cohesion score 0.12341772151898735 - nodes in this community are weakly interconnected._