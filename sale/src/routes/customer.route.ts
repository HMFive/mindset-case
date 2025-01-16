import express from 'express';
import * as salesController from '../controllers/sale.controller';
import { isAuth } from '../middlewares/is-auth';

const router = express.Router();

router.get('/sales', salesController.getSales);

router.get('/sale/:id', salesController.getSale);

router.post('/sale', salesController.createSale);

router.delete('/sale/:id', salesController.deleteSale);

router.patch('/sale/:id', salesController.updateSale);

export default router;
