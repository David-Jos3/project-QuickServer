import { InMemoryOrdersItemsRepository } from "../../test/repositories/in-memory-order-item-repository";
import { OrdersItemsUseCase } from "./orders-items";

let inMemoryOrdersItemRepository: InMemoryOrdersItemsRepository;
let ordersItemsUseCase: OrdersItemsUseCase;

describe("Orders Items Use Case", () => {
  beforeEach(() => {
    inMemoryOrdersItemRepository = new InMemoryOrdersItemsRepository();
    ordersItemsUseCase = new OrdersItemsUseCase(inMemoryOrdersItemRepository);
  });

  test("Should be able to create orders items", async () => {
    const { orderItem } = await ordersItemsUseCase.execute({
      itemId: "item-fake-id",
      orderId: "order-fake-id",
      quantity: 2,
    });

    expect(orderItem.id).toEqual(expect.any(String));
    expect(orderItem.quantity).toBe(2);
  });
});
