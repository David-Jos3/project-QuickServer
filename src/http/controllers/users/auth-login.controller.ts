import jwt from "jsonwebtoken";
import { PrismaUserRepository } from "@/repositories/prisma/prisma-user-repository";
import { AuthLoginUseCase } from "@/use-cases/auth-login";
import type { Request, Response } from "express";
import { z } from "zod";
import { env } from "../../../env/env";
import { InvalidCredentialsError } from "@/use-cases/errors/invalid-credential-error";

const authLoginBodySchema = z.object({
  username: z.string().min(1),
  password: z.string().min(6),
});

export class AuthLoginController {
  async handle(request: Request, response: Response): Promise<void> {
    try {
      const { username, password } = authLoginBodySchema.parse(request.body);

      const prismaUserRepositories = new PrismaUserRepository();
      const authLoginUseCase = new AuthLoginUseCase(prismaUserRepositories);

      const { user } = await authLoginUseCase.execute({ username, password });

      const token = jwt.sign({}, env.JWT_PRIVATE_KEY, {
        subject: user.id,
        expiresIn: "1d",
      });
      response.status(200).json({ token });
      return;
    } catch (error) {
      if (error instanceof InvalidCredentialsError) {
        response.status(401).json({ message: "Invalid username or password" });
        return;
      }
      response.status(500).json({ message: "Internal server error" });
      return;
    }
  }
}
