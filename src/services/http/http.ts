import { tryCatch, TaskEither } from "fp-ts/lib/TaskEither";
import { toError } from "fp-ts/lib/Either";

export type RequestFactory = {
  (url: string): Request;
};

/**
 * Create request factory function
 * @param method The HTTP verb to use for the request
 */
const createRequest = (method: string): RequestFactory => (url: string) =>
  new Request(url, { method });

export const createGetRequest = createRequest("get");
export const createPutRequest = createRequest("put");
export const createPostRequest = createRequest("post");
export const createDeleteRequest = createRequest("delete");

/**
 * A function that executes the passed Request object an returns a TaskEither with an error or a response.
 * @param request The request to execute
 */
export const executeRequest = (request: Request): TaskEither<Error, Response> =>
  tryCatch(() => fetch(request), toError);
