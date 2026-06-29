# JOB DETAIL MODAL — COMPLETE REBUILD SPEC
# JobDetailModal.tsx — This is the entire product. Get this right.
#
# The modal is the dispatcher's primary work surface. Every action a dispatcher
# takes — reading the work order, contacting RM or tenant, assigning a tech,
# updating status, replying to email — happens here. Nothing else matters until
# this is complete and correct.

---

## LAYOUT OVERVIEW

Full-screen overlay. Two panels side by side. No tabs. Everything visible at once.

```
┌─────────────────────────────────────────────────────────────────────────┐
│ HEADER: Job ID · Address · Unit · [TYPE BADGE] · [PRIORITY BADGE]   [X] │
├───────────────────────────┬─────────────────────────────────────────────┤
│                           │                                             │
│   LEFT PANEL (40%)        │   RIGHT PANEL (60%)                         │
│   EMAIL THREAD            │   WORK ORDER + DISPATCH CONTROLS            │
│                           │                                             │
│   Full Gmail thread       │   Section 1: Work Order                     │
│   with all messages       │   Section 2: Access Info (highlighted)      │
│   expanded, newest        │   Section 3: Contacts (RM + Tenant)         │
│   at bottom.              │   Section 4: Dispatch Controls              │
│                           │   Section 5: Dispatcher Notes               │
│   ─────────────────────   │                                             │
│   REPLY ALL COMPOSER      │   ─────────────────────────────────────     │
│   [Draft with AI]         │   [Archive]  [Discard]  [Save Changes]      │
│   [SEND REPLY ALL →]      │                                             │
└───────────────────────────┴─────────────────────────────────────────────┘
```

---

## HEADER

Full width. Single row. Height: 56px.

**Left side:**
- Job ID in accent color (e.g., APT-00823)
- Address + Unit (e.g., "469 Van Buren Ave. · Unit 304")

**Center:**
- Email type badge — map `emailType` field to human label:
  - `turnover`        → "TURNOVER" (purple background)
  - `inspection`      → "INSPECTION" (blue background)
  - `adhoc_workorder` → "WORK ORDER" (neutral)
  - `new_inquiry`     → "NEW INQUIRY" (yellow)
  - `lapham_form`     → "WORK ORDER" (neutral) — legacy value, treat same as adhoc_workorder
  - anything else     → "GENERAL"
- Priority badge — map `priority` field:
  - `1-URGENT`      → "URGENT" (red)
  - `2-TURNOVER`    → "TURNOVER" (orange)
  - `3-PTE-PENDING` → "PTE" (yellow)
  - `4-STANDARD`    → "STANDARD" (muted)

**Right side:**
- X close button

---

## LEFT PANEL — EMAIL THREAD (40% width)

### Sub-header
- Left: "COMMUNICATION"
- Right: "OPEN IN GMAIL ↗" — link opens `https://mail.google.com/mail/u/0/#search/rfc822msgid:${job.gmailMsgId}` in new tab (this links directly to the thread, not just the inbox)

### Thread body (scrollable, newest message at bottom)

Each message renders as a bubble:

**Inbound messages** (isOutbound === false):
- Left-aligned
- Background: var(--bg-surface)
- Show: sender name (bold), sender email (muted, smaller), timestamp
- Full message body — do NOT truncate. Use `whitespace-pre-wrap` so line breaks render.

**Outbound messages** (isOutbound === true, from APT):
- Right-aligned
- Background: accent color at 10% opacity, accent border
- Same fields

**If no gmailMsgId:**
- "No email thread — this job was entered manually."

**If gmailMsgId exists but thread is empty after load:**
- "Could not load thread. Open in Gmail to view."

### Reply composer (pinned to bottom of left panel)

```
┌─────────────────────────────────────────┐
│ Type reply...                           │
│                                         │
│ (textarea, min 5 rows)                  │
└─────────────────────────────────────────┘
[✦ Draft with AI]              [SEND REPLY ALL →]
```

- **"SEND REPLY ALL"** — label must say "REPLY ALL" not "SEND REPLY". The backend sends to all thread participants. Dispatcher must know this.
- Disabled if no gmailMsgId.
- "Draft with AI" calls getDraftReply and populates the textarea.

---

## RIGHT PANEL — WORK ORDER + DISPATCH (60% width, scrollable)

### SECTION 1: WORK ORDER

Label: "WORK ORDER"

Fields to show (skip if empty):
- **Service Category:** `job.serviceCategory` — shown as a tag/pill
- **Description:** `job.description` — full text, `whitespace-pre-wrap`, no truncation
- **Preferred Timing:** `job.preferredTiming` — if not empty
- **Estimate Needed:** `job.estimateNeeded` — show as "Yes" / "No" / hide if empty

