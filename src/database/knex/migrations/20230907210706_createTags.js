exports.up = (knex) =>
  knex.schema.createTable("tags", (table) => {
    table.increments("id");
    table
      .integer("note_id")
      .references("id")
      .inTable("notes")
      .onDelete("CASCADE"); // a funcao onDelete faz com que ao deletar a note a tag tambem seja deletada
    table.integer("user_id").references("id").inTable("users");
    table.string("name").notNullable(); // Cria uma coluna name e diz que ela nao pode ser nula
  });

exports.down = (knex) => knex.schema.dropTable("tags");
