import { h, defineComponent } from "vue";
import { Subtitle } from "./Subtitle";
import { apiError } from "../dictionaries/apiError";
import { Button } from "./Button";
import { ApiError } from "@/services/breweryDB/error";

export const ErrorMessage = defineComponent({
  props: {
    error: {
      type: ApiError,
      required: true
    }
  },
  setup: (props, { emit }) => () =>
    h(
      "div",
      { class: "bg-white border-red-400 border-2 rounded-lg p-4 mb-6" },
      [
        h(Subtitle, () => "Error"),
        h("p", { class: "mb-3" }, apiError(props.error.code)),
        h(Button, { onClick: () => emit("retry") }, () => "Retry")
      ]
    )
});
