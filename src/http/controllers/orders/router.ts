import type { Application } from "express";
import { CreateOrdersController } from "./create-orders.controller";
import { UpdateOrdersStatusController } from "./update-orders-status.controller";

export function ordersRouter(app: Application) {
  const createOrdersController = new CreateOrdersController();
  const updateOrdersStatusController = new UpdateOrdersStatusController();

  app.post(
    "/orders",
    createOrdersController.create.bind(createOrdersController)
  );

  app.patch(
    "/orders/status",
    updateOrdersStatusController.update.bind(updateOrdersStatusController)
  );
}
