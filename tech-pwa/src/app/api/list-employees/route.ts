import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { employees } from '@/lib/schema';

export async function GET() {
  const allEmployees = await db.select().from(employees);
  const employeeNames = allEmployees.map(e => `${e.name} (Badge: ${e.badge}, Role: ${e.role}, Active: ${e.isActive})`);
  return NextResponse.json({ count: allEmployees.length, employees: employeeNames, raw: allEmployees });
}
