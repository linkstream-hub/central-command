require('dotenv').config({path: '.env.local'});
const { neon } = require('@neondatabase/serverless');
const sql = neon(process.env.DATABASE_URL);
sql`SELECT COUNT(*) FROM jobs`.then(res => console.log('Job count:', res)).catch(console.error);
