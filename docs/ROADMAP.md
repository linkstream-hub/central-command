# APT FSM — ROADMAP
# Sequence-locked. Phase N cannot start until Phase N-1 passes its gate.
# This is the build order. No skipping. No parallel phase work.
# Supersedes CENTRAL_COMMAND_EXPANSION_ROADMAP.md for APT FSM build sequencing.
# Last Updated: S137 (2026-06-04)

---

## CURRENT STATE

**Status: LIVE but NOT OPERATIONAL**

The system exists and is deployed. Dispatch, mobile, and intake all work technically. But:
- No real job has ever been dispatched through CC
- `sendTenantContact()` is commented out — coordination loop is broken
- SMS to techs not wired (n8n workflow not built by Brandon yet)
- Dispatcher still using the Google Sheet for real work

The spreadsheet dies when Lock and Send proves itself in production. Not before.

---

## PHASE 1 — OPERATIONAL LOOP
**Theme:** Close the gaps. Run a real day of work through CC.

**Gate to enter:** Current state (already open)
**Gate to exit:** 10 real jobs dispatched via CC with zero spreadsheet fallback

### Tasks
| # | Item | Owner | Dependency |
|---|------|-------|------------|
| 1.1 | `sendTenantContact()` — uncomment, complete, wire to `addToDispatchQueue()` | AG | None |
| 1.2 | Brandon creates n8n SMS workflow | Brandon | His n8n credentials |
| 1.3 | Set `N8N_LOCK_SEND_WEBHOOK_URL` in env + Vercel | Brandon | 1.2 complete |
| 1.4 | Verify Lock and Send → SMS end-to-end | AG | 1.2 + 1.3 |
| 1.5 | Operational pilot — 1 week of real dispatch through CC | Brandon + Dispatcher | 1.1 + 1.4 |

### Definition of Done
- [ ] Auto-reply for non-PTE jobs sends ACTUAL tenant contact email (not just a promise in the reply)
- [ ] Tech receives SMS when Lock and Send is executed
- [ ] Dispatcher has run 10 real jobs through CC without touching the spreadsheet
- [ ] Zero jobs lost in inbox during pilot week
- [ ] Dispatcher reports: <30 min/day on coordination tasks

### Risk
Task 1.2 is the only Brandon-owned technical task. Everything else is AG. If pilot fails, diagnose before Phase 2 — do not build more features over a broken loop.

---

## PHASE 2 — OPERATIONAL EXCELLENCE
**Theme:** Make the system trustworthy enough to be the primary tool, not a backup.

**Gate to enter:** Phase 1 gate passed
**Gate to exit:** Dispatcher uses CC as sole tool for 30 consecutive days. Spreadsheet confirmed dead.

### Tasks
| # | Item | Why |
|---|------|-----|
| 2.1 | Status transition audit trail | Who changed what and when — accountability |
| 2.2 | 24h stagnant lead escalation (n8n) | No job silently stuck in Needs Review |
| 2.3 | 48h PTE non-response escalation (n8n) | No job silently stuck in PTE Required |
| 2.4 | Stuck-job alerts to dispatcher | Dispatcher knows before the PM company calls |
| 2.5 | CA Break Compliance monitor (n8n) | PAGA exposure coverage |
| 2.6 | Daily ops digest email to owner | Visibility without dashboard logins |
| 2.7 | GAS → Node.js/Railway migration (Code.js email parsing) | Remove GAS dependency for core intake |
| 2.8 | Playwright regression ceiling sprint (sr-01-06) | Protect against regressions at higher feature pace |

### Definition of Done
- [ ] Every status change logged with actor, timestamp, previous state, new state
- [ ] Zero jobs stagnant >24h without an automated escalation firing
- [ ] Zero manual break compliance tracking
- [ ] Dispatcher has not opened the Google Sheet in 30 days
- [ ] Code.js email parsing runs on Node.js/Railway (no GAS)

---

## PHASE 3 — CLIENT EXPERIENCE
**Theme:** Give PM companies visibility without phone calls.

