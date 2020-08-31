import { v4 as uuidv4 } from "uuid";

/**
 * Stores the last executionKey for all taskKeys
 */
const repository: Record<string, string> = {};

/**
 * Generates a task key
 */
export const generateTaskKey = uuidv4;

/**
 * Generates an execution key
 */
export const generateExecutionKey = uuidv4;

/**
 * Gets a value from the ApiTaskRepository
 * @param taskKey the taskKey for the task
 */
export const get = (taskKey: string) => repository[taskKey];

/**
 * Checks if the provided executionKey is last one for the taskKey
 *
 * @param taskKey key of the task
 * @param executionKey kay of the execution
 */
export const check = (taskKey: string, executionKey: string) =>
  repository[taskKey] === executionKey;

/**
 * Sets an executionKey for a given taskKey
 * @param taskKey
 * @param executionKey
 */
export const set = (taskKey: string, executionKey: string) =>
  (repository[taskKey] = executionKey);

/**
 * Unset a taskKey
 * @param taskKey the taskKey to unset
 */
export const unset = (taskKey: string): void => {
  delete repository[taskKey];
};
