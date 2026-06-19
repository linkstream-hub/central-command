# ANTIGRAVITY_TENANT_SCHEDULING_SPEC.md
# Tenant Self-Scheduling — Full Flow
# Sprint 30 | Spec author: Claude Code | Date: 2026-04-28

---

## OVERVIEW

Tenants (and RMs) receive a unique scheduling link via email. Clicking it takes them to a
public page where they see available time slots based on APT's real capacity, pick a slot,
and confirm their info. The job is auto-scheduled immediately — no dispatcher approval
needed. Dispatch sees a "TENANT SCHED" badge on the job card and assigns the tech.

This closes the biggest operational gap: the PTE coordination phone-tag loop. When a tenant
self-schedules, PTE is implicitly granted (they picked the time — they know it's happening).

---

## BUSINESS RULES

1. Tenant self-schedules → PTE = "Yes" written to DQ col 14.
2. Job status → "Ready to Schedule" (dispatch still assigns the tech).
3. DQ notes get appended: `[TENANT SCHEDULED: {date} at {time}. Tech: knock before entering — tenant may or may not be present.]`
4. A "TENANT SCHED" badge appears in the dispatch queue row.
5. Available slots are based on aggregate tech capacity — tenants never see individual tech names.
6. Each scheduling link is single-use. Once used, the token is consumed and the page shows a confirmation.
7. The tracking token is generated when the job is created in the DQ and stored in DQ col 29.

---

## SCHEMA CHANGES

### Dispatch Queue — two new columns

**Claude Code will add these headers to the sheet manually. Antigravity must NOT touch the sheet.**
Antigravity only adds them to the column index map in code.

```
Col 29 (index 28): TRACKING_TOKEN  — UUID string, generated on job creation
Col 30 (index 29): TENANT_SCHED    — "Yes" / "" (empty = no)
```

### DA_DQ column map update in `dashboard-api/DashboardAPI.gs`

Find the `var DA_DQ` block (line 36) and add two entries:

```javascript
var DA_DQ = {
  TIMESTAMP : 0,  LEAD_ID  : 1,  PRIORITY : 2,  EMAIL_TYPE : 3,
  CATEGORY  : 4,  ADDRESS  : 5,  UNIT     : 6,  DESC       : 7,
  TIMING    : 8,  ACCESS   : 9,  RM_NAME  : 10, RM_EMAIL   : 11,
  TEN_NAME  : 12, TEN_PHONE: 13, PTE      : 14, ESTIMATE   : 15,
  TECH      : 16, SCHED    : 17, EST_HRS  : 18, STATUS     : 19,
  NOTES     : 20, MSG_ID   : 21, CAL_EVT  : 22, TEN_EMAIL  : 23,
  TEN_PREF  : 24, TEN_PETS : 25, WC_CODE  : 26, ENTITY_ID  : 27,
  TRACKING_TOKEN : 28,  TENANT_SCHED : 29          // ← NEW
};
```

### rowToJob() update

In `rowToJob()` (around line 305), add two new fields to the returned object:

```javascript
trackingToken  : String(row[DA_DQ.TRACKING_TOKEN] || ''),
tenantScheduled: String(row[DA_DQ.TENANT_SCHED]   || '') === 'Yes'
```

### Job type update in `tech-pwa/src/lib/types.ts`

Add to the `Job` interface:

```typescript
trackingToken?  : string;
tenantScheduled?: boolean;
```

---

## NEW DASHBOARD API ENDPOINTS — `dashboard-api/DashboardAPI.gs`

### Wire in doPost (add after `getJobComments` line):

```javascript
if (action === 'getAvailableSlots')   return daResponse(getAvailableSlotsDA(body), true); // public
if (action === 'tenantSelfSchedule')  return daResponse(tenantSelfScheduleDA(body), true); // public
if (action === 'generateScheduleLink') return daResponse(generateScheduleLinkDA(body));    // auth required
```

Note: The `daResponse` wrapper needs a second parameter `isPublic` to skip the API key check
for the two public endpoints. Update `doPost` auth gate:

```javascript
// In doPost, before the auth check:
var publicActions = ['getAvailableSlots', 'tenantSelfSchedule'];
if (!validateApiKey(body.apiKey) && publicActions.indexOf(action) === -1) {
  return daResponse({ success: false, error: 'UNAUTHORIZED' });
}
```

### `getAvailableSlotsDA(params)`

```javascript
// Public endpoint. No API key required.
// Params: { token: string }
// Returns: { success, job: { address, unit, serviceCategory }, slots: SlotDay[] }
// SlotDay: { date: string (YYYY-MM-DD), label: string (e.g. "Mon May 5"), slots: string[] }
// slots[]: "Morning (8am – 12pm)" | "Afternoon (12pm – 5pm)"
function getAvailableSlotsDA(params) {
  try {
    var token = String((params && params.token) || '').trim();
    if (!token) return { success: false, error: 'MISSING_TOKEN' };

    var ss    = SpreadsheetApp.openById('1eCSHpj5381R7Hhloe718r1n8fEfesY2tjYOuOLxTSd4');
    var dqSheet = ss.getSheetByName('Dispatch Queue');
    if (!dqSheet) return { success: false, error: 'SHEET_NOT_FOUND' };

    var data  = dqSheet.getDataRange().getValues().slice(1);
    var jobRow = null;
    var jobRowIndex = -1;

    for (var i = 0; i < data.length; i++) {
      if (String(data[i][DA_DQ.TRACKING_TOKEN] || '').trim() === token) {
        jobRow = data[i];
        jobRowIndex = i + 2; // 1-indexed + header
        break;
      }
    }

    if (!jobRow) return { success: false, error: 'TOKEN_NOT_FOUND' };

    // Token already used?
    if (String(jobRow[DA_DQ.TENANT_SCHED] || '') === 'Yes') {
      return { success: false, error: 'TOKEN_CONSUMED' };
    }

    // Build available slots for next 14 calendar days (Mon-Fri only)
    var today   = new Date();
    var slots   = [];
    var checked = 0;
    var d       = new Date(today);
    d.setDate(d.getDate() + 1); // Start from tomorrow

    // Count hours already scheduled per day from DQ
    var scheduledByDay = {};
    data.forEach(function(row) {
      var sched = String(row[DA_DQ.SCHED] || '').trim();
      var stat  = String(row[DA_DQ.STATUS] || '').trim();
      if (!sched || (stat !== 'Scheduled' && stat !== 'Ready to Schedule')) return;
      var datePart = sched.split('|')[0];
      scheduledByDay[datePart] = (scheduledByDay[datePart] || 0) + 
        (parseFloat(String(row[DA_DQ.EST_HRS] || '0')) || 4);
    });

    // Total active tech capacity per day (active techs × 8h)
    var trSheet    = ss.getSheetByName('Tech Roster');
    var trData     = trSheet ? trSheet.getDataRange().getValues().slice(1) : [];
    var activeTechs = trData.filter(function(r) {
      return String(r[DA_TR.ACTIVE] || '').toUpperCase() === 'TRUE';
    }).length;
    var dailyCapacity = activeTechs * 8; // hours

    while (checked < 14 && slots.length < 10) {
      var day = d.getDay(); // 0=Sun, 6=Sat
      if (day !== 0 && day !== 6) { // Weekdays only
        var isoDate  = Utilities.formatDate(d, 'America/Los_Angeles', 'yyyy-MM-dd');
        var label    = Utilities.formatDate(d, 'America/Los_Angeles', 'EEE, MMM d');
        var booked   = scheduledByDay[isoDate] || 0;
        var remaining = dailyCapacity - booked;
        var daySlots  = [];

        if (remaining >= 4) daySlots.push('Morning (8am – 12pm)');
        if (remaining >= 4) daySlots.push('Afternoon (12pm – 5pm)');
        // If capacity is tight (< 4h), show neither slot for that day

        if (daySlots.length > 0) {
          slots.push({ date: isoDate, label: label, slots: daySlots });
        }
      }
      d.setDate(d.getDate() + 1);
      checked++;
    }

    return {
      success: true,
      job: {
        address        : String(jobRow[DA_DQ.ADDRESS]  || ''),
        unit           : String(jobRow[DA_DQ.UNIT]     || ''),
        serviceCategory: String(jobRow[DA_DQ.CATEGORY] || ''),
        description    : String(jobRow[DA_DQ.DESC]     || '').substring(0, 200)
      },
      slots: slots
    };
  } catch (e) {
    Logger.log('getAvailableSlotsDA error: ' + e.message);
    return { success: false, error: e.message };
  }
}
```

### `tenantSelfScheduleDA(params)`

```javascript
// Public endpoint. No API key required.
// Params: { token, date (YYYY-MM-DD), slot ("Morning"|"Afternoon"), tenantName, tenantPhone, willBePresent (boolean) }
// Returns: { success, confirmationMessage }
function tenantSelfScheduleDA(params) {
  try {
    var token      = String((params && params.token)       || '').trim();
    var date       = String((params && params.date)        || '').trim();
    var slot       = String((params && params.slot)        || '').trim(); // "Morning" or "Afternoon"
    var tenantName = String((params && params.tenantName)  || '').trim();
    var tenantPhone= String((params && params.tenantPhone) || '').trim();
    var willBePresent = !!(params && params.willBePresent);

    if (!token || !date || !slot) return { success: false, error: 'MISSING_FIELDS' };

    var ss     = SpreadsheetApp.openById('1eCSHpj5381R7Hhloe718r1n8fEfesY2tjYOuOLxTSd4');
    var dqSheet = ss.getSheetByName('Dispatch Queue');
    if (!dqSheet) return { success: false, error: 'SHEET_NOT_FOUND' };

    var data = dqSheet.getDataRange().getValues().slice(1);
    var rowIndex = -1;

    for (var i = 0; i < data.length; i++) {
      if (String(data[i][DA_DQ.TRACKING_TOKEN] || '').trim() === token) {
        rowIndex = i + 2; // 1-indexed + header
        break;
      }
    }

    if (rowIndex === -1) return { success: false, error: 'TOKEN_NOT_FOUND' };

    // Check token not already consumed
    if (String(dqSheet.getRange(rowIndex, DA_DQ.TENANT_SCHED + 1).getValue() || '') === 'Yes') {
      return { success: false, error: 'TOKEN_CONSUMED' };
    }

    // Map slot to time
    var time = slot === 'Afternoon' ? '12:00' : '08:00';
    var schedValue = date + '|' + time;

    // Determine presence note
    var presenceNote = willBePresent
      ? 'Tenant will be present.'
      : 'Tenant may or may not be present.';
    var techNote = '[TENANT SCHEDULED: ' + date + ' ' + slot + '. ' + presenceNote + ' Tech: knock before entering.]';

    // Read existing notes to append
    var existingNotes = String(dqSheet.getRange(rowIndex, DA_DQ.NOTES + 1).getValue() || '').trim();
    var newNotes = existingNotes ? existingNotes + '\n' + techNote : techNote;

    // Write all fields atomically
    dqSheet.getRange(rowIndex, DA_DQ.PTE + 1).setValue('Yes');            // PTE granted
    dqSheet.getRange(rowIndex, DA_DQ.SCHED + 1).setValue(schedValue);     // Scheduled date|time
    dqSheet.getRange(rowIndex, DA_DQ.STATUS + 1).setValue('Ready to Schedule'); // Status
    dqSheet.getRange(rowIndex, DA_DQ.NOTES + 1).setValue(newNotes);        // Appended note
    dqSheet.getRange(rowIndex, DA_DQ.TENANT_SCHED + 1).setValue('Yes');    // Token consumed

    // Update tenant info if provided (overwrite blanks only — don't replace existing data)
    if (tenantName) {
      var existingTenantName = String(dqSheet.getRange(rowIndex, DA_DQ.TEN_NAME + 1).getValue() || '').trim();
      if (!existingTenantName) dqSheet.getRange(rowIndex, DA_DQ.TEN_NAME + 1).setValue(tenantName);
    }
    if (tenantPhone) {
      var existingTenantPhone = String(dqSheet.getRange(rowIndex, DA_DQ.TEN_PHONE + 1).getValue() || '').trim();
      if (!existingTenantPhone) dqSheet.getRange(rowIndex, DA_DQ.TEN_PHONE + 1).setValue(tenantPhone);
    }

    // Format a human-readable date label for the confirmation message
    var dateLabel = date; // fallback
    try {
      var d = new Date(date + 'T12:00:00');
      dateLabel = d.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
    } catch(e) {}

    return {
      success: true,
      confirmationMessage: 'Your maintenance appointment has been scheduled for ' + dateLabel + ', ' + slot.toLowerCase() + '. APT Maintenance will assign a technician and confirm the details. You will receive a confirmation email shortly.'
    };
  } catch (e) {
    Logger.log('tenantSelfScheduleDA error: ' + e.message);
    return { success: false, error: e.message };
  }
}
```

### `generateScheduleLinkDA(params)`

```javascript
// Auth-required. Called by dispatch to get/generate the scheduling link for a job.
// Params: { leadId: string }
// Returns: { success, schedulingUrl, token }
function generateScheduleLinkDA(params) {
  try {
    var leadId = String((params && params.leadId) || '').trim();
    if (!leadId) return { success: false, error: 'MISSING_LEAD_ID' };

    var ss      = SpreadsheetApp.openById('1eCSHpj5381R7Hhloe718r1n8fEfesY2tjYOuOLxTSd4');
    var dqSheet = ss.getSheetByName('Dispatch Queue');
    var data    = dqSheet.getDataRange().getValues().slice(1);
    var rowIndex = -1;
    var existingToken = '';

    for (var i = 0; i < data.length; i++) {
      if (String(data[i][DA_DQ.LEAD_ID] || '').trim() === leadId) {
        rowIndex      = i + 2;
        existingToken = String(data[i][DA_DQ.TRACKING_TOKEN] || '').trim();
        break;
      }
    }

    if (rowIndex === -1) return { success: false, error: 'JOB_NOT_FOUND' };

    var token = existingToken;
    if (!token) {
      token = Utilities.getUuid();
      dqSheet.getRange(rowIndex, DA_DQ.TRACKING_TOKEN + 1).setValue(token);
    }

    var baseUrl = 'https://central-command-pi.vercel.app';
    var schedulingUrl = baseUrl + '/schedule/' + token;

    return { success: true, schedulingUrl: schedulingUrl, token: token };
  } catch (e) {
    Logger.log('generateScheduleLinkDA error: ' + e.message);
    return { success: false, error: e.message };
  }
}
```

---

## NEW NEXT.JS PAGE — `tech-pwa/src/app/schedule/[token]/page.tsx`

This is a PUBLIC page — no auth required, no DashboardLayout, no sidebar.

```tsx
'use client';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, Calendar, Clock, AlertCircle } from 'lucide-react';

const API_URL = process.env.NEXT_PUBLIC_DASHBOARD_API_URL!;

async function apiCall(action: string, body: object) {
  const res = await fetch(API_URL, {
    method : 'POST',
    headers: { 'Content-Type': 'text/plain' },
    body   : JSON.stringify({ action, ...body })
  });
  return res.json();
}

interface SlotDay {
  date  : string;
  label : string;
  slots : string[];
}

interface JobInfo {
  address        : string;
  unit?          : string;
  serviceCategory: string;
  description    : string;
}

export default function TenantSchedulePage({ params }: { params: { token: string } }) {
  const { token } = params;

  const [phase, setPhase]           = useState<'loading'|'pick'|'confirm'|'done'|'error'>('loading');
  const [jobInfo, setJobInfo]       = useState<JobInfo | null>(null);
  const [availableDays, setAvailableDays] = useState<SlotDay[]>([]);
  const [selectedDay, setSelectedDay]     = useState<SlotDay | null>(null);
  const [selectedSlot, setSelectedSlot]   = useState<string>('');
  const [tenantName, setTenantName]       = useState('');
  const [tenantPhone, setTenantPhone]     = useState('');
  const [willBePresent, setWillBePresent] = useState<boolean | null>(null);
  const [submitting, setSubmitting]       = useState(false);
  const [confirmation, setConfirmation]   = useState('');
  const [errorMsg, setErrorMsg]           = useState('');

  useEffect(() => {
    apiCall('getAvailableSlots', { token }).then(res => {
      if (res.success) {
        setJobInfo(res.job);
        setAvailableDays(res.slots);
        setPhase('pick');
      } else if (res.error === 'TOKEN_CONSUMED') {
        setPhase('done');
        setConfirmation('This scheduling link has already been used. Your appointment is confirmed.');
      } else {
        setErrorMsg('This scheduling link is invalid or has expired. Please contact APT Maintenance directly.');
        setPhase('error');
      }
    }).catch(() => {
      setErrorMsg('Unable to load available times. Please try again or contact APT Maintenance.');
      setPhase('error');
    });
  }, [token]);

  const handleSubmit = async () => {
    if (!selectedDay || !selectedSlot || willBePresent === null) return;
    setSubmitting(true);
    const res = await apiCall('tenantSelfSchedule', {
      token,
      date         : selectedDay.date,
      slot         : selectedSlot.startsWith('Morning') ? 'Morning' : 'Afternoon',
      tenantName   : tenantName.trim(),
      tenantPhone  : tenantPhone.trim(),
      willBePresent: willBePresent
    });
    setSubmitting(false);
    if (res.success) {
      setConfirmation(res.confirmationMessage);
      setPhase('done');
    } else if (res.error === 'TOKEN_CONSUMED') {
      setConfirmation('This link has already been used. Your appointment is confirmed.');
      setPhase('done');
    } else {
      setErrorMsg('Something went wrong. Please try again or call APT Maintenance.');
      setPhase('error');
    }
  };

  const canSubmit = !!selectedDay && !!selectedSlot && willBePresent !== null && !submitting;

  return (
    <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center p-4">
      <div className="w-full max-w-md">

        {/* Logo / Brand */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full">
            <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
            <span className="text-xs font-black text-white/60 uppercase tracking-[0.3em]">
              APT Maintenance
            </span>
          </div>
          <h1 className="text-2xl font-black text-white mt-4 tracking-tight">
            Schedule Your Service
          </h1>
        </div>

        <AnimatePresence mode="wait">

          {/* LOADING */}
          {phase === 'loading' && (
            <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="flex flex-col items-center gap-4 py-16">
              <div className="w-8 h-8 border-2 border-blue-400/30 border-t-blue-400 rounded-full animate-spin" />
              <p className="text-white/40 text-sm">Loading available times…</p>
            </motion.div>
          )}

          {/* ERROR */}
          {phase === 'error' && (
            <motion.div key="error" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              className="bg-red-500/10 border border-red-500/20 rounded-2xl p-6 text-center">
              <AlertCircle size={32} className="text-red-400 mx-auto mb-3" />
              <p className="text-red-300 text-sm">{errorMsg}</p>
              <p className="text-white/40 text-xs mt-2">
                Call us: <a href="tel:+1-xxx-xxx-xxxx" className="underline">APT Maintenance</a>
              </p>
            </motion.div>
          )}

          {/* DONE */}
          {phase === 'done' && (
            <motion.div key="done" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
              className="bg-green-500/10 border border-green-500/20 rounded-2xl p-8 text-center">
              <CheckCircle size={40} className="text-green-400 mx-auto mb-4" />
              <h2 className="text-lg font-black text-white mb-2">Appointment Confirmed</h2>
              <p className="text-green-300/80 text-sm leading-relaxed">{confirmation}</p>
            </motion.div>
          )}

          {/* PICK SLOT */}
          {phase === 'pick' && jobInfo && (
            <motion.div key="pick" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              className="space-y-5">

              {/* Job info card */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40 mb-1">
                  Service Request
                </p>
                <p className="text-sm font-bold text-white">
                  {jobInfo.address}{jobInfo.unit ? ` · Unit ${jobInfo.unit}` : ''}
                </p>
                <p className="text-xs text-white/50 mt-0.5">{jobInfo.serviceCategory}</p>
                {jobInfo.description && (
                  <p className="text-[10px] text-white/30 mt-2 leading-relaxed">{jobInfo.description}</p>
                )}
              </div>

              {/* Date picker */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Calendar size={14} className="text-white/40" />
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40">
                    Select a Date
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {availableDays.map(day => (
                    <button
                      key={day.date}
                      onClick={() => { setSelectedDay(day); setSelectedSlot(''); }}
                      className={`p-3 rounded-xl border text-left transition-all ${
                        selectedDay?.date === day.date
                          ? 'border-blue-500/50 bg-blue-500/15 text-white'
                          : 'border-white/10 bg-white/5 text-white/60 hover:border-white/20 hover:bg-white/10'
                      }`}
                    >
                      <p className="text-xs font-black">{day.label}</p>
                      <p className="text-[9px] text-white/40 mt-0.5">
                        {day.slots.length} slot{day.slots.length !== 1 ? 's' : ''} available
                      </p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Time slot picker */}
              {selectedDay && (
                <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }}>
                  <div className="flex items-center gap-2 mb-3">
                    <Clock size={14} className="text-white/40" />
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40">
                      Select a Time
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {selectedDay.slots.map(slot => (
                      <button
                        key={slot}
                        onClick={() => setSelectedSlot(slot)}
                        className={`p-3 rounded-xl border text-left transition-all ${
                          selectedSlot === slot
                            ? 'border-blue-500/50 bg-blue-500/15 text-white'
                            : 'border-white/10 bg-white/5 text-white/60 hover:border-white/20'
                        }`}
                      >
                        <p className="text-xs font-bold">{slot}</p>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Presence + contact */}
              {selectedSlot && (
                <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">

                  {/* Will tenant be present? */}
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40 mb-3">
                      Will you be home?
                    </p>
                    <div className="grid grid-cols-2 gap-2">
                      {[{ val: true, label: 'Yes, I\'ll be home' }, { val: false, label: 'No, grant entry' }].map(opt => (
                        <button
                          key={String(opt.val)}
                          onClick={() => setWillBePresent(opt.val)}
                          className={`p-3 rounded-xl border text-left transition-all ${
                            willBePresent === opt.val
                              ? 'border-blue-500/50 bg-blue-500/15 text-white'
                              : 'border-white/10 bg-white/5 text-white/60 hover:border-white/20'
                          }`}
                        >
                          <p className="text-xs font-bold">{opt.label}</p>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Contact info (optional) */}
                  <div className="space-y-2">
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40">
                      Contact Info <span className="font-normal normal-case">(optional — updates your record)</span>
                    </p>
                    <input
                      type="text"
                      placeholder="Your name"
                      value={tenantName}
                      onChange={e => setTenantName(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-blue-500/40"
                    />
                    <input
                      type="tel"
                      placeholder="Phone number"
                      value={tenantPhone}
                      onChange={e => setTenantPhone(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-blue-500/40"
                    />
                  </div>

                  {/* Confirm button */}
                  <button
                    disabled={!canSubmit}
                    onClick={handleSubmit}
                    className="w-full py-4 rounded-2xl bg-blue-500 text-white text-sm font-black uppercase tracking-widest disabled:opacity-30 hover:bg-blue-400 transition-all active:scale-[0.98]"
                  >
                    {submitting ? 'Confirming…' : 'Confirm Appointment'}
                  </button>

                  <p className="text-[9px] text-white/20 text-center leading-relaxed">
                    By confirming, you grant APT Maintenance Inc. permission to enter the unit 
                    at the scheduled time. A technician will knock before entering.
                  </p>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
```

---

## DISPATCH QUEUE — "TENANT SCHED" BADGE

In `tech-pwa/src/components/dashboard/JobQueueTable.tsx`, find where staleness badges are rendered
on job rows (the `getJobAge` / amber/red badge logic). Add a "TENANT SCHED" badge alongside:

```tsx
{job.tenantScheduled && (
  <span className="text-[8px] font-black uppercase tracking-widest px-1.5 py-0.5 rounded-full bg-green-500/15 text-green-400 border border-green-500/20">
    TENANT SCHED
  </span>
)}
```

Place this immediately after the staleness badge, before the job address text.

---

## "SEND SCHEDULING LINK" BUTTON IN JOB DETAIL MODAL

In `tech-pwa/src/components/dashboard/JobDetailModal.tsx`, find the dispatcher actions area
(near the "Email Tenant" or PTE button). Add a "Send Scheduling Link" button:

### State:
```typescript
const [schedulingLink, setSchedulingLink] = useState<string>('');
const [loadingLink, setLoadingLink]       = useState(false);
const [linkCopied, setLinkCopied]         = useState(false);
```

### Handler:
```typescript
const handleGetSchedulingLink = async () => {
  if (!activeJob?.jobId) return;
  setLoadingLink(true);
  const res = await dashboardRequest('generateScheduleLink', { leadId: activeJob.jobId });
  if (res.success) {
    setSchedulingLink(res.schedulingUrl);
    // Auto-copy to clipboard
    try { await navigator.clipboard.writeText(res.schedulingUrl); setLinkCopied(true); setTimeout(() => setLinkCopied(false), 2000); } catch {}
  }
  setLoadingLink(false);
};
```

### JSX (add in the dispatcher actions section, after "Email Tenant" if present):
```tsx
<div className="flex flex-col gap-2">
  <button
    onClick={handleGetSchedulingLink}
    disabled={loadingLink || !!activeJob?.tenantScheduled}
    className="flex items-center gap-2 px-3 py-2 rounded-xl bg-green-500/10 text-green-400 border border-green-500/20 text-[10px] font-black uppercase tracking-widest disabled:opacity-40 hover:bg-green-500/20 transition-all"
  >
    <Calendar size={12} />
    {loadingLink ? 'Generating…' : activeJob?.tenantScheduled ? 'Tenant Scheduled ✓' : 'Send Scheduling Link'}
  </button>
  {schedulingLink && (
    <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl px-3 py-2">
      <span className="text-[9px] text-white/40 flex-1 truncate font-mono">{schedulingLink}</span>
      <span className="text-[9px] font-black text-green-400">{linkCopied ? 'COPIED!' : 'Link ready'}</span>
    </div>
  )}
</div>
```

---

## WHAT NOT TO TOUCH

- `Code.js` — auto-reply integration comes in a future sprint when `AUTO_REPLY_ENABLED` flips on
- `TechPWA.gs` — no changes needed
- Any existing DashboardAPI.gs functions — only ADD new ones
- The sheet itself — Claude Code adds the two column headers manually

---

## VERIFICATION STEPS

1. Open any job in `JobDetailModal`. Click "Send Scheduling Link" → a URL is generated and copied to clipboard. The URL format is `https://central-command-pi.vercel.app/schedule/[uuid]`.
2. Paste the URL in a browser (incognito, no login). The tenant scheduling page loads with the correct address, unit, and service type.
3. Available days show Mon-Fri only, starting tomorrow, with Morning/Afternoon slots.
4. Select a date → time slots appear. Select a slot → presence question + contact fields appear.
5. Click "Confirm Appointment" — confirmation screen appears with the success message.
6. Go back to dispatch queue — job now shows "TENANT SCHED" green badge.
7. Open the job modal → Notes section includes `[TENANT SCHEDULED: ...]` with the date, slot, presence, and knock-first instruction.
8. DQ col 14 (PTE) = "Yes". DQ col 20 (Status) = "Ready to Schedule". DQ col 30 (TENANT_SCHED) = "Yes".
9. Try clicking the same scheduling link again → page shows "This scheduling link has already been used."
10. If no active techs or all days are fully booked, the page shows no slots and a message to call APT directly.
11. `tsc --noEmit` — zero errors. No `any` types on the new page or modal additions.
12. Mobile (375px): page renders cleanly. "Confirm Appointment" button is full-width and easily tappable.
13. `NEXT_PUBLIC_DASHBOARD_API_URL` is used for all API calls — no hardcoded URLs.
