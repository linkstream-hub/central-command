const { execSync } = require('child_process');

const envs = {
  DATABASE_URL: 'postgresql://neondb_owner:npg_H7kwv5EnmpKD@ep-holy-waterfall-akwxx49b-pooler.c-3.us-west-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require',
  DATABASE_URL_UNPOOLED: 'postgresql://neondb_owner:npg_H7kwv5EnmpKD@ep-holy-waterfall-akwxx49b.c-3.us-west-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require',
  PGHOST: 'ep-holy-waterfall-akwxx49b-pooler.c-3.us-west-2.aws.neon.tech',
  PGHOST_UNPOOLED: 'ep-holy-waterfall-akwxx49b.c-3.us-west-2.aws.neon.tech',
  POSTGRES_HOST: 'ep-holy-waterfall-akwxx49b-pooler.c-3.us-west-2.aws.neon.tech',
  POSTGRES_PRISMA_URL: 'postgresql://neondb_owner:npg_H7kwv5EnmpKD@ep-holy-waterfall-akwxx49b-pooler.c-3.us-west-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require',
  POSTGRES_URL: 'postgresql://neondb_owner:npg_H7kwv5EnmpKD@ep-holy-waterfall-akwxx49b-pooler.c-3.us-west-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require',
  POSTGRES_URL_NON_POOLING: 'postgresql://neondb_owner:npg_H7kwv5EnmpKD@ep-holy-waterfall-akwxx49b.c-3.us-west-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require',
  POSTGRES_URL_NO_SSL: 'postgresql://neondb_owner:npg_H7kwv5EnmpKD@ep-holy-waterfall-akwxx49b-pooler.c-3.us-west-2.aws.neon.tech/neondb'
};

for (const [k, v] of Object.entries(envs)) {
  console.log(`Updating ${k}...`);
  try {
    execSync(`npx vercel env rm ${k} production -y`, { stdio: 'ignore' });
  } catch (e) {
    // Ignore if not exists
  }
  
  // Use Vercel's ability to take value from stdin
  execSync(`npx vercel env add ${k} production`, { 
    input: v,
    stdio: ['pipe', 'inherit', 'inherit'] 
  });
}
console.log('Done!');
