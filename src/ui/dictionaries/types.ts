import { Lazy } from "fp-ts/lib/function";

export type LazyTranslationRecord<T extends number | string> = Record<
  T,
  Lazy<string>
>;
