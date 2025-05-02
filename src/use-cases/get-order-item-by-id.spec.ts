import { InMemoryOrdersItemsRepository } from "../../test/repositories/in-memory-orders-items-repository";
import { CreateOrdersItemsUseCase } from "./create-orders-items";
import { GetOrderItemByIdUseCase } from "./get-order-item-by-id";

let inMemoryOrdersItemsRepository: InMemoryOrdersItemsRepository;
let getOrderItemByIdUseCase: GetOrderItemByIdUseCase;
let createOrdersItemsUseCase: CreateOrdersItemsUseCase;

describe("Get order Item By Id", () => {
  beforeEach(() => {
    inMemoryOrdersItemsRepository = new InMemoryOrdersItemsRepository();
    createOrdersItemsUseCase = new CreateOrdersItemsUseCase(
      inMemoryOrdersItemsRepository
    );
    getOrderItemByIdUseCase = new GetOrderItemByIdUseCase(
      inMemoryOrdersItemsRepository
    );
  });

  test("should be able to get a order item by id", async () => {
    const { orderItem } = await createOrdersItemsUseCase.execute({
      itemId: "item-fake-id",
      orderId: "order-fake-id",
      quantity: 2,
    });

    const result = await getOrderItemByIdUseCase.execute({
      orderItemId: orderItem.id,
    });

    expect(result.orderItem).toEqual(orderItem);
  });
});
