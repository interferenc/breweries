import { h, ref, reactive, defineComponent } from "vue";
import { RouterLink } from "vue-router";
import { RouteName } from "../router/types";

export const HomeView = defineComponent({
  setup() {
    return () =>
      h("div", [
        h("div", "Breweries demo app"),
        h(RouterLink, { to: { name: RouteName.Home } }, () => "See breweries")
      ]);
  }
});
