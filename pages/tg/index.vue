<template>
  <div class="container">
    <h1>Token Processing</h1>
    <p v-if="token">Received Token: {{ token }}</p>
    <p v-else>No token found in URL</p>
  </div>
</template>

<script lang="ts" setup>
import { useRoute } from 'vue-router';

const route = useRoute();
const token = route.query.token as string | undefined;
console.log('Received token:', token);
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
  color: #007bff;
}
</style>
