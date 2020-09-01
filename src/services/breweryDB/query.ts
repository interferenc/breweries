/**
 * An interface representing a function that can encode an arbitrary data type to a query string value for the brewery
 * DB API
 */
interface QueryValueEncoder<T> {
  (data: T): string;
}

/**
 * Encodes a string to be used as query string value for the brewery DB API
 * @param i the value to encode
 */
export const string: QueryValueEncoder<string> = i => i.replace(/ /g, "_");

/**
 * Encodes a number to be used as query string value for the brewery DB API
 * @param i the value to encode
 */
export const number: QueryValueEncoder<number> = (i: number) => i.toString();

export { setQuery } from "@/services/http";
