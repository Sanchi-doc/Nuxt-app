<template>
  <form @submit.prevent="signup" class="signup-form">
    <input v-model="user.username" type="text" placeholder="Username" required class="form-input">
    <input v-model="user.email" type="email" placeholder="Email" required class="form-input">
    <input v-model="user.password" type="password" placeholder="Password" required class="form-input">
    <button type="submit" class="form-button">Sign Up</button>
  </form>
</template>

<script setup lang="ts">

const user = ref({
  username: '',
  email: '',
  password: ''
});

const { signUp } = useAuth()

const signup = async () => {
  console.log('Sign up:', user.value);
  try {
    const res = await signUp({email: user.value.email, password: user.value.password, username: user.value.username})
    console.log('after sign up:', res)
  } catch (error) {
    console.error('Sign up error:', error)
  }
}
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
