<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/user';

import Navbar from '@/components/Navbar.vue';

const router = useRouter();
const userStore = useUserStore();
const userId = userStore.userId;
const token = userStore.token;
const errorMessage = ref('');
const successMessage = ref('');
const recipe = ref({
  title: '',
  category: '',
  instructions: '',
  thumbnailURL: '/Vue.png', // Default Vue image
});

const title = ref('');
const category = ref('');
const ingredients = ref('');
const instructions = ref('');
// const image = ref(null);

// const handleFileUpload = (event) => {
//   image.value = event.target.files[0];
// };

const saveRecipe = async () => {
  if (!userId || !token) {
    errorMessage.value = 'You must be logged in to add a recipe.';
    router.push('/login'); // Redirect to login if not authenticated
    return;
  }

  try {
    const response = await fetch('/api/recipes/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ ...recipe.value, submittedBy: userId }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      errorMessage.value = errorData.message || 'Failed to save the recipe.';
      return;
    }

    // Show success message
    successMessage.value = 'Recipe saved successfully!';

    // Reset the form
    recipe.value = {
      title: '',
      category: '',
      instructions: '',
      thumbnailURL: '/Vue.png',
    };

    // Optional: Navigate to favorites page
    router.push('/favorites');
  } catch (error) {
    console.error('Error saving recipe:', error);
    errorMessage.value = 'An error occurred while saving the recipe.';
  }
};

const submitRecipe = async () => {
  try {
    const formData = new FormData();
    formData.append('title', title.value);
    formData.append('category', category.value);
    formData.append('ingredients', ingredients.value);
    formData.append('instructions', instructions.value);
    // if (image.value) {
    //   formData.append('image', image.value);
    // }

    const response = await fetch('/api/recipes', {
      method: 'POST',
      body: formData,
    });

    if (response.ok) {
      alert('Recipe added successfully!');
    } else {
      alert('Failed to add recipe.');
    }
  } catch (error) {
    console.error('Error during recipe submission:', error);
  }
};
</script>

<template>
<!--  <div>-->
<!--    <div class="container mt-4">-->
<!--      <h1 class="text-center">Add Recipe</h1>-->
<!--      <form @submit.prevent="submitRecipe">-->
<!--        <div class="mb-3">-->
<!--          <label for="title" class="form-label">Recipe Title</label>-->
<!--          <input v-model="title" id="title" class="form-control" type="text" required />-->
<!--        </div>-->
<!--        <div class="mb-3">-->
<!--          <label for="category" class="form-label">Category</label>-->
<!--          <select v-model="category" id="category" class="form-select" required>-->
<!--            <option value="Vegetarian">Vegetarian</option>-->
<!--            <option value="Meat">Meat</option>-->
<!--            <option value="Vegan">Vegan</option>-->
<!--            <option value="Dessert">Dessert</option>-->
<!--          </select>-->
<!--        </div>-->
<!--        <div class="mb-3">-->
<!--          <label for="ingredients" class="form-label">Ingredients</label>-->
<!--          <textarea v-model="ingredients" id="ingredients" class="form-control" required></textarea>-->
<!--        </div>-->
<!--        <div class="mb-3">-->
<!--          <label for="instructions" class="form-label">Instructions</label>-->
<!--          <textarea v-model="instructions" id="instructions" class="form-control" required></textarea>-->
<!--        </div>-->
<!--&lt;!&ndash;        <div class="mb-3">&ndash;&gt;-->
<!--&lt;!&ndash;          <label for="image" class="form-label">Upload Image (Optional)</label>&ndash;&gt;-->
<!--&lt;!&ndash;          <input @change="handleFileUpload" id="image" type="file" class="form-control" />&ndash;&gt;-->
<!--&lt;!&ndash;        </div>&ndash;&gt;-->
<!--        <button class="btn btn-primary" type="submit">Save Recipe</button>-->
<!--      </form>-->
<!--    </div>-->
<!--  </div>-->

  <div class="container mt-5">
    <h1 class="text-center">Add Your Recipe</h1>
    <p v-if="errorMessage" class="text-danger text-center">{{ errorMessage }}</p>
    <p v-if="successMessage" class="text-success text-center">{{ successMessage }}</p>
    <form @submit.prevent="saveRecipe" class="mt-4">
      <div class="mb-3">
        <label for="title" class="form-label">Title</label>
        <input
            v-model="recipe.title"
            type="text"
            id="title"
            class="form-control"
            required
        />
      </div>
      <div class="mb-3">
        <label for="category" class="form-label">Category</label>
        <input
            v-model="recipe.category"
            type="text"
            id="category"
            class="form-control"
            required
        />
      </div>
      <div class="mb-3">
        <label for="instructions" class="form-label">Instructions</label>
        <textarea
            v-model="recipe.instructions"
            id="instructions"
            class="form-control"
            rows="5"
            required
        ></textarea>
      </div>
      <button type="submit" class="btn btn-primary w-100">Save Recipe</button>
    </form>
  </div>
</template>

<style scoped>

</style>