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
    const directDate: string | undefined = req.query.directDate as string;
    const reverseDate: string | undefined = req.query.reverseDate as string;

    const result = await flightService.decoration(
      startPoint,
      endPoint,
      directDate && moment(directDate),
      reverseDate && moment(reverseDate)
    );
    return res.json({
      res: result
    }).status(200);
  }
}

export default new FlightControllers();