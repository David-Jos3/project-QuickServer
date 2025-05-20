import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { env } from "../env/env";

export async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> {
  try {
    const token = request.headers.authorization?.split(" ")[1];

    if (!token) {
      response.status(401).json({ message: "Unauthorized access." });
      return;
    }
    const publicKey = Buffer.from(env.JWT_PUBLIC_KEY, "base64");
    const decode = jwt.verify(token, publicKey);
    console.log(decode);
    request.user = decode;

    next();
  } catch (error) {
    response.status(401).json({ message: error });
    return;
  }
}
