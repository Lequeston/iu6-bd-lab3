import { Client } from "pg";

import client from '../configs/bd';
import ApiError from "../error/ApiError";
import { getAllOrdersQuery } from "../querys/order.query";
import { Order } from "../types/order";

interface OrderServiceInterface {
  addOrder(
    clientId: string | undefined,
    flightId: string | undefined,
    priceId: string | undefined
  ): Promise<{
    clientId: string,
    flightId: string,
    priceId: string
  }>,
  getAll(clientId: string): Promise<Order[]>
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
    if (!clientId && !flightId && !priceId) {
      throw ApiError.internal('Не корректные данные');
    }
    const queryPrice = await this.dbClient.query({
      text: 'SELECT flightId id FROM prices WHERE prices.id = $1',
      values: [priceId]
    });
    if (queryPrice.rows[0]['id'] !== flightId) {
      throw ApiError.internal('Нет цены связанной с рейсом');
    }
    const queryOrders = await this.dbClient.query({
      text: 'SELECT id FROM orders WHERE orders.clientId = $1 AND orders.flightId = $2 AND orders.priceId = $3',
      values: [clientId, flightId, priceId]
    });
    if (queryOrders.rows.length != 0) {
      throw ApiError.internal(`Заказ уже существует id=${queryOrders.rows[0]['id']}`);
    }
    const query = await this.dbClient.query({
      text: `
      INSERT INTO orders (clientId, flightId, priceId)
        VALUES ($1, $2, $3) RETURNING clientId, flightId, priceId
      `,
      values: [clientId, flightId, priceId]
    });
    const order = {
      clientId: query.rows[0]['clientId'],
      flightId: query.rows[0]['flightId'],
      priceId: query.rows[0]['priceId']
    }
    return order;
  }

  async getAll(clientId: string): Promise<Order[]> {
    if (!clientId) {
      throw ApiError.internal('Не задан id для клиента')
    }
    const query = await this.dbClient.query(getAllOrdersQuery(clientId));
    const orders: Order[] = query.rows.map(value => ({
      price: value['price'],
      comfortClass: value['comfortclasses'],
      planeType: value['planetype'],
      airArrivalData: value['airarrivaldata'],
      airDepartureData: value['airdeparturedata'],
      route: {
        airArrival: {
          title: value['airarrivalltitle'],
          city: value['cityarrivalltitle']
        },
        airDeparture: {
          title: value['airdeparturetitle'],
          city: value['citydeparturetitle']
        }
      },
      flightNumber: value['flightnumber']
    }));
    return orders;
  }
}

export default new OrderService(client);