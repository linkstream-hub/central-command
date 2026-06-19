# SPRINT STANDARDS — APT Central Command
# Design and quality gates for all AG + Claude Code sprints.

---

## DEFINITION OF DONE — ALL SPRINTS (hard gate, no exceptions)

A sprint is NOT complete until all 4 gates pass. No gate = no merge.

**Gate 1 — LINT:** `npx tsc --noEmit` returns zero errors.

**Gate 2 — FUNCTIONAL:** Every new button, route, and interaction clicked/triggered in a real browser. Evidence in `artifacts/ag_test_results.txt` with format `[PASS] navigated to X, clicked Y, saw Z`.

**Gate 3 — REGRESSION:** Core flows confirmed working after the change: login (Google OAuth + dev bypass), dispatch queue loads, job modal opens, schedule page loads.

**Gate 4 — SECURE:** No API keys, tokens, or secrets hardcoded in any changed file. `git diff --name-only` reviewed for accidental env leaks.

**Additional by change type:**
- UI changes: screenshot at 375px (mobile) and 1280px (desktop) saved to `artifacts/`.
- New API endpoints: HTTP 200 confirmed via curl or browser network tab, logged in `artifacts/`.
- External links added: verified not 404.

All evidence lives in `artifacts/`. A sprint with no evidence is not done.

---

## VISUAL DESIGN STANDARDS

**References:** Linear (THE reference), Fey (glass cards), Height (warmth), Vercel Dashboard (dense data), Cal.com (calendar).  
**Target:** Dark mode glassmorphism. Framer Motion on all interactions. Geist for code/data, Outfit for headings.

- Framer Motion on all page transitions, modal opens, list entrances, hover states
- Skeleton loaders for all data-fetch states. Never a blank div.
- Toast notifications for all async results. No `alert()`, no `window.confirm()`.
- Touch targets ≥44×44px. Test at 375px and 414px.
- Tailwind tokens or CSS variables only — no hardcoded hex in components.

**Glassmorphism note:** Class swaps to `bg-white/5` are invisible on flat dark backgrounds. `backdrop-blur` needs visible background content (gradient, image) behind it to work. Always verify in browser — it renders differently than in code review.

---

## BACKEND SECURITY STANDARDS

- No endpoint without: Cloudflare Worker proxy + rate limiting + auth
- Secrets: env vars or vaults only — never in code
- Every write: audit-logged with actor + timestamp + delta
- Session tokens: SHA-256 hashed before storage
- PII: minimize storage, field-level encryption before Firebase migration

**Open security gaps (in priority order):**
1. Cloudflare Worker in front of TechPWA.gs — currently "Anyone" access (OPEN)
2. Session token hashing — tokens stored plain in Tech Roster col M (OPEN / UNVERIFIED)
3. n8n + Flowise → Railway — not fully migrated (OPEN)
4. n8n workflows + Flowise flows — not version-controlled (OPEN)
5. Apps Script unhandled exceptions — silent failures, no alerting (OPEN)
6. `NEXT_PUBLIC_DASHBOARD_API_KEY` in push/subscribe/route.ts — should be server-only env var (OPEN)

**Closed:**
- M1: ✅ `saveAttachmentToDrive` uses `DriveApp.Access.DOMAIN` (APT org only).
- M3: ✅ Force PIN change on first login shipped (commit 32d9aad).
