const { Pool } = require("pg");
require("dotenv").config();
/*
const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
});
*/

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: 5433,
  allowExitOnIdle: true,
});

module.exports = pool;
