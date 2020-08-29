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
  setup(props, context) {
    return () =>
      h("label", { class: "block w-full my-2 sm:w-64 sm:mr-3" }, [
        h("div", { class: "text-xs text-gray-600" }, props.label),
        h("input", {
          class: "w-full rounded border border-gray-300 px-2 py-1",
          value: props.value,
          onInput: (event: InputEvent) => {
            event.stopPropagation();
            // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
            // @ts-ignore
            context.emit("input", event.target.value);
          }
        })
      ]);
  }
});
