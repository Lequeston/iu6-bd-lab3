import { Client } from "pg";

import client from '../configs/bd';

interface OrderServiceInterface {
  addOrder(
    clientId: string | undefined,
    flightId: string | undefined,
    priceId: string | undefined
  ): Promise<void>
}

class OrderService implements OrderServiceInterface {
  private dbClient: Client;

  constructor(dbClient: Client) {
    this.dbClient = dbClient;
  }
  async addOrder(
    clientId: string | undefined,
    flightId: string | undefined,
    priceId: string | undefined
  ) {
    try {
      if (!clientId && !flightId && !priceId) {
        throw new Error('Не корректные данные');
      }
      const queryPrice = await this.dbClient.query({
        text: 'SELECT flightId id FROM prices WHERE prices.id = $1',
        values: [priceId]
      });
      if (queryPrice.rows[0]['id'] !== flightId) {
        throw new Error('Нет цены связанной с рейсом');
      }
      const queryOrders = await this.dbClient.query({
        text: 'SELECT id FROM orders WHERE orders.clientId = $1 AND orders.flightId = $2 AND orders.priceId = $3',
        values: [clientId, flightId, priceId]
      });
      if (queryOrders.rows.length != 0) {
        throw new Error(`Заказ уже существует id=${queryOrders.rows[0]['id']}`);
      }
      await this.dbClient.query({
        text: `
        INSERT INTO orders (clientId, flightId, priceId)
          VALUES ($1, $2, $3)
        `,
        values: [clientId, flightId, priceId]
      });
    } catch(e) {
      console.error(e);
    }
  }
}

export default new OrderService(client);