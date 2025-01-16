import express from 'express';
import * as noteController from '../controllers/note.controller';
import { isAuth } from '../middlewares/is-auth';

const router = express.Router();

router.get('/notes', noteController.getNotes);

router.get('/note/:id', noteController.getNote);

router.post('/note', noteController.createNote);

router.delete('/note/:id', noteController.deleteNote);

router.patch('/note/:id', noteController.updateNote);

export default router;
