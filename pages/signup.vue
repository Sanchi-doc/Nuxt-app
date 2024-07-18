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
          placeholder="Enter Username"
          name="uname"
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

      <button @click.prevent="Signup" class="button">Submit</button>
    </div>
  </div>
</template>


<script lang="ts" setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '~/store/auth';
import {storeToRefs} from "pinia";

const { registerUser } = useAuthStore(); // use auth store

const { authenticated } = storeToRefs(useAuthStore()); // make authenticated state reactive

const router = useRouter();

const user = ref({
  username: '',
  email: '',
  phone: '',
  password: ''
});

const Signup = async () => {
  try {
    console.log('registering user', user.value);
    await registerUser(<UserPayloadInterface>user.value);
    if (authenticated.value) {
      await router.push('/');
    } else {
      alert('Registration failed. Please try again.');
    }
  } catch (error) {
    console.error('Error during registration:', error);
    alert('Registration failed due to an error. Please try again later.');
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

  /* Change styles for span and cancel button on extra small screens */
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