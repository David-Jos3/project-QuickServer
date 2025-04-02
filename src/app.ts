import express from "express";

export const app = express();

app.use(express.json());

app.get("/sobre", (req, res) => {
	res.send({ message: "Sistema de Pedidos Missão Lancai as Redes" });
});
