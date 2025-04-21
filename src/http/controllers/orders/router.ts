import type { Application } from "express";
import { CreateOrdersController } from "./create-orders.controller";

export function ordersRouter(app: Application) {
  const createOrdersController = new CreateOrdersController();
  app.post(
    "/orders",
    createOrdersController.create.bind(createOrdersController)
  );
}
