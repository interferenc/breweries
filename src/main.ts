import { createApp } from "vue";
import { router } from "./ui/router";
import { i18n } from "./ui/i18n";
import { initialize as initializeQueryRepository } from "./ui/queryState";
import { RouterView as App } from "vue-router";
import "@/ui/assets/style.css";

router.isReady().then(initializeQueryRepository);

createApp(App)
  .use(router)
  .use(i18n)
  .mount("#app");
