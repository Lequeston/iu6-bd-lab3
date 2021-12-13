import { Router } from 'express';
const { body } = require('express-validator');

import clientController from '../controllers/client.controller';

const router = Router();

router.put(
  '/',
  clientController.changeClient
);

router.get('/', clientController.getClient);

export default router;