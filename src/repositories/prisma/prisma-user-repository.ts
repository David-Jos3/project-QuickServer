import type { Users } from "@prisma/client";
import type { UsersRepository } from "../user-repository";
import { prisma } from "../../lib/prisma-client";

export class PrismaUserRepository implements UsersRepository {
  async create(data: Users): Promise<Users> {
    return await prisma.users.create({
      data,
    });
  }
}
