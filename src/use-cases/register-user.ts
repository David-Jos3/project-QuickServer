import type { UserRoles, Users } from "@prisma/client";
import bcrypt from "bcrypt";
import type { UsersRepository } from "../repositories/user-repository";
import { InvalidCredentialsError } from "./errors/invalid-credential-error";

interface RegisterUserUseCaseRequest {
  name: string;
  username: string;
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
    username,
    email,
    password,
    userRoles,
  }: RegisterUserUseCaseRequest): Promise<RegisterUserUseCaseResponse> {
    const emailExist = await this.usersRepository.findByEmail(email);

    if (emailExist) {
      throw new InvalidCredentialsError();
    }

    const userNameExist = await this.usersRepository.findByUserName(username);

    if (userNameExist) {
      throw new InvalidCredentialsError();
    }

    const hashedPassword = await bcrypt.hash(password, 8);

    const user = await this.usersRepository.create({
      name,
      username,
      email,
      password: hashedPassword,
      role: userRoles,
    });

    return { user };
  }
}
