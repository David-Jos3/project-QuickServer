import { PrismaOrdersItemsRepository } from "@/repositories/prisma/prisma-orders-items-repository";
import { ListOrderItemsUseCase } from "./../../../use-cases/list-order-items";
import type { Request, Response } from "express";

export class ListOrderItemsController {
  async handle(request: Request, response: Response) {
    try {
      const prismaOrdersItemsRepository = new PrismaOrdersItemsRepository();
      const listOrderItemsUseCase = new ListOrderItemsUseCase(
        prismaOrdersItemsRepository
      );

      const { orderItem } = await listOrderItemsUseCase.execute();

      response.status(200).send({ orderItem });
      return;
    } catch (error) {
      if (error instanceof Error) {
        response.status(400).send({ error: error.message });
        return;
      }

      response.status(500).send({ error: "Internal Server Error" });
      return;
    }
  }
}
