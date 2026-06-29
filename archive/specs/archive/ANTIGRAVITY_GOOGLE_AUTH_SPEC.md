# ANTIGRAVITY SPEC — Google OAuth + Module-Based Permissions
**Author:** Claude Code
**Date:** April 29, 2026
**Priority:** HIGH — replaces shared passcode system with individual identity

**Read every line. Do not freelance. Do not touch files not listed here.**

---

## CONTEXT

### What exists now
Office staff log in at `dispatch.aptmaintenanceinc.com/login` using a shared passcode (e.g., `APT2026!` for all dispatch users). The passcode maps directly to a role string stored in localStorage. This means:
- No individual identity — anyone with the passcode is indistinguishable
- No way to audit who did what
- Passcode rotation changes everyone's login simultaneously
- Doesn't scale to 9 people with overlapping responsibilities

### What this spec builds
Individual Google OAuth login restricted to `@aptmaintenanceinc.com` accounts. Each person's permissions are stored in a **Staff Roster** tab in the APT Lead Intake Master spreadsheet. Permissions are module-based (dispatch, people, finance, intel) rather than rigid role strings.

### Relationship to ANTIGRAVITY_RBAC_SCHEDULE_FIX_SPEC.md
That spec ships first (it fixes live production bugs: date window, month pill, search button, /time-off redirect). After it ships, this spec supersedes:
- The `routePermissions.ts` file it creates (no longer needed — delete it)
- The RouteGuard rewrite it specifies
- The AppSidebar permission logic it specifies

Fixes 3–6 in that spec (schedule date, month pill, search, redirect) are unaffected and still apply.

---

## STAFF ROSTER — FINAL PERMISSION MATRIX

| Person | Email | Admin | Dispatch | People | Finance | Intel |
|--------|-------|-------|----------|--------|---------|-------|
| Brandon Bittner | brandon@aptmaintenanceinc.com | TRUE | FALSE | FALSE | FALSE | FALSE |
| Tsegab Assefa | tsegab@aptmaintenanceinc.com | TRUE | FALSE | FALSE | FALSE | FALSE |
| Keith Berry | keith@aptmaintenanceinc.com | TRUE | FALSE | FALSE | FALSE | FALSE |
| Bemenet Assefa | bemenet@aptmaintenanceinc.com | TRUE | FALSE | FALSE | FALSE | FALSE |
| Robert | robert@aptmaintenanceinc.com | FALSE | TRUE | FALSE | FALSE | FALSE |
| Ana | ana@aptmaintenanceinc.com | FALSE | FALSE | TRUE | TRUE | FALSE |
| Nyanza Guzman | nyanza@aptmaintenanceinc.com | FALSE | TRUE | FALSE | TRUE | FALSE |
| Metkel Tecle | metkel@aptmaintenanceinc.com | FALSE | FALSE | TRUE | TRUE | FALSE |
| Ataklti Abrha | a.abrha@aptmaintenanceinc.com | FALSE | FALSE | FALSE | TRUE | FALSE |

**Admin sees all modules.** Admin flag alone is sufficient — all routes are accessible when admin = TRUE.

---

## MODULE → ROUTE MAPPING

| Module | Routes |
|--------|--------|
| dispatch | `/live`, `/schedule`, `/feedback` |
| people | `/weekly-schedule`, `/calendar`, `/team`, `/compliance`, `/hr` |
| finance | `/billing` |
| intel | `/intel` |
| admin | all of the above |

---

## FILES TO TOUCH

**New files:**
1. `tech-pwa/src/lib/auth-options.ts`
2. `tech-pwa/src/lib/permissions.ts`
3. `tech-pwa/src/app/api/auth/[...nextauth]/route.ts`
4. `tech-pwa/src/types/next-auth.d.ts`

**Modified files:**
5. `tech-pwa/src/app/login/page.tsx`
6. `tech-pwa/src/components/dashboard/RouteGuard.tsx`
7. `tech-pwa/src/components/dashboard/AppSidebar.tsx`
8. `dashboard-api/DashboardAPI.gs`
9. `tech-pwa/package.json` — add `next-auth`

**Delete after this spec ships:**
- `tech-pwa/src/lib/routePermissions.ts` (created by RBAC fix spec — superseded here)

**Do not touch:** Any other file. Do not modify `tech-pwa/src/lib/auth.ts` — it handles tech PWA localStorage sessions and must remain unchanged.

