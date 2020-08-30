export const enum MimeType {
  ApplicationJson = "application/json"
}

export const enum HttpHeader {
  Accept = "Accept",
  Authorization = "Authorization",
  ContentType = "Content-Type"
}

export type Header = [HttpHeader, string];

export interface Query {
  [name: string]: string;
}
