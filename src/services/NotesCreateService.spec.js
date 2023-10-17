const NotesCreateService = require("../services/NotesCreateService");
const NotesRepositoryInMemory = require("../repositories/NotesRepositoryInMemory");

describe("teste notas", () => {
  it("cadastro de notas", async () => {
    note = {
      title: "nota teste",
      description: "teste de nota",
      tags: ["tagtest", "tagtest2"],
      links: ["linktest", "linktest2"],
      user_id: 2,
    };

    const notesRepository = new NotesRepositoryInMemory();
    const notesCreateService = new NotesCreateService(notesRepository);

    const createNote = await notesCreateService.execute(
      note.title,
      note.description,
      note.tags,
      note.links,
      note.user_id
    );

    expect(createNote).toHaveProperty("title");
  });
});
