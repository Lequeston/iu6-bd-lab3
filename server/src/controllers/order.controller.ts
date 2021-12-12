import express from "express";
const { validationResult } = require('express-validator');

import orderService from "../service/order.service";

interface OrderControllerInterface {
  addOrder: (req: express.Request, res: express.Response) => Promise<express.Response<any, Record<string, any>>>,
  getAll: (req: express.Request, res: express.Response) => Promise<express.Response<any, Record<string, any>>>
}

class OrderController implements OrderControllerInterface {
  async addOrder(req: express.Request, res: express.Response): Promise<express.Response<any, Record<string, any>>> {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const clientId: string | undefined = req.body.clientId as string;
    const flightId: string | undefined = req.body.flightId as string;
    const priceId: string | undefined = req.body.priceId as string;

    const order = await orderService.addOrder(clientId, flightId, priceId);
    return res.json({
      res: order
    }).status(200);
  }

  async getAll(req: express.Request, res: express.Response): Promise<express.Response<any, Record<string, any>>> {
    const id = req.headers.authorization;
    const orders = await orderService.getAll(id);
    return res.json({
      res: {
        array: orders
      }
    }).status(200);
  }
}

export default new OrderController();