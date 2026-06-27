# AUTH_MODEL.md — APT Central Command
# Canonical authentication architecture. Read before touching auth, sessions, or roles.
# Last updated: 2026-06-26

---

## TWO AUTH SYSTEMS — Never mix hooks

```
System 1: Staff Auth (Google OAuth + NextAuth v5)
System 2: Tech (Field) Auth (Badge + PIN + session)
```

---

## SYSTEM 1 — Staff Auth

```yaml
mechanism: Google OAuth via NextAuth v5
session_type: JWT (server-managed, HttpOnly cookie)
allowed_domains: [aptmaintenanceinc.com] (enforced)
permission_source: GAS DashboardAPI → TARGET: Neon staff_permissions (Phase 1)
routes_protected: /dashboard/**, /api/** (staff-facing)
current_issues:
  - GAS controls permissions on every login (single point of failure)
  - NEXT_PUBLIC_DASHBOARD_API_URL exposed in client bundle
target_state: Neon staff_permissions table; no GAS in auth path
```

**Staff login flow (current):**
1. Google OAuth callback
2. `fetchStaffPermissions(email)` → calls GAS DashboardAPI
3. GAS returns `{ role, modules }` object
4. NextAuth JWT stores permissions
5. JWT verified on each request

**Staff login flow (target — Phase 1):**
1. Google OAuth callback
2. Query Neon `staff_permissions` table by email
3. NextAuth JWT stores permissions from Neon
4. Zero GAS calls in auth path

---

## SYSTEM 2 — Tech (Field) Auth

```yaml
mechanism: Badge number + PIN (4-digit)
session_type: localStorage['apt_tech_session'] → TARGET: HttpOnly Secure SameSite cookie
pin_storage: bcrypt hash in Neon employees.pin_hash
routes_protected: /field/**, /api/** (tech-facing)
current_issues:
  - XSS-exploitable: session readable by JavaScript
  - No server-side session validation on field API routes
  - shift session state also in localStorage (tech-session.ts)
  - Authorization header sends localStorage token
target_state: Server-set HttpOnly cookie; server-side validation on every field API route
```

**Tech login flow (current):**
1. Badge + PIN submitted to `/api/auth/tech/login`
2. Server validates PIN against `employees.pin_hash`
3. Server returns JWT in JSON response body
4. Client stores JWT in `localStorage['apt_tech_session']`
5. Client sends `Authorization: Bearer <token>` header on field API calls
6. Server validates header token

**Tech login flow (target — Phase 0 Clerk/Lucia):**
1. Badge + PIN submitted
2. Server validates PIN
3. Server sets HttpOnly Secure SameSite=Strict cookie
4. All field API routes validate cookie server-side
5. No token readable by JavaScript

---

## DEV AUTH BYPASS (current — harden Phase 1)

```typescript
// Single guard — insufficient
if (
  process.env.NODE_ENV !== 'production' ||
  process.env.VERCEL_ENV === 'preview'
) && process.env.DEV_BYPASS_AUTH === 'true'
```

**Target (Phase 1):**
```typescript
// Dual guard required
if (
  isEligibleEnvironment() &&
  process.env.DEV_BYPASS_SECRET === request.headers.get('x-dev-bypass')
)
```

Tests must prove:
- Bypass fails with env eligibility only
- Bypass fails with secret only
- Bypass fails in production
- Failed bypass attempts logged without leaking secret

---

## SHIFT-LEFT AUTH (Phase 0)

**Clerk or Lucia replaces both custom auth systems.**

Clerk: managed auth, handles sessions, tokens, cookies. Staff uses OAuth provider. Tech uses PIN flow via Clerk custom auth or Lucia sessions.

Lucia: open-source, self-hosted, HttpOnly cookies, server sessions. Lighter option if Clerk is overkill.

**Decision:** Brandon + CC decide Clerk vs Lucia before Phase 0 auth Task Card is issued.

After integration:
- `localStorage` auth deleted
- GAS staff permission calls deleted
- Custom session management deleted
- Only vendor SDK + Neon for data

---

## RATE LIMITING

Current: None on PIN login.
Target: Rate limit wrong PIN attempts (3 strikes → 15-min lockout) — Phase 1.

---

## ROLES & PERMISSIONS

```yaml
staff_roles: [admin, dispatch, people, finance, intel]
tech_roles: [field_tech]
module_flags: admin/dispatch/people/finance/intel per staff member
```

9 office staff, defined in Neon employees/staff_permissions table.
See `docs/ORG.md` for roster.
