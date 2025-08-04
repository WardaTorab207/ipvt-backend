import EpisodeController from "../controllers/episode.js";

import { Router } from "express";

const router = Router();

router.get("/", EpisodeController.get);
router.get("/:id", EpisodeController.getById);
router.post("/", EpisodeController.create);
router.patch("/:id", EpisodeController.update);
router.delete("/:id", EpisodeController.delete);
router.get("/:id/streams", EpisodeController.getAllStreamsByEpisodeId);

export default router;