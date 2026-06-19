# Gate: GAS / Apps Script

1. **Dev write guard.** Local dev blocks all GAS writes by default. Real incident: 3 emails to Lapham client. Override: `NEXT_PUBLIC_DEV_ALLOW_WRITES=true` — never put this in `.env.local`.
2. **Never run:** `catchUpMissedEmails()`, `resetBackfill()`, `setupBackfillTrigger()`, `archiveOldJobsConfirmed()`, `mineScheduleSheet()`
3. **Three separate clasp projects** — each has its own `deploymentId`. Never mix them.
4. **Manual deploy only.** Never automate `clasp deploy`. Execute from terminal with the exact `--deploymentId` in CLAUDE.md §DEPLOYMENT WORKFLOW.

> Ref: ADR-003, RULES.md §NEVER RUN LIST
