exports.up = (knex) =>
  knex.schema.createTable("notes", (table) => {
    table.increments("id"); // Cria uma coluna ID com AutoIncremento
    table.text("title"); // Cria uma coluna do tipo texto
    table.text("description");
    table.integer("user_id").references("id").inTable("users"); // Cria uma coluna do tipo inteiro que faz referencia ao id que esta na tabela Users
    table.timestamp("create_at").default(knex.fn.now()); // cria uma coluna do tipo timesstamp , e como padrao é passado uma funcao para gerar a data
    table.timestamp("updated_at").default(knex.fn.now());
  });

exports.down = (knex) => knex.schema.dropTable("notes");
