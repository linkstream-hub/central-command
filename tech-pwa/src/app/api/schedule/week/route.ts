import { NextRequest, NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';
import { auth } from '@/auth';
import { db } from '@/lib/db';
import { jobs, employees } from '@/lib/schema';
import { and, eq, inArray, ne } from 'drizzle-orm';
import { mapNeonJobToJob } from '@/lib/job-mapper';
import type { Job } from '@/lib/types';

function buildWeekDates(weekStart?: string): string[] {
  const dates: string[] = [];
  const cursor = new Date((weekStart || new Date().toISOString().slice(0, 10)) + 'T12:00:00');
  while (dates.length < 5) {
    const dow = cursor.getDay();
    if (dow !== 0 && dow !== 6) {
      dates.push(new Intl.DateTimeFormat('en-CA', {
        timeZone: 'America/Los_Angeles',
        year: 'numeric', month: '2-digit', day: '2-digit'
      }).format(cursor));
    }
    cursor.setDate(cursor.getDate() + 1);
  }
  return dates;
}

export async function GET(req: NextRequest) {
  const session = await auth();
  const apiKey = req.headers.get('x-api-key');
  const isApiKeyAuth = !session && apiKey === process.env.DASHBOARD_API_KEY;
  if (!session && !isApiKeyAuth) {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
  }
  try {
    const weekStart = req.nextUrl.searchParams.get('weekStart') ?? undefined;
    const weekDates = buildWeekDates(weekStart);

    const [jobRows, techRows] = await Promise.all([
      db.select().from(jobs).where(
        and(
          inArray(jobs.scheduledDate, weekDates),
          ne(jobs.status, 'Archived')
        )
      ),
      db.select().from(employees).where(and(eq(employees.isActive, true), eq(employees.role, 'tech'))),
    ]);

    const byTech: Record<string, Record<string, Job[]>> = {};
    const unassigned: Job[] = [];

    // Seed byTech with all active techs
    techRows.forEach(t => { byTech[t.name] = {}; });

    jobRows.forEach(row => {
      const job = mapNeonJobToJob(row);
      if (!row.scheduledDate) return;
      if (!row.tech) { unassigned.push(job); return; }
      const names = row.tech.includes(',')
        ? row.tech.split(',').map(n => n.trim()).filter(Boolean)
        : [row.tech];
      names.forEach(name => {
        if (!byTech[name]) byTech[name] = {};
        if (!byTech[name][row.scheduledDate!]) byTech[name][row.scheduledDate!] = [];
        byTech[name][row.scheduledDate!].push(job);
      });
    });

    const techList = techRows.map(t => ({
      techId:   t.badge || String(t.id),
      techName: t.name,
      jobsRemaining: 0,
      badge:    t.badge || '',
      rank:     t.rank || '',
      skills: {
        Carpentry:         t.skillCarpentry || 0,
        Plumbing:          t.skillPlumbing || 0,
        Electrical:        t.skillElectrical || 0,
        'Finish Carpentry': t.skillFinishCarp || 0,
        Structural:        t.skillStructural || 0,
        Landscaping:       t.skillLandscaping || 0,
        Janitorial:        t.skillJanitorial || 0,
      },
    }));

    return NextResponse.json({
      success: true,
      source: 'neon',
      week: { start: weekDates[0], end: weekDates[weekDates.length - 1] },
      byTech,
      unassigned,
      techs: techList,
    });
  } catch (error) {
    console.error('[GET /api/schedule/week] Error:', error);
    return NextResponse.json({ success: false, message: 'Internal Server Error' }, { status: 500 });
  }
}
