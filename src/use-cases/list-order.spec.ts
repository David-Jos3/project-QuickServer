import { InMemoryOrdersRepository } from "../../test/repositories/in-memory-orders-repository";
import { CreateOrdersUseCase } from "./create-orders";
import { ListOrdersUseCase } from "./list-order";

let inMemoryOrdersRepository: InMemoryOrdersRepository;
let listOrdersUseCase: ListOrdersUseCase;
let createOrdersUseCase: CreateOrdersUseCase;

describe("List Order Use Case", () => {
  beforeEach(() => {
    inMemoryOrdersRepository = new InMemoryOrdersRepository();
    listOrdersUseCase = new ListOrdersUseCase(inMemoryOrdersRepository);
    createOrdersUseCase = new CreateOrdersUseCase(inMemoryOrdersRepository);
  });
  test("must be able to list the orders", async () => {
    const orderOne = await createOrdersUseCase.execute({
      cashierId: "fake-cashier-one-id",
      customerName: "Jonh Doe",
    });

    const orderTwo = await createOrdersUseCase.execute({
      cashierId: "fake-cashier-two-id",
      customerName: "Jonh Doe",
    });

    const { orders } = await listOrdersUseCase.execute();

    expect(orders).toHaveLength(2);

    expect(orders).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ id: orderOne.order.id }),
        expect.objectContaining({ id: orderTwo.order.id }),
      ])
    );
  });
});
