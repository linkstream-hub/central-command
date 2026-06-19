import { NextRequest, NextResponse } from 'next/server';

function guardProduction() {
  if (process.env.NODE_ENV === 'production' && process.env.ALLOW_MOCK !== 'true') {
    return NextResponse.json({ error: 'Not available' }, { status: 404 });
  }
  return null;
}

const MOCK_SESSION_TOKEN = 'dev-mock-token-001';
const MOCK_TECH = {
  name: 'Demo Tech',
  badge: '9999',
  role: 'tech',
  employeeId: '9999',
  token: MOCK_SESSION_TOKEN,
  expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
};

const MOCK_JOBS = [
  {
    jobId: 'APT-3008',
    priority: '4-STANDARD',
    serviceCategory: 'Plumbing',
    address: '240 Lakeshore Ave',
    unit: '7',
    description: 'Bathroom vanity drain clogged — slow drain for weeks, now fully backed up.',
    scheduledDate: new Date().toISOString().slice(0, 10),
    scheduledTime: '09:00',
    estimatedHours: 2,
    status: 'Scheduled',
    rmName: 'Jan Blythe',
    accessInfo: 'Lockbox: 4491',
    tenantName: 'Paul Kim',
    tenantPhone: '510-555-0394',
    clockedInAt: null,
    activeRecordId: null,
  },
  {
    jobId: 'APT-3010',
    priority: '1-URGENT',
    serviceCategory: 'Electrical',
    address: '660 Grand Ave',
    unit: '14B',
    description: 'GFCI outlets in bathroom and kitchen tripping. Tenant reported small burn smell.',
    scheduledDate: new Date().toISOString().slice(0, 10),
    scheduledTime: '07:00',
    estimatedHours: 2,
    status: 'In Progress',
    rmName: 'Sarah Mills',
    accessInfo: 'Tenant home all day',
    tenantName: 'Marcus Brown',
    tenantPhone: '415-555-0551',
    clockedInAt: new Date(Date.now() - 90 * 60000).toISOString(),
    activeRecordId: 'TR-3010',
  },
];

function handleGet(action: string, params: URLSearchParams) {
  switch (action) {
    case 'getTechJobs':
      return { success: true, techName: MOCK_TECH.name, date: params.get('date') || new Date().toISOString().slice(0, 10), jobs: MOCK_JOBS };
    case 'getTechStatus':
      return { success: true, status: 'idle', activeRecord: null, job: null };
    case 'getShiftStatus':
      return { success: true, status: 'idle', message: 'No active shift (mock)' };
    case 'getTimeOffHistory':
      return { success: true, requests: [] };
    case 'getTimeOffBalance':
      return { success: true, sick: { accrued: 24, used: 8, available: 16 }, vacation: { accrued: 40, used: 0, available: 40 } };
    default:
      return { success: true, message: `Mock GET for ${action}` };
  }
}

function handlePost(action: string, body: Record<string, unknown>) {
  switch (action) {
    case 'login':
      if (body.employeeId === '1' && body.pin === '1234') {
        return { success: true, ...MOCK_TECH };
      }
      return { success: false, message: 'Invalid badge or PIN' };
    case 'changePIN':
      return { success: true, message: 'PIN changed (mock)' };
    case 'startShift':
      return { success: true, techName: MOCK_TECH.name, recordId: 'MOCK-SHIFT-001', startTime: new Date().toISOString(), message: 'Shift started (mock)' };
    case 'endShift':
      return { success: true, message: 'Shift ended (mock)' };
    case 'clockIn':
      return { success: true, recordId: 'MOCK-REC-001', clockInTime: new Date().toISOString(), message: 'Clocked in (mock)' };
    case 'clockOut':
      return { success: true, message: 'Clocked out (mock)', attestationRequired: true };
    case 'startBreak':
      return { success: true, breakStart: new Date().toISOString(), message: 'Break started (mock)' };
    case 'endBreak':
      return { success: true, breakEnd: new Date().toISOString(), breakDurationMinutes: 30, message: 'Break ended (mock)' };
    case 'markComplete':
      return { success: true, message: 'Job marked complete (mock)' };
    case 'uploadReceipt':
      return { success: true, fileUrl: 'https://mock/receipt.jpg', message: 'Receipt uploaded (mock)' };
    case 'flagIssue':
      return { success: true, message: 'Issue flagged (mock)' };
    case 'requestTimeOff':
      return { success: true, requestId: 'MOCK-TOR-001', message: 'Time off request submitted (mock)' };
    case 'cancelTimeOff':
      return { success: true, message: 'Time off request cancelled (mock)' };
    case 'signAttestation':
      return { success: true, message: 'Attestation signed (mock)' };
    default:
      return { success: true, message: `Mock POST for ${action}` };
  }
}

export async function GET(req: NextRequest) {
  const guard = guardProduction();
  if (guard) return guard;
  const params = req.nextUrl.searchParams;
  const action = params.get('action') || '';
  return NextResponse.json(handleGet(action, params));
}

export async function POST(req: NextRequest) {
  const guard = guardProduction();
  if (guard) return guard;
  try {
    const text = await req.text();
    const body = JSON.parse(text) as Record<string, unknown>;
    const action = String(body.action || '');
    return NextResponse.json(handlePost(action, body));
  } catch {
    return NextResponse.json({ success: false, error: 'Invalid request body' }, { status: 400 });
  }
}
