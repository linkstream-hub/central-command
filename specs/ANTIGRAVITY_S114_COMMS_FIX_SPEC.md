# S114 — Comms Regression Fixes
# Sprint: feat/s114-ops-fixes
# Cut from: main (after S113 PR merges)
# Owner: Antigravity
# Claude Code review gate: required before merge

---

## ⛔ SCOPE LOCK — do not touch any file not listed in this spec

Files in scope:
- `tech-pwa/src/app/api/comms/[jobId]/route.ts`
- `tech-pwa/src/components/dashboard/JobDetailModal.tsx`

Any other file that appears to need a change → STOP → flag to Claude Code.

---

## CONTEXT

### P1 Root Cause (P0 regression — comms panel blank)

`/api/comms/[jobId]` GET has a Gmail fallback that calls `getThreadByMessageId` from
`@/lib/gmail-client.ts`. That function requires `GMAIL_CLIENT_ID`, `GMAIL_CLIENT_SECRET`,
`GMAIL_REFRESH_TOKEN` — none of which are in the Vercel environment. `getGmailClient()`
throws, the catch block silently swallows it, and the route returns 0 messages. The cache
write to Neon is also missing: even if credentials existed, every load would re-hit Gmail.

Fix: replace `getThreadByMessageId` with a DashboardAPI bridge call to `getGmailThread`
(the same pattern used in `api/job-comments/[jobId]/route.ts`). After a successful fetch,
write the messages to `commsMessages` before returning them.

### P2 Root Cause (comms thread rendering cosmetics)

The thread rendering code exists and has chat-bubble layout. Two specific issues:
1. Timestamps display as raw ISO strings (`2024-12-15T10:30:00.000Z`) — the UI does
   `{msg.timestamp ?? ''}` with no formatting.
2. Outbound APT messages show `noreply@aptmaintenanceinc.com` as the sender name.

### DashboardAPI bridge pattern (reference: `api/job-comments/[jobId]/route.ts:58-81`)

```typescript
const apiUrl = process.env.NEXT_PUBLIC_DASHBOARD_API_URL;
const apiKey = process.env.DASHBOARD_API_KEY;
const res = await fetch(apiUrl, {
  method: 'POST',
  headers: { 'Content-Type': 'text/plain' },
  body: JSON.stringify({ action: 'getGmailThread', msgId: '...', address: '...', apiKey }),
});
const data = await res.json();
```

The `getGmailThread` action in DashboardAPI.gs returns:
```javascript
{
  success: true,
  threadId: string,
  messageCount: number,
  messages: [{
    id: string,          // Gmail message ID
    from: string,        // display name (e.g. "John Smith")
    fromEmail: string,   // email only (e.g. "john@example.com")
    toEmail: string,
    date: string,        // formatted "Jan 5, 2025 at 3:45 PM" (GAS timezone)
    subject: string,
    body: string,        // cleaned plain text
    isOutbound: boolean, // true if from aptmaintenanceinc.com
    attachments: Array<{ name, mimeType, size, url }>
  }]
}
```

---

## TASK LIST

### Task 1 — Branch setup

1. `git branch --show-current` → paste: `______` — must be `feat/s114-ops-fixes`
   Mismatch = STOP. If not on this branch, run `git checkout -b feat/s114-ops-fixes` from main.
2. `git ls-remote --heads origin feat/s114-ops-fixes` → paste: `______`
   If empty: run `git push -u origin feat/s114-ops-fixes` first.
3. `git log main..HEAD --oneline` → paste: `______`
   If empty on a pre-existing branch, run `git rebase main` before any work.

---

### Task 2 — P1: Fix comms fallback in `route.ts`

**File**: `tech-pwa/src/app/api/comms/[jobId]/route.ts`

**Step 2a — Remove the dead Gmail client import**

Line 9 currently reads:
```typescript
import { getThreadByMessageId } from '@/lib/gmail-client';
```
Delete this import entirely. `getThreadByMessageId` will not be used after this fix.

**Step 2b — Add `parseMsgDate` helper**

Add this function before the `extractEmailAddress` function (i.e., before line 11):

```typescript
function parseMsgDate(dateStr: string): Date {
  // GAS formats dates as "Jan 5, 2025 at 3:45 PM" — strip " at " before parsing
  const d = new Date(dateStr.replace(/ at /i, ' '));
  return isNaN(d.getTime()) ? new Date() : d;
}
```

**Step 2c — Replace the Gmail fallback block**

