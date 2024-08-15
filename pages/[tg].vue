<template>
  <div v-if="processing">
    </div>
  <div v-else-if="error">
    <p>{{ error }}</p>
  </div>
  <div v-else>
    </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

interface User {
  id?: string;
  username?: string;
}

const user = ref<User>({});
const error = ref<string | null>(null);
const processing = ref<boolean>(true);

const router = useRouter();

const registerUser = async (id: string, username: string) => {
  try {
    const response = await axios.post('/api/register', { id, username });
    user.value = response.data.user;
    
  } catch (err) {
    error.value = handleError(err); 
    console.error('Registration error:', err);
  } finally {
    processing.value = false;
  }
};

const handleError = (err: any) => {
  if (axios.isAxiosError(err) && err.response) {
    return err.response.data.message || 'An error occurred';
  } else {
    return 'An unexpected error occurred';
  }
};

onMounted(async () => {
  const params = new URLSearchParams(window.location.search);
  const id = params.get('tg');
  const username = params.get('username');

  if (id && username) {
    await registerUser(id, username);
  } else {
    error.value = 'No user information found in URL';
  }
});
</script>