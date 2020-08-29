export interface Query {
  [name: string]: string;
}

export interface QueryValueEncoder<T> {
  (data: T): string;
}

export interface QueryValueDecoder<T> {
  (data: string): T;
}
export const stringEncoder: QueryValueEncoder<string> = i => i;
export const numberEncoder: QueryValueEncoder<number> = (i: number) =>
  i.toString();

export const stringDecoder: QueryValueDecoder<string> = i => i;
export const numberDecoder: QueryValueDecoder<number> = (i: string) =>
  parseInt(i, 10);

export const filterEmptyQueryValues = (query: Query): Query =>
  Object.keys(query).reduce((carry, key) => {
    // eslint-disable-next-line no-param-reassign
    if (query[key] !== "") carry[key] = query[key];
    return carry;
  }, {} as Query);
