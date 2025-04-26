import { PrismaMenuItemsRepository } from "../../../repositories/prisma/prisma-menu-items-repository";
import { ListMenuItemUseCase } from "./../../../use-cases/list-menu-item";
import type { Request, Response } from "express";

export class GetMenuItemController {
  async handle(request: Request, response: Response) {
    try {
      const prismaMenuItemRepository = new PrismaMenuItemsRepository();
      const listMenuItemUseCase = new ListMenuItemUseCase(
        prismaMenuItemRepository
      );
      const { menuItems } = await listMenuItemUseCase.execute();
      response.status(200).json({ menuItems });
    } catch (error) {
      response.status(500).send({
        message: "Internal server error",
        error: error,
      });
    }
  }
}
