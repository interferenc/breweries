/**
 * Sets the given query key/value pair to the passed Request object
 * @param query the key/value pairs
 */
export const setQuery = (query: URLSearchParams) => (request: Request) => {
  /**
   * Copy the url of the original request
   */
  const url = new URL(request.url);

  /**
   * Set each query param value on the new url
   */
  query.forEach((value, key) => url.searchParams.set(key, value));

  /**
   * Create a new request with the new url
   */
  return new Request(url.toString(), request);
};
