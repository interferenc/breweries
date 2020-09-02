/**
 * Curried function that takes a request and some headers and returns a new request with the headers added.
 * @param headers Headers to add
 */
export const setHeaders = (headers: Headers) => (request: Request) => {
  /**
   * Copy the headers of the original request
   */
  const h = new Headers(request.headers);

  /**
   * Set each header value on the new headers
   */
  headers.forEach((value, key) => h.set(key, value));

  /**
   * Create a new request with the new headers
   */
  return new Request(request, { headers: h });
};
