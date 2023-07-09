const Pool = require("pg").Pool;

const pool = new Pool({
  host: "localhost",
  user: "postgres",
  database: "postgres",
  password: "eslam1pc2",
  port: 5432,
});

module.exports = pool;
