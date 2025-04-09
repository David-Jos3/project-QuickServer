import type { OrdersItemsRepository } from "../orders-items-repository"
import type { OrderItem } from "@prisma/client"
import { prisma } from "../../lib/prisma-client"

export class PrismaOrdersItemsRepository implements OrdersItemsRepository {
  async create(data: OrderItem): Promise<OrderItem> {
    return await prisma.orderItem.create({
      data
    })
  }
}