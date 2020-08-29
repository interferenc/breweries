import { h, ref, reactive, defineComponent } from "vue";
import { RouterLink } from "vue-router";

export const AboutView = defineComponent({
  setup() {
    return () => h("div", [h("div", "About page")]);
  }
});
