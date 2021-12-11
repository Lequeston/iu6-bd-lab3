import { Router } from 'express';

import flightRouter from './flightRouter';
import cityRouter from './cityRouter';
import orderRouter from './orderRouter';

const router = Router();

router.use('/flight', flightRouter);
router.use('/city', cityRouter);
router.use('/order', orderRouter);

export default router;

