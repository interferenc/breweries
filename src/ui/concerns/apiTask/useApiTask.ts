import { v4 as uuidv4 } from "uuid";
import * as TE from "fp-ts/lib/TaskEither";
import * as T from "fp-ts/lib/Task";
import { pipe } from "fp-ts/lib/pipeable";
import { ApiError } from "@/services/breweryDB/error";
import { ref, UnwrapRef } from "vue";
import { ApiTask } from "./apiTask";
import { ApiTaskState } from "./ApiTaskState";
import { Lazy } from "fp-ts/lib/function";

// Global store for all async operations identified by a string key.
// Each run gets a random value and sets that value for the key.
// When the operation is done, before executing the mutation,
// we check if the current run is the last run, in which case
// the value will still be the same. If it is not the same, some other
// run of the same process started in the meantime, and the results
// for this run are ignored.
const taskIds: Record<string, string> = {};

export function useApiTask<T>(
  lazyTask: Lazy<TE.TaskEither<ApiError, T>>,
  key = uuidv4()
): ApiTask<T> {
  const taskState = ref<ApiTaskState<T>>({ pending: false });

  const executeTask = () => {
    taskState.value = { pending: true };

    // generate random kay and store it for this async operation identified by 'key'
    const id = uuidv4();
    taskIds[key] = id;

    pipe(
      lazyTask(),
      TE.fold(
        error =>
          T.task.fromIO(() => {
            if (taskIds[key] === id) {
              console.log("last fetch, returning error", key, taskIds[key], id);
              console.log(error);
              taskState.value = { pending: false, error };
              delete taskIds[key];
            } else {
              console.log(
                "not last fetch, ignoring error",
                key,
                taskIds[key],
                id
              );
            }
          }),
        result =>
          T.task.fromIO(() => {
            if (taskIds[key] === id) {
              console.log(
                "last fetch, executing mutation",
                key,
                taskIds[key],
                id
              );
              taskState.value = {
                pending: false,
                result: result as UnwrapRef<T>
              };
              delete taskIds[key];
            } else {
              console.log(
                "not last fetch, ignoring mutation",
                key,
                taskIds[key],
                id
              );
            }
          })
      )
    )();
  };

  return { executeTask, taskState };
}
