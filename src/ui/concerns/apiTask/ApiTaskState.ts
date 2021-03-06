import { ApiError } from "@/services/breweryDB";

/**
 * The state of the async task represented with a discriminated union, making it umpossible to set an invalid state.
 */
export type ApiTaskState<T> =
  | { pending: false }
  | { pending: true }
  | { pending: false; result: T }
  | { pending: false; error: ApiError };
