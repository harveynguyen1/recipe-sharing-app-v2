<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import Navbar from '@/components/Navbar.vue';
</script>

<template>
  <div id="app">
    <!-- Include Navbar -->
    <Navbar />

    <!-- Main content area -->
    <div class="content">
      <router-view />
    </div>

    <!-- Footer -->
    <footer class="bg-light text-center py-3 mt-auto">
      <p class="mb-0">© 2024 Recipe Sharing App. All rights reserved.</p>
    </footer>
  </div>
</template>

<style scoped>
/* Ensure the layout spans the full height of the viewport */
#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

/* The main content should take up the available space */
.content {
  flex: 1;
  padding: 20px;
}
</style>
