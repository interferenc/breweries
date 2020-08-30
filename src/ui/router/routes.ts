import { RouteRecordRaw, RouteLocationNormalized } from "vue-router";
import { HomeView } from "@/ui/views/HomeView";
import { DetailView } from "@/ui/views/DetailView";
import { IndexView } from "@/ui/views/IndexView";
import { EmptyLayout } from "../layouts/EmptyLayout";
import { NavbarLayout } from "../layouts/NavbarLayout";
import { AboutView } from "../views/AboutView";
import { RouteName } from "./types";

const idFromRoute = (route: RouteLocationNormalized) => ({
  id: parseInt(route.params.id as string, 10)
});

export const routes: Array<RouteRecordRaw> = [
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
