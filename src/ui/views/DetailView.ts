import { h, defineComponent, watch } from "vue";
import { get } from "@/services/resources/brewery/actions";
import { useApiTask, fold } from "../concerns/useApiTask";
import { RouterLink } from "vue-router";
import { Box } from "../components/Box";
import { Subtitle } from "../components/Subtitle";
import { Title } from "../components/Title";
import { ErrorMessage } from "../components/ErrorMessage";

export const DetailView = defineComponent({
  props: {
    id: {
      type: Number,
      required: true
    }
  },
  setup(props) {
    console.log(props);
    const apiTask = useApiTask(() => get(props.id));
    watch(props, apiTask.execute);
    apiTask.execute();

    return () =>
      h("div", [
        h(Box, () =>
          fold(apiTask.state.value, {
            initial: () => h("div", "initial"),
            pending: () => h("div", "pending"),
            error: error =>
              h(ErrorMessage, {
                code: error.code,
                onRetry: apiTask.execute
              }),
            result: result =>
              h("div", [
                h(Title, () => result.name),
                h("p", result.address.city)
              ])
          })
        ),
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
