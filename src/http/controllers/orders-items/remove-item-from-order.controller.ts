import type { Request, Response } from "express";
import { PrismaOrdersItemsRepository } from "@/repositories/prisma/prisma-orders-items-repository";
import { PrismaOrdersRepository } from "@/repositories/prisma/prisma-orders-repository";
import { RemoveItemFromOrderUseCase } from "@/use-cases/remove-item-from-order";
import { z } from "zod";

const removeItemFromOrderBodySchema = z.object({
  itemId: z.string().uuid(),
});

export class RemoveItemFromOrderController {
  async handle(request: Request, response: Response) {
    try {
      const { itemId } = removeItemFromOrderBodySchema.parse(request.params);

      const prismaOrdersItemsRepository = new PrismaOrdersItemsRepository();
      const prismaOrdersRepository = new PrismaOrdersRepository();

      const removeItemFromOrderUseCase = new RemoveItemFromOrderUseCase(
        prismaOrdersItemsRepository,
        prismaOrdersRepository
      );

      await removeItemFromOrderUseCase.execute({ itemId });

      response.status(200).send({ message: "Item removed from order" });
    } catch (error) {
      if (error instanceof z.ZodError) {
        response.status(400).send({
          error: error.format(),
          issues: error.format(),
        });
        return;
      }
      if (error instanceof Error) {
        response.status(400).send({ error: error.message });
        return;
      }
      response.status(500).send({ message: "Internal Server Error" });
      return;
    }
  }
}
