export type FlightDecoration = {
  id: number,
  airArrivalData: string,
  airDepartureData: string,
  flightCode: string,
  route: {
    airArrival: {
      title: string,
      city: string
    },
    airDeparture: {
      title: string,
      city: string
    }
  },
  planeType: string,
  airlineTitle: string
}