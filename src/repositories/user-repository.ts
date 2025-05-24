import type { Prisma, Users } from "@prisma/client";

export interface UsersRepository {
  create(user: Prisma.UsersCreateInput): Promise<Users>;
  findByUserName(username: string): Promise<Users | null>;
  findByEmail(email: string): Promise<Users | null>;
  findById(userId: string): Promise<Users | null>;
  updatePassword(user: string, password: string): Promise<void>;
}
