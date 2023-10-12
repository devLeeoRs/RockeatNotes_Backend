const AppError = require("../utils/AppError");
const { hash, compare } = require("bcryptjs");
const sqliteConnection = require("../database/sqlite");

class UsersController {
  async create(request, response) {
    const { name, email, password } = request.body;

    const database = await sqliteConnection();
    const checkUserExists = await database.get(
      "SELECT * FROM users WHERE email = (?)",
      [email]
    );

    if (checkUserExists) {
      throw new AppError("user is already in use");
    }

    const hashedPassword = await hash(password, 8);

    await database.run(
      "INSERT INTO users(name, email, password) VALUES (?, ?, ?)",
      [name, email, hashedPassword]
    );

    return response.status(201).json();
  }

  async update(request, response) {
    const { name, email, password, old_password } = request.body;
    const user_id = request.user.id;

    const database = await sqliteConnection();
    const user = await database.get("SELECT * FROM users WHERE id = (?)", [
      user_id,
    ]);

    // Verifica se existe um usuario com id passado
    if (!user) {
      throw new AppError("Usuario nao existe");
    }

    // Encontrando um usuario pelo email
    const userWithUpdateEmail = await database.get(
      "SELECT * FROM users WHERE email =(?)",
      [email]
    );

    // Verifica se ja tem um usuario com este email , e se este usuario é diferente do passado como parametro
    if (userWithUpdateEmail && userWithUpdateEmail.id !== user.id) {
      throw new AppError("este email ja está em uso ");
    }

    user.name = name ?? user.name;
    user.email = email ?? user.email;

    if (password && !old_password) {
      throw new AppError(
        "A senha antiga deve ser informada para atualizar  nova 🔑"
      );
    }

    if (password && old_password) {
      const userCkeckPassword = await compare(old_password, user.password);

      if (!userCkeckPassword) {
        throw new AppError("A senha antiga é invalida ");
      }

      user.password = await hash(password, 8);
    }

    // Atualizando o usuario
    await database.run(
      `
      UPDATE users SET 
      name = ?,
      email = ?,
      password = ?,
      updated_at = DATETIME('now')
      WHERE id = ?;
      `,
      [user.name, user.email, user.password, user_id]
    );

    return response.json();
  }
}

module.exports = UsersController;
