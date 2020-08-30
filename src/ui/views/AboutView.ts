import { h, ref, reactive, defineComponent } from "vue";
import { RouterLink } from "vue-router";
import { t } from "../i18n";

export const AboutView = defineComponent({
  setup() {
    return () => h("div", [h("div", t("About page"))]);
  }
});
