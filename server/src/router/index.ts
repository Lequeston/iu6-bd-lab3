import { Router } from 'express';

import flightRouter from './flightRouter';
import cityRouter from './cityRouter';

const router = Router();

router.use('/flight', flightRouter);
router.use('/city', cityRouter);

export default router;

