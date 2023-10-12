const sqliteConnection = require("../../sqlite");
const createUsers = require("./createUsers");

async function migrationsRun() {
  const schemas = [
    // schemas serao nossas tabelas
    createUsers,
  ].join(""); // Join utilizado para juntar todas nossas migrations

  sqliteConnection()
    .then((db) => db.exec(schemas)) // execute os schemas
    .catch((error) => console.error(error));
}

module.exports = migrationsRun;
