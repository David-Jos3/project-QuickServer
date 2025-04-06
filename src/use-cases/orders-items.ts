import type { OrdersItemsRepository } from '../repositories/orders-items-repositories';
import type { OrderItem } from '@prisma/client';


interface OrdersItemsUseCaseRequest {
  orderId: string;
  itemId: string;
  quantity: number;
}

interface OrdersItemsUseCaseResponse {
  orderItem: OrderItem
}


export class OrdersItemsUseCase {
  constructor(private ordersItemsRepository: OrdersItemsRepository) {}

  async execute({itemId, orderId, quantity}: OrdersItemsUseCaseRequest): Promise<OrdersItemsUseCaseResponse> {
    const orderItem = await this.ordersItemsRepository.save({
      itemId,
      orderId,
      quantity,
    });

    return { orderItem };
  }
}