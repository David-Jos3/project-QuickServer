import type { Orders, OrderStatus, Prisma } from "@prisma/client";
import type { OrdersRepository } from "../../src/repositories/orders-repository";
import { randomUUID } from "node:crypto";

export class InMemoryOrdersRepository implements OrdersRepository {
  public orders: Orders[] = [];

  async create(data: Prisma.OrdersCreateManyInput): Promise<Orders> {
    const order = {
      id: data.id ?? randomUUID(),
      status: data.status as OrderStatus,
      customerName: data.customerName,
      cashierId: data.cashierId ?? randomUUID(),
      createdAt: new Date(),
    };

    this.orders.push(order);
    return order;
  }

  async updateStatus(orderId: string, status: OrderStatus): Promise<Orders> {
    const indexOrder = this.orders.findIndex((order) => order.id === orderId);

    this.orders[indexOrder] = {
      ...this.orders[indexOrder],
      status,
    };

    return this.orders[indexOrder];
  }

  async findById(id: string): Promise<Orders | null> {
    const order = this.orders.find((order) => order.id === id);

    if (!order) {
      return null;
    }

    return order;
  }
}
