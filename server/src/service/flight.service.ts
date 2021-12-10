import moment from 'moment';
import { Client } from 'pg';

import client from '../configs/bd';
import { FlightDecoration } from '../types/flights';

interface FlightServiceInterface {
  decoration: (
    startPoint: string | undefined,
    endPoint: string | undefined,
    directDate: moment.Moment | undefined,
    reverseDate: moment.Moment | undefined
  ) => Promise<FlightDecoration[]>
}

class FlightService implements FlightServiceInterface {
  private dbClient: Client;

  constructor(dbClient: Client) {
    this.dbClient = dbClient;
  }

  async decoration(
    startPoint: string | undefined,
    endPoint: string | undefined,
    directDate: moment.Moment | undefined,
    reverseDate: moment.Moment | undefined
  ) {
    try {
      await client.query('BEGIN');
      const query = await this.dbClient.query(`
      SELECT
        flights.id flightId,
        flights.airArrivalData,
        flights.airDepartureData,
        flights.flightCode,
        routes.airArrivalId,
        routes.airDepartureId,
        planes.planeTypeId,
        airlines.title airlineTitle,
        arrivalAirports.title arrivalAirportTitle,
        arrivalAirports.cityTitle arrivalCityTitle,
        departureAirports.title departureAirportTitle,
        departureAirports.cityTitle departureCityTitle
      FROM
        flights,
        planes,
        routes,
        airlines,
        (SELECT airports.id, airports.title, cities.title cityTitle
          FROM airports, cities
          ${startPoint ? `WHERE cityId = ${startPoint} AND cities.id = ${startPoint}` : ''}
        ) arrivalAirports,
        (SELECT airports.id, airports.title, cities.title cityTitle
          FROM airports, cities
          ${endPoint ? `WHERE cityId = ${endPoint} AND cities.id = ${endPoint}` : ''}
        ) departureAirports
      WHERE
        routes.airArrivalId = arrivalAirports.id AND routes.airDepartureId = departureAirports.id
        AND routes.id = flights.routeId AND planes.id = flights.planeId AND airlines.id = flights.airlineId
      `);

      const getTitlePlaneType = async (id: number): Promise<string> => {
        const query = await this.dbClient.query({
          text: 'SELECT title FROM planetypes WHERE id = $1',
          values: [id]
        });
        return query.rows[0]['title'];
      }

      const res: FlightDecoration[] = await Promise.all(query.rows.map(async (row): Promise<FlightDecoration> => ({
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
        planeType: await getTitlePlaneType(row['planetypeid'])
      })));
      await client.query('COMMIT');
      return res;
    } catch(e) {
      await client.query('ROLLBACK');
      console.error(e);
    }
  }
}

export default new FlightService(client);