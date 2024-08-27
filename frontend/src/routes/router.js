import { createRouter, createWebHashHistory } from "vue-router";

import EmployeePage from "@/pages/EmployeePage.vue";
import HomePage from "@/pages/HomePage.vue";
import MoviesPage from "@/pages/MoviesPage.vue";
import LogupUserPage from "@/pages/LogupUserPage.vue";
import LoginUserPage from "@/pages/LoginUserPage.vue";

const routes = [
  { path: "/", component: HomePage },
  { path: "/cadastro", component: LogupUserPage },
  { path: "/login", component: LoginUserPage },
  { path: "/funcionarios", component: EmployeePage },
  { path: "/filmes", component: MoviesPage },
  // { path: "/salas", component: MoviesPage },
  // { path: "/sessoes", component: MoviesPage },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
