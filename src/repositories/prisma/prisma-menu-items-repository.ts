import type { MenuItemsRepository } from "../menu-items-repository"
import { prisma } from "../../lib/prisma-client"
import type { MenuItem, Prisma } from "@prisma/client"

export class PrismaMenuItemsRepository implements MenuItemsRepository {

  async create(data: MenuItem): Promise<MenuItem> {
   return await prisma.menuItem.create({
      data,
    })
  }
}