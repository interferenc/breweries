import { h, defineComponent } from "vue";
import { RouterLink } from "vue-router";

export const Pagination = defineComponent({
  props: {
    page: {
      type: Number,
      required: true
    }
  },
  setup(props) {
    return () =>
      h("div", { class: "flex" }, [
        h(
          RouterLink,
          { to: { query: { page: Math.max(1, props.page - 1) } } },
          "Previous page"
        ),
        h(
          RouterLink,
          {
            class: "ml-auto",
            to: { query: { page: props.page + 1 } }
          },
          "Next page"
        )
      ]);
  }
});
