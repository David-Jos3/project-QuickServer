import type { Application } from "express";
import { CreateOrdersItemsController } from "./create-orders-items.controller";
import { ListOrderItemsController } from "./list-order-items.controller";
import { GetOrderItemsByIdController } from "./get-order-items-by-id.controller";

export function ordersItemsRouter(app: Application) {
  const createOrdersItemsController = new CreateOrdersItemsController();
  const listOrdersItemsController = new ListOrderItemsController();
  const getOrderItemsByIdController = new GetOrderItemsByIdController();

  app.post(
    "/orders-items",
    createOrdersItemsController.handle.bind(createOrdersItemsController)
  );

  app.get(
    "/orders-items",
    listOrdersItemsController.handle.bind(listOrdersItemsController)
  );

  app.get(
    "/orders-items/:orderId",
    getOrderItemsByIdController.handle.bind(getOrderItemsByIdController)
  );
}
