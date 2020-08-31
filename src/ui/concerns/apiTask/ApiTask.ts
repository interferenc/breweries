import { Ref } from "vue";
import { ApiTaskState } from "./ApiTaskState";

/**
 * Represents an ApiTask and its state.
 */
export interface ApiTask<T> {
  executeTask: () => void;
  taskState: Ref<ApiTaskState<T>>;
}
