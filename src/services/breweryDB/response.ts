import { tryCatch, map, fromEither, TaskEither } from "fp-ts/lib/TaskEither";
import { fromPredicate } from "fp-ts/lib/Either";
import { pipe, flow } from "fp-ts/lib/function";
import { ApiError, ApiErrorCode } from "./error";
import { Decoder } from "io-ts";
import { mapLeft } from "fp-ts/lib/Either";

/**
 * Represent a brewery DB Api Response
 * @class
 *
 * @param ok Indicates if the response was successfull
 * @param status The status code of the response
 * @param headers The headers sent by the API with the response
 * @param parsed The parsen JSON body of the response
 */
export class ApiResponse {
  public ok: boolean;

  public status: number;

  public headers: Headers;

  public parsed: unknown;

  constructor(ok: boolean, status: number, headers: Headers, parsed: unknown) {
    this.ok = ok;
    this.status = status;
    this.headers = headers;
    this.parsed = parsed;
  }
}

/**
 * Parses the JSON body of a Response object
 *
 * @param response the Response which body needs to be parsed
 * @returns A `TaskEither` holding an ApiError (if the parsing failed) or an ApiResponse (if the parsing succeded).
 */
export const parse = (response: Response): TaskEither<ApiError, ApiResponse> =>
  pipe(
    tryCatch(
      () => response.json(),
      () => new ApiError(ApiErrorCode.ParseError)
    ),
    map(
      (parsed: unknown) =>
        new ApiResponse(response.ok, response.status, response.headers, parsed)
    )
  );

/**
 * Validates a brewery DB ApiResponse
 *
 * @param a The ApiResponse that need to be validated
 * @returns A `TaskEither` holding an ApiError (if the request was not successful) or an ApiResponse (if the request
 * was successful)
 */
export const validate = flow(
  fromPredicate<ApiError, ApiResponse>(
    res => res.ok,
    res => new ApiError(res.status)
  ),
  fromEither
);

/**
 * Curried function that takes a decoder and returns a decode function to decode the body of an ApiResponse
 *
 * @param decoder The decoder to use
 */
export const decode = <T>(decoder: Decoder<unknown, T>) =>
  flow(
    (response: ApiResponse) => response.parsed,
    decoder.decode,
    mapLeft(() => new ApiError(ApiErrorCode.DecodeError)),
    fromEither
  );
