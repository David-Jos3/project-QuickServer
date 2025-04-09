import type { MenuItem, Prisma } from "@prisma/client";

export interface MenuItemsRepository {
  create(data: Prisma.MenuItemCreateManyInput): Promise<MenuItem>;
}
