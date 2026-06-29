# ANTIGRAVITY_I18N_SPEC
**Date:** 2026-05-01
**Sprint:** Spanish i18n for Tech PWA — field staff language support

---

## What This Changes

Add English/Spanish language support to all field-staff-facing Tech PWA pages. Language is toggled by the tech and persisted in localStorage. Office/dispatch pages are untouched.

**Scope:**
- `src/app/page.tsx` (root/loading)
- `src/app/jobs/page.tsx`
- `src/app/job/[jobId]/page.tsx`
- `src/app/calendar/page.tsx`
- `src/app/time-off/page.tsx`
- `src/components/CameraUpload.tsx`

**Approach:** Custom locale context. No next-intl, no route restructuring, no URL changes. Language stored in `localStorage` key `aptLocale`.

---

## Files You Must Change

| # | File | What |
|---|------|------|
| 1 | `src/lib/i18n/en.ts` | **NEW** — English message object |
| 2 | `src/lib/i18n/es.ts` | **NEW** — Spanish message object |
| 3 | `src/lib/i18n/index.ts` | **NEW** — LocaleContext, LocaleProvider, useTranslation hook |
| 4 | `src/app/layout.tsx` | Wrap children in LocaleProvider |
| 5 | `src/app/page.tsx` | Use `t()` for loading text |
| 6 | `src/app/jobs/page.tsx` | Add language toggle + use `t()` for all strings |
| 7 | `src/app/job/[jobId]/page.tsx` | Use `t()` for all strings |
| 8 | `src/app/calendar/page.tsx` | Use `t()` for all strings |
| 9 | `src/app/time-off/page.tsx` | Use `t()` for all strings |
| 10 | `src/components/CameraUpload.tsx` | Use `t()` for all strings |

## Files You Must NOT Change

- Any `.gs` files
- `src/lib/dashboard-api.ts`
- `src/lib/types.ts`
- Any file under `src/app/live/`, `src/app/schedule/`, `src/app/weekly-schedule/`, `src/app/hr/`, `src/app/calendar/` dispatch views, or any other office/admin route
- `src/components/dashboard/` — any file in this directory

---

## Step 1 — i18n Infrastructure

### 1A. New file: `src/lib/i18n/en.ts`

