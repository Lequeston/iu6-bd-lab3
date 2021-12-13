import express from "express";
import clientService from "../service/client.service";
const { validationResult } = require('express-validator');


interface ClientControllerInterface {
  changeClient: (req: express.Request, res: express.Response, next: express.NextFunction) => Promise<express.Response<any, Record<string, any>>>,
  getClient: (req: express.Request, res: express.Response, next: express.NextFunction) => Promise<express.Response<any, Record<string, any>>>
}

class ClientController implements ClientControllerInterface {
  async changeClient(req: express.Request, res: express.Response, next: express.NextFunction): Promise<express.Response<any, Record<string, any>>> {
    try {
    const id: string | undefined = req.headers.authorization;

    const lastName: string | undefined = req.body.lastName as string;
    const firstName: string | undefined = req.body.firstName as string;
    const patronymic: string | undefined = req.body.patronymic as string;
    const telephoneNumber: string | undefined = req.body.telephoneNumber as string;
    const email: string | undefined = req.body.email as string;

    const typeDocument: string | undefined = req.body.typeDocument as string;
    const numberDocument: string | undefined = req.body.numberDocument as string;

    const client = await clientService.changeClient(
      id,
      lastName,
      firstName,
      patronymic,
      telephoneNumber,
      email,
      typeDocument,
      numberDocument
    );
    return res.json({
      res: client
    }).status(200);
    } catch(e) {
      next(e);
    }
  }

  async getClient(req: express.Request, res: express.Response, next: express.NextFunction): Promise<express.Response<any, Record<string, any>>> {
    try {
      const id: string | undefined = req.headers.authorization;

      const client = await clientService.getClient(id);
      return res.json({
        res: client
      }).status(200);
    } catch(e) {
      next(e);
    }
  }
}

export default new ClientController();