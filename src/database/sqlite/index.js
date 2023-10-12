const sqlite3 = require("sqlite3");
const sqlite = require("sqlite");
const path = require("path");

async function sqliteConnection() {
  // Funcao que ira se conectar ao banco
  const database = await sqlite.open({
    // Aqui passamos as configuração de nosso banco
    filename: path.resolve(__dirname, "..", "database.db"), // Define aonde nosso banco de dados sera salvo , neste caso em um arquivo
    driver: sqlite3.Database, // define qual o tipo de banco de dados
  });
  return database;
}

module.exports = sqliteConnection; // exportando o banco de dados
