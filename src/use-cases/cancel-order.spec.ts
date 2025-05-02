import { InMemoryOrdersRepository } from "../../test/repositories/in-memory-orders-repository";
import { CancelOrderUseCase } from "./cancel-order";
import { CreateOrdersUseCase } from "./create-orders";
import { CannotCancelOrderError } from "./errors/cannot-cancel-order-error";
import { OrderNotFoundError } from "./errors/order-not-found-error";
import { UpdateOrderStatusUseCase } from "./update-order-status";

let inMemoryOrdersRepository: InMemoryOrdersRepository;
let cancelOrderUseCase: CancelOrderUseCase;
let createOrdersUseCase: CreateOrdersUseCase;
let updateOrdersStatusUseCase: UpdateOrderStatusUseCase;

describe("Cancel Order Use Case", () => {
  beforeEach(() => {
    inMemoryOrdersRepository = new InMemoryOrdersRepository();
    createOrdersUseCase = new CreateOrdersUseCase(inMemoryOrdersRepository);
    cancelOrderUseCase = new CancelOrderUseCase(inMemoryOrdersRepository);
    updateOrdersStatusUseCase = new UpdateOrderStatusUseCase(
      inMemoryOrdersRepository
    );
  });
  test("should be able to cancel a order", async () => {
    const { order } = await createOrdersUseCase.execute({
      cashierId: "cashier-1",
      customerName: "John Doe",
    });

    await cancelOrderUseCase.execute({
      orderId: order.id,
    });
    expect(inMemoryOrdersRepository.orders[0].status).toEqual("CANCELED");
  });

  test("should return an error when trying to cancel an order that is not in 'pending' status", async () => {
    const { order } = await createOrdersUseCase.execute({
      cashierId: "cashier-1",
      customerName: "John Doe",
    });

    await updateOrdersStatusUseCase.execute({
      orderId: order.id,
      status: "IN_PROGRESS",
      userRole: "Cozinha",
    });

    expect(
      cancelOrderUseCase.execute({
        orderId: order.id,
      })
    ).rejects.toThrow(CannotCancelOrderError);
  });

  test("should return an error when trying to cancel an order that does not exist", async () => {
    expect(
      cancelOrderUseCase.execute({
        orderId: "non-existing-order-id",
      })
    ).rejects.toThrow(OrderNotFoundError);
  });
});
