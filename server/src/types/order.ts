export type Order = {
  price: number,
  comfortClass: string,
  planeType: string,
  airArrivalData: string,
  airDepartureData: string,
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
  flightNumber: string
}