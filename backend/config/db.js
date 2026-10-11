// Loads variables from .env into process.env
require('dotenv').config();
const { Pool } = require('pg');

// A "pool" keeps a few database connections open and reuses them,
// which is faster than opening a new connection for every request.
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

module.exports = pool;