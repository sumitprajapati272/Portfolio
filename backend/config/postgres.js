
const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  },
  connectionTimeoutMillis: 10000,
  idleTimeoutMillis: 30000
});

pool.on("connect", () => {
  console.log("PostgreSQL connection established!");
});

pool.on("error", (error) => {
  console.error("PostgreSQL pool error:", error.message);
});

module.exports = pool;
