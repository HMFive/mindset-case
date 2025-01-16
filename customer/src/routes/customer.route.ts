import express from 'express';
import * as customerController from '../controllers/customer.controller';
import { isAuth } from '../middlewares/is-auth';

const router = express.Router();

router.get('/customers', customerController.getCustomers);

router.get('/customer/:id', customerController.getCustomer);

router.post('/customer', customerController.createCustomer);

router.delete('/customer/:id', customerController.deleteCustomer);

router.patch('/customer/:id', customerController.updateCustomer);

export default router;
