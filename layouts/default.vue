<template>
  <div>
    <header>
      <ul>
        <li><nuxt-link to="/">Home</nuxt-link></li>
        <li><nuxt-link to="/about">About</nuxt-link></li>
        <li v-if="!isAuthenticated" class="loginBtn" style="float: right">
          <nuxt-link to="/signup">Signup</nuxt-link>
        </li>
        <li v-if="!isAuthenticated" class="loginBtn" style="float: right">
          <nuxt-link to="/login">Login</nuxt-link>
        </li>
        <li v-else class="loginBtn" style="float: right">
          <a @click="signOut">Logout</a>
        </li>
      </ul>
    </header>
    <div class="mainContent">
      <slot />
    </div>
    <section v-if="isAuthenticated" class="userInfo">
      <h2>User Info</h2>
      <p><strong>Email:</strong> {{ user.email }}</p>
      <p><strong>Username:</strong> {{ user.username }}</p>
    </section>
    <footer v-if="isAuthenticated" class="footer">
      <h1>Welcome</h1>
    </footer>
  </div>
</template>

<script lang="ts" setup>
import { useAuth } from '#imports'
import { computed } from 'vue'

const { status, data, signOut } = useAuth()

// Check if user is authenticated
const isAuthenticated = computed(() => status.value === 'authenticated')

// Get the current user
const user = computed(() => {
  const userData = data.value?.user
  console.log('User Data:', userData)
  return userData
})
</script>

<style lang="scss">
body {
  font-family: Arial, Helvetica, sans-serif;
  padding: 0;
  margin: 0;
}

header {
  position: fixed;
  top: 0;
  width: 100%;
  background-color: #333;
  z-index: 1000; /* Ensure header is on top of other content */
  ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
    overflow: hidden;
    display: flex;
    justify-content: flex-start;
  }

  li {
    float: left;
    border-right: 1px solid #bbb;
  }

  li:last-child {
    border-right: none;
  }

  li a {
    display: block;
    color: white;
    text-align: center;
    padding: 14px 16px;
    text-decoration: none;
    border: 1px solid #111;
    cursor: pointer;
  }

  li a:hover:not(.loginBtn) {
    background-color: #111;
  }

  .loginBtn {
    background-color: #04aa6d;
  }
}

.mainContent {
  padding: 16px;
  margin-top: 60px; /* Adjust margin to account for fixed header */
}

.userInfo {
  margin: 3rem auto;
  padding: 16px;
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 5px;
  max-width: 600px; /* Center and limit width */
  text-align: center; /* Center text inside user info */
}

.footer {
  margin-top: 3rem;
  text-align: center;
}
</style>
