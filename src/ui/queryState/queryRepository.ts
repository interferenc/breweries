import { LocationQuery } from "vue-router";
import { router } from "../router";

/**
 * Global timeout for all query state flushes. All changes to the global query state are debounced using this value.
 */
const DEBOUNCE_TIMEOUT = 500;

/**
 * Buffers the changes to the query string. All changes gets reflected here first, and then get flushed to the url
 * later.
 */
let repository: LocationQuery = {};

/**
 * The unique identifier of the current debounced flush operation.
 */
let timeout: number;

/**
 * Initializes the repository from the current query string.
 */
export const initialize = () => {
  repository = { ...router.currentRoute.value.query };
};

/**
 * Sets a query value for a given key.
 *
 * @param key the key of the vale
 * @param value the value to set
 */
export const set = (key: string, value: string): void => {
  repository[key] = value;
};

/**
 * Unsets a query value for a given key
 *
 * @param key the key of the value
 */
export const unset = (key: string): void => {
  delete repository[key];
};

/**
 * Flushes the current repository state to the URL using the router.
 */
export const flush = (): void => {
  router.push({ query: repository });
};

/**
 * Initiates a debounced flush
 */
export const flushDebounced = (): void => {
  window.clearTimeout(timeout);
  timeout = window.setTimeout(flush, DEBOUNCE_TIMEOUT);
};
