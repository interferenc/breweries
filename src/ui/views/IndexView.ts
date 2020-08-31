import { h, defineComponent, watch } from "vue";
import { getList } from "@/services/breweryDB/resources/brewery";
import * as qs from "@/ui/queryState";
import * as ts from "@/ui/folds/taskState";
import { useApiTask } from "../concerns";
import {
  Filter,
  Title,
  ErrorMessage,
  Pagination,
  Box,
  BreweryTable
} from "@/ui/components";
import { BreweryList } from "@/entities";
import { useI18n } from "vue-i18n";

const DEFAULT_PAGE = 1;

export const IndexView = defineComponent({
  setup() {
    const { t } = useI18n();

    /**
     * Create page-level state variables stored in the query string
     */
    const page = qs.number("page", DEFAULT_PAGE);
    const city = qs.string("city");
    const name = qs.string("name");

    /**
     * Create ApiTask that fetches the list of breweries based on the current state of the filters and pagination.
     * Since we need this data right away, it executes the task immediately as well.
     */
    const { executeTask, taskState } = useApiTask(() =>
      getList({
        city: city.value,
        name: name.value,
        page: page.value
      })
    );
    executeTask();

    /**
     * Execute the data fetch ApiTask on any filter/pagination state change. Since these are computed variables based on
     * the reactive route.currentRoute variable, any url change will trigger the execution.
     */
    watch([page, city, name], executeTask);

    /**
     * Executes a filter change mutation and whatever common action all filter changes should do as well. In this case,
     * it resets the pagination, so a new filtered state always starts on page 1.
     * @param mutation the mutation to execute
     */
    const updateFilter = (mutation: Function) => {
      mutation();
      page.value = DEFAULT_PAGE;
    };

    /**
     * Renders the view
     */
    return () =>
      h("div", [
        /**
         * Page title
         */
        h(Title, () => t("Breweries")),

        /**
         * Filtering form
         */
        h("form", { class: "py-4 sm:flex" }, [
          h(Filter, {
            label: t("Name"),
            value: name.value,
            onInput: (value: string) => updateFilter(() => (name.value = value))
          }),
          h(Filter, {
            label: t("City"),
            value: city.value,
            onInput: (value: string) => updateFilter(() => (city.value = value))
          })
        ]),

        /**
         * Results table and pagination
         * The `ts.toVNodePending` folds any taskState into renderable VNodes.
         */
        ts.toVNodePending(
          error => h(ErrorMessage, { error, onRetry: executeTask }),
          (list: BreweryList) => h(Box, () => h(BreweryTable, { list }))
        )(taskState.value),
        h(Pagination, { page: page.value })
      ]);
  }
});
