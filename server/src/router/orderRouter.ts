import { Router } from 'express';
const { body } = require('express-validator');

import orderController from '../controllers/order.controller';

const router = Router();

router.post(
  '/',
  body('clientId').not().isEmpty(),
  body('flightId').not().isEmpty(),
  body('priceId').not().isEmpty(),
  orderController.addOrder
);

export default router;