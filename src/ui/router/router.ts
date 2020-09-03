import { createRouter, createWebHashHistory } from "vue-router";
import { routes } from "./routes";

/**
 * Creates the router using the routes
 */
export const router = createRouter({
  /**
   * This app is deployed on GitHub pages, so no way to use proper URLs.
   */
  history: createWebHashHistory(process.env.BASE_URL),
  routes
});
