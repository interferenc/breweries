/* eslint-disable @typescript-eslint/camelcase */
import { chain, map } from "fp-ts/lib/TaskEither";
import { pipe, flow } from "fp-ts/lib/function";
import { breweryCodec, breweryListCodec } from "./codec";
import { breweryListTransformer, breweryTransformer } from "./transform";
import {
  authorizedApiGetRequest,
  setQuery,
  Query,
  execute,
  decode
} from "@/services/breweryDB";
import * as q from "../../query";

const BASE_URL = "https://api.openbrewerydb.org/breweries";
const recordUrl = (id: number): string => `${BASE_URL}/${id}`;

interface BreweryListQuery {
  city: string;
  name: string;
  page: number;
}

const encodeBreweryListQuery = (query: BreweryListQuery): Query => ({
  by_city: q.string(query.city),
  by_name: q.string(query.name),
  page: q.number(query.page)
});

export const getList = (query: BreweryListQuery) =>
  pipe(
    BASE_URL,
    authorizedApiGetRequest,
    setQuery(encodeBreweryListQuery(query)),
    execute,
    chain(decode(breweryListCodec)),
    map(breweryListTransformer)
  );

export const get = flow(
  recordUrl,
  authorizedApiGetRequest,
  execute,
  chain(decode(breweryCodec)),
  map(breweryTransformer)
);
