import { ApiErrorCode } from "@/services/breweryDB/error";
import { FORBIDDEN, NOT_FOUND } from "http-status-codes";
import { lookup } from "./lookup";
import { useI18n } from "vue-i18n";
import { LazyTranslationRecord } from "./types";

/**
 * Turn an ApiError code to a human readable string
 * @param code the error code
 */
export function apiError(code: number): string {
  const { t } = useI18n();

  if (code >= 500 && code <= 599) {
    return t("Server error");
  }

  /**
   * Map error codes to translated strings. The translations are lazy and are only evaluated when needed.
   */
  const map: LazyTranslationRecord<number> = {
    [ApiErrorCode.NetworkError]: () => t("Network error"),
    [ApiErrorCode.ParseError]: () => t("Parse error"),
    [ApiErrorCode.DecodeError]: () => t("Decode error"),
    [FORBIDDEN]: () => t("Forbidden"),
    [NOT_FOUND]: () => t("Not found error")
  };

  return lookup(map, code, t("Unknown error"));
}
