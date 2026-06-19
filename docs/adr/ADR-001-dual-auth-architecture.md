# ADR-001: Dual Authentication Architecture

**Status:** Accepted  
**Date:** 2026-06-06  
**Deciders:** Brandon Bittner  

---

## Context

The platform serves two completely different user populations with incompatible authentication requirements:

- **Office staff** — small, known group (~9 people), all have `@aptmaintenanceinc.com` Google Workspace accounts, use desktop browsers, need role-based module access
- **Field technicians** — hourly workers, do not have company Google accounts, use personal mobile devices in the field, need fast no-friction login

A single OAuth flow (Google Sign-In) would require issuing Google Workspace accounts to every technician — expensive and operationally complex. A single username/password system would lose the zero-friction speed techs need on-site.

---

## Decision

Implement two completely separate authentication systems that never intersect:

**Office Staff — next-auth v5 + Google OAuth**
- Provider: Google OAuth (`@aptmaintenanceinc.com` domain restriction)
- Session: next-auth JWT session, server-managed
- Hook: `useSession()` from `next-auth/react`
- Guard: `RouteGuard.tsx` — enforces module-level RBAC via `permissions` object
- Config: `src/auth.ts`

**Field Technicians — Badge + PIN → localStorage token**
- Credential: 3-digit badge number + 4-digit PIN
- Auth flow: badge+PIN → POST to TechPWA.gs → SHA-256 hash → UUID session token → 24h expiry
- Storage: `localStorage['apt_tech_session']` (key: `apt_tech_session`)
- Hook: `getSession()` from `@/lib/auth`
- Guard: individual page-level checks in tech routes (`/jobs`, `/job/[jobId]`, `/clock`, etc.)
- `RouteGuard.tsx` explicitly bypasses all routes starting with `/jobs` or `/job/`

---

## Consequences

**Positive:**
- Techs can log in in under 5 seconds on mobile, no Google account required
- Office staff get full Google SSO with org-level domain restriction
- Clean separation — a bug in tech auth cannot affect office auth and vice versa

**Negative / Constraints:**
- Two auth systems to maintain
- **NEVER mix the hooks** — using `useSession()` on a tech page or `getSession()` on an office page causes a redirect loop. This is the #1 footgun in this codebase.
- Tech sessions are client-side only (localStorage) — no server-side session invalidation without a token rotation mechanism
- Any new page must explicitly declare which auth system it belongs to before the first line of component code

**Rule enforced in RULES.md:**
> Office staff pages (`/live`, `/schedule`, `/team`, etc.): `useSession()` from `next-auth/react`  
> Tech PWA pages (`/jobs`, `/job/[jobId]`, `/clock`, etc.): `getSession()` from `@/lib/auth`  
> Wrong hook = redirect loop.
