import { h, ref, reactive, defineComponent } from "vue";
import { RouterLink } from "vue-router";
import { RouteName } from "../router/types";
import { useI18n } from "vue-i18n";
import { Box, Title, Subtitle } from "../components";

export const HomeView = defineComponent({
  setup() {
    const { t } = useI18n();

    return () =>
      h(Box, { class: "w-1/2 mx-auto bg-white rounded-lg my-12" }, () => [
        h(Title, () => t("Brewery Search")),
        h("p", t("a showcase Vue.js application")),
        h(RouterLink, { to: { name: RouteName.Index } }, () =>
          t("See breweries")
        )
      ]);
  }
});
