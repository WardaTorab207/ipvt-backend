import express from "express";
import { protectedRouter, unprotectedRouter } from "../routes/index.js";
import authenticate from "../middlewares/authenticate.js";

export default async function expressLoader({ app }) {


	app.use(express.json());
	app.use(express.urlencoded());

	app.use("/", authenticate,protectedRouter);
	app.use("/", unprotectedRouter);

}