import { Client } from 'pg';

import client from '../configs/bd';
import { City } from '../types/city';

interface CityServiceInterface {
  getAll: () => Promise<City[]>
}

class CityService implements CityServiceInterface {
  private dbClient: Client;

  constructor(dbClient: Client) {
    this.dbClient = dbClient;
  }
  async getAll() {
    const query = await this.dbClient.query('SELECT id, title, country FROM cities');
    const res: City[] = query.rows.map((field) => ({
      id: field['id'],
      title: field['title'],
      country: field['country']
    }))
    return res;
  }
}

export default new CityService(client);