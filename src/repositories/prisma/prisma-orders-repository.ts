import { OrderStatus, type Orders } from "@prisma/client";
import type { OrdersRepository } from "../orders-repository";
import { prisma } from "../../lib/prisma-client";

export class PrismaOrdersRepository implements OrdersRepository {
  updateStatus(orderId: string, status: OrderStatus): Promise<Orders> {
    throw new Error("Method not implemented.");
  }
  updatedStatus(): Promise<Orders> {
    throw new Error("Method not implemented.");
  }
  findById(id: string): Promise<Orders | null> {
    throw new Error("Method not implemented.");
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
