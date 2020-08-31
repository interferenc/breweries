import { h, defineComponent } from "vue";
import { Subtitle } from "./Subtitle";
import { useI18n } from "vue-i18n";
import { RouterLink } from "vue-router";
import { RouteName } from "../router";

type Brewery = { name: string; id: number };

/**
 * Renders a featured brewery
 * @param brewery the brewery to render
 */
const renderBrewery = ({ name, id }: Brewery) =>
  h(
    "li",
    h(
      RouterLink,
      { to: { name: RouteName.Detail, params: { id } } },
      () => name
    )
  );

export const FeaturedBreweries = defineComponent({
  props: {
    breweries: {
      type: Object as () => Brewery[],
      required: true
    }
  },
  setup: props => () => {
    const { t } = useI18n();
    return [
      /**
       * Title
       */
      h(Subtitle, () => t("Featured breweries")),

      /**
       * List
       */
      h("ul", { class: "list-disc pl-6" }, props.breweries.map(renderBrewery))
    ];
  }
});
