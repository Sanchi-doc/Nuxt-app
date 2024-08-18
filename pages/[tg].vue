<template>
  <div>
    <h1>Registering user</h1>
    <p>ID : {{ id }}</p>
    <p>Username: {{ username }}</p>
  </div>
</template>

<script setup>

const { signUp } = useAuth();
const route = useRoute()

const{id, username} = route.query
const params = {id, username}
console.log(params)

const signup = async () => {
  console.log('Sign up:', user.value);
  try {
    const res = await signUp({email: user.value.email, password: user.value.password, username: user.value.username})
    console.log('after sign up:', res)
  } catch (error) {
    console.error('Sign up error:', error)
  }
}  

mounted() {
    this.$nextTick(function () {
      console.log('mounted')
      this.signup() 
    });
  }  
</script>
