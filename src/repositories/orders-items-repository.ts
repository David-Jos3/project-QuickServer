import type { OrderItem, Prisma } from "@prisma/client";

export interface OrdersItemsRepository {
  create(data: Prisma.OrderItemCreateManyInput): Promise<OrderItem>;
  findById(id: string): Promise<OrderItem | null>;
  delete(itemId: string): Promise<void>;
  list(): Promise<OrderItem[]>;
}
