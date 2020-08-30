import { Header } from "./types";

/**
 * Curried function that takes a request and some headers and returns a new request with the headers added.
 * @param headers Headers to add
 */
export const setHeaders = (headers: Header[]) => (request: Request) =>
  new Request(request, {
    headers: [...request.headers.entries(), ...headers]
  });
