import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { db } from '@/lib/db';
import { jobPhotos } from '@/lib/schema';
import { verifyFieldSession } from '@/lib/fieldAuth';

export const dynamic = 'force-dynamic';

const UploadPhotoSchema = z.object({
  jobId: z.number(),
  photoType: z.string(),
  photoBase64: z.string(),
  fileName: z.string(),
});

export async function POST(req: NextRequest): Promise<NextResponse> {
  const session = await verifyFieldSession(req);
  if (!session) {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
  }

  const body: unknown = await req.json();
  const parsed = UploadPhotoSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { success: false, message: 'Invalid request body', errors: parsed.error.flatten() },
      { status: 400 },
    );
  }

  const { jobId, photoType, photoBase64, fileName } = parsed.data;

  const inserted = await db.insert(jobPhotos).values({
    orgId: 'APT-CA',
    jobId,
    employeeId: session.employeeId,
    photoType,
    fileName,
    photoData: photoBase64,
  }).returning();

  return NextResponse.json({ success: true, photoId: inserted[0].id });
}
