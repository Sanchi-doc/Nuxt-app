<template>
  <div>
    <div class="title">
      <h2>Signup</h2>
    </div>
    <div class="container form">
      <label for="uname"><b>Username</b></label>
      <input
        v-model="user.username"
        type="text"
        class="input"
        placeholder="Enter Username"
        name="uname"
        required
      />

      <label for="email"><b>Email</b></label>
      <input
        v-model="user.email"
        type="email"
        class="input"
        placeholder="Enter Email"
        name="email"
        required
      />

      <label for="uphone"><b>Phone</b></label>
      <input
        v-model="user.phone"
        type="text"
        class="input"
        placeholder="Enter Phone"
        name="uphone"
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

      <button @click.prevent="signup" class="button">Submit</button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import { useAuthStore } from '~/store/auth';

const authStore = useAuthStore();
const router = useRouter();

interface UserPayloadInterface {
  username: string;
  email: string;
  phone: string;
  password: string;
}

const user = ref<UserPayloadInterface>({
  username: '',
  email: '',
  phone: '',
  password: '',
});

const signup = async () => {
  try {
    const response = await axios.post('/api/register', user.value);
    console.log('Response data:', response.data); // Log response data
    const token = response.data.token;

    if (token) {
      localStorage.setItem('token', token);
      authStore.user = user.value;
      authStore.authenticated = true;

      await router.push('/'); // Redirect to the main page
    } else {
      alert('Registration failed. Please try again.');
    }
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      // Handle Axios specific errors
      console.error('Error during registration:', error.response?.data || error.message);
      alert('Registration failed due to an error. Please try again later.');
    } else {
      // Handle unexpected errors
      console.error('Unexpected error during registration:', error);
      alert('An unexpected error occurred. Please try again later.');
    }
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
}
</style>
