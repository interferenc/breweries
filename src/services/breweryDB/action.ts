import { execute as executeHttp } from "@/services/http";
import { flow } from "fp-ts/lib/function";
import { chain, mapLeft } from "fp-ts/lib/TaskEither";
import { parse, validate } from "./response";
import { ApiError, ApiErrorCode } from "./error";

/**
 * Executes a brewery DB API request.
 *
 * 1. Request is executed
 * 2. Error is turned into a ApiError(NetworkError), if any
 * 3. Response JSON is parsed
 * 4. Response status code is validated
 * @param request API request to execute
 */
export const execute = flow(
  executeHttp,
  mapLeft(() => new ApiError(ApiErrorCode.NetworkError)),
  chain(parse),
  chain(validate)
);
