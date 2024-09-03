import { createRouter, createWebHashHistory } from "vue-router";

import EmployeePage from "@/pages/EmployeePage.vue";
import HomePage from "@/pages/HomePage.vue";
import MoviesPage from "@/pages/MoviesPage.vue";
import LogupUserPage from "@/pages/LogupUserPage.vue";
import LoginUserPage from "@/pages/LoginUserPage.vue";
import RoomPage from "@/pages/RoomPage.vue";
import SessionPage from "@/pages/SessionPage.vue";

const routes = [
  { path: "/", component: HomePage },
  { path: "/cadastro", component: LogupUserPage },
  { path: "/login", component: LoginUserPage },
  { path: "/funcionarios", component: EmployeePage },
  { path: "/filmes", component: MoviesPage },
  { path: "/salas", component: RoomPage},
  { path: "/sessoes", component: SessionPage },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
