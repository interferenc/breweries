import { executeRequest as executeHttpRequest } from "@/services/http";
import { flow } from "fp-ts/lib/function";
import { chain, mapLeft } from "fp-ts/lib/TaskEither";
import { parse, validate } from "./response";
import { ApiError, ApiErrorCode } from "./error";

export const executeRequest = flow(
  executeHttpRequest,
  mapLeft(() => new ApiError(ApiErrorCode.NetworkError)),
  chain(parse),
  chain(validate)
);
