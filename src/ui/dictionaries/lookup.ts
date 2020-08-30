import { pipe } from "fp-ts/lib/function";
import { getOrElse, tryCatch } from "fp-ts/lib/Option";

export function lookup<T extends string | number | symbol>(
  map: Record<T, string>,
  value: T,
  fallback: string
): string {
  return pipe(
    tryCatch(() => map[value]),
    getOrElse<string>(() => fallback)
  );
}
