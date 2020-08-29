import { h, defineComponent } from "vue";

export const Box = defineComponent({
  setup: (_, { slots }) => () =>
    h("div", { class: "bg-white shadow rounded-lg p-4 mb-6" }, slots)
});
