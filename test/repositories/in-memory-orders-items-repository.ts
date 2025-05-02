import type { OrderItem, Prisma } from "@prisma/client";
import type { OrdersItemsRepository } from "../../src/repositories/orders-items-repository";
import { randomUUID } from "node:crypto";

export class InMemoryOrdersItemsRepository implements OrdersItemsRepository {
  public ordersItems: OrderItem[] = [];

  async create(data: Prisma.OrderItemCreateManyInput): Promise<OrderItem> {
    const ordersItems = {
      id: data.id ?? randomUUID(),
      orderId: data.orderId,
      itemId: data.itemId,
      quantity: data.quantity,
    };

    this.ordersItems.push(ordersItems);

    return ordersItems;
  }

  async findById(id: string): Promise<OrderItem | null> {
    const orderItem = this.ordersItems.find((item) => item.id === id);

    if (!orderItem) {
      return null;
    }

    return orderItem;
  }

  async delete(itemId: string): Promise<void> {
    this.ordersItems = this.ordersItems.filter((item) => item.id !== itemId);
  }

  async list(): Promise<OrderItem[]> {
    return this.ordersItems;
  }
}
