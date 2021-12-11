import express from "express";

import comfortClassesService from "../service/comfortClasses.service";

interface ComfortClassesControllerInterface {
  getAll: (req: express.Request, res: express.Response) => Promise<express.Response<any, Record<string, any>>>
}

class ComfortClassesController implements ComfortClassesControllerInterface {
  async getAll(req: express.Request, res: express.Response) {
    const result = await comfortClassesService.getAll();
    return res.json({
      res: result
    }).status(200);
  }
}

export default new ComfortClassesController();