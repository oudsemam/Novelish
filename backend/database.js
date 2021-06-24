const pgp = require("pg-promise")();
const db = pgp({
  ssl: {
    rejectUnauthorized: false,
  },
});

module.exports = db;
