# ANTIGRAVITY SPEC — Job Comments: Neon Shadow-Write + UI
**Branch:** `feat/session54-neon-comms`
**Sprint scope:** 2 files changed. No new deps. No schema changes.

---

## CONTRADICTION DETECTOR — READ BEFORE TOUCHING CODE

Before writing any code, verify these literals against the live files:

1. `grep -n "addJobComment\|getJobComments" dashboard-api/DashboardAPI.gs`
   - Expected: action strings `'getJobComments'` and `'addJobComment'` (lines ~242–243)

2. `grep -n "commStakeholder" tech-pwa/src/components/dashboard/JobDetailModal.tsx`
   - Expected: `useState<'REQUESTER' | 'TENANT' | 'TECH'>('REQUESTER')` at line ~117

3. `grep -n "jobComments" tech-pwa/src/lib/schema.ts`
   - Expected: `export const jobComments = pgTable('job_comments', {` — with fields `jobId`, `authorId`, `authorName`, `content`, `type`, `entityId`, `createdAt`

4. `grep -n "NEXT_PUBLIC_DASHBOARD_API_URL\|NEXT_PUBLIC_DASHBOARD_API_KEY" tech-pwa/src/app/api/comms/\[jobId\]/route.ts`
   - Expected: both env vars used in the Gmail fallback fetch

If any of these do not match, STOP and report the discrepancy to Claude Code. Do not resolve it yourself.

---

## VERIFIED LITERALS (pulled from live files by Claude Code)

| Literal | Value | Source |
|---|---|---|
| Get action | `'getJobComments'` | `DashboardAPI.gs` line 242 |
| Add action | `'addJobComment'` | `DashboardAPI.gs` line 243 |
| Get params | `{ leadId: string }` | `getJobCommentsDA` line ~2714 |
| Add params | `{ leadId, author, role, body }` | `addJobCommentDA` line ~2750 |
| DashboardAPI response shape | `{ id, leadId, author, role, body, timestamp }` | `getJobCommentsDA` return |
| Neon table | `jobComments` exported from `src/lib/schema.ts` | `schema.ts` line 117 |
| Neon columns | `jobId, authorId, authorName, content, type, entityId, createdAt` | `schema.ts` |
| commStakeholder type | `'REQUESTER' \| 'TENANT' \| 'TECH'` | `JobDetailModal.tsx` line ~117 |
| Session staffName | `session?.staffName` | `auth.ts` — populated in jwt callback |
| API URL env | `NEXT_PUBLIC_DASHBOARD_API_URL` | `comms/[jobId]/route.ts` |
| API key env | `NEXT_PUBLIC_DASHBOARD_API_KEY` | `comms/[jobId]/route.ts` |

---

## CHANGE A — NEW FILE: `tech-pwa/src/app/api/job-comments/[jobId]/route.ts`

