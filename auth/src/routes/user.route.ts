import express from 'express';
import * as userController from '../controllers/user.controller';
import { isAuth } from '../middlewares/is-auth';

const router = express.Router();

router.get('/users', userController.getUsers);

router.get('/user/:id', isAuth, userController.getUser);

router.get('/login', userController.login);

router.post('/user', isAuth, userController.createUser);

router.delete('/user/:id', userController.deleteUser);

router.patch('/user/:id', userController.updateUser);

export default router;
