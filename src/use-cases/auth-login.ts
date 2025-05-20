import type { UsersRepository } from "@/repositories/user-repository";
import type { Users } from "@prisma/client";
import bcrypt from "bcrypt";
import { InvalidCredentialsError } from "./errors/invalid-credential-error";

interface AuthLoginUseCaseRequest {
  username: string;
  password: string;
}

interface AuthLoginUseCaseResponse {
  user: Users;
}

export class AuthLoginUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    username,
    password,
  }: AuthLoginUseCaseRequest): Promise<AuthLoginUseCaseResponse> {
    const user = await this.usersRepository.findByUserName(username);

    if (!user) {
      throw new InvalidCredentialsError();
    }

    const comparePassword = await bcrypt.compare(password, user.password);

    if (!comparePassword) {
      throw new InvalidCredentialsError();
    }

    return { user };
  }
}
