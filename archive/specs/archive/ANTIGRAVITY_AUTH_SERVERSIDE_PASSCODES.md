# ANTIGRAVITY SPRINT — SERVER-SIDE PASSCODE VALIDATION (Auth Step 2)
# Owner: Claude Code | Executor: Antigravity
# Date: April 23, 2026

---

## WHY

Passcodes are currently hardcoded in login/page.tsx which is in the GitHub repo.
Anyone with repo access can read them. Rotating a passcode requires a Vercel deploy.
This moves validation to the server — passcodes live in Apps Script Script Properties,
invisible to the repo, changeable without any deploy.

---

## TASK 1 — Backend: add validatePasscode action to DashboardAPI.gs

### File: `dashboard-api/DashboardAPI.gs`

### Step 1a — Add the action handler in doPost

Find the action routing block (the chain of `if (action === '...')` statements) and add
this line alongside the others:

```js
if (action === 'validatePasscode')   return daResponse(validatePasscode(payload));
```

### Step 1b — Add the validatePasscode function

Add this function anywhere in the file (after the last function is fine):

```js
// ── Passcode validation — reads from Script Properties so creds stay out of repo
function validatePasscode(payload) {
  try {
    var passcode = String(payload.passcode || '').trim();
    if (!passcode) return { success: false, error: 'No passcode provided' };

    var props = PropertiesService.getScriptProperties();

    // Map: Script Property key → role name
    var propMap = [
      { key: 'PASSCODE_DISPATCH',    role: 'dispatch'    },
      { key: 'PASSCODE_MANAGEMENT',  role: 'management'  },
      { key: 'PASSCODE_HR',          role: 'hr'          },
      { key: 'PASSCODE_COMPLIANCE',  role: 'compliance'  },
      { key: 'PASSCODE_ADMIN',       role: 'admin'       },
    ];

    for (var i = 0; i < propMap.length; i++) {
      var stored = props.getProperty(propMap[i].key);
      if (stored && stored.trim() === passcode) {
        return { success: true, role: propMap[i].role };
      }
    }

    return { success: false, error: 'Invalid passcode' };
  } catch (e) {
    Logger.log('validatePasscode error: ' + e.message);
    return { success: false, error: 'Validation error' };
  }
}
```

### Step 1c — Deploy

```
cd dashboard-api && clasp push --force && clasp deploy --deploymentId AKfycbyum_KLprgPh51GxFiwhsoNHScc4TqIBrzZS0GPfHsnhrc9hAtp03AciyiydhfyJyxCCQ --description "v16 — server-side passcode validation"
```

Report the confirmed version number.

---

## TASK 2 — Set Script Properties in Apps Script console

**This must be done by Brandon in the Apps Script IDE — Antigravity cannot do this.**

In the Apps Script console for the Dashboard API project:
Project Settings → Script Properties → Add the following:

| Property key         | Value        |
|----------------------|--------------|
| PASSCODE_DISPATCH    | APT2026!     |
| PASSCODE_MANAGEMENT  | APT-MGT-26   |
| PASSCODE_HR          | APT-HR-26    |
| PASSCODE_COMPLIANCE  | APT-COMP-26  |
| PASSCODE_ADMIN       | APT-ADM-26   |

**Do not put these values in any file, spec, or commit message going forward.**
After this step, passcodes can be rotated any time directly in Script Properties
with zero code changes or deploys.

---

## TASK 3 — Frontend: update login/page.tsx to call the API

### File: `tech-pwa/src/app/login/page.tsx`

### Step 3a — Remove the hardcoded passcode map and replace the auth block

Find this entire block:

```ts
const ROLE_PASSCODES: Record<string, UserRole> = {
  'APT2026!':    'dispatch',
  'APT-MGT-26':  'management',
  'APT-HR-26':   'hr',
  'APT-COMP-26': 'compliance',
  'APT-ADM-26':  'admin',
};

const matchedRole = ROLE_PASSCODES[passcode];

if (matchedRole) {
  const defaultRoutes: Record<string, string> = {
    'dispatch':   '/live',
    'management': '/live',
    'compliance': '/compliance',
    'hr':         '/hr',
    'admin':      '/live',
  };
  setSession({
    token: `${matchedRole}-session-token`,
    techId: matchedRole.toUpperCase(),
    techName: matchedRole.toUpperCase(),
    role: matchedRole,
    expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
  });
  router.push(defaultRoutes[matchedRole] || "/live");
} else {
  setError("Invalid access passcode.");
}
```

Replace with:

```ts
const res = await dashboardRequest('validatePasscode', { passcode });

if (res.success && res.role) {
  const matchedRole = res.role as UserRole;
  const defaultRoutes: Record<string, string> = {
    'dispatch':   '/live',
    'management': '/live',
    'compliance': '/compliance',
    'hr':         '/hr',
    'admin':      '/live',
  };
  setSession({
    token: `${matchedRole}-session-token`,
    techId: matchedRole.toUpperCase(),
    techName: matchedRole.toUpperCase(),
    role: matchedRole,
    expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
  });
  router.push(defaultRoutes[matchedRole] || "/live");
} else {
  setError("Invalid access passcode.");
}
```

### Step 3b — The outer else block is now async — ensure the function signature handles it

The `else` branch containing this block must be inside an `async` function or wrapped
in a try/catch. Check the surrounding login handler — it likely already uses `async`.
If `setLoading` is called before the block, keep that. Do not change anything else
in the file.

### Step 3c — Import dashboardRequest if not already imported at the top of login/page.tsx

Check line 1–10 for existing imports. If `dashboardRequest` is not already imported, add:

```ts
import { dashboardRequest } from '@/lib/dashboard-api';
```

---

## IMPORTANT: TRANSITION SAFETY

**Until Brandon sets the Script Properties in Task 2, the login will fail for all
dispatch users.** Do the deploy (Task 1) and set the Script Properties (Task 2)
BEFORE merging the frontend change (Task 3). Order matters:

1. Deploy backend (Task 1)
2. Brandon sets Script Properties (Task 2)  
3. Test: call the API manually — `POST { action: 'validatePasscode', passcode: 'APT2026!' }` should return `{ success: true, role: 'dispatch' }`
4. Only then deploy the frontend change (Task 3 + commit + push to Vercel)

---

## VERIFICATION

1. `npx tsc --noEmit` — zero errors
2. Log in with each passcode — confirm correct role and redirect
3. Confirm hardcoded `ROLE_PASSCODES` object no longer exists anywhere in the frontend codebase: `grep -r "APT2026\|APT-MGT\|APT-HR\|APT-COMP\|APT-ADM" tech-pwa/src/` must return zero results
4. Report clasp deploy version number

---

## COMMIT MESSAGE

`feat: passcode validation moved server-side — credentials removed from frontend codebase`

---

## DO NOT TOUCH

- The tech (badge+PIN) login flow — that uses TechPWA.gs and is separate, leave it alone
- Any other file in tech-pwa/src/
- CLAUDE.md
