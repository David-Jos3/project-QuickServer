import type { OrdersRepository } from "@/repositories/orders-repository";
import { OrderNotFoundError } from "./errors/order-not-found-error";
import { CannotCancelOrderError } from "./errors/cannot-cancel-order-error";

interface CancelOrderUseCaseRequest {
  orderId: string;
}

export class CancelOrderUseCase {
  constructor(private ordersRepository: OrdersRepository) {}

  async execute({ orderId }: CancelOrderUseCaseRequest): Promise<void> {
    const order = await this.ordersRepository.findById(orderId);

    if (!order) {
      throw new OrderNotFoundError();
    }

    if (order.status !== "PENDING") {
      throw new CannotCancelOrderError();
    }

    await this.ordersRepository.updatedStatus(orderId, "CANCELED");
  }
}
