import { h, defineComponent } from "vue";
import { RouterView } from "vue-router";
import { Container } from "../components";

export const EmptyLayout = defineComponent({
  setup: () => () => h(Container, () => h(RouterView))
});
