# ANTIGRAVITY_COMMS_SPEC.md
# Internal Communications Phase 1 — Job Card Threads
# Sprint owner: Antigravity | Spec author: Claude Code | Date: 2026-04-26

---

## OVERVIEW

Add an internal comment thread to every job card in CC2.0. This is the Height model: conversations live on the work object, not in email. Field questions, dispatcher notes, scope clarifications — everything typed by office staff about a job lives on that job card forever.

This is NOT the Gmail email thread (which already exists in the modal). It is an internal-only APT staff thread stored in a new `JobComments` sheet tab.

**Phase 1 scope:** Comments only. No read receipts, no @mentions, no attachments. Plain text, timestamped, author-tagged. Phase 2 will add 1:1 DMs.

---

## WHAT TO BUILD

### New files
- None

### Files to edit
- `dashboard-api/DashboardAPI.gs` — add `getJobComments`, `addJobComment` actions + functions + sheet auto-creation
- `tech-pwa/src/lib/dashboard-api.ts` — add `JobComment`, `JobCommentsResponse` types
- `tech-pwa/src/components/dashboard/JobDetailModal.tsx` — add "Internal Thread" section at bottom of modal scroll area

### Do NOT touch
- Any other page or component file
- The Gmail thread section (`fetchThread`, `thread` state, `replyToThread` action) — leave exactly as-is
- Any existing DashboardAPI.gs functions — only ADD

---

## SHEET SCHEMA — `JobComments` tab

**Spreadsheet:** APT Lead Intake Master (`1eCSHpj5381R7Hhloe718r1n8fEfesY2tjYOuOLxTSd4`)
**Tab name:** `JobComments`
**Auto-created by `ensureJobCommentsSheet()` on first write — do NOT pre-create manually.**

Column layout (1-indexed for sheet, 0-indexed for code):
```
Col 1 (0): Comment ID     — UUID string (e.g. "c_1745700000000_4f2a")
Col 2 (1): Lead ID        — matches DQ Lead ID (col 2 of Dispatch Queue, string)
Col 3 (2): Author         — display name of commenter (e.g. "Robert T.")
Col 4 (3): Role           — commenter's role ('dispatch'|'management'|'hr'|'compliance'|'admin')
Col 5 (4): Body           — comment text (may be multi-line; stored as-is)
Col 6 (5): Timestamp      — ISO 8601 string, America/Los_Angeles timezone
```

---

## BACKEND — DashboardAPI.gs

### Step 1: Wire actions in `doPost`

After the `getNotifications` line:
```javascript
if (action === 'getJobComments')  return daResponse(getJobCommentsDA(body));
if (action === 'addJobComment')   return daResponse(addJobCommentDA(body));
```

### Step 2: Add sheet helper

```javascript
function getJobCommentsSheet() {
  var ss = SpreadsheetApp.openById('1eCSHpj5381R7Hhloe718r1n8fEfesY2tjYOuOLxTSd4');
  var sheet = ss.getSheetByName('JobComments');
  if (!sheet) {
    sheet = ss.insertSheet('JobComments');
    sheet.getRange(1, 1, 1, 6).setValues([[
      'Comment ID', 'Lead ID', 'Author', 'Role', 'Body', 'Timestamp'
    ]]);
    sheet.setFrozenRows(1);
  }
  return sheet;
}
```

### Step 3: Add `getJobCommentsDA`

```javascript
// Returns all comments for a given Lead ID, sorted oldest-first.
// Params: { leadId: string }
// Returns: { success: true, comments: JobComment[] }
function getJobCommentsDA(params) {
  try {
    var leadId = String((params && params.leadId) || '').trim();
    if (!leadId) return { success: false, error: 'MISSING_LEAD_ID', comments: [] };

    var sheet = getJobCommentsSheet();
    if (sheet.getLastRow() < 2) return { success: true, comments: [] };

    var data  = sheet.getDataRange().getValues().slice(1);
    var comments = [];

    data.forEach(function(row) {
      if (String(row[1] || '').trim() !== leadId) return;
      var body = String(row[4] || '').trim();
      if (!body) return; // Skip blank rows
      comments.push({
        id        : String(row[0] || '').trim(),
        leadId    : String(row[1] || '').trim(),
        author    : String(row[2] || '').trim(),
        role      : String(row[3] || '').trim(),
        body      : body,
        timestamp : String(row[5] || '').trim()
      });
    });

    // Sort oldest-first (timestamp ascending)
    comments.sort(function(a, b) {
      return String(a.timestamp || '').localeCompare(String(b.timestamp || ''));
    });

    return { success: true, comments: comments };
  } catch (e) {
    Logger.log('getJobCommentsDA error: ' + e.message);
    return { success: false, error: e.message, comments: [] };
  }
}
```

### Step 4: Add `addJobCommentDA`

