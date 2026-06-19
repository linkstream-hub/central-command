# ANTIGRAVITY SPEC — Gmail Thread: iMessage UI + Google Drive Attachments
**Author:** Claude Code  
**Date:** April 29, 2026  
**Replaces:** Previous version of this spec (quote stripping + base64 attachments).
**Quote stripping is already live (DashboardAPI.gs v29) — do not re-implement it.**

**Read every line. Do not freelance.**

---

## WHAT THIS BUILDS

Two improvements to the Gmail thread panel in `JobDetailModal`:

1. **iMessage-style conversation UI (frontend only):** Replace the current bubble layout with a proper SMS/iMessage-style conversation. Inbound messages (RM → APT) float left with a dark bubble. Outbound messages (APT → RM) float right with an accent-color bubble. Sender name and timestamp appear outside the bubble, not inside it. No quoted reply text (already stripped by the backend).

2. **Google Drive attachment URLs (backend + frontend):** Instead of base64-encoding attachments inline, save email attachments to a Google Drive folder (organized by property address) and return a permanent Drive URL. The frontend renders images from that URL — no base64, no size limits, no CORS issues.

---

## FILES TO TOUCH

1. `dashboard-api/DashboardAPI.gs` — replace base64 logic with Drive upload, update `getGmailThreadDA`
2. `tech-pwa/src/lib/types.ts` — change `ThreadAttachment.data` to `url`
3. `tech-pwa/src/components/dashboard/JobDetailModal.tsx` — full iMessage UI rewrite of the thread panel, update `AttachmentRow` to use URLs

**Do not touch:** any other file. Do not change the reply composer, the CommentBubble (internal thread), or any other panel in the modal.

---

## FEATURE 1 — DashboardAPI.gs: Google Drive Attachment Storage

### Drive folder architecture

Attachments are saved to:
```
APT Email Attachments/
  407 Perkins St #306/
    IMG_9292.jpeg
    IMG_9292_1.jpeg   ← suffix if duplicate filename
  1234 Oak Ave #101/
    photo.jpg
```

The root folder `APT Email Attachments` is created once if it does not exist. Subfolders are created per property address (using the job address passed from context — see below).

### Updated `getGmailThreadDA` signature

The existing signature is `getGmailThreadDA(msgId)`. Add an optional second parameter `address`:

```javascript
function getGmailThreadDA(msgId, address) {
```

In `doPost`, update the call:
```javascript
if (action === 'getGmailThread') return daResponse(getGmailThreadDA(body.msgId, body.address));
```

`address` is used to name the Drive subfolder. If not provided, default to `'Attachments'`.

### Add `saveAttachmentToDrive` helper

Add this function immediately before `getGmailThreadDA`:

```javascript
/**
 * Saves a GmailAttachment to Drive under APT Email Attachments/{address}/
 * Returns the file's shareable URL, or null on failure.
 */
function saveAttachmentToDrive(attachment, address) {
  try {
    var rootFolderName = 'APT Email Attachments';
    var rootFolders = DriveApp.getFoldersByName(rootFolderName);
    var rootFolder = rootFolders.hasNext()
      ? rootFolders.next()
      : DriveApp.createFolder(rootFolderName);

    // Sanitize address for use as folder name
    var folderName = (address || 'Attachments').replace(/[\/\\:*?"<>|]/g, '').trim().substring(0, 100);
    var subFolders = rootFolder.getFoldersByName(folderName);
    var subFolder  = subFolders.hasNext()
      ? subFolders.next()
      : rootFolder.createFolder(folderName);

    // Deduplicate filename
    var baseName = attachment.getName();
    var fileName = baseName;
    var counter  = 1;
    while (subFolder.getFilesByName(fileName).hasNext()) {
      var dot = baseName.lastIndexOf('.');
      fileName = dot !== -1
        ? baseName.substring(0, dot) + '_' + counter + baseName.substring(dot)
        : baseName + '_' + counter;
      counter++;
    }

    var file = subFolder.createFile(attachment.copyBlob());
    file.setName(fileName);
    file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);

    return file.getDownloadUrl();

  } catch (e) {
    Logger.log('saveAttachmentToDrive error: ' + e.message);
    return null;
  }
}
```

### Update the attachment block in `getGmailThreadDA`

**Replace the existing attachment block** (the `try { var rawAttachments = m.getAttachments() ... }` section) with:

```javascript
      // ── Attachments → Google Drive ──────────────────────────────
      var attachments = [];
      try {
        var rawAttachments = m.getAttachments();
        rawAttachments.forEach(function(att) {
          var mimeType  = att.getContentType();
          var sizeBytes = att.getSize();
          var isImage   = mimeType.indexOf('image/') === 0;

          var attObj = {
            name    : att.getName(),
            mimeType: mimeType,
            size    : sizeBytes,
            url     : null
          };

          // Save to Drive and get a shareable URL
          var driveUrl = saveAttachmentToDrive(att, address);
          if (driveUrl) {
            attObj.url = driveUrl;
          }

          attachments.push(attObj);
        });
      } catch (attErr) {
        Logger.log('getAttachments error for msg ' + m.getId() + ': ' + attErr.message);
      }
```

The return object `attachments` field is unchanged — it was already there from v29.

---

## FEATURE 2 — `tech-pwa/src/lib/types.ts`: Update `ThreadAttachment`

Find the existing `ThreadAttachment` interface and change `data?` to `url`:

```typescript
export interface ThreadAttachment {
  name:     string;
  mimeType: string;
  size:     number;
  url:      string | null; // Google Drive shareable URL
}
```

Remove the `data?` field entirely. `ThreadMessage` is unchanged.

---

## FEATURE 3 — `tech-pwa/src/lib/dashboard-api.ts`: Pass Address in Thread Request

Find the `dashboardRequest('getGmailThread', { msgId })` call in `JobDetailModal.tsx` (in `fetchThread`). Update it to pass the job address:

```typescript
const res = await dashboardRequest('getGmailThread', { msgId, address: job?.address ?? '' });
```

`job` is the currently open job object — it is already in scope in `fetchThread` via the closure over `activeJob` or the `job` prop.

Also update the `ThreadMessage` attachment mapping to use `url` instead of `data`:

```typescript
attachments: Array.isArray(m.attachments) ? m.attachments.map((a: any) => ({
  name:     a.name     || '',
  mimeType: a.mimeType || '',
  size:     a.size     || 0,
  url:      a.url      || null
})) : []
```

---

## FEATURE 4 — `JobDetailModal.tsx`: iMessage-Style Thread UI

### Overview

The thread panel is the left column of the modal, below the "EMAIL THREAD" / "SMS" tab switcher. The existing bubble layout renders sender name and timestamp INSIDE the bubble. The iMessage pattern moves them OUTSIDE and above/below the bubble.

**Target visual:**

```
[Kiyomi Deschamps]  Apr 23, 11:36 AM
╭─────────────────────────────────────────╮
│ Can you please let me know when you     │
│ can schedule 407 Perkins St #306?...    │
│                                          │
│ [📎 IMG_9292.jpeg]                       │
╰─────────────────────────────────────────╯

                   [Bemm A]  Apr 23, 12:12 PM
     ╭──────────────────────────────────────╮
     │ Hi Kiyomi, Is this unit on the top   │
     │ floor? Or is there another unit...   │
     ╰──────────────────────────────────────╯
```

### Updated `AttachmentRow` component

Replace the existing `AttachmentRow` with the following. The key change: images now render from `att.url` instead of `att.data` (base64). Remove all base64 logic.