**Gate to enter:** Phase 2 gate passed
**Gate to exit:** At least 1 PM company logging in weekly, zero status calls

### Tasks
| # | Item | Notes |
|---|------|-------|
| 3.1 | Client portal (PM company login) | PM companies see their jobs without calling |
| 3.2 | Job status notifications (email/SMS to PM) | Proactive updates on key events |
| 3.3 | Tenant access request confirmation flow | Digital PTE approval — no phone tag |
| 3.4 | Tech job execution (photos, notes, completion sign-off) | Complete the job record |
| 3.5 | Job completion notification to PM | Auto-notify when done |

### Definition of Done
- [ ] PM company can log in and see all their active jobs
- [ ] PM company receives notification when job status changes to Scheduled, In Progress, Complete
- [ ] Tenant receives access request link, clicks confirm/deny — no phone call needed
- [ ] Tech can attach photos and notes from mobile app
- [ ] Zero "what's the status?" calls from PM companies per week

---

## PHASE 4 — BUSINESS OPERATIONS
**Theme:** Make the system generate revenue insight and reduce billing overhead.

**Gate to enter:** Phase 3 gate passed
**Gate to exit:** 50%+ of invoices generated from CC, avg invoice-to-sent time <24h

### Tasks
| # | Item | Foundation |
|---|------|------------|
| 4.1 | Invoice generation from completed job | `crater` (BGB-CRB-Holdings/crater) |
| 4.2 | Stripe payment collection | Stripe API |
| 4.3 | Tech time tracking (clock-in to job completion) | `/api/startShift` exists — extend |
| 4.4 | Operations dashboard (revenue, utilization, completion rate) | Neon query layer |
| 4.5 | QuickBooks/Xero export | API integration |

### Definition of Done
- [ ] Invoice auto-generated when job moves to Complete
- [ ] Invoice sent to PM company within 24h of job completion
- [ ] Tech hours logged against jobs for labor cost tracking
- [ ] Owner receives weekly revenue and utilization report
- [ ] 50%+ of invoices collected via Stripe

---

## PHASE 5 — PLATFORM (SAAS)
**Theme:** Prove it for APT, then sell it to other operators.

**Gate to enter:** Phase 4 gate passed AND explicit decision to pursue SaaS
**Gate to exit:** 3 paying customers on the same codebase

### Tasks
| # | Item | Notes |
|---|------|-------|
| 5.1 | Multi-tenancy architecture | Organization-scoped data, separate email gates per tenant |
| 5.2 | Onboarding flow | Operator signs up, goes live in <1 day |
| 5.3 | Subscription billing | Stripe subscription, usage metering |
| 5.4 | White-label options | Custom domain, logo, color per operator |
| 5.5 | Admin dashboard | PTOW manages all operators from one view |

### Definition of Done
- [ ] APT data fully isolated from other tenants
- [ ] New operator can onboard without code changes
- [ ] 3 paying customers dispatching through CC
- [ ] Zero cross-tenant data leakage (security audit required)

---

## THE SEQUENCE LAW

```
Phase 1 → Phase 2 → Phase 3 → Phase 4 → Phase 5
```

**No phase starts until the prior phase's gate is passed.**
**No features from Phase N+1 are built while Phase N is open.**

This is not a guideline. It is the rule that prevents piecemeal building.

If Phase 1 takes 3 months, Phase 2 starts in month 4. If Phase 1 takes 2 weeks, Phase 2 starts in week 3. The loop either works or we fix it. We do not add portals to a broken loop.

---

## NOT ON THE ROADMAP (intentionally deferred)

- Real-time tech GPS tracking — no operator demand signal yet
- In-app chat — techs use SMS, operators use email; a third channel creates confusion
- AI job estimation — high complexity, low Phase 1-3 value
- Third-party calendar sync — not our wedge
- Android/iOS native app — PWA covers tech mobile; native is Phase 5+

Add only when an operational use case demands it.
