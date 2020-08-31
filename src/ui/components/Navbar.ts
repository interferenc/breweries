import { h, defineComponent } from "vue";
import { NavbarItem } from "./NavbarItem";
import { useI18n } from "vue-i18n";
import { RouteName } from "../router";

export const Navbar = defineComponent({
  setup: () => () => {
    const { t } = useI18n();
    return h(
      "div",
      { class: "bg-white fixed p-3 shadow inset top-0 inset-x-0" },
      [
        h(NavbarItem, { routeName: RouteName.Home }, () => t("Home")),
        h(NavbarItem, { routeName: RouteName.Index }, () => t("Breweries")),
        h(NavbarItem, { routeName: RouteName.About }, () => t("About"))
      ]
    );
  }
});
