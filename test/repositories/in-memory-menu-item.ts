import type { MenuItem, Prisma } from "@prisma/client";
import type { MenuItemsRepository } from "../../src/repositories/menu-items-repository";
import { randomUUID } from "node:crypto";

export class InMemoryMenuItemRepository implements MenuItemsRepository {
  public menuItem: MenuItem[] = [];

  async create(data: Prisma.MenuItemCreateManyInput): Promise<MenuItem> {
    const menuItems = {
      id: data.id ?? randomUUID(),
      name: data.name,
      description: data.description ?? null,
      price: data.price,
      image: data.image ?? null,
    };

    this.menuItem.push(menuItems);
    return menuItems;
  }
}
