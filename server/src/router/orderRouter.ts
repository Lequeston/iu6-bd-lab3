import { Router } from 'express';
const { body } = require('express-validator');

import orderController from '../controllers/order.controller';

const router = Router();

router.post(
  '/',
  body('flightId').not().isEmpty(),
  body('priceId').not().isEmpty(),
  orderController.addOrder
);

router.get('/', orderController.getAll);

export default router;