```javascript
// Appends a new comment to the JobComments sheet.
// Params: { leadId, author, role, body }
// Returns: { success: true, comment: JobComment }
function addJobCommentDA(params) {
  try {
    var leadId = String((params && params.leadId) || '').trim();
    var author = String((params && params.author) || '').trim();
    var role   = String((params && params.role)   || 'dispatch').trim();
    var body   = String((params && params.body)   || '').trim();

    if (!leadId || !author || !body) {
      return { success: false, error: 'MISSING_FIELDS' };
    }
    // Hard cap: 2000 chars per comment
    if (body.length > 2000) body = body.slice(0, 2000);

    var now       = new Date();
    var timestamp = Utilities.formatDate(now, 'America/Los_Angeles', "yyyy-MM-dd'T'HH:mm:ss");
    var id        = 'c_' + now.getTime() + '_' + Math.random().toString(36).slice(2, 6);

    var sheet = getJobCommentsSheet();
    sheet.appendRow([id, leadId, author, role, body, timestamp]);

    return {
      success : true,
      comment : { id: id, leadId: leadId, author: author, role: role, body: body, timestamp: timestamp }
    };
  } catch (e) {
    Logger.log('addJobCommentDA error: ' + e.message);
    return { success: false, error: e.message };
  }
}
```

---

## FRONTEND — dashboard-api.ts types

Append to the types section:

```typescript
export interface JobComment {
  id: string;
  leadId: string;
  author: string;
  role: string;
  body: string;
  timestamp: string;
}

export interface JobCommentsResponse {
  success: boolean;
  comments: JobComment[];
}
```

---

## FRONTEND — JobDetailModal.tsx

### New state variables (add to the existing state block near line 59):

```typescript
const [jobComments, setJobComments]         = useState<JobComment[]>([]);
const [commentBody, setCommentBody]         = useState('');
const [commentLoading, setCommentLoading]   = useState(false);
const [postingComment, setPostingComment]   = useState(false);
```

### Import addition:

```typescript
import { JobComment } from "@/lib/dashboard-api";
```

### Comment fetch function (add near `fetchThread`):

```typescript
const fetchJobComments = useCallback(async (leadId: string) => {
  setCommentLoading(true);
  try {
    const res = await dashboardRequest('getJobComments', { leadId }) as JobCommentsResponse;
    if (res.success) setJobComments(res.comments ?? []);
    else setJobComments([]);
  } catch {
    setJobComments([]);
  }
  setCommentLoading(false);
}, []);
```

### Trigger fetch on modal open (in the `useEffect` that depends on `[job, fetchThread]`):

Find the existing `useEffect`:
```typescript
useEffect(() => {
  if (job?.gmailMsgId) fetchThread(job.gmailMsgId);
  setScopeExpansion({ open: false, additionalWork: '', hoursToAdd: 0, reassignTech: '' });
  setConfirmArchive(false);
  setActiveJob(job);
  setIsEditMode(false);
}, [job, fetchThread]);
```

Add to it (do NOT replace — append two new lines inside the effect body):
```typescript
  setJobComments([]);
  setCommentBody('');
  if (job?.jobId) fetchJobComments(job.jobId);
```

The `jobId` field maps to the Lead ID (it is the `LEAD_ID` value from DQ col 2 via `rowToJob`).

### Post comment handler (add near `handleSendReply`):

```typescript
const handlePostComment = async () => {
  if (!commentBody.trim() || !activeJob?.jobId) return;
  setPostingComment(true);
  const session = getSession();
  const res = await dashboardRequest('addJobComment', {
    leadId: activeJob.jobId,
    author: session?.techName ?? 'Dispatcher',
    role  : session?.role    ?? 'dispatch',
    body  : commentBody.trim()
  });
  if (res.success) {
    setCommentBody('');
    await fetchJobComments(activeJob.jobId);
  }
  setPostingComment(false);
};
```

Add `import { getSession } from "@/lib/auth";` if not already present.

### Internal Thread section in JSX

Find the "SECTION 5: DISPATCHER NOTES" section. Add the new "Internal Thread" section **immediately after** the closing `</section>` tag of the dispatcher notes section (the last section before the modal closes):

