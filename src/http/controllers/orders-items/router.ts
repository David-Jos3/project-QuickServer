import type { Application } from "express";
import { CreateOrdersItemsController } from "./create-orders-items.controller";

export function ordersItemsRouter(app: Application) {
  const createOrdersItemsController = new CreateOrdersItemsController();
  app.post(
    "/orders-items",
    createOrdersItemsController.create.bind(createOrdersItemsController)
  );
}
