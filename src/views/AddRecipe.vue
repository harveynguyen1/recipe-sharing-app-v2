<script setup lang="ts">
import { ref } from 'vue';
import Navbar from '@/components/Navbar.vue';

const title = ref('');
const category = ref('');
const ingredients = ref('');
const instructions = ref('');
const image = ref(null);

const handleFileUpload = (event) => {
  image.value = event.target.files[0];
};

const submitRecipe = async () => {
  try {
    const formData = new FormData();
    formData.append('title', title.value);
    formData.append('category', category.value);
    formData.append('ingredients', ingredients.value);
    formData.append('instructions', instructions.value);
    if (image.value) {
      formData.append('image', image.value);
    }

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
  <div>
    <div class="container mt-4">
      <h1 class="text-center">Add Recipe</h1>
      <form @submit.prevent="submitRecipe">
        <div class="mb-3">
          <label for="title" class="form-label">Recipe Title</label>
          <input v-model="title" id="title" class="form-control" type="text" required />
        </div>
        <div class="mb-3">
          <label for="category" class="form-label">Category</label>
          <select v-model="category" id="category" class="form-select" required>
            <option value="Vegetarian">Vegetarian</option>
            <option value="Meat">Meat</option>
            <option value="Vegan">Vegan</option>
            <option value="Dessert">Dessert</option>
          </select>
        </div>
        <div class="mb-3">
          <label for="ingredients" class="form-label">Ingredients</label>
          <textarea v-model="ingredients" id="ingredients" class="form-control" required></textarea>
        </div>
        <div class="mb-3">
          <label for="instructions" class="form-label">Instructions</label>
          <textarea v-model="instructions" id="instructions" class="form-control" required></textarea>
        </div>
        <div class="mb-3">
          <label for="image" class="form-label">Upload Image (Optional)</label>
          <input @change="handleFileUpload" id="image" type="file" class="form-control" />
        </div>
        <button class="btn btn-primary" type="submit">Save Recipe</button>
      </form>
    </div>
  </div>
</template>

<style scoped>

</style>