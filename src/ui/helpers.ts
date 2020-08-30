import { Option, fold } from "fp-ts/lib/Option";
import { pipe } from "fp-ts/lib/function";
import { h } from "vue";
import { Filter } from "./components/Filter";
import { getOrElse, tryCatch } from "fp-ts/lib/Option";

export function getMappedRecord<T extends string | number | symbol>(
  map: Record<T, string>,
  value: T,
  fallback: string
): string {
  return pipe(
    tryCatch(() => map[value]),
    getOrElse<string>(() => fallback)
  );
}
