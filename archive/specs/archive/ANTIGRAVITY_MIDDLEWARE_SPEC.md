# ANTIGRAVITY_MIDDLEWARE_SPEC.md
# Subdomain Routing via Next.js Middleware
# Sprint 32.1 | Spec author: Claude Code | Date: 2026-04-28

---

## Problem

Both `dispatch.aptmaintenanceinc.com` and `clock.aptmaintenanceinc.com` point to the same
Vercel deployment. Without middleware, both serve the same root route. Visiting the root of
either subdomain should land users in the right place automatically.

## Goal

| Subdomain | Root `/` should go to |
|---|---|
| `dispatch.aptmaintenanceinc.com` | `/live` (dispatch hub) |
| `clock.aptmaintenanceinc.com` | `/jobs` (Tech PWA) |
| `central-command-pi.vercel.app` | existing behavior unchanged |

---

## Implementation

### File to CREATE: `tech-pwa/src/middleware.ts`

```ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const hostname = request.nextUrl.hostname;
  const pathname = request.nextUrl.pathname;

  // Only act on root path — all other routes pass through unchanged
  if (pathname !== '/') return NextResponse.next();

  if (hostname.startsWith('dispatch.')) {
    return NextResponse.redirect(new URL('/live', request.url));
  }

  if (hostname.startsWith('clock.')) {
    return NextResponse.redirect(new URL('/jobs', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/',
};
```

---

## What Must NOT Change

- All existing routes, auth logic, RouteGuard, login redirects — untouched
- Middleware only intercepts `/` — every other path passes through normally

---

## Verification

1. Visit `dispatch.aptmaintenanceinc.com` → redirects to `/live` (login wall if not authed)
2. Visit `clock.aptmaintenanceinc.com` → redirects to `/jobs` (login wall if not authed)
3. Visit `central-command-pi.vercel.app` → existing root behavior unchanged
4. Visit `dispatch.aptmaintenanceinc.com/schedule` → no redirect, loads `/schedule` normally
