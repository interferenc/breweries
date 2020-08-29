import { h, defineComponent } from "vue";

export const Title = defineComponent({
  setup(_, { slots }) {
    return () =>
      h(
        "h1",
        { class: "text-2xl font-bold" },
        slots.default ? slots.default() : ""
      );
  }
});
