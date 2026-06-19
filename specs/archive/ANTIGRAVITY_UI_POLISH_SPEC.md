# ANTIGRAVITY_UI_POLISH_SPEC
**Date:** 2026-04-30
**Sprint:** UI polish — three-dot removal, column alignment, calendar readability

---

## What This Changes

Three cosmetic fixes in the dispatch dashboard. No API changes. No data shape changes. No new components.

1. **Remove dead three-dot menu** from job rows in the coordination feed
2. **Fix column alignment** — Category/Status/Age headers don't line up with row values
3. **Fix calendar chip readability** — tech names truncate with a trailing comma; font too small

---

## Files You Must Change

| # | File | What |
|---|------|------|
| 1 | `tech-pwa/src/components/dashboard/JobQueueTable.tsx` | Remove three-dot button + fix alignment |
| 2 | `tech-pwa/src/app/calendar/page.tsx` | Fix name display and chip readability |

---

## Files You Must NOT Change

- Any `.gs` files
- Any other dashboard components
- `tech-pwa/src/app/live/page.tsx`
- `tech-pwa/src/lib/dashboard-api.ts`

---

## Fix 1 — Remove three-dot button (`JobQueueTable.tsx`)

### A. Remove `MoreHorizontal` from the import

**Current line 7:**
```typescript
import { MoreHorizontal, ChevronDown, ChevronUp, Users } from "lucide-react";
```

**Replace with:**
```typescript
import { ChevronDown, ChevronUp, Users } from "lucide-react";
```

### B. Remove the dead button from the row actions div

**Current (lines 433–435):**
```tsx
                   <button className="p-2 text-[var(--text-muted)] group-hover:text-[var(--accent)] transition-colors">
                     <MoreHorizontal size={16} />
                   </button>
```

**Delete those three lines entirely.** Keep the surrounding `<div className="w-32 ...">` and the "Mark Ready" button inside it — only remove the `MoreHorizontal` button.

---

## Fix 2 — Fix column alignment (`JobQueueTable.tsx`)

### A. Fix the header last-column spacer width

The header's last `<div>` is `w-12` but the row's actions div is `w-32`. This misaligns all right-side columns.

**Current (line 302):**
```tsx
          <div className="w-12"></div>
```

**Replace with:**
```tsx
          <div className="w-32"></div>
```

### B. Fix Status column padding mismatch

The row Status div has `px-2` but the header Status div has none, causing a visual offset.

**Current row Status div (line 363):**
```tsx
                 <div className="w-36 flex flex-col items-start px-2 shrink-0 gap-1">
```

**Replace with:**
```tsx
                 <div className="w-36 flex flex-col items-start shrink-0 gap-1">
```

---

## Fix 3 — Calendar chip readability (`calendar/page.tsx`)

### A. Fix tech name display — removes trailing comma from "Last, First" format names

**Current (line 269):**
```tsx
                {e.tech.split(' ')[0]} · {e.jobCount}j
```

**Replace with:**
```tsx
                {e.tech.split(',')[0].trim()} · {e.jobCount}j
```

### B. Increase chip font size for readability

**Current dispatch chip className (line 263):**
```tsx
                className={`text-[9px] font-bold truncate px-1.5 py-0.5 rounded-md max-w-full block ${
```

**Replace with:**
```tsx
                className={`text-[11px] font-bold truncate px-1.5 py-0.5 rounded-md max-w-full block ${
```

**Current team chip className (line 277):**
```tsx
                className={`text-[9px] font-bold truncate px-1.5 py-0.5 rounded-md max-w-full block ${
```

**Replace with:**
```tsx
                className={`text-[11px] font-bold truncate px-1.5 py-0.5 rounded-md max-w-full block ${
```

---

## Verification Steps

1. Go to `dispatch.aptmaintenanceinc.com/live` — confirm no three-dot icons appear on any job row
2. Confirm "CATEGORY", "STATUS", "AGE" header labels align visually with the values in each row
3. Go to `/calendar` — confirm tech names display without trailing commas (e.g., "Rodriguez" not "Rodriguez,")
4. Confirm calendar chips are readable at a glance (font larger than before)
5. Run `npx tsc --noEmit` in `tech-pwa/` — must show zero errors

---

## Do NOT submit as complete until:
- `git diff --name-only` shows only the 2 files above
- Zero TypeScript errors
- All 4 visual checks confirmed in browser
