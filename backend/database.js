const pgp = require("pg-promise")();
const db = pgp({
  database: "Novelish",
  user: "postgres",
});

module.exports = db;