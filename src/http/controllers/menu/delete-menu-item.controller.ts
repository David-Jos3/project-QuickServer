import type { Response, Request } from "express";
import { z } from "zod";
import { PrismaMenuItemsRepository } from "../../../repositories/prisma/prisma-menu-items-repository";
import { DeleteMenuItemUseCase } from "../../../use-cases/delete-menu-item";
import { MenuNotFoundError } from "../../../use-cases/errors/menu-not-found-error";

const deleteMenuItemBodySchema = z.object({
  menuId: z.string().uuid(),
});

export class DeleteMenuItemController {
  async handle(request: Request, response: Response) {
    try {
      const { menuId } = deleteMenuItemBodySchema.parse(request.params);

      const menuItemRepository = new PrismaMenuItemsRepository();
      const deleteMenuItemUseCase = new DeleteMenuItemUseCase(
        menuItemRepository
      );

      await deleteMenuItemUseCase.execute({ menuId });
      response.status(204).send();
    } catch (error) {
      if (error instanceof z.ZodError) {
        response.status(400).send({
          message: "Invalid data",
          errors: error.errors,
        });
        return;
      }
      if (error instanceof MenuNotFoundError) {
        response.status(404).send({ message: error.message });
        return;
      }
      response.status(500).send({ message: "Internal server error" });
      return;
    }
  }
}
