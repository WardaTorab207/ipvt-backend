import SeriesController from "../controllers/series.js";
import express from "express";

const router = express.Router();

router.get("/", SeriesController.get);
router.get("/:id", SeriesController.getById);   
router.post("/", SeriesController.create);
router.put("/:id", SeriesController.update);
router.delete("/:id", SeriesController.delete);
router.get("/:id/seasons", SeriesController.getAllSeasonsBySeriesId);
router.get("/:id/seasons/episodes", SeriesController.getAllEpisodesBySeriesId);

export default router;