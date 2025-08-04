import  FileController  from "../controllers/file.js";
import { Router } from "express";

const router = Router();

router.get("/", FileController.get);
router.get("/:id", FileController.getById);
router.post("/", FileController.create);
router.delete("/:id", FileController.delete);
router.patch("/:id", FileController.update);

export default router;