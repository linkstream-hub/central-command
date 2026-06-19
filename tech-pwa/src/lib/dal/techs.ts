// NEON-02 cutover: Sheets fallback removed (Phase 12). All reads from Neon only.

import { db } from '../db';
import { employees as employeesTable } from '../schema';
import { eq } from 'drizzle-orm';

/**
 * Techs Repository
 * Neon-only reads. Sheets fallback severed per Phase 12 NEON-02.
 */
export const techsRepository = {
  /**
   * Fetches the tech roster.
   * Reads exclusively from Neon Postgres.
   */
  async getTechList() {
    const isSandbox = process.env.NEXT_PUBLIC_SANDBOX_MODE === 'true';
    const neonTechs = isSandbox ? [] : await db.select().from(employeesTable).where(eq(employeesTable.role, 'tech'));

    return {
      success: true,
      source: 'neon' as const,
      techs: neonTechs.map(t => ({
        name:   t.name   ?? '',
        badge:  t.badge  ?? 'T',
        skills: {
          carpentry:      t.skillCarpentry      ?? 0,
          plumbing:       t.skillPlumbing        ?? 0,
          electrical:     t.skillElectrical      ?? 0,
          finishCarpentry: t.skillFinishCarp     ?? 0,
          structural:     t.skillStructural      ?? 0,
          landscaping:    t.skillLandscaping     ?? 0,
          janitorial:     t.skillJanitorial      ?? 0,
        },
        active: t.isActive !== false,
      }))
    };
  },

  /**
   * Fetches live field status.
   * Reads exclusively from Neon Postgres.
   */
  async getLiveFieldStatus() {
    const isSandbox = process.env.NEXT_PUBLIC_SANDBOX_MODE === 'true';
    const neonTechs = isSandbox ? [] : await db.select().from(employeesTable).where(eq(employeesTable.role, 'tech'));

    return {
      success: true,
      source: 'neon' as const,
      techs: neonTechs.map(t => ({
        ...t,
        techName:     t.name   ?? '',
        status:       (t.isActive !== false) ? 'active' : 'inactive',
        // minutesWorked: derived from time_records in a future sprint; 0 placeholder
        minutesWorked: 0,
      }))
    };
  }
};
