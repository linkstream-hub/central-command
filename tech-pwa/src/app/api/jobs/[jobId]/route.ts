import { NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';
import { auth } from '@/auth';
import { db } from '@/lib/db';
import { jobs } from '@/lib/schema';
import { eq } from 'drizzle-orm';
import { resolveJobStatus, resolveEmailTrigger } from '@/lib/job-transitions';
import { mapJob } from '@/lib/dal/mappers';
import { apply } from './job-update';
import { EventBusSideEffectExecutor } from '@/lib/side-effects/event-bus-executor';

export async function GET(
  req: Request,
  { params }: { params: Promise<{ jobId: string }> }
) {
  const session = await auth();
  const apiKey = req.headers.get('x-api-key');
  const isApiKeyAuth = !session && apiKey === process.env.DASHBOARD_API_KEY;
  if (!session && !isApiKeyAuth) {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
  }
  try {
    const { jobId } = await params;
    const results = await db.select().from(jobs).where(eq(jobs.jobId, jobId)).limit(1);
    if (!results[0]) {
      return NextResponse.json({ success: false, error: 'JOB_NOT_FOUND' }, { status: 404 });
    }
    return NextResponse.json({ success: true, source: 'neon', job: mapJob(results[0]) });
  } catch (error) {
    console.error('[GET /api/jobs/[jobId]] Error:', error);
    return NextResponse.json({ success: false, message: 'Internal Server Error' }, { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ jobId: string }> }
) {
  const session = await auth();
  const apiKey = req.headers.get('x-api-key');
  const isApiKeyAuth = !session && apiKey === process.env.DASHBOARD_API_KEY;
  if (!session && !isApiKeyAuth) {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { jobId } = await params;
    const body = await req.json();
    const result = await apply(jobId, body, { isApiKeyAuth }, new EventBusSideEffectExecutor());

    if (!result.ok) {
      const status = result.error.code === 'JOB_NOT_FOUND' ? 404 :
                     result.error.code === 'SCHEDULE_INCOMPLETE' ? 422 :
                     result.error.code === 'FSM_VIOLATION' ? 409 : 500;
      return NextResponse.json({ success: false, message: result.error.code }, { status });
    }

    if (result.value.type === 'NO_OP') {
      return NextResponse.json({ success: true, message: 'No updates provided' });
    }

    return NextResponse.json({
      success: true,
      ...(result.value.warning ? { warning: result.value.warning } : {}),
    });
  } catch (error: unknown) {
    console.error('[PATCH /api/jobs] Error:', error);
    const message = error instanceof Error ? error.message : 'Internal Server Error';
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}
