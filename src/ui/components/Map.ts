import { h, defineComponent } from "vue";
import { GeographicLocation } from "@/entities";
import { smallStaticMap } from "@/services/mapbox";

export const Map = defineComponent({
  props: {
    coordinates: {
      type: Object as () => GeographicLocation,
      required: true
    }
  },
  setup: props => () =>
    h("img", {
      class: "rounded",
      style: "background-color: #ECE7E2; width: 200px; height: 200px;",
      src: smallStaticMap(props.coordinates, 12)
    })
});
