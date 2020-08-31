import { h, defineComponent } from "vue";
import { RouterView } from "vue-router";
import { Navbar } from "@/ui/components/Navbar";

export const NavbarLayout = defineComponent({
  setup: () => () =>
    h("div", { class: "pt-16 p-6" }, [h(Navbar), h(RouterView)])
});
