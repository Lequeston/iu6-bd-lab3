import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

import router from './router';
import client from './configs/bd';
import logger from './configs/logs';
import errorMiddleware from './middleware/error.middleware';

const PORT: number = parseInt(process.env.PORT, 10) || 5000;

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api', router);

app.use(errorMiddleware);

const start = async (): Promise<void> => {
  try {
    await client.connect(err => {
      if (err) {
        logger.error(`
          name: ${err.name}
          message: ${err.message}
          ${err.stack}
        `);
      } else {
        console.info('Connecting to postgres bd');
      }
    });
    await app.listen(PORT, () => {
      console.info(`Server listen at http://localhost:${PORT}`);
    });
  } catch(e) {
    console.error(e);
  }
}

start();