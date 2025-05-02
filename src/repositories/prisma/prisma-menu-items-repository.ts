import type { MenuItemsRepository } from "../menu-items-repository";
import { prisma } from "../../lib/prisma-client";
import type { MenuItem, Prisma } from "@prisma/client";

export class PrismaMenuItemsRepository implements MenuItemsRepository {
  async findAll(): Promise<MenuItem[]> {
    const menuItems = await prisma.menuItem.findMany({
      orderBy: { createdAt: "desc" },
      include: { OrderItem: true },
    });

    return menuItems;
  }
  async findById(menuId: string): Promise<MenuItem | null> {
    const menuItem = await prisma.menuItem.findUnique({
      where: { id: menuId },
      include: { OrderItem: true },
    });

    if (!menuItem) {
      return null;
    }
    return menuItem;
  }
  async update(menuItem: MenuItem): Promise<MenuItem> {
    const { id, ...data } = menuItem;

    return await prisma.menuItem.update({
      where: { id },
      data: {
        ...data,
      },
    });
  }

  async delete(menuId: string): Promise<void> {
    await prisma.menuItem.delete({
      where: { id: menuId },
    });
  }

  async create(data: MenuItem): Promise<MenuItem> {
    return await prisma.menuItem.create({
      data,
    });
  }
}
