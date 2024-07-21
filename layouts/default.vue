<template lang="pug">
  .div
    .header
      .ui-menu
        U-button(color="primary" variant="solid" size="sm" @click="router.push('/')") Home
        U-button(color="primary" variant="solid" size="sm" @click="router.push('/about')") About

      .aythorization
        U-button(color="primary" variant="solid" size="sm" v-if="!authenticated" @click="router.push('/login')") Login
        U-button(color="primary" variant="solid" size="sm" v-if="!authenticated" @click="router.push('/signup')") Signup
        u-button(color="primary" variant="solid" size="sm" v-else @click="logout") Logout

    .mainContent
      <slot />

    .footer(v-if="authenticated")
      h1 Welcome

</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';
import { useAuthStore } from '~/store/auth';

const router = useRouter();

const { logUserOut } = useAuthStore();
const { authenticated } = storeToRefs(useAuthStore());

const logout = () => {
  logUserOut();
  router.push('/login');
};
</script>

<style lang="scss">

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;

  button {
    margin: 0 4px;
  }
}

.mainContent {
  padding: 16px;
  margin: 3rem auto;
}
</style>