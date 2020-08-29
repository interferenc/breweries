/* eslint-disable @typescript-eslint/camelcase */
import { chain, map } from "fp-ts/lib/TaskEither";
import { pipe, flow } from "fp-ts/lib/function";
import { breweryCodec, breweryListCodec } from "./codec";
import { breweryListTransformer, breweryTransformer } from "./transform";

import { createAuthorizedGetRequest } from "@/services/breweryDB/request";
import { setQuery, ApiQuery } from "@/services/breweryDB/query";
import { executeRequest } from "@/services/breweryDB/action";
import { decode } from "@/services/breweryDB/decoder";

const baseUrl = "https://api.openbrewerydb.org/breweries";
const recordUrl = (id: number): string => `${baseUrl}/${id}`;

interface BreweryListQuery {
  city: string;
  name: string;
  page: number;
}

const encodeBreweryListQuery = (query: BreweryListQuery): ApiQuery => ({
  by_city: query.city,
  by_name: query.name,
  page: query.page.toString()
});

export const getList = (query: BreweryListQuery) =>
  pipe(
    baseUrl,
    createAuthorizedGetRequest,
    setQuery(encodeBreweryListQuery(query)),
    executeRequest,
    chain(decode(breweryListCodec)),
    map(breweryListTransformer)
  );

export const get = flow(
  recordUrl,
  createAuthorizedGetRequest,
  executeRequest,
  chain(decode(breweryCodec)),
  map(breweryTransformer)
);
