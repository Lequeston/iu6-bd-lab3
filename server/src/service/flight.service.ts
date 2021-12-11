import moment from 'moment';
import { Client } from 'pg';

import client from '../configs/bd';
import { flightsDecorationArray, flightsDecorationLength } from '../querys/flight.query';
import { FlightDecoration } from '../types/flights';

interface FlightServiceInterface {
  decoration: (
    startPoint: string | undefined,
    endPoint: string | undefined,
    date: moment.Moment | undefined,
    comfortClass: string | undefined,
    offset: number,
    limit: number
  ) => Promise<{
    array: FlightDecoration[],
    length: number
  }>
}

class FlightService implements FlightServiceInterface {
  private dbClient: Client;

  constructor(dbClient: Client) {
    this.dbClient = dbClient;
  }

  async decoration(
    startPoint: string | undefined,
    endPoint: string | undefined,
    date: moment.Moment | undefined,
    comfortClass: string | undefined,
    offset: number,
    limit: number
  ) {
    try {
      await this.dbClient.query('BEGIN');
      console.log(
        flightsDecorationArray(
          startPoint,
          endPoint,
          date && date.toISOString(),
          comfortClass,
          offset,
          limit
        )
      );
      const queryArray = await this.dbClient.query(flightsDecorationArray(
        startPoint,
        endPoint,
        date && date.toISOString(),
        comfortClass,
        offset,
        limit
      ));

      const res: FlightDecoration[] = await Promise.all(queryArray.rows.map(async (row): Promise<FlightDecoration> => ({
        id: row['flightid'],
        airArrivalData: moment(row['airarrivaldata']).toISOString(),
        airDepartureData: moment(row['airdeparturedata']).toISOString(),
        flightCode: row['flightcode'],
        route: {
          airArrival: {
            title: row['arrivalairporttitle'],
            city: row['arrivalcitytitle']
          },
          airDeparture: {
            title: row['departureairporttitle'],
            city: row['departurecitytitle']
          }
        },
        airlineTitle: row['airlineTitle'],
        planeType: row['planetype'],
        price: {
          id: row['priceid'],
          price: row['price'].slice(1)
        },
        comfortClass: {
          id: row['comfortclassid'],
          title: row['comfortclasstitle']
        }
      })));

      const queryLength = await this.dbClient.query(flightsDecorationLength(
        startPoint,
        endPoint,
        date && date.toISOString(),
        comfortClass
      ));
      const length: number = parseInt(queryLength.rows[0]['count'], 10);
      await this.dbClient.query('COMMIT');
      return {
        array: res,
        length
      }
    } catch(e) {
      console.error(e);
    }
  }
}

export default new FlightService(client);