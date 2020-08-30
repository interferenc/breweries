import { h } from "vue";
import { VNodes } from "../types";
import { ApiTaskState } from "../concerns/apiTask/ApiTaskState";
import { ApiError } from "@/services/breweryDB/error";
import { Loader } from "../components";

type constantVNodes = () => VNodes;
type OnError = (error: ApiError) => VNodes;
type OnResult<T> = (result: T) => VNodes;

const emptyVNode = () => null;
const loader = () => h(Loader);

export const toVNode = <T>(
  onInitial: constantVNodes,
  onPending: constantVNodes,
  onError: OnError,
  onResult: OnResult<T>
) => (taskState: ApiTaskState<T>) => {
  if (taskState.pending) return onPending();
  if ("error" in taskState) return onError(taskState.error);
  if ("result" in taskState) return onResult(taskState.result);
  return onInitial();
};

export const toVNodePending = <T>(onError: OnError, onResult: OnResult<T>) =>
  toVNode(emptyVNode, loader, onError, onResult);
