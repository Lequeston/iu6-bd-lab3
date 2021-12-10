export const flightsDecoration = (
  startPoint: string | undefined,
  endPoint: string | undefined,
  date: string | undefined
): string => `
FROM
	flights,
	planes,
	routes,
	airlines,
	airports AIR1, cities CITY1,
	airports AIR2, cities CITY2,
	planeTypes
WHERE
  ${startPoint ? `AIR1.cityId = ${startPoint}::INTEGER AND CITY1.id = ${startPoint}::INTEGER AND ` : ''}
  ${endPoint ? `AIR2.cityId = ${endPoint}::INTEGER AND CITY2.id = ${endPoint}::INTEGER AND ` : ''}
  ${date ? `flights.airArrivalData::DATE = '${date}'::DATE AND ` : ''}
	routes.airArrivalId = AIR1.id AND routes.airDepartureId = AIR2.id
	AND routes.id = flights.routeId AND planes.id = flights.planeId AND airlines.id = flights.airlineId
	AND planeTypes.id = planes.planeTypeId
`;

export const flightsDecorationArray = (
  startPoint: string | undefined,
  endPoint: string | undefined,
  date: string | undefined,
  offset: number,
  limit: number
): string => `
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
	planeTypes.title planeType
${flightsDecoration(startPoint, endPoint, date)}
LIMIT ${limit}::INTEGER OFFSET ${offset}::INTEGER
`;

export const flightsDecorationLength = (
  startPoint: string | undefined,
  endPoint: string | undefined,
  date: string | undefined
): string => `
SELECT
	COUNT(*)
${flightsDecoration(startPoint, endPoint, date)}
`;