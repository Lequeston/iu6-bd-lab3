import { Client } from 'pg';

import client from '../configs/bd';
import { ComfortClass } from '../types/comfortClasses';

interface ComfortClassesServiceInterface {
  getAll: () => Promise<ComfortClass[]>
}

class ComfortClassesService implements ComfortClassesServiceInterface {
  private dbClient: Client;

  constructor(dbClient: Client) {
    this.dbClient = dbClient;
  }

  async getAll() {
    try {
      const query = await this.dbClient.query('SELECT id, title FROM comfortClasses');
      const res: ComfortClass[] = query.rows.map(row => ({
        id: row['id'],
        title: row['title']
      }))
      return res;
    } catch(e) {
      console.error(e);
    }
  }
}

export default new ComfortClassesService(client);