import { computed } from "vue";
import { QueryValueEncoder, QueryValueDecoder, router } from "@/ui/router";
import { unset, set, flushDebounced as flush } from "./queryRepository";

export const queryState = <T>(
  key: string,
  encode: QueryValueEncoder<T>,
  decode: QueryValueDecoder<T>,
  encodedDefaultValue: string
) =>
  computed<T>({
    get: () => {
      const value = router.currentRoute.value.query[key];
      return decode(typeof value === "string" ? value : encodedDefaultValue);
    },
    set: value => {
      const encodedValue = encode(value);
      if (encodedValue === encodedDefaultValue) {
        unset(key);
      } else {
        set(key, encodedValue);
      }
      flush();
    }
  });