```tsx
{/* ── SECTION 6: INTERNAL THREAD ── */}
<section className="space-y-4 pt-10 border-t border-white/5">
  <div className="flex items-center gap-2">
    <MessageSquare size={14} className="text-[var(--text-muted)]" />
    <h4 className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-[0.3em]">
      Internal Thread
    </h4>
    {jobComments.length > 0 && (
      <span className="text-[9px] font-black text-[var(--accent)] bg-[var(--accent)]/10 px-1.5 py-0.5 rounded-full">
        {jobComments.length}
      </span>
    )}
  </div>

  {/* Comment list */}
  <div className="space-y-3 max-h-64 overflow-y-auto custom-scrollbar pr-1">
    {commentLoading ? (
      <div className="space-y-2 animate-pulse">
        {[1,2].map(i => <div key={i} className="h-12 rounded-xl bg-white/5" />)}
      </div>
    ) : jobComments.length === 0 ? (
      <p className="text-[10px] text-[var(--text-muted)] italic px-1">
        No internal comments yet. Be the first.
      </p>
    ) : (
      jobComments.map(c => <CommentBubble key={c.id} comment={c} />)
    )}
  </div>

  {/* Compose */}
  <div className="flex gap-3 items-end">
    <textarea
      value={commentBody}
      onChange={e => setCommentBody(e.target.value)}
      onKeyDown={e => { if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) handlePostComment(); }}
      rows={2}
      placeholder="Add an internal note… (Cmd+Enter to post)"
      maxLength={2000}
      className="flex-1 bg-white/5 border border-[var(--border-subtle)] rounded-xl px-3 py-2 text-xs text-[var(--text-primary)] placeholder-[var(--text-muted)] resize-none focus:outline-none focus:border-[var(--accent)]/40 transition-colors"
    />
    <button
      onClick={handlePostComment}
      disabled={!commentBody.trim() || postingComment}
      className="px-4 py-2 rounded-xl bg-[var(--accent)]/15 text-[var(--accent)] text-[10px] font-black uppercase tracking-widest disabled:opacity-30 hover:bg-[var(--accent)]/25 transition-all flex-shrink-0"
    >
      {postingComment ? '…' : 'Post'}
    </button>
  </div>
</section>
```

### `CommentBubble` sub-component (add at the bottom of JobDetailModal.tsx, outside the main export):

```tsx
import { JobComment } from "@/lib/dashboard-api";

const ROLE_COLORS: Record<string, string> = {
  dispatch   : 'text-blue-400',
  management : 'text-purple-400',
  hr         : 'text-green-400',
  compliance : 'text-amber-400',
  admin      : 'text-orange-400',
};

function CommentBubble({ comment }: { comment: JobComment }) {
  const roleColor = ROLE_COLORS[comment.role] ?? 'text-[var(--text-muted)]';
  const timeLabel = (() => {
    try {
      return new Date(comment.timestamp).toLocaleString('en-US', {
        month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit',
        hour12: true, timeZone: 'America/Los_Angeles'
      });
    } catch { return comment.timestamp; }
  })();

  return (
    <div className="flex gap-3 group">
      {/* Avatar */}
      <div className="w-6 h-6 rounded-lg bg-white/10 flex items-center justify-center text-[9px] font-black text-[var(--text-primary)] flex-shrink-0 mt-0.5">
        {comment.author[0]?.toUpperCase() ?? '?'}
      </div>
      {/* Bubble */}
      <div className="flex-1 min-w-0">
        <div className="flex items-baseline gap-2 mb-1">
          <span className="text-[10px] font-black text-[var(--text-primary)]">{comment.author}</span>
          <span className={`text-[9px] font-bold uppercase tracking-widest ${roleColor}`}>{comment.role}</span>
          <span className="text-[9px] text-[var(--text-muted)]">{timeLabel}</span>
        </div>
        <div className="text-xs text-[var(--text-primary)] whitespace-pre-wrap leading-relaxed bg-white/[0.03] border border-[var(--border-subtle)] rounded-xl px-3 py-2">
          {comment.body}
        </div>
      </div>
    </div>
  );
}
```

Add `MessageSquare` to the existing lucide-react import in `JobDetailModal.tsx`. It is likely already imported from the sidebar — confirm or add:
```typescript
import { ..., MessageSquare } from "lucide-react";
```

---

## VERIFICATION STEPS

1. Open any job in the `JobDetailModal`. Scroll to the bottom — "Internal Thread" section is visible below "Internal Dispatcher Notes."
2. The comment list shows skeleton loaders while fetching, then "No internal comments yet" if empty.
3. Type a comment and click "Post" — comment appears in the list immediately (refetched after post).
4. Cmd+Enter (Mac) / Ctrl+Enter (Win) also posts the comment.
5. Posted comments show: author name, role badge (colored by role), timestamp, body text.
6. Second comment from a different role (simulate by changing login): different role color.
7. Closing and reopening the modal re-fetches comments fresh.
8. `JobComments` sheet tab appears in APT Lead Intake Master after first post (auto-created).
9. The Gmail email thread section above is completely unaffected.
10. `tsc --noEmit` — zero errors.
11. `JobComment` type properly imported from `dashboard-api.ts` — no `any` casting.
12. Comment textarea shows character limit behavior at 2000 chars (maxLength attribute enforced natively).
13. "Post" button is disabled while `commentBody` is empty or while `postingComment` is true.
