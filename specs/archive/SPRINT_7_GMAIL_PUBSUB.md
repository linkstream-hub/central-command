# SPRINT 7 — Gmail Cron Inbound Relay
**Branch:** `feat/sprint7-gmail-cron`
**Author:** Claude Code
**Goal:** Replace Code.js polling-based inbound reply detection with a Vercel cron job that syncs Gmail history to Neon every 60 seconds. Gmail becomes transport only. Neon is the sole source of truth for all comms. No Gmail API call on modal open.

---

## Why Not Pub/Sub

Gmail Pub/Sub push requires granting `gmail-api-push@system.gserviceaccount.com` publisher access on a Pub/Sub topic. APT's Google Workspace org has `iam.allowedPolicyMemberDomains` policy that blocks external service accounts — including Google's own. Fixing that requires Org Policy Admin access and introduces unnecessary complexity.

**Vercel Cron + Gmail history.list is the correct solution for this environment.** 60-second polling interval is functionally identical to push for a dispatch workflow. Dispatchers are not watching for the exact second a reply lands.

---

## Why OAuth2 Refresh Token (not service account JSON key)

APT's GCP org enforces `iam.managed.disableServiceAccountKeyCreation` — JSON key downloads are blocked org-wide. This is correct security hardening. The alternative (Workload Identity Federation) requires GCP-native compute; Vercel runs on AWS and adds significant complexity for no meaningful security gain at this scale.

**OAuth2 refresh token with `gmail.readonly` scope stored in Vercel encrypted env vars is the correct solution.** Blast radius if leaked: read-only access to one inbox. The `googleapis` library handles token refresh automatically.

---

## Architecture

```
Tenant sends reply email
  → Gmail receives it
  → Vercel cron fires (every 60 seconds, 24/7)
  → /api/cron/sync-gmail-history calls Gmail history.list
  → fetches new messages, writes to comms_messages
  → updates stored historyId
  → reply appears in modal on next open

Modal open:
  → GET /api/comms/[jobId]
  → query Neon only — no Gmail call
  → return messages
```

| | Today | After Sprint 7 |
|---|---|---|
| Detection window | Up to 15 min | Up to 60 sec |
| Hours of operation | 6:30am–7pm M-F only | 24/7 |
| Silent failure risk | Yes (try/catch swallows) | No — cron retries automatically |
| Modal open | Gmail API call every time | Neon query only |
| Source of truth | Gmail | Neon |

---

## Brandon's Credential Setup — COMPLETE ✅

All credentials are live in Vercel (Production + Preview + Development).

| Key | Status |
|---|---|
| `GMAIL_CLIENT_ID` | ✅ Set |
| `GMAIL_CLIENT_SECRET` | ✅ Set |
| `GMAIL_REFRESH_TOKEN` | ✅ Set |
| `GMAIL_WATCH_EMAIL` | ✅ Set (`workorder@aptmaintenanceinc.com`) |
| `CRON_SECRET` | ✅ Set |

`CRON_SECRET` also added to `tech-pwa/.env.local`.

GCP artifacts (not used at runtime, keep for reference):
- Service account `gmail-webhook` exists in apt-central-command project (no key, no DWD)
- OAuth consent screen: Internal audience, app name `APT Gmail Cron`
- OAuth client ID: `gmail-cron-client` (Web application type)

---

## Schema Change — FLAG TO CLAUDE CODE BEFORE MIGRATION

**STATUS: PRE-CLEARED by Claude Code (Session 72)**

Add to `tech-pwa/src/lib/schema.ts`:

```typescript
export const gmailSyncState = pgTable('gmail_sync_state', {
  id:        serial('id').primaryKey(),
  email:     text('email').notNull().unique(),
  historyId: text('history_id').notNull(),
  updatedAt: timestamp('updated_at').defaultNow(),
});
```

AG can run `npx drizzle-kit push` immediately — no further Claude Code clearance needed.

---

## Numbered Task List

**Task 1 — Install dependency**
```
cd tech-pwa && npm install googleapis
```

**Task 2 — Schema**
Add `gmailSyncState` table (definition above) to `tech-pwa/src/lib/schema.ts`. Export it. Run `npx drizzle-kit push`.

**Task 3 — Gmail API helper**
Create `tech-pwa/src/lib/gmail-client.ts`:

```typescript
import { google } from 'googleapis';

export function getGmailClient() {
  const oauth2Client = new google.auth.OAuth2(
    process.env.GMAIL_CLIENT_ID,
    process.env.GMAIL_CLIENT_SECRET,
  );
  oauth2Client.setCredentials({
    refresh_token: process.env.GMAIL_REFRESH_TOKEN,
  });
  return google.gmail({ version: 'v1', auth: oauth2Client });
}
```