Current fallback block (lines 62–84):
```typescript
  // Gmail fallback: when no Neon rows exist and job has a gmailMsgId
  if (rows.length === 0 && job?.gmailMsgId) {
    try {
      const thread = await getThreadByMessageId(job.gmailMsgId);
      return NextResponse.json({
        success: true,
        source: 'gmail',
        messages: thread.messages.map(msg => ({
          from:        msg.fromEmail,
          fromEmail:   msg.fromEmail,
          toEmail:     msg.toEmail,
          text:        msg.fullBody || msg.bodyPreview,
          timestamp:   msg.sentAt.toISOString(),
          isOutbound:  msg.fromEmail.includes('workorder@aptmaintenanceinc.com') ||
                       msg.fromEmail.includes('noreply@aptmaintenanceinc.com'),
          stakeholder: deriveStakeholder(msg.fromEmail, msg.toEmail, effectiveRmEmail, tenantEmail ?? ''),
          attachments: [],
        })),
      });
    } catch (err) {
      console.error('[GET /api/comms] Gmail fallback failed:', err);
      // Fall through: return empty array rather than error
    }
  }
```

Replace the entire block with:
```typescript
  // Gmail fallback: when no Neon rows exist and job has a gmailMsgId
  if (rows.length === 0 && job?.gmailMsgId) {
    const apiUrl = process.env.NEXT_PUBLIC_DASHBOARD_API_URL;
    const apiKey = process.env.DASHBOARD_API_KEY;
    if (apiUrl && apiKey) {
      try {
        const res = await fetch(apiUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'text/plain' },
          body: JSON.stringify({
            action: 'getGmailThread',
            msgId: job.gmailMsgId,
            address: job.address ?? '',
            apiKey,
          }),
        });
        const daData = await res.json() as {
          success: boolean;
          threadId?: string;
          messages?: Array<{
            id: string;
            from: string;
            fromEmail: string;
            toEmail: string;
            date: string;
            subject: string;
            body: string;
            isOutbound: boolean;
            attachments: Array<{ name: string; mimeType: string; size: number; url: string | null }>;
          }>;
        };

        if (daData.success && Array.isArray(daData.messages) && daData.messages.length > 0) {
          const insertRows = daData.messages.map(m => ({
            jobId,
            messageId:   m.id,
            threadId:    daData.threadId ?? null,
            direction:   m.isOutbound ? 'outbound' : 'inbound',
            stakeholder: deriveStakeholder(m.fromEmail, m.toEmail, effectiveRmEmail, tenantEmail ?? ''),
            fromEmail:   m.fromEmail,
            toEmail:     m.toEmail,
            subject:     m.subject,
            bodyPreview: m.body.substring(0, 500),
            fullBody:    m.body,
            sentAt:      parseMsgDate(m.date),
          }));

          // Cache to Neon — best-effort, don't block the read on cache failure
          try {
            await db.insert(commsMessages).values(insertRows).onConflictDoNothing();
          } catch (cacheErr) {
            console.error('[GET /api/comms] Neon cache write failed:', cacheErr);
          }

          return NextResponse.json({
            success: true,
            source: 'gmail',
            messages: daData.messages.map(m => ({
              from:        m.from,
              fromEmail:   m.fromEmail,
              toEmail:     m.toEmail,
              text:        m.body,
              timestamp:   m.date,
              isOutbound:  m.isOutbound,
              stakeholder: deriveStakeholder(m.fromEmail, m.toEmail, effectiveRmEmail, tenantEmail ?? ''),
              attachments: m.attachments ?? [],
            })),
          });
        }
      } catch (err) {
        console.error('[GET /api/comms] DashboardAPI fallback failed:', err);
        // Fall through: return empty array
      }
    }
  }
```

**Verification after Step 2c**: Count the lines in the new block — it should replace exactly the 22 lines of the old block. The rest of the file (Neon path return, POST handler, PATCH handler) is untouched.

---

### Task 3 — P2: Fix timestamp formatting and from-name in `JobDetailModal.tsx`

**File**: `tech-pwa/src/components/dashboard/JobDetailModal.tsx`

**Step 3a — Add `formatMsgTimestamp` helper**

Find the first line of the component function (`export default function JobDetailModal`) or the imports block at the top of the file. Add this module-level helper function before the component function (not inside it):

```typescript
function formatMsgTimestamp(ts: string): string {
  if (!ts || ts === 'Just now') return ts;
  const d = new Date(ts.replace(/ at /i, ' '));
  if (isNaN(d.getTime())) return ts;
  return (
    d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) +
    ' · ' +
    d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
  );
}
```

