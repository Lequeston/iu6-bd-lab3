import express from "express";
import cityService from "../service/city.service";

interface CityControllerInterface {
  getAll: (req: express.Request, res: express.Response) => Promise<express.Response<any, Record<string, any>>>
}

class CityController implements CityControllerInterface {
  async getAll(req: express.Request, res: express.Response) {
    const cites = await cityService.getAll();
    return res.json({
      res: cites
    }).status(200);
  }
}

export default new CityController();