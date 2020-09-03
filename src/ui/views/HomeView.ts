import { h, ref, reactive, defineComponent } from "vue";
import { RouterLink } from "vue-router";
import { RouteName } from "../router/types";
import { useI18n } from "vue-i18n";
import { Box, Title, Subtitle } from "../components";

export const HomeView = defineComponent({
  setup() {
    const { t } = useI18n();

    return () =>
      h(Box, { class: "my-48" }, () => [
        h(Title, () => t("Brewery DB Search")),
        h("p", t("A showcase Vue.js application")),
        h(RouterLink, { to: { name: RouteName.Index } }, () =>
          t("See breweries")
        )
      ]);
  }
});
