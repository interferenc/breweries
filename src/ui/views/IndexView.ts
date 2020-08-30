import { h, defineComponent, watch } from "vue";
import { getList } from "@/services/resources/brewery/actions";
import * as qs from "@/ui/queryState";
import * as option from "@/ui/folds/option";
import * as ts from "@/ui/folds/taskState";
import { useApiTask } from "../concerns";
import { Filter, Title, ErrorMessage, Pagination, Box } from "@/ui/components";
import { RouterLink } from "vue-router";
import { BreweryList } from "@/entities/brewery/Brewery";
import { RouteName } from "../router/types";

export const IndexView = defineComponent({
  setup() {
    const page = qs.number("page", 1);
    const city = qs.string("city");
    const name = qs.string("name");

    const { executeTask, taskState } = useApiTask(() =>
      getList({
        city: city.value,
        name: name.value,
        page: page.value
      })
    );
    executeTask();

    watch([page, city, name], executeTask);

    return () =>
      h("div", [
        h(Title, () => "Breweries"),
        h("form", { class: "py-4 sm:flex" }, [
          h(Filter, {
            label: "Name",
            value: name.value,
            onInput: (value: string) => (name.value = value)
          }),
          h(Filter, {
            label: "City",
            value: city.value,
            onInput: (value: string) => (city.value = value)
          })
        ]),
        ts.toVNodePending(
          error => h(ErrorMessage, { error, onRetry: executeTask }),
          (result: BreweryList) =>
            h(Box, () =>
              h("table", { class: "w-full -my-3" }, [
                h(
                  "thead",
                  { class: "text-left border-b-2 border-gray-400" },
                  h("tr", [h("th", "Name"), h("th", "City")])
                ),
                h(
                  "tbody",
                  result.map(brewery =>
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
                )
              ])
            )
        )(taskState.value),
        h(Pagination, { page: page.value })
      ]);
  }
});
