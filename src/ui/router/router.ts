import { createRouter, createWebHistory } from "vue-router";
import { routes } from "./routes";

/**
 * Creates the router using the routes
 */
export const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});
