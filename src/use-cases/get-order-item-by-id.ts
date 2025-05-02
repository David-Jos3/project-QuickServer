import type { OrdersItemsRepository } from "@/repositories/orders-items-repository";
import type { OrderItem } from "@prisma/client";

interface GetOrderItemByIdUseCaseRequest {
  orderItemId: string;
}

interface GetOrderItemByIdUseCaseResponse {
  orderItem: OrderItem;
}

export class GetOrderItemByIdUseCase {
  constructor(private ordersItemsRepository: OrdersItemsRepository) {}

  async execute({
    orderItemId,
  }: GetOrderItemByIdUseCaseRequest): Promise<GetOrderItemByIdUseCaseResponse> {
    const orderItem = await this.ordersItemsRepository.findById(orderItemId);

    if (!orderItem) {
      throw new Error("Order not found");
    }

    return { orderItem };
  }
}
