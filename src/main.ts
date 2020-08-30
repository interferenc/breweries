import { createApp } from "vue";
import { router } from "./ui/router";
import { i18n } from "./ui/i18n";
import { initialize as initializeQueryRepository } from "./ui/queryState";
import "@/ui/assets/style.css";
import { RouterView as App } from "vue-router";

router.isReady().then(initializeQueryRepository);

createApp(App)
  .use(router)
  .use(i18n)
  .mount("#app");
