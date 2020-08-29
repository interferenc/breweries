import { h, defineComponent } from "vue";
import { RouterView } from "vue-router";

export const EmptyLayout = defineComponent({
  setup: () => () => h(RouterView)
});
