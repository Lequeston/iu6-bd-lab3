export type Client = {
  id: string,
  lastName: string,
  firstName: string,
  patronymic: string,
  telephoneNumber: string,
  email: string
  document: Document
}

export type Document = {
  typeDocument: string,
  numberDocument: string,
}