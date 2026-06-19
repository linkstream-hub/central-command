/**
 * Shift session state — stored in localStorage.
 * One record per shift. Independent of per-job state.
 */

const SHIFT_KEY = 'apt_shift_session';

export interface ShiftSession {
  shiftId: string;
  clockInTime: string;          // ISO string
  breakDurationMinutes: number;
  status: 'active' | 'on-break';
}

// Module-level cache to ensure stable object references for useSyncExternalStore
let cachedSession: ShiftSession | null = null;
let lastRaw: string | null = null;

export function getShiftSession(): ShiftSession | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(SHIFT_KEY);
    if (raw === lastRaw) return cachedSession;
    
    lastRaw = raw;
    cachedSession = raw ? JSON.parse(raw) : null;
    return cachedSession;
  } catch {
    return null;
  }
}

export function setShiftSession(session: ShiftSession): void {
  if (typeof window === 'undefined') return;
  const raw = JSON.stringify(session);
  localStorage.setItem(SHIFT_KEY, raw);
  lastRaw = raw;
  cachedSession = session;
  window.dispatchEvent(new Event('apt-shift-change'));
}

export function clearShiftSession(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(SHIFT_KEY);
  lastRaw = null;
  cachedSession = null;
  window.dispatchEvent(new Event('apt-shift-change'));
}

export function updateShiftBreak(breakDurationMinutes: number): void {
  const session = getShiftSession();
  if (!session) return;
  setShiftSession({ ...session, breakDurationMinutes });
}
