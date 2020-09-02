import {
  stringEncoder,
  stringDecoder,
  numberEncoder,
  numberDecoder
} from "@/ui/router/query";
import { queryState } from "./queryState";

/**
 * Creates a writable computed string variable stored in the query string
 * @param key query string key
 * @param fallback default value, used for fallback as well
 */
export const number = (key: string, fallback = 0) =>
  queryState<number>(key, numberEncoder, numberDecoder, fallback);

/**
 * Creates a writable computed number variable stored in the query string
 * @param key query string key
 * @param fallback default value, used for fallback as well
 */
export const string = (key: string, fallback = "") =>
  queryState<string>(key, stringEncoder, stringDecoder, fallback);
