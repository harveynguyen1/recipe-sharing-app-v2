<script setup lang="ts">
import { ref, onMounted } from 'vue';
import Navbar from '@/components/Navbar.vue';

const favorites = ref([]);

const fetchFavorites = async () => {
  const response = await fetch('/api/favorites');
  favorites.value = await response.json();
};

const removeFromFavorites = async (recipeId) => {
  await fetch(`/api/favorites/${recipeId}`, { method: 'DELETE' });
  favorites.value = favorites.value.filter((recipe) => recipe.id !== recipeId);
};

onMounted(fetchFavorites);
</script>

<template>
  <div>
    <Navbar />
    <div class="container mt-4">
      <h1 class="text-center">Your Favorite Recipes</h1>
      <div class="row">
        <div v-for="recipe in favorites" :key="recipe.id" class="col-md-6 mb-4">
          <div class="card">
            <img :src="recipe.thumbnailURL" class="card-img-top" :alt="recipe.title" />
            <div class="card-body">
              <h5 class="card-title">{{ recipe.title }}</h5>
              <p class="card-text">Category: {{ recipe.category }}</p>
              <button class="btn btn-danger" @click="removeFromFavorites(recipe.id)">Remove</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>