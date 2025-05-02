import { GetOrderByIdController } from "./get-order-by-id.controller";
import type { Application } from "express";
import { CreateOrdersController } from "./create-orders.controller";
import { UpdateOrdersStatusController } from "./update-orders-status.controller";
import { GetOrdersController } from "./get-orders.controller";

export async function ordersRouter(app: Application) {
  const createOrdersController = new CreateOrdersController();
  const updateOrdersStatusController = new UpdateOrdersStatusController();
  const getOrdersController = new GetOrdersController();
  const getOrderByIdController = new GetOrderByIdController();

  app.post(
    "/orders",
    createOrdersController.handle.bind(createOrdersController)
  );

  app.patch(
    "/orders/status/:orderId",
    updateOrdersStatusController.handle.bind(updateOrdersStatusController)
  );

  app.get("/orders", getOrdersController.handle.bind(getOrdersController));

  app.get(
    "/orders/:orderId",
    getOrderByIdController.handle.bind(getOrdersController)
  );
}
