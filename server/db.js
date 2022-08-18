const Pool = require("pg").Pool;

const pool = new Pool({
  user: "", // your username
  password: "", // your password
  host: "localhost",
  port: "5432",
  database: "stockDB",
});

module.exports = pool;
