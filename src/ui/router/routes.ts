import { RouteRecordRaw, RouteLocationNormalized } from "vue-router";
import { HomeView, IndexView, DetailView, AboutView } from "@/ui/views";
import { EmptyLayout, NavbarLayout } from "@/ui/layouts";

import { RouteName } from "./types";
import { numberDecoder } from "./query";

/**
 * Extract the numeric ID from the route params and decodes it
 * @param route the route to use for extraction
 */
const idFromRoute = (route: RouteLocationNormalized) => ({
  id: numberDecoder(route.params.id as string)
});

/**
 * The application routes.
 *
 * The top level routers are used to set the used layout. Actual views are always children of a top level layout route.
 */
export const routes: RouteRecordRaw[] = [
  {
    path: "/",
    component: EmptyLayout,
    children: [
      {
        path: "",
        name: RouteName.Home,
        component: HomeView
      }
    ]
  },
  {
    path: "/",
    component: NavbarLayout,
    children: [
      {
        path: "breweries",
        name: RouteName.Index,
        component: IndexView
      },
      {
        path: "breweries/:id",
        name: RouteName.Detail,
        component: DetailView,
        props: idFromRoute
      },
      {
        path: "about",
        name: RouteName.About,
        component: AboutView
      }
    ]
  }
];
