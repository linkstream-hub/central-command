require('dotenv').config({path: '.env.local'});
const { neon } = require('@neondatabase/serverless');
const sql = neon(process.env.DATABASE_URL);
sql`SELECT status, count(*) FROM jobs GROUP BY status`.then(res => console.log('Job Statuses:', res)).catch(console.error);
