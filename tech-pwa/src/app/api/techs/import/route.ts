import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { employees } from '@/lib/schema';
import { eq, and, sql } from 'drizzle-orm';
import { parse } from 'csv-parse/sync';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  const apiKey = req.headers.get('x-api-key') ?? req.headers.get('DASHBOARD_API_KEY');
  if (apiKey !== process.env.DASHBOARD_API_KEY) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const CSV_URL = `https://docs.google.com/spreadsheets/d/1eCSHpj5381R7Hhloe718r1n8fEfesY2tjYOuOLxTSd4/gviz/tq?tqx=out:csv&sheet=Tech%20Roster&t=${Date.now()}`;
    const res = await fetch(CSV_URL, { cache: 'no-store' });
    const text = await res.text();

    const records = parse(text, { columns: true, skip_empty_lines: true }) as Record<string, string>[];

    // Deactivate tech-role employees only — never touch staff
    await db.update(employees)
      .set({ isActive: false, badge: null })
      .where(eq(employees.role, 'tech'));

    let count = 0;

    for (const row of records) {
      const name = (row['Name'] || '').trim();
      if (!name) continue;

      const badge      = row['Badge #']?.trim()    || null;
      const phone      = row['Phone']?.trim()       || null;
      const rank       = row['Rank']?.trim()        || null;
      const pinHash    = row['PIN Hash']?.trim()    || null;
      const activeStr  = (row['Active'] || '').toUpperCase();
      const isActive   = activeStr === 'TRUE' || activeStr === '1' || activeStr === 'YES';

      const data = {
        name,
        phone,
        rank,
        role: 'tech' as const,
        isActive,
        ...(pinHash ? { pinHash } : {}),
        skillCarpentry:   parseFloat(row['Carpentry']    || '0') || 0,
        skillPlumbing:    parseFloat(row['Plumbing']     || '0') || 0,
        skillElectrical:  parseFloat(row['Electrical']   || '0') || 0,
        skillFinishCarp:  parseFloat(row['Finish Carp']  || '0') || 0,
        skillStructural:  parseFloat(row['Structural']   || '0') || 0,
        skillLandscaping: parseFloat(row['Landscaping']  || '0') || 0,
        skillJanitorial:  parseFloat(row['Janitorial']   || '0') || 0,
      };

      if (badge) {
        // Badge-keyed upsert — uses unique index on (orgId, badge)
        await db.insert(employees)
          .values({ orgId: 'APT-CA', badge, ...data })
          .onConflictDoUpdate({
            target: [employees.orgId, employees.badge],
            targetWhere: sql`badge IS NOT NULL`,
            set: data,
          });
      } else {
        // No badge — match by name + role
        const existing = await db.select({ id: employees.id })
          .from(employees)
          .where(and(eq(employees.name, name), eq(employees.role, 'tech')));

        if (existing.length > 0) {
          await db.update(employees).set(data).where(eq(employees.id, existing[0].id));
        } else {
          await db.insert(employees).values({ orgId: 'APT-CA', ...data });
        }
      }

      count++;
    }

    return NextResponse.json({ success: true, count });
  } catch (error) {
return NextResponse.json({ success: false, error: (error as Error).message }, { status: 500 });
  }
}
