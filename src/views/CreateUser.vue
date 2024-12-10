<script setup lang="ts">
import { ref, onMounted  } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '../stores/user';

const router = useRouter();
const userStore = useUserStore();
const isAdmin = ref(false);
// Form fields
const username = ref('');
const password = ref('');
const accessLevel = ref('read');
const errorMessage = ref('');
const successMessage = ref('');

const accessLevels = ['read', 'write', 'admin'];

onMounted(() => {
  // Check if the logged-in user is an admin
  isAdmin.value = userStore.role === 'admin';
});

const createUser = async () => {
  errorMessage.value = '';
  successMessage.value = '';

  try {
    const response = await fetch('/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userStore.token}`, // Use the logged-in user's token
      },
      body: JSON.stringify({
        username: username.value,
        password: password.value,
        accessLevel: accessLevel.value,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      errorMessage.value = errorData.message || 'Error creating user';
      return;
    }

    const data = await response.json();
    successMessage.value = `User ${data.username} created successfully!`;

    // Reset the form
    username.value = '';
    password.value = '';
    accessLevel.value = 'read';
  } catch (error) {
    console.error('Error creating user:', error);
    errorMessage.value = 'An error occurred while creating the user.';
  }
};
</script>

<template>
  <div class="create-user-container">
    <h2>Create User</h2>
    <div v-if="!isAdmin" class="alert alert-danger">
      You don't have access to this page.
    </div>
    <div v-else>
      <form @submit.prevent="createUser">
        <div class="mb-3">
          <label for="username" class="form-label">Username</label>
          <input
              v-model="username"
              type="text"
              id="username"
              class="form-control"
              placeholder="Enter username"
              required
          />
        </div>
        <div class="mb-3">
          <label for="password" class="form-label">Password</label>
          <input
              v-model="password"
              type="password"
              id="password"
              class="form-control"
              placeholder="Enter password"
              required
          />
        </div>
        <div class="mb-3">
          <label for="accessLevel" class="form-label">Access Level</label>
          <select
              v-model="accessLevel"
              id="accessLevel"
              class="form-select"
          >
            <option v-for="level in accessLevels" :key="level" :value="level">
              {{ level }}
            </option>
          </select>
        </div>
        <button type="submit" class="btn btn-primary">Create User</button>
      </form>
      <p v-if="successMessage" class="text-success mt-3">{{ successMessage }}</p>
      <p v-if="errorMessage" class="text-danger mt-3">{{ errorMessage }}</p>
    </div>
  </div>
</template>

<style scoped>

</style>