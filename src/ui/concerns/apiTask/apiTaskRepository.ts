import { v4 as uuidv4 } from "uuid";

export const apiTaskRepository: Record<string, string> = {};

export const generateTaskKey = uuidv4;
export const generateExecutionKey = uuidv4;

export const get = (taskKey: string) => apiTaskRepository[taskKey];

export const check = (taskKey: string, executionKey: string) =>
  apiTaskRepository[taskKey] === executionKey;

export const set = (taskKey: string, executionKey: string) =>
  (apiTaskRepository[taskKey] = executionKey);

export const unset = (taskKey: string): void => {
  delete apiTaskRepository[taskKey];
};
