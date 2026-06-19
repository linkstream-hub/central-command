import { SyncEvent } from './types';
import { getSession } from './auth';

const FIELD_POST_ROUTES: Record<string, string> = {
  login:          '/api/field/auth/login',
  getJobs:        '/api/field/jobs',        // also used as GET — handled in apiGet
  startShift:     '/api/field/shift/start',
  endShift:       '/api/field/shift/end',
  shiftStatus:    '/api/field/shift/status',
  clockIn:        '/api/field/clock-in',
  clockOut:       '/api/field/clock-out',
  startBreak:     '/api/field/break/start',
  endBreak:       '/api/field/break/end',
  markComplete:   '/api/field/job/complete',
  signAttestation:'/api/field/attestation/sign',
};

const QUEUE_KEY = 'apt_sync_queue';

function getQueue(): SyncEvent[] {
  if (typeof window === 'undefined') return [];
  try {
    return JSON.parse(localStorage.getItem(QUEUE_KEY) || '[]');
  } catch {
    return [];
  }
}

function saveQueue(queue: SyncEvent[]) {
  localStorage.setItem(QUEUE_KEY, JSON.stringify(queue));
}

// Enqueue event
export function enqueueEvent(action: string, payload: Record<string, unknown>) {
  // STRICT RULE: No photo objects in localStorage.
  const p = payload as Record<string, unknown> & { photoBase64?: unknown };
  if (action === 'uploadReceipt' || p.photoBase64 !== undefined) {
      console.error("Attempted to queue a photo. Photos should bypass the queue and retry actively.");
      return;
  }
  
  const queue = getQueue();
  queue.push({
    id: crypto.randomUUID(),
    action,
    payload,
    timestamp: new Date().toISOString()
  });
  saveQueue(queue);
}

// Dequeue a specific event ID
export function dequeueEvent(id: string) {
  const queue = getQueue();
  saveQueue(queue.filter(e => e.id !== id));
}

// Process the queue
export async function flushQueue() {
  const queue = getQueue();
  if (queue.length === 0) return true;

  console.log(`Flushing ${queue.length} events from queue...`);
  const session = getSession();

  for (const event of queue) {
    const fieldUrl = FIELD_POST_ROUTES[event.action];
    if (!fieldUrl) {
      // Legacy GAS action — discard; no endpoint exists anymore
      console.warn(`flushQueue: discarding legacy action "${event.action}" (no field route)`);
      dequeueEvent(event.id);
      continue;
    }
    const token = session?.token ?? (event.payload as Record<string, unknown> & { token?: string }).token ?? '';
    try {
      const response = await fetch(fieldUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(event.payload),
      });
      const data = await response.json() as Record<string, unknown>;
      if (data['error'] === 'INVALID_TOKEN') {
        console.error('SyncQueue halted: INVALID_TOKEN');
        return false;
      }
      dequeueEvent(event.id);
    } catch {
      console.warn('SyncQueue halted: Network detached');
      return false;
    }
  }
  return true;
}

// API Fetcher that abstracts queue vs direct
export async function apiCall<T = { success: boolean }>(
  action: string,
  payload: Record<string, unknown> = {},
  allowQueue: boolean = true
): Promise<T> {
  const p = payload as Record<string, unknown> & { photoBase64?: unknown; token?: string };
  const isPhoto = action === 'uploadReceipt' || !!p.photoBase64;
  const isOnline = typeof navigator !== 'undefined' ? navigator.onLine : true;
  const session = getSession();

  if (session && !p.token) {
    p.token = session.token;
  }

  const fieldUrl = FIELD_POST_ROUTES[action];
  if (!fieldUrl) {
    throw new Error(`apiCall: action "${action}" not supported — all field actions must be registered in FIELD_POST_ROUTES`);
  }

  const token = session?.token ?? '';

  if (isOnline) {
    try {
      const response = await fetch(fieldUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });
      const data = await response.json() as T;
      if ((data as Record<string, unknown>)['success'] && !isPhoto) {
        setTimeout(flushQueue, 0);
      }
      return data;
    } catch (e) {
      if (allowQueue && !isPhoto) {
        enqueueEvent(action, payload);
        return { success: true, _queued: true } as unknown as T;
      }
      throw e;
    }
  } else {
    if (allowQueue && !isPhoto) {
      enqueueEvent(action, payload);
      return { success: true, _queued: true } as unknown as T;
    }
    throw new Error('Offline');
  }
}

export async function apiGet<T = { success: boolean }>(
  action: string,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _params: Record<string, string> = {}
): Promise<T> {
  const isOnline = typeof navigator !== 'undefined' ? navigator.onLine : true;
  if (!isOnline) throw new Error('Offline');

  const session = getSession();

  if (action === 'getJobs') {
    const token = session?.token ?? '';
    const response = await fetch('/api/field/jobs', {
      method: 'GET',
      headers: { 'Authorization': `Bearer ${token}` },
    });
    return (await response.json()) as T;
  }

  throw new Error(`apiGet: action "${action}" not supported — only "getJobs" has a field GET route`);
}

if (typeof window !== 'undefined') {
  window.addEventListener('online', flushQueue);
}
