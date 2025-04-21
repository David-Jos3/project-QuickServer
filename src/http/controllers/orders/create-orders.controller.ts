import type { Request, Response } from "express";
import { custom, z } from "zod";
import { CreateOrdersUseCase } from "../../../use-cases/create-orders";
import { PrismaOrdersRepository } from "../../../repositories/prisma/prisma-orders-repository";

const orderBodySchema = z.object({
  cashierId: z.string(),
  customerName: z.string().min(1).max(255),
});

export class CreateOrdersController {
  async create(request: Request, response: Response) {
    const { cashierId, customerName } = orderBodySchema.parse(request.body);

    try {
      const prismaOrdersRepository = new PrismaOrdersRepository();
      const createOrdersUseCase = new CreateOrdersUseCase(
        prismaOrdersRepository
      );

      await createOrdersUseCase.execute({
        cashierId,
        customerName,
      });

      response.status(201).send({ message: "Order created successfully" });
    } catch (error) {
      if (error instanceof z.ZodError) {
        response.status(400).send({ message: error.errors });
      }
      response.status(500).send({
        message: "Internal server error",
        error: error,
      });
    }
  }
}
