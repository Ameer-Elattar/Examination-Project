import { createRouter, createWebHistory } from "vue-router";

import logincomponent from "../components/logincomponent.vue";
import adminviewcomponent from "../components/adminviewcomponent.vue";
import studentviewcomponent from "../components/studentviewcomponent";
import selectedExamComponent from "../components/selectedExamComponent.vue";

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
  {
    path: "/exam/:id",
    component: selectedExamComponent,
  },
];

const router = createRouter({
  routes,
  history: createWebHistory(),
});
export default router;
