// NEON-03 cutover: Sheets write path severed (Phase 12). All job comments read/written from Neon only.

import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import { db } from '@/lib/db';
import { jobComments } from '@/lib/schema';
import { eq, asc } from 'drizzle-orm';
import { sandboxAction } from '@/lib/sandbox-store';


export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ jobId: string }> }
) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  const { jobId } = await params;

  // ── Sandbox Mode: use local JSON store ──
  if (process.env.NEXT_PUBLIC_SANDBOX_MODE === 'true') {
    const result = sandboxAction('getJobComments', { jobId });
    return NextResponse.json({ ...result, source: 'sandbox' });
  }

  // Neon-only: no Sheets fallback, no shadow-write
  const rows = await db
    .select()
    .from(jobComments)
    .where(eq(jobComments.jobId, jobId))
    .orderBy(asc(jobComments.createdAt));

  return NextResponse.json({
    success: true,
    source: 'neon',
    comments: rows.map(r => ({
      id:        String(r.id),
      leadId:    r.jobId,
      author:    r.authorName ?? '',
      role:      r.type       ?? 'dispatch',
      body:      r.content,
      timestamp: r.createdAt ? r.createdAt.toISOString() : '',
    })),
  });
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ jobId: string }> }
) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  const { jobId } = await params;
  const { body: content, role } = await request.json();

  if (!content?.trim()) {
    return NextResponse.json({ success: false, error: 'MISSING_BODY' }, { status: 400 });
  }

  // ── Sandbox Mode: use local JSON store ──
  if (process.env.NEXT_PUBLIC_SANDBOX_MODE === 'true') {
    const author = (session as { staffName?: string; user?: { name?: string } }).staffName ?? session.user?.name ?? 'Dispatch';
    const result = sandboxAction('addJobComment', { jobId, body: content.trim(), role: role ?? 'dispatch', author });
    return NextResponse.json(result);
  }

  const author = (session as { staffName?: string; user?: { name?: string } }).staffName ?? session.user?.name ?? 'Staff';
  const authorId = session.user?.email ?? null;
  const commentRole = role ?? 'dispatch';

  // Neon-only: direct insert, no Sheets write, no shadow-write
  const [inserted] = await db.insert(jobComments).values({
    jobId,
    authorId,
    authorName: author,
    content:    content.trim(),
    type:       commentRole,
  }).returning();

  const comment = {
    id:        String(inserted.id),
    leadId:    inserted.jobId,
    author:    inserted.authorName ?? '',
    role:      inserted.type       ?? 'dispatch',
    body:      inserted.content,
    timestamp: inserted.createdAt ? inserted.createdAt.toISOString() : new Date().toISOString(),
  };

  return NextResponse.json({ success: true, comment });
}
