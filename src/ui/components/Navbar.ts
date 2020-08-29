import { h, ref, reactive, defineComponent } from "vue";
import { RouterLink } from "vue-router";
import { NavbarItem } from "./NavbarItem";

export const Navbar = defineComponent({
  setup() {
    return () =>
      h("div", { class: "bg-white fixed p-3 w-full shadow inset top-0" }, [
        h(NavbarItem, { routeName: "home" }, () => "Home"),
        h(NavbarItem, { routeName: "index" }, () => "Breweries"),
        h(NavbarItem, { routeName: "about" }, () => "About")
      ]);
  }
});
