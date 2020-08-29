import { v4 as uuidv4 } from "uuid";
import * as TE from "fp-ts/lib/TaskEither";
import * as T from "fp-ts/lib/Task";
import { pipe } from "fp-ts/lib/pipeable";
import { ApiError } from "@/services/breweryDB/error";
import { ref, Ref, UnwrapRef, VNode } from "vue";

type FoldCallbacks<T> = {
  initial: () => VNode;
  pending: () => VNode;
  error: (error: ApiError) => VNode;
  result: (result: T) => VNode;
};

export const fold = <T>(
  taskState: ApiTaskState<T>,
  callbacks: FoldCallbacks<T>
): VNode => {
  console.log("fold state running", JSON.stringify(taskState));
  if (taskState.pending) {
    console.log("pending");
    return callbacks.pending();
  }

  if ("error" in taskState) {
    console.log("error");
    return callbacks.error(taskState.error);
  }

  if ("result" in taskState) {
    console.log("result");
    return callbacks.result(taskState.result);
  }

  console.log("initial");
  return callbacks.initial();
};

// This is the state of the async operation, represented with a
// discriminated union. This way it is impossible to set an
// invalid state.
export type ApiTaskState<T> =
  | { pending: false }
  | { pending: true }
  | { pending: false; result: T }
  | { pending: false; error: ApiError };

// Global store for all async operations identified by a string key.
// Each run gets a random value and sets that value for the key.
// When the operation is done, before executing the mutation,
// we check if the current run is the last run, in which case
// the value will still be the same. If it is not the same, some other
// run of the same process started in the meantime, and the results
// for this run are ignored.
const asyncProcessIDs: Record<string, string> = {};

export interface ApiTask<T> {
  execute: () => void;
  state: Ref<ApiTaskState<T>>;
}

export function useApiTask<T>(
  fn: () => TE.TaskEither<ApiError, T>,
  key = uuidv4()
): ApiTask<T> {
  // state
  const state = ref<ApiTaskState<T>>({ pending: false });

  // executable process
  // TODO: find a way to make input optional AND keep proper typings
  const execute = () => {
    state.value = { pending: true };

    // generate random kay and store it for this async operation identified by 'key'
    const id = uuidv4();
    asyncProcessIDs[key] = id;

    pipe(
      fn(),
      TE.fold(
        error =>
          T.task.fromIO(() => {
            if (asyncProcessIDs[key] === id) {
              console.log(
                "last fetch, returning error",
                key,
                asyncProcessIDs[key],
                id
              );
              console.log(error);
              state.value = { pending: false, error };
              delete asyncProcessIDs[key];
            } else {
              console.log(
                "not last fetch, ignoring error",
                key,
                asyncProcessIDs[key],
                id
              );
            }
          }),
        result =>
          T.task.fromIO(() => {
            if (asyncProcessIDs[key] === id) {
              console.log(
                "last fetch, executing mutation",
                key,
                asyncProcessIDs[key],
                id
              );
              state.value = { pending: false, result: result as UnwrapRef<T> };
              delete asyncProcessIDs[key];
            } else {
              console.log(
                "not last fetch, ignoring mutation",
                key,
                asyncProcessIDs[key],
                id
              );
            }
          })
      )
    )();
  };

  return { execute, state };
}
