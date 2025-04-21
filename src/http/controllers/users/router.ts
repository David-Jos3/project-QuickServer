import type { Application } from "express";
import { RegisterUserController } from "./register-user.controller";

export function userRouter(app: Application) {
  const registerUserController = new RegisterUserController();
  app.post(
    "/users",
    registerUserController.register.bind(registerUserController)
  );
}
