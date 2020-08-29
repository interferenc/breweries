import { createRouter, createWebHistory } from "vue-router";
import { routes } from "./routes";

export const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export * from "./query";
