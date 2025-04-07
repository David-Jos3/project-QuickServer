
import type { MenuItem, Prisma } from "@prisma/client";

export interface MenuItemsRepository {
  save(data: Prisma.MenuItemCreateManyInput): Promise<MenuItem>
}