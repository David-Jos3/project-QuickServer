import express from "express";
import swaggerUi from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";
import { userRouter } from "./http/controllers/users/router";
import { menuItemRouter } from "./http/controllers/menu/router";
import { ordersRouter } from "./http/controllers/orders/router";
import { ordersItemsRouter } from "./http/controllers/orders-items/router";
import swaggerDocument from "./docs/swagger.json";

export const app = express();

app.use(express.json());
userRouter(app);
menuItemRouter(app);
ordersRouter(app);
ordersItemsRouter(app);

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get("/sobre", (req, res) => {
  res.send({ message: "Sistema de Pedidos Missão Lancai as Redes" });
});
