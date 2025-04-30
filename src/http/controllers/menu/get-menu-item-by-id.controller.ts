import { PrismaMenuItemsRepository } from "@/repositories/prisma/prisma-menu-items-repository";
import { MenuNotFoundError } from "@/use-cases/errors/menu-not-found-error";
import { GetMenuItemByIdUseCase } from "@/use-cases/get-menu-item-by-id";
import type { Request, Response } from "express";
import { z } from "zod";

const getMenuItemByIdBodySchema = z.object({
  menuId: z.string().uuid(),
});

export class GetMenuItemByIdController {
  async handle(request: Request, response: Response): Promise<void> {
    try {
      const { menuId } = getMenuItemByIdBodySchema.parse(request.params);

      const prismaMenuItemsRepository = new PrismaMenuItemsRepository();
      const getMenuItemByIdUseCase = new GetMenuItemByIdUseCase(
        prismaMenuItemsRepository
      );

      const { menuItem } = await getMenuItemByIdUseCase.execute({ menuId });
      response.status(200).send(menuItem);
    } catch (error) {
      if (error instanceof z.ZodError) {
        response.status(400).send({ message: error.errors });
        return;
      }
      if (error instanceof MenuNotFoundError) {
        response.status(404).send({ message: error.message });
        return;
      }
      response.status(500).send({
        message: "Internal server error",
        error: error,
      });
      return;
    }
  }
}
