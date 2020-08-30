import { ApiError } from "@/services/breweryDB/error";
import { VNodes } from "@/ui/types";

// This is the state of the async operation, represented with a
// discriminated union. This way it is impossible to set an
// invalid state.
export type ApiTaskState<T> =
  | { pending: false }
  | { pending: true }
  | { pending: false; result: T }
  | { pending: false; error: ApiError };

export const foldTaskState = <T>(
  taskState: ApiTaskState<T>,
  {
    initial,
    pending,
    error,
    result
  }: {
    initial: () => VNodes;
    pending: () => VNodes;
    error: (error: ApiError) => VNodes;
    result: (result: T) => VNodes;
  }
): VNodes => {
  if (taskState.pending) return pending();
  if ("error" in taskState) return error(taskState.error);
  if ("result" in taskState) return result(taskState.result);
  return initial();
};
