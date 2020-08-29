import { Decoder } from "io-ts";
import { mapLeft } from "fp-ts/lib/Either";
import { fromEither } from "fp-ts/lib/TaskEither";
import { flow } from "fp-ts/lib/function";

import { ApiResponse } from "./response";
import { ApiErrorCode, ApiError } from "./error";

export const decode = <T>(decoder: Decoder<unknown, T>) =>
  flow(
    (response: ApiResponse) => response.parsed,
    decoder.decode,
    mapLeft(() => new ApiError(ApiErrorCode.DecodeError)),
    fromEither
  );
