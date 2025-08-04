import express from 'express';
import UserRouter from './user.js';
import GenreRouter from './genre.js';
import SeriesRouter from './series.js';
import FileRouter from './file.js';
import SeasonRouter from './season.js';
import EpisodeRouter from './episode.js';
import StreamRouter from './stream.js';
import GenreSeriesRouter from './genreSeries.js';

const router = express.Router();

router.use('/users', UserRouter);
router.use('/genres', GenreRouter);
router.use('/series', SeriesRouter);
router.use('/files', FileRouter);
router.use('/seasons', SeasonRouter);
router.use('/episodes', EpisodeRouter);
router.use('/streams', StreamRouter);
router.use('/genre-series', GenreSeriesRouter);



export default router;

