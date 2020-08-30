import { v4 as uuidv4 } from "uuid";
import * as TE from "fp-ts/lib/TaskEither";
import * as T from "fp-ts/lib/Task";
import { pipe } from "fp-ts/lib/pipeable";
import { ApiError } from "@/services/breweryDB/error";
import { ref, UnwrapRef } from "vue";
import { ApiTask } from "./apiTask";
import { ApiTaskState } from "./ApiTaskState";
import { Lazy } from "fp-ts/lib/function";
import { apiTaskRepository } from "./apiTaskRepository";

export function useApiTask<T>(
  lazyTask: Lazy<TE.TaskEither<ApiError, T>>,
  key = uuidv4()
): ApiTask<T> {
  const taskState = ref<ApiTaskState<T>>({ pending: false });

  const executeTask = () => {
    taskState.value = { pending: true };

    // generate random kay and store it for this async operation identified by 'key'
    const id = uuidv4();
    apiTaskRepository[key] = id;

    pipe(
      lazyTask(),
      TE.fold(
        error =>
          T.task.fromIO(() => {
            if (apiTaskRepository[key] === id) {
              console.log(
                "last fetch, returning error",
                key,
                apiTaskRepository[key],
                id
              );
              console.log(error);
              taskState.value = { pending: false, error };
              delete apiTaskRepository[key];
            } else {
              console.log(
                "not last fetch, ignoring error",
                key,
                apiTaskRepository[key],
                id
              );
            }
          }),
        result =>
          T.task.fromIO(() => {
            if (apiTaskRepository[key] === id) {
              console.log(
                "last fetch, executing mutation",
                key,
                apiTaskRepository[key],
                id
              );
              taskState.value = {
                pending: false,
                result: result as UnwrapRef<T>
              };
              delete apiTaskRepository[key];
            } else {
              console.log(
                "not last fetch, ignoring mutation",
                key,
                apiTaskRepository[key],
                id
              );
            }
          })
      )
    )();
  };

  return { executeTask, taskState };
}
