import type { JwtPayload } from "jsonwebtoken";
import "express";

declare module "express-serve-static-core" {
  interface Request {
    user?: string | JwtPayload;
  }
}
