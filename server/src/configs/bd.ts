import { Client, ClientConfig } from 'pg';

const config: ClientConfig = {
  user: process.env.DB_USER,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT, 10),
  host: process.env.DB_HOST
}

const client = new Client(config);

export default client;

