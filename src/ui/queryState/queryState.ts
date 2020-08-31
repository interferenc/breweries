import { computed } from "vue";
import { QueryValueEncoder, QueryValueDecoder, router } from "@/ui/router";
import { unset, set, flushDebounced } from "./queryRepository";

/**
 * Creates a compued variable and stores its value in the query string.
 *
 * @param key the query string variable name
 * @param encode an encoder to turn the value into a string
 * @param decode a decoder to turn an incoming string into a value
 * @param encodedDefaultValue a default value
 */
export const queryState = <T>(
  key: string,
  encode: QueryValueEncoder<T>,
  decode: QueryValueDecoder<T>,
  encodedDefaultValue: string
) =>
  computed<T>({
    /**
     * Gets the value for the computed variable from the query string using the router (makes it reactive).
     */
    get: () => {
      const value = router.currentRoute.value.query[key];
      return decode(typeof value === "string" ? value : encodedDefaultValue);
    },

    /**
     * Sets the value initiates a flush. If the value set is in fact the default value, it removes it from the query
     * string.
     */
    set: value => {
      const encodedValue = encode(value);
      encodedValue === encodedDefaultValue
        ? unset(key)
        : set(key, encodedValue);
      flushDebounced();
    }
  });
