import { h, defineComponent } from "vue";

export const Tag = defineComponent({
  setup: (_, { slots }) => () =>
    h(
      "span",
      {
        class:
          "text-xs font-bold bg-blue-600 text-white rounded px-2 py-1 mx-1 align-middle"
      },
      slots
    )
});
