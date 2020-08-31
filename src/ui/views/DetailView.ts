import { h, defineComponent, watch } from "vue";
import { get } from "@/services/breweryDB/resources/brewery";
import { useApiTask } from "../concerns";
import { RouterLink } from "vue-router";
import {
  Box,
  Subtitle,
  Title,
  ErrorMessage,
  Tag,
  Map,
  FeaturedBreweries
} from "../components";
import * as option from "@/ui/folds/option";
import * as ts from "@/ui/folds/taskState";
import { Brewery, GeographicLocation } from "@/entities";
import { RouteName } from "../router/types";
import { useI18n } from "vue-i18n";

export const DetailView = defineComponent({
  props: {
    id: {
      type: Number,
      required: true
    }
  },
  setup(props) {
    const { t, d } = useI18n();

    /**
     * Create ApiTask that fetches a gives brewery's data based on its ID.
     * Since we need this data right away, it executes the task immediately as well.
     */
    const { executeTask, taskState } = useApiTask(() => get(props.id));
    executeTask();

    /**
     * Execute the data fetch ApiTask on any props change. This way, any ID change in the url (for example a going back
     * from one brewery's page to another using the back button, or clicking on a featured brewery link) will trigger
     * the fetch ApiTask again.
     */
    watch(props, () => console.log(JSON.stringify(props)));
    watch(props, executeTask);

    /**
     * Renders the view
     */
    return () =>
      h("div", [
        ts.toVNodePending(
          error => h(ErrorMessage, { error, onRetry: executeTask }),
          (result: Brewery) =>
            h(Box, { class: "flex" }, () => [
              h("div", { class: "flex-1" }, [
                h(Title, () => [result.name, h(Tag, () => result.type)]),
                option.toParagraph(result.address.street),
                option.toParagraph(result.address.city),
                option.toParagraph(result.address.state),
                option.toParagraph(result.address.country),
                option.toVNodes((value: string) =>
                  h("p", t("Phone: {value}", { value }))
                )(result.phone),
                option.toLink(result.website),
                h(
                  "p",
                  t("Last updated at: {date}", { date: d(result.updatedAt) })
                )
              ]),
              option.toVNodes((coordinates: GeographicLocation) =>
                h(Map, { coordinates })
              )(result.coordinates)
            ])
        )(taskState.value),
        h(FeaturedBreweries, {
          breweries: [
            { name: "Morgan Territory Brewing", id: 832 },
            { name: "Mother Earth Brew Co LLC", id: 833 },
            { name: "Non-existing Brewery (this will be 404)", id: 0 }
          ]
        })
      ]);
  }
});
