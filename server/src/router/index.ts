import { Router } from 'express';

import orderRouter from './orderRouter';

const router = Router();

router.use('/order', orderRouter);

export default router;

