exports.up = (knex) =>
  knex.schema.createTable("links", (table) => {
    table.increments("id");
    table
      .integer("note_id")
      .references("id")
      .inTable("notes")
      .onDelete("CASCADE"); // a funcao onDelete faz com que ao deletar a note a tag tambem seja deletada
    table.string("url").notNullable(); // Cria uma coluna name e diz que ela nao pode ser nula
    table.timestamp("create_at").default(knex.fn.now());
  });

exports.down = (knex) => knex.schema.dropTable("links");
