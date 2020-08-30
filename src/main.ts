import { createApp } from "vue";
import { router } from "./ui/router";
import { App } from "./ui/App";
import { initialize as initializeQueryRepository } from "./ui/queryState";
import "@/ui/assets/style.css";

router.isReady().then(initializeQueryRepository);

createApp(App)
  .use(router)
  .mount("#app");
