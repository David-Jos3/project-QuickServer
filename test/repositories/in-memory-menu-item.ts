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
      createdAt: new Date(),
      updatedAt: new Date(),
      image: data.image ?? null,
    };

    this.menuItem.push(menuItems);
    return menuItems;
  }

  async findAll(): Promise<MenuItem[]> {
    return this.menuItem;
  }
  async findById(menuId: string): Promise<MenuItem | null> {
    const menuItem = this.menuItem.find((menu) => menu.id === menuId);

    if (!menuItem) {
      return null;
    }

    return menuItem;
  }

  async update(data: MenuItem): Promise<MenuItem> {
    const index = this.menuItem.findIndex((item) => item.id === data.id);

    if (index === -1) {
      throw new Error("Menu item not found");
    }

    this.menuItem[index] = {
      ...this.menuItem[index],
      ...data,
    };

    return this.menuItem[index];
  }

  async delete(menuId: string): Promise<void> {
    this.menuItem = this.menuItem.filter((menu) => menu.id !== menuId);
  }
}
