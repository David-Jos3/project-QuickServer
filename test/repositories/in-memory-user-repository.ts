import type { Prisma, Users } from "@prisma/client";
import type { UsersRepository } from "../../src/repositories/user-repository";
import { randomUUID } from "node:crypto";

export class InMemoryUserRepository implements UsersRepository {
  public users: Users[] = [];

  async create(data: Prisma.UsersCreateInput): Promise<Users> {
    const user = {
      id: data.id ?? randomUUID(),
      name: data.name,
      username: data.username,
      email: data.email,
      password: data.password,
      role: data.role,
      createdAt: new Date(),
    };

    this.users.push(user);
    return user;
  }

  async findByUserName(username: string): Promise<Users | null> {
    const user = this.users.find((user) => user.username === username);

    return user ?? null;
  }

  async findByEmail(email: string): Promise<Users | null> {
    const user = this.users.find((user) => user.email === email);

    return user ?? null;
  }
}