---

### SECTION 2: ACCESS INFO

Label: "PROPERTY ACCESS"

This section is CRITICAL for dispatch. Highlight it with an amber/orange left border.

- Show `job.accessInfo` in full — no truncation, `whitespace-pre-wrap`
- If empty: show "No access info on file" in muted text

---

### SECTION 3: CONTACTS

Label: "CONTACTS"

Two sub-sections side by side (or stacked on narrow):

**Resident Manager:**
- Name: `job.rmName` or "Not provided"
- Email: `job.rmEmail` — if present, show as a clickable button:
  `[✉ Email RM]` → clicking this loads the reply composer with the RM's email as context and focuses the textarea. The reply will go via the thread (reply all). This is correct behavior — RM is already on the thread.

**Tenant:**
- Name: `job.tenantName` or "Not provided"
- Phone: `job.tenantPhone` or "Not provided" — if present, show as `tel:` link
- Email: `job.tenantEmail` — if present, show `[✉ Email Tenant]` button
  → clicking loads a PTE email template into the reply composer textarea:
  ```
  Hi [tenantName],

  We have a maintenance request scheduled for your unit at [address][unit]. 
  We'd like to confirm — do we have your permission to enter if you are not home?

  Please reply to confirm or call us at your convenience.

  Thank you,
  APT Maintenance
  ```
- PTE Granted: `job.pteGranted` — show as pill: "PTE: Yes" / "PTE: No" / "PTE: N/A"
- Preferred Contact: `job.tenantPrefContact` — if not "Unknown"
- Has Pets: `job.tenantHasPets` — if not "Unknown", show as small note (techs need to know)

---

### SECTION 4: DISPATCH CONTROLS

Label: "DISPATCH"

**Status** — dropdown showing all valid statuses:
- Open
- Scheduled
- PTE-Pending
- Tenant Contacted
- Approval Needed
- Complete

Current value pre-selected. Changing status updates `activeJob.status` locally (save commits it).

**Assigned Tech** — text input, pre-filled with `job.assignedTech`.

Below the text input: **SuggestTechs** — collapsed by default, expandable.
When expanded, shows top 3 suggestions from `suggestTechs` API call.
Clicking a suggestion fills the Assigned Tech field.
Load suggestions lazily when the section is expanded (not on modal open).

**Scheduled Date** — date input, value = `job.scheduledDate`

**Arrival Window** — time input, value = `job.scheduledTime`

**Est. Hours** — number input, value = `job.estimatedHours`

---

### SECTION 5: DISPATCHER NOTES

Label: "DISPATCHER NOTES"

Textarea, pre-filled with `job.notes`. Full height, no truncation.
This is for internal notes only — not sent anywhere.

---

## FOOTER (right panel, pinned to bottom)

Three buttons, right-aligned:

1. **Archive** — calls `archiveJob` with `job.rowIndex`. Closes modal on success.
   Style: muted/destructive (red text, no fill)

2. **Discard** — closes modal without saving.
   Style: muted text

3. **Save Changes** — calls `updateJob` with all dispatch control values.
   Style: primary button (white background, dark text)

---

## WHAT TO REMOVE

- Delete the status-driven "HUD" panels (the big ASSIGN & SCHEDULE / GET PERMISSION TO ENTER / SCHEDULED centered displays). These replaced the job info instead of adding to it. The right panel should always show all job information — dispatch controls are always visible regardless of status.
- The status drives the ROW COLOR in the job table (already implemented). It does not drive what the dispatcher sees inside the modal.

---

## WHAT TO KEEP (already working)

- `fetchThread` logic with `m.body` → `text` mapping (fixed in previous commit) ✅
- `handleSave` calling `updateJob` ✅
- `handleSendReply` calling `replyToThread` ✅
- `handleDraftReply` calling `getDraftReply` ✅
- Framer Motion open/close animation ✅

---

## LIVE PAGE JOB TABLE — ADD TYPE COLUMN

In `JobQueueTable.tsx` (or wherever the job rows render on `/live`):

Add a visible badge column for `emailType` using the same label map from the header above.
This is how Robert segments his queue — turnovers are a different workflow than standard repairs.
Currently there is no way to distinguish job types at a glance. This is a required addition.

Filter buttons above the table:
`[ALL]  [TURNOVER]  [INSPECTION]  [WORK ORDER]  [NEW INQUIRY]`

Clicking a filter shows only jobs of that type. "ALL" is default.

---

## DELETE

`src/app/messages/page.tsx` — delete this file entirely.
Remove "Messages" from the sidebar navigation in `AppSidebar.tsx`.

All communication belongs inside the job modal where it has context.
A standalone inbox with no job linkage has no dispatch value.
