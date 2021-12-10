import { Router } from 'express';

import orderRouter from './orderRouter';
import cityRouter from './cityRouter';

const router = Router();

router.use('/order', orderRouter);
router.use('/city', cityRouter);

export default router;

