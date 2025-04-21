import express from "express";
import { userRouter } from "./http/controllers/users/router";
import { menuItemRouter } from "./http/controllers/menu/router";
import { ordersRouter } from "./http/controllers/orders/router";
import { ordersItemsRouter } from "./http/controllers/orders-items/router";

export const app = express();

app.use(express.json());
userRouter(app);
menuItemRouter(app);
ordersRouter(app);
ordersItemsRouter(app);

app.get("/sobre", (req, res) => {
  res.send({ message: "Sistema de Pedidos Missão Lancai as Redes" });
});
