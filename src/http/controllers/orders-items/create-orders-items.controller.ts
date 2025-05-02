import type { Request, Response } from "express";
import { PrismaOrdersItemsRepository } from "../../../repositories/prisma/prisma-orders-items-repository";
import { CreateOrdersItemsUseCase } from "../../../use-cases/create-orders-items";
import { z, ZodError } from "zod";

const ordersItemBodySchema = z.object({
  orderId: z.string().uuid(),
  itemId: z.string(),
  quantity: z.number().min(1),
});

export class CreateOrdersItemsController {
  async handle(request: Request, response: Response) {
    const { orderId, itemId, quantity } = ordersItemBodySchema.parse(
      request.body
    );

    try {
      const prismaOrdersItemsRepository = new PrismaOrdersItemsRepository();
      const createOrdersItemsUseCase = new CreateOrdersItemsUseCase(
        prismaOrdersItemsRepository
      );

      await createOrdersItemsUseCase.execute({
        orderId,
        itemId,
        quantity,
      });

      response.status(201).send({ messafe: "Order item created successfully" });
    } catch (error) {
      if (error instanceof ZodError) {
        response.status(400).send({ message: error.errors });
      }
      response.status(500).send({
        message: "Internal server error",
        error: error,
      });
    }
  }
}
