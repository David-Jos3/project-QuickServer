import { InMemoryUserRepository } from "../../test/repositories/in-memory-user-repository";
import { RegisterUserUseCase } from "./register-user";

let inMemoryUserRepository: InMemoryUserRepository;
let registerUserUseCase: RegisterUserUseCase;

describe("Create user", () => {
  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUserRepository();
    registerUserUseCase = new RegisterUserUseCase(inMemoryUserRepository);
  });

  test("Should be able to create new users", async () => {
    const { user } = await registerUserUseCase.execute({
      email: "davidgomes123@gmail.com",
      name: "David José",
      password: "1234567",
      userRoles: "Cozinha",
    });

    expect(user.id).toEqual(expect.any(String));
  });
});
