# PROFESSIONAL BASELINE — APT CENTRAL COMMAND
# Gap analysis against professional dev team standard.
# P1 = blocking (fix before next sprint). P2 = scheduled (within 30 days). P3 = tracked backlog.
# This document is also the template for all other PTOW projects.
# Last updated: 2026-05-18

---

## WHAT "PROFESSIONAL BASELINE" MEANS FOR THIS TEAM

Professional dev team standard for a team of this size (2 builders + 1 reviewer) means:
- Nothing fails silently in production
- Any breakage is caught before it reaches `main`
- Secrets are managed with rotation and access control
- A new person can run the system from documentation alone
- The system can survive its builders being unavailable for 48 hours

This is not "FAANG engineering." It's the floor for a live production system with real clients.

---

## DIMENSION 1 — CI/CD

### Current State
| Check | On Every PR | Notes |
|---|---|---|
| TypeScript (`tsc --noEmit`) | ✅ | `ci.yml` |
| ESLint | ✅ | `ci.yml` |
| Next.js build | ✅ | `ci.yml` |
| Playwright E2E | ✅ | `e2e.yml` — all PRs touching `tech-pwa/**` |
| Vercel preview deploy | ✅ | Native Vercel integration |
| Apps Script auto-deploy (DashboardAPI + TechPWA) | ✅ | `deploy-apps-script.yml` |
| Database migration dry-run | ❌ | No migration validation in CI |
| `npm audit` (dependency vulnerabilities) | ❌ | Not in any workflow |
| Dependabot | ❌ | No `.github/dependabot.yml` |
| Code.js deploy | ⚠️ | Manual only (correct — has email triggers). No PR review step. |
| Scheduled nightly E2E | ❌ | E2E runs on PR only. No regression baseline. |
| n8n/Flowise version control | ❌ | Workflows exist on Railway only — no export in CI |

### Gaps

| Gap | Priority | Fix |
|---|---|---|
| No `npm audit` in CI | ~~**P2**~~ ✅ DONE | `npm audit --audit-level=high` added to `ci.yml`. Fails PR on HIGH/CRITICAL CVE. |
| No Dependabot | ~~**P2**~~ ✅ DONE | `.github/dependabot.yml` confirmed — weekly npm + GH Actions updates. Major versions blocked. |
| No scheduled nightly E2E | ~~**P2**~~ ✅ DONE | `schedule: cron: '0 6 * * 1-5'` added to `e2e.yml`. Runs Mon–Fri 6am UTC. |
| No database migration dry-run | **P2** | When Drizzle migrations exist, add `drizzle-kit check` step to CI before deploy. |
| n8n/Flowise not version-controlled | **P2** | Export all n8n workflows to JSON and Flowise flows to JSON. Commit to `workflow-exports/`. Re-export on every change. |
| Code.js has no PR review gate | **P3** | Require Code.js changes to be reviewed by Claude Code before clasp push. Low urgency — manual deploy is already enforced. |

---

## DIMENSION 2 — OBSERVABILITY

### Current State
| Component | Error Tracking | Alerting | Notes |
|---|---|---|---|
| Next.js (CC2.0) | ⚠️ Sentry configured in PR #75 | ❌ | Event ID unverified — PR #75 block. No alert rules set. |
| Code.js (Lead Parsing) | ❌ | ❌ | `Logger.log()` only — silent failures, manual review required |
| DashboardAPI.gs | ⚠️ | ⚠️ | Sends error email to brandon@ on uncaught exceptions. Better than nothing, but no structured log. |
| TechPWA.gs | ❌ | ❌ | `Logger.log()` only |
| Railway Sentinels | ✅ 5 online | ✅ Write-back to SentinelLog | health, time-anomaly, wc-scanner, stale-job, spec-architect |
| Vercel | ✅ | ✅ | Deploy failure emails native |
| Production uptime | ❌ | ❌ | No external monitor for dispatch.aptmaintenanceinc.com |
| Performance (Core Web Vitals) | ❌ | ❌ | No Vercel Speed Insights, no Lighthouse CI |

