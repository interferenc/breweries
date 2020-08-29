import { h, defineComponent, watch } from "vue";
import { getList } from "@/services/resources/brewery/actions";
import * as qs from "@/ui/queryState";
import { useApiTask, fold } from "../concerns/useApiTask";
import { Filter } from "@/ui/components/Filter";
import { RouterLink } from "vue-router";
import { foldString } from "../helpers";
import { Title } from "../components/Title";
import { ErrorMessage } from "../components/ErrorMessage";
import { Pagination } from "../components/Pagination";

export const IndexView = defineComponent({
  setup(_, ctx) {
    const page = qs.number("page", 1, ctx);
    const city = qs.string("city", "", ctx);
    const name = qs.string("name", "", ctx);

    const getListApiTask = useApiTask(() =>
      getList({
        city: city.value,
        name: name.value,
        page: page.value
      })
    );
    watch([page, city, name], getListApiTask.execute);
    getListApiTask.execute();

    return () =>
      h("div", [
        h(Title, () => "Breweries"),
        h("form", { class: "py-4 sm:flex" }, [
          h(Filter, {
            label: "City",
            value: city.value,
            onInput: (value: string) => (city.value = value)
          }),
          h(Filter, {
            label: "Name",
            value: name.value,
            onInput: (value: string) => (name.value = value)
          })
        ]),
        fold(getListApiTask.state.value, {
          initial: () => h("div", "initial"),
          pending: () => h("div", "pending"),
          error: error =>
            h(ErrorMessage, {
              code: error.code,
              onRetry: getListApiTask.execute
            }),
          result: result =>
            h(
              "table",
              result.map(brewery =>
                h("tr", [
                  h(
                    "td",
                    h(
                      RouterLink,
                      { to: { name: "detail", params: { id: brewery.id } } },
                      () => brewery.name
                    )
                  ),
                  h("td", foldString(brewery.address.city))
                ])
              )
            )
        }),
        h(Pagination, { page: page.value })
      ]);
  }
});