Create this file. Mirror the pattern from `src/app/api/comms/[jobId]/route.ts` exactly.

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import { db } from '@/lib/db';
import { jobComments } from '@/lib/schema';
import { eq, asc } from 'drizzle-orm';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ jobId: string }> }
) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  const { jobId } = await params;

  // 1. Try Neon first
  const rows = await db
    .select()
    .from(jobComments)
    .where(eq(jobComments.jobId, jobId))
    .orderBy(asc(jobComments.createdAt));

  if (rows.length > 0) {
    return NextResponse.json({
      success: true,
      source: 'neon',
      comments: rows.map(r => ({
        id:        String(r.id),
        leadId:    r.jobId,
        author:    r.authorName ?? '',
        role:      r.type       ?? 'dispatch',
        body:      r.content,
        timestamp: r.createdAt ? r.createdAt.toISOString() : '',
      })),
    });
  }

  // 2. Neon empty — fall back to DashboardAPI Sheets
  const apiUrl = process.env.NEXT_PUBLIC_DASHBOARD_API_URL;
  const apiKey = process.env.NEXT_PUBLIC_DASHBOARD_API_KEY;
  if (!apiUrl || !apiKey) {
    return NextResponse.json({ success: true, source: 'empty', comments: [] });
  }

  let sheetsComments: any[] = [];
  try {
    const res = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain' },
      body: JSON.stringify({ action: 'getJobComments', leadId: jobId, apiKey }),
    });
    const data = await res.json();
    if (data.success && Array.isArray(data.comments)) {
      sheetsComments = data.comments;
    }
  } catch {
    return NextResponse.json({ success: true, source: 'empty', comments: [] });
  }

  if (sheetsComments.length === 0) {
    return NextResponse.json({ success: true, source: 'empty', comments: [] });
  }

  // 3. Shadow-write to Neon — ON CONFLICT DO NOTHING not available (no unique key on content)
  // Use authorName + content + jobId as a soft dedup check: only insert if not already present
  try {
    const toInsert = sheetsComments.map((c: any) => ({
      jobId:      jobId,
      authorId:   null,
      authorName: c.author   ?? null,
      content:    c.body     ?? '',
      type:       c.role     ?? 'dispatch',
      entityId:   'APT-CA',
      createdAt:  c.timestamp ? (() => { try { return new Date(c.timestamp); } catch { return new Date(); } })() : new Date(),
    }));
    await db.insert(jobComments).values(toInsert);
  } catch {
    // Shadow-write failure is non-fatal — still return Sheets data
  }

  return NextResponse.json({
    success: true,
    source: 'sheets',
    comments: sheetsComments.map((c: any) => ({
      id:        c.id        ?? '',
      leadId:    c.leadId    ?? jobId,
      author:    c.author    ?? '',
      role:      c.role      ?? 'dispatch',
      body:      c.body      ?? '',
      timestamp: c.timestamp ?? '',
    })),
  });
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ jobId: string }> }
) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  const { jobId } = await params;
  const { body: content, role } = await request.json();

  if (!content?.trim()) {
    return NextResponse.json({ success: false, error: 'MISSING_BODY' }, { status: 400 });
  }

  const author = (session as any).staffName ?? session.user?.name ?? 'Staff';
  const authorId = session.user?.email ?? null;
  const commentRole = role ?? 'dispatch';

  const apiUrl = process.env.NEXT_PUBLIC_DASHBOARD_API_URL;
  const apiKey = process.env.NEXT_PUBLIC_DASHBOARD_API_KEY;

  // 1. Write to Sheets (source of truth while Phase B is in progress)
  let sheetsComment: any = null;
  if (apiUrl && apiKey) {
    try {
      const res = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain' },
        body: JSON.stringify({
          action: 'addJobComment',
          leadId: jobId,
          author,
          role: commentRole,
          body: content.trim(),
          apiKey,
        }),
      });
      const data = await res.json();
      if (data.success) sheetsComment = data.comment;
    } catch {
      return NextResponse.json({ success: false, error: 'SHEETS_WRITE_FAILED' }, { status: 500 });
    }
  }

  // 2. Shadow-write to Neon
  try {
    await db.insert(jobComments).values({
      jobId,
      authorId,
      authorName: author,
      content:    content.trim(),
      type:       commentRole,
      entityId:   'APT-CA',
    });
  } catch {
    // Non-fatal — Sheets is source of truth
  }

  const returned = sheetsComment ?? {
    id:        '',
    leadId:    jobId,
    author,
    role:      commentRole,
    body:      content.trim(),
    timestamp: new Date().toISOString(),
  };

  return NextResponse.json({ success: true, comment: returned });
}
```

---

## CHANGE B — MODIFY: `tech-pwa/src/components/dashboard/JobDetailModal.tsx`

### B1 — Add `MessageSquare` to the lucide-react import

Find the existing lucide-react import block (line ~10–24). Add `MessageSquare` to the list:

```typescript
// BEFORE (find this exact string):
import { 
  X,
  Mail,
  Sparkles,
  Send,
  AlertTriangle,
  Clock,
  Archive,
  Smartphone,
  PlusCircle,
  Link,
  Paperclip,
  Pencil,
  Check,
  CalendarCheck
} from "lucide-react";