**Step 3b — Replace timestamp display**

Find the timestamp span in the thread rendering (currently around line 997–999):
```tsx
<span className="text-[9px] font-medium text-[var(--text-muted)] opacity-40">
  {msg.timestamp ?? ''}
</span>
```

Replace the inner expression only:
```tsx
<span className="text-[9px] font-medium text-[var(--text-muted)] opacity-40">
  {formatMsgTimestamp(msg.timestamp ?? '')}
</span>
```

**Step 3c — Fix outbound from-name display**

Find the sender name span in the thread rendering (currently around line 980–982):
```tsx
<span className="text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)]">
  {(msg.from ?? '').split(" <")[0] || 'Unknown'}
</span>
```

Replace the inner expression only:
```tsx
<span className="text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)]">
  {msg.isOutbound
    ? 'APT Dispatch'
    : (msg.from ?? '').split(' <')[0] || 'Unknown'}
</span>
```

---

### Task 4 — TypeScript check + diff artifact

```powershell
cd tech-pwa
npx tsc --noEmit
```

Zero errors required. If any errors, fix before proceeding — do not move on.

After zero errors:
```powershell
cd ..
git push origin HEAD
git diff main...HEAD > artifacts/ag_diff.txt
git add artifacts/ag_diff.txt
git commit -m "chore(s114): regenerate ag_diff"
git push origin HEAD
```

Post the TypeScript result and diff to Claude Code. Stop. Wait for PASS.

---

### Task 5 — Test sprint (separate session, after Claude Code PASS on diff)

Start dev server:
```powershell
cd tech-pwa && npm run dev
```

Open browser at http://localhost:3000. Log in with "Dev Login (Admin)".

**Test 1 — P1 comms fallback (APT-01392 or any job with `gmail_msg_id` and 0 comms rows)**

1. Navigate to `/live` → open a job that has email history but shows blank comms panel
2. Click the Comms tab
3. Observe: messages load and display
4. Record in test results:
   - Job ID tested: `______`
   - Message count shown: `______`
   - Source field in API response (`gmail` or `neon`): check browser Network tab → `/api/comms/[jobId]` → Response → `source: ______`
5. Close and reopen the same job
6. Click Comms tab again
7. Observe: messages load (now from Neon cache — should be faster)
8. Record: `source` field on second load: `______` (must be `neon`)

**Test 2 — P2 timestamp formatting**

With messages visible:
1. Confirm timestamps show in human-readable format (e.g., "Jan 5 · 3:45 PM") not raw ISO string
2. Record one timestamp as displayed: `______`

**Test 3 — P2 from-name display**

With messages visible:
1. Confirm outbound APT messages show "APT DISPATCH" (uppercase due to CSS)
2. Confirm inbound messages show sender name or email username (NOT `noreply@aptmaintenanceinc.com`)
3. Record what outbound sender shows: `______`

**Test 4 — Regression: existing Neon-cached jobs still load correctly**

1. Open any job that previously worked (had messages visible before S114)
2. Confirm comms still display correctly
3. Record job ID: `______`

Kill dev server after all tests:
```powershell
Get-NetTCPConnection -LocalPort 3000,3001,3010 -State Listen -ErrorAction SilentlyContinue | ForEach-Object { Stop-Process -Id $_.OwningProcess -Force -ErrorAction SilentlyContinue }
```

Write all results to `artifacts/ag_test_results.txt`. Post to Claude Code. Stop. Wait for clear-to-merge.

---

### Task 6 — Merge

Merge only after Claude Code issues "Clear to merge." Not before.

---

## P3 — Tenant info backfill (Brandon, no code changes)

`getJobDataFromRow()` in TechPWA.gs already maps `tenantEmail`, `tenantName`, `tenantPhone`
(confirmed at lines 1594–1596). The `/api/jobs/sync` route upserts via spread — tenant
fields will be saved. The `jobs` schema has all three columns.

**Brandon runs** (from GAS console → TechPWA.gs project → Run function):
```
bootstrapJobsToNeon()
```
Returns: "Synced N jobs to Neon."

**Post-run verification**: Open APT-01392 in `/live` → confirm `tenant_email` is now populated
(visible in the Comms tab stakeholder resolution, or check Neon directly).

---

## LOCKED DECISIONS

- DashboardAPI.gs is NOT changed in this sprint
- `commsMessages` schema is NOT changed in this sprint
- `@/lib/gmail-client.ts` is NOT changed in this sprint (the import is just removed from route.ts)
- No new columns, no schema migrations
