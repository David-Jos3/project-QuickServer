import type { OrdersRepository } from "@/repositories/orders-repository";
import type { OrdersItemsRepository } from "@/repositories/orders-items-repository";

interface RemoveItemFromOrderUseCaseRequest {
  itemId: string;
}

export class RemoveItemFromOrderUseCase {
  constructor(
    private orderItemsRepository: OrdersItemsRepository,
    private orderRepository: OrdersRepository
  ) {}

  async execute({ itemId }: RemoveItemFromOrderUseCaseRequest): Promise<void> {
    const orderItem = await this.orderItemsRepository.findById(itemId);

    if (!orderItem) {
      throw new Error("Order item not found");
    }
    const order = await this.orderRepository.findById(orderItem.orderId);

    if (!order) {
      throw new Error("Order not found");
    }

    if (order.status !== "PENDING") {
      throw new Error("Order is not in a removable state");
    }

    await this.orderItemsRepository.delete(itemId);
  }
}
