import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { db } from '../../../../lib/db';
import { employees } from '../../../../lib/schema';
import { eq } from 'drizzle-orm';
import { GET } from '../route';

const TEST_BADGE = 'P24-ACTIVE';
const TEST_BADGE_OFF = 'P24-INACTIVE';

describe('GET /api/techs — roster shape', () => {
  beforeAll(async () => {
    // Ensure clean state regardless of prior test runs
    await db.delete(employees).where(eq(employees.badge, TEST_BADGE));
    await db.delete(employees).where(eq(employees.badge, TEST_BADGE_OFF));

    await db.insert(employees).values({
      orgId: 'APT-CA',
      name: 'Test Tech Phase24',
      badge: TEST_BADGE,
      phone: '510-000-9924',
      rank: 'L',
      role: 'tech',
      isActive: true,
      skillCarpentry: 2,
      skillPlumbing: 3,
      skillElectrical: 1,
      skillFinishCarp: 2,
      skillStructural: 0,
      skillLandscaping: 1,
      skillJanitorial: 0,
    });

    await db.insert(employees).values({
      orgId: 'APT-CA',
      name: 'Inactive Tech Phase24',
      badge: TEST_BADGE_OFF,
      role: 'tech',
      isActive: false,
    });
  });

  afterAll(async () => {
    await db.delete(employees).where(eq(employees.badge, TEST_BADGE));
    await db.delete(employees).where(eq(employees.badge, TEST_BADGE_OFF));
  });

  it('returns success: true with a techs array', async () => {
    const res = await GET();
    const json = await res.json();

    expect(res.status).toBe(200);
    expect(json.success).toBe(true);
    expect(Array.isArray(json.techs)).toBe(true);
    expect(json.techs.length).toBeGreaterThan(0);
  });

  it('each active tech has the required shape', async () => {
    const res = await GET();
    const { techs } = await res.json();

    const tech = techs.find((t: { badge: string }) => t.badge === TEST_BADGE);
    expect(tech).toBeDefined();
    expect(tech).toMatchObject({
      techId: TEST_BADGE,
      badge: TEST_BADGE,
      techName: 'Test Tech Phase24',
      name: 'Test Tech Phase24',
      role: 'tech',
      active: true,
      status: 'unassigned',
      skills: {
        Carpentry: 2,
        Plumbing: 3,
        Electrical: 1,
        'Finish Carpentry': 2,
        Structural: 0,
        Landscaping: 1,
        Janitorial: 0,
      },
    });
  });

  it('excludes inactive techs', async () => {
    const res = await GET();
    const { techs } = await res.json();

    const inactive = techs.find((t: { badge: string }) => t.badge === TEST_BADGE_OFF);
    expect(inactive).toBeUndefined();
  });
});
