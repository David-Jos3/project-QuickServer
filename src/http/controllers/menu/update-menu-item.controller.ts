import type { Request, Response } from "express";
import { z } from "zod";
import { PrismaMenuItemsRepository } from "../../../repositories/prisma/prisma-menu-items-repository";
import { UpdateMenuItemUseCase } from "../../../use-cases/update-menu-item";
import { MenuNotFoundError } from "../../../use-cases/errors/menu-not-found-error";

const updateMenuItemBodySchema = z.object({
  menuId: z.string().uuid(),
  name: z.string().min(1).max(255),
  description: z.string().min(1).max(255),
  price: z.number().min(0),
  imageUrl: z.string().optional(),
});

export class UpdateMenuItemController {
  async handle(request: Request, response: Response): Promise<void> {
    try {
      const { description, name, price, imageUrl } =
        updateMenuItemBodySchema.parse(request.body);
      const { menuId } = updateMenuItemBodySchema.parse(request.params);

      const menuItemRepository = new PrismaMenuItemsRepository();
      const updateMenuItemUseCase = new UpdateMenuItemUseCase(
        menuItemRepository
      );

      await updateMenuItemUseCase.execute({
        menuId,
        name,
        description,
        price,
        imageUrl: imageUrl ?? "",
      });

      response.status(204).send();
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
