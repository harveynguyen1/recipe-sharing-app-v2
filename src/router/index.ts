import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores/user';
import Dashboard from '@/views/Dashboard.vue';
import AddRecipe from '@/views/AddRecipe.vue';
import Favorites from '@/views/Favorites.vue';
import CreateUser from '@/views/CreateUser.vue';
import HomeView from '@/views/HomeView.vue';
import Login from '@/views/Login.vue';

const routes = [
  { path: '/', name: 'Home', component: HomeView, meta: { requiresAuth: true } },
  {
    path: '/dashboard', name: 'Dashboard', component: Dashboard, meta: { requiresAuth: true, role: ['admin', 'write'] },
  },
  {
    path: '/add-recipe', name: 'AddRecipe', component: AddRecipe, meta: {requiresAuth: true, role: ['admin', 'write']},
  },
  { path: '/favorites',  name: 'Favorites', component: Favorites, meta: { requiresAuth: true } },
  { path: '/create-user', name: 'CreateUser', component: CreateUser, meta: { requiresAuth: true, role: 'admin' } },
  { path: '/login', name: 'Login', component: Login },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token') || sessionStorage.getItem('token');
  const userRole = token ? localStorage.getItem('accessLevel') : null; // 'admin', 'write', 'read'

  const userStore = useUserStore();

  if (to.meta.requiresAuth && !token) {
    console.log(to.meta.requiresAuth + ", token = " + token );
    next('/login');
  }
  else {
    next();
  }
  // else if (to.meta.role && to.meta.role.includes('write')) {
  //   console.log(to.meta.role + ", to.meta.role = " + to.meta.role );
  //   return next('/'); // Redirect to home if user has write access
  // } else if (to.meta.role && to.meta.role.includes('admin')) {
  //   console.log(to.meta.role + ", to.meta.role = " + to.meta.role );
  //   return next('/create-user');
  // }

  // next();
});

export default router
