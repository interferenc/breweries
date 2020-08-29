import { Ref } from "vue";
import { ApiTaskState } from "./ApiTaskState";

export interface ApiTask<T> {
  executeTask: () => void;
  taskState: Ref<ApiTaskState<T>>;
}
