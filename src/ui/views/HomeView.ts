import { h, ref, reactive, defineComponent } from "vue";
import { RouterLink } from "vue-router";

export const HomeView = defineComponent({
  setup() {
    return () =>
      h("div", [
        h("div", "Breweries demo app"),
        h(RouterLink, { to: { name: "index" } }, () => "See breweries")
      ]);
  }
});
