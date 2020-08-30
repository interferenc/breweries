/**
 * Represents a brewery API error
 * @class
 *
 * @param code The HTTP status code of the error
 */
export class ApiError {
  public code: number;

  constructor(code: number) {
    this.code = code;
  }
}

/**
 * Custom error codes for the brewery DB API
 */
export const enum ApiErrorCode {
  NetworkError = 10,
  ParseError = 20,
  DecodeError = 30
}
