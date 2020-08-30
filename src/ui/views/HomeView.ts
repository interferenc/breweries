import { h, ref, reactive, defineComponent } from "vue";
import { RouterLink } from "vue-router";
import { RouteName } from "../router/types";
import { t } from "../i18n";

export const HomeView = defineComponent({
  setup() {
    return () =>
      h("div", [
        h("div", t("Breweries demo app")),
        h(RouterLink, { to: { name: RouteName.Home } }, () =>
          t("See breweries")
        )
      ]);
  }
});
