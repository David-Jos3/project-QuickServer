import { InMemoryOrdersRepository } from "../../test/repositories/in-memory-orders-repository";
import { CreateOrdersUseCase } from "./create-orders";
import { UpdateOrderStatusUseCase } from "./update-order-status";

let inMemoryOrdersRepository: InMemoryOrdersRepository;
let updateOrderStatusUseCase: UpdateOrderStatusUseCase;
let createOrdersUseCase: CreateOrdersUseCase;

describe("Update Order Status Use Case", () => {
  beforeEach(() => {
    inMemoryOrdersRepository = new InMemoryOrdersRepository();
    updateOrderStatusUseCase = new UpdateOrderStatusUseCase(
      inMemoryOrdersRepository
    );
    createOrdersUseCase = new CreateOrdersUseCase(inMemoryOrdersRepository);
  });

  test("should update the order status successfully", async () => {
    const { order } = await createOrdersUseCase.execute({
      cashierId: "fake-cashier-id",
      customerName: "John Doe",
    });

    const orderStatus = await updateOrderStatusUseCase.execute({
      orderId: order.id,
      status: "IN_PROGRESS",
      userRole: "Cozinha",
    });
    expect(orderStatus.order).toMatchObject({
      id: order.id,
      status: "IN_PROGRESS",
    });
  });

  test("should throw an error if the order does not exist", async () => {
    await expect(
      updateOrderStatusUseCase.execute({
        orderId: "order-fake-id",
        status: "IN_PROGRESS",
        userRole: "Cozinha",
      })
    ).rejects.toThrow(new Error("Pedido não encontrado"));
  });

  test("should throw an error if a non-Kitchen user tries to update the order to 'IN_PROGRESS' or 'READY'", async () => {
    const { order } = await createOrdersUseCase.execute({
      cashierId: "fake-cashier-id",
      customerName: "John Doe",
    });

    await expect(
      updateOrderStatusUseCase.execute({
        orderId: order.id,
        status: "IN_PROGRESS",
        userRole: "Caixa",
      })
    ).rejects.toThrow(
      new Error("Apenas a cozinha pode mover o pedido para 'IN_PROGRESS'")
    );
  });

  test("should throw an error if a non-Cashier user tries to update the order to 'COMPLETED'", async () => {
    const { order } = await createOrdersUseCase.execute({
      cashierId: "fake-cashier-id",
      customerName: "John Doe",
    });

    await updateOrderStatusUseCase.execute({
      orderId: order.id,
      status: "IN_PROGRESS",
      userRole: "Cozinha",
    });

    await updateOrderStatusUseCase.execute({
      orderId: order.id,
      status: "READY",
      userRole: "Cozinha",
    });

    await expect(
      updateOrderStatusUseCase.execute({
        orderId: order.id,
        status: "COMPLETED",
        userRole: "Cozinha",
      })
    ).rejects.toThrow(new Error("Apenas o caixa pode completar o pedido"));
  });

  test("should throw an error when a Kitchen user tries to complete an order", async () => {
    const { order } = await createOrdersUseCase.execute({
      cashierId: "fake-cashier-id",
      customerName: "John Doe",
    });

    await updateOrderStatusUseCase.execute({
      orderId: order.id,
      status: "IN_PROGRESS",
      userRole: "Cozinha",
    });

    await expect(
      updateOrderStatusUseCase.execute({
        orderId: order.id,
        status: "COMPLETED",
        userRole: "Cozinha",
      })
    ).rejects.toThrow(new Error("Apenas o caixa pode completar o pedido"));
  });
});
