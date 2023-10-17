class NotesRepositoryInMemory {
  data = [];
  links = [];
  tags = [];

  createNotes(title, description, user_id) {
    const note = {
      user_id: Math.floor(Math.random() * 1000) + 1,
      title,
      description,
    };

    this.data.push(note);
    return note;
  }

  createLinks(link) {
    this.links.push(link);
  }

  createTags(tag) {
    this.tags.push(tag);
  }
}

module.exports = NotesRepositoryInMemory;
