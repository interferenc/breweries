import { h, defineComponent, watch } from "vue";
import { get } from "@/services/breweryDB/resources/brewery";
import { useApiTask } from "../concerns";
import {
  Box,
  Title,
  ErrorMessage,
  Tag,
  Map,
  FeaturedBreweries
} from "../components";
import * as option from "@/ui/folds/option";
import * as ts from "@/ui/folds/taskState";
import { Brewery, GeographicLocation } from "@/entities";
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
    return () => [
      /**
       * Brewery data box
       * The `ts.toVNodesPending` folds any taskState into renderable VNodes.
       */
      ts.toVNodesPending(
        error => h(ErrorMessage, { error, onRetry: executeTask }),
        (result: Brewery) =>
          h(Box, { class: "flex" }, () => [
            h("div", { class: "flex-1" }, [
              /**
               * Brewery title and type
               */
              h(Title, () => [result.name, h(Tag, () => result.type)]),

              /**
               * Address
               */
              option.toParagraph(result.address.street),
              option.toParagraph(result.address.city),
              option.toParagraph(result.address.state),
              option.toParagraph(result.address.country),

              /**
               * Contact details
               */
              option.toVNodes((value: string) =>
                h("p", t("Phone: {value}", { value }))
              )(result.phone),
              option.toLink(result.website),

              /**
               * Last updated date converted into the client's timezone and localized to the client's locale.
               */
              h(
                "p",
                { class: "text-xs italic text-gray-500 pt-6" },
                t("Last updated on {date}.", { date: d(result.updatedAt) })
              )
            ]),

            /**
             * Location map
             */
            option.toVNodes((coordinates: GeographicLocation) =>
              h(Map, { coordinates })
            )(result.coordinates)
          ])
      )(taskState.value),

      /**
       * Featured breweries llist
       */
      h(FeaturedBreweries, {
        breweries: [
          { name: "Morgan Territory Brewing", id: 832 },
          { name: "Mother Earth Brew Co LLC", id: 833 },
          { name: "Non-existing Brewery (this will be 404)", id: 0 }
        ]
      })
    ];
  }
});
