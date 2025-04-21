import { InMemoryOrdersItemsRepository } from "../../test/repositories/in-memory-order-item-repository";
import { CreateOrdersItemsUseCase } from "./create-orders-items";

let inMemoryOrdersItemRepository: InMemoryOrdersItemsRepository;
let createOrdersItemsUseCase: CreateOrdersItemsUseCase;

describe("Orders Items Use Case", () => {
  beforeEach(() => {
    inMemoryOrdersItemRepository = new InMemoryOrdersItemsRepository();
    createOrdersItemsUseCase = new CreateOrdersItemsUseCase(
      inMemoryOrdersItemRepository
    );
  });

  test("Should be able to create orders items", async () => {
    const { orderItem } = await createOrdersItemsUseCase.execute({
      itemId: "item-fake-id",
      orderId: "order-fake-id",
      quantity: 2,
    });

    expect(orderItem.id).toEqual(expect.any(String));
    expect(orderItem.quantity).toBe(2);
  });
});
