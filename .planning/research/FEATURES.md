# Feature Research

**Domain:** Field-service operations platform (property maintenance dispatch + technician PWA)
**Researched:** 2026-05-10
**Confidence:** HIGH — system is live, requirements are validated through 54 sessions of production use

---

## Feature Landscape

### Table Stakes (Users Expect These)

Features the dispatcher and field techs assume exist. Missing these = the platform is not usable as a work management system.

| Feature | Why Expected | Complexity | Notes |
|---------|--------------|------------|-------|
| Email → Job queue ingestion | Work orders arrive by email; manual entry is too slow | HIGH | ✓ Live. Gemini 2.5 Flash parses unstructured emails into Dispatch Queue. |
| Dispatch queue with workflow-state tabs | Dispatcher needs triage view of all jobs by status | MEDIUM | ✓ Live. Six tabs: All / Needs Review / Ready to Schedule / PTE Required / Scheduled / Complete. |
| Job detail modal | Dispatcher must read email thread, RM contact, property info without leaving queue | MEDIUM | ✓ Live. Includes Gmail thread, job fields, job comments tab (Session 54). |
| Job assignment (tech → job) | Core dispatch action — who is doing which job | LOW | ✓ Live. Col 17 of Dispatch Queue. |
| Drag-and-drop scheduling grid | Visual day × time grid for scheduling is expected in any field-service tool | HIGH | ✓ Live. RtS grid, Session 53. No tech lanes (by design). |
| Tech mobile PWA (clock-in/out) | Field techs need time tracking without a desktop | HIGH | ✓ Live. Badge + PIN auth, shift tracking, job completion. |
| Job completion from mobile | Techs mark jobs done in the field, not via office staff | MEDIUM | ✓ Live. `handleMarkComplete` in TechPWA.gs. |
| Time-off request submission | HR expectation for any workforce management tool | MEDIUM | ✓ Live via AppSheet Time Off Manager (separate system). |
| Internal job comments / notes | Dispatchers and staff need to annotate jobs with context | MEDIUM | ✓ Specced Session 54. Shadow-write to Neon pending. |
| Office staff authentication | Restrict dashboard to @aptmaintenanceinc.com accounts only | LOW | ✓ Live. Google OAuth via next-auth v5. |
| Push notifications to techs | Techs need real-time job alerts on mobile | MEDIUM | ✓ Infrastructure wired (Session 53). Activation pending. |
| Timecard approval queue | Supervisors must approve time records for payroll | MEDIUM | ✓ Live. `getTimecardApprovalQueue`, `approveTimecard`, `disputeTimecard` in DashboardAPI.gs. |
| Calendar sync for scheduled jobs | Scheduled jobs must appear on team calendar | MEDIUM | ✓ Live. `createOrUpdateCalendarEvent` syncs to Google Calendar. |

---

### Differentiators (Competitive Advantage)

Features specific to APT's operational context that off-the-shelf tools don't provide.

| Feature | Value Proposition | Complexity | Notes |
|---------|-------------------|------------|-------|
| Gemini email parsing with property context | Unstructured property maintenance emails from many RM sources → structured job cards automatically | HIGH | ✓ Live. `buildSmartPropertyContext` scores/ranks Lapham DB property matches for Gemini. Saves 5–10 min per work order. |
| Dual auth system (OAuth + badge+PIN) | Techs without Google Workspace accounts can use PWA; office staff get SSO | MEDIUM | ✓ Live. The two auth systems are intentionally isolated — wrong hook causes redirect loops. |
| Shadow-write migration (zero downtime) | Neon Postgres introduced without disrupting live Sheets-based system | HIGH | Active. Sheets is source of truth; Neon receives shadow writes for validation. No cutover risk. |
| PTE workflow tab | "Permission to Enter" as a first-class workflow state, not a freeform note | LOW | ✓ Live tab. Solves a Bay Area legal/tenant-rights constraint specific to property maintenance. |
| Cloudflare Worker API proxy | Apps Script URLs are hidden; rate limiting + auth enforcement at the edge | MEDIUM | ✓ Live. `api.aptmaintenanceinc.com`. Keeps backend URLs private from browser. |
| Tenant self-scheduling | Tenants book their own slot; dispatcher sees it pre-filled | HIGH | ✓ Backend live (`tenantSelfScheduleDA`, `getAvailableSlotsDA`). Frontend verification pending. |
| Tech suggestion engine | Ranks available techs by skill, trade, and rank for a given job | MEDIUM | ✓ Live. `suggestTechsForJob` + `buildTechScores`. Uses Keith's rank/trade key system. |
| Morning audit report | Auto-briefing of overnight queue changes sent to leadership each morning | LOW | ✓ Live. `morningAuditReport()` on M–F 6:30am trigger. |
| Trainee pairing rule | System enforces that T-rank techs cannot be assigned solo | LOW | ✓ Logic in `SuggestTechs.js`. Prevents compliance failure. |
| Entity ID multi-tenancy | All records carry `entity_id` (default APT-CA) for future multi-entity expansion | LOW | ✓ In schema. Enables CC3.0 expansion to other APT entities without schema changes. |

