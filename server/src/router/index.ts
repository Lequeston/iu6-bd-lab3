import { Router } from 'express';

import flightRouter from './flightRouter';
import cityRouter from './cityRouter';
import orderRouter from './orderRouter';
import comfortClassRouter from './comfortClassRouter';
import clientRouter from './clientRouter';

const router = Router();

router.use('/flight', flightRouter);
router.use('/city', cityRouter);
router.use('/order', orderRouter);
router.use('/comfort', comfortClassRouter);
router.use('/client', clientRouter);

export default router;

