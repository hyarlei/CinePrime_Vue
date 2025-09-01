import { createRouter, createWebHashHistory } from "vue-router";
import store from '../store';

// Importação das páginas
import EmployeePage from "@/pages/EmployeePage.vue";
import HomePage from "@/pages/HomePage.vue";
import LoginUserPage from "@/pages/LoginUserPage.vue";
import LogupUserPage from "@/pages/LogupUserPage.vue";
import MoviesPage from "@/pages/MoviesPage.vue";
import RoomPage from "@/pages/RoomPage.vue";
import SessionPage from "@/pages/SessionPage.vue";
import TicketPurchasePage from '../pages/TicketPurchasePage.vue';
import MyPurchasesPage from '../pages/MyPurchasesPage.vue';
import NotFoundPage from "@/pages/NotFoundPage.vue";

/**
 * Verifica se o usuário está autenticado, caso contrário redireciona para login
 */
const requireAuth = (to, from, next) => {
  if (store.getters.isAuthenticated) {
    next();
  } else {
    next({
      path: '/login',
      query: { redirect: to.fullPath }
    });
  }
};

/**
 * Verifica se o usuário é administrador, caso contrário redireciona para login
 */
const requireAdmin = (to, from, next) => {
  if (store.getters.isAuthenticated && store.getters.userRole === 'adm') {
    next();
  } else {
    next('/login');
  }
};

/**
 * Verifica se o usuário é administrador ou funcionário, caso contrário redireciona para login
 */
const requireStaff = (to, from, next) => {
  const userRole = store.getters.userRole;
  if (store.getters.isAuthenticated && (userRole === 'adm' || userRole === 'employee')) {
    next();
  } else {
    next('/login');
  }
};

const routes = [
  { 
    path: "/", 
    name: "Home",
    component: HomePage,
    meta: { title: 'CinePrime - Início' }
  },
  { 
    path: '/:catchAll(.*)', 
    name: "NotFound",
    component: NotFoundPage,
    meta: { title: 'Página não encontrada' }
  },
  { 
    path: "/cadastro", 
    name: "Register",
    component: LogupUserPage,
    meta: { title: 'CinePrime - Cadastro' } 
  },
  { 
    path: "/login", 
    name: "Login",
    component: LoginUserPage,
    meta: { title: 'CinePrime - Login' } 
  },
  { 
    path: "/funcionarios", 
    name: "Employees",
    component: EmployeePage,
    beforeEnter: requireAdmin,
    meta: { title: 'CinePrime - Gerenciamento de Funcionários' }
  },
  { 
    path: "/filmes", 
    name: "Movies",
    component: MoviesPage,
    meta: { title: 'CinePrime - Filmes' }
  },
  { 
    path: '/movies/:id', 
    name: 'MovieDetails', 
    component: () => import('../pages/MovieDetailsPage.vue'), 
    props: true,
    meta: { title: 'CinePrime - Detalhes do Filme' }
  },
  { 
    path: "/salas", 
    name: "Rooms",
    component: RoomPage, 
    beforeEnter: requireStaff,
    meta: { title: 'CinePrime - Gerenciamento de Salas' }
  },
  { 
    path: "/sessoes", 
    name: "Sessions",
    component: SessionPage, 
    beforeEnter: requireStaff,
    meta: { title: 'CinePrime - Gerenciamento de Sessões' }
  },
  { 
    path: '/tickets/:id', 
    name: 'TicketPurchase', 
    component: TicketPurchasePage, 
    props: true,
    beforeEnter: requireAuth,
    meta: { title: 'CinePrime - Compra de Ingresso' }
  },
  { 
    path: "/minhas-compras", 
    name: "MyPurchases",
    component: MyPurchasesPage, 
    beforeEnter: requireAuth,
    meta: { title: 'CinePrime - Minhas Compras' }
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    // Sempre rola para o topo quando a rota muda
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  }
});

// Atualiza o título da página com base na rota
router.beforeEach((to, from, next) => {
  // Define o título da página baseado na meta da rota
  document.title = to.meta.title || 'CinePrime - Cinema Online';
  next();
});

export default router;
