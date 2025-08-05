import  FileController  from "../controllers/file.js";
import { Router } from "express";
import upload from "../config/multer.js";

const router = Router();

router.get("/", FileController.get);
router.get("/:id", FileController.getById);
router.post("/", FileController.create);
router.delete("/:id", FileController.delete);
router.patch("/:id", FileController.update);
router.post("/upload", upload.single("file"), FileController.uploadFile);

export default router;