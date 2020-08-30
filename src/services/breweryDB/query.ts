import { pipe } from "fp-ts/lib/pipeable";

export interface ApiQuery {
  [name: string]: string;
}

const stringifyQuery = (query: ApiQuery) =>
  new URLSearchParams(query).toString();

const setQueryString = (request: Request) => (queryString: string) => {
  const url = new URL(request.url);
  url.search = queryString;
  return url;
};

export const setQuery = (query: ApiQuery) => (request: Request) =>
  pipe(
    query,
    stringifyQuery,
    setQueryString(request),
    url => new Request(url.toString(), request)
    /*new Request(url, {
        method: request.method,
        body: request.body,
        headers: request.headers
      })*/
  );

export interface QueryValueEncoder<T> {
  (data: T): string;
}
export const string: QueryValueEncoder<string> = i => i;
export const number: QueryValueEncoder<number> = (i: number) => i.toString();
