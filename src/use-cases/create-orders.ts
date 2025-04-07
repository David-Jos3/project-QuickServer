import type { OrdersRepository } from '../repositories/orders-repository';
import type { Orders, OrderStatus } from '@prisma/client';


interface CreateOrderUseCaseRequest {
  cashierId: string;
  customerName: string;
  status: OrderStatus;
}

interface CreateOrderResponse {
  order: Orders;
}


export class CreateOrdersUseCase {
  constructor(private ordersRepository: OrdersRepository) {}

  async execute({ cashierId, customerName, status }: CreateOrderUseCaseRequest): Promise<CreateOrderResponse> {
    const order = await this.ordersRepository.save({
     cashierId,
     customerName,
     status,
    });

    return { order };
  }
}