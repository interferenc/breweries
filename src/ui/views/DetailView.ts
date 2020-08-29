import { h, defineComponent, watch, VNode } from "vue";
import { get } from "@/services/resources/brewery/actions";
import { useApiTask, foldTaskState } from "../concerns";
import { RouterLink } from "vue-router";
import { Box, Subtitle, Title, ErrorMessage, Loader, Tag } from "../components";
import { foldString } from "../helpers";
import { fold as foldOption } from "fp-ts/lib/Option";
import { GeographicLocation } from "@/entities/brewery/Brewery";

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
                h("p", foldString(result.address.street)),
                h(
                  "p",
                  `${foldString(result.address.city)}, ${foldString(
                    result.address.state
                  )}`
                ),
                h("p", foldString(result.address.country)),
                h("p", `Phone: ${foldString(result.phone)}`),
                foldOption<string, VNode | null>(
                  () => null,
                  website => h("a", { href: website }, website)
                )(result.website)
              ]),

              foldOption<GeographicLocation, VNode | null>(
                () => null,
                ({ latitude, longitude }) =>
                  h("img", {
                    class: "rounded",
                    style:
                      "background-color: #ECE7E2; width: 200px; height: 200px;",
                    src: `https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/${longitude},${latitude},12,0/200x200?access_token=pk.eyJ1IjoiaW50ZXJmZWNvIiwiYSI6ImNrZWZxeHoxMzBzejgzNnQ1N2U1djlvc3kifQ.4FBmQ_sbClfeyMKuunHx1g`
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
