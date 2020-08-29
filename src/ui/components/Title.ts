import { h, defineComponent } from "vue";

export const Title = defineComponent({
  setup: (_, { slots }) => () => h("h1", { class: "text-2xl font-bold" }, slots)
});
