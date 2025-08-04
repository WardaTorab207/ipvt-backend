import genreSeriesController from "../controllers/genreSeries.js";
import express from "express";

const router = express.Router();

router.post('/', genreSeriesController.assignGenreToSeries);
router.get('/genres/:seriesId', genreSeriesController.getGenresBySeries);
router.get('/series/:genreId', genreSeriesController.getSeriesByGenre);

export default router;