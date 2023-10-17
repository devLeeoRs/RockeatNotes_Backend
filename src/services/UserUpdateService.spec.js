const UserUpdateService = require("./UserUpdateService");
const UserRepositoryInMemory = require("../repositories/UserRepositoryInMemory");

describe("UserUpdateService", () => {
  let userRepositoryInMemory = null;
  let userUpdateService = null;
  beforeEach(() => {
    userRepositoryInMemory = new UserRepositoryInMemory();
    userUpdateService = new UserUpdateService(userRepositoryInMemory);
  });

  it("check if there is a user ", async () => {
    const user1 = {
      name: "test",
      email: "test@email.com",
      password: "12345",
    };

    userCreated = await userRepositoryInMemory.create(user1);

    const userUpdate = {
      user_id: userCreated.id,
      name: "teste",
      email: "test@email.com",
      password: "123456",
      old_password: "12345",
    };

    await userUpdateService.execute(userUpdate);

    expect(userCreated).not.toEqual(user1);
  });
});
