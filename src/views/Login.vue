<script setup lang="ts">
import { ref } from 'vue';

const username = ref('');
const password = ref('');
const errors = ref({});

const validateAndLogin = async () => {
  errors.value = {}; // Clear errors

  // Validate username
  if (!username.value.trim()) {
    errors.value.username = 'Username is required.';
  }

  // Validate password
  if (!password.value.trim()) {
    errors.value.password = 'Password is required.';
  } else if (password.value.length < 6) {
    errors.value.password = 'Password must be at least 6 characters long.';
  }

  // If no errors, proceed to login
  if (Object.keys(errors.value).length === 0) {
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: username.value, password: password.value }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data.token); // Save token for authentication
        localStorage.setItem('role', data.role); // Save user role
        window.location.href = '/';
      } else {
        alert('Invalid username or password.');
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  }
};
</script>

<template>
  <div class="container mt-5">
    <h1 class="text-center">Login</h1>
    <form @submit.prevent="validateAndLogin">
      <div class="mb-3">
        <label for="username" class="form-label">Username</label>
        <input
            v-model="username"
            id="username"
            class="form-control"
            type="text"
            :class="{ 'is-invalid': errors.username }"
        />
        <div v-if="errors.username" class="invalid-feedback">{{ errors.username }}</div>
      </div>
      <div class="mb-3">
        <label for="password" class="form-label">Password</label>
        <input
            v-model="password"
            id="password"
            class="form-control"
            type="password"
            :class="{ 'is-invalid': errors.password }"
        />
        <div v-if="errors.password" class="invalid-feedback">{{ errors.password }}</div>
      </div>
      <button class="btn btn-primary" type="submit">Login</button>
    </form>
  </div>
</template>

<style scoped>
/* Add custom styling for invalid input feedback */
.is-invalid {
  border-color: red;
}
</style>