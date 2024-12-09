<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/user';

const router = useRouter();
const username = ref(localStorage.getItem('rememberMe') === 'true' ? localStorage.getItem('username') || '' : '');
const password = ref('');
const rememberMe = ref(localStorage.getItem('rememberMe') === 'true'); // Auto-check "Remember Me" if set
const errorMessage = ref('');
const userStore = useUserStore();

const handleLogin = async () => {
  try {
    const response = await fetch('http://localhost:3000/api/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username: username.value, password: password.value }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      errorMessage.value = errorData.message || 'Invalid credentials';
      return;
    }

    const { userId, token, role } = await response.json();
    userStore.setUser(token, role, userId, username.value, rememberMe.value);

    // Save token based on "Remember Me" selection
    if (rememberMe.value) {
      localStorage.setItem('userId', userId);
      localStorage.setItem('token', token);
      localStorage.setItem('accessLevel', role);
    } else {
      sessionStorage.setItem('userId', userId);
      sessionStorage.setItem('token', token);
      sessionStorage.setItem('accessLevel', role);
    }

    // Redirect only once based on role
    if (role === 'admin') {
      return router.push('/dashboard');
    } else if (role === 'write') {
      return router.push('/add-recipe');
    } else if (role === 'read') {
      return router.push('/');
    }
  } catch (error: any) {
    errorMessage.value = error.message || 'Failed to login. Please try again.';
  }
};
</script>

<template>
  <div class="container-fluid d-flex flex-column">
    <div class="d-flex align-items-center justify-content-center py-5">
      <div class="card w-50">
        <div class="card-header text-center">
          <h2>Login</h2>
        </div>
        <div class="card-body">
          <form @submit.prevent="handleLogin">
            <div class="mb-3">
              <label for="username" class="form-label">Username</label>
              <input
                  type="text"
                  id="username"
                  v-model="username"
                  class="form-control"
                  required
              />
              <div v-if="errorMessage" class="text-danger mt-2">{{ errorMessage }}</div>
            </div>
            <div class="mb-3">
              <label for="password" class="form-label">Password</label>
              <input
                  type="password"
                  id="password"
                  v-model="password"
                  class="form-control"
                  required
              />
              <div v-if="errorMessage" class="text-danger mt-2">{{ errorMessage }}</div>
            </div>
            <div class="mb-3 form-check">
              <input
                  type="checkbox"
                  id="rememberMe"
                  v-model="rememberMe"
                  class="form-check-input"
              />
              <label for="rememberMe" class="form-check-label">Remember Me</label>
            </div>
            <button type="submit" class="btn btn-primary w-100">Login</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Add custom styling for invalid input feedback */
.is-invalid {
  border-color: red;
}

.card {
  border-radius: 8px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
}

.text-danger {
  font-size: 14px;
}

.container-fluid {
  padding: 0;
}

.w-50 {
  max-width: 600px;
}

.card-body {
  padding: 20px;
}
</style>