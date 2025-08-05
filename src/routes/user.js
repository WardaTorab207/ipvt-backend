import express from 'express';
import UserController from '../controllers/user.js';   
import authenticate from "../middlewares/authenticate.js";

const router = express.Router();

router.get('/',authenticate, UserController.get);
router.get('/:id',authenticate ,UserController.getById);
router.get('/:id/streams',authenticate, UserController.getStreamOfUsersById);
router.get('/:id/episodes',authenticate, UserController.getEpisodesByUserId);
router.post('/registration', UserController.create);
router.patch('/:id',authenticate, UserController.update);
router.delete('/:id',authenticate, UserController.delete);
router.post('/login', UserController.login);

export default router;
