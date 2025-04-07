import  type { Prisma, Users } from "@prisma/client";

export interface UsersRepository {
  create(user: Prisma.UsersCreateManyInput): Promise<Users>;
}