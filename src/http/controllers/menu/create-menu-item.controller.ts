import { z } from "zod";
import type { Request, Response } from "express";
import { CreateMenuItemsUseCase } from "../../../use-cases/create-menu-item";
import { PrismaMenuItemsRepository } from "../../../repositories/prisma/prisma-menu-items-repository";

const menuItemBodySchema = z.object({
  name: z.string(),
  description: z.string(),
  price: z.number().positive(),
  imageUrl: z.string().optional(),
});

export class CreateMenuItemController {
  async create(request: Request, response: Response) {
    const { name, description, price, imageUrl } = menuItemBodySchema.parse(
      request.body
    );
    try {
      const prismaMenuItemRepository = new PrismaMenuItemsRepository();
      const createMenuItemUseCases = new CreateMenuItemsUseCase(
        prismaMenuItemRepository
      );

      await createMenuItemUseCases.execute({
        name,
        description,
        price,
        imageUrl,
      });

      response.status(201).send({ message: "Menu Item created" });
    } catch (error) {
      if (error instanceof z.ZodError) {
        response.status(400).send({
          message: "Validation error",
          issues: error.issues,
        });
      }
      response.status(500).send({
        message: "Internal server error",
        error: error,
      });
    }
  }
}
