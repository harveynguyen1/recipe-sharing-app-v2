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
const isEditing = ref(false); // Track if a recipe is being edited
const editingRecipe = ref<any>(null); // Set initial value to null

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

const startEditing = (recipe) => {
  isEditing.value = true;
  editingRecipe.value = { ...recipe }; // Create a copy to edit
};

const saveRecipe = async () => {
  try {
    if (!editingRecipe.value) return; // Ensure editingRecipe is defined
    const response = await fetch(`/api/favorites/edit/${editingRecipe.value.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(editingRecipe.value),
    });

    if (!response.ok) {
      const errorData = await response.json();
      errorMessage.value = errorData.message || 'Failed to update the recipe.';
      return;
    }

    // Update the recipe in the local favoriteRecipes array
    const index = favoriteRecipes.value.findIndex(
        (recipe) => recipe.id === editingRecipe.value.id
    );
    if (index !== -1) {
      favoriteRecipes.value[index] = { ...editingRecipe.value };
    }

    isEditing.value = false;
    editingRecipe.value = null; // Reset editingRecipe after saving
  } catch (error) {
    console.error('Error saving recipe:', error);
    errorMessage.value = 'An error occurred while saving the recipe.';
  }
};

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
          <!-- Blue edit button -->
          <button
              class="btn btn-primary btn-sm position-absolute top-0 start-0 m-2"
              @click="startEditing(recipe)"
          >
            <i class="bi bi-pencil"></i>
          </button>
          <!-- Red delete button -->
          <button
              class="btn btn-danger btn-sm position-absolute top-0 end-0 m-2"
              @click="deleteFavorite(recipe.id)"
          >
            <i class="bi bi-trash"></i>
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
    <!-- Edit Modal -->
    <div
        v-if="isEditing && editingRecipe"
        class="modal fade show d-block"
        style="background-color: rgba(0, 0, 0, 0.5);"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Edit Recipe</h5>
            <button type="button" class="btn-close" @click="isEditing = false"></button>
          </div>
          <div class="modal-body">
            <form>
              <div class="mb-3">
                <label for="title" class="form-label">Title</label>
                <input
                    v-model="editingRecipe.title"
                    type="text"
                    class="form-control"
                    id="title"
                />
              </div>
              <div class="mb-3">
                <label for="category" class="form-label">Category</label>
                <input
                    v-model="editingRecipe.category"
                    type="text"
                    class="form-control"
                    id="category"
                />
              </div>
              <div class="mb-3">
                <label for="instructions" class="form-label">Instructions</label>
                <textarea
                    v-model="editingRecipe.instructions"
                    class="form-control"
                    id="instructions"
                ></textarea>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="isEditing = false">Cancel</button>
            <button type="button" class="btn btn-primary" @click="saveRecipe">Save Changes</button>
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

.btn-primary {
  z-index: 2;
  cursor: pointer;
}

.btn-danger {
  z-index: 2;
  cursor: pointer;
}
</style>