import { h } from "vue";
import { VNodes } from "../types";
import { ApiTaskState } from "../concerns/apiTask/ApiTaskState";
import { ApiError } from "@/services/breweryDB";
import { Loader } from "../components";

type constantVNodes = () => VNodes;
type OnError = (error: ApiError) => VNodes;
type OnSuccess<T> = (result: T) => VNodes;

const emptyVNode = () => null;
const loader = () => h(Loader);

/**
 * Folds a `TaskState` object into VNodes
 *
 * @param onInitial initial state
 * @param onPending pending state
 * @param onError error state, takes the error as parameter
 * @param onSuccess success state, takes the result as parameter
 */
export const toVNodes = <T>(
  onInitial: constantVNodes,
  onPending: constantVNodes,
  onError: OnError,
  onSuccess: OnSuccess<T>
) => (taskState: ApiTaskState<T>) => {
  if (taskState.pending) return onPending();
  if ("error" in taskState) return onError(taskState.error);
  if ("result" in taskState) return onSuccess(taskState.result);
  return onInitial();
};

/**
 * Folds a `TaskState` object into VNodes with a default loader and empty initial state
 * @param onError error state, takes the error as parameter
 * @param onSuccess success state, takes the result as parameter
 */
export const toVNodesPending = <T>(onError: OnError, onSuccess: OnSuccess<T>) =>
  toVNodes(emptyVNode, loader, onError, onSuccess);
