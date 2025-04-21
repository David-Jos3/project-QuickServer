import { OrderStatus, type Orders } from "@prisma/client";
import type { OrdersRepository } from "../orders-repository";
import { prisma } from "../../lib/prisma-client";

export class PrismaOrdersRepository implements OrdersRepository {
  async findAll(): Promise<Orders[]> {
    return await prisma.orders.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
  }
  async updatedStatus(orderId: string, status: OrderStatus): Promise<Orders> {
    return await prisma.orders.update({
      where: { id: orderId },
      data: { status },
    });
  }

  async findById(id: string): Promise<Orders | null> {
    const order = await prisma.orders.findUnique({
      where: { id },
    });

    if (!order) {
      return null;
    }

    return order;
  }
  async create(data: Orders): Promise<Orders> {
    return await prisma.orders.create({
      data: {
        ...data,
        status: OrderStatus.PENDING,
      },
    });
  }
}
