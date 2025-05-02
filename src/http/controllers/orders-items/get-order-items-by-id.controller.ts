import { z, ZodError } from "zod";
import type { Request, Response } from "express";
import { PrismaOrdersItemsRepository } from "@/repositories/prisma/prisma-orders-items-repository";
import { GetOrderItemByIdUseCase } from "@/use-cases/get-order-item-by-id";

const getOrderItemsByIdBodySchema = z.object({
  orderId: z.string().uuid(),
});

export class GetOrderItemsByIdController {
  async handle(request: Request, response: Response): Promise<void> {
    try {
      const { orderId } = getOrderItemsByIdBodySchema.parse(request.params);
      const prismaOrdersItemsRepository = new PrismaOrdersItemsRepository();
      const getOrderItemByIdUseCase = new GetOrderItemByIdUseCase(
        prismaOrdersItemsRepository
      );

      const orderItem = await getOrderItemByIdUseCase.execute({ orderId });

      response.status(200).send({ orderItem });
    } catch (error) {
      if (error instanceof ZodError) {
        response.status(400).send({
          error: error.format(),
          issues: error.format(),
        });
        return;
      }
      response.status(500).send({ message: "Internal Server Error" });
      return;
    }
  }
}
