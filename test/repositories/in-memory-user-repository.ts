import type { Prisma, Users } from "@prisma/client";
import type { UsersRepository } from "../../src/repositories/user-repository";
import { randomUUID } from "node:crypto";

export class InMemoryUserRepository implements UsersRepository {
  public users: Users[] = [];

  async create(data: Prisma.UsersCreateInput): Promise<Users> {
    const user = {
      id: data.id ?? randomUUID(),
      name: data.name,
      email: data.email,
      password: data.password,
      role: data.role,
      createdAt: new Date(),
    };

    this.users.push(user);
    return user;
  }
}
