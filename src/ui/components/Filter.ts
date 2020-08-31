import { h, defineComponent } from "vue";

export const Filter = defineComponent({
  props: {
    label: {
      type: String,
      required: true
    },
    value: {
      type: String,
      required: true
    }
  },
  setup: (props, { emit }) => () =>
    h("label", { class: "block w-full my-2 sm:w-64 sm:mr-3" }, [
      /**
       * Label for the filter
       */
      h("div", { class: "text-xs text-gray-600" }, props.label),

      /**
       * Input for the filter
       */
      h("input", {
        class: "w-full rounded border border-gray-300 px-2 py-1",
        value: props.value,
        onInput: (event: InputEvent) => {
          /**
           * We emit a custom `input` event with the value of the filter (instead of the default InputEvent) so we need
           * to stop the original InputEvent from propagating.
           */
          event.stopPropagation();

          /**
           * Emit custom input event. The target can be null, and Typescript does not know what kind of element is
           * emitting the event, so we need to tell it.
           * https://stackoverflow.com/questions/42066421/property-value-does-not-exist-on-type-eventtarget
           */
          if (event.target) {
            emit("input", (event.target as HTMLInputElement).value);
          }
        }
      })
    ])
});
