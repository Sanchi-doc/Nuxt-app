<template>
  <div>
    <div v-if="isAuthenticated">
      <h2>Welcome, {{ user.username }}</h2>
    </div>
    <div v-else>
      <div class="title">
        <h2>Login</h2>
      </div>
      <div class="container form">
        <label for="username"><b>Username</b></label>
        <input
          v-model="user.username"
          type="text"
          class="input"
          placeholder="Enter Username"
          name="username"
          required
        />
        <span v-if="usernameError" class="error">{{ usernameError }}</span>

        <label for="password"><b>Password</b></label>
        <input
          v-model="user.password"
          type="password"
          class="input"
          placeholder="Enter Password"
          name="password"
          required
        />
        <span v-if="loginError" class="error">{{ loginError }}</span>

        <button @click.prevent="login" class="button" :disabled="loading">
          {{ loading ? 'Logging in...' : 'Login' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue';
import { useAuth } from '../.nuxt/imports';
import { useRouter, useRoute } from 'vue-router';

// Initialize authentication and methods
const { status, signIn } = useAuth();
const isAuthenticated = computed(() => status.value === 'authenticated');
const router = useRouter();
const route = useRoute();

// States for user data and errors
const user = ref({
  username: '',
  password: '',
});
const usernameError = ref('');
const loginError = ref('');
const loading = ref(false);

// Function to handle login
const login = async () => {
  usernameError.value = '';
  loginError.value = '';
  loading.value = true;

  // Validate username format
  if (!isValidUsername(user.value.username)) {
    usernameError.value = 'Invalid username format. Please enter a valid username.';
    loading.value = false;
    return;
  }

  try {
    await signIn(user.value);
    // Redirect to home page if authenticated
    if (isAuthenticated.value) {
      router.push('/');
    }
  } catch (error) {
    loginError.value = 'Invalid credentials. Please check your username and password.';
    console.error('Login error:', error);
  } finally {
    loading.value = false;
  }
};

// Function to validate username format
const isValidUsername = (username: string) => {
  // Check minimum length
  return username.length >= 3;
};

// Function to decode JWT token
const jwtDecode = (token: string) => {
  const payload = token.split('.')[1];
  return JSON.parse(atob(payload));
};

// Automatically handle token from URL
onMounted(() => {
  const token = route.query.token as string | undefined;

  if (token) {
    try {
      const decoded = jwtDecode(token);
      // Auto-login using decoded token data
      user.value.username = decoded.username;
      user.value.password = ''; 
      // Perform login
      login();
    } catch (error) {
      loginError.value = 'Invalid or expired token.';
      console.error('Token error:', error);
    }
  }
});
</script>

<style lang="scss">
.title {
  display: flex;
  justify-content: center;
}
.container {
  padding: 16px;
}
.form {
  border: 3px solid #f1f1f1;
  border-radius: 10px;
  .input {
    width: 100%;
    padding: 12px 20px;
    margin: 8px 0;
    display: inline-block;
    border: 1px solid #ccc;
    box-sizing: border-box;
  }
  .button {
    background-color: #04aa6d;
    color: white;
    padding: 14px 20px;
    margin: 8px 0;
    border: black;
    cursor: pointer;
    &:disabled {
      background-color: #c0c0c0;
      cursor: not-allowed;
    }
  }

  .button:hover {
    opacity: 0.8;
  }

  .error {
    color: red;
    font-size: 0.875em;
    margin-top: -8px;
    margin-bottom: 8px;
  }

  @media screen and (max-width: 300px) {
    span.psw {
      display: block;
      float: none;
    }
    .cancelbtn {
      width: 100%;
    }
  }
}
</style>
