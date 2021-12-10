import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import router from './router';

dotenv.config();

const PORT: number = parseInt(process.env.PORT, 10) || 5000;

const app = express();

app.use(cors());
app.use('/api', router);

const start = async (): Promise<void> => {
  try {
    await app.listen(PORT, () => {
      console.log(`Server listen at http://localhost:${PORT}`);
    })
  } catch(e) {
    console.error(e);
  }
}

start();