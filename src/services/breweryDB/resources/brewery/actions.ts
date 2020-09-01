/* eslint-disable @typescript-eslint/camelcase */
import { chain, map } from "fp-ts/lib/TaskEither";
import { pipe, flow } from "fp-ts/lib/function";
import { breweryCodec, breweryListCodec } from "./codec";
import { breweryListTransformer, breweryTransformer } from "./transform";
import {
  authorizedApiGetRequest,
  setQuery,
  execute,
  decode
} from "@/services/breweryDB";
import * as q from "../../query";

/**
 * The base url of the resource.
 */
const BASE_URL = "https://api.openbrewerydb.org/breweries";

/**
 * Construct a resource URL from an ID.
 * @param id the ID of the resource
 */
const recordUrl = (id: number): string => `${BASE_URL}/${id}`;

/**
 * Specifies the required query string parameters for a list query.
 */
interface BreweryListQuery {
  city: string;
  name: string;
  page: number;
}

/**
 * Encodes the provided query values into strings that can be used in the query string.
 * @param query the query values to encode
 */
const encodeBreweryListQuery = (query: BreweryListQuery) =>
  new URLSearchParams({
    by_city: q.string(query.city),
    by_name: q.string(query.name),
    page: q.number(query.page)
  });

/**
 * Get a list of breweries
 * @param query the filters for the list
 */
export const getList = (query: BreweryListQuery) =>
  pipe(
    /** Start with the base url */
    BASE_URL,

    /** Turn it into a Request */
    authorizedApiGetRequest,

    /** Add the query to the Request */
    setQuery(encodeBreweryListQuery(query)),

    /** Execute the request */
    execute,

    /** Decode the response using the passed codec */
    chain(decode(breweryListCodec)),

    /** Transform the decoded reponse into a BreweryList entity */
    map(breweryListTransformer)
  );

/**
 * Get a single brewery
 * @param id the ID of the brewery
 */
export const get = flow(
  /** Turn the ID into a URL */
  recordUrl,

  /** Turn it into a Request */
  authorizedApiGetRequest,

  /** Execute the request */
  execute,

  /** Decode the response using the passed codec */
  chain(decode(breweryCodec)),

  /** Transform the decoded reponse into a Brewery entity */
  map(breweryTransformer)
);
