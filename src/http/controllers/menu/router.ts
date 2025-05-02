import type { Application } from "express";
import { CreateMenuItemController } from "./create-menu-item.controller";
import { GetMenuItemController } from "./get-menu-item.controller";
import { DeleteMenuItemController } from "./delete-menu-item.controller";
import { GetMenuItemByIdController } from "./get-menu-item-by-id.controller";

export function menuItemRouter(app: Application) {
  const createMenuItemController = new CreateMenuItemController();
  const getMenuItemController = new GetMenuItemController();
  const deleteMenuItemController = new DeleteMenuItemController();
  const updateMenuItemController = new CreateMenuItemController();
  const getMenuItemByIdController = new GetMenuItemByIdController();

  app.post(
    "/menu-items",
    createMenuItemController.handle.bind(createMenuItemController)
  );

  app.get(
    "/menu-items",
    getMenuItemController.handle.bind(getMenuItemController)
  );

  app.delete(
    "/menu-items/:menuId",
    deleteMenuItemController.handle.bind(deleteMenuItemController)
  );

  app.put(
    "/menu-items/:menuId",
    updateMenuItemController.handle.bind(updateMenuItemController)
  );

  app.get(
    "/menu-items/:menuId",
    getMenuItemByIdController.handle.bind(getMenuItemByIdController)
  );
}
