import { tryCatch, TaskEither } from "fp-ts/lib/TaskEither";
import { toError } from "fp-ts/lib/Either";

/**
 * Curried create request factory function
 * @param method The HTTP verb to use for the request
 */
const request = (method: string) => (url: string) =>
  new Request(url, { method });

/**
 * Creates a GET request
 * @param url URL of the resource
 */
export const getRequest = request("get");

/**
 * Creates a PUT request
 * @param url URL of the resource
 */
export const putRequest = request("put");

/**
 * Creates a POST request
 * @param url URL of the resource
 */
export const postRequest = request("post");

/**
 * Creates a DELETE request
 * @param url URL of the resource
 */
export const deleteRequest = request("delete");

/**
 * A function that executes the passed Request object an returns a TaskEither with an error or a response.
 * @param request The request to execute
 */
export const execute = (request: Request): TaskEither<Error, Response> =>
  tryCatch(() => fetch(request), toError);
