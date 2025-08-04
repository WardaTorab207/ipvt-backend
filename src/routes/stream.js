import StreamController  from "../controllers/stream.js";
import { Router } from "express";

const router = Router();

router.get("/", StreamController.get);
router.get("/:id", StreamController.getbyId);
router.post("/", StreamController.create);
router.patch("/:id", StreamController.update);
router.delete("/:id", StreamController.delete);
router.get("/:id/episodes", StreamController.getEpisodeByStreamId);
router.get("/:id/users", StreamController.getUsersByStreamId);
router.get("/:id/episodes/seasons", StreamController.getSeasonOfEpisodeByStreamId);
router.get("/:id/episodes/seasons/series", StreamController.getSeriesBySeasonOfEpisodeByStreamId);
router.get("/:id/episodes/seasons/series/genres", StreamController.getGenresByStreamId);
export default router;