```ts
export const en = {
  // App
  loading: "Establishing Secure Link...",

  // Greetings
  good_morning: "Good morning",
  good_afternoon: "Good afternoon",
  good_evening: "Good evening",

  // Jobs page
  jobs_today_one: "Job Today",
  jobs_today_other: "Jobs Today",
  no_jobs_today: "No jobs assigned today",
  no_jobs_contact: "Pull to refresh or contact dispatch if you expected work.",
  offline: "Offline",
  events_pending_sync: "events pending sync",

  // Priority labels
  priority_urgent: "URGENT",
  priority_turnover: "TURNOVER",
  priority_pte: "PTE",
  priority_standard: "STANDARD",

  // Job detail — status
  shift_active: "Shift Active",
  rest_period: "Rest Period",
  session_ended: "Session Ended",
  service_pending: "Service Pending",
  clock_in_label: "In:",
  break_label: "Break:",

  // Compliance warnings
  rest_break_reminder: "Reminder: You're due for a 10-minute rest break.",
  meal_break_required: "Meal break required: CA law requires a 30-min unpaid meal break for shifts over 5 hours.",
  second_meal_break: "Second meal break required for shifts over 10 hours.",

  // Location
  locking_position: "Locking Position...",
  location_unavailable: "Location Detached (GPS Unavailable)",

  // Toasts
  toast_clocked_in: "Clocked In",
  toast_break_started: "Break Started",
  toast_break_ended: "Break Ended",
  toast_clocked_out: "Clocked Out",

  // Job detail — sections
  section_contact: "Point of Contact",
  section_scope: "Scope of Work",
  section_docs: "Documentation",

  // Job detail — tenant
  tenant_not_listed: "Tenant Not Listed",
  no_access_info: "No access info provided by dispatch.",

  // Action buttons
  btn_clock_in: "Initialize Clock In",
  btn_clock_in_loading: "Initializing...",
  btn_rest: "Rest Period",
  btn_end_shift: "End Shift",
  btn_mark_complete: "Mark as Complete",
  btn_resume: "Resume Work",
  btn_verified_complete: "Verified Complete",

  // Flag issue
  flag_title: "Flag an Issue",
  flag_subtitle: "Notify Robert immediately",
  flag_placeholder: "Locked out, tenant denial, part needed...",
  btn_flag_submit: "Submit Flag",
  btn_flag_loading: "Sending Alert...",

  // Job completion
  job_complete: "Job Complete",
  excellent_work: "Excellent work.",

  // Attestation
  attestation_title: "Confirm Your Time",
  attestation_subtitle: "Legal Attestation Required",
  attestation_text: "I confirm that my clock-in, breaks, and clock-out for today are accurate and complete.",
  btn_attestation_confirm: "I Confirm",
  btn_attestation_loading: "Saving attestation...",
  attestation_footer: "Required by APT Maintenance policy",

  // Camera upload
  camera_before: "Before Documentation",
  camera_after: "After Documentation",
  camera_receipt: "Receipt Documentation",
  camera_ready: "Ready to Transmit",
  btn_camera_upload: "Push to Dispatch",
  camera_uploading: "Transmitting...",
  camera_success: "Authenticated & Saved",
  camera_error: "Upload Failed — Check Connection",
  btn_camera_retry: "Recalibrate & Retry",

  // Calendar
  calendar_title: "Calendar",
  calendar_subtitle: "Team time-off and availability",
  btn_today: "Today",
  day_mon: "Mon",
  day_tue: "Tue",
  day_wed: "Wed",
  day_thu: "Thu",
  day_fri: "Fri",
  day_sat: "Sat",
  day_sun: "Sun",
  no_timeoff_today: "No approved time off this day.",
  leave_sick: "Sick",
  leave_vacation: "Vacation",

  // Time off
  timeoff_title: "Time Off",
  timeoff_subtitle: "Request & Balance",
  balance_sick: "Sick Leave",
  balance_vacation: "Vacation",
  accrued: "accrued",
  used: "used",
  sick_auto_approve: "Sick leave requests are auto-approved per California law. No manager approval required.",
  form_new_request: "New Request",
  leave_personal: "Personal",
  label_start_date: "Start Date",
  label_end_date: "End Date",
  label_notes: "Notes (Optional)",
  notes_placeholder: "Any context for Ana or Keith...",
  btn_submit_request: "Submit Request",
  btn_submitting: "Submitting...",
  request_submitted: "Request Submitted",
  request_submitted_note: "Ana will review and respond.",
  error_submission: "Submission failed — try again",
  past_requests: "Past Requests",
  status_pending: "Pending",
  status_approved: "Approved",
  status_denied: "Denied",
} as const;

export type Messages = typeof en;
```

---

### 1B. New file: `src/lib/i18n/es.ts`

