import { LocationQuery } from "vue-router";
import { router } from "../router";

const DEBOUNCE_TIMEOUT = 500;

let query: LocationQuery = {};
let timeout: number;

export const initialize = () => {
  query = { ...router.currentRoute.value.query };
};

export const set = (key: string, value: string): void => {
  query[key] = value;
};

export const unset = (key: string): void => {
  delete query[key];
};

export const flush = (): void => {
  router.push({ query });
};

export const flushDebounced = (): void => {
  window.clearTimeout(timeout);
  timeout = window.setTimeout(flush, DEBOUNCE_TIMEOUT);
};