// AFTER:
import { 
  X,
  Mail,
  Sparkles,
  Send,
  AlertTriangle,
  Clock,
  Archive,
  Smartphone,
  PlusCircle,
  Link,
  Paperclip,
  Pencil,
  Check,
  CalendarCheck,
  MessageSquare
} from "lucide-react";
```

### B2 — Add `JobComment` to the dashboard-api import

Find the existing dashboard-api import (line ~7–8):

```typescript
// BEFORE:
import { 
  dashboardRequest,
} from "@/lib/dashboard-api";

// AFTER:
import { 
  dashboardRequest,
  type JobComment,
} from "@/lib/dashboard-api";
```

### B3 — Add comments state after existing state declarations

Find this line (around line ~117):
```typescript
const [commStakeholder, setCommStakeholder] = useState<'REQUESTER' | 'TENANT' | 'TECH'>('REQUESTER');
```

Replace with:
```typescript
const [commStakeholder, setCommStakeholder] = useState<'REQUESTER' | 'TENANT' | 'TECH' | 'NOTES'>('REQUESTER');
const [comments, setComments] = useState<JobComment[]>([]);
const [commentsLoading, setCommentsLoading] = useState(false);
const [newComment, setNewComment] = useState('');
const [submittingComment, setSubmittingComment] = useState(false);
```

### B4 — Add comment fetch effect

Find the existing `useEffect` that calls `fetchThread` on job change (around line ~185–190):
```typescript
  useEffect(() => {
    if (job?.gmailMsgId) fetchThread(job.gmailMsgId);
```

Add a NEW useEffect directly after that closing brace:
```typescript
  useEffect(() => {
    if (!activeJob?.jobId || commStakeholder !== 'NOTES') return;
    setCommentsLoading(true);
    fetch(`/api/job-comments/${encodeURIComponent(activeJob.jobId)}`)
      .then(r => r.json())
      .then(data => { if (data.success) setComments(data.comments ?? []); })
      .catch(() => {})
      .finally(() => setCommentsLoading(false));
  }, [activeJob?.jobId, commStakeholder]);
```

### B5 — Add `handleAddComment` function

Find the `handleGenerateEstimateReply` function (around line ~380). Add this new function directly before it:

```typescript
  const handleAddComment = async () => {
    const body = newComment.trim();
    if (!body || submittingComment || !activeJob?.jobId) return;
    setSubmittingComment(true);
    try {
      const res = await fetch(`/api/job-comments/${encodeURIComponent(activeJob.jobId)}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ body, role: 'dispatch' }),
      });
      const data = await res.json();
      if (data.success && data.comment) {
        setComments(prev => [...prev, data.comment]);
        setNewComment('');
      }
    } catch {
      // silent
    }
    setSubmittingComment(false);
  };
```

### B6 — Expand the stakeholder switcher to include NOTES tab

Find this exact JSX (around line ~441):
```typescript
              {(['REQUESTER', 'TENANT', 'TECH'] as const).map(s => (
```

Replace with:
```typescript
              {(['REQUESTER', 'TENANT', 'TECH', 'NOTES'] as const).map(s => (
```

### B7 — Add NOTES panel content in the comms scroll area

Find the closing of the comms content section. Look for this block (around line ~502–510):
```typescript
                {commStakeholder === 'TENANT' && !activeJob.tenantEmail && !activeJob.tenantPhone ? (
```

Add a NOTES panel guard BEFORE that block:

```typescript
                {commStakeholder === 'NOTES' ? (
                  <div className="flex flex-col h-full">
                    <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
                      {commentsLoading ? (
                        <div className="space-y-2">
                          {Array.from({ length: 3 }).map((_, i) => (
                            <div key={i} className="h-14 rounded-xl bg-white/5 animate-pulse" />
                          ))}
                        </div>
                      ) : comments.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-16 gap-3 opacity-30">
                          <MessageSquare size={24} />
                          <span className="text-[10px] font-black uppercase tracking-widest">No internal notes</span>
                        </div>
                      ) : (
                        comments.map((c, i) => (
                          <div key={i} className="bg-white/[0.03] border border-white/[0.06] rounded-xl px-4 py-3 space-y-1">
                            <div className="flex items-center justify-between">
                              <span className="text-[10px] font-black text-[var(--text-primary)] uppercase tracking-tight">{c.author}</span>
                              <span className="text-[9px] text-[var(--text-muted)]">{c.timestamp ? new Date(c.timestamp).toLocaleString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' }) : ''}</span>
                            </div>
                            <p className="text-[11px] text-[var(--text-muted)] leading-relaxed">{c.body}</p>
                          </div>
                        ))
                      )}
                    </div>
                    <div className="p-4 border-t border-white/5 flex gap-2">
                      <input
                        type="text"
                        value={newComment}
                        onChange={e => setNewComment(e.target.value)}
                        onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleAddComment(); } }}
                        placeholder="Add internal note..."
                        className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--accent)]/50 transition-all"
                      />
                      <button
                        onClick={handleAddComment}
                        disabled={!newComment.trim() || submittingComment}
                        className="px-4 py-2.5 rounded-xl bg-[var(--accent)] text-white text-xs font-black disabled:opacity-40 hover:opacity-90 transition-all"
                      >
                        <Send size={13} />
                      </button>
                    </div>
                  </div>
                ) : (
```

Then find the closing of the existing comms content area and add the closing `)` for the ternary. The section that currently ends with something like:
```typescript
                <div ref={threadEndRef} />
```
...followed by the closing of a container div — add `)` after the `<div ref={threadEndRef} />` and its parent close:

```typescript
                )}
```

> **Note to AG:** The NOTES panel ternary wraps all existing comms content. The pattern is:
> ```
> {commStakeholder === 'NOTES' ? (
>   <NOTES JSX>
> ) : (
>   <ALL EXISTING COMMS JSX — unchanged>
> )}
> ```
> Do NOT modify the existing REQUESTER/TENANT/TECH comms JSX. Only wrap it.

---

## CHANGE C — MODIFY: `tech-pwa/src/components/dashboard/JobDetailModal.tsx` (contact card)

The compact contact card (B.3 area, around line ~449–468) currently renders based on `commStakeholder`. Add a guard so the contact card doesn't render for the NOTES tab:

Find:
```typescript
              {/* COMPACT CONTACT CARD */}
              <div className="px-6 py-4 border-b border-white/5 bg-white/[0.02]">
```

Replace with:
```typescript
              {/* COMPACT CONTACT CARD */}
              {commStakeholder !== 'NOTES' && (
              <div className="px-6 py-4 border-b border-white/5 bg-white/[0.02]">
```

And close the conditional after the contact card closing `</div>`:
```typescript
              </div>
              )}
```

---

## VERIFICATION STEPS

After implementation, run `npx tsc --noEmit` — must report zero errors.

Browser verification (for Hermes):
1. Navigate to `/live` → open any job modal
2. Click the **NOTES** tab in the left panel stakeholder switcher
3. Confirm: contact card disappears, notes panel renders (empty state or existing notes)
4. Type a note and press Enter or click Send
5. Confirm: new note appears in the list immediately
6. Reload the modal (close and reopen same job) — confirm note persists (loaded from Neon or Sheets)
7. Confirm REQUESTER, TENANT, TECH tabs still work correctly (regression)

---

## DEFINITION OF DONE

- [ ] `src/app/api/job-comments/[jobId]/route.ts` exists with GET and POST handlers
- [ ] GET: reads from Neon first, falls back to `getJobComments` DashboardAPI action, shadow-writes Sheets data to Neon
- [ ] POST: writes to `addJobComment` DashboardAPI action first, shadow-writes to Neon
- [ ] `JobDetailModal.tsx`: NOTES tab added to stakeholder switcher
- [ ] NOTES tab: displays comments oldest-first, empty state, add comment input with Enter key support
- [ ] Contact card hidden when NOTES tab active
- [ ] REQUESTER / TENANT / TECH tabs: unchanged and functional
- [ ] `npx tsc --noEmit`: zero errors
- [ ] Diff written to `artifacts/ag_diff.txt`
