# ANTIGRAVITY SPEC — Tech Assignment Fix
**Feature:** Tech PWA job visibility + push notification lookup
**Priority:** CRITICAL — techs cannot see any jobs assigned via CC2.0
**Backend only. No frontend changes.**

---

## Context

When Robert assigns a tech in CC2.0, the Dispatch Queue col 17 receives the tech's
plain name, e.g. `"Salvador Cabrera"`.

Two functions in the backend require `"Name #Badge"` format and fail silently:

1. `isTechMatch` in `TechPWA.gs` — determines whether a job appears in a tech's
   PWA job list. Uses `#(\d+)` regex. Name-only input → returns false → job never
   shown to tech.

2. `getTechRowByName` in `dashboard-api/DashboardAPI.gs` — looks up a tech row
   to fire a push notification on assignment. Exact-matches `"Name #Badge"`. 
   Name-only input → returns null → push never fires.

**Result:** Every job scheduled via CC2.0 is invisible to the assigned tech in
the PWA. Push notifications never fire on assignment.

---

## Files to Change

| File | Function | Change |
|---|---|---|
| `TechPWA.gs` | `isTechMatch` | Add `techName` parameter + name-only fallback |
| `TechPWA.gs` | `getTechJobs` (call site) | Pass `tech.name` as third arg |
| `dashboard-api/DashboardAPI.gs` | `getTechRowByName` | Add name-only fallback |

---

## Exact Changes

### 1. `TechPWA.gs` — `isTechMatch` (currently at line 621)

**Delete this entire function:**
```javascript
function isTechMatch(assignedCell, badge) {
  // Support crew: comma-separated "Name #Badge, Name #Badge"
  // Match if badge appears in ANY segment
  var segments = String(assignedCell || '').split(',');
  return segments.some(function(seg) {
    var m = seg.match(/#(\d+)/);
    return m ? m[1] === String(badge) : false;
  });
}
```

**Replace with:**
```javascript
function isTechMatch(assignedCell, badge, techName) {
  // Support crew: comma-separated entries, e.g. "Name #Badge, Name #Badge"
  // Accepts both "Name #Badge" format and name-only (CC2.0 assignment path)
  var segments = String(assignedCell || '').split(',');
  return segments.some(function(seg) {
    var trimmed = seg.trim();
    var m = trimmed.match(/#(\d+)/);
    if (m) return m[1] === String(badge);
    // Name-only fallback: match tech name case-insensitively
    return techName ? trimmed.toLowerCase() === String(techName).toLowerCase() : false;
  });
}
```

---

### 2. `TechPWA.gs` — `getTechJobs` call site (currently at line 310)

**Find this line:**
```javascript
    if (!isTechMatch(assigned, tech.badge)) continue;
```

**Replace with:**
```javascript
    if (!isTechMatch(assigned, tech.badge, tech.name)) continue;
```

No other changes in `getTechJobs`.

---

### 3. `dashboard-api/DashboardAPI.gs` — `getTechRowByName` (currently at line 2291)

**Delete this entire function:**
```javascript
function getTechRowByName(techNameBadge) {
  var tr   = getTRSheet();
  var data = tr.getDataRange().getValues();
  for (var i = 1; i < data.length; i++) {
    var rowName = data[i][DA_TR.NAME] + ' #' + data[i][DA_TR.BADGE];
    if (rowName === techNameBadge) return data[i];
  }
  return null;
}
```

**Replace with:**
```javascript
function getTechRowByName(techNameBadge) {
  var tr   = getTRSheet();
  var data = tr.getDataRange().getValues();
  var needle = String(techNameBadge || '').trim().toLowerCase();
  for (var i = 1; i < data.length; i++) {
    // Primary: "Name #Badge" format
    var rowName = (data[i][DA_TR.NAME] + ' #' + data[i][DA_TR.BADGE]).toLowerCase();
    if (rowName === needle) return data[i];
    // Fallback: name-only (CC2.0 writes name without badge number)
    var nameOnly = String(data[i][DA_TR.NAME] || '').trim().toLowerCase();
    if (nameOnly === needle) return data[i];
  }
  return null;
}
```

---

## What to Keep Unchanged

- Everything else in `getTechJobs` — the sheet read, date filtering, job shape, sort
- All other call sites — there are none; `isTechMatch` is only called in `getTechJobs`
- `getTechRowByName` is only called in `updateJobDA` (push notification trigger)
- No frontend changes. No column map changes. No data format changes.

---

## Deploy Steps

### TechPWA.gs (root project — also pushes Code.js)
Working directory: `A:/PTOW/1_APT_Central_Command/`
```
clasp push --force
clasp deploy --deploymentId AKfycbySG8tbAaXyIRFXnq7x-Fp5Gvs7uG8RmAyBB_wSFcGmScbhI3SHSq2HoznowBcsi3mM9Q --description "v80 — fix isTechMatch name-only fallback"
```

### DashboardAPI.gs (separate project)
Working directory: `A:/PTOW/1_APT_Central_Command/dashboard-api/`
```
clasp push --force
clasp deploy --deploymentId AKfycbyum_KLprgPh51GxFiwhsoNHScc4TqIBrzZS0GPfHsnhrc9hAtp03AciyiydhfyJyxCCQ --description "v29 — fix getTechRowByName name-only fallback"
```

---

## Verification Steps

1. Open the real Dispatch Queue sheet. Find a job where col 17 contains a plain
   tech name (e.g. `"Salvador Cabrera"` with no `#badge`).
2. Log into the Tech PWA as that tech (badge # + PIN at clock.aptmaintenanceinc.com).
3. Confirm the job appears in the `/jobs` list.
4. Separately verify: assign a new job to a tech in CC2.0. If that tech has a push
   subscription (col R in Tech Roster), a push notification should fire.

---

## What Must NOT Be Changed

- Do not change how CC2.0 writes the `assignedTech` field. Name-only is fine.
- Do not move, rename, or delete any `.gs` files at repo root.
- Do not alter `Code.js` — it is not involved in this fix.
