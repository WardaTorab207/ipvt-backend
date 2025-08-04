import express from "express";
import  router  from "../routes/index.js";

export default async function expressLoader({ app }) {


	app.use(express.json());
	app.use(express.urlencoded());

	app.use("/", router);
}