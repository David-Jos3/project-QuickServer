import { InMemoryOrdersRepository } from "../../test/repositories/in-memory-orders-repository";
import { GetOrderByIdUseCase } from "./get-order-by-id";
import { CreateOrdersUseCase } from "./create-orders";

let inMemoryOrdersRepository: InMemoryOrdersRepository;
let getOrderByIdUseCase: GetOrderByIdUseCase;
let createOrdersUseCase: CreateOrdersUseCase;

describe("Get Order By Id Use Case", () => {
  beforeEach(() => {
    inMemoryOrdersRepository = new InMemoryOrdersRepository();
    createOrdersUseCase = new CreateOrdersUseCase(inMemoryOrdersRepository);
    getOrderByIdUseCase = new GetOrderByIdUseCase(inMemoryOrdersRepository);
  });

  test("should be able to get an order  by id", async () => {
    const { order } = await createOrdersUseCase.execute({
      cashierId: "cashier-fake-id",
      customerName: "customer-fake-name",
    });

    const result = await getOrderByIdUseCase.execute({
      orderId: order.id,
    });

    expect(result.order.id).toEqual(order.id);
  });
});
