import express from "express";
import moment from "moment";
import orderService from "../service/order.service";

interface OrderControllersInterface {
  decoration: (req: express.Request, res: express.Response) => Promise<express.Response<any, Record<string, any>>>
}

class OrderControllers implements OrderControllersInterface {
  async decoration (req: express.Request, res: express.Response): Promise<express.Response<any, Record<string, any>>> {
    const startPoint: string | undefined = req.query.startPoint as string && undefined;
    const endPoint: string | undefined = req.query.endPoint as string && undefined;
    const directDate: string | undefined = req.query.directDate as string && undefined;
    const reverseDate: string | undefined = req.query.reverseDate as string && undefined;

    await orderService.decoration(
      startPoint,
      endPoint,
      directDate && moment(directDate),
      reverseDate && moment(reverseDate)
    );
    return res.json({ startPoint, endPoint }).status(200);
  }
}

export default new OrderControllers();