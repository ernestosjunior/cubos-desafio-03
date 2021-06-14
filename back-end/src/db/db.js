const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "market_cubos",
  password: "312728el",
  port: 5432,
});

const query = (text, param) => {
  return pool.query(text, param);
};

module.exports = {
  query,
};
