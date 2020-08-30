import { ApiErrorCode } from "@/services/breweryDB/error";
import { FORBIDDEN, NOT_FOUND } from "http-status-codes";
import { lookup } from "./lookup";
import { t } from "../i18n";

export function apiError(code: number): string {
  if (code >= 500 && code <= 599) {
    return "Server error";
  }

  const map: Record<number, string> = {
    [ApiErrorCode.NetworkError]: t("Network error"),
    [ApiErrorCode.ParseError]: t("Parse error"),
    [ApiErrorCode.DecodeError]: t("Decode error"),
    [FORBIDDEN]: t("Forbidden"),
    [NOT_FOUND]: t("Not found error")
  };

  return lookup(map, code, t("Unknown error"));
}
