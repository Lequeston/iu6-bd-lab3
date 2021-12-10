import { Router } from 'express';
import cityControllers from '../controllers/city.controllers';

const router = Router();

router.get('/', cityControllers.getAll);

export default router;