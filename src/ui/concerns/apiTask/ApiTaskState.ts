import { ApiError } from "@/services/breweryDB/error";

// This is the state of the async operation, represented with a
// discriminated union. This way it is impossible to set an
// invalid state.
export type ApiTaskState<T> =
  | { pending: false }
  | { pending: true }
  | { pending: false; result: T }
  | { pending: false; error: ApiError };
