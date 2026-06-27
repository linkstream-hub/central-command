# OWNER_MANUAL.md — APT Central Command
# Plain-English guide for Brandon. Check system health and daily operations.
# Last updated: 2026-06-26

---

## DAILY HEALTH CHECK (under 5 minutes)

1. **Dashboard loads** → `dispatch.aptmaintenanceinc.com` — can you log in?
2. **New WOs appearing** → Check Inbox panel. Should see WOs from overnight emails.
3. **Techs can clock in** → `clock.aptmaintenanceinc.com` — badge + PIN works?
4. **Sentry** → `sentry.io` → APT Central Command → zero red ERROR alerts?
5. **Vercel** → `vercel.com` → central-command → latest deploy shows READY (green)?

If all 5 green: system healthy. Done.

---

## SYSTEM DASHBOARDS

| System | URL | What to check |
|---|---|---|
| Dispatch App (CC2.0) | dispatch.aptmaintenanceinc.com | Staff login, WO panel, dispatch |
| Tech Clock App | clock.aptmaintenanceinc.com | Tech login, job list |
| Vercel | vercel.com → central-command | Deployments, function errors |
| Neon (database) | console.neon.tech | Branch health, connection |
| Sentry | sentry.io | Error feed, alerts |
| Railway (n8n) | railway.app | n8n container status |
| GitHub Actions | github.com/linkstream-hub/central-command | CI/CD pipeline |

---

## DECISIONS NEEDED FROM BRANDON

### Timekeeping Vendor (Phase 0 — urgent)

Choose one before development can proceed:

**Option A — Build it ourselves**
- APT Central Command is legal clock-in/out source of truth
- Requires: legal review, audit trail, PAGA compliance code, manager approval flow
- Higher risk; AG owns all compliance logic

**Option B — Use a vendor (recommended)**
- Deputy, Gusto, or QuickBooks owns legal timekeeping compliance
- CC just records when techs clock in/out for job tracking
- Vendor handles all PAGA liability
- Faster, safer, lower cost than custom

Record decision in `docs/SYSTEM_OF_RECORD.md`.

### Auth Provider — Clerk vs Lucia (Phase 0)

**Clerk:** managed service, easiest setup, ~$25/month at scale, handles OAuth + custom auth
**Lucia:** open-source, self-hosted in Neon, free, slightly more setup

Brandon's call. CC implements whichever. Record in `docs/SYSTEM_OF_RECORD.md`.

---

## WHAT NOT TO DO

- Do not run terminal commands yourself — AG owns all CLI/git/deploy
- Do not "env pull" in Vercel CLI — it wipes the dev environment
- Do not approve PRs without Claude Code "Clear to merge"
- Do not add new GAS scripts — GAS is being removed

---

## FEATURE FREEZE (active now)

System is in a stabilization period. No new features, UI changes, or workflow additions until Phase 0–5 complete. This is to fix the foundation before building more.

Current status: Phase 0 (foundation setup).

Estimated completion of all phases: TBD (depends on Brandon decisions above + sprint velocity).

---

## WHO TO CONTACT

| Need | Contact |
|---|---|
| Bug in dispatch app | File GitHub issue → Claude Code triages |
| Emergency (app down) | See RUNBOOK.md Scenario 1 |
| New feature request | Brandon → Claude Code creates Task Card (after freeze lifts) |
| Tech can't clock in | See RUNBOOK.md Scenario 3 |
