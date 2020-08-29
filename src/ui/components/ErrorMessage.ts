import { h, defineComponent } from "vue";
import { Subtitle } from "./Subtitle";
import { apiError } from "../dictionaries/apiError";
import { Button } from "./Button";

export const ErrorMessage = defineComponent({
  props: {
    code: {
      type: Number,
      required: true
    }
  },
  setup(props, { emit }) {
    return () =>
      h(
        "div",
        { class: "bg-white border-red-400 border-2 rounded-lg p-4 mb-6" },
        [
          h(Subtitle, () => "Error"),
          h("p", { class: "mb-3" }, apiError(props.code)),
          h(Button, { onClick: () => emit("retry") }, () => "Retry")
        ]
      );
  }
});