```tsx
function AttachmentRow({ attachments, isOutbound }: { attachments: ThreadAttachment[]; isOutbound: boolean }) {
  if (!attachments || attachments.length === 0) return null;

  return (
    <div className="mt-2 space-y-1.5">
      {attachments.map((att, i) => {
        const isImage = att.mimeType.startsWith('image/');

        if (isImage && att.url) {
          return (
            <div key={i} className="rounded-xl overflow-hidden max-w-[220px]">
              <img
                src={att.url}
                alt={att.name}
                className="w-full object-cover"
                loading="lazy"
              />
            </div>
          );
        }

        const sizeLabel = att.size < 1024 * 1024
          ? Math.round(att.size / 1024) + ' KB'
          : (att.size / (1024 * 1024)).toFixed(1) + ' MB';

        return (
          <a
            key={i}
            href={att.url ?? '#'}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center gap-2 px-3 py-2 rounded-xl border max-w-[220px] transition-opacity hover:opacity-80 ${
              isOutbound
                ? 'bg-[var(--accent)]/20 border-[var(--accent)]/30'
                : 'bg-white/5 border-white/10'
            }`}
          >
            <Paperclip size={11} className="text-zinc-400 flex-shrink-0" />
            <span className="text-[10px] text-zinc-300 truncate flex-1">{att.name}</span>
            <span className="text-[8px] text-zinc-500 flex-shrink-0">{sizeLabel}</span>
          </a>
        );
      })}
    </div>
  );
}
```

### iMessage bubble render

Find the `thread.map((msg, i) => ...)` block. **Replace the entire contents of the map** (the outer `<div>` wrapping each message and everything inside it) with:

```tsx
{thread.map((msg, i) => (
  <div
    key={i}
    className={`flex flex-col gap-0.5 ${msg.isOutbound ? 'items-end' : 'items-start'}`}
  >
    {/* Sender + timestamp — outside the bubble */}
    <div className={`flex items-baseline gap-2 px-1 ${msg.isOutbound ? 'flex-row-reverse' : 'flex-row'}`}>
      <span className="text-[9px] font-black uppercase tracking-widest text-[var(--accent)] truncate max-w-[120px]">
        {msg.isOutbound ? msg.from : msg.from}
      </span>
      <span className="text-[8px] text-zinc-600 whitespace-nowrap">{msg.timestamp}</span>
    </div>

    {/* Bubble */}
    <div
      className={`relative max-w-[82%] px-4 py-3 text-[11px] leading-relaxed whitespace-pre-wrap font-medium break-words ${
        msg.isOutbound
          ? 'bg-[var(--accent)] text-black rounded-2xl rounded-tr-sm'
          : 'bg-zinc-800/80 text-zinc-100 rounded-2xl rounded-tl-sm border border-white/5'
      }`}
    >
      {msg.text}
      <AttachmentRow attachments={msg.attachments} isOutbound={msg.isOutbound} />
    </div>
  </div>
))}
```

**Key details:**
- `rounded-2xl rounded-tr-sm` on outbound — the tail is top-right (like iMessage sent bubbles)
- `rounded-2xl rounded-tl-sm` on inbound — tail is top-left
- Outbound: `bg-[var(--accent)] text-black` — accent blue/color fill with black text
- Inbound: `bg-zinc-800/80 text-zinc-100` — dark neutral with light text
- Sender name is accent-colored on both sides (it's always an APT person or RM)
- No avatar/icon — keep it clean

### Thread container scroll behavior

Find the div that wraps the `thread.map(...)` output (the scrollable area). Make sure it has:
```tsx
className="... space-y-4 ..."
```
Change `space-y-4` (or whatever gap is currently set) to `space-y-3` so consecutive messages from the same sender don't feel too spread out. Keep all other existing classes (overflow-y-auto, custom-scrollbar, etc.).

---

## VERIFICATION STEPS

**Drive attachments:**
- [ ] Open a job with an email that has an image attachment. The thread loads. The image renders in the bubble from a Drive URL (not base64). URL contains `drive.google.com` or `docs.google.com`.
- [ ] In Google Drive, verify folder `APT Email Attachments/{address}/` was created with the file inside.
- [ ] File sharing is set to "Anyone with the link — Viewer."
- [ ] A job with no attachments: `attachments` is an empty array, no errors logged.
- [ ] Non-image attachment (PDF, doc): renders as a clickable file chip that opens the Drive URL in a new tab.

**iMessage UI:**
- [ ] `tsc --noEmit` passes with 0 errors.
- [ ] Inbound messages (from RM) appear on the LEFT with dark bubble, rounded top-left corner squared.
- [ ] Outbound messages (from APT) appear on the RIGHT with accent-color bubble, rounded top-right corner squared.
- [ ] Sender name and timestamp appear ABOVE the bubble, outside it.
- [ ] No sender info or timestamp rendered INSIDE the bubble text area.
- [ ] Long messages wrap correctly within the bubble — no overflow.
- [ ] Image attachment renders inside the bubble below the text, max-width 220px.
- [ ] The reply composer below the thread is unaffected.
- [ ] Dark mode: accent text on outbound bubbles is legible (black text on accent background).

---

## WHAT NOT TO CHANGE

- `stripQuotedText` — already live, do not touch.
- The reply composer, send button, AI draft button — untouched.
- CommentBubble / internal JobComments thread — untouched.
- SMS placeholder panel — untouched.
- Any file outside the three listed above.

---

*Spec authored by Claude Code.*
