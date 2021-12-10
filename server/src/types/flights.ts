export type FlightDecoration = {
  id: number,
  airArrivalData: string,
  airDepartureData: string,
  flightCode: string,
  route: {
    airArrival: string,
    airDeparture: string
  },
  planeType: string,
  airlineTitle: string
}