import { h, defineComponent } from "vue";

export const Table = defineComponent({
  setup: (_, { slots }) => () =>
    h("table", { class: "w-full -my-3" }, [
      slots.head
        ? h(
            "thead",
            { class: "text-left border-b-2 border-gray-400" },
            h("tr", slots.head())
          )
        : undefined,
      h("tbody", slots.default ? slots.default() : undefined)
    ])
});
