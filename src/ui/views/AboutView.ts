import { h, defineComponent } from "vue";
import { useI18n } from "vue-i18n";
import { Box, Title } from "../components";

export const AboutView = defineComponent({
  setup() {
    const { t } = useI18n();
    return () =>
      h(Box, () => [
        h(Title, () => t("About this app")),
        h(
          "p",
          t(
            "This application was created to demonstrate some SPA architecture best practices."
          )
        ),
        h("p", t("You can read about them on the GitHub project page:")),
        h(
          "a",
          { href: "https://github.com/interferenc/breweries" },
          "https://github.com/interferenc/breweries"
        )
      ]);
  }
});
