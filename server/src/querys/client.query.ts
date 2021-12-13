import logger from "../configs/logs";

const clientSelect = `
SELECT
  clients.id,
	clients.lastName,
	clients.firstName,
	clients.patronymic,
	clients.telephoneNumber,
	clients.email,
	documents.typeDocument,
	documents.numberDocument
`;

export const getClientQuery = (id: string) => {
  const res = `
  ${clientSelect}
  FROM clients, documents
  WHERE
    clients.id = ${id} AND
    clients.id = documents.clientId
  `
  logger.log({
		level: 'sql',
		message: res
	});
  return res;
};

export const updateClientsQuery = (
  id: string,
  lastName: string,
	firstName: string,
	patronymic: string,
	telephoneNumber: string,
	email: string
) => {
  const res = `
  UPDATE clients
  SET
    lastName = '${lastName}',
    firstName = '${firstName}',
    patronymic = '${patronymic}',
    telephoneNumber = '${telephoneNumber}',
    email = '${email}'
  WHERE
    id = ${id}
  RETURNING
    id,
    lastName,
    firstName,
    patronymic,
    telephoneNumber,
    email
  `;
  logger.log({
		level: 'sql',
		message: res
	});
  return res;
};

export const updateDocumentQuery = (
  id, typeDocument, numberDocument
) => {
  const res = `
  UPDATE documents
  SET
    typeDocument = '${typeDocument}',
    numberDocument = '${numberDocument}'
  WHERE
    clientId = ${id}
  RETURNING
    typeDocument,
    numberDocument
  `;
  logger.log({
		level: 'sql',
		message: res
	});
  return res;
};