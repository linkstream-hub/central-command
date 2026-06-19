# ANTIGRAVITY_LOGO_SPEC.md
# APT Logo — Login Page + Sidebar
# Sprint 32.2 | Spec author: Claude Code | Date: 2026-04-28

---

## Overview

Replace the text-based "APT" placeholder on the login page and in the sidebar with the real APT logo image.

**Logo URL:** `https://aptmaintenanceinc.com/wp-content/uploads/2024/05/apt-logo.webp`

Two files to touch. Nothing else changes.

---

## CHANGE 1 — Login Page

### File: `tech-pwa/src/app/login/page.tsx`

### Find and REPLACE:

Find:
```tsx
            <div className="text-4xl font-black text-blue-500 tracking-tighter italic">APT</div>
            <div className="text-[10px] text-[var(--text-muted)] font-black uppercase tracking-[0.4em] mt-2">Field Operations</div>
```

Replace with:
```tsx
            <img
              src="https://aptmaintenanceinc.com/wp-content/uploads/2024/05/apt-logo.webp"
              alt="APT Maintenance Inc."
              className="h-16 w-auto object-contain mb-2"
            />
            <div className="text-[10px] text-[var(--text-muted)] font-black uppercase tracking-[0.4em] mt-2">Field Operations</div>
```

---

## CHANGE 2 — Sidebar (Expanded State)

### File: `tech-pwa/src/components/dashboard/AppSidebar.tsx`

### Find and REPLACE the expanded logo block:

Find:
```tsx
                <span className="text-[#f97316] font-black text-3xl italic tracking-tighter leading-none">APT</span>
                <span className="text-[var(--text-muted)] text-[8px] font-black uppercase tracking-[0.3em] mt-1 whitespace-nowrap">Central Command</span>
```

Replace with:
```tsx
                <img
                  src="https://aptmaintenanceinc.com/wp-content/uploads/2024/05/apt-logo.webp"
                  alt="APT Maintenance Inc."
                  className="h-8 w-auto object-contain"
                />
                <span className="text-[var(--text-muted)] text-[8px] font-black uppercase tracking-[0.3em] mt-1 whitespace-nowrap">Central Command</span>
```

### Find and REPLACE the collapsed logo block:

Find:
```tsx
              <motion.div 
                key="logo-collapsed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-[#f97316] font-black text-2xl italic tracking-tighter"
              >
                A
              </motion.div>
```

Replace with:
```tsx
              <motion.div
                key="logo-collapsed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <img
                  src="https://aptmaintenanceinc.com/wp-content/uploads/2024/05/apt-logo.webp"
                  alt="APT"
                  className="h-7 w-7 object-contain"
                />
              </motion.div>
```

---

## What Must NOT Change

- All sidebar nav items, motion animations, role logic — untouched
- Login form fields, auth logic — untouched
- No other files

---

## TypeScript Check

Run `npx tsc --noEmit` from `tech-pwa/`. Must pass with 0 errors.

---

## Verification

1. Visit `/login` — APT logo image appears above "Field Operations" label. No text placeholder.
2. Open the dispatch dashboard — sidebar shows APT logo (expanded: full logo + "Central Command" label; collapsed: small square logo).
3. Logo loads cleanly — no broken image, correct aspect ratio, white/transparent background works against dark sidebar.
