import { createApp } from "vue";
import { router } from "./ui/router";
import { App } from "./ui/App";
import "@/ui/assets/style.css";

createApp(App)
  .use(router)
  .mount("#app");
