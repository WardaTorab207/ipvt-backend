import  SeasonController  from "../controllers/season.js";
import { Router } from "express";

const router = Router();

router.get("/", SeasonController.get);
router.get("/:id", SeasonController.getById);
router.post("/", SeasonController.create);
router.patch("/:id", SeasonController.update);
router.delete("/:id", SeasonController.delete);
router.get("/:id/episodes", SeasonController.getAllEpisodesBySeasonId);

export default router;