import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { jobs, employees } from '@/lib/schema';
import { eq, isNotNull } from 'drizzle-orm';

function normalizeName(name: string): string {
  if (!name) return '';
  name = name.trim();
  // Remove #101 or similar badges appended
  name = name.split('#')[0].trim();
  
  // Specific fix: 'Arteaga, Jose Manuel' breaks the comma split
  // The schedule API splits by comma thinking it's 2 techs. 
  // Let's manually fix the known Last, First issues shown in the screenshot first.
  if (name.includes('Arteaga, Jose Manuel') || name === 'Arteaga' || name === 'Jose Manuel') return 'Jose Manuel Arteaga';
  if (name.includes('Cabrera, Salvador') || name === 'Cabrera' || name === 'Salvador V.' || name === 'Salvador') return 'Salvador Cabrera';
  if (name.includes('Pena, Eduardo')) return 'Eduardo Pena';
  if (name.includes('Diaz, Manuel') || name === 'Diaz') return 'Manuel Diaz';
  if (name.includes('Embaye, Daniel') || name === 'Daniel Embaye') return 'Daniel Embaye';
  if (name.includes('Santos, Federico') || name === 'Federico Santos Eduardo') return 'Federico Santos';
  if (name.includes('Quizon, Ronnie') || name === 'Quizon') return 'Ronnie Quizon';
  if (name.includes('Jaya, Boyette') || name === 'Boyette Jaya') return 'Boyette Johnson';
  if (name.includes('La, Jimmy') || name === 'Jimmy') return 'Jimmy La';
  if (name.includes('De Leon, Sonnie') || name === 'De Leon') return 'Sonnie De Leon';
  if (name.includes('Bateni, Vahid')) return 'Vahid Bateni';
  if (name.includes('Gebremedhim, Esyeas')) return 'Esyeas Gebremedhim';
  if (name.includes('Intal, Rodrigo') || name === 'Rodrigo Ital') return 'Rodrigo Intal';
  if (name.includes('Rodas Lopez') || name === 'Rodas, Julio') return 'Julio Rodas';
  if (name.includes('Ruiz, Jaime')) return 'Jaime Ruiz';
  if (name.includes('Sbhatleab, Robiel')) return 'Robiel Sbhatleab';

  // General "Last, First" -> "First Last" fallback
  if (name.includes(',')) {
    const parts = name.split(',');
    if (parts.length === 2) {
      name = `${parts[1].trim()} ${parts[0].trim()}`;
    }
  }
  
  return name;
}

export async function GET() {
  try {
    const allJobs = await db.select({ id: jobs.id, tech: jobs.tech }).from(jobs).where(isNotNull(jobs.tech));
    
    const uniqueNormalizedNames = new Set<string>();
    const jobsToUpdate: { id: number, newTech: string }[] = [];

    for (const job of allJobs) {
      if (!job.tech) continue;
      const cleanName = normalizeName(job.tech);
      if (cleanName !== job.tech) {
        jobsToUpdate.push({ id: job.id, newTech: cleanName });
      }
      uniqueNormalizedNames.add(cleanName);
    }

    const existingEmployees = await db.select().from(employees);
    const existingNames = new Set(existingEmployees.map(e => e.name));
    
    let inserted = 0;
    for (const name of uniqueNormalizedNames) {
      if (!existingNames.has(name) && name.length > 2) {
        await db.insert(employees).values({
          orgId: 'APT-CA',
          name: name,
          role: 'tech',
          isActive: true,
        }).onConflictDoNothing();
        inserted++;
      }
    }

    let updatedJobs = 0;
    for (const update of jobsToUpdate) {
      await db.update(jobs).set({ tech: update.newTech }).where(eq(jobs.id, update.id));
      updatedJobs++;
    }

    // Now delete any employees with a comma in their name since they've been normalized
    const commaEmployees = existingEmployees.filter(e => e.name.includes(',') || e.name === 'Arteaga' || e.name === 'Cabrera' || e.name === 'Diaz' || e.name === 'Quizon');
    for (const ce of commaEmployees) {
      await db.delete(employees).where(eq(employees.id, ce.id));
    }

    return NextResponse.json({ 
      success: true, 
      uniqueNames: uniqueNormalizedNames.size,
      insertedEmployees: inserted,
      updatedJobs,
      deletedMessyEmployees: commaEmployees.length
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: (error as Error).message }, { status: 500 });
  }
}
