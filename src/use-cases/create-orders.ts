import type { OrdersRepository } from "../repositories/orders-repository";
import { type Orders, OrderStatus } from "@prisma/client";

interface CreateOrderUseCaseRequest {
  cashierId: string;
  customerName: string;
}

interface CreateOrderResponse {
  order: Orders;
}

export class CreateOrdersUseCase {
  constructor(private ordersRepository: OrdersRepository) {}

  async execute({
    cashierId,
    customerName,
  }: CreateOrderUseCaseRequest): Promise<CreateOrderResponse> {
    const order = await this.ordersRepository.create({
      cashierId,
      customerName,
      status: OrderStatus.PENDING,
    });

    return { order };
  }
}
