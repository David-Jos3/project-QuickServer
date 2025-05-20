import type { Request, Response } from "express";
import { z, ZodError } from "zod";
import { PrismaUserRepository } from "../../../repositories/prisma/prisma-user-repository";
import { RegisterUserUseCase } from "../../../use-cases/register-user";
import { UserRoles } from "@prisma/client";

const userBodySchema = z.object({
  name: z.string(),
  email: z.string().email(),
  username: z.string().min(3).max(20),
  password: z.string(),
  userRoles: z.nativeEnum(UserRoles),
});

export class RegisterUserController {
  async handle(request: Request, response: Response) {
    const { email, name, password, username, userRoles } = userBodySchema.parse(
      request.body
    );

    try {
      const prismaUserRepository = new PrismaUserRepository();
      const registerUserUseCase = new RegisterUserUseCase(prismaUserRepository);

      await registerUserUseCase.execute({
        email,
        name,
        username,
        password,
        userRoles,
      });

      response.send({ message: "User created successfully" }).status(201);
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
