import { onMounted, onUnmounted, computed, SetupContext } from "vue";
import { QueryValueEncoder, QueryValueDecoder, router } from "@/ui/router";

/**
 * THIS IS GLOBAL STATE FOR ALL QUERY VARIABLES
 *
 * This is where we store the current/next pushed query string
 * for all query state variables
 */
let timeout: number;
let query: typeof router.currentRoute.value.query = {};
let queryInitialized = false;

const pushQuery = () => {
  console.log("pushing", query);
  router.push({ query });
};

// TODO: There must be a better way of deferring reactivity and updating multiple computed variables
// on one go. Until we find it, this global flag can be used to hold off on updating the querystring
let queryStateEnabled = true;
/**
 * Update multiple queryState variables in one go
 * @param cb Callback function to do the mutation
 * @param debounce debounce route push or not
 */
export function updateMultiple(cb: Function, debounce = false) {
  queryStateEnabled = false;
  cb();
  queryStateEnabled = true;

  if (debounce) {
    console.log("debounced");
    window.clearTimeout(timeout);
    timeout = window.setTimeout(() => pushQuery(), 500);
  } else {
    window.clearTimeout(timeout);
    pushQuery();
  }
}

export function queryState<T>(
  key: string,
  encode: QueryValueEncoder<T>,
  decode: QueryValueDecoder<T>,
  encodedDefaultValue: string,
  context: SetupContext,
  debounce = true
) {
  /**
   * With these hooks we make sure that all route component using query state starts with
   * the current query state variables inside 'query', and then starts modifying it.
   * The queryInitialized flag is needed to only do the setting once.
   */
  onMounted(() => {
    if (!queryInitialized) {
      queryInitialized = true;
      console.log(
        "onMounted query state setting",
        router.currentRoute.value.query
      );
      query = { ...router.currentRoute.value.query };
    }
  });
  onUnmounted(() => {
    if (queryInitialized) {
      console.log("onUnmounted query state set flag to false");
      queryInitialized = false;
    }
  });

  const state = computed<T>({
    // Get value from query string. Returns default value if value is null
    // (key is set but value is not) or undefined (key is not set)
    get: () => {
      const value = router.currentRoute.value.query[key];

      if (typeof value !== "string") {
        return decode(encodedDefaultValue);
      }
      return decode(value);
    },

    // Set value to query string by pushing new route, debounced when needed
    set: value => {
      console.log("setter running", key, value);
      delete query[key];
      const encodedValue = encode(value);
      console.log(encodedValue);
      if (encodedValue !== encodedDefaultValue) {
        query[key] = encodedValue;
      }

      if (!queryStateEnabled) {
        return;
      }

      if (debounce) {
        console.log("debounced");
        window.clearTimeout(timeout);
        timeout = window.setTimeout(() => pushQuery(), 500);
      } else {
        window.clearTimeout(timeout);
        pushQuery();
      }
    }
  });

  return state;
}
