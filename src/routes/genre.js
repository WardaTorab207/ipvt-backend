import express from 'express';
import GenreController from '../controllers/genre.js';

const router = express.Router();

router.get('/', GenreController.get);
router.get('/:id', GenreController.getById);
router.post('/', GenreController.create);
router.patch('/:id', GenreController.update);
router.delete('/:id', GenreController.delete);
router.get('/:id/series', GenreController.getAllSeriesByGenreId);
router.get('/:id/series/seasons', GenreController.getAllSeasonsByGenreId);

export default router;