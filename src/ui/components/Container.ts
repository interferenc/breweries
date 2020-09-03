import { h, defineComponent } from "vue";

export const Container = defineComponent({
  setup: (_, { slots }) => () => h("div", { class: "max-w-3xl mx-auto" }, slots)
});
