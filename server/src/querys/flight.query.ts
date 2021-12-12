import { level } from "winston";
import logger from "../configs/logs";

export const flightsDecoration = (
  startPoint: string | undefined,
  endPoint: string | undefined,
  date: string | undefined,
  comfortClass: string | undefined
): string => `
FROM
	flights,
	planes,
	routes,
	airlines,
	airports AIR1, cities CITY1,
	airports AIR2, cities CITY2,
	planeTypes,
  prices,
	comfortClasses
WHERE
  ${startPoint ? `AIR1.cityId = ${startPoint}::INTEGER AND CITY1.id = ${startPoint}::INTEGER AND ` : ''}
  ${endPoint ? `AIR2.cityId = ${endPoint}::INTEGER AND CITY2.id = ${endPoint}::INTEGER AND ` : ''}
  ${date ? `flights.airArrivalData::DATE = '${date}'::DATE AND ` : ''}
	routes.airArrivalId = AIR1.id AND routes.airDepartureId = AIR2.id
	AND routes.id = flights.routeId AND planes.id = flights.planeId AND airlines.id = flights.airlineId
	AND planeTypes.id = planes.planeTypeId
  ${comfortClass ? `AND comfortClasses.id = ${comfortClass}` : ''}
	AND prices.planeTypesId = planeTypes.id AND prices.flightId = flights.id
	AND prices.comfortClassId = comfortClasses.id AND prices.airlineId = airlines.id
`;

export const flightsDecorationArray = (
  startPoint: string | undefined,
  endPoint: string | undefined,
  date: string | undefined,
  comfortClass: string | undefined,
  offset: number,
  limit: number
): string => {
	const res = `
	SELECT
		flights.id flightId,
		flights.airArrivalData,
		flights.airDepartureData,
		flights.flightCode,
		routes.airArrivalId,
		routes.airDepartureId,
		planes.planeTypeId,
		airlines.title airlineTitle,
		AIR1.title arrivalAirportTitle,
		CITY1.title arrivalCityTitle,
		AIR2.title departureAirportTitle,
		CITY2.title departureCityTitle,
		planeTypes.title planeType,
		prices.price,
		prices.id priceId,
		comfortClasses.title comfortClassTitle,
		comfortClasses.id comfortClassId
	${flightsDecoration(startPoint, endPoint, date, comfortClass)}
	LIMIT ${limit}::INTEGER OFFSET ${offset}::INTEGER
	`;
	logger.log({
		level: 'info',
		message: res
	});
	return res;
}

export const flightsDecorationLength = (
  startPoint: string | undefined,
  endPoint: string | undefined,
  date: string | undefined,
  comfortClass: string | undefined
): string => {
	const res = `
	SELECT
		COUNT(*)
	${flightsDecoration(startPoint, endPoint, date, comfortClass)}
	`;
	logger.log({
		level: 'info',
		message: res
	});
	return res;
}