import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '@/views/Dashboard.vue';
import AddRecipe from '@/views/AddRecipe.vue';
import Favorites from '@/views/Favorites.vue';
import CreateUser from '@/views/CreateUser.vue';
import Login from '@/views/Login.vue';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { AppDataSource } from './data-source';
import { User } from './entities/User';
import { Recipe } from './entities/Recipe';

const routes = [
  { path: '/', component: Dashboard, meta: { requiresAuth: true } },
  { path: '/add-recipe', component: AddRecipe, meta: { requiresAuth: true } },
  { path: '/favorites', component: Favorites, meta: { requiresAuth: true } },
  { path: '/create-user', component: CreateUser, meta: { requiresAuth: true, requiresAdmin: true } },
  { path: '/login', component: Login },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes
})

router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem('token');
  const userRole = localStorage.getItem('role'); // 'admin', 'write', 'read'

  if (to.meta.requiresAuth && !isAuthenticated) {
    return next('/login');
  }

  if (to.meta.requiresAdmin && userRole !== 'admin') {
    return next('/');
  }

  next();
});

export default router