---

## BRANDON'S SETUP STEPS (before AG builds)

Brandon must complete these before the feature can go live:

### Step 1 — Google Cloud Console
1. Go to https://console.cloud.google.com → select or create project "APT Central Command"
2. APIs & Services → OAuth consent screen
   - User type: Internal (restricts to your Google Workspace org automatically)
   - App name: APT Central Command
   - Support email: brandon@aptmaintenanceinc.com
3. APIs & Services → Credentials → Create Credentials → OAuth 2.0 Client ID
   - Application type: Web application
   - Name: CC2.0 Dispatch
   - Authorized redirect URIs: `https://dispatch.aptmaintenanceinc.com/api/auth/callback/google`
   - Also add for testing: `http://localhost:3000/api/auth/callback/google`
4. Copy the Client ID and Client Secret

### Step 2 — Vercel Environment Variables
Add all four to **Production** and **Preview** environments:
```
GOOGLE_CLIENT_ID=<from step 1>
GOOGLE_CLIENT_SECRET=<from step 1>
NEXTAUTH_SECRET=<run: openssl rand -base64 32>
NEXTAUTH_URL=https://dispatch.aptmaintenanceinc.com
```

### Step 3 — Staff Roster Tab
In the APT Lead Intake Master spreadsheet (`1eCSHpj5381R7Hhloe718r1n8fEfesY2tjYOuOLxTSd4`):
1. Create a new tab named exactly: **Staff Roster**
2. Add these headers in row 1:

| Col A | Col B | Col C | Col D | Col E | Col F | Col G | Col H |
|-------|-------|-------|-------|-------|-------|-------|-------|
| Email | Name | Admin | Dispatch | People | Finance | Intel | Active |

3. Populate rows 2–10 with exactly the data from the permission matrix above (use TRUE/FALSE in cols C–H)

---

## NEW FILE 1 — `tech-pwa/src/lib/permissions.ts`

```typescript
export interface StaffPermissions {
  name: string;
  admin: boolean;
  dispatch: boolean;
  people: boolean;
  finance: boolean;
  intel: boolean;
}

// Which modules grant access to each route.
// Admin bypass is checked separately — not listed here.
export const MODULE_ROUTES: Record<string, (keyof StaffPermissions)[]> = {
  '/live':             ['dispatch'],
  '/schedule':         ['dispatch'],
  '/feedback':         ['dispatch'],
  '/weekly-schedule':  ['people'],
  '/calendar':         ['people'],
  '/team':             ['people'],
  '/compliance':       ['people'],
  '/hr':               ['people'],
  '/billing':          ['finance'],
  '/intel':            ['intel', 'finance'],
};

export function hasAccess(perms: StaffPermissions | null | undefined, pathname: string): boolean {
  if (!perms) return false;
  if (perms.admin) return true;
  const required = MODULE_ROUTES[pathname];
  if (!required) return true; // Unknown route: allow (fail-open for non-protected paths)
  return required.some(mod => perms[mod] === true);
}

export function defaultRoute(perms: StaffPermissions | null | undefined): string {
  if (!perms) return '/login';
  if (perms.admin || perms.dispatch) return '/live';
  if (perms.people) return '/hr';
  if (perms.finance) return '/billing';
  if (perms.intel) return '/intel';
  return '/login';
}
```

---

## NEW FILE 2 — `tech-pwa/src/lib/auth-options.ts`

```typescript
import { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import type { StaffPermissions } from './permissions';

async function fetchStaffPermissions(email: string): Promise<StaffPermissions | null> {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_DASHBOARD_API_URL;
    if (!apiUrl) return null;
    const res = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain' },
      body: JSON.stringify({ action: 'getStaffPermissions', email }),
    });
    const data = await res.json();
    return data.success ? (data.permissions as StaffPermissions) : null;
  } catch {
    return null;
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ profile }) {
      // Only allow @aptmaintenanceinc.com accounts
      return profile?.email?.endsWith('@aptmaintenanceinc.com') ?? false;
    },
    async jwt({ token, account, profile }) {
      if (account && profile?.email) {
        const perms = await fetchStaffPermissions(profile.email);
        token.permissions = perms;
        token.staffName = perms?.name ?? profile.name ?? profile.email;
      }
      return token;
    },
    async session({ session, token }) {
      session.permissions = (token.permissions as StaffPermissions | null) ?? null;
      session.staffName = (token.staffName as string) ?? session.user?.name ?? '';
      return session;
    },
  },
  pages: {
    signIn: '/login',
    error: '/login',
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days — matches tech PWA session length
  },
};
```

