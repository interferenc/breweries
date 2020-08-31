import { h, defineComponent } from "vue";
import { NavbarItem } from "./NavbarItem";
import { useI18n } from "vue-i18n";

export const Navbar = defineComponent({
  setup: () => () => {
    const { t } = useI18n();
    return h(
      "div",
      { class: "bg-white fixed p-3 shadow inset top-0 inset-x-0" },
      [
        h(NavbarItem, { routeName: "home" }, () => t("Home")),
        h(NavbarItem, { routeName: "index" }, () => t("Breweries")),
        h(NavbarItem, { routeName: "about" }, () => t("About"))
      ]
    );
  }
});
