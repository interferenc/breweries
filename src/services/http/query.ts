/**
 * Sets the given query key/value pair to the passed Request object
 * @param query the key/value pairs
 */
export const setQuery = (query: URLSearchParams) => (request: Request) => {
  const url = new URL(request.url);

  query.forEach((value, key) => url.searchParams.set(key, value));

  return new Request(url.toString(), request);
};
