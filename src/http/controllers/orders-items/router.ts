import type { Application } from "express";
import { CreateOrdersItemsController } from "./create-orders-items.controller";
import { ListOrderItemsController } from "./list-order-items.controller";
import { GetOrderItemsByIdController } from "./get-order-items-by-id.controller";
import { RemoveItemFromOrderController } from "./remove-item-from-order.controller";

export function ordersItemsRouter(app: Application) {
  const createOrdersItemsController = new CreateOrdersItemsController();
  const listOrdersItemsController = new ListOrderItemsController();
  const getOrderItemsByIdController = new GetOrderItemsByIdController();
  const removeItemFromOrderController = new RemoveItemFromOrderController();

  app.post(
    "/orders-item",
    createOrdersItemsController.handle.bind(createOrdersItemsController)
  );

  app.get(
    "/orders-items",
    listOrdersItemsController.handle.bind(listOrdersItemsController)
  );

  app.get(
    "/orders-items/:orderItemId",
    getOrderItemsByIdController.handle.bind(getOrderItemsByIdController)
  );

  app.delete(
    "/orders/items/:itemId",
    removeItemFromOrderController.handle.bind(removeItemFromOrderController)
  );
}
