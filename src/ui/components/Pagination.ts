import { h, defineComponent } from "vue";
import { RouterLink } from "vue-router";
import { router } from "../router";

export const Pagination = defineComponent({
  props: {
    page: {
      type: Number,
      required: true
    }
  },
  setup: props => () =>
    h("div", { class: "flex" }, [
      props.page > 1
        ? h(
            RouterLink,
            {
              to: {
                query: {
                  ...router.currentRoute.value.query,
                  page: props.page - 1
                }
              }
            },
            () => "Previous page"
          )
        : null,
      h(
        RouterLink,
        {
          class: "ml-auto",
          to: {
            query: {
              ...router.currentRoute.value.query,
              page: props.page + 1
            }
          }
        },
        () => "Next page"
      )
    ])
});
