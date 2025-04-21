import type { MenuItem, Prisma } from "@prisma/client";

export interface MenuItemsRepository {
  create(data: Prisma.MenuItemCreateManyInput): Promise<MenuItem>;
  findAll(): Promise<MenuItem[]>;
  findById(menuId: string): Promise<MenuItem | null>;
  update(menuItem: MenuItem): Promise<MenuItem>;
  delete(menuId: string): Promise<void>;
}
