import { v4 as uuidv4 } from "uuid";

/**
 * Stores the last executionKey for all taskKeys
 */
const repository: Record<string, string> = {};

/**
 * only executes the mutator function if the current execution is the last execution
 *
 * @param taskKey key of the task
 * @param executionKey kay of the execution
 */
const updateState = (taskKey: string, executionKey: string) => (
  mutation: Function
) => () => {
  if (repository[taskKey] === executionKey) {
    mutation();
    delete repository[taskKey];
  }
};

/**
 * Sets an executionKey for a given taskKey
 * @param taskKey
 * @param executionKey
 * @returns an `updateState` function
 */
export const start = () => {
  /**
   * Generate keys
   */
  const taskKey = uuidv4();
  const executionKey = uuidv4();

  /**
   * Store execution key for task
   */
  repository[taskKey] = executionKey;

  /**
   * Return updateState function
   */
  return updateState(taskKey, executionKey);
};