---

## NEW FILE 3 — `tech-pwa/src/app/api/auth/[...nextauth]/route.ts`

```typescript
import NextAuth from 'next-auth';
import { authOptions } from '@/lib/auth-options';

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
```

---

## NEW FILE 4 — `tech-pwa/src/types/next-auth.d.ts`

```typescript
import type { StaffPermissions } from '@/lib/permissions';

declare module 'next-auth' {
  interface Session {
    permissions: StaffPermissions | null;
    staffName: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    permissions?: StaffPermissions | null;
    staffName?: string;
  }
}
```

---

## MODIFIED FILE — `tech-pwa/src/app/login/page.tsx`

Replace the entire staff/passcode login section with a Google Sign-In button. The badge+PIN section for techs is **unchanged**.

The page must detect hostname to determine which flow to present:
- `dispatch.aptmaintenanceinc.com` (or `central-command-pi.vercel.app`): show Google Sign-In
- `clock.aptmaintenanceinc.com`: show badge+PIN only
- Default (localhost dev): show both

Replace the entire file contents with:

```typescript
"use client";
import { useState, useEffect } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";

function detectMode(): 'dispatch' | 'tech' | 'both' {
  if (typeof window === 'undefined') return 'both';
  const host = window.location.hostname;
  if (host.startsWith('dispatch.') || host.includes('central-command-pi')) return 'dispatch';
  if (host.startsWith('clock.')) return 'tech';
  return 'both';
}

export default function LoginPage() {
  const router = useRouter();
  const [mode, setMode] = useState<'dispatch' | 'tech' | 'both'>('both');
  const [badgeId, setBadgeId] = useState('');
  const [pin, setPin] = useState('');
  const [showPin, setShowPin] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [googleLoading, setGoogleLoading] = useState(false);
  const [searchParams, setSearchParams] = useState<URLSearchParams | null>(null);

  useEffect(() => {
    setMode(detectMode());
    setSearchParams(new URLSearchParams(window.location.search));
  }, []);

  // Show error from next-auth callback (e.g., email not in Staff Roster)
  const authError = searchParams?.get('error');
  const accessDenied = searchParams?.get('error') === 'AccessDenied';

  const handleGoogleSignIn = async () => {
    setGoogleLoading(true);
    await signIn('google', { callbackUrl: '/live' });
  };

  const handleTechLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      const res = await fetch(apiUrl!, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain' },
        body: JSON.stringify({ action: 'login', employeeId: badgeId, pin }),
      });
      const data = await res.json();
      if (data.success && data.token) {
        localStorage.setItem('aptSession', JSON.stringify({
          token: data.token,
          techId: data.techId,
          techName: data.techName,
          role: data.role ?? 'tech',
        }));
        router.push('/jobs');
      } else {
        setError('Invalid badge number or PIN.');
      }
    } catch {
      setError('Connection error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">

        {/* Logo */}
        <div className="flex flex-col items-center gap-3 mb-8">
          <Image src="/apt-logo.png" alt="APT Maintenance" width={64} height={64} className="rounded-xl" />
          <h1 className="text-2xl font-bold text-[var(--text-primary)]">APT Central Command</h1>
        </div>

        {/* Google OAuth — for dispatch/office staff */}
        {(mode === 'dispatch' || mode === 'both') && (
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur space-y-4">
            <div>
              <h2 className="text-lg font-semibold text-[var(--text-primary)]">Office Staff</h2>
              <p className="text-sm text-[var(--text-muted)] mt-0.5">Sign in with your APT Google account</p>
            </div>

            {accessDenied && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 text-sm text-red-400">
                Your Google account is not authorized. Contact Brandon to be added to the Staff Roster.
              </div>
            )}
            {authError && !accessDenied && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 text-sm text-red-400">
                Sign-in failed. Please try again.
              </div>
            )}

            <button
              onClick={handleGoogleSignIn}
              disabled={googleLoading}
              className="w-full flex items-center justify-center gap-3 bg-white text-gray-800 font-medium py-3 px-4 rounded-xl hover:bg-gray-100 transition-colors disabled:opacity-60"
            >
              {googleLoading ? (
                <span className="text-sm">Redirecting...</span>
              ) : (
                <>
                  <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
                    <path fill="#4285F4" d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.875 2.684-6.615z"/>
                    <path fill="#34A853" d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.258c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z"/>
                    <path fill="#FBBC05" d="M3.964 10.707A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.707V4.961H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.039l3.007-2.332z"/>
                    <path fill="#EA4335" d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.961L3.964 7.293C4.672 5.163 6.656 3.58 9 3.58z"/>
                  </svg>
                  <span>Sign in with Google</span>
                </>
              )}
            </button>
          </div>
        )}

        {/* Divider when showing both */}
        {mode === 'both' && (
          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-white/10" />
            <span className="text-xs text-[var(--text-muted)]">or</span>
            <div className="flex-1 h-px bg-white/10" />
          </div>
        )}

        {/* Badge + PIN — for field techs */}
        {(mode === 'tech' || mode === 'both') && (
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur space-y-4">
            <div>
              <h2 className="text-lg font-semibold text-[var(--text-primary)]">Field Tech</h2>
              <p className="text-sm text-[var(--text-muted)] mt-0.5">Enter your badge number and PIN</p>
            </div>

            <form onSubmit={handleTechLogin} className="space-y-3">
              <input
                type="text"
                inputMode="numeric"
                placeholder="Badge Number"
                value={badgeId}
                onChange={e => setBadgeId(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
                required
              />
              <div className="relative">
                <input
                  type={showPin ? 'text' : 'password'}
                  inputMode="numeric"
                  placeholder="PIN"
                  value={pin}
                  onChange={e => setPin(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 pr-12 text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPin(v => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)] p-1"
                  tabIndex={-1}
                >
                  {showPin ? '🙈' : '👁'}
                </button>
              </div>

              {error && <p className="text-sm text-red-400">{error}</p>}

              <button
                type="submit"
                disabled={loading || !badgeId || !pin}
                className="w-full bg-[var(--accent)] text-white font-medium py-3 px-4 rounded-xl hover:opacity-90 transition-opacity disabled:opacity-40"
              >
                {loading ? 'Signing in…' : 'Sign In'}
              </button>
            </form>
          </div>
        )}

      </div>
    </div>
  );
}
```

