# Layouts

This application defines layouts as top level components that are wrapped around individual views (or pages, screens) to allow sharing interface elements.

## Implementation

Layouts are implemented using child routes in Vue Router. The applications root component is a `RouterView` from the `vue-router` package directly. This means that there is no top level shared interface.

In the routes file, a route is defined for every layout with a path of `/`. Pages that want to use a layout needs to be child routes of the corresponding route.

Child components render their components into the nested `RouterView` element inside the corresponding layout. This also means that all layout must have exactly one `RouterView` components.

When users navigate between pages with the same layout, the __elements belonging to the layout__ (for example a navbar) are preserved and __are not recreated__.

### Usage

An example route definiton:

```ts
export const routes: RouteRecordRaw[] = [
  // empty layout
  {
    path: "/",
    component: EmptyLayout,
    children: [
      // pages that need the empty layout
      {
        path: "",
        name: RouteName.Home,
        component: HomeView
      }
    ]
  },

  // nacbar layout
  {
    path: "/",
    component: NavbarLayout,
    children: [
      // pages that need the navbar layout
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
    ],
  },
];
```

An example layout:

```ts
import { h, defineComponent } from "vue";
import { RouterView } from "vue-router";
import { Navbar } from "@/ui/components/Navbar";

export const NavbarLayout = defineComponent({
  setup: () => () =>
    h("div", { class: "pt-16 p-6" }, [
      // shared navbar across all pages
      h(Navbar),

      // views will be rendered in place of this RouterView
      h(RouterView)
    ])
});
```
