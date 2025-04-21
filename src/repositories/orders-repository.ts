import type { Orders, OrderStatus, Prisma } from "@prisma/client";

export interface OrdersRepository {
  create(data: Prisma.OrdersCreateManyInput): Promise<Orders>;
  findAll(): Promise<Orders[]>;
  updatedStatus(orderId: string, status: OrderStatus): Promise<Orders>;
  findById(id: string): Promise<Orders | null>;
}
