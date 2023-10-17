const Knex = require("../database/knex");
const NotesCreateService = require("../services/NotesCreateService");
const NotesRepository = require("../repositories/NotesRepository");

class NotesController {
  async create(request, response) {
    const { title, description, tags, links } = request.body;
    const user_id = request.user.id;

    const notesRepository = new NotesRepository();
    const notesCreateService = new NotesCreateService(notesRepository);

    notesCreateService.execute(title, description, tags, links, user_id);

    return response.json("message : Note Cadastrado com sucesso 📋 ");
  }
  async show(request, response) {
    const { id } = request.params;

    const notes = await Knex("notes").where({ id }).first();
    const tags = await Knex("tags").where({ note_id: id }).orderBy("name");
    const links = await Knex("links")
      .where({ note_id: id })
      .orderBy("create_at");
    return response.json({
      ...notes,
      tags,
      links,
    });
  }
  async delete(request, response) {
    const { id } = request.params;

    await Knex("notes").where({ id }).delete();

    return response.json({ message: "Nota deletada 🗑️" });
  }
  async index(request, response) {
    const { title, tags } = request.query;
    const user_id = request.user.id;

    let notes;

    if (tags) {
      const filterTags = tags.split(",").map((tag) => tag.trim());
      console.log("chegou aqui");
      notes = await Knex("tags")
        .select(["notes.id", "notes.title", "notes.user_id"])
        .where("notes.user_id", user_id)
        .whereLike("notes.title", `%${title}%`)
        .whereIn("name", filterTags)
        .innerJoin("notes", "notes.id", "tags.note_id")
        .groupBy("notes.id")
        .orderBy("notes.title");
    } else {
      notes = await Knex("notes")
        .where({ user_id })
        .whereLike("title", `%${title}%`)
        .orderBy("title");
    }

    const userTags = await Knex("tags").where({ user_id });
    const notesWithTags = notes.map((note) => {
      const noteTags = userTags.filter((tag) => tag.note_id === note.id);

      return {
        ...note,
        tags: noteTags,
      };
    });

    return response.json(notesWithTags);
  }
}

module.exports = NotesController;
