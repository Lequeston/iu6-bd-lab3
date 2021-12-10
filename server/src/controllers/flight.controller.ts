import express from "express";
import moment from "moment";

import flightService from "../service/flight.service";

interface FlightControllersInterface {
  decoration: (req: express.Request, res: express.Response) => Promise<express.Response<any, Record<string, any>>>
}

class FlightControllers implements FlightControllersInterface {
  async decoration (req: express.Request, res: express.Response): Promise<express.Response<any, Record<string, any>>> {
    const startPoint: string | undefined = req.query.startPoint as string;
    const endPoint: string | undefined = req.query.endPoint as string;
    const date: string | undefined = req.query.date as string;
    const page: number = parseInt(req.query.page as string, 10) || 1;
    const limit: number = parseInt(req.query.limit as string, 10) || 10;

    const offset: number = (page - 1) * limit;

    const result = await flightService.decoration(
      startPoint,
      endPoint,
      date && moment(date),
      offset,
      limit
    );

    return res.json({
      res: result
    }).status(200);
  }
}

export default new FlightControllers();