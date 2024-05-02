import { createRouter, createWebHistory } from "vue-router";

import logincomponent from "../components/logincomponent.vue";
import adminExamViewcomponent from "../components/adminExamViewcomponent.vue";
import studentviewcomponent from "../components/studentviewcomponent";
import selectedExamComponent from "../components/selectedExamComponent.vue";
import addExamComponent from "@/components/addExamComponent.vue";
import unAutherizedComponent from "@/components/unAutherizedComponent.vue";
import usersComponent from "@/components/usersComponent.vue";

const routes = [
  {
    path: "/",
    component: logincomponent,
  },
  {
    path: "/admin",
    component: adminExamViewcomponent,
  },
  {
    path: "/student",
    component: studentviewcomponent,
  },
  {
    path: "/exam/:id",
    component: selectedExamComponent,
  },
  {
    path: "/addExam",
    component: addExamComponent,
  },
  {
    path: "/unauthorized",
    component: unAutherizedComponent,
  },
  {
    path: "/users",
    component: usersComponent,
  },
];

const router = createRouter({
  routes,
  history: createWebHistory(),
});
export default router;
