import { PrismaOrdersRepository } from "../../../repositories/prisma/prisma-orders-repository";
import { ListOrdersUseCase } from "../../../use-cases/list-order";
import type { Request, Response } from "express";

export class GetOrdersController {
  async handle(request: Request, response: Response) {
    try {
      const ordersRepository = new PrismaOrdersRepository();
      const listOrdersUseCase = new ListOrdersUseCase(ordersRepository);

      const { orders } = await listOrdersUseCase.execute();
      response.status(200).json({ orders });
    } catch (error) {
      response.status(500).json({
        message: "Internal server error",
        error: error,
      });
    }
  }
}
