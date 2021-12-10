import { Router } from 'express';

import flightControllers from '../controllers/flight.controller';

const router = Router();

router.get('/decoration', flightControllers.decoration);

export default router;