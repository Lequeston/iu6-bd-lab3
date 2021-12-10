import { Router } from 'express';

import orderControllers from '../controllers/order.controllers';

const router = Router();

router.get('/decoration', orderControllers.decoration);

export default router;