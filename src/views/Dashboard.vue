<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import Navbar from '@/components/Navbar.vue';

const searchQuery = ref('');
const selectedCategory = ref('');
const sortOption = ref('alphabetical');
const orderOption = ref('asc');
const recipes = ref([]);
const categories = ref([
  'Vegetarian',
  'Meat',
  'Vegan',
  'Dessert',
  'Seafood',
  'Pasta',
]);

// Fetch recipes from TheMealDB API
const fetchRecipes = async () => {
  try {
    const response = await fetch(
        'https://www.themealdb.com/api/json/v1/1/search.php?s='
    );
    const data = await response.json();
    recipes.value = data.meals.map((meal) => ({
      id: meal.idMeal,
      title: meal.strMeal,
      category: meal.strCategory,
      thumbnailURL: meal.strMealThumb,
      instructions: meal.strInstructions,
    }));
  } catch (error) {
    console.error('Error fetching recipes:', error);
  }
};

// Add recipe to favorites
const addToFavorites = async (recipe) => {
  try {
    const response = await fetch('/api/favorites', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(recipe),
    });

    if (response.ok) {
      alert(`Added ${recipe.title} to favorites!`);
    } else {
      alert('Failed to add to favorites.');
    }
  } catch (error) {
    console.error('Error adding to favorites:', error);
  }
};

// View recipe details
const viewRecipe = (recipe) => {
  alert(
      `Recipe: ${recipe.title}\nCategory: ${recipe.category}\nInstructions: ${recipe.instructions}`
  );
};

// Computed property to filter and sort recipes
const filteredRecipes = computed(() => {
  let filtered = recipes.value;

  // Filter by category
  if (selectedCategory.value) {
    filtered = filtered.filter(
        (recipe) => recipe.category === selectedCategory.value
    );
  }

  // Filter by search query
  if (searchQuery.value) {
    filtered = filtered.filter((recipe) =>
        recipe.title.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
  }

  // Sort by selected option
  if (sortOption.value === 'alphabetical') {
    filtered.sort((a, b) =>
        orderOption.value === 'asc'
            ? a.title.localeCompare(b.title)
            : b.title.localeCompare(a.title)
    );
  }

  return filtered;
});

onMounted(fetchRecipes);
</script>

<template>
  <div>
    <Navbar />
    <div class="container my-4">
      <!-- Search and Filter Section -->
      <div class="d-flex justify-content-between align-items-center mb-3">
        <div class="input-group w-50">
          <input
              v-model="searchQuery"
              type="text"
              class="form-control"
              placeholder="Search Recipes"
          />
          <button class="btn btn-primary" @click="fetchRecipes">🔍</button>
        </div>
        <div>
          <select v-model="selectedCategory" class="form-select d-inline w-auto me-2">
            <option value="">Category: All</option>
            <option v-for="category in categories" :key="category" :value="category">
              {{ category }}
            </option>
          </select>
          <select v-model="sortOption" class="form-select d-inline w-auto me-2">
            <option value="alphabetical">Sort By: Alphabetical</option>
            <option value="recent">Sort By: Recent</option>
          </select>
          <select v-model="orderOption" class="form-select d-inline w-auto">
            <option value="asc">Order: Asc</option>
            <option value="desc">Order: Desc</option>
          </select>
        </div>
      </div>

      <!-- Recipe Grid -->
      <div class="row">
        <div
            v-for="recipe in filteredRecipes"
            :key="recipe.id"
            class="col-md-6 mb-4"
        >
          <div class="card">
            <img
                :src="recipe.thumbnailURL"
                class="card-img-top"
                :alt="recipe.title"
            />
            <div class="card-body">
              <h5 class="card-title">{{ recipe.title }}</h5>
              <p class="card-text">Category: {{ recipe.category }}</p>
              <button class="btn btn-primary me-2" @click="viewRecipe(recipe)">
                View Recipe
              </button>
              <button
                  class="btn btn-outline-danger"
                  @click="addToFavorites(recipe)"
              >
                ♥
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>