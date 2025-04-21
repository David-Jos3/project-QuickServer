import type { UserRoles, Users } from "@prisma/client";
import type { UsersRepository } from "../repositories/user-repository";

interface RegisterUserUseCaseRequest {
  name: string;
  email: string;
  password: string;
  userRoles: UserRoles;
}

interface RegisterUserUseCaseResponse {
  user: Users;
}

export class RegisterUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    name,
    email,
    password,
    userRoles,
  }: RegisterUserUseCaseRequest): Promise<RegisterUserUseCaseResponse> {
    const user = await this.usersRepository.create({
      name,
      email,
      password,
      role: userRoles,
    });

    return { user };
  }
}