---

## MODIFIED FILE — `tech-pwa/src/components/dashboard/RouteGuard.tsx`

Replace the entire file with:

```typescript
"use client";
import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { hasAccess, defaultRoute } from "@/lib/permissions";

// Tech-only routes use localStorage session (handled by their own layouts)
const TECH_ROUTES = ['/jobs', '/job'];

export default function RouteGuard({ children }: { children: React.ReactNode }) {
  const router   = useRouter();
  const pathname = usePathname();
  const { data: session, status } = useSession();

  const isTechRoute = TECH_ROUTES.some(r => pathname === r || pathname.startsWith(r + '/'));

  useEffect(() => {
    if (isTechRoute) return; // Tech routes handle their own auth
    if (status === 'loading') return;

    if (status === 'unauthenticated') {
      router.push('/login');
      return;
    }

    // Authenticated but no permissions = not in Staff Roster
    if (!session?.permissions) {
      router.push('/login?error=AccessDenied');
      return;
    }

    if (!hasAccess(session.permissions, pathname)) {
      router.push(defaultRoute(session.permissions));
    }
  }, [pathname, status, session, router, isTechRoute]);

  if (isTechRoute) return <>{children}</>;
  if (status === 'loading') return null;
  if (status === 'unauthenticated') return null;
  if (!session?.permissions) return null;
  if (!hasAccess(session.permissions, pathname)) return null;

  return <>{children}</>;
}
```

---

## MODIFIED FILE — `tech-pwa/src/components/dashboard/AppSidebar.tsx`

### Step 1: Replace imports at top
Remove any import of `routePermissions` or the old `ROUTE_PERMISSIONS` constant. Add:

```typescript
import { useSession } from "next-auth/react";
import type { StaffPermissions } from "@/lib/permissions";
```

### Step 2: Remove the local `ROUTE_PERMISSIONS` constant entirely (lines that define it)

### Step 3: Replace the `NAV_ITEMS` array with exactly this

Note: `/schedule` label is now **"Workorder Schedule"**. Each item has a `module` property.

