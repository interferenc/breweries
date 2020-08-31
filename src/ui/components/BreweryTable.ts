import { h, defineComponent } from "vue";
import { Table } from "./Table";
import { BreweryList } from "@/entities";
import { RouterLink } from "vue-router";
import { RouteName } from "../router";
import * as option from "@/ui/folds/option";
import { useI18n } from "vue-i18n";

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
        default: () =>
          props.list.map(brewery =>
            h("tr", [
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
              h("td", option.toString(brewery.address.city))
            ])
          )
      }
    );
  }
});
