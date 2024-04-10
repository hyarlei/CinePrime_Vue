import { createRouter, createWebHistory } from 'vue-router';

import Home from '../pages/Home/HomePage.vue';
import NotFoundPage from '../pages/NotFoundPage/NotFound.vue';

const routes = [
  {
    path: '/',
    name: Home,
    component: Home
  },
  { path: '/:pathMatch(.*)*',
  name: NotFoundPage,
   component: NotFoundPage 
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;