import express from 'express';
import UserRouter from './user.js';
import GenreRouter from './genre.js';
import SeriesRouter from './series.js';
import FileRouter from './file.js';
import SeasonRouter from './season.js';
import EpisodeRouter from './episode.js';
import StreamRouter from './stream.js';
import GenreSeriesRouter from './genreSeries.js';

const protectedRouter = express.Router();
const unprotectedRouter = express.Router();

unprotectedRouter.use('/users', UserRouter);
protectedRouter.use('/genres', GenreRouter);
protectedRouter.use('/series', SeriesRouter);
protectedRouter.use('/files', FileRouter);
protectedRouter.use('/seasons', SeasonRouter);
protectedRouter.use('/episodes', EpisodeRouter);
protectedRouter.use('/streams', StreamRouter);
protectedRouter.use('/genre-series', GenreSeriesRouter);



export  { protectedRouter, unprotectedRouter};

