import { flow } from "fp-ts/lib/function";
import { getRequest } from "@/services/http";
import { setBaseHeaders, setAuthorizationHeaders } from "./header";

/**
 * Creates a GET request to the brewery DB
 * @param url URL of the resource
 */
export const apiGetRequest = flow(getRequest, setBaseHeaders);

/**
 * Creates an authenticated GET request to the brewery DB with the `Authorization` header set.
 * @param url URL of the resource
 */
export const authorizedApiGetRequest = flow(
  getRequest,
  setAuthorizationHeaders
);
