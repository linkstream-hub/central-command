import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import { db } from '@/lib/db';
import { jobs, employees } from '@/lib/schema';
import { eq, and, isNotNull, ne, inArray } from 'drizzle-orm';
import { z } from 'zod';

export const dynamic = 'force-dynamic';

const LockSendSchema = z.object({
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/)
});

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    const apiKey = req.headers.get('x-api-key');
    const isApiKeyAuth = !session && apiKey === process.env.DASHBOARD_API_KEY;

    if (!session && !isApiKeyAuth) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const parseResult = LockSendSchema.safeParse(body);
    
    if (!parseResult.success) {
      return NextResponse.json({ success: false, message: 'Invalid date format' }, { status: 400 });
    }

    const { date } = parseResult.data;

    // Idempotency check
    const existingDispatches = await db.select()
      .from(jobs)
      .where(and(
        eq(jobs.scheduledDate, date),
        isNotNull(jobs.dispatchSentAt)
      ));

    if (existingDispatches.length > 0) {
      return NextResponse.json({ success: false, message: 'Already dispatched for this date' }, { status: 409 });
    }

    // Fetch all jobs for date
    const allJobsForDate = await db.select()
      .from(jobs)
      .where(and(
        eq(jobs.scheduledDate, date),
        ne(jobs.status, 'Archived'),
        isNotNull(jobs.tech)
      ));

    if (allJobsForDate.length === 0) {
      return NextResponse.json({ success: true, techCount: 0, jobCount: 0 });
    }

    const uniqueTechNames = Array.from(new Set(allJobsForDate.map(j => j.tech).filter((t): t is string => Boolean(t))));

    // Fetch employees for phone numbers
    const phoneMap = new Map<string, string>();
    if (uniqueTechNames.length > 0) {
      const techEmployees = await db.select()
        .from(employees)
        .where(and(
          inArray(employees.name, uniqueTechNames),
          eq(employees.role, 'tech')
        ));
      
      for (const emp of techEmployees) {
        if (emp.phone) {
          phoneMap.set(emp.name, emp.phone);
        }
      }
    }

    // Build payload.techs array
    const techsPayload = uniqueTechNames.map(techName => {
      const techJobs = allJobsForDate.filter(j => j.tech === techName).map(j => ({
        jobId: j.jobId,
        address: j.address,
        unit: j.unit,
        serviceCategory: j.category,
        scheduledTime: j.scheduledTime,
        estimatedHours: j.estHours,
        priority: j.priority
      }));

      return {
        techName,
        phone: phoneMap.get(techName) ?? '',
        jobs: techJobs
      };
    });

    const payload = {
      date,
      techs: techsPayload,
      sentBy: session?.user?.name ?? 'api-key-auth',
      sentAt: new Date().toISOString()
    };

    const webhookUrl = process.env.N8N_LOCK_SEND_WEBHOOK_URL;
    if (!webhookUrl) {
      console.warn('[lock-and-send] N8N_LOCK_SEND_WEBHOOK_URL undefined, skipping');
    } else {
      fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      }).catch(err => console.error('[lock-and-send] webhook failed:', err));
    }

    // Mark jobs as dispatched
    const now = new Date();
    await db.update(jobs)
      .set({ dispatchSentAt: now })
      .where(and(
        eq(jobs.scheduledDate, date),
        isNotNull(jobs.tech),
        ne(jobs.status, 'Archived')
      ));

    return NextResponse.json({ success: true, techCount: uniqueTechNames.length, jobCount: allJobsForDate.length });

  } catch (error) {
    console.error('[lock-and-send] error:', error);
    return NextResponse.json({ success: false, message: 'Internal Server Error' }, { status: 500 });
  }
}
