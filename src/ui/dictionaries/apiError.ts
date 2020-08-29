import { ApiErrorCode } from "@/services/breweryDB/error";
import { FORBIDDEN, NOT_FOUND } from "http-status-codes";
import { getMappedRecord } from "../helpers";

export function apiError(code: number): string {
  if (code >= 500 && code <= 599) {
    return "Server error";
  }

  const map: Record<number, string> = {
    [ApiErrorCode.NetworkError]: "Network error",
    [ApiErrorCode.ParseError]: "Parse error",
    [ApiErrorCode.DecodeError]: "Decode error",
    [FORBIDDEN]: "Forbidden",
    [NOT_FOUND]: "Not found error"
  };

  return getMappedRecord<number>(map, code, "Unknown error");
}
