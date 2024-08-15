<template>
  <div class="container">
    <h1>User Information</h1>
    <p v-if="id">User ID: {{ id }}</p>
    <p v-if="username">Username: {{ username }}</p>
    <p v-else>No user information found in URL</p>
  </div>
</template>

<script lang="ts" setup>
import { useRoute } from 'vue-router';

// Extract parameters from the query string
const route = useRoute();
const id = route.query.id as string | undefined;
const username = route.query.username as string | undefined;

// Log parameters for debugging
console.log('Received ID:', id);
console.log('Received Username:', username);
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f0f4f8;
  color: #333;
  font-family: Arial, sans-serif;
  text-align: center;
}

h1 {
  font-size: 2rem;
  margin-bottom: 1rem;
  color: #04aa6d;
}
</style>
