import { h, defineComponent } from "vue";

export const Table = defineComponent({
  setup: (_, { slots }) => () =>
    h("table", { class: "w-full -my-3" }, [
      /**
       * Display header row in a thead if there is a slot called `head`.
       */
      slots.head
        ? h(
            "thead",
            { class: "text-left border-b-2 border-gray-400" },
            h("tr", slots.head())
          )
        : undefined,

      /**
       * Display data in tbody if there is a slot called `default`.
       */
      h("tbody", slots.default ? slots.default() : undefined)
    ])
});
