import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

import router from './router';
import client from './configs/bd';

const PORT: number = parseInt(process.env.PORT, 10) || 5000;

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api', router);

const start = async (): Promise<void> => {
  try {
    await client.connect();
    await app.listen(PORT, () => {
      console.log(`Server listen at http://localhost:${PORT}`);
    })
  } catch(e) {
    console.error(e);
  }
}

start();