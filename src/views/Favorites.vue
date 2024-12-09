<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/user';
import Navbar from '@/components/Navbar.vue';

const router = useRouter();
const favoriteRecipes = ref([]); // Store favorite recipes
const userStore = useUserStore();
const userId = userStore.userId; // Retrieve userId
const token = userStore.token; // Get token
const favorites = ref([]);
const errorMessage = ref('');


const fetchFavorites = async () => {

  if (!userId || !token) {
    errorMessage.value = 'You must be logged in to view your favorite recipes.';
    router.push('/login'); // Redirect to login if not authenticated
    return;
  }

  try {
    const response = await fetch(`/api/favorites/${userId}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      errorMessage.value = errorData.message || 'Failed to fetch favorite recipes.';
      return;
    }

    favoriteRecipes.value = await response.json(); // Set favorite recipes
  } catch (error) {
    console.error('Error fetching favorite recipes:', error);
    errorMessage.value = 'An error occurred while fetching your favorite recipes.';
  }
};

// const removeFromFavorites = async (recipeId) => {
//   await fetch(`/api/favorites/${recipeId}`, { method: 'DELETE' });
//   favorites.value = favorites.value.filter((recipe) => recipe.id !== recipeId);
// };

const deleteFavorite = async (recipeId: number) => {
  if (!userId || !token) {
    errorMessage.value = 'You must be logged in to delete a recipe.';
    router.push('/login'); // Redirect to login if not authenticated
    return;
  }

  try {
    const response = await fetch(`/api/favorites/delete/${recipeId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      errorMessage.value = errorData.message || 'Failed to delete the recipe.';
      return;
    }

    // Remove the deleted recipe from the favoriteRecipes array
    favoriteRecipes.value = favoriteRecipes.value.filter(
        (recipe) => recipe.id !== recipeId
    );
  } catch (error) {
    console.error('Error deleting favorite recipe:', error);
    errorMessage.value = 'An error occurred while deleting the recipe.';
  }
};

onMounted(() => {
  fetchFavorites();
});
</script>

<template>
<!--  <div>-->
<!--    <div class="container mt-4">-->
<!--      <h1 class="text-center">Your Favorite Recipes</h1>-->
<!--      <div class="row">-->
<!--        <div v-for="recipe in favorites" :key="recipe.id" class="col-md-6 mb-4">-->
<!--          <div class="card">-->
<!--            <img :src="recipe.thumbnailURL" class="card-img-top" :alt="recipe.title" />-->
<!--            <div class="card-body">-->
<!--              <h5 class="card-title">{{ recipe.title }}</h5>-->
<!--              <p class="card-text">Category: {{ recipe.category }}</p>-->
<!--              <button class="btn btn-danger" @click="removeFromFavorites(recipe.id)">Remove</button>-->
<!--            </div>-->
<!--          </div>-->
<!--        </div>-->
<!--      </div>-->
<!--    </div>-->
<!--  </div>-->
  <div class="container mt-5">
    <h1 class="text-center">My Favorite Recipes</h1>
    <p v-if="errorMessage" class="text-danger text-center">{{ errorMessage }}</p>
    <div v-else class="row">
      <div
          v-for="recipe in favoriteRecipes"
          :key="recipe.id"
          class="col-md-4 mb-4"
      >
        <div class="card position-relative">
          <!-- Red 'X' button -->
          <button
              class="btn btn-danger btn-sm position-absolute top-0 end-0 m-2"
              @click="deleteFavorite(recipe.id)"
          >
            X
          </button>
          <img :src="recipe.thumbnailURL" class="card-img-top" alt="Recipe Image" />
          <div class="card-body">
            <h5 class="card-title">{{ recipe.title }}</h5>
            <p class="card-text">Category: {{ recipe.category }}</p>
            <p class="card-text">{{ recipe.instructions }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card {
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
}

.card img {
  height: 200px;
  object-fit: cover;
}

.btn-danger {
  z-index: 2;
  cursor: pointer;
}
</style>