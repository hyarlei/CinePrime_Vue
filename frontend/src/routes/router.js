import { createRouter, createWebHashHistory } from "vue-router";
import store from '../store';

import EmployeePage from "@/pages/EmployeePage.vue";
import HomePage from "@/pages/HomePage.vue";
import LoginUserPage from "@/pages/LoginUserPage.vue";
import LogupUserPage from "@/pages/LogupUserPage.vue";
import MoviesPage from "@/pages/MoviesPage.vue";
import RoomPage from "@/pages/RoomPage.vue";
import SessionPage from "@/pages/SessionPage.vue";
import TicketPurchasePage from '../pages/TicketPurchasePage.vue';
import MyPurchasesPage from '../pages/MyPurchasesPage.vue'; // Importando a página de Minhas Compras
import NotFoundPage from "@/pages/NotFoundPage.vue";

console.log('User authenticated:', store.getters.isAuthenticated);
console.log('User role:', store.getters.userRole);

const routes = [
  { path: "/", component: HomePage },
  { path: '/:catchAll(.*)', component: NotFoundPage },
  { path: "/cadastro", component: LogupUserPage },
  { path: "/login", component: LoginUserPage },
  { path: "/funcionarios", component: EmployeePage, 
    beforeEnter: (to, from, next) => {
      const isAuthenticated = store.getters.isAuthenticated;
      const userRole = store.getters.userRole;
      console.log('isAuthenticated:', isAuthenticated);
      console.log('userRole:', userRole);

      if (isAuthenticated && userRole === 'adm') {
        next();
      } else {
        next('/login');
      }
    } 
  },
  { path: "/filmes", component: MoviesPage },
  { path: '/movies/:id', name: 'MovieDetails', component: () => import('../pages/MovieDetailsPage.vue'), props: true },
  { path: "/salas", component: RoomPage, 
    beforeEnter: (to, from, next) => {
      const isAuthenticated = store.getters.isAuthenticated;
      const userRole = store.getters.userRole;
      console.log('isAuthenticated:', isAuthenticated);
      console.log('userRole:', userRole);

      if (isAuthenticated && (userRole === 'employee' || userRole === 'adm')) {
        next();
      } else {
        next('/login');
      }
    }
  },
  { path: "/sessoes", component: SessionPage, 
    beforeEnter: (to, from, next) => {
      const isAuthenticated = store.getters.isAuthenticated;
      const userRole = store.getters.userRole;
      console.log('isAuthenticated:', isAuthenticated);
      console.log('userRole:', userRole);

      if (isAuthenticated && (userRole === 'employee' || userRole === 'adm')) {
        next();
      } else {
        next('/login');
      }
    } 
  },
  { path: '/tickets/:id', name: 'TicketPurchase', component: TicketPurchasePage, props: true },
  
  { path: "/minhas-compras", component: MyPurchasesPage, 
    beforeEnter: (to, from, next) => {
      const isAuthenticated = store.getters.isAuthenticated;
      console.log('isAuthenticated:', isAuthenticated);

      if (isAuthenticated) {
        next();
      } else {
        next('/login');
      }
    } 
  },
];

const router = createRouter({
  history: createWebHashHistory(),  
  routes,
});

export default router;
