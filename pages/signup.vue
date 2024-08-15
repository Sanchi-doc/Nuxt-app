<template>
  <div>
    <form v-if="!isAuthenticated" @submit.prevent="signup" class="signup-form">
      <input v-model="user.username" type="text" placeholder="Username" required class="form-input">
      <input v-model="user.id" type="text" placeholder="ID" required class="form-input">
      <input v-model="user.password" type="password" placeholder="Password" required class="form-input">
      <button type="submit" class="form-button">Sign Up</button>
    </form>
    <div v-else>
      <h2>Welcome, {{ user.username }}</h2>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useAuth } from '../.nuxt/imports';
import { useRoute, useRouter } from 'vue-router';

// States for user data and authentication
const user = ref({
  username: '',
  id: '',
  password: ''
});
const { signUp, status, signIn } = useAuth();
const router = useRouter();
const route = useRoute();
const isAuthenticated = computed(() => status.value === 'authenticated');

// Function to handle signup
const signup = async () => {
  try {
    await signUp(user.value);
    // Automatically log in after successful registration
    await signIn(user.value);
    if (isAuthenticated.value) {
      router.push('/');
    }
  } catch (error) {
    console.error('Signup error:', error);
  }
};

// Function to decode JWT token
const jwtDecode = (token: string) => {
  try {
    const payload = token.split('.')[1];
    return JSON.parse(atob(payload));
  } catch (e) {
    console.error('Error decoding token:', e);
    return {};
  }
};


// Automatically handle token from URL
onMounted(() => {
  const token = route.query.token as string | undefined;

  if (token) {
    try {
      const decoded = jwtDecode(token);
      user.value.username = decoded.username;
      user.value.id = decoded.id;
      user.value.password = ''; 

      // Automatically register and log in the user
      signup();
    } catch (error) {
      console.error('Token error:', error);
    }
  }
});
</script>

<style lang="scss">
.signup-form {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f9f9f9;
  
  .form-input {
    width: 100%;
    padding: 12px;
    margin: 8px 0;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
    font-size: 16px;
    
    &:focus {
      border-color: #04aa6d;
      outline: none;
    }
  }

  .form-button {
    width: 100%;
    padding: 14px;
    background-color: #04aa6d;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #037d4b;
    }
  }
}
</style>