Export `getNewMessages(startHistoryId: string)`:
- Calls `gmail.users.history.list({ userId: 'me', startHistoryId, historyTypes: ['messageAdded'] })`
- Fetches full content for each added message ID via `gmail.users.messages.get({ userId: 'me', id, format: 'full' })`
- Returns array of parsed messages with: `messageId`, `threadId`, `fromEmail`, `toEmail`, `subject`, `bodyPreview` (first 500 chars), `fullBody`, `sentAt`, and the latest `historyId` from the response

Export `getCurrentHistoryId()`:
- Calls `gmail.users.getProfile({ userId: 'me' })`
- Returns `historyId` string (used for first-run initialization only)

**Task 4 — Cron route**
Create `tech-pwa/src/app/api/cron/sync-gmail-history/route.ts`:

```
GET /api/cron/sync-gmail-history
Auth: verify Authorization header === `Bearer ${process.env.CRON_SECRET}`
```

Logic:
1. Check `Authorization: Bearer <CRON_SECRET>` — return 401 if missing or wrong
2. Load stored `historyId` from `gmail_sync_state` where `email = GMAIL_WATCH_EMAIL`
3. If no row exists (first run): call `getCurrentHistoryId()`, insert into `gmail_sync_state`, return 200 — nothing to sync yet
4. Call `getNewMessages(storedHistoryId)` — get messages added since last sync
5. For each message:
   a. Skip if `fromEmail` contains `workorder@aptmaintenanceinc.com` (outbound — already written on send)
   b. Look up `jobId`: query `comms_messages` where `threadId = message.threadId` → take `jobId` from first result
   c. If no `jobId` found: log and skip (Code.js handles new leads; this cron is replies only)
   d. Insert into `comms_messages`: `direction='inbound'`, `stakeholder='TENANT'`, `onConflictDoNothing` on `messageId`
6. Update `historyId` in `gmail_sync_state` to the latest historyId from the history list response
7. Return 200

**Task 5 — Register cron in vercel.json**
`tech-pwa/vercel.json` already exists. Add a `"crons"` key — do not replace the existing keys:

```json
{
  "framework": "nextjs",
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "crons": [
    {
      "path": "/api/cron/sync-gmail-history",
      "schedule": "* * * * *"
    }
  ]
}
```

(`* * * * *` = every minute. Vercel Pro plan minimum interval.)

**Task 6 — Simplify GET /api/comms/[jobId]**
In `tech-pwa/src/app/api/comms/[jobId]/route.ts`:
- Remove `msgId` and `address` from `searchParams` reads (lines 55–56)
- Remove the `if (rows.length > 0)` guard — always return Neon data regardless
- Remove the entire Gmail fallback block (lines 98–174): the `if (!msgId)` early return, the `apiUrl`/`apiKey` setup, the `fetch` to DashboardAPI, the shadow-write block, and the final Gmail return
- Keep: auth check, Neon query ordered by `sentAt`, return `{ success: true, source: 'neon', messages: [...] }`
- If Neon has no messages: return `{ success: true, source: 'neon', messages: [] }`

In `tech-pwa/src/lib/dashboard-api.ts`:
- Remove the `getGmailThread` special case block (lines 567–573)

**Task 7 — Verify**
- `npx tsc --noEmit` → zero errors
- `git diff main...HEAD > artifacts/ag_diff.txt`
- `ag_test_results.txt`: curl the cron route with and without `CRON_SECRET` — show 200 and 401 responses

---

## Flags to Claude Code Before Any Deploy — PRE-CLEARED (Session 72)

1. **Schema change** — `gmail_sync_state` table: ✅ Cleared
2. **`GMAIL_*` env vars** — server-only, no `NEXT_PUBLIC_` prefix: ✅ Cleared
3. **`CRON_SECRET` pattern** — first cron route in codebase, `Authorization: Bearer` pattern confirmed: ✅ Cleared

AG proceeds directly to execution. No further Claude Code clearance needed before migration or deploy.

---

## What Code.js v81 Does After This Sprint

`writeInboundReplyToNeon()` in Code.js becomes redundant but stays in place — it's a harmless fallback. Do not remove it.

---

## Integration Test (after AG deploys)

1. Send a test reply to `workorder@aptmaintenanceinc.com` from an external address, replying to a thread with a known jobId
2. Wait up to 60 seconds
3. Verify: `SELECT * FROM comms_messages WHERE direction='inbound' ORDER BY created_at DESC LIMIT 5`
4. Verify reply appears in job modal comms tab
