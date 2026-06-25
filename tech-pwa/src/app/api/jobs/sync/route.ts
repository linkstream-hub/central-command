import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { jobs } from '@/lib/schema';
import { type InferInsertModel } from 'drizzle-orm';

type JobInsert = InferInsertModel<typeof jobs>;

export async function POST(req: NextRequest) {
  // TechPWA.gs sends the key as header name 'DASHBOARD_API_KEY' (not 'x-api-key') — intentional, both sides match
  const apiKey = req.headers.get('DASHBOARD_API_KEY');
  if (apiKey !== process.env.DASHBOARD_API_KEY) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    
    // Helper to safely convert string to Date or null
    const parseDate = (val: unknown) => {
      if (typeof val === 'string' && !isNaN(Date.parse(val))) {
        return new Date(val);
      }
      return null;
    };

    // Convert date strings to Date objects for Drizzle timestamp columns
    const jobData: JobInsert = {
      ...body,
      timestamp: parseDate(body.timestamp),
      createdAt: body.createdAt ? parseDate(body.createdAt) : undefined,
    };
    
    if (!jobData.jobId) {
      return NextResponse.json({ error: 'jobId (Lead ID) is required' }, { status: 400 });
    }

    // Upsert: exclude auto-managed columns from ON CONFLICT SET
     
    const { id: _id, createdAt: _ca, jobId: _jobId, ...updateSet } = jobData;
    const result = await db.insert(jobs)
      .values(jobData)
      .onConflictDoUpdate({
        target: jobs.jobId,
        set: updateSet,
      })
      .returning();

    return NextResponse.json({ success: true, data: result[0] });
  } catch (error: unknown) {
    console.error('Job sync error:', error);
    const cause = error instanceof Error && error.cause instanceof Error
      ? error.cause.message
      : undefined;
    return NextResponse.json({
      error: error instanceof Error ? error.message : 'Unknown error',
      ...(cause && { cause }),
    }, { status: 500 });
  }
}
