import { h, defineComponent } from "vue";
import { apiError } from "../dictionaries";
import { Button, Box, Subtitle } from ".";
import { ApiError } from "@/services/breweryDB/error";
import { useI18n } from "vue-i18n";

export const ErrorMessage = defineComponent({
  props: {
    error: {
      type: ApiError,
      required: true
    }
  },
  setup: (props, { emit }) => () => {
    const { t } = useI18n();
    return h(Box, { class: "border-red-400 border-4" }, () => [
      /**
       * Title
       */
      h(Subtitle, () => t("Error")),

      /**
       * Human readable error message
       */
      h("p", { class: "mb-3" }, apiError(props.error.code)),

      /**
       * Retry button
       */
      h(Button, { onClick: () => emit("retry") }, () => t("Retry"))
    ]);
  }
});
