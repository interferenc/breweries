import { pipe } from "fp-ts/lib/function";
import { getOrElse, tryCatch } from "fp-ts/lib/Option";
import { LazyTranslationRecord } from "./types";

/**
 * Look up a dictionary value
 * @param dictionary the dictionary
 * @param key the key to look up
 * @param fallback value to use when not found
 */
export const lookup = <T extends string | number>(
  dictionary: LazyTranslationRecord<T>,
  key: T,
  fallback: string
) =>
  pipe(
    tryCatch(dictionary[key]),
    getOrElse(() => fallback)
  );
