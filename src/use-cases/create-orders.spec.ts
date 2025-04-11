import { InMemoryOrdersRepository } from "../../test/repositories/in-memory-orders-repository";
import { CreateOrdersUseCase } from "./create-orders";

let inMemoryOrdersRepository: InMemoryOrdersRepository;
let createOrdersUseCase: CreateOrdersUseCase;

describe("Create new orders Use Case ", () => {
  beforeEach(() => {
    inMemoryOrdersRepository = new InMemoryOrdersRepository();
    createOrdersUseCase = new CreateOrdersUseCase(inMemoryOrdersRepository);
  });

  test("Should be able to create a new order", async () => {
    const { order } = await createOrdersUseCase.execute({
      cashierId: "fake-cashier-id",
      customerName: "Jonh Doe",
    });

    expect(order.cashierId).toBe("fake-cashier-id");
    expect(order.status).toBe("PENDING");
  });
});
