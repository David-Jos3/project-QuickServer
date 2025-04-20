import type { Request, Response } from "express";
import { z, ZodError } from "zod";
import { PrismaUserRepository } from "../../../repositories/prisma/prisma-user-repository";
import { RegisterUserUseCase } from "../../../use-cases/register-user";

const userBodySchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
});

export class RegisterUserController {
  async register(request: Request, response: Response) {
    const { email, name, password } = userBodySchema.parse(request.body);

    try {
      const prismaUserRepository = new PrismaUserRepository();
      const registerUserUseCase = new RegisterUserUseCase(prismaUserRepository);

      await registerUserUseCase.execute({ email, name, password });

      response.send({ message: "User created successfully" }).status(201);
    } catch (error) {
      if (error instanceof ZodError) {
        response.send({ message: error.message }).status(400);
      }

      response.send({ message: error }).status(500);
    }
  }
}
