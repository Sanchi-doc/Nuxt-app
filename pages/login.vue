<template>
  <div>
    <div class="title">
      <h2>Login</h2>
    </div>
    <div class="container form">
      <label for="email"><b>Email</b></label>
      <input
        v-model="user.email"
        type="text"
        class="input"
        placeholder="Enter Email"
        name="email"
        required
      />

      <label for="psw"><b>Password</b></label>
      <input
        v-model="user.password"
        type="password"
        class="input"
        placeholder="Enter Password"
        name="psw"
        required
      />

      <button @click.prevent="login" class="button">Login</button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import { storeToRefs } from 'pinia';
import { useAuthStore } from '~/store/auth';

const authStore = useAuthStore();
const { authenticateUser } = authStore;
const { authenticated } = storeToRefs(authStore);

const user = ref({
  email: '',
  password: '',
});

const router = useRouter();

// Auto-login if token exists
onMounted(async () => {
  const token = localStorage.getItem('token');
  if (token) {
    try {
      const response = await axios.get('/api/user', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data.user) {
        authStore.user = response.data.user; // Set the user in the store
        authStore.authenticated = true; // Mark as authenticated
        router.push('/'); // Redirect to the homepage
      }
    } catch (error) {
      console.error('Auto-login failed:', error);
      localStorage.removeItem('token');
    }
  }
});

const login = async () => {
  try {
    const response = await axios.get('/api/login', {
      params: { email: user.value.email, password: user.value.password },
    });
    localStorage.setItem('token', response.data.token); // Save token
    authStore.user = response.data.user; // Set the user in the store
    authStore.authenticated = true; // Mark as authenticated

    if (authenticated.value) {
      router.push('/'); // Redirect to the homepage if authenticated
    } else {
      alert('Login failed. Please check your credentials and try again.');
    }
  } catch (error) {
    console.error('Login error:', error);
    alert('An error occurred during login. Please try again later.');
  }
};
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
    border: none;
    cursor: pointer;
  }

  .button:hover {
    opacity: 0.8;
  }

  .cancelbtn {
    width: auto;
    padding: 10px 18px;
    background-color: #f44336;
  }

  span.psw {
    float: right;
    padding-top: 16px;
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
