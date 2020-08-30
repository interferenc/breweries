import { TaskEither, fold } from "fp-ts/lib/TaskEither";
import { task } from "fp-ts/lib/Task";
import { pipe } from "fp-ts/lib/pipeable";
import { ApiError } from "@/services/breweryDB/error";
import { ref, UnwrapRef } from "vue";
import { ApiTask } from "./apiTask";
import { ApiTaskState } from "./ApiTaskState";
import { Lazy } from "fp-ts/lib/function";
import {
  generateTaskKey,
  generateExecutionKey,
  set,
  check,
  unset
} from "./apiTaskRepository";

type LazyTask<T> = Lazy<TaskEither<ApiError, T>>;

export function useApiTask<T>(
  lazyTask: LazyTask<T>,
  taskKey = generateTaskKey()
): ApiTask<T> {
  const taskState = ref<ApiTaskState<T>>({ pending: false });

  const executeTask = () => {
    const executionKey = generateExecutionKey();
    set(taskKey, executionKey);

    taskState.value = { pending: true };

    const onLeft = (error: ApiError) =>
      task.fromIO(() => {
        if (check(taskKey, executionKey)) {
          taskState.value = { pending: false, error };
          unset(taskKey);
        }
      });

    const onRight = (result: T) =>
      task.fromIO(() => {
        if (check(taskKey, executionKey)) {
          taskState.value = {
            pending: false,
            result: result as UnwrapRef<T>
          };
          unset(taskKey);
        }
      });

    pipe(lazyTask(), fold(onLeft, onRight))();
  };

  return { executeTask, taskState };
}
