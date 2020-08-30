import { h, defineComponent, watch } from "vue";
import { get } from "@/services/breweryDB/resources/brewery";
import { useApiTask } from "../concerns";
import { RouterLink } from "vue-router";
import { Box, Subtitle, Title, ErrorMessage, Tag } from "../components";
import * as option from "@/ui/folds/option";
import * as ts from "@/ui/folds/taskState";
import { smallStaticMap } from "@/services/mapbox";
import { Brewery, GeographicLocation } from "@/entities";
import { RouteName } from "../router/types";

export const DetailView = defineComponent({
  props: {
    id: {
      type: Number,
      required: true
    }
  },
  setup(props) {
    const { executeTask, taskState } = useApiTask(() => get(props.id));
    executeTask();

    watch(props, executeTask);

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
                option.toVNodes((value: string) => h("p", `Phone: ${value}`))(
                  result.phone
                ),
                option.toLink(result.website)
              ]),
              option.toVNodes((coordinates: GeographicLocation) =>
                h("img", {
                  class: "rounded",
                  style:
                    "background-color: #ECE7E2; width: 200px; height: 200px;",
                  src: smallStaticMap(coordinates, 12)
                })
              )(result.coordinates)
            ])
        )(taskState.value),
        h(Subtitle, () => "Featured breweries"),
        h("ul", { class: "list-disc pl-6" }, [
          h(
            "li",
            h(
              RouterLink,
              { to: { name: RouteName.Detail, params: { id: 832 } } },
              () => "Morgan Territory Brewing"
            )
          ),
          h(
            "li",
            h(
              RouterLink,
              { to: { name: RouteName.Detail, params: { id: 833 } } },
              () => "Mother Earth Brew Co LLC"
            )
          ),
          h(
            "li",
            h(
              RouterLink,
              { to: { name: RouteName.Detail, params: { id: "no-such-id" } } },
              () => "Non-existing Brewery (this will be 404)"
            )
          )
        ])
      ]);
  }
});
