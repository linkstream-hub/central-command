# ANTIGRAVITY SPEC — SESSION 52: NEON COMMS SHADOW WRITE
**Status:** Ready for AG implementation
**Sprint type:** Implementation only (no test sprint in same session)
**Base commit:** 3a585d5

---

## OBJECTIVE

Wire the job comms tab to Neon Postgres instead of calling Gmail directly on every open.
Three files change. Neon is already provisioned. Schema is already pushed. Packages are installed.

---

## PREREQUISITES (already done — do not repeat)

- `drizzle-orm`, `drizzle-kit`, `@neondatabase/serverless` installed in `tech-pwa/`
- `tech-pwa/drizzle.config.ts` exists
- `tech-pwa/src/lib/db.ts` exists
- `tech-pwa/src/lib/schema.ts` exists with `commsMessages` table
- `comms_messages` table live in Neon (schema already pushed)

---

## VERIFIED LITERALS — pulled from live files

| Literal | Source |
|---|---|
| `dashboardRequest('getGmailThread', { msgId, address })` | `JobDetailModal.tsx:169` |
| `thread` state variable, type `ThreadMessage[]` | `JobDetailModal.tsx:101` |
| `loading.thread` loading key | `JobDetailModal.tsx:128` |
| `fetchThread` function name | `JobDetailModal.tsx:167` |
| `job.jobId` — Lead ID field (dispatch queue col 2) | `JobDetailModal.tsx:203` |
| `job.gmailMsgId` — Gmail message ID field | `JobDetailModal.tsx:190` |
| `job.address` — used as address param | `JobDetailModal.tsx:169` |
| `ThreadMessage` interface imported from `'@/lib/types'` | `JobDetailModal.tsx:26` |
| `ThreadMessage.text` field (maps from `body`) | `types.ts:141` |
| `ThreadMessage.timestamp` field (maps from `date`) | `types.ts:143` |
| Gmail response shape: `{ id, from, fromEmail, toEmail, date, subject, body, isOutbound, attachments }` | `DashboardAPI.gs:1343-1353` |
| Gmail thread response: `{ success, threadId, messages }` | `DashboardAPI.gs:1356-1362` |
| `NEXT_PUBLIC_DASHBOARD_API_URL` env var | `dashboard-api.ts:392` |
| `NEXT_PUBLIC_DASHBOARD_API_KEY` env var | `auth.ts:13` |
| `commsMessages` table export | `src/lib/schema.ts` |
| `db` export | `src/lib/db.ts` |
| Auth import pattern: `import { handlers } from '@/auth'` | `src/app/api/auth/[...nextauth]/route.ts:1` |

---

## CHANGES — EXACT FILES

### FILE 1: `tech-pwa/src/lib/schema.ts` — fix nullable fields

**Read the file first. Then make exactly these changes:**

Remove `.notNull()` from `direction` and `stakeholder`. Both must be nullable because the shadow-write path cannot always determine stakeholder at write time.

Replace:
```typescript
  direction:    text('direction').notNull(),
  stakeholder:  text('stakeholder').notNull(),
```

With:
```typescript
  direction:    text('direction'),
  stakeholder:  text('stakeholder'),
```

No other changes to this file.

---

### SCHEMA MIGRATION — run after FILE 1

After editing `schema.ts`, run from `tech-pwa/`:

```
npx drizzle-kit push
```

Confirm when prompted. This makes `direction` and `stakeholder` nullable in Neon.

---

### FILE 2: `tech-pwa/src/app/api/comms/[jobId]/route.ts` — NEW FILE

