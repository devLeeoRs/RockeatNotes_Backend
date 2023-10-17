const Knex = require("../database/knex");

class NotesRepository {
  async createNotes(title, description, user_id) {
    const note_id = await Knex("notes").insert({
      title,
      description,
      user_id,
    });

    return note_id;
  }

  async createLinks(links) {
    Knex("links").insert(links);
  }

  async createTags(tags) {
    Knex("links").insert(tags);
  }
}

module.exports = NotesRepository;
