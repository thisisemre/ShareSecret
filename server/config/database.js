import pg from "pg";
import env from "dotenv";

env.config();
const db = new pg.Client({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: 5432,
  });


db.connect().then(() => console.log('Connected to the database'))
.catch(err => console.error('Connection error', err.stack));

  
export default db;