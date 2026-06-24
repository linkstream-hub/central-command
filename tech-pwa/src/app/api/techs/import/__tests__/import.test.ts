import { describe, it, expect, beforeAll, afterAll, vi } from 'vitest';
import { NextRequest } from 'next/server';
import { db } from '../../../../../lib/db';
import { employees } from '../../../../../lib/schema';
import { eq } from 'drizzle-orm';

const TEST_BADGE = 'P24-IMP';
const STAFF_BADGE = 'P24-STAFF';
const TEST_API_KEY = 'test-dashboard-key';

const MOCK_CSV = [
  '"Name","Badge #","Rank","Carpentry","Plumbing","Electrical","Finish Carp","Structural","Landscaping","Janitorial","Phone","PIN Hash","Session Token","Token Expiry","Role","Active","Hourly Rate","PUSH_SUB",""',
  `"Import, Tech","${TEST_BADGE}","L","2","2.5","1","2","0","1","0","510-000-9925","abc123pinhashabc123pinhash","","","tech","TRUE","","",""`,
].join('\n');

// URL-selective fetch mock — passes Neon calls through, intercepts GAS only
const originalFetch = globalThis.fetch;
function mockFetch(url: string | URL | Request, opts?: RequestInit) {
  const urlStr = typeof url === 'string' ? url : url instanceof URL ? url.href : url.url;
  if (urlStr.includes('docs.google.com')) {
    return Promise.resolve({ text: () => Promise.resolve(MOCK_CSV) } as Response);
  }
  return originalFetch(url as string, opts);
}

describe('POST /api/techs/import', () => {
  beforeAll(async () => {
    process.env.DASHBOARD_API_KEY = TEST_API_KEY;

    await db.delete(employees).where(eq(employees.badge, TEST_BADGE));
    await db.insert(employees).values({
      orgId: 'APT-CA',
      name: 'Import, Tech',
      badge: TEST_BADGE,
      role: 'tech',
      isActive: true,
      pinHash: null,
      skillCarpentry: 0,
    });

    await db.delete(employees).where(eq(employees.badge, STAFF_BADGE));
    await db.insert(employees).values({
      orgId: 'APT-CA',
      name: 'Staff Member Phase24',
      badge: STAFF_BADGE,
      role: 'staff',
      isActive: true,
    });
  });

  afterAll(async () => {
    vi.unstubAllGlobals();
    await db.delete(employees).where(eq(employees.badge, TEST_BADGE));
    await db.delete(employees).where(eq(employees.badge, STAFF_BADGE));
  });

  it('returns 401 without DASHBOARD_API_KEY', async () => {
    const { POST } = await import('../route');
    const req = new NextRequest('http://localhost/api/techs/import', { method: 'POST' });
    const res = await POST(req);
    expect(res.status).toBe(401);
  });

  it('returns 200 with valid key and imports count', async () => {
    vi.stubGlobal('fetch', vi.fn().mockImplementation(mockFetch));
    const { POST } = await import('../route');
    const req = new NextRequest('http://localhost/api/techs/import', {
      method: 'POST',
      headers: { 'x-api-key': TEST_API_KEY },
    });
    const res = await POST(req);
    const json = await res.json();
    expect(res.status).toBe(200);
    expect(json.success).toBe(true);
    expect(json.count).toBeGreaterThanOrEqual(1);
    vi.unstubAllGlobals();
  });

  it('imports pin_hash from CSV into Neon', async () => {
    vi.stubGlobal('fetch', vi.fn().mockImplementation(mockFetch));
    const { POST } = await import('../route');
    const req = new NextRequest('http://localhost/api/techs/import', {
      method: 'POST',
      headers: { 'x-api-key': TEST_API_KEY },
    });
    await POST(req);
    const [tech] = await db.select().from(employees).where(eq(employees.badge, TEST_BADGE));
    expect(tech.pinHash).toBe('abc123pinhashabc123pinhash');
    vi.unstubAllGlobals();
  });

  it('imports all 7 skill columns', async () => {
    vi.stubGlobal('fetch', vi.fn().mockImplementation(mockFetch));
    const { POST } = await import('../route');
    const req = new NextRequest('http://localhost/api/techs/import', {
      method: 'POST',
      headers: { 'x-api-key': TEST_API_KEY },
    });
    await POST(req);
    const [tech] = await db.select().from(employees).where(eq(employees.badge, TEST_BADGE));
    expect(tech.skillCarpentry).toBe(2);
    expect(tech.skillPlumbing).toBe(2.5);
    expect(tech.skillElectrical).toBe(1);
    expect(tech.skillFinishCarp).toBe(2);
    expect(tech.skillStructural).toBe(0);
    expect(tech.skillLandscaping).toBe(1);
    expect(tech.skillJanitorial).toBe(0);
    vi.unstubAllGlobals();
  });

  it('does NOT deactivate staff employees', async () => {
    vi.stubGlobal('fetch', vi.fn().mockImplementation(mockFetch));
    const { POST } = await import('../route');
    const req = new NextRequest('http://localhost/api/techs/import', {
      method: 'POST',
      headers: { 'x-api-key': TEST_API_KEY },
    });
    await POST(req);
    const [staff] = await db.select().from(employees).where(eq(employees.badge, STAFF_BADGE));
    expect(staff.isActive).toBe(true);
    vi.unstubAllGlobals();
  });
});
