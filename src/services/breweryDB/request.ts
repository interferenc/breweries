import { flow } from "fp-ts/lib/function";

import { setQuery } from "./query";
import {
  createGetRequest as getRequestFactory,
  RequestFactory
} from "@/services/http";

const setHeaders = (headers: Headers, toSet: string[][]): string[][] => [
  ...headers.entries(),
  ...toSet
];

const addBaseHeaders = (req: Request) =>
  new Request(req, {
    headers: setHeaders(req.headers, [
      ["Content-Type", "application/json"],
      ["Accept", "application/json"]
    ])
  });

const addAuthorizationHeaders = (req: Request) =>
  new Request(req, {
    headers: setHeaders(req.headers, [["Authorization", "Bearer token"]])
  });

/*const baseHeaders = (factory: RequestFactory) => flow(factory, addBaseHeaders);*/

export const createGetRequest = flow(getRequestFactory, addBaseHeaders);

export const createAuthorizedGetRequest = flow(
  createGetRequest,
  addAuthorizationHeaders
);
