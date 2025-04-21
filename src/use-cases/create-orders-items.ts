import type { OrdersItemsRepository } from "../repositories/orders-items-repository";
import type { OrderItem } from "@prisma/client";

interface CreateOrdersItemsUseCaseRequest {
  orderId: string;
  itemId: string;
  quantity: number;
}

interface CreateOrdersItemsUseCaseResponse {
  orderItem: OrderItem;
}

export class CreateOrdersItemsUseCase {
  constructor(private ordersItemsRepository: OrdersItemsRepository) {}

  async execute({
    itemId,
    orderId,
    quantity,
  }: CreateOrdersItemsUseCaseRequest): Promise<CreateOrdersItemsUseCaseResponse> {
    const orderItem = await this.ordersItemsRepository.create({
      itemId,
      orderId,
      quantity,
    });

    return { orderItem };
  }
}
