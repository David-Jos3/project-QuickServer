import type { Users } from "@prisma/client";
import type { UsersRepository } from "../user-repository";
import { prisma } from "../../lib/prisma-client";

export class PrismaUserRepository implements UsersRepository {
  async findByUserName(username: string): Promise<Users | null> {
    const user = await prisma.users.findUnique({
      where: { username: username },
    });

    return user ?? null;
  }
  async findByEmail(email: string): Promise<Users | null> {
    const user = await prisma.users.findUnique({
      where: { email: email },
    });

    return user ?? null;
  }
  async create(data: Users): Promise<Users> {
    return await prisma.users.create({
      data,
    });
  }
}
