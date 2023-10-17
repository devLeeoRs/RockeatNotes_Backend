const AppError = require("../utils/AppError");
const { hash, compare } = require("bcryptjs");

class UserUpdateService {
  constructor(UserRepository) {
    this.UserRepository = UserRepository;
  }

  async execute({ name, email, password, old_password, user_id }) {
    const user = await this.UserRepository.findById(user_id);

    if (!user) {
      throw new AppError("Usuario nao existe");
    }

    const userWithUpdateEmail = await this.UserRepository.findByEmail(email);

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
      const userCheckPassword = await compare(old_password, user.password);

      if (!userCheckPassword) {
        throw new AppError("A senha antiga é invalida ");
      }

      user.password = await hash(password, 8);
    }

    await this.UserRepository.update({ user });

    return user;
  }
}

module.exports = UserUpdateService;
