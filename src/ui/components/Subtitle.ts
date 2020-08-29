import { h, defineComponent } from "vue";

export const Subtitle = defineComponent({
  setup: (_, { slots }) => () => h("h2", { class: "text-xl font-bold" }, slots)
});
