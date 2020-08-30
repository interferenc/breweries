import { h, defineComponent } from "vue";
import { NavbarItem } from "./NavbarItem";
import { t } from "../i18n";

export const Navbar = defineComponent({
  setup: () => () =>
    h("div", { class: "bg-white fixed p-3 w-full shadow inset top-0" }, [
      h(NavbarItem, { routeName: "home" }, () => t("Home")),
      h(NavbarItem, { routeName: "index" }, () => t("Breweries")),
      h(NavbarItem, { routeName: "about" }, () => t("About"))
    ])
});
