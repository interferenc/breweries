import { h, ref, reactive, defineComponent } from "vue";
import { RouterLink } from "vue-router";
import { useI18n } from "vue-i18n";

export const AboutView = defineComponent({
  setup() {
    const { t } = useI18n();
    return () => h("div", [h("div", t("About page"))]);
  }
});
