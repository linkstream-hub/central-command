const { Client } = require('pg');
require('dotenv').config({path: '.env.local'});
const client = new Client({ connectionString: 'postgresql://neondb_owner:npg_ABWizDG1Hlx5@ep-snowy-block-akr8596n.c-3.us-west-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require' });
client.connect().then(() => client.query("SELECT * FROM jobs ORDER BY timestamp DESC LIMIT 1")).then(res => {
  console.log(res.rows[0]);
  return client.end();
}).catch(console.error);
