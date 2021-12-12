import logger from "../configs/logs";

export const getAllOrdersQuery = (clientId) => {
  const res = `
  SELECT
    prices.price price,
    comfortClasses.title comfortclasses,
    planeTypes.title planetype,
    flights.airArrivalData airarrivaldata,
    flights.airDepartureData airdeparturedata,
    flights.flightCode flightnumber,
    AIR1.title airarrivalltitle,
    AIR2.title airdeparturetitle,
    CIT1.title cityarrivalltitle,
    CIT2.title citydeparturetitle
  FROM
    orders,
    prices,
    comfortClasses,
    planeTypes,
    flights,
    airlines,
    routes,
    airports AIR1, cities CIT1,
    airports AIR2, cities CIT2
  WHERE
    orders.clientId = ${clientId} AND
    orders.priceId = prices.id AND comfortClasses.id = prices.comfortClassId AND
    planeTypes.id = prices.planeTypesId AND
    flights.id = orders.flightId AND airlines.id = flights.airlineId AND
    routes.id = flights.routeId AND AIR1.id = routes.airArrivalId AND AIR2.id = routes.airDepartureId AND
    CIT1.id = AIR1.cityId AND CIT2.id = AIR2.cityId
  `;
  logger.log({
		level: 'sql',
		message: res
	});
  return res;
}