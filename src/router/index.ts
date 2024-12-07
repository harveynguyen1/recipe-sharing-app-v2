import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '@/views/Dashboard.vue';
import AddRecipe from '@/views/AddRecipe.vue';
import Favorites from '@/views/Favorites.vue';
import CreateUser from '@/views/CreateUser.vue';
import HomeView from '@/views/HomeView.vue';
import Login from '@/views/Login.vue';

const routes = [
  { path: '/', component: HomeView, meta: { requiresAuth: true } },
  {
    path: '/dashboard', component: Dashboard, meta: { requiresAuth: true, role: ['admin', 'write'] },
  },
  {
    path: '/add-recipe', component: AddRecipe, meta: {requiresAuth: true, role: ['admin', 'write']},
  },
  { path: '/favorites', component: Favorites, meta: { requiresAuth: true } },
  { path: '/create-user', component: CreateUser, meta: { requiresAuth: true, role: 'admin' } },
  { path: '/login', component: Login },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token') || sessionStorage.getItem('token');
  const userRole = token ? localStorage.getItem('accessLevel') : null; // 'admin', 'write', 'read'

  if (to.meta.requiresAuth && !token) {
    return next('/login');
  } else if (to.meta.role && to.meta.role.includes('write')) {
    next('/'); // Redirect to home if user has write access
  }

  if (to.meta.role && userRole !== 'admin') {
    return next('/create-user');
  }

  next();
});

export default router
