/**
 * A collection of query string keys and values.
 */
export interface Query {
  [name: string]: string;
}

/**
 * Encodes any type T into a string than can be a query string variable value.
 */
export interface QueryValueEncoder<T> {
  (data: T): string;
}

/**
 * Decodes any incoming query string value string into a type T.
 */
export interface QueryValueDecoder<T> {
  (data: string): T;
}

export const stringEncoder: QueryValueEncoder<string> = i => i;
export const stringDecoder: QueryValueDecoder<string> = i => i;

export const numberEncoder: QueryValueEncoder<number> = (i: number) =>
  i.toString();
export const numberDecoder: QueryValueDecoder<number> = (i: string) =>
  parseInt(i, 10);

export const filterEmptyQueryValues = (query: Query): Query =>
  Object.keys(query).reduce((carry, key) => {
    // eslint-disable-next-line no-param-reassign
    if (query[key] !== "") carry[key] = query[key];
    return carry;
  }, {} as Query);
