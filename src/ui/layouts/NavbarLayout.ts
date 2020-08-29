import { h, defineComponent } from "vue";
import { RouterView } from "vue-router";
import { Navbar } from "@/ui/components/Navbar";

export const NavbarLayout = defineComponent({
  setup: () => () =>
    h("div", { class: "pt-12" }, [h(Navbar), h(RouterView, { class: "p-6" })])
});
