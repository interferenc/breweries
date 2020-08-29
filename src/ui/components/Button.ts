import { h, defineComponent } from "vue";

export const Button = defineComponent({
  setup: (_, { slots }) => () =>
    h("button", { class: "bg-gray-300 rounded px-4 py-1" }, slots)
});
