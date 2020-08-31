import { h, defineComponent } from "vue";
import { Table } from "./Table";
import { BreweryList, BreweryRecord } from "@/entities";
import { RouterLink } from "vue-router";
import { RouteName } from "../router";
import * as option from "@/ui/folds/option";
import { useI18n } from "vue-i18n";

/**
 * Renders a brewery to a table row
 * @param brewery the brewery to render
 */
const renderBrewery = (brewery: BreweryRecord) =>
  h("tr", [
    /**
     * Name
     */
    h(
      "td",
      h(
        RouterLink,
        {
          to: {
            name: RouteName.Detail,
            params: { id: brewery.id }
          }
        },
        () => brewery.name
      )
    ),

    /**
     * City
     */
    h("td", option.toString(brewery.address.city))
  ]);

export const BreweryTable = defineComponent({
  props: {
    list: {
      type: Object as () => BreweryList,
      required: true
    }
  },
  setup: props => () => {
    const { t } = useI18n();
    return h(
      Table,
      {},
      {
        head: () => [h("th", t("Name")), h("th", t("City"))],
        default: () => props.list.map(renderBrewery)
      }
    );
  }
});
