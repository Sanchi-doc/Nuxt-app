<template>
  <div>
    <div class="title">
      <h2>Login</h2>
    </div>
    <div class="container form" v-if="!isAuthenticated">
      <label for="email"><b>Email</b></label>
      <input
        v-model="user.email"
        type="text"
        class="input"
        placeholder="Enter Email"
        name="email"
        required
      />
      <span v-if="emailError" class="error">{{ emailError }}</span>

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

      <button @click.prevent="login" class="button">Login</button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import { useAuth } from '#imports';
import { useRouter } from 'vue-router';

const { status, signIn } = useAuth();
const isAuthenticated = computed(() => status.value === 'authenticated');

const user = ref({
  email: '',
  password: '',
});
const emailError = ref('');
const loginError = ref('');

const router = useRouter();

// Убедитесь, что TELEGRAM_BOT_TOKEN определен
const telegramToken = process.env.TELEGRAM_BOT_TOKEN;

const login = async () => {
  emailError.value = '';
  loginError.value = '';

  if (!isValidEmail(user.value.email)) {
    emailError.value = 'Invalid email format. Please enter a valid email address.';
    return;
  }

  try {
    await signIn(user.value);
    if (isAuthenticated.value) {
      if (telegramToken) {
        // Создание URL с параметром user
        const url = `/tg?user=${encodeURIComponent(telegramToken)}`;
        router.push(url);
      } else {
        console.error('Telegram token is not defined.');
        loginError.value = 'Internal error: Telegram token is missing.';
      }
    }
  } catch (error) {
    loginError.value = 'Invalid credentials. Please check your email and password.';
  }
};

const isValidEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
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
    border: black;
    cursor: pointer;
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
