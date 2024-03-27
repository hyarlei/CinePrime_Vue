import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import EmployeeAddOrEdit from '../views/Employee/EmployeeAddOrEdit.vue';
import EmployeeList from '../views/Employee/EmployeeList.vue';
import MovieAddOrEdit from '../views/Movie//MovieAddOrEdit.vue';
import MovieList from '../views/Movie//MovieList.vue';
import MovieView from '../views/Movie//MovieView.vue';
import RoomAddOrEdit from '../views/Rooms/RoomAddOrEdit.vue';
import RoomList from '../views/Rooms/RoomList.vue';
import RoomView from '../views/Rooms/RoomView.vue';
import SessionAddOrEdit from '../views/Sessions/SessionAddOrEdit.vue';
import SessionList from '../views/Sessions/SessionList.vue';
import Singin from '../views/User/Singin.vue';
import Singup from '../views/User/Singup.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/Employee/AddOrEdit/',
      name: 'employeeAddOrEdit',
      component: EmployeeAddOrEdit,
    },
    {
      path: '/Employee/List/',
      name: 'employeeList',
      component: EmployeeList,
    },
    {
      path: '/Movie/AddOrEdit/',
      name: 'movieAddOrEdit',
      component: MovieAddOrEdit,
    },
    {
      path: '/Movie/List/',
      name: 'movieList',
      component: MovieList,
    },
    {
      path: '/Movie/View/',
      name: 'movieView',
      component: MovieView,
    },
    {
      path: '/Room/AddOrEdit/',
      name: 'roomAddOrEdit',
      component: RoomAddOrEdit,
    },
    {
      path: '/Room/List/',
      name: 'roomList',
      component: RoomList,
    },
    {
      path: '/Room/View/',
      name: 'roomView',
      component: RoomView,
    },
    {
      path: '/Session/AddOrEdit/',
      name: 'sessionAddOrEdit',
      component: SessionAddOrEdit,
    },
    {
      path: '/Session/List/',
      name: 'sessionList',
      component: SessionList,
    },
    {
      path: '/User/Singin/',
      name: 'userSingin',
      component: Singin,
    },
    {
      path: '/User/Singup/',
      name: 'userSingup',
      component: Singup,
    },
  ],
});

export default router;
