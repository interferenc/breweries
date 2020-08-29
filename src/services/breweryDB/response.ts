import { tryCatch, map, fromEither, TaskEither } from "fp-ts/lib/TaskEither";
import { fromPredicate } from "fp-ts/lib/Either";
import { pipe, flow } from "fp-ts/lib/function";
import { ApiError, ApiErrorCode } from "./error";

export class ApiResponse {
  public parsed: unknown;

  public ok: boolean;

  public status: number;

  public headers: Headers;

  constructor(ok: boolean, status: number, headers: Headers, parsed: unknown) {
    this.ok = ok;
    this.status = status;
    this.headers = headers;
    this.parsed = parsed;
  }
}

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

export const validate = flow(
  fromPredicate<ApiError, ApiResponse>(
    res => res.ok,
    res => ({ code: res.status, parsed: res.parsed })
  ),
  fromEither
);
