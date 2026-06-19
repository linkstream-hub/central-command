import { neon } from '@neondatabase/serverless';

async function checkCounts() {
  const sql = neon(process.env.DATABASE_URL_UNPOOLED);
  try {
    const techs = await sql`SELECT COUNT(*) FROM techs`;
    const jobs = await sql`SELECT COUNT(*) FROM jobs`;
    const tr = await sql`SELECT COUNT(*) FROM time_records`;
    
    console.log('--- Neon Record Counts ---');
    console.log('Techs:', techs[0].count);
    console.log('Jobs:', jobs[0].count);
    console.log('Time Records:', tr[0].count);
    console.log('--------------------------');
  } catch (error) {
    console.error('Error checking counts:', error);
  } finally {
    process.exit();
  }
}

checkCounts();
