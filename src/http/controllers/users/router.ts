import { AuthLoginController } from "./auth-login.controller";
import type { Application } from "express";
import { RegisterUserController } from "./register-user.controller";

export function userRouter(app: Application) {
  const registerUserController = new RegisterUserController();
  const authLoginController = new AuthLoginController();
  app.post(
    "/users",
    registerUserController.handle.bind(registerUserController)
  );

  app.post("/login", authLoginController.handle.bind(authLoginController));
}
