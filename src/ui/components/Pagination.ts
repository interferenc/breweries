import { h, defineComponent } from "vue";
import { RouterLink } from "vue-router";
import { router } from "../router";
import { useI18n } from "vue-i18n";

/**
 * Sets the page query variable preserving all other set values
 * @param page the value to set
 */
const setPage = (page: number) => ({
  ...router.currentRoute.value.query,
  page
});

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
      /**
       * Display previous page link if not on first page
       */
      props.page > 1
        ? h(RouterLink, { to: { query: setPage(props.page - 1) } }, () =>
            t("Previous page")
          )
        : null,

      /**
       * Display next page link
       */
      h(
        RouterLink,
        { class: "ml-auto", to: { query: setPage(props.page + 1) } },
        () => t("Next page")
      )
    ]);
  }
});
