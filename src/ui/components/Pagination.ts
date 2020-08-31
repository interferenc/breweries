import { h, defineComponent } from "vue";
import { RouterLink } from "vue-router";
import { router } from "../router";
import { useI18n } from "vue-i18n";

export const Pagination = defineComponent({
  props: {
    page: {
      type: Number,
      required: true
    }
  },
  setup: props => () => {
    const { t } = useI18n();
    return h("div", { class: "flex" }, [
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
            () => t("Previous page")
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
        () => t("Next page")
      )
    ]);
  }
});
