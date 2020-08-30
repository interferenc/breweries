import { h, defineComponent, watch } from "vue";
import { get } from "@/services/resources/brewery/actions";
import { useApiTask, foldTaskState } from "../concerns";
import { RouterLink } from "vue-router";
import { Box, Subtitle, Title, ErrorMessage, Loader, Tag } from "../components";
import * as fold from "@/ui/folds";
import { smallStaticMap } from "@/services/mapbox";
import { GeographicLocation } from "@/entities/geographicLocation/GeographicLocation";

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
        foldTaskState(taskState.value, {
          initial: () => null,
          pending: () => h(Loader),
          error: ({ code }) => h(ErrorMessage, { code, onRetry: executeTask }),
          result: result =>
            h(Box, { class: "flex" }, () => [
              h("div", { class: "flex-1" }, [
                h(Title, () => [result.name, h(Tag, () => result.type)]),
                fold.toParagraph(result.address.street),
                fold.toParagraph(result.address.city),
                fold.toParagraph(result.address.state),
                fold.toParagraph(result.address.country),
                fold.toVNodes((value: string) => h("p", `Phone: ${value}`))(
                  result.phone
                ),
                fold.toLink(result.website)
              ]),
              fold.toVNodes((coordinates: GeographicLocation) =>
                h("img", {
                  class: "rounded",
                  style:
                    "background-color: #ECE7E2; width: 200px; height: 200px;",
                  src: smallStaticMap(coordinates, 12)
                })
              )(result.coordinates)
            ])
        }),
        h(Subtitle, () => "Featured breweries"),
        h("ul", { class: "list-disc pl-6" }, [
          h(
            "li",
            h(
              RouterLink,
              { to: { name: "detail", params: { id: 832 } } },
              () => "Morgan Territory Brewing"
            )
          ),
          h(
            "li",
            h(
              RouterLink,
              { to: { name: "detail", params: { id: 833 } } },
              () => "Mother Earth Brew Co LLC"
            )
          ),
          h(
            "li",
            h(
              RouterLink,
              { to: { name: "detail", params: { id: "no-such-id" } } },
              () => "Non-existing Brewery (this will be 404)"
            )
          )
        ])
      ]);
  }
});
