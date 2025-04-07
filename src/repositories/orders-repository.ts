import type { Orders, OrderStatus, Prisma } from "@prisma/client";


export interface OrdersRepository {
  save(data: Prisma.OrdersCreateManyInput): Promise<Orders>;
  updateStatus(orderId: string, status: OrderStatus):Promise<Orders>;
  findById(id: string): Promise<Orders | null>;
}