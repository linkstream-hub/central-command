import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import { db } from '@/lib/db';
import { jobs, timeRecords, employees, pushSubscriptions } from '@/lib/schema';
import { eq, and, sql } from 'drizzle-orm';
import { Job } from '@/lib/types';
import { jobsRepository, type ManualJobPayload } from '@/lib/dal/jobs';
import { computeDashboardStats, normalizeLegacyStatus } from '@/lib/dal/mappers';
import webpush from 'web-push';

const VAPID_EMAIL = process.env.VAPID_EMAIL;
const VAPID_PUBLIC_KEY = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;
const VAPID_PRIVATE_KEY = process.env.VAPID_PRIVATE_KEY;

if (VAPID_EMAIL && VAPID_PUBLIC_KEY && VAPID_PRIVATE_KEY) {
  webpush.setVapidDetails(VAPID_EMAIL, VAPID_PUBLIC_KEY, VAPID_PRIVATE_KEY);
}

/** Best-effort "you've been scheduled" push — GAS createManualJobDA parity. Never blocks job creation. */
async function sendJobAssignedPush(techName: string, address: string, scheduledDate: string) {
  if (!VAPID_EMAIL || !VAPID_PUBLIC_KEY || !VAPID_PRIVATE_KEY) return;

  const [tech] = await db
    .select({ id: employees.id })
    .from(employees)
    .where(sql`lower(${employees.name}) = ${techName.toLowerCase()}`);
  if (!tech) return;

  const subs = await db
    .select()
    .from(pushSubscriptions)
    .where(eq(pushSubscriptions.employeeId, tech.id));
  if (subs.length === 0) return;

  const payload = JSON.stringify({
    title: 'New Job Assigned',
    body: `You have been scheduled at ${address} on ${scheduledDate}.`,
    url: '/jobs',
  });

  await Promise.allSettled(
    subs.map(s =>
      webpush.sendNotification(
        { endpoint: s.endpoint, keys: { p256dh: s.p256dh, auth: s.authKey } },
        payload,
      ),
    ),
  );
}

export async function POST(request: NextRequest) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = (await request.json()) as ManualJobPayload;
    const result = await jobsRepository.createManualJob(body);
    if (!result.success) {
      return NextResponse.json(result, { status: 400 });
    }

    if (body.assignedTech && body.scheduledDate) {
      try {
        await sendJobAssignedPush(body.assignedTech, body.address, body.scheduledDate);
      } catch (error) {
        console.error('Manual job push notification failed:', error);
      }
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error('API Error POST /api/jobs:', error);
    return NextResponse.json({ success: false, message: 'Internal Server Error' }, { status: 500 });
  }
}

export async function GET() {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
  }

  try {
    // 1. Query Neon jobs table + LEFT JOIN time_records ON job_id WHERE time_records.status = 'active'
    const results = await db.select({
      job: jobs,
      activeRecord: {
        id: timeRecords.id,
        recordId: timeRecords.recordId,
        clockIn: timeRecords.clockIn,
      }
    })
    .from(jobs)
    .leftJoin(timeRecords, and(
      eq(jobs.jobId, timeRecords.jobId),
      eq(timeRecords.status, 'active')
    ));


    // 2. Map results to Job interface
    const allJobs: Job[] = results.map(({ job, activeRecord }) => {
      return {
        jobId: job.jobId,
        priority: (job.priority || '4-STANDARD') as Job['priority'],
        serviceCategory: job.category || '',
        address: job.address || '',
        unit: job.unit || '',
        description: job.description || '',
        scheduledDate: job.scheduledDate || '',
        scheduledTime: job.scheduledTime || '',
        estimatedHours: Number(job.estHours || 0),
        status: normalizeLegacyStatus(job.status || 'Needs Review') as Job['status'],
        rmName: job.rmName || '',
        rmEmail: job.rmEmail || '',
        accessInfo: job.accessInfo || '',
        tenantName: job.tenantName || '',
        tenantPhone: job.tenantPhone || '',
        tenantEmail: job.tenantEmail || '',
        assignedTech: job.tech || '',
        notes: job.notes || '',
        gmailMsgId: job.gmailMsgId || '',
        emailType: job.emailType || '',
        preferredTiming: job.timing || '',
        estimateNeeded: job.estimate || '',
        pteGranted: (job.pte || undefined) as Job['pteGranted'],
        tenantPrefContact: job.tenantPref || '',
        tenantHasPets: job.tenantPets || '',
        timestamp: job.timestamp ? job.timestamp.toISOString() : (job.createdAt ? job.createdAt.toISOString() : ''),
        clockedInAt: activeRecord?.clockIn ? activeRecord.clockIn.toISOString() : null,
        activeRecordId: activeRecord?.recordId || null,
        rowIndex: undefined, 
      };
    });

    // 3. Filter: exclude rows where jobId is empty AND status isn't 'Ready to Schedule' AND address length < 5
    const filteredJobs = allJobs.filter(j => {
      if (!j.jobId && j.status !== 'Ready to Schedule' && j.address.length < 5) return false;
      return true;
    });

    // 4. Compute stats (matching computeStats in dashboard-api.ts)
    const now = new Date();
    const options: Intl.DateTimeFormatOptions = { timeZone: 'America/Los_Angeles', year: 'numeric', month: '2-digit', day: '2-digit' };
    const formatter = new Intl.DateTimeFormat('en-CA', options);
    const todayStr = formatter.format(now);

    const stats = computeDashboardStats(filteredJobs, todayStr);

    return NextResponse.json({
      success: true,
      source: 'neon',
      jobs: filteredJobs.filter(j => j.status !== 'Archived'),
      stats
    });
  } catch (error) {
    console.error('API Error /api/jobs:', error);
    return NextResponse.json({ success: false, message: 'Internal Server Error' }, { status: 500 });
  }
}
