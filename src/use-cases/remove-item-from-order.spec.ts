import { InMemoryOrdersItemsRepository } from "../../test/repositories/in-memory-orders-items-repository";
import { InMemoryOrdersRepository } from "../../test/repositories/in-memory-orders-repository";
import { RemoveItemFromOrderUseCase } from "./remove-item-from-order";
import { CreateOrdersItemsUseCase } from "./create-orders-items";
import { CreateOrdersUseCase } from "./create-orders";

let inMemoryOrderItemsRepository: InMemoryOrdersItemsRepository;
let inMemoryOrdersRepository: InMemoryOrdersRepository;
let removeItemFromOrderUseCase: RemoveItemFromOrderUseCase;
let createOrdersItemsUseCase: CreateOrdersItemsUseCase;
let createOrderUseCase: CreateOrdersUseCase;

describe("Remove item form order Use Case", () => {
  beforeEach(() => {
    inMemoryOrderItemsRepository = new InMemoryOrdersItemsRepository();
    inMemoryOrdersRepository = new InMemoryOrdersRepository();
    removeItemFromOrderUseCase = new RemoveItemFromOrderUseCase(
      inMemoryOrderItemsRepository,
      inMemoryOrdersRepository
    );
    createOrdersItemsUseCase = new CreateOrdersItemsUseCase(
      inMemoryOrderItemsRepository
    );
    createOrderUseCase = new CreateOrdersUseCase(inMemoryOrdersRepository);
  });

  test("should be able to remove an item from an order", async () => {
    const { order } = await createOrderUseCase.execute({
      customerName: "John Doe",
      cashierId: "id-test",
    });
    const { orderItem } = await createOrdersItemsUseCase.execute({
      orderId: order.id,
      itemId: "item-id-test",
      quantity: 2,
    });

    const removeOrderItem = await removeItemFromOrderUseCase.execute({
      itemId: orderItem.id,
    });
    expect(removeOrderItem).toBeUndefined();
  });
});
