import { config } from 'dotenv';
config({ path: '.env.local' });
process.env.DATABASE_URL = process.env.DATABASE_URL_UNPOOLED;

async function main() {
  const { jobsRepository } = await import('../src/lib/dal/jobs');
  console.log('Testing jobsRepository... getDispatchData was removed.');
}

main().catch(console.error);
