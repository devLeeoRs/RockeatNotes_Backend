const { hash } = require("bcryptjs");

class UserRepositoryInMemory {
  data = [];

  async create({ name, email, password }) {
    const hashedPassword = await hash(password, 8);

    const user = {
      id: Math.floor(Math.random() * 1000) + 1,
      name,
      email,
      password: hashedPassword,
    };

    this.data.push(user);
    return user;
  }

  async findByEmail(email) {
    return this.data.find((user) => user.email === email);
  }

  async findById(id) {
    const user = this.data.find((user) => user.id === id);
    return user;
  }

  async update({ user }) {
    const index = this.data.findIndex((u) => u.id === user.id);

    if (index !== -1) {
      this.data.splice(index, 1, user);
    }

    return user;
  }
}

module.exports = UserRepositoryInMemory;
