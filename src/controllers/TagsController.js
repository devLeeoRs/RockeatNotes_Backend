const Knex = require("../database/knex");

class TagsController {
  async index(request, response) {
    const user_id = request.user.id;

    const tags = await Knex("tags")
      .where({ user_id })
      .orderBy("name")
      .groupBy("name");

    return response.json(tags);
  }
}

module.exports = TagsController;
