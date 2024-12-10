<script setup lang="ts">
import { useUserStore } from '@/stores/user';
import { useRouter } from 'vue-router';
const userStore = useUserStore();
const router = useRouter();

const isLoginPage = () => {
  return router.currentRoute.value.path === '/login';
};

const logout = () => {
  // userStore.logout();
  userStore.clearUser();
  window.location.href = '/login'; // Redirect to the login page after logout
};
</script>

<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container">
      <a class="navbar-brand" href="#">Recipe Sharing App</a>
      <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item" v-if="userStore.role !== 'read'">
            <router-link class="nav-link" to="/dashboard">Dashboard</router-link>
          </li>
          <li class="nav-item" v-if="userStore.role !== 'read'">
            <router-link class="nav-link" to="/add-recipe">Add Recipe</router-link>
          </li>
          <li class="nav-item" v-if="userStore.role !== 'read'">
            <router-link class="nav-link" to="/favorites">View Favorites</router-link>
          </li>
          <li class="nav-item" v-if="userStore.role !== 'read'">
            <router-link class="nav-link" to="/create-user">Create User</router-link>
          </li>
        </ul>
        <button v-if="!isLoginPage()" class="btn btn-outline-danger" @click="logout">
          Log Out
        </button>
      </div>
    </div>
  </nav>
</template>

<style scoped>

</style>