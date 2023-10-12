const config = require("../../../knexfile"); // Importando o arquivo de configuração
const Knex = require("knex");

const connection = Knex(config.development);

module.exports = connection;
