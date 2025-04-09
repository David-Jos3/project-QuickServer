import type { OrderItem, Prisma } from "@prisma/client";
import type { OrdersItemsRepository } from "../../src/repositories/orders-items-repository";
import { randomUUID } from "node:crypto";

export class InMemoryOrdersItemsRepository implements OrdersItemsRepository {
  public ordersItems: OrderItem[] = [];

  async create(data: Prisma.OrderItemCreateManyInput): Promise<OrderItem> {
    const ordersItems = {
      id: data.id ?? randomUUID(),
      orderId: data.itemId,
      itemId: data.itemId,
      quantity: data.quantity,
    };

    this.ordersItems.push(ordersItems);

    return ordersItems;
  }
}
