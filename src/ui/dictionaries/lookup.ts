import { pipe, Lazy } from "fp-ts/lib/function";
import { getOrElse, tryCatch } from "fp-ts/lib/Option";

/**
 * Look up a dictionary value
 * @param dictionary the dictionary
 * @param key the key to look up
 * @param fallback value to use when not found
 */
export const lookup = <T extends string | number>(
  dictionary: Record<T, Lazy<string>>,
  key: T,
  fallback: string
) =>
  pipe(
    tryCatch(dictionary[key]),
    getOrElse(() => fallback)
  );
