<template>
  <form @submit.prevent="signup">
    <input v-model="username" type="text" placeholder="Username" required>
    <input v-model="email" type="email" placeholder="Email" required>
    <input v-model="password" type="password" placeholder="Password" required>
    <button type="submit">Sign Up</button>
  </form>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      email: '',
      password: ''
    }
  },
  methods: {
    async signup() {
      try {
        await this.$axios.post('/api/auth/signup', {
          username: this.username,
          email: this.email,
          password: this.password
        });
        this.$router.push('/login'); 
      } catch (error) {
        console.error('Signup failed', error);
      }
    }
  }
}
</script>
