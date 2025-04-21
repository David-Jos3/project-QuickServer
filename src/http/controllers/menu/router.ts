import type { Application } from "express";
import { CreateMenuItemController } from "./create-menu-item.controller";

export function menuItemRouter(app: Application) {
  const createMenuItemController = new CreateMenuItemController();

  app.post(
    "/menu-items",
    createMenuItemController.create.bind(createMenuItemController)
  );
}
