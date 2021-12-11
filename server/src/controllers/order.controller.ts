import express from "express";
import orderService from "../service/order.service";

interface OrderControllerInterface {
  addOrder: (req: express.Request, res: express.Response) => Promise<express.Response<any, Record<string, any>>>
}

class OrderController implements OrderControllerInterface {
  async addOrder(req: express.Request, res: express.Response): Promise<express.Response<any, Record<string, any>>> {
    const clientId: string | undefined = req.body.clientId as string;
    const flightId: string | undefined = req.body.flightId as string;
    const comfortClassId: string | undefined = req.body.comfortClassId as string;
    const airlineId: string | undefined = req.body.airlineId as string;

    await orderService.addOrder(clientId, flightId, comfortClassId, airlineId);
    return res.json('Ok').status(200);
  }
}

export default new OrderController();