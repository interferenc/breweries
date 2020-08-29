import { h, defineComponent } from "vue";
import { RouterLink } from "vue-router";

export const NavbarItem = defineComponent({
  props: {
    routeName: {
      type: String,
      required: true
    }
  },
  setup: (props, { slots }) => () =>
    h(
      RouterLink,
      {
        class: "px-3 font-bold",
        to: { name: props.routeName }
      },
      slots
    )
});