### Gaps

| Gap | Priority | Fix |
|---|---|---|
| No uptime monitoring for dispatch.aptmaintenanceinc.com | ~~**P1**~~ ✅ DONE | UptimeRobot active — two alerts configured (session 84). |
| Sentry event ID unverified (PR #75) | ~~**P1**~~ ✅ DONE | PR #75 merged. Event ID 841e3315074645d2a32687c0f931b305 confirmed. |
| Code.js silent failures | ~~**P2**~~ ✅ DONE | `checkNewLeadEmails()` has top-level try/catch — `GmailApp.sendEmail('brandon@...')` on exception. Verified Code.js:164. |
| TechPWA.gs silent failures | ~~**P2**~~ ✅ DONE | `doPost()` has top-level try/catch — `GmailApp.sendEmail('brandon@...')` on exception. Verified TechPWA.gs:220. |
| No Sentry alert rules configured | ~~**P2**~~ ✅ DONE | Two Sentry alert rules configured (session 84). |
| No Core Web Vitals tracking | **P3** | Add Vercel Speed Insights (`@vercel/speed-insights`) — one import, zero config. |

---

## DIMENSION 3 — TESTING

### Current State
| Type | Coverage | Files |
|---|---|---|
| E2E (Playwright) | Auth, dispatch, scheduling, tech PWA, tenant loop, accessibility | 6 spec files |
| Unit tests | ❌ None | — |
| Snapshot tests | ❌ None | — |
| API contract tests | ❌ None | — |
| GAS unit tests | ❌ None | — |

### What the E2E Suite Covers (confirmed)
- Login flows: Google OAuth (dev bypass), badge+PIN, unauthorized redirect
- Dispatch queue load, job modal open
- Scheduling page
- Tech PWA flows: login, job list
- Tenant loop (tenant self-schedule)
- Accessibility (axe-core)

### Critical Untested Business Logic
| Logic | Risk | Why It Matters |
|---|---|---|
| PAGA meal premium calculation | **P1** | CA legal exposure — every pay period without verified math accrues liability. Wrong math = class action exposure. |
| Status transition rules | **P2** | No guard that blocks illegal transitions (e.g., Scheduled without tech assigned). Untested behavior. |
| `isDuplicateJob()` dedup check | **P2** | Silent failure = duplicate WOs. Unit-testable, zero dependencies. |
| `shouldSkipEmail()` filter | **P2** | Determines what Code.js ignores. Wrong filter = dropped or phantom WOs. |
| Session token generation + validation | **P2** | Tech auth. No test confirms a tampered token is rejected. |
| `normalizeAddressKey()` + address sanitization | **P3** | Data integrity for address matching. Easy to unit test. |

### Gaps

| Gap | Priority | Fix |
|---|---|---|
| No unit tests for PAGA math | **P1** | Add Vitest (zero config with Next.js). Write unit tests for meal premium calculation against CA Labor Code §226.7 thresholds. Must cover: 5-hour meal window, 10-hour second meal, 30-min rest break intervals. |
| No unit tests for dedup, filter, and address logic | ~~**P2**~~ ✅ DONE | `resolveJobStatus` + `resolveEmailTrigger` extracted from route.ts and tested. GAS functions (isDuplicateJob, shouldSkipEmail) deferred — no viable GAS test framework today. |
| No unit tests for status transitions | ~~**P2**~~ ✅ DONE | 16+ tests in `job-transitions.test.ts` covering auto-transition and email trigger rules. |
| E2E workers: 1, no parallelism | **P3** | `playwright.config.ts` has `workers: 1` and `fullyParallel: false`. Fine for now but will slow down as suite grows. |

---

## DIMENSION 4 — DEPLOYMENT SAFETY

### Current State
| Capability | Status | Notes |
|---|---|---|
| Staging environment | ❌ | `main` is the only target. Production is the test environment. |
| Vercel preview URLs | ✅ | Frontend-only — no backend staging behind it |
| Neon staging branch | ❌ | Only dev branch. CI uses `DATABASE_URL_TEST` secret — contents unknown. |
| Database migration safety | ⚠️ | Drizzle ORM, manual `migrate.ts` script. No migration in CI. |
| Next.js rollback | ✅ | Vercel instant rollback to previous deployment |
| Apps Script rollback | ⚠️ | Previous deployment IDs exist in GAS console but no documented procedure |
| Code.js rollback | ⚠️ | Same — manual, undocumented |
| Deploy-on-merge gate | ✅ | CI must pass before Vercel deploys |

### Gaps

| Gap | Priority | Fix |
|---|---|---|
| No staging environment | ~~**P1**~~ ✅ DONE | Neon `preview` branch wired to Vercel Preview DATABASE_URL. |
| No rollback runbook | **P1** | Document in `docs/RUNBOOK.md`: how to rollback Next.js (Vercel UI), DashboardAPI.gs (clasp redeploy previous), TechPWA.gs, Code.js. 30-minute write. |
| Database migrations not in CI | **P2** | When next Drizzle migration runs: add migration check to CI. `drizzle-kit check` fails PR if schema drift detected. |
| `DATABASE_URL_TEST` contents unclear | **P2** | Confirm this is a real Neon staging/test branch, not dev or prod. Document in SESSION_STATE.md. |

---

## DIMENSION 5 — SECRET MANAGEMENT

### Current State
| Secret | Where Stored | Last Rotated | Access |
|---|---|---|---|
| `DASHBOARD_API_KEY` | Vercel env + GAS Script Property | Session 71 (rotated after AG exposed in session 68) | Brandon (Vercel dashboard) |
| `AUTH_SECRET` / `NEXTAUTH_SECRET` | Vercel env | Unknown | Brandon |
| `DATABASE_URL` | Vercel env | Unknown (Neon-managed) | Brandon |
| `RESEND_API_KEY` | Vercel env | Unknown | Brandon |
| `GEMINI_API_KEY` | GAS Script Property | Unknown | Brandon |
| `E2E_AUTH_SECRET` | GitHub Actions secrets | Unknown | GitHub org admins |
| `DATABASE_URL_TEST` | GitHub Actions secrets | Unknown | GitHub org admins |
| Tech session tokens | Tech Roster col M (Sheets) | Per-login | No rotation — long-lived |
| TechPWA.gs URL (via CF Worker) | Cloudflare Worker env | Unknown | Brandon |

### Gaps

| Gap | Priority | Fix |
|---|---|---|
| `DASHBOARD_API_KEY` may have been exposed (PR #75 block 1) | **P1** | AG must confirm. If exposed: rotate immediately in Vercel (Brandon) + GAS Script Property (Brandon). |
| Tech session tokens stored plain in Sheets | ~~**P1**~~ ✅ DONE | SHA-256 hashing confirmed in TechPWA.gs:972. Sheet audited session 84. |
| No rotation schedule for any secret | ~~**P2**~~ ✅ DONE | Full rotation schedule documented in `docs/RUNBOOK.md` — SECRET ROTATION SCHEDULE table covers all secrets with when/how. |
| `NEXT_PUBLIC_DASHBOARD_API_KEY` is client-side in push/subscribe/route.ts | **P2** | This should be a server-only env var (`DASHBOARD_API_KEY`) since it's in an API route. PR #75 should address this — verify in diff. |
| No audit log of who accessed which secrets | **P3** | Vercel and GAS don't provide this natively. Acceptable for now; document the gap. |

---

## DIMENSION 6 — DOCUMENTATION CURRENCY

### Current State
| Document | Status | Last Verified |
|---|---|---|
| `docs/ARCHITECTURE.md` | ✅ Comprehensive | 2026-05-12 |
| `docs/SHEETS_SCHEMA.md` | ✅ | Session 55 |
| `docs/SPRINT_STANDARDS.md` | ✅ | Active maintenance |
| `specs/TECH_PWA_API_SPEC.md` | ⚠️ | Unknown — may drift |
| n8n workflow documentation | ❌ | Not documented |
| Flowise flow documentation | ❌ | Not documented |
| Incident runbook | ❌ | Does not exist |
| Apps Script trigger inventory | ❌ | No canonical list |
| `ARCHITECTURE.md` version discrepancy | ⚠️ | File says Code.js v79; CLAUDE.md says v81 |

### Gaps

| Gap | Priority | Fix |
|---|---|---|
| No incident runbook | **P1** | Create `docs/RUNBOOK.md`. Minimum sections: "Code.js stops parsing," "Dashboard goes blank," "Neon unreachable," "Vercel deploy fails," "Tech PWA returns 500." Each section: symptoms, diagnosis steps, rollback steps. |
| `ARCHITECTURE.md` Code.js version discrepancy | **P2** | File says v79, CLAUDE.md says v81. Verify current deployed version via clasp, update ARCHITECTURE.md. |
| n8n/Flowise not documented | **P2** | Export all flows to JSON and commit. Add one-paragraph description per workflow in ARCHITECTURE.md. |
| Apps Script trigger inventory | ~~**P2**~~ ✅ DONE | 3 active triggers documented in ARCHITECTURE.md. Backfill trigger flagged for manual deletion check. |
| API spec drift | **P3** | `specs/TECH_PWA_API_SPEC.md` — verify against live code on each sprint that adds/changes an endpoint. Add to sprint DoD. |

---

## DIMENSION 7 — DEPENDENCY HYGIENE

### Current State
| Check | Status | Notes |
|---|---|---|
| Dependabot | ❌ | Not configured |
| `npm audit` in CI | ❌ | Not run |
| `legacy-peer-deps=true` | ⚠️ | `.npmrc` — peer dependency conflict papering. Known tech debt. |
| Node.js version pinned | ✅ | CI uses Node 20 |
| GAS library versions | ⚠️ | Not tracked — GAS auto-updates some libraries |

### Gaps

| Gap | Priority | Fix |
|---|---|---|
| No Dependabot | **P2** | `.github/dependabot.yml` — weekly PRs for npm + GH Actions. Configure auto-merge for patch updates only. |
| No `npm audit` in CI | **P2** | `npm audit --audit-level=high` in `ci.yml`. Fail on high-severity only. |
| `legacy-peer-deps` | **P3** | Investigate root cause (likely `@ducanh2912/next-pwa` compatibility). Schedule resolution when next major Next.js upgrade occurs. |

---

## DIMENSION 8 — INCIDENT RESPONSE

### Current State
No incident runbook exists. No documented on-call. No SLO. Brandon is de facto on-call for all components.

### Gaps

| Gap | Priority | Fix |
|---|---|---|
| No runbook | **P1** | `docs/RUNBOOK.md` — see Documentation section |
| No uptime SLO defined | **P2** | Define: "dispatch.aptmaintenanceinc.com available M-F 6am-8pm PT" as the SLO. Document in ARCHITECTURE.md. Gives monitoring a target. |
| No backup contact if Brandon unavailable | **P3** | Document who can access Vercel, GAS console, Railway, Cloudflare in an emergency. |

---

## CONSOLIDATED REMEDIATION ROADMAP

### P1 — Fix Before Next Sprint (blocking)

| # | Gap | Owner | Effort |
|---|---|---|---|
| ~~P1-1~~ | ~~Uptime monitor for dispatch.aptmaintenanceinc.com~~ | ~~Brandon~~ | ✅ DONE session 84 |
| ~~P1-2~~ | ~~DASHBOARD_API_KEY exposure check + rotate if exposed (PR #75)~~ | ~~AG + Brandon~~ | ✅ DONE — confirmed not exposed |
| ~~P1-3~~ | ~~Tech session tokens stored plain — schedule hash migration~~ | ~~Claude Code~~ | ✅ DONE — code correct since v83, sheet verified session 84 |
| ~~P1-4~~ | ~~PAGA unit tests~~ | ~~AG~~ | ✅ DONE — Vitest 14/14, 100% coverage, second meal bug fixed. |
| ~~P1-5~~ | ~~Incident runbook (minimum viable)~~ | ~~Claude Code~~ | ✅ DONE — `docs/RUNBOOK.md` session 84 |
| ~~P1-6~~ | ~~Staging environment (already in roadmap)~~ | ~~AG~~ | ✅ DONE — Neon `preview` branch, Vercel Preview env wired, seeded session 84 |

### P2 — Schedule Within 30 Days

| # | Gap | Owner | Effort |
|---|---|---|---|
| ~~P2-1~~ | ~~`npm audit` in CI~~ | ~~AG~~ | ✅ DONE |
| ~~P2-2~~ | ~~Dependabot configuration~~ | ~~AG~~ | ✅ DONE — `.github/dependabot.yml` was already in repo |
| ~~P2-3~~ | ~~Code.js + TechPWA.gs silent failure alerting~~ | ~~AG~~ | ✅ DONE — already implemented. Code.js:164, TechPWA.gs:220. |
| ~~P2-4~~ | ~~Sentry alert rules~~ | ~~Brandon~~ | ✅ DONE — two alert rules configured session 84. |
| ~~P2-5~~ | ~~Scheduled nightly E2E~~ | ~~AG~~ | ✅ DONE |
| P2-6 | n8n/Flowise export + version control | AG | 1 session |
| ~~P2-7~~ | ~~Unit tests for dedup, filter, status logic~~ | ~~AG~~ | ✅ DONE — job-transitions.ts extracted + tested |
| ~~P2-8~~ | ~~Apps Script trigger inventory~~ | ~~AG~~ | ✅ DONE |
| ~~P2-9~~ | ~~Secret rotation schedule documented~~ | ~~Claude Code~~ | ✅ DONE — `docs/RUNBOOK.md` SECRET ROTATION SCHEDULE table. |
| ~~P2-10~~ | ~~ARCHITECTURE.md version discrepancy fixed~~ | ~~AG~~ | ✅ DONE — Code.js v81, TechPWA.gs v84 verified in ARCHITECTURE.md. |
| P2-11 | DATABASE_URL_TEST confirmed and documented | Brandon (confirm) + AG (doc) | 15 min |

### P3 — Tracked Backlog

| # | Gap | Notes |
|---|---|---|
| P3-1 | Core Web Vitals (Vercel Speed Insights) | One import — do it during next UI sprint |
| P3-2 | API spec drift check in sprint DoD | Add to SPRINT_STANDARDS.md |
| P3-3 | E2E parallelism | Not urgent until suite > 100 tests |
| P3-4 | Load testing | Not needed until PM SaaS (Entity 3) |
| P3-5 | `legacy-peer-deps` resolution | Next major Next.js upgrade |
| P3-6 | GAS unit testing | No good framework today — revisit if clasp test support improves |
| P3-7 | Backup access documentation | Low urgency |

---

## USING THIS AS A TEMPLATE

When applying this baseline to a new PTOW project, run through each of the 8 dimensions with the specific project's stack:

1. **CI/CD** — Does every PR run lint + type check + build + tests? Is there auto-deploy?
2. **Observability** — What fails silently? Where does the first error alert land?
3. **Testing** — What business logic is critical and untested?
4. **Deployment safety** — Can you roll back in under 10 minutes?
5. **Secret management** — Who can access what? When does each secret rotate?
6. **Documentation** — Can a new person run it from docs alone?
7. **Dependency hygiene** — When did you last run `npm audit`? Are dependencies auto-updated?
8. **Incident response** — What do you do at 6pm when something breaks and Brandon is unavailable?

Score each dimension: ✅ Meets standard / ⚠️ Partial / ❌ Missing. Then prioritize gaps.

---

*Framework authored: Session 78. Apply to APT Idaho, PM SaaS, Tax Search CRM as each project reaches operational status.*
