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
  defaultValue: T
) => {
  /**
   * Memoize encoded default value, since we need this on every set operation.
   */
  const encodedDefaultValue = encode(defaultValue);

  return computed<T>({
    /**
     * Gets the value for the computed variable from the query string using the router (makes it reactive).
     */
    get: () => {
      const value = router.currentRoute.value.query[key];

      /**
       * If the query string value is anything but a string (null, undefined, array) return the default value.
       */
      if (typeof value !== "string") {
        return defaultValue;
      }

      /**
       * Decode value or return default (fallback) value if decoding failed.
       */
      return decode(value, defaultValue);
    },

    /**
     * Sets the value initiates a flush. If the value set is in fact the default value, it removes it from the query
     * string.
     */
    set: value => {
      /**
       * Encode value
       */
      const encodedValue = encode(value);

      /**
       * If the encoded value is the same as the encoded default value, the key/value does not need be set in the query
       * string, so we just unset the key.
       *
       * If they are not the same, we set (overwrite) the encoded value for the key.
       */
      encodedValue === encodedDefaultValue
        ? unset(key)
        : set(key, encodedValue);

      /**
       * Initiate a debounced flush since we just changed the query state.
       */
      flushDebounced();
    }
  });
};
