import { createRouter, createWebHistory } from "vue-router";

import logincomponent from "../components/logincomponent.vue";
import adminviewcomponent from "../components/adminviewcomponent.vue";
import studentviewcomponent from "../components/studentviewcomponent";

const routes = [
  {
    path: "/",
    component: logincomponent,
  },
  {
    path: "/admin",
    component: adminviewcomponent,
  },
  {
    path: "/student",
    component: studentviewcomponent,
  },
];

const router = createRouter({
  routes,
  history: createWebHistory(),
});
export default router;
