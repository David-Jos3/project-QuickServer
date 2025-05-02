import type { OrdersItemsRepository } from "../orders-items-repository";
import type { OrderItem } from "@prisma/client";
import { prisma } from "../../lib/prisma-client";

export class PrismaOrdersItemsRepository implements OrdersItemsRepository {
  async create(data: OrderItem): Promise<OrderItem> {
    return await prisma.orderItem.create({
      data,
    });
  }

  async findById(id: string): Promise<OrderItem | null> {
    return await prisma.orderItem.findUnique({
      where: {
        id,
      },
      include: { order: true, item: true },
    });
  }
  async delete(itemId: string): Promise<void> {
    await prisma.orderItem.delete({
      where: {
        id: itemId,
      },
    });
  }

  async list(): Promise<OrderItem[]> {
    return await prisma.orderItem.findMany({
      include: { order: true, item: true },
    });
  }
}
