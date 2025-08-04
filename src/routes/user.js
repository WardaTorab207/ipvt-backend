import express from 'express';
import UserController from '../controllers/user.js';   

const router = express.Router();

router.get('/', UserController.get);
router.get('/:id', UserController.getById);
router.get('/:id/streams', UserController.getStreamOfUsersById);
router.get('/:id/episodes', UserController.getEpisodesByUserId);
router.post('/registration', UserController.create);
router.patch('/:id', UserController.update);
router.delete('/:id', UserController.delete);
router.post('/login', UserController.login);

export default router;
