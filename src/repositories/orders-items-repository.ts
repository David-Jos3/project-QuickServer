import type { OrderItem, Prisma } from "@prisma/client";

export interface OrdersItemsRepository {
  save(data: Prisma.OrderItemCreateManyInput): Promise<OrderItem>;
}