import { PrismaOrdersRepository } from "@/repositories/prisma/prisma-orders-repository";
import { CancelOrderUseCase } from "@/use-cases/cancel-order";
import { CannotCancelOrderError } from "@/use-cases/errors/cannot-cancel-order-error";
import { OrderNotFoundError } from "@/use-cases/errors/order-not-found-error";
import type { Request, Response } from "express";
import { z } from "zod";

const cancelOrderSchema = z.object({
  orderId: z.string().uuid(),
});

export class CancelOrderController {
  async handle(request: Request, response: Response) {
    try {
      const { orderId } = cancelOrderSchema.parse(request.params);

      const prismaOrdersRepository = new PrismaOrdersRepository();
      const cancelOrderUseCase = new CancelOrderUseCase(prismaOrdersRepository);

      await cancelOrderUseCase.execute({
        orderId,
      });
      response.status(204).send();
      return;
    } catch (error) {
      if (error instanceof z.ZodError) {
        response.status(400).send({ message: error.message });
        return;
      }
      if (error instanceof OrderNotFoundError) {
        response.status(400).send({ message: error.message });
        return;
      }

      if (error instanceof CannotCancelOrderError) {
        response.status(400).send({ message: error.message });
        return;
      }
      response.status(500).send({ message: "Internal Server Error" });
    }
  }
}
