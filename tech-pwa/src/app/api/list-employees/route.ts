import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import { db } from '@/lib/db';
import { employees } from '@/lib/schema';

export async function GET(req: NextRequest) {
  const session = await auth();
  const apiKey = req.headers.get('x-api-key');
  if (!session && apiKey !== process.env.DASHBOARD_API_KEY) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const allEmployees = await db.select().from(employees);
  const employeeNames = allEmployees.map(e => `${e.name} (Badge: ${e.badge}, Role: ${e.role}, Active: ${e.isActive})`);
  return NextResponse.json({ count: allEmployees.length, employees: employeeNames, raw: allEmployees });
}