```ts
import type { Messages } from "./en";

export const es: Messages = {
  loading: "Estableciendo Conexión Segura...",

  good_morning: "Buenos días",
  good_afternoon: "Buenas tardes",
  good_evening: "Buenas noches",

  jobs_today_one: "Trabajo Hoy",
  jobs_today_other: "Trabajos Hoy",
  no_jobs_today: "No hay trabajos asignados hoy",
  no_jobs_contact: "Actualiza o contacta a Despacho si esperabas trabajo.",
  offline: "Sin conexión",
  events_pending_sync: "eventos pendientes de sincronización",

  priority_urgent: "URGENTE",
  priority_turnover: "ROTACIÓN",
  priority_pte: "PTE",
  priority_standard: "ESTÁNDAR",

  shift_active: "Turno Activo",
  rest_period: "Período de Descanso",
  session_ended: "Sesión Terminada",
  service_pending: "Servicio Pendiente",
  clock_in_label: "Entrada:",
  break_label: "Descanso:",

  rest_break_reminder: "Recordatorio: Es hora de tu descanso de 10 minutos.",
  meal_break_required: "Descanso requerido: La ley de CA requiere 30 min sin pago para turnos de más de 5 horas.",
  second_meal_break: "Se requiere un segundo descanso para turnos de más de 10 horas.",

  locking_position: "Obteniendo Ubicación...",
  location_unavailable: "Ubicación No Disponible (GPS Inactivo)",

  toast_clocked_in: "Entrada Registrada",
  toast_break_started: "Descanso Iniciado",
  toast_break_ended: "Descanso Terminado",
  toast_clocked_out: "Salida Registrada",

  section_contact: "Punto de Contacto",
  section_scope: "Alcance del Trabajo",
  section_docs: "Documentación",

  tenant_not_listed: "Inquilino No Registrado",
  no_access_info: "Sin información de acceso del despachador.",

  btn_clock_in: "Registrar Entrada",
  btn_clock_in_loading: "Registrando...",
  btn_rest: "Período de Descanso",
  btn_end_shift: "Terminar Turno",
  btn_mark_complete: "Marcar como Completado",
  btn_resume: "Reanudar Trabajo",
  btn_verified_complete: "Verificado Completo",

  flag_title: "Reportar un Problema",
  flag_subtitle: "Notificar a Robert inmediatamente",
  flag_placeholder: "Puerta cerrada, inquilino no permite acceso, pieza necesaria...",
  btn_flag_submit: "Enviar Reporte",
  btn_flag_loading: "Enviando Alerta...",

  job_complete: "Trabajo Completado",
  excellent_work: "Excelente trabajo.",

  attestation_title: "Confirmar Tu Tiempo",
  attestation_subtitle: "Certificación Legal Requerida",
  attestation_text: "Confirmo que mi registro de entrada, descansos y salida de hoy son correctos y completos.",
  btn_attestation_confirm: "Confirmo",
  btn_attestation_loading: "Guardando certificación...",
  attestation_footer: "Requerido por la política de APT Maintenance",

  camera_before: "Documentación Previa",
  camera_after: "Documentación Posterior",
  camera_receipt: "Documentación de Recibo",
  camera_ready: "Listo para Transmitir",
  btn_camera_upload: "Enviar a Despacho",
  camera_uploading: "Transmitiendo...",
  camera_success: "Autenticado y Guardado",
  camera_error: "Error de Carga — Verifica Conexión",
  btn_camera_retry: "Reintentar",

  calendar_title: "Calendario",
  calendar_subtitle: "Tiempo libre y disponibilidad del equipo",
  btn_today: "Hoy",
  day_mon: "Lun",
  day_tue: "Mar",
  day_wed: "Mié",
  day_thu: "Jue",
  day_fri: "Vie",
  day_sat: "Sáb",
  day_sun: "Dom",
  no_timeoff_today: "No hay tiempo libre aprobado este día.",
  leave_sick: "Enfermedad",
  leave_vacation: "Vacaciones",

  timeoff_title: "Tiempo Libre",
  timeoff_subtitle: "Solicitud y Saldo",
  balance_sick: "Licencia por Enfermedad",
  balance_vacation: "Vacaciones",
  accrued: "acumulado",
  used: "usado",
  sick_auto_approve: "Las solicitudes de licencia por enfermedad se aprueban automáticamente según la ley de California. No se requiere aprobación del gerente.",
  form_new_request: "Nueva Solicitud",
  leave_personal: "Personal",
  label_start_date: "Fecha de Inicio",
  label_end_date: "Fecha de Fin",
  label_notes: "Notas (Opcional)",
  notes_placeholder: "Cualquier información para Ana o Keith...",
  btn_submit_request: "Enviar Solicitud",
  btn_submitting: "Enviando...",
  request_submitted: "Solicitud Enviada",
  request_submitted_note: "Ana revisará y responderá.",
  error_submission: "Error al enviar — intenta de nuevo",
  past_requests: "Solicitudes Anteriores",
  status_pending: "Pendiente",
  status_approved: "Aprobado",
  status_denied: "Denegado",
};
```

---

