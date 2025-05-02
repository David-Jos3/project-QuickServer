import type { OrdersRepository } from "@/repositories/orders-repository";
import type { Orders } from "@prisma/client";
import { OrderNotFoundError } from "./errors/order-not-found-error";

interface GetOrderByIdUseCaseRequest {
  orderId: string;
}

interface GetOrderByIdUseCaseResponse {
  order: Orders;
}

export class GetOrderByIdUseCase {
  constructor(private ordersRepository: OrdersRepository) {}

  async execute({
    orderId,
  }: GetOrderByIdUseCaseRequest): Promise<GetOrderByIdUseCaseResponse> {
    const order = await this.ordersRepository.findById(orderId);

    if (!order) {
      throw new OrderNotFoundError();
    }

    return { order };
  }
}
