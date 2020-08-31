import { TaskEither, fold } from "fp-ts/lib/TaskEither";
import { task } from "fp-ts/lib/Task";
import { pipe } from "fp-ts/lib/pipeable";
import { ApiError } from "@/services/breweryDB";
import { ref, UnwrapRef } from "vue";
import { ApiTask } from "./apiTask";
import { ApiTaskState } from "./ApiTaskState";
import { start } from "./apiTaskRepository";
import { Lazy } from "fp-ts/lib/function";

type LazyTaskEither<T> = Lazy<TaskEither<ApiError, T>>;

/**
 * Turns a `TaskEither` into an `execute` function and a `TaskState` object.
 *
 * @param taskEither the taskEither to handle
 * @param taskKey task key to use for request de-duplication
 */
export function useApiTask<T>(lazyTaskEither: LazyTaskEither<T>): ApiTask<T> {
  /**
   * Set initial state
   */
  const taskState = ref<ApiTaskState<T>>({ pending: false });

  /**
   * Execute the lazyTaskEither and keeps track of the task state.
   */
  const executeTask = () => {
    /**
     * Create a new task in the ApiTaskRepository.
     *
     * The returned updateState function can be used to update the taskState if the current execution is the last
     * execution.
     */
    const updateState = start();

    /**
     * Mark state as pending
     */
    taskState.value = { pending: true };

    /**
     * Handle the error state
     * @param error the error to handle
     */
    const onLeft = (error: ApiError) =>
      task.fromIO(
        updateState(() => (taskState.value = { pending: false, error }))
      );

    /**
     * Handle the success state
     * @param result the result to handle
     */
    const onRight = (result: T) =>
      task.fromIO(
        updateState(
          () =>
            (taskState.value = {
              pending: false,
              result: result as UnwrapRef<T>
            })
        )
      );

    /**
     * execute the lazyTaskEither and fold its results
     */
    pipe(lazyTaskEither(), fold(onLeft, onRight))();
  };

  /**
   * Return the ApiTask with the `executeTask` function and the `taskState`.
   */
  return { executeTask, taskState };
}
