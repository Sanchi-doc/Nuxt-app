<template>
  <div>
    <h1>Registering user</h1>
    <p>Tg ID : {{ tgId }}</p>
    <p>Username: {{ username }}</p>
  </div>
</template>

<script setup>

const { signUp } = useAuth();
const route = useRoute()

const { tgId, username, password, email } = route.query
const params = { tgId, username, password, email }

const signup = async () => {
  console.log('Sign up:', params);
  try {
    const res = await signUp({ params })
    console.log('after sign up:', res)
  } catch (error) {
    console.error('Sign up error:', error)
  }
}  

onMounted(() => {
  console.log('Component mounted, initiating signup');
  signup();
});
</script>