Create the directory `src/app/api/comms/[jobId]/` and create `route.ts` with this exact content:

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import { db } from '@/lib/db';
import { commsMessages } from '@/lib/schema';
import { eq } from 'drizzle-orm';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ jobId: string }> }
) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  const { jobId } = await params;
  const { searchParams } = request.nextUrl;
  const msgId   = searchParams.get('msgId')   ?? '';
  const address = searchParams.get('address') ?? '';

  // 1. Try Neon first
  const rows = await db
    .select()
    .from(commsMessages)
    .where(eq(commsMessages.jobId, jobId))
    .orderBy(commsMessages.sentAt);

  if (rows.length > 0) {
    return NextResponse.json({
      success: true,
      source: 'neon',
      messages: rows.map(r => ({
        from:        r.fromEmail ?? '',
        fromEmail:   r.fromEmail ?? '',
        toEmail:     r.toEmail   ?? '',
        text:        r.fullBody  ?? r.bodyPreview ?? '',
        timestamp:   r.sentAt ? r.sentAt.toISOString() : '',
        isOutbound:  r.direction === 'outbound',
        attachments: [],
      })),
    });
  }

  // 2. Neon empty — fall back to Gmail via Dashboard API
  if (!msgId) {
    return NextResponse.json({ success: true, source: 'empty', messages: [] });
  }

  const apiUrl = process.env.NEXT_PUBLIC_DASHBOARD_API_URL;
  const apiKey = process.env.NEXT_PUBLIC_DASHBOARD_API_KEY;
  if (!apiUrl || !apiKey) {
    return NextResponse.json({ success: false, error: 'API not configured' }, { status: 500 });
  }

  let gmailMessages: any[] = [];
  let threadId = '';

  try {
    const res = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain' },
      body: JSON.stringify({ action: 'getGmailThread', msgId, address, apiKey }),
    });
    const data = await res.json();
    if (data.success && data.messages) {
      gmailMessages = data.messages;
      threadId = data.threadId ?? '';
    }
  } catch {
    // Gmail fetch failed — return empty gracefully
    return NextResponse.json({ success: true, source: 'empty', messages: [] });
  }

  if (gmailMessages.length === 0) {
    return NextResponse.json({ success: true, source: 'empty', messages: [] });
  }

  // 3. Shadow write to Neon — ON CONFLICT DO NOTHING (message_id is unique)
  const rows_to_insert = gmailMessages.map((m: any) => ({
    jobId:       jobId,
    messageId:   m.id,
    threadId:    threadId || null,
    direction:   m.isOutbound ? 'outbound' : 'inbound',
    stakeholder: null,
    fromEmail:   m.fromEmail  ?? null,
    toEmail:     m.toEmail    ?? null,
    subject:     m.subject    ?? null,
    bodyPreview: m.body ? m.body.substring(0, 500) : null,
    fullBody:    m.body       ?? null,
    sentAt:      m.date ? (() => { try { return new Date(m.date.replace(' at ', ' ')); } catch { return null; } })() : null,
  }));

  try {
    await db.insert(commsMessages).values(rows_to_insert).onConflictDoNothing();
  } catch {
    // Shadow write failure is non-fatal — still return the Gmail data
  }

  // 4. Return Gmail messages in ThreadMessage shape
  return NextResponse.json({
    success: true,
    source: 'gmail',
    messages: gmailMessages.map((m: any) => ({
      from:        m.from      ?? m.fromEmail ?? '',
      fromEmail:   m.fromEmail ?? '',
      toEmail:     m.toEmail   ?? '',
      text:        m.body      ?? '',
      timestamp:   m.date      ?? '',
      isOutbound:  m.isOutbound ?? false,
      attachments: Array.isArray(m.attachments) ? m.attachments : [],
    })),
  });
}
```

---

### FILE 3: `tech-pwa/src/components/dashboard/JobDetailModal.tsx` — update fetchThread

**Read the file first. Then make exactly these two changes:**

**Change A — fetchThread function (lines 167–187):**

Replace:
```typescript
  const fetchThread = useCallback(async (msgId: string) => {
    try {
      const res = await dashboardRequest('getGmailThread', { msgId, address: job?.address ?? '' });
      const data = res.response || res;
      if (data.success && (data.thread || data.messages)) {
        const msgs = (data.thread?.messages || data.messages) || [];
        setThread(msgs.map((m: any) => ({
          from: m.from || m.fromEmail || 'Unknown',
          fromEmail: m.fromEmail || (m.from.includes('<') ? m.from.split('<')[1].split('>')[0] : ''),
          toEmail: m.toEmail || '',
          text: m.body || '',
          timestamp: m.date || m.timestamp || '',
          isOutbound: m.isOutbound || false,
          attachments: Array.isArray(m.attachments) ? m.attachments : []
        })));
      }
    } catch (error) {
       console.error("Failed to fetch thread:", error);
    }
    setLoading(prev => ({ ...prev, thread: false }));
  }, [job?.address]);
```

With:
```typescript
  const fetchThread = useCallback(async (msgId: string) => {
    try {
      const jobId  = job?.jobId ?? '';
      const address = encodeURIComponent(job?.address ?? '');
      const res = await fetch(
        `/api/comms/${encodeURIComponent(jobId)}?msgId=${encodeURIComponent(msgId)}&address=${address}`
      );
      const data = await res.json();
      if (data.success && Array.isArray(data.messages)) {
        setThread(data.messages as ThreadMessage[]);
      }
    } catch (error) {
      console.error('Failed to fetch thread:', error);
    }
    setLoading(prev => ({ ...prev, thread: false }));
  }, [job?.jobId, job?.address]);
```

**Change B — useCallback dependency array only:**

The dependency array in the original is `[job?.address]`. The replacement above already has `[job?.jobId, job?.address]`. Confirm the replacement includes both — it does.

No other changes to this file.

---

## COMPLETION CHECKLIST

1. [ ] Read `src/lib/schema.ts` — confirm `.notNull()` present on `direction` and `stakeholder` before editing
2. [ ] Edit `schema.ts` — remove `.notNull()` from both fields
3. [ ] Run `npx drizzle-kit push` from `tech-pwa/` — confirm "[✓] Changes applied"
4. [ ] Create `src/app/api/comms/[jobId]/route.ts` — exact content above
5. [ ] Read `JobDetailModal.tsx` lines 167–187 — confirm `fetchThread` matches the "Replace" block exactly before editing
6. [ ] Edit `JobDetailModal.tsx` — replace `fetchThread`, confirm dependency array is `[job?.jobId, job?.address]`
7. [ ] Run `npx tsc --noEmit` from `tech-pwa/` — must report zero errors
8. [ ] Run `git diff HEAD | Out-File -FilePath artifacts/ag_diff.txt -Encoding UTF8`
9. [ ] Report: "Implementation complete. tsc: zero errors. Diff written to artifacts/ag_diff.txt."

---

## WHAT NOT TO TOUCH

- `drizzle.config.ts` — do not modify
- `src/lib/db.ts` — do not modify
- `dashboard-api.ts` — do not modify (mock `getGmailThread` case stays for other consumers)
- Any `.gs` or `.js` files at repo root — do not touch
- `DashboardAPI.gs` — do not touch

---

## BEHAVIOR AFTER THIS SPRINT

- First time a job's comms tab is opened → hits Gmail → writes to Neon → returns messages
- Every subsequent open → reads from Neon instantly (no Gmail call)
- `source` field in response (`'neon'`, `'gmail'`, `'empty'`) is for future debugging — not displayed
- Attachments: still returned from Gmail path. Neon path returns empty attachment array (attachments are Drive URLs stored on Gmail messages — not duplicated to Neon)
- Dev mode with mock jobIds: Gmail call fails → route returns empty → comms tab shows empty state (expected — mock msgIds are not real Gmail IDs)
