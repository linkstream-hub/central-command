import { NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';
import { db } from '@/lib/db';
import { employees, timeRecords } from '@/lib/schema';
import { eq, gte, and } from 'drizzle-orm';

export async function GET(req: Request) {
  const apiKey = req.headers.get('x-api-key');
  if (apiKey !== process.env.DASHBOARD_API_KEY) {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
  }
  try {
    const now = new Date();
    const todayLA = new Intl.DateTimeFormat('en-CA', {
      timeZone: 'America/Los_Angeles',
      year: 'numeric', month: '2-digit', day: '2-digit'
    }).format(now);

    // Today midnight Pacific time as UTC timestamp
    const todayStart = new Date(todayLA + 'T00:00:00-07:00');

    const [techRows, recordRows] = await Promise.all([
      db.select().from(employees).where(and(eq(employees.isActive, true), eq(employees.role, 'tech'))),
      db.select().from(timeRecords).where(gte(timeRecords.clockIn, todayStart)),
    ]);

    // Build active tech map (badge → { techId, techName })
    const activeTechMap: Record<string, { techId: string; techName: string }> = {};
    techRows.forEach(t => {
      if (t.badge) activeTechMap[t.badge] = { techId: t.badge, techName: t.name };
    });

    // Priority: active > on-break > complete
    const STATUS_PRIORITY: Record<string, number> = { active: 3, 'on-break': 2, complete: 1 };
    const techRecords: Record<string, {
      techId: string; techName: string; status: string;
      minutesWorked: number; jobAddress?: string; clockInTime: string; _clockIn: Date;
    }> = {};

    recordRows.forEach(rec => {
      if (!rec.clockIn) return;
      const techId = rec.techId;
      let status: string;
      let minutesWorked: number;

      if (rec.clockOut) {
        const msSinceOut = now.getTime() - rec.clockOut.getTime();
        if (msSinceOut > 4 * 60 * 60 * 1000) return; // > 4h ago — omit
        status = 'complete';
        minutesWorked = Math.floor((rec.clockOut.getTime() - rec.clockIn.getTime()) / 60000);
      } else if (rec.breakStart && !rec.breakEnd) {
        status = 'on-break';
        minutesWorked = Math.floor((now.getTime() - rec.clockIn.getTime()) / 60000);
      } else {
        status = 'active';
        minutesWorked = Math.floor((now.getTime() - rec.clockIn.getTime()) / 60000);
      }

      const jobAddress = rec.unit ? `${rec.address} #${rec.unit}` : rec.address || undefined;
      const existing = techRecords[techId];
      const newPri = STATUS_PRIORITY[status] || 0;
      const oldPri = existing ? (STATUS_PRIORITY[existing.status] || 0) : -1;

      if (!existing || newPri > oldPri || (newPri === oldPri && rec.clockIn > existing._clockIn)) {
        techRecords[techId] = {
          techId,
          techName: rec.techName || activeTechMap[techId]?.techName || '',
          status,
          minutesWorked,
          jobAddress,
          clockInTime: rec.clockIn.toISOString(),
          _clockIn: rec.clockIn,
        };
      }
    });

    // Build output
    const result: Array<{
      techId: string; techName: string; status: string;
      minutesWorked: number; jobAddress?: string; clockInTime?: string;
     
    }> = Object.values(techRecords).map(({ _clockIn: _unused, ...r }) => r);

    // Append unassigned active techs
    Object.values(activeTechMap).forEach(({ techId, techName }) => {
      if (!techRecords[techId]) {
        result.push({ techId, techName, status: 'unassigned', minutesWorked: 0 });
      }
    });

    return NextResponse.json({ success: true, source: 'neon', techs: result });
  } catch (error) {
    console.error('[GET /api/field/live] Error:', error);
    return NextResponse.json({ success: false, message: 'Internal Server Error' }, { status: 500 });
  }
}
