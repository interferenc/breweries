import { h, defineComponent } from "vue";
import { Subtitle } from "./Subtitle";
import { useI18n } from "vue-i18n";
import { RouterLink } from "vue-router";
import { RouteName } from "../router";

export const FeaturedBreweries = defineComponent({
  props: {
    breweries: {
      type: Object as () => { name: string; id: number }[],
      required: true
    }
  },
  setup: props => () => {
    const { t } = useI18n();
    return [
      h(Subtitle, () => t("Featured breweries")),
      h(
        "ul",
        { class: "list-disc pl-6" },
        props.breweries.map(({ name, id }) =>
          h(
            "li",
            h(
              RouterLink,
              { to: { name: RouteName.Detail, params: { id } } },
              () => name
            )
          )
        )
      )
    ];
  }
});
