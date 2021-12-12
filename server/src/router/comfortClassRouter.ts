import { Router } from 'express';

import comfortClassController from '../controllers/comfortClass.controller';

const router = Router();

router.get('/', comfortClassController.getAll);

export default router;