### 1C. New file: `src/lib/i18n/index.ts`

```ts
"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { en, type Messages } from "./en";
import { es } from "./es";

type Locale = 'en' | 'es';

const messages: Record<Locale, Messages> = { en, es };

interface LocaleContextType {
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: (key: keyof Messages) => string;
}

const LocaleContext = createContext<LocaleContextType>({
  locale: 'en',
  setLocale: () => {},
  t: (key) => en[key],
});

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('en');

  useEffect(() => {
    const saved = localStorage.getItem('aptLocale') as Locale | null;
    if (saved === 'en' || saved === 'es') setLocaleState(saved);
  }, []);

  function setLocale(l: Locale) {
    setLocaleState(l);
    localStorage.setItem('aptLocale', l);
  }

  const t = (key: keyof Messages): string => messages[locale][key];

  return (
    <LocaleContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useTranslation() {
  return useContext(LocaleContext);
}
```

---

## Step 2 — Wrap Root Layout

### 2A. Changes to `src/app/layout.tsx`

Add `LocaleProvider` import and wrap `{children}`:

```tsx
import { LocaleProvider } from "@/lib/i18n";
```

Find the JSX that returns `{children}` (inside the `<body>` tag or outermost layout div). Wrap it:

```tsx
<LocaleProvider>
  {children}
</LocaleProvider>
```

Keep all existing wrappers (SessionProvider, etc.) — add `LocaleProvider` as the outermost wrapper inside `<body>`.

---

## Step 3 — Language Toggle Component

### 3A. Changes to `src/app/jobs/page.tsx`

Add the language toggle to the page header. This is the home screen for techs — the right place to surface the toggle.

Add import:
```tsx
import { useTranslation } from "@/lib/i18n";
```

Destructure at the top of the component function:
```tsx
const { locale, setLocale, t } = useTranslation();
```

In the page header area (wherever the logout button / tech name appears), add the toggle button alongside existing controls:
```tsx
<button
  onClick={() => setLocale(locale === 'en' ? 'es' : 'en')}
  className="px-2 py-1 text-[9px] font-black uppercase tracking-widest border border-[var(--border-subtle)] rounded-lg text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:border-[var(--accent)]/50 transition-all"
  title={locale === 'en' ? 'Switch to Spanish' : 'Cambiar a inglés'}
>
  {locale === 'en' ? 'ES' : 'EN'}
</button>
```

---

## Step 4 — Replace Strings in Each Page

For every file in scope, add the import and destructure `t`:

```tsx
import { useTranslation } from "@/lib/i18n";
// ...
const { t } = useTranslation();
```

Then replace every hard-coded user-visible string with its `t('key')` equivalent. The full key map is in `en.ts` above — every string in that file has a corresponding key.

### Do NOT translate:
- Job IDs (`APT-MOCK-...`, `APT-...`)
- Property addresses and unit numbers
- Tech names, tenant names, RM names
- Phone numbers and email addresses
- Dates and times (keep `toLocaleDateString`, `toLocaleTimeString` as-is)
- `console.log` / `console.error` messages
- CSS class strings
- API action names

### Pluralization — jobs count

The jobs count string `"{n} Job Today"` / `"{n} Jobs Today"` is a conditional, not a key lookup. Replace with:

```tsx
// Current (example):
`${jobs.length} ${jobs.length === 1 ? 'Job' : 'Jobs'} Today`

// Replace with:
`${jobs.length} ${jobs.length === 1 ? t('jobs_today_one') : t('jobs_today_other')}`
```

### Priority label mapping

Priority values come from the API as `'1-URGENT'`, `'2-TURNOVER'`, `'3-PTE-PENDING'`, `'4-STANDARD'`. Map them to translated labels:

```tsx
function getPriorityLabel(priority: string, t: (k: keyof Messages) => string): string {
  if (priority.includes('URGENT')) return t('priority_urgent');
  if (priority.includes('TURNOVER')) return t('priority_turnover');
  if (priority.includes('PTE')) return t('priority_pte');
  return t('priority_standard');
}
```

