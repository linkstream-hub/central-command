require('dotenv').config({path: '.env.local'});
const { neon } = require('@neondatabase/serverless');
const sql = neon(process.env.DATABASE_URL);
sql`SELECT job_id, count(*) FROM jobs GROUP BY job_id HAVING count(*) > 1`.then(res => console.log('Duplicates:', res)).catch(console.error);
