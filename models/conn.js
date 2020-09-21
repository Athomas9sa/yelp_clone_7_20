const user = `zehafnoz`,
  password = `aUutYzwVIgdYodLb0SzsbJLLA2OTIUWr`,
  host = `lallah.db.elephantsql.com`,
  database = `zehafnoz`;

const pgp = require("pg-promise")({
  query: function (e) {
    console.log("QUERY: ", e.query);
  },
});

const options = {
  host,
  database,
  user,
  password,
};

const db = pgp(options);

module.exports = db;
