import { Router } from 'express';

import flightRouter from './flightRouter';
import cityRouter from './cityRouter';
import orderRouter from './orderRouter';
import comfortClassRouter from './comfortClassRouter';

const router = Router();

router.use('/flight', flightRouter);
router.use('/city', cityRouter);
router.use('/order', orderRouter);
router.use('/comfort', comfortClassRouter);

export default router;