Import `Messages` type from `@/lib/i18n/en` for this function signature.

### Day-of-week labels (calendar page)

The calendar renders day column headers. Map the JavaScript `Date.getDay()` or day name strings to translation keys:

```tsx
const DAY_KEYS = ['day_sun', 'day_mon', 'day_tue', 'day_wed', 'day_thu', 'day_fri', 'day_sat'] as const;
// Use: t(DAY_KEYS[date.getDay()])
```

---

## Step 5 — CameraUpload Component

`src/components/CameraUpload.tsx` receives a `photoType` prop (`'before' | 'after' | 'receipt'`). Currently uses it to render e.g. `"Before Documentation"`.

Add import and hook:
```tsx
import { useTranslation } from "@/lib/i18n";
// ...
const { t } = useTranslation();
```

Map `photoType` to the correct translation key:
```tsx
const photoTypeKey = {
  before: 'camera_before',
  after: 'camera_after',
  receipt: 'camera_receipt',
} as const satisfies Record<string, keyof Messages>;
```

Replace the title render with `t(photoTypeKey[photoType])`. Replace all other camera strings with their keys per the map in `en.ts`.

Import `Messages` type from `@/lib/i18n/en` for the `satisfies` check.

---

## What to Keep Unchanged

- All routing logic
- All API calls and data fetching
- All Framer Motion animations
- All Tailwind classes
- Session/auth logic
- Any string that is not user-visible (aria-labels that are internal, console messages, API payloads)

---

## Verification Steps

### TypeScript
1. Run `npx tsc --noEmit` in `tech-pwa/` — zero errors

### Language Toggle
2. Navigate to `/jobs` — confirm EN/ES toggle button is visible in the header
3. App loads in English by default — all visible strings are English
4. Click the toggle — button label changes from "ES" to "EN", all visible strings switch to Spanish immediately (no page reload)
5. Click again — switches back to English
6. Refresh the page after switching to Spanish — Spanish persists (localStorage working)
7. Navigate to `/job/[jobId]` while in Spanish — all strings are in Spanish
8. Navigate to `/time-off` while in Spanish — all form labels, buttons, status badges are in Spanish
9. Navigate to `/calendar` while in Spanish — day headers show Lun/Mar/Mié/Jue/Vie/Sáb/Dom
10. Navigate to `/live` (dispatch page) — confirm NO language toggle appears, all text remains in English (dispatch pages untouched)

### String Coverage
11. On `/jobs` in Spanish: confirm greeting ("Buenos días" / "Buenas tardes" / "Buenas noches" based on time of day)
12. On `/jobs` in Spanish: confirm job count shows "1 Trabajo Hoy" / "2 Trabajos Hoy"
13. On `/jobs` in Spanish: confirm "URGENTE" priority label on a priority-1 job
14. On `/job/[jobId]` in Spanish: confirm clock-in button shows "Registrar Entrada"
15. On `/job/[jobId]` in Spanish: clock in — confirm toast shows "Entrada Registrada"
16. On `/job/[jobId]` in Spanish: confirm attestation modal shows "Confirmar Tu Tiempo" and "Confirmo" button
17. On `/time-off` in Spanish: confirm "Licencia por Enfermedad" balance card and "Enviar Solicitud" button
18. On `/time-off` in Spanish: submit a request — confirm success state shows "Solicitud Enviada"
19. On `/job/[jobId]` in Spanish: open camera upload — confirm "Documentación Previa" / "Enviar a Despacho"
20. No `console.error` in DevTools during language switch or page navigation in either language

### Quality Gate
21. `tsc --noEmit` — zero errors
22. No hardcoded English strings remaining in the 6 in-scope files (spot-check: search for `"Good morning"`, `"Clock In"`, `"Submit Request"` — none should appear as literals)

---

## Do NOT submit as complete until:
- `tsc --noEmit` passes with zero errors
- All 22 verification steps confirmed
- `git diff --name-only` shows only the 10 files listed in the Files table above (plus the 3 new i18n files)
- No changes to any dispatch/office pages or dashboard components
