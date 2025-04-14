import type { Orders, OrderStatus } from "@prisma/client";
import type { OrdersRepository } from "../repositories/orders-repository";

interface ListOrdersUseCaseResponse {
  orders: Orders[];
}

export class ListOrdersUseCase {
  constructor(private ordersRepository: OrdersRepository) {}

  async execute(): Promise<ListOrdersUseCaseResponse> {
    const orders = await this.ordersRepository.findAll();

    return { orders };
  }
}
