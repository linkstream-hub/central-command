# ADR-003: Google Apps Script as Google Workspace Bridge Only

**Status:** Accepted  
**Date:** 2026-06-06  
**Deciders:** Brandon Bittner  

---

## Context

The original system used Google Apps Script (GAS) as its entire backend — email polling, data storage, API server, business logic, and calendar management all ran inside GAS against Google Sheets.

GAS has hard ceilings that make it unsuitable as a general-purpose backend:
- 6-minute execution timeout per function call
- No persistent in-memory state between calls
- No native database — Sheets is a spreadsheet, not a relational store
- No TypeScript, no proper module system, no unit testing framework
- Quota limits on Gmail API calls, UrlFetch calls, and SpreadsheetApp writes
- Deployment model (versioned web apps) creates rollback friction

However, GAS has genuine advantages for Google Workspace integration that no external service can replicate without significant complexity:
- `GmailApp` — native read/write/send access to Gmail without OAuth token management
- `CalendarApp` — native Google Calendar event creation/update/delete
- `UrlFetchApp` — outbound HTTP from within Google's infrastructure
- Google Workspace triggers — time-based and event-based triggers run reliably inside Google's infrastructure, no hosting required

---

## Decision

After Phase 3 cut-over, GAS is scoped exclusively to Google Workspace integration. It is not a backend.

**GAS is authorized for:**
- `GmailApp` — polling inbound email (`checkNewLeadEmails`), sending replies, fetching thread history
- `CalendarApp` — creating, updating, and deleting Google Calendar events (`createOrUpdateCalendarEvent`)
- `Script Properties` — reading configuration values (API keys, flags) stored in GAS Script Properties
- Thin HTTP proxies to Next.js API routes (calling Neon-backed endpoints)

**GAS is NOT authorized for:**
- Primary data storage (Sheets was the database — this role is now Neon)
- Business logic that involves non-Google data
- Any new feature that could be built as a Next.js API route

**Three separate clasp projects:**
1. **Lead Parsing** (root `./`) — `Code.js`, `TechPWA.gs`. Handles email polling and tech PWA API. Code.js has time-based triggers — deploy manually only, never automate.
2. **Dashboard API** (`dashboard-api/`) — `DashboardAPI.gs`. All CC2.0 dashboard API actions. Auto-deploys via CI on push to main.
3. **Time Manager** — AppSheet integration for time-off management.

---

## Migration Target

Phase 5 target: GAS touches only `GmailApp` (send/receive) and `CalendarApp` (create/update/delete). All business logic migrated to Next.js + Neon. GAS becomes a 200-line bridge with no state.

---

## Consequences

**Positive:**
- Gmail and Calendar integration require zero OAuth token management — GAS handles it natively
- Time-based polling (`checkNewLeadEmails` every 15 min) runs without a server or cron infrastructure
- No additional Google API credentials to manage for core email/calendar operations

**Negative / Constraints:**
- GAS execution timeout (6 min) means any operation that might run long must be broken into batches
- `Code.js` must be deployed manually — it has email triggers that would be disrupted by automated deploy
- Two active GCP accounts (`workorder@` legacy, `brandon@` active) — always use `brandon@` account for new GCP/OAuth resources
- DashboardAPI.gs auth changes require atomic updates to 3 frontend call sites (`dashboard-api.ts`, `auth.ts`, `push/subscribe/route.ts`) — missing one = silent auth failure