---

### Anti-Features (Commonly Requested, Often Problematic)

| Feature | Why Requested | Why Problematic | Alternative |
|---------|---------------|-----------------|-------------|
| Auto-reply to tenants/RMs | Seems like time savings | Premature automation — Robert is still learning the system; wrong auto-reply damages tenant relationships. Brandon controls the switch. | `AUTO_REPLY_ENABLED` flag exists; enable after supervised trial period. |
| Firebase realtime DB | Original plan; provides live sync | Replaced by Neon Postgres which is cheaper, SQL-native, and type-safe with Drizzle ORM. Firebase adds mobile SDK complexity with no benefit over Neon + polling. | Neon Postgres + shadow-write migration (already in progress). |
| Tab-per-email-type dispatch queue | Seems organized | Creates tab proliferation as new email types emerge; dispatchers lose the cross-type view. | Email type as a badge/chip on row cells. One tab per workflow state only. |
| Code.js auto-deploy in CI | Convenience | Code.js has email triggers that fire on deploy — auto-deploy would spam tenants/RMs or break trigger timing. | Manual `clasp deploy` only for Code.js; all other GAS files auto-deploy. |
| Real-time everything (WebSockets) | Instant updates feel modern | Apps Script cannot maintain persistent connections; polling every N seconds is the correct architecture for this backend. | Polling on the frontend (already in place). |
| `calibrateDurationDefaults()` early | Duration estimates are useful | The function needs ~20+ PWA completions before data is statistically meaningful. Running it early produces garbage defaults that affect scheduling. | Defer until organic job completions accumulate. |
| Conflicting job detection | Prevents double-booking | Has never been specced; the detection logic depends on unresolved questions about what counts as a conflict (same tech? same address? overlapping time?). | Needs spec before any code. Add to roadmap backlog. |

---

## Feature Dependencies

```
Email Ingestion (Gemini parsing)
    └──feeds──> Dispatch Queue
                    └──requires──> Job Assignment
                                       └──requires──> Tech Roster
                    └──feeds──> Ready to Schedule Grid
                                    └──requires──> Calendar Sync

Tech PWA Auth (Badge + PIN)
    └──gates──> Clock In / Out
                    └──feeds──> Time Records
                                    └──feeds──> Timecard Approval Queue

Job Comments
    └──requires──> Job Detail Modal
    └──shadow-writes──> Neon (job_comments table)

Push Notifications
    └──requires──> Tech PWA Auth
    └──requires──> Push Subscription stored in Tech Roster col R

Tenant Self-Scheduling
    └──requires──> Available Slots API
    └──requires──> Calendar Sync

Shadow-Write Migration (Neon)
    └──ordered──> job_comments → time_records → techs → jobs
    └──requires──> Schema Provisioned (✓ done, Phase B)
```

### Dependency Notes

- **Dispatch Queue requires Email Ingestion:** Queue is the downstream consumer of parsed emails; without parsing, jobs must be entered manually (not viable at volume).
- **Timecard Approval requires Time Records:** Approval queue is meaningless if clock events aren't being recorded. Shadow-write to Neon must happen before Neon can serve as the approval source.
- **Shadow-writes are risk-ordered:** `job_comments` has no historical data (lowest risk). `jobs` has 30-col historical data and is the source of truth for payroll scheduling (highest risk). Order must not be reversed.
- **Push notifications require subscription stored per tech:** If `PUSH_SUB` column (Tech Roster col R) is missing or not populated, push delivery silently fails. Infrastructure is wired; activation depends on subscription enrollment.
- **Auto-reply conflicts with supervised trial:** Enabling `AUTO_REPLY_ENABLED` before the dispatcher is confident creates a race condition between human review and automated response. The flag is the correct gating mechanism.

---

## MVP Definition

This system is past MVP — it is live in production. The framework below reflects the **CC3.0 migration MVP**: minimum needed to cut over from Google Sheets to Neon as the source of truth.

