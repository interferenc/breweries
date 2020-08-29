export class ApiError {
  public code: number;

  constructor(code: number) {
    this.code = code;
  }
}

export const enum ApiErrorCode {
  NetworkError = 10,
  ParseError = 20,
  DecodeError = 30
}
