import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { employees } from '@/lib/schema';
import { type InferInsertModel, sql } from 'drizzle-orm';

type TechInsert = InferInsertModel<typeof employees>;

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
    const techData: TechInsert = {
      ...body,
      role: 'tech',
      tokenExpiry: parseDate(body.tokenExpiry),
      createdAt: body.createdAt ? parseDate(body.createdAt) : undefined,
    };
    
    if (!techData.badge) {
      return NextResponse.json({ error: 'Badge is required' }, { status: 400 });
    }

    // Upsert tech using badge as natural key (targets partial unique index on orgId+badge)
    const result = await db.insert(employees)
      .values(techData)
      .onConflictDoUpdate({
        target: [employees.orgId, employees.badge],
        targetWhere: sql`badge IS NOT NULL`,
        set: techData
      })
      .returning();

    return NextResponse.json({ success: true, data: result[0] });
  } catch (error: unknown) {
    console.error('Tech sync error:', error);
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Unknown error' }, { status: 500 });
  }
}