### Launch With (Neon cutover v1)

- [x] `comms_messages` shadow-write — ✓ already live
- [ ] `job_comments` shadow-write — no historical data, lowest risk, first
- [ ] `time_records` shadow-write — clock events must match before payroll cutover
- [ ] `techs` shadow-write — roster must be in sync before tech lookup migrates
- [ ] `jobs` shadow-write — last; validate against Sheets for N days before cutting read

### Add After Validation (v1.x)

- [ ] Switch reads from Sheets → Neon (per table, validated individually)
- [ ] `calibrateDurationDefaults()` — after 20+ PWA completions
- [ ] Push notification activation — after subscription enrollment confirmed per tech
- [ ] Auto-reply enable — after Robert's supervised trial period
- [ ] Conflicting job detection — after spec is written

### Future Consideration (v2+)

- [ ] OpenPhone SMS integration — solves PTE bottleneck ($15/month, deferred cost decision)
- [ ] Status transition guardrails (block New → Scheduled without assignment) — needs spec
- [ ] Auto-archive jobs >10 days old — needs Apps Script backend function
- [ ] Code.js auto-routing (turnover → RtS, adhoc → PTE Required) — needs spec
- [ ] Time Manager clasp project (`time-manager/`) — not yet set up
- [ ] Multi-entity expansion (non-APT-CA entities using entity_id)

---

## Feature Prioritization Matrix

| Feature | User Value | Implementation Cost | Priority |
|---------|------------|---------------------|----------|
| `job_comments` shadow-write | HIGH | LOW | P1 — no historical data; unblocks Neon validation |
| `time_records` shadow-write | HIGH | MEDIUM | P1 — payroll integrity depends on this |
| `techs` shadow-write | HIGH | LOW | P1 — blocks tech lookup migration |
| `jobs` shadow-write | HIGH | HIGH | P1 — last in risk order; blocks full cutover |
| Push notification activation | MEDIUM | LOW | P2 — infra ready; needs subscription enrollment |
| Auto-reply enable | HIGH | LOW | P2 — code exists; Brandon controls the switch |
| Conflicting job detection | MEDIUM | HIGH | P3 — needs spec; no code yet |
| OpenPhone SMS | HIGH | MEDIUM | P3 — cost decision deferred |
| Status transition guardrails | MEDIUM | LOW | P3 — needs spec |
| `calibrateDurationDefaults()` | LOW | LOW | P3 — needs 20+ completions first |

**Priority key:**
- P1: Must have for Neon cutover
- P2: Should have; add once shadow-writes are validated
- P3: Roadmap backlog; spec required before any work

---

## Competitor Feature Analysis

This is an internal operations tool — no direct competitors. The relevant comparison is against the generic tools APT would otherwise use.

| Feature | Generic (e.g., Jobber/Housecall Pro) | Google Sheets + Email | APT Central Command |
|---------|--------------------------------------|----------------------|---------------------|
| Email → job parsing | Manual data entry or basic form intake | Fully manual | Gemini 2.5 Flash auto-parse — no manual entry |
| Dispatch queue | Yes, pre-built | Shared spreadsheet, no real-time | Tabbed live grid, workflow states, drag-and-drop RtS |
| Tech mobile app | Yes, vendor app | None | Badge+PIN PWA, works without Google account |
| PTE workflow | Not a first-class concept | Freeform notes | Dedicated tab + status value |
| Tenant self-scheduling | Some (via booking links) | No | Implemented (`generateScheduleLinkDA`) |
| Payroll/timecard approval | Basic | Manual | Structured approval queue with dispute reason |
| Migration path to SQL | N/A (vendor lock-in) | N/A | Shadow-write to Neon without downtime |
| Cost | $50–200/month/user | Free (Google Workspace) | Fixed infra cost (Neon + Cloudflare + Vercel) |

**Why APT built custom:** PTE as a first-class workflow state, badge+PIN auth for techs without Google accounts, and Gemini email parsing are not available in off-the-shelf field service software. The custom system also avoids per-user SaaS costs as the team scales.

---

## Sources

- `PROJECT.md` — validated requirements list (Sessions 1–54)
- `CLAUDE.md` — live system state, column maps, known issues
- `docs/ARCHITECTURE.md` — system domain structure (referenced via MEMORY.md)
- `dashboard-api/DashboardAPI.gs` — authoritative list of implemented API actions
- Git history — Sessions 47–54 delivery evidence

---
*Feature research for: APT Central Command (CC2.0 → CC3.0 migration)*
*Researched: 2026-05-10*
