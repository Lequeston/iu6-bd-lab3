import { Router } from 'express';
import cityControllers from '../controllers/city.controller';

const router = Router();

router.get('/', cityControllers.getAll);

export default router;