```typescript
const NAV_ITEMS = [
  { id: 'live',            label: 'Coordination',       icon: Zap,             href: '/live',            module: 'dispatch'  as keyof StaffPermissions },
  { id: 'schedule',        label: 'Workorder Schedule', icon: Calendar,        href: '/schedule',        module: 'dispatch'  as keyof StaffPermissions },
  { id: 'weekly-schedule', label: 'Schedule',           icon: CalendarDays,    href: '/weekly-schedule', module: 'people'    as keyof StaffPermissions },
  { id: 'calendar',        label: 'Calendar',           icon: CalendarDays,    href: '/calendar',        module: 'people'    as keyof StaffPermissions },
  { id: 'team',            label: 'Team',               icon: Users,           href: '/team',            module: 'people'    as keyof StaffPermissions },
  { id: 'compliance',      label: 'Compliance',         icon: Scale,           href: '/compliance',      module: 'people'    as keyof StaffPermissions },
  { id: 'hr',              label: 'HR',                 icon: HeartHandshake,  href: '/hr',              module: 'people'    as keyof StaffPermissions },
  { id: 'billing',         label: 'Billing',            icon: Receipt,         href: '/billing',         module: 'finance'   as keyof StaffPermissions },
  { id: 'intel',           label: 'Intel',              icon: BarChart3,       href: '/intel',           module: 'intel'     as keyof StaffPermissions, status: 'stub' },
  { id: 'feedback',        label: 'Feedback',           icon: MessageSquare,   href: '/feedback',        module: 'dispatch'  as keyof StaffPermissions },
];
```

### Step 4: Replace the `visibleItems` computation and session reads

Delete any code that reads `getSession()` from `@/lib/auth` in this file. Replace with:

```typescript
const { data: session } = useSession();
const perms = session?.permissions;

const visibleItems = NAV_ITEMS.filter(item => {
  if (!perms) return false;
  if (perms.admin) return true;
  return perms[item.module] === true;
});
```

### Step 5: Replace the user display in the sidebar footer

The sidebar footer currently shows `role` or `session.techName`. Replace with:

```typescript
const displayName = session?.staffName ?? session?.user?.name ?? '';
```

Use `displayName` wherever the name/role was shown in the sidebar footer.

---

## MODIFIED FILE — `dashboard-api/DashboardAPI.gs`

### Step 1: Add `getStaffPermissions` to the `publicActions` array

Find the `publicActions` array and add `'getStaffPermissions'`:

```javascript
const publicActions = [
  'validatePasscode', 'getAvailableSlots', 'tenantSelfSchedule',
  'getJobCommentsDA', 'getStaffPermissions'
];
```

### Step 2: Add the `DA_SR` column index constant

Add this constant near the top of the file (alongside other `DA_*` constants):

```javascript
const DA_SR = {
  EMAIL:    0,
  NAME:     1,
  ADMIN:    2,
  DISPATCH: 3,
  PEOPLE:   4,
  FINANCE:  5,
  INTEL:    6,
  ACTIVE:   7,
};
```

### Step 3: Add the `getStaffPermissionsDA` function

Add this function before the closing brace of the file (or near other handler functions):

```javascript
function getStaffPermissionsDA(data) {
  try {
    const email = (data.email || '').toLowerCase().trim();
    if (!email) return { success: false, error: 'EMAIL_REQUIRED' };

    const ss    = SpreadsheetApp.openById('1eCSHpj5381R7Hhloe718r1n8fEfesY2tjYOuOLxTSd4');
    const sheet = ss.getSheetByName('Staff Roster');
    if (!sheet) return { success: false, error: 'STAFF_ROSTER_NOT_FOUND' };

    const rows = sheet.getDataRange().getValues();
    // rows[0] = headers, skip it
    for (let i = 1; i < rows.length; i++) {
      const row = rows[i];
      if ((row[DA_SR.EMAIL] || '').toLowerCase().trim() !== email) continue;
      if (row[DA_SR.ACTIVE] !== true) return { success: false, error: 'INACTIVE' };

      return {
        success: true,
        permissions: {
          name:     String(row[DA_SR.NAME]     || email),
          admin:    row[DA_SR.ADMIN]    === true,
          dispatch: row[DA_SR.DISPATCH] === true,
          people:   row[DA_SR.PEOPLE]   === true,
          finance:  row[DA_SR.FINANCE]  === true,
          intel:    row[DA_SR.INTEL]    === true,
        },
      };
    }

    return { success: false, error: 'NOT_FOUND' };
  } catch (e) {
    return { success: false, error: e.message };
  }
}
```

### Step 4: Wire `getStaffPermissions` in `doPost`

In the `doPost` action dispatcher (the big `if/else if` chain or switch), add:

```javascript
} else if (action === 'getStaffPermissions') {
  result = getStaffPermissionsDA(data);
```

---

## MODIFIED FILE — `tech-pwa/package.json`

Add `next-auth` as a dependency. In the `"dependencies"` object, add:

```json
"next-auth": "^4.24.7"
```

---

## WRAP EXISTING APP WITH SESSION PROVIDER

In `tech-pwa/src/app/layout.tsx` (the root layout), wrap the app with `SessionProvider` from next-auth. Import at top:

```typescript
import { SessionProvider } from "next-auth/react";
```

Wrap `{children}` (or the existing Providers wrapper) with:

```tsx
<SessionProvider>
  {children}
</SessionProvider>
```

If a `Providers.tsx` client component already exists, add `SessionProvider` there instead of in the server-side `layout.tsx`.

If `layout.tsx` is a server component (no `"use client"` directive), create `tech-pwa/src/app/Providers.tsx`:

```typescript
"use client";
import { SessionProvider } from "next-auth/react";

export default function Providers({ children }: { children: React.ReactNode }) {
  return <SessionProvider>{children}</SessionProvider>;
}
```

Then import and use `<Providers>` in `layout.tsx`.

---

## DELETE AFTER SHIPPING

Once this spec ships, delete `tech-pwa/src/lib/routePermissions.ts`. It was created by ANTIGRAVITY_RBAC_SCHEDULE_FIX_SPEC.md and is fully superseded by `permissions.ts`.

---

## VERIFICATION STEPS

Run these after deployment at `dispatch.aptmaintenanceinc.com`.

**Google OAuth flow:**
- [ ] Click "Sign in with Google" → redirected to Google OAuth consent screen
- [ ] Sign in with `brandon@aptmaintenanceinc.com` → lands on `/live`
- [ ] Sign in with `robert@aptmaintenanceinc.com` → lands on `/live` (dispatch)
- [ ] Sign in with `ana@aptmaintenanceinc.com` → lands on `/hr` (people + finance, no dispatch)
- [ ] Sign in with a non-@aptmaintenanceinc.com Gmail → blocked at Google OAuth
- [ ] Sign in with a made-up @aptmaintenanceinc.com address → lands on login with "not authorized" message

**Sidebar visibility:**
- [ ] Brandon (admin): all 10 nav items visible including "Workorder Schedule"
- [ ] Robert (dispatch): Coordination, Workorder Schedule, Feedback visible. No HR, Team, Billing, etc.
- [ ] Ana (people + finance): Schedule, Calendar, Team, Compliance, HR, Billing visible. No Coordination, no Workorder Schedule.
- [ ] Ataklti (finance only): Billing visible only.

**Route guard:**
- [ ] Navigate to `/billing` as Robert → redirected to `/live`
- [ ] Navigate to `/live` as Ana → redirected to `/hr`
- [ ] Navigate to `/live` as Brandon (admin) → allowed

**"Workorder Schedule" rename:**
- [ ] The `/schedule` (DnD scheduling grid) nav item label is "Workorder Schedule" for all roles that see it

**Tech PWA unaffected:**
- [ ] `clock.aptmaintenanceinc.com` shows badge+PIN form only (no Google button)
- [ ] Existing tech sessions (`localStorage.aptSession`) still work
- [ ] Clock in/out, jobs, mark complete: no regressions

**TypeScript:**
- [ ] `tsc --noEmit` passes with 0 errors
- [ ] No console errors on any page load

---

## SEQUENCING NOTE FOR AG

1. Ship `ANTIGRAVITY_RBAC_SCHEDULE_FIX_SPEC.md` first (fixes live bugs: date window, month pill, search, /time-off redirect)
2. Ship this spec second — it replaces the RouteGuard and AppSidebar from spec 1, and deletes `routePermissions.ts`
3. Brandon must complete his setup steps (Google Cloud Console + Vercel env vars + Staff Roster tab) before this spec can go live — confirm with Brandon before deploying

**If Brandon's setup steps are not complete when this ships:** the Google Sign-In button will redirect but OAuth will fail. No crash — it falls back to the login page with an error message. Tech PWA is unaffected either way.
