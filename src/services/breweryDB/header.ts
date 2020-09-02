import { setHeaders, HttpHeader, MimeType } from "../http";

/**
 * Sets the required headers for the brewery DB API
 * @param request The Request to set the headers to
 */
export const setBaseHeaders = setHeaders(
  new Headers({
    [HttpHeader.ContentType]: MimeType.ApplicationJson,
    [HttpHeader.Accept]: MimeType.ApplicationJson
  })
);

/**
 * Sets the `Authorization` header for the brewery DB API
 * @param request The Request to set the headers to
 */
export const setAuthorizationHeaders = setHeaders(
  new Headers({
    [HttpHeader.Authorization]: "Bearer token"
  })
);
