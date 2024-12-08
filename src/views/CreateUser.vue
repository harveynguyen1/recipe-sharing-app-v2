<script setup lang="ts">
import { ref, watch } from 'vue';
import Navbar from '@/components/Navbar.vue';

const username = ref('');
const accessLevel = ref('Read');
const token = ref('IhaveREADaccess');

watch(accessLevel, (newValue) => {
  const tokens = {
    Admin: 'IhaveADMINaccess',
    Write: 'IhaveWRITEaccess',
    Read: 'IhaveREADaccess',
  };
  token.value = tokens[newValue];
});

const createUser = async () => {
  const response = await fetch('/api/users', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username: username.value, accessLevel: accessLevel.value, token: token.value }),
  });

  if (response.ok) {
    alert('User created successfully!');
  } else {
    alert('Failed to create user.');
  }
};
</script>

<template>
  <div>
    <div class="container mt-4">
      <h1 class="text-center">Create New User</h1>
      <form @submit.prevent="createUser">
        <div class="mb-3">
          <label for="username" class="form-label">Username</label>
          <input v-model="username" id="username" class="form-control" type="text" required />
        </div>
        <div class="mb-3">
          <label for="accessLevel" class="form-label">Access Level</label>
          <select v-model="accessLevel" id="accessLevel" class="form-select" required>
            <option value="Admin">Admin</option>
            <option value="Write">Write</option>
            <option value="Read">Read</option>
          </select>
        </div>
        <div class="mb-3">
          <label for="token" class="form-label">Token</label>
          <input v-model="token" id="token" class="form-control" type="text" readonly />
        </div>
        <button class="btn btn-primary" type="submit">Create User</button>
      </form>
    </div>
  </div>
</template>

<style scoped>

</style>