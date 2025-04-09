import type { OrderItem, Prisma } from "@prisma/client";

export interface OrdersItemsRepository {
  create(data: Prisma.OrderItemCreateManyInput): Promise<OrderItem>;
}
