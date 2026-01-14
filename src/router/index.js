import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/about",
      name: "about",
      component: () => import("../views/AboutView.vue"),
    },
    {
      path: "/impressum",
      name: "impressum",
      component: () => import("../views/ImpressumView.vue"),
    },
    {
      path: "/rooms",
      name: "rooms",
      component: () => import("../views/RoomsView.vue"),
    },
    {
      path: "/booking",
      name: "booking",
      component: () => import("../views/BookingView.vue"),
      props: true,
    },
    {
      path: "/user",
      name: "user",
      component: () => import("../views/UserView.vue"),
    },
  ],
});

export default router;
