import type { Request, Response } from "express";
import { z } from "zod";
import { PrismaOrdersRepository } from "../../../repositories/prisma/prisma-orders-repository";
import { GetOrderByIdUseCase } from "../../../use-cases/get-order-by-id";
import { OrderNotFoundError } from "@/use-cases/errors/order-not-found-error";

const getOrderByIdParamsSchema = z.object({
  orderId: z.string().uuid(),
});

export class GetOrderByIdController {
  async handle(request: Request, response: Response): Promise<void> {
    try {
      const { orderId } = getOrderByIdParamsSchema.parse(request.params);
      const ordersRepository = new PrismaOrdersRepository();
      const getOrderByIdUseCase = new GetOrderByIdUseCase(ordersRepository);
      const { order } = await getOrderByIdUseCase.execute({ orderId });

      response.status(200).send(order);
    } catch (error) {
      if (error instanceof z.ZodError) {
        response.status(400).send({ message: error.errors });
        return;
      }
      if (error instanceof OrderNotFoundError) {
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
