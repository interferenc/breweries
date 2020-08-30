import { pipe } from "fp-ts/lib/pipeable";
import { Query } from "./types";

/**
 * Convert an object of key/value queries to a query string
 *
 * @param query the key/value pairs
 */
const stringifyQuery = (query: Query) => new URLSearchParams(query).toString();

/**
 * Sets the given query string on the passed Request object
 *
 * @param request The request to set the query string on
 */
const setQueryString = (request: Request) => (queryString: string) => {
  const url = new URL(request.url);
  url.search = queryString;
  return url;
};

/**
 * Sets the given query key/value pair to the passed Request object
 * @param query the kay/value pairs
 */
export const setQuery = (query: Query) => (request: Request) =>
  pipe(
    query,
    stringifyQuery,
    setQueryString(request),
    url => new Request(url.toString(), request)
  );
