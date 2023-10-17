class NotesCreateService {
  constructor(NotesRepository) {
    this.NotesRepository = NotesRepository;
  }

  async execute(title, description, tags, links, user_id) {
    const note = await this.NotesRepository.createNotes(
      title,
      description,
      user_id
    );

    const linksInsert = links.map((link) => {
      return {
        note_id: note.id,
        url: link,
      };
    });

    await this.NotesRepository.createLinks(linksInsert);

    const tagsInsert = tags.map((name) => {
      return {
        note_id: note.id,
        name,
        user_id,
      };
    });

    await this.NotesRepository.createTags(tagsInsert);

    return note;
  }
}

module.exports = NotesCreateService;
