# ANTIGRAVITY SPRINT — MODAL STAKEHOLDER VISIBILITY + LIGHT MODE FIX
# Owner: Claude Code | Executor: Antigravity
# Date: April 23, 2026
# File: tech-pwa/src/components/dashboard/JobDetailModal.tsx

---

## PROBLEM

1. Tenant name and phone are nearly invisible when the TENANT tab is not the active stakeholder.
2. In light mode, hardcoded `text-white/40` and opacity-based styles produce unreadable text on light backgrounds.
3. No clear active-tab visual indicator beyond a faint background tint.
4. Phone number has `opacity-30` — effectively invisible in both modes.

---

## TASK 1 — Fix stakeholder tab name + phone visibility

### Location: lines ~350–383 in JobDetailModal.tsx

Find this block inside the `{(['REQUESTER', 'TENANT', 'TECH'] as const).map(s => {...})}` section:

```tsx
// CURRENT — DO NOT KEEP:
<span className={`text-[11px] font-black ${isActive ? 'text-black' : 'text-white/40'} truncate max-w-[120px] mt-1 uppercase tracking-tighter`}>
  {name || 'Unassigned'}
</span>
{phone && <span className="text-[9px] text-[var(--text-muted)] font-black opacity-30">{phone}</span>}
```

Replace with:

```tsx
// REPLACEMENT — use CSS variables, never hardcode white/black:
<span className={`text-[11px] font-black ${isActive ? 'text-[var(--text-primary)]' : 'text-[var(--text-secondary)]'} truncate max-w-[120px] mt-1 uppercase tracking-tighter`}>
  {name || (isActive ? 'Unassigned' : '—')}
</span>
{phone && (
  <span className={`text-[9px] font-black ${isActive ? 'text-[var(--accent)]' : 'text-[var(--text-muted)]'}`}>
    {phone}
  </span>
)}
```

**Rules:**
- Never use `text-black`, `text-white/N`, or raw opacity classes for text that must be legible in both modes
- Active tab: name in `--text-primary`, phone in `--accent`
- Inactive tab: name in `--text-secondary` (still readable, just de-emphasized), phone in `--text-muted`
- `--text-secondary` must be legible in both light and dark mode — it already is as long as you use the CSS variable

---

## TASK 2 — Add clear active-tab indicator

### Location: the `button` element for each stakeholder tab (~line 349–353)

Find:
```tsx
className={`flex-1 flex flex-col items-center justify-center border-r border-white/5 transition-all outline-none p-2 ${
  isActive ? 'bg-[var(--accent)]/10' : 'hover:bg-white/[0.02]'
} ${!hasData && !isEditMode ? 'opacity-20 cursor-not-allowed' : ''}`}
```

Replace with:
```tsx
className={`flex-1 flex flex-col items-center justify-center border-r border-white/5 transition-all outline-none p-2 relative ${
  isActive
    ? 'bg-[var(--accent)]/10'
    : 'hover:bg-[var(--text-primary)]/[0.03]'
} ${!hasData && !isEditMode ? 'opacity-40 cursor-not-allowed' : ''}`}
```

And add an active indicator bar as the FIRST child inside the button (before the label span):
```tsx
{isActive && (
  <span className="absolute bottom-0 left-4 right-4 h-[2px] bg-[var(--accent)] rounded-t-full" />
)}
```

---

## TASK 3 — Light mode audit for the entire modal

Go through JobDetailModal.tsx and find every instance of these patterns — replace as shown:

| Find | Replace with |
|------|-------------|
| `text-white/40` | `text-[var(--text-secondary)]` |
| `text-white/50` | `text-[var(--text-secondary)]` |
| `text-white/60` | `text-[var(--text-secondary)]` |
| `text-white/20` | `text-[var(--text-muted)]` |
| `text-white/30` | `text-[var(--text-muted)]` |
| `bg-white/5` (on text input backgrounds) | keep as-is — this is a surface tint, not text |
| `border-white/5` | keep as-is — border tints are fine |
| `opacity-30` on any text span | remove `opacity-30`, use `text-[var(--text-muted)]` instead |
| `text-black` | `text-[var(--text-primary)]` |

**Rule:** CSS variable text colors (`--text-primary`, `--text-secondary`, `--text-muted`, `--accent`) are defined to work in both modes. Raw `text-white/*` and `text-black` do NOT work in light mode. Never use them for any content that must be readable.

---

## TASK 4 — Reduce "UNASSIGNED" visual noise

When a stakeholder tab has no data (`!name`), the label "Unassigned" should not scream at the user. Replace:

```tsx
{name || 'Unassigned'}
```

With:

```tsx
{name || <span className="text-[var(--text-muted)] opacity-40 italic text-[9px] normal-case tracking-normal">none on file</span>}
```

---

## DO NOT TOUCH

- The `isEditMode` inline input fields for TENANT — they work correctly, leave them alone
- The channel selector (EMAIL / TEXT/SMS row)
- The thread display
- The right panel (Work Order Context, Coordination actions)
- SchedulingDispatch.tsx — out of scope

---

## VERIFICATION

1. Open the modal in BOTH light mode and dark mode
2. Click each stakeholder tab (REQUESTER, TENANT, TECH)
3. Verify: the inactive tabs still show the name and phone legibly — just less prominent than the active tab
4. Verify: active tab has an orange bottom-border indicator
5. Verify: in light mode, no text disappears (white-on-white)
6. `npx tsc --noEmit` — zero errors

---

## COMMIT MESSAGE

`fix: modal stakeholder visibility — CSS variables replace hardcoded white colors, active tab indicator, phone opacity fix`
