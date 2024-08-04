<template>
  <form @submit.prevent="signup">
    <input v-model="username" type="text" placeholder="Username" required>
    <input v-model="email" type="email" placeholder="Email" required>
    <input v-model="password" type="password" placeholder="Password" required>
    <button type="submit">Sign Up</button>
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
  await signUp(user.value)
}


</script>
