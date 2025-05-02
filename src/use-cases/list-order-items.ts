import type { OrdersItemsRepository } from "@/repositories/orders-items-repository";

import type { OrderItem } from "@prisma/client";

interface ListOrderItemsUseCaseResponse {
  orderItem: OrderItem[];
}

export class ListOrderItemsUseCase {
  constructor(private ordersItemsRepository: OrdersItemsRepository) {}

  async execute(): Promise<ListOrderItemsUseCaseResponse> {
    const orderItem = await this.ordersItemsRepository.list();

    return { orderItem };
  }
}
