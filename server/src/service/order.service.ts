interface OrderServiceInterface {
  addOrder(
    clientId: string | undefined,
    flightId: string | undefined,
    comfortClassId: string | undefined,
    airlineId: string | undefined,
  ): Promise<void>
}

class OrderService implements OrderServiceInterface {
  async addOrder(
    clientId: string | undefined,
    flightId: string | undefined,
    comfortClassId: string | undefined,
    airlineId: string | undefined,
  ) {

  }
}

export default new OrderService();