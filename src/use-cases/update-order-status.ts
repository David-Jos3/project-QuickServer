// biome-ignore lint/style/useImportType: <explanation>
import { Orders, OrderStatus, UserRoles } from "@prisma/client";
import type { OrdersRepository } from "../repositories/orders-repository";

interface UpdateOrderStatusUseCaseRequest {
  orderId: string;
  status: OrderStatus;
  userRole: UserRoles;
}

interface UpdateOrderStatusUseCaseResponse {
  order: Orders;
}

export class UpdateOrderStatusUseCase {
  constructor(private ordersRepository: OrdersRepository) {}

  async execute({
    orderId,
    status,
    userRole,
  }: UpdateOrderStatusUseCaseRequest): Promise<UpdateOrderStatusUseCaseResponse> {
    const orderExists = await this.ordersRepository.findById(orderId);

    if (!orderExists) {
      throw new Error("Pedido não encontrado");
    }

    if (status === OrderStatus.IN_PROGRESS && userRole !== UserRoles.Cozinha) {
      throw new Error(
        "Apenas a cozinha pode mover o pedido para 'IN_PROGRESS'"
      );
    }

    if (status === OrderStatus.READY && userRole !== UserRoles.Cozinha) {
      throw new Error("Apenas a cozinha pode mover o pedido para 'READY'");
    }

    if (status === OrderStatus.COMPLETED && userRole !== UserRoles.Caixa) {
      throw new Error("Apenas o caixa pode completar o pedido");
    }

    const allowedTransitions: Record<OrderStatus, OrderStatus> = {
      PENDING: OrderStatus.IN_PROGRESS,
      IN_PROGRESS: OrderStatus.READY,
      READY: OrderStatus.COMPLETED,
      COMPLETED: OrderStatus.COMPLETED,
      CANCELED: OrderStatus.CANCELED,
    };
    const allowedStatus = allowedTransitions[orderExists.status];

    if (allowedStatus !== status) {
      throw new Error(
        "Status inválido, não foi  possível atualizar o status do pedido"
      );
    }

    const order = await this.ordersRepository.updateStatus(orderId, status);

    return { order };
  }
}
