import { Client } from "pg";

import client from '../configs/bd';
import logger from "../configs/logs";
import ApiError from "../error/ApiError";
import { getClientQuery, updateClientsQuery, updateDocumentQuery } from "../querys/client.query";
import { Client as ClientType } from "../types/client";

interface ClientServiceInterface {
  changeClient: (
    id: string | undefined,
    lastName: string | undefined,
    firstName: string | undefined,
    patronymic: string | undefined,
    telephoneNumber: string | undefined,
    email: string | undefined,
    typeDocument: string | undefined,
    numberDocument: string | undefined,
  ) => Promise<ClientType>,
  getClient: (
    id: string | undefined
  ) => Promise<ClientType>
}

class ClientService implements ClientServiceInterface {
  private dbClient: Client;

  constructor(dbClient: Client) {
    this.dbClient = dbClient;
  }

  private parse(value): ClientType {
    return {
      id: value['id'],
      lastName: value['lastname'],
      firstName: value['firstname'],
      patronymic: value['patronymic'],
      telephoneNumber: value['telephonenumber'],
      email: value['email'],
      document: {
        typeDocument: value['typedocument'],
        numberDocument: value['numberdocument']
      }
    }
  }

  async changeClient(
    id: string | undefined,
    lastName: string | undefined,
    firstName: string | undefined,
    patronymic: string | undefined,
    telephoneNumber: string | undefined,
    email: string | undefined,
    typeDocument: string | undefined,
    numberDocument: string | undefined
  ): Promise<ClientType> {
    if (!id) {
      throw ApiError.internal('Не задан id для клиента');
    }
    await this.dbClient.query('BEGIN');
    const queryClient = await this.dbClient.query(updateClientsQuery(
      id,
      lastName,
      firstName,
      patronymic,
      telephoneNumber,
      email
    ));
    const queryDocument = await this.dbClient.query(updateDocumentQuery(
      id,
      typeDocument,
      numberDocument
    ));
    await this.dbClient.query('COMMIT');
    const res: ClientType = this.parse({...queryClient.rows[0], ...queryDocument.rows[0]});
    logger.info(res);
    return res;
  }

  async getClient(id: string | undefined): Promise<ClientType> {
    if (!id) {
      throw ApiError.internal('Не задан id для клиента');
    }
    const query = await this.dbClient.query(getClientQuery(id));
    const res: ClientType = this.parse(query.rows[0]);
    return res;
  }
}

export default new ClientService(client);