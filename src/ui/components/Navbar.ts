import { h, defineComponent } from "vue";
import { NavbarItem } from "./NavbarItem";

export const Navbar = defineComponent({
  setup: () => () =>
    h("div", { class: "bg-white fixed p-3 w-full shadow inset top-0" }, [
      h(NavbarItem, { routeName: "home" }, () => "Home"),
      h(NavbarItem, { routeName: "index" }, () => "Breweries"),
      h(NavbarItem, { routeName: "about" }, () => "About")
    ])
});
