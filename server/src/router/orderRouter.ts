import { Router } from 'express';

import orderController from '../controllers/order.controller';

const router = Router();

router.post('/', orderController.addOrder);

export default router;