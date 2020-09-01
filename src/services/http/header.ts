/**
 * Curried function that takes a request and some headers and returns a new request with the headers added.
 * @param headers Headers to add
 */
export const setHeaders = (headers: Headers) => (request: Request) => {
  const h = new Headers(request.headers);

  headers.forEach((value, key) => h.set(key, value));

  return new Request(request, { headers: h });
};
