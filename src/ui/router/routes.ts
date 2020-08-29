import { RouteRecordRaw, RouteLocationNormalized } from "vue-router";
import { HomeView } from "@/ui/views/HomeView";
import { DetailView } from "@/ui/views/DetailView";
import { IndexView } from "@/ui/views/IndexView";
import { EmptyLayout } from "../layouts/EmptyLayout";
import { NavbarLayout } from "../layouts/NavbarLayout";
import { AboutView } from "../views/AboutView";

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
        name: "home",
        component: HomeView
      }
    ]
  },
  {
    path: "/",
    component: NavbarLayout,
    children: [
      {
        path: "/breweries",
        name: "index",
        component: IndexView
      },
      {
        path: "/breweries/:id",
        name: "detail",
        component: DetailView,
        props: idFromRoute
      },
      {
        path: "/about",
        name: "about",
        component: AboutView
      }
    ]
  }
];
