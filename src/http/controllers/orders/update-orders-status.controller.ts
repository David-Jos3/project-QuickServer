import { OrderStatus, UserRoles } from "@prisma/client";
import type { Request, Response } from "express";
import { z, ZodError } from "zod";
import { UpdateOrderStatusUseCase } from "../../../use-cases/update-order-status";
import { PrismaOrdersRepository } from "../../../repositories/prisma/prisma-orders-repository";

const updateStatusBodySchema = z.object({
  orderId: z.string().uuid(),
  status: z
    .nativeEnum(OrderStatus)
    .transform((val) => val.trim())
    .pipe(z.nativeEnum(OrderStatus)),
  userRole: z.nativeEnum(UserRoles),
});

export class UpdateOrdersStatusController {
  async handle(request: Request, response: Response) {
    try {
      const { status, userRole } = updateStatusBodySchema.parse(request.body);

      const { orderId } = updateStatusBodySchema.parse(request.params);

      const prismaOrdersRepository = new PrismaOrdersRepository();
      const updateOrderStatusUseCase = new UpdateOrderStatusUseCase(
        prismaOrdersRepository
      );

      await updateOrderStatusUseCase.execute({
        orderId,
        status,
        userRole,
      });
      response.status(200).send({
        message: "Status successfully updated",
      });
    } catch (error) {
      if (error instanceof ZodError) {
        response.status(400).send({
          message: error.message,
        });
        return;
      }
      if (error instanceof Error) {
        response.status(404).send({ message: error.message });
        return;
      }
      response.status(500).send({ message: "Internal server error" });
    }
  }
}
