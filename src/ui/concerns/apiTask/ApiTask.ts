import { Ref } from "vue";
import { ApiTaskState } from "./ApiTaskState";

/**
 * Represents an async task and its state.
 */
export interface ApiTask<T> {
  executeTask: () => void;
  taskState: Ref<ApiTaskState<T>>;